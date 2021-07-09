<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OCI Vault</dt>
<dd slot="desc"><p>The Helidon MP OCI Vault integration provides easy access to Oracle Cloud Vault features.</p>
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
    &lt;artifactId&gt;helidon-integrations-oci-cdi&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
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
<p>First specify OCIDs and URLs of Vault items in <code>microprofile-config.properties</code>:</p>

<markup
lang="properties"

>oci.vault.vault-ocid: "&lt;...&gt;"
oci.vault.compartment-ocid: "&lt;...&gt;"
oci.vault.encryption-key-ocid: "&lt;...&gt;"
oci.vault.signature-key-ocid: "&lt;...&gt;"
oci.vault.cryptographic-endpoint: "&lt;...&gt;"</markup>

<p>The OCIDs can be set up and found in OCI under Security tab.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/oci/ocivault.png" alt="OCI Vault" />
</v-card-text>
</v-card>

<p>REST endpoint should be setup as follows:</p>

<markup
lang="java"

>@Path("/vault")
public class VaultResource {
    private final OciVault vault;
    private final String vaultOcid;
    private final String compartmentOcid;
    private final String encryptionKeyOcid;
    private final String signatureKeyOcid;

    @Inject
    VaultResource(@Named("custom") OciVault vault, <span class="conum" data-value="1" />
                  @ConfigProperty(name = "app.vault.vault-ocid") <span class="conum" data-value="2" />
                          String vaultOcid,
                  @ConfigProperty(name = "app.vault.compartment-ocid") <span class="conum" data-value="3" />
                          String compartmentOcid,
                  @ConfigProperty(name = "app.vault.encryption-key-ocid") <span class="conum" data-value="4" />
                          String encryptionKeyOcid,
                  @ConfigProperty(name = "app.vault.signature-key-ocid") <span class="conum" data-value="5" />
                          String signatureKeyOcid) {
        this.vault = vault;
        this.vaultOcid = vaultOcid;
        this.compartmentOcid = compartmentOcid;
        this.encryptionKeyOcid = encryptionKeyOcid;
        this.signatureKeyOcid = signatureKeyOcid;
    }
}</markup>

<ul class="colist">
<li data-value="1"><code>OciVault</code> support class is configured and injected automatically</li>
<li data-value="2">&lt;3&gt; &lt;4&gt; &lt;5&gt; Properties a read from the configuration</li>
</ul>
</div>

<h2 id="_oci_vault_usage">OCI Vault usage</h2>
<div class="section">

<h3 id="_encryption">Encryption</h3>
<div class="section">
<p>To encrypt a text, submit a <code>GET</code> request to the <code>/encrypt</code> endpoint:</p>

<markup
lang="java"

>@GET
@Path("/encrypt/{text}")
public String encrypt(@PathParam("text") String secret) {
    return vault.encrypt(Encrypt.Request.builder()
                                 .keyId(encryptionKeyOcid)
                                 .data(Base64Value.create(secret)))
            .cipherText();
}</markup>

</div>

<h3 id="_decryption">Decryption</h3>
<div class="section">
<p>To decrypt a text, submit a <code>GET</code> request to <code>/decrypt</code> endpoint:</p>

<markup
lang="java"

>@GET
@Path("/decrypt/{text: .*}")
public String decrypt(@PathParam("text") String cipherText) {
    return vault.decrypt(Decrypt.Request.builder()
                                 .keyId(encryptionKeyOcid)
                                 .cipherText(cipherText))
            .decrypted()
            .toDecodedString();
}</markup>

</div>

<h3 id="_signature">Signature</h3>
<div class="section">
<p>To retrieve a signature, submit a <code>GET</code> request to <code>/sign</code> endpoint:</p>

<markup
lang="java"

>@GET
@Path("/sign/{text}")
public String sign(@PathParam("text") String dataToSign) {
    return vault.sign(Sign.Request.builder()
                              .keyId(signatureKeyOcid)
                              .algorithm(Sign.Request.ALGORITHM_SHA_224_RSA_PKCS_PSS)
                              .message(Base64Value.create(dataToSign)))
            .signature()
            .toBase64();
}</markup>

</div>

<h3 id="_verification_of_a_signature">Verification of a signature</h3>
<div class="section">
<p>To verify the correctness of the signature, submit a <code>GET</code> request to <code>/verify</code> endpoint:</p>

<markup
lang="java"

>    @GET
    @Path("/sign/{text}/{signature: .*}")
    public String verify(@PathParam("text") String dataToVerify,
                         @PathParam("signature") String signature) {
        boolean valid = vault.verify(Verify.Request.builder()
                                             .keyId(signatureKeyOcid)
                                             .message(Base64Value.create(dataToVerify))
                                             .algorithm(Sign.Request.ALGORITHM_SHA_224_RSA_PKCS_PSS)
                                             .signature(Base64Value.createFromEncoded(signature)))
                .isValid();

        return valid ? "Signature valid" : "Signature not valid";
    }</markup>

</div>

<h3 id="_creating_a_signature">Creating a signature</h3>
<div class="section">
<p>To create a secret with a provided name, submit a <code>GET</code> request to <code>/secret</code>:</p>

<markup
lang="java"

>@POST
@Path("/secret/{name}")
public String createSecret(@PathParam("name") String name,
                           String secretText) {
    return vault.createSecret(CreateSecret.Request.builder()
                                      .secretName(name)
                                      .secretContent(CreateSecret.SecretContent.create(secretText))
                                      .vaultId(vaultOcid)
                                      .compartmentId(compartmentOcid)
                                      .encryptionKeyId(encryptionKeyOcid))
            .secret()
            .id();

}</markup>

</div>

<h3 id="_getting_a_signature">Getting a signature</h3>
<div class="section">
<p>To get a secret by its OCID, use <code>GET</code> Request to <code>/secret</code>:</p>

<markup
lang="java"

>@GET
@Path("/secret/{id}")
public String getSecret(@PathParam("id") String secretOcid) {
    Optional&lt;GetSecretBundle.Response&gt; response =
             vault.getSecretBundle(GetSecretBundle.Request.builder()
            .secretId(secretOcid))
            .entity();

    if (response.isEmpty()) {
        throw new NotFoundException("Secret with id " + secretOcid +
                                                       " does not exist");
    }

    return response.get().secretString().orElse("");
}</markup>

</div>

<h3 id="_deleting_a_signature">Deleting a signature</h3>
<div class="section">
<p>To delete a secret, a <code>DELETE</code> request to <code>/secret</code> should be used:</p>

<markup
lang="java"

>@DELETE
@Path("/secret/{id}")
public String deleteSecret(@PathParam("id") String secretOcid) {
    Instant deleteTime = Instant.now().plus(30, ChronoUnit.DAYS);

    vault.deleteSecret(DeleteSecret.Request.builder()
                               .secretId(secretOcid)
                               .timeOfDeletion(deleteTime));

    return "Secret " + secretOcid + " was deleted";
}</markup>

</div>
</div>
</doc-view>