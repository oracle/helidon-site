<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OCI Vault</dt>
<dd slot="desc"><p>The Helidon SE OCI Vault integration provides a reactive API Oracle Cloud Vault features.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_experimental">Experimental</h2>
<div class="section">
<div class="admonition warning">
<p class="admonition-inline">Helidon integration with Oracle Cloud Infrastructure is still experimental and not intended for production use. APIs and features have not yet been fully tested and are subject to change.</p>
</div>
</div>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable OCI Vault
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-oci-vault&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_setting_up_the_oci_vault">Setting up the OCI Vault</h2>
<div class="section">
<p>In order to use the OCI Vault integration, the following setup should be made.</p>

<ul class="ulist">
<li>
<p>The configuration required for Vault integration includes:</p>

</li>
<li>
<p>Vault OCID - to use the correct Vault, as more than one can be configured</p>

</li>
<li>
<p>Compartment OCID - OCI-specific compartment</p>

</li>
<li>
<p>Encryption Key OCID - required when doing encryption/decryption</p>

</li>
<li>
<p>Signature Key OCID - required when doing signatures/verification</p>

</li>
<li>
<p>Cryptographic endpoint - required for all except secrets</p>

</li>
</ul>
<p>First specify OCIDs and URLs of Vault items in <code>application.yaml</code>:</p>

<markup
lang="yaml"

>oci:
  vault:
    vault-ocid: "&lt;...&gt;"
    compartment-ocid: "&lt;...&gt;"
    encryption-key-ocid: "&lt;...&gt;"
    signature-key-ocid: "&lt;...&gt;"
    cryptographic-endpoint: "&lt;...&gt;"</markup>

<p>Current configuration requires <code>~/.oci/config</code> to be available in the home folder. This configuration file can be downloaded from OCI.</p>

<p>The OCIDs can be set up and found in OCI under Security tab.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/oci/vaultkey.png" alt="OCI Vault" />
</v-card-text>
</v-card>

<p>Next, these values should be read and provided to <code>VaultService</code>:</p>

<markup
lang="java"

>Config vaultConfig = config.get("oci.vault");
// the following three parameters are required
String vaultOcid = vaultConfig.get("vault-ocid").asString().get();
String compartmentOcid = vaultConfig.get("compartment-ocid").asString().get();
String encryptionKey = vaultConfig.get("encryption-key-ocid").asString().get();
String signatureKey = vaultConfig.get("signature-key-ocid").asString().get();

// this requires OCI configuration in the usual place
// ~/.oci/config
OciVaultRx ociVault = OciVaultRx.create(config.get("oci"));

WebServer.builder()
        .config(config.get("server"))
        .routing(Routing.builder()
                         .register("/vault", new VaultService(ociVault,
                                                              vaultOcid,
                                                              compartmentOcid,
                                                              encryptionKey,
                                                              signatureKey)))
        .build()
        .start()
        .await();</markup>

<p>The <code>VaultService</code> should define an <code>update</code> method to map paths to handler methods:</p>

<markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/encrypt/{text:.*}", this::encrypt)
            .get("/decrypt/{text:.*}", this::decrypt)
            .get("/sign/{text}", this::sign)
            .get("/verify/{text}/{signature:.*}", this::verify)
            .get("/secret/{id}", this::getSecret)
            .post("/secret/{name}", Handler.create(String.class, this::createSecret))
            .delete("/secret/{id}", this::deleteSecret);
}</markup>

</div>

<h2 id="_oci_vault_usage">OCI Vault usage</h2>
<div class="section">

<h3 id="_encryption">Encryption</h3>
<div class="section">
<p>To encrypt a text, submit a <code>GET</code> request to the <code>/encrypt</code> endpoint:</p>

<markup
lang="java"

>private void encrypt(ServerRequest req, ServerResponse res) {
    vault.encrypt(Encrypt.Request.builder()
                          .keyId(encryptionKeyOcid)
                          .data(Base64Value.create(req.path().param("text"))))
            .map(Encrypt.Response::cipherText)
            .forSingle(res::send)
            .exceptionally(res::send);
}</markup>

</div>

<h3 id="_decryption">Decryption</h3>
<div class="section">
<p>To decrypt a text, submit a <code>GET</code> request to <code>/decrypt</code> endpoint:</p>

<markup
lang="java"

>private void decrypt(ServerRequest req, ServerResponse res) {
    vault.decrypt(Decrypt.Request.builder()
                          .keyId(encryptionKeyOcid)
                          .cipherText(req.path().param("text")))
            .map(Decrypt.Response::decrypted)
            .map(Base64Value::toDecodedString)
            .forSingle(res::send)
            .exceptionally(res::send);
}</markup>

</div>

<h3 id="_signature">Signature</h3>
<div class="section">
<p>To retrieve a signature, submit a <code>GET</code> request to <code>/sign</code> endpoint:</p>

<markup
lang="java"

>private void sign(ServerRequest req, ServerResponse res) {
    vault.sign(Sign.Request.builder()
                       .keyId(signatureKeyOcid)
                       .algorithm(Sign.Request.ALGORITHM_SHA_224_RSA_PKCS_PSS)
                       .message(Base64Value.create(req.path().param("text"))))
            .map(Sign.Response::signature)
            .map(Base64Value::toBase64)
            .forSingle(res::send)
            .exceptionally(res::send);
}</markup>


<h4 id="_verification_of_a_signature">Verification of a Signature</h4>
<div class="section">
<p>To verify the correctness of the signature, submit a <code>GET</code> request to <code>/verify</code> endpoint:</p>

<markup
lang="java"

>private void verify(ServerRequest req, ServerResponse res) {
    String text = req.path().param("text");
    String signature = req.path().param("signature");

    vault.verify(Verify.Request.builder()
                         .keyId(signatureKeyOcid)
                         .algorithm(Sign.Request.ALGORITHM_SHA_224_RSA_PKCS_PSS)
                         .message(Base64Value.create(text))
                         .signature(Base64Value.createFromEncoded(signature)))
            .map(Verify.Response::isValid)
            .map(it -&gt; it ? "Signature Valid" : "Signature Invalid")
            .forSingle(res::send)
            .exceptionally(res::send);
}</markup>

</div>

<h4 id="_creating_a_signature">Creating a Signature</h4>
<div class="section">
<p>To create a secret with a provided name, submit a <code>GET</code> request to <code>/secret</code>:</p>

<markup
lang="java"

>private void createSecret(ServerRequest req, ServerResponse res, String secretText) {
    vault.createSecret(CreateSecret.Request.builder()
                               .secretContent(CreateSecret.SecretContent.create(secretText))
                               .vaultId(vaultOcid)
                               .compartmentId(compartmentOcid)
                               .encryptionKeyId(encryptionKeyOcid)
                               .secretName(req.path().param("name")))
            .map(CreateSecret.Response::secret)
            .map(Secret::id)
            .forSingle(res::send)
            .exceptionally(res::send);
}</markup>

</div>

<h4 id="_getting_a_signature">Getting a Signature</h4>
<div class="section">
<p>To get a secret by its OCID, submit a <code>GET</code> request to <code>/secret</code>:</p>

<markup
lang="java"

>private void getSecret(ServerRequest req, ServerResponse res) {
    vault.getSecretBundle(GetSecretBundle.Request.create(req.path().param("id")))
            .forSingle(apiResponse -&gt; {
                Optional&lt;GetSecretBundle.Response&gt; entity = apiResponse.entity();
                if (entity.isEmpty()) {
                    res.status(Http.Status.NOT_FOUND_404).send();
                } else {
                    GetSecretBundle.Response response = entity.get();
                    res.send(response.secretString().orElse(""));
                }
            })
            .exceptionally(res::send);
}</markup>

</div>

<h4 id="_deleting_a_signature">Deleting a Signature</h4>
<div class="section">
<p>To delete a secret, a <code>DELETE</code> request to <code>/secret</code> should be used:</p>

<markup
lang="java"

>private void deleteSecret(ServerRequest req, ServerResponse res) {
    Instant deleteTime = Instant.now().plus(30, ChronoUnit.DAYS);

    vault.deleteSecret(DeleteSecret.Request.builder()
                               .secretId(req.path().param("id"))
                               .timeOfDeletion(deleteTime))
            .forSingle(it -&gt; res.status(it.status()).send())
            .exceptionally(res::send);

}</markup>

</div>
</div>
</div>
</doc-view>