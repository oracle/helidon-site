<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Vault</dt>
<dd slot="desc"><p>HashiCorp Vault is a commonly used Vault in many microservices. The APIs are REST-based and Helidon implements them using reactive client.</p>

<p>Vault integration supports the following:</p>

<ul class="ulist">
<li>
<p><strong>Secret Engines</strong>: Key/Value version 2, Key/Value version 1, Cubbyhole, PKI, Transit, Database</p>

</li>
<li>
<p><strong>Authentication Methods</strong>: Token, Kubernetes (k8s), AppRole</p>

</li>
<li>
<p><strong>Other Sys Operations and Configurations</strong></p>

</li>
</ul></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h3 id="_experimental">Experimental</h3>
<div class="section">
<div class="admonition warning">
<p class="admonition-inline">Helidon Vault support is still experimental and not intended for production use. APIs and features have not yet been fully tested and are subject to change.</p>
</div>
</div>

<h3 id="_sys_operations">Sys Operations</h3>
<div class="section">
<p>Each of these features is implemented as a separate module, with the Vault class binding them together. In Helidon MP, with injection, this binding is done automatically, and you can simply inject your favorite secret engine.</p>

<p>In addition to these features, Vault itself can be authenticated as follows:</p>

<ul class="ulist">
<li>
<p>Token authentication - token is configured when connecting to Vault</p>

</li>
<li>
<p>AppRole authentication - AppRole ID and secret ID are configured, integration exchanges these for a temporary token that is used to connect to Vault</p>

</li>
<li>
<p>K8s authentication - the k8s JWT token is discovered on current node and used to obtain a temporary token that is used to connect to Vault</p>

</li>
</ul>
</div>

<h3 id="_extensibility">Extensibility</h3>
<div class="section">
<p>New secret engines and authentication methods can be implemented quite easily, as the integration is based on service providers (using ServiceLoader). This gives us (or you, as the users) the option to add new secret engines and/or authentication methods without adding a plethora of methods to the Vault class.</p>

<p>See the following SPIs:</p>

<markup
lang="properties"

>io.helidon.integrations.vault.spi.AuthMethodProvider
io.helidon.integrations.vault.spi.SecretsEngineProvider
io.helidon.integrations.vault.spi.SysProvider
io.helidon.integrations.vault.spi.VaultAuth
io.helidon.integrations.vault.spi.InjectionProvider</markup>

</div>

<h3 id="_modules">Modules</h3>
<div class="section">
<p>The following is a list of maven coordinates of all Vault modules available:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.auths&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-auths-token&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.auths&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-auths-approle&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.auths&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-auths-k8s&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.secrets&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-secrets-kv1&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.secrets&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-secrets-kv2&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.secrets&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-secrets-cubbyhole&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.secrets&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-secrets-transit&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.secrets&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-secrets-database&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault.sys&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-sys&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>To use Vault integration in MP, the following module must be added, as it enables injection of all features:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.vault&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-vault-cdi&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>Configuration to connect to Vault.</p>

<ol style="margin-left: 15px;">
<li>
Authenticating using Token:

</li>
</ol>
<div class="listing">
<pre>vault.address=http://localhost:8200
vault.token=my-token</pre>
</div>

<ol style="margin-left: 15px;">
<li>
Authenticating using AppRole:

</li>
</ol>
<div class="listing">
<pre>vault.auth.app-role.role-id=app-role-id
vault.auth.app-role.secret-id=app-role-secret-id</pre>
</div>

<ol style="margin-left: 15px;">
<li>
Authenticating using Kubernetes:

</li>
</ol>
<div class="listing">
<pre>vault.auth.k8s.token-role=my-role <span class="conum" data-value="1" /></pre>
</div>

<ul class="colist">
<li data-value="1">The token role must be configured in Vault</li>
</ul>
<p>The following classes can be injected into any CDI bean (if appropriate module is on the classpath):</p>

<ul class="ulist">
<li>
<p>Kv2Secrets - Key/Value Version 2 Secrets (versioned secrets, default)</p>

</li>
<li>
<p>Kv1Secrets - Key/Value Version 1 Secrets (unversioned secrets, legacy)</p>

</li>
<li>
<p>CubbyholeSecrets - Cubbyhole secrets (token bound secrets)</p>

</li>
<li>
<p>DbSecrets - Database secrets (for generating temporary DB credentials)</p>

</li>
<li>
<p>PkiSecrets - PKI secrets (for generating keys and X.509 certificates)</p>

</li>
<li>
<p>TransitSecrets - Transit operations (encryption, signatures, HMAC)</p>

</li>
<li>
<p>AppRoleAuth - AppRole authentication method (management operations)</p>

</li>
<li>
<p>K8sAuth - Kubernetes authentication method (management operations)</p>

</li>
<li>
<p>TokenAuth - Token authentication method (management operations)</p>

</li>
<li>
<p>Sys - System operations (management of Vault - enabling/disabling secret engines and authentication methods)</p>

</li>
<li>
<p>*Rx - reactive counterparts to the classes defined above, usually not recommended in CDI, as it is a blocking environment</p>

</li>
</ul>
</div>

<h2 id="_usage">Usage</h2>
<div class="section">
<p>The following example shows usage of Vault to encrypt a secret using the default Vault configuration (in a JAX-RS resource):</p>

<markup
lang="java"

>private final TransitSecrets secrets;

@Inject
TransitResource(TransitSecrets secrets) {
    this.secrets = secrets;
}
//...
@Path("/encrypt/{secret: .*}")
@GET
public String encrypt(@PathParam("secret") String secret) {
    return secrets.encrypt(Encrypt.Request.builder()
                    .encryptionKeyName(ENCRYPTION_KEY)
                    .data(Base64Value.create(secret)))
            .encrypted()
            .cipherText();
}</markup>


<h3 id="_cubbyhole_secrets">Cubbyhole secrets</h3>
<div class="section">
<p>Cubbyhole example:</p>

<markup
lang="java"

>@Path("/cubbyhole")
public class CubbyholeResource {
    private final CubbyholeSecrets secrets;

    @Inject
    CubbyholeResource(CubbyholeSecrets secrets) {
        this.secrets = secrets;
    }

    @POST
    @Path("/secrets/{path: .*}")
    public Response createSecret(@PathParam("path") String path, String secret) { <span class="conum" data-value="1" />
        CreateCubbyhole.Response response = secrets.create(path, Map.of("secret", secret));

        return Response.ok()
                .entity("Created secret on path: " + path + ", key is \"secret\", original status: " + response.status().code())
                .build();
    }

    @DELETE
    @Path("/secrets/{path: .*}")
    public Response deleteSecret(@PathParam("path") String path) { <span class="conum" data-value="2" />
        DeleteCubbyhole.Response response = secrets.delete(path);

        return Response.ok()
                .entity("Deleted secret on path: " + path + ". Original status: " + response.status().code())
                .build();
    }

    @GET
    @Path("/secrets/{path: .*}")
    public Response getSecret(@PathParam("path") String path) { <span class="conum" data-value="3" />
        Optional&lt;Secret&gt; secret = secrets.get(path);

        if (secret.isPresent()) {
            Secret kv1Secret = secret.get();
            return Response.ok()
                    .entity("Secret: " + secret.get().values().toString())
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}</markup>

<ul class="colist">
<li data-value="1">Create a secret from request entity, the name of the value is {@code secret}.</li>
<li data-value="2">Delete the secret on a specified path.</li>
<li data-value="3">Get the secret on a specified path.</li>
</ul>
</div>

<h3 id="_kv1_secrets">KV1 secrets</h3>
<div class="section">
<p>Key/Value version 1 secrets engine operations:</p>

<markup
lang="java"

>@Path("/kv1")
public class Kv1Resource {
    private final Sys sys;
    private final Kv1Secrets secrets;

    @Inject
    Kv1Resource(Sys sys, Kv1Secrets secrets) {
        this.sys = sys;
        this.secrets = secrets;
    }

    @Path("/engine")
    @GET
    public Response enableEngine() { <span class="conum" data-value="1" />
        EnableEngine.Response response = sys.enableEngine(Kv1SecretsRx.ENGINE);

        return Response.ok()
                .entity("Key/value version 1 secret engine is now enabled. Original status: " + response.status().code())
                .build();
    }

    @Path("/engine")
    @DELETE
    public Response disableEngine() { <span class="conum" data-value="2" />
        DisableEngine.Response response = sys.disableEngine(Kv1SecretsRx.ENGINE);
        return Response.ok()
                .entity("Key/value version 1 secret engine is now disabled. Original status: " + response.status().code())
                .build();
    }

    @POST
    @Path("/secrets/{path: .*}")
    public Response createSecret(@PathParam("path") String path, String secret) { <span class="conum" data-value="3" />
        CreateKv&lt;1&gt;Response response = secrets.create(path, Map.of("secret", secret));

        return Response.ok()
                .entity("Created secret on path: " + path + ", key is \"secret\", original status: " + response.status().code())
                .build();
    }

    @DELETE
    @Path("/secrets/{path: .*}")
    public Response deleteSecret(@PathParam("path") String path) { <span class="conum" data-value="4" />
        DeleteKv&lt;1&gt;Response response = secrets.delete(path);

        return Response.ok()
                .entity("Deleted secret on path: " + path + ". Original status: " + response.status().code())
                .build();
    }

    @GET
    @Path("/secrets/{path: .*}")
    public Response getSecret(@PathParam("path") String path) { <span class="conum" data-value="5" />
        Optional&lt;Secret&gt; secret = secrets.get(path);

        if (secret.isPresent()) {
            Secret kv1Secret = secret.get();
            return Response.ok()
                    .entity("Secret: " + secret.get().values().toString())
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}</markup>

<ul class="colist">
<li data-value="1">Enable the secrets engine on the default path.</li>
<li data-value="2">Disable the secrets engine on the default path.</li>
<li data-value="3">Create a secret from request entity, the name of the value is <code>secret</code>.</li>
<li data-value="4">Delete the secret on a specified path.</li>
<li data-value="5">Get the secret on a specified path.</li>
</ul>
</div>

<h3 id="_kv2_secrets">KV2 secrets</h3>
<div class="section">
<p>Key/Value version 2 secrets engine operations:</p>

<markup
lang="java"

>@Path("/kv2")
public class Kv2Resource {
    private final Kv2Secrets secrets;

    @Inject
    Kv2Resource(@VaultName("app-role") @VaultPath("custom") Kv2Secrets secrets) {
        this.secrets = secrets;
    }

    @POST
    @Path("/secrets/{path: .*}")
    public Response createSecret(@PathParam("path") String path, String secret) { <span class="conum" data-value="1" />
        CreateKv&lt;2&gt;Response response = secrets.create(path, Map.of("secret", secret));

        return Response.ok()
                .entity("Created secret on path: " + path + ", key is \"secret\", original status: " + response.status().code())
                .build();
    }

    @DELETE
    @Path("/secrets/{path: .*}")
    public Response deleteSecret(@PathParam("path") String path) { <span class="conum" data-value="2" />
        DeleteAllKv&lt;2&gt;Response response = secrets.deleteAll(path);

        return Response.ok()
                .entity("Deleted secret on path: " + path + ". Original status: " + response.status().code())
                .build();
    }

    @GET
    @Path("/secrets/{path: .*}")
    public Response getSecret(@PathParam("path") String path) { <span class="conum" data-value="3" />

        Optional&lt;Kv2Secret&gt; secret = secrets.get(path);

        if (secret.isPresent()) {
            Kv2Secret kv2Secret = secret.get();
            return Response.ok()
                    .entity("Version " + kv2Secret.metadata().version() + ", secret: " + kv2Secret.values().toString())
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}</markup>

<ul class="colist">
<li data-value="1">Create a secret from request entity, the name of the value is <code>secret</code>.</li>
<li data-value="2">Delete the secret on a specified path.</li>
<li data-value="3">Get the secret on a specified path.</li>
</ul>
</div>

<h3 id="_transit_secrets">Transit secrets</h3>
<div class="section">
<p>Transit secrets engine operations:</p>

<markup
lang="java"

>@Path("/transit")
public class TransitResource {
    private static final String ENCRYPTION_KEY = "encryption-key";
    private static final String SIGNATURE_KEY = "signature-key";

    private final Sys sys;
    private final TransitSecrets secrets;

    @Inject
    TransitResource(Sys sys, TransitSecrets secrets) {
        this.sys = sys;
        this.secrets = secrets;
    }

    @Path("/engine")
    @GET
    public Response enableEngine() { <span class="conum" data-value="1" />
        EnableEngine.Response response = sys.enableEngine(TransitSecretsRx.ENGINE);

        return Response.ok()
                .entity("Transit secret engine is now enabled. Original status: " + response.status().code())
                .build();
    }

    @Path("/engine")
    @DELETE
    public Response disableEngine() { <span class="conum" data-value="2" />
        DisableEngine.Response response = sys.disableEngine(TransitSecretsRx.ENGINE);

        return Response.ok()
                .entity("Transit secret engine is now disabled. Original status: " + response.status())
                .build();
    }

    @Path("/keys")
    @GET
    public Response createKeys() { <span class="conum" data-value="3" />
        secrets.createKey(CreateKey.Request.builder()
                                  .name(ENCRYPTION_KEY));

        secrets.createKey(CreateKey.Request.builder()
                                  .name(SIGNATURE_KEY)
                                  .type("rsa-2048"));

        return Response.ok()
                .entity("Created encryption (and HMAC), and signature keys")
                .build();
    }

    @Path("/keys")
    @DELETE
    public Response deleteKeys() { <span class="conum" data-value="4" />
        // we must first enable deletion of the key (by default it cannot be deleted)
        secrets.updateKeyConfig(UpdateKeyConfig.Request.builder()
                                        .name(ENCRYPTION_KEY)
                                        .allowDeletion(true));

        secrets.updateKeyConfig(UpdateKeyConfig.Request.builder()
                                        .name(SIGNATURE_KEY)
                                        .allowDeletion(true));

        secrets.deleteKey(DeleteKey.Request.create(ENCRYPTION_KEY));
        secrets.deleteKey(DeleteKey.Request.create(SIGNATURE_KEY));

        return Response.ok()
                .entity("Deleted encryption (and HMAC), and signature keys")
                .build();
    }

    @Path("/encrypt/{secret: .*}")
    @GET
    public String encryptSecret(@PathParam("secret") String secret) { <span class="conum" data-value="5" />
        return secrets.encrypt(Encrypt.Request.builder()
                                       .encryptionKeyName(ENCRYPTION_KEY)
                                       .data(Base64Value.create(secret)))
                .encrypted()
                .cipherText();
    }

    @Path("/decrypt/{cipherText: .*}")
    @GET
    public String decryptSecret(@PathParam("cipherText") String cipherText) { <span class="conum" data-value="6" />
        return secrets.decrypt(Decrypt.Request.builder()
                                       .encryptionKeyName(ENCRYPTION_KEY)
                                       .cipherText(cipherText))
                .decrypted()
                .toDecodedString();
    }

    @Path("/hmac/{text}")
    @GET
    public String hmac(@PathParam("text") String text) { <span class="conum" data-value="7" />
        return secrets.hmac(Hmac.Request.builder()
                                    .hmacKeyName(ENCRYPTION_KEY)
                                    .data(Base64Value.create(text)))
                .hmac();
    }

    @Path("/sign/{text}")
    @GET
    public String sign(@PathParam("text") String text) { <span class="conum" data-value="8" />
        return secrets.sign(Sign.Request.builder()
                                    .signatureKeyName(SIGNATURE_KEY)
                                    .data(Base64Value.create(text)))
                .signature();
    }

    @Path("/verify/hmac/{secret}/{hmac: .*}")
    @GET
    public String verifyHmac(@PathParam("secret") String secret, @PathParam("hmac") String hmac) { <span class="conum" data-value="9" />
        boolean isValid = secrets.verify(Verify.Request.builder()
                                                 .digestKeyName(ENCRYPTION_KEY)
                                                 .data(Base64Value.create(secret))
                                                 .hmac(hmac))
                .isValid();

        return (isValid ? "HMAC Valid" : "HMAC Invalid");
    }
    @Path("/verify/sign/{secret}/{signature: .*}")
    @GET
    public String verifySignature(@PathParam("secret") String secret, @PathParam("signature") String signature) { <span class="conum" data-value="10" />
        boolean isValid = secrets.verify(Verify.Request.builder()
                                                 .digestKeyName(SIGNATURE_KEY)
                                                 .data(Base64Value.create(secret))
                                                 .signature(signature))
                .isValid();

        return (isValid ? "Signature Valid" : "Signature Invalid");
    }
}</markup>

<ul class="colist">
<li data-value="1">Enable the secrets engine on the default path.</li>
<li data-value="2">Disable the secrets engine on the default path.</li>
<li data-value="3">Create the encrypting and signature keys.</li>
<li data-value="4">Delete the encryption and signature keys.</li>
<li data-value="5">Encrypt a secret.</li>
<li data-value="6">Decrypt a secret.</li>
<li data-value="7">Create an HMAC for text.</li>
<li data-value="8">Create a signature for text.</li>
<li data-value="9">Verify HMAC.</li>
<li data-value="10">Verify signature.</li>
</ul>
</div>
</div>

<h2 id="_local_testing">Local testing</h2>
<div class="section">
<p>Vault is available as a docker image, so to test locally, you can simply:</p>

<markup
lang="bash"

>docker run -e VAULT_DEV_ROOT_TOKEN_ID=my-token -d --name=vault -p8200:8200 vault</markup>

<p>This will create a Vault docker image, run it in background and open it on localhost:8200 with a custom root token my-token, using name vault. This is of course only suitable for local testing, as the root token has too many rights, but it can be easily used with the examples below.</p>

</div>
</doc-view>