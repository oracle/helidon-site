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

<p>Configuration to connect to Vault.</p>

<ol style="margin-left: 15px;">
<li>
Authenticating using Token:

</li>
</ol>
<div class="listing">
<pre>vault:
   address: "http://localhost:8200"
   token: "my-token"</pre>
</div>

<ol style="margin-left: 15px;">
<li>
Authenticating using AppRole:

</li>
</ol>
<div class="listing">
<pre>vault:
  auth:
    app-role:
      role-id: "app-role-id"
      secret-id: app-role-secret-id</pre>
</div>

<ol style="margin-left: 15px;">
<li>
Authenticating using Kubernetes:

</li>
</ol>
<div class="listing">
<pre>vault:
  auth:
    k8s:
      token-role: "my-role" <span class="conum" data-value="1" /></pre>
</div>

<ul class="colist">
<li data-value="1">The token role must be configured in Vault
Minimal configuration to connect to Vault:</li>
</ul>
<markup
lang="yaml"

>vault:
   token: "my-token"
   address: "http://localhost:8200"</markup>

<p>Code to set up Vault and obtain a specific secret engine:</p>

<markup
lang="java"

>Vault vault = Vault.builder()
     .config(config.get("vault"))
     .build();
Kv2SecretsRx secrets = vault.secrets(Kv2SecretsRx.ENGINE);</markup>

<p>Similar code can be used for any secret engine available:</p>

<ul class="ulist">
<li>
<p>Kv2SecretsRx - Key/Value Version 2 Secrets (versioned secrets, default)</p>

</li>
<li>
<p>Kv1SecretsRx - Key/Value Version 1 Secrets (unversioned secrets, legacy)</p>

</li>
<li>
<p>CubbyholeSecretsRx - Cubbyhole secrets (token bound secrets)</p>

</li>
<li>
<p>DbSecretsRx - Database secrets (for generating temporary DB credentials)</p>

</li>
<li>
<p>PkiSecretsRx - PKI secrets (for generating keys and X.509 certificates)</p>

</li>
<li>
<p>TransitSecretsRx - Transit operations (encryption, signatures, HMAC)</p>

</li>
</ul>
<p>Code to obtain a specific authentication method:</p>

<markup
lang="java"

>K8sAuthRx auth = vault.auth(K8sAuthRx.AUTH_METHOD)</markup>

<p>Similar code can be used for any authentication method available:</p>

<ul class="ulist">
<li>
<p>AppRoleAuthRx - AppRole authentication method (management operations)</p>

</li>
<li>
<p>K8sAuthRx - Kubernetes authentication method (management operations)</p>

</li>
<li>
<p>TokenAuthRx - Token authentication method (management operations)</p>

</li>
</ul>
<p>Code to get the Sys operations of Vault:</p>

<markup
lang="java"

>SysRx sys = vault.sys(SysRx.API);</markup>

</div>

<h2 id="_usage_with_webserver">Usage with WebServer</h2>
<div class="section">
<p>Configure the <code>Vault</code> object using token base configuration:</p>

<markup
lang="java"

>Config config = buildConfig();
        Vault tokenVault = Vault.builder()
                .config(config.get("vault.token"))
                .updateWebClient(it -&gt; it.connectTimeout(5, TimeUnit.SECONDS)
                        .readTimeout(5, TimeUnit.SECONDS))
                .build();</markup>

<p>Then <code>WebService</code> has to be configured with endpoints routing registered:</p>

<markup
lang="java"

>SysRx sys = tokenVault.sys(SysRx.API);
WebServer webServer = WebServer.builder()
        .config(config.get("server"))
        .routing(Routing.builder()
                         .register("/cubbyhole", new CubbyholeService(sys, tokenVault.secrets(CubbyholeSecretsRx.ENGINE)))
                         .register("/kv1", new Kv1Service(sys, tokenVault.secrets(Kv1SecretsRx.ENGINE)))
                         .register("/kv2", new Kv2Service(sys, tokenVault.secrets(Kv2SecretsRx.ENGINE)))
                         .register("/transit", new TransitService(sys, tokenVault.secrets(TransitSecretsRx.ENGINE))))
        .build()
        .start()
        .await();</markup>

<p>AppRole-based and Kubernetes authentications are available.</p>


<h3 id="_cubbyhole_secrets">Cubbyhole secrets</h3>
<div class="section">
<p>Cubbyhole secrets engine operations:</p>

<markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/create", this::createSecrets)
            .get("/secrets/{path:.*}", this::getSecret);
}

private void createSecrets(ServerRequest req, ServerResponse res) { <span class="conum" data-value="1" />
    secrets.create("first/secret", Map.of("key", "secretValue"))
            .thenAccept(ignored -&gt; res.send("Created secret on path /first/secret"))
            .exceptionally(res::send);
}

private void getSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="2" />
    String path = req.path().param("path");

    secrets.get(path)
            .thenAccept(secret -&gt; {
                if (secret.isPresent()) {
                    // using toString so we do not need to depend on JSON-B
                    res.send(secret.get().values().toString());
                } else {
                    res.status(Http.Status.NOT_FOUND_404);
                    res.send();
                }
            })
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Create a secret from request entity.</li>
<li data-value="2">Get the secret on a specified path.</li>
</ul>
</div>

<h3 id="_kv1_secrets">KV1 Secrets</h3>
<div class="section">
<p>Key/Value version 1 secrets engine operations:</p>

<markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/enable", this::enableEngine)
            .get("/create", this::createSecrets)
            .get("/secrets/{path:.*}", this::getSecret)
            .delete("/secrets/{path:.*}", this::deleteSecret)
            .get("/disable", this::disableEngine);
}

private void disableEngine(ServerRequest req, ServerResponse res) { <span class="conum" data-value="1" />
    sys.disableEngine(Kv1SecretsRx.ENGINE)
            .thenAccept(ignored -&gt; res.send("KV1 Secret engine disabled"))
            .exceptionally(res::send);
}

private void enableEngine(ServerRequest req, ServerResponse res) { <span class="conum" data-value="2" />
    sys.enableEngine(Kv1SecretsRx.ENGINE)
            .thenAccept(ignored -&gt; res.send("KV1 Secret engine enabled"))
            .exceptionally(res::send);
}

private void createSecrets(ServerRequest req, ServerResponse res) { <span class="conum" data-value="3" />
    secrets.create("first/secret", Map.of("key", "secretValue"))
            .thenAccept(ignored -&gt; res.send("Created secret on path /first/secret"))
            .exceptionally(res::send);
}

private void deleteSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="4" />
    String path = req.path().param("path");

    secrets.delete(path)
            .thenAccept(ignored -&gt; res.send("Deleted secret on path " + path));
}

private void getSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="5" />
    String path = req.path().param("path");

    secrets.get(path)
            .thenAccept(secret -&gt; {
                if (secret.isPresent()) {
                    // using toString so we do not need to depend on JSON-B
                    res.send(secret.get().values().toString());
                } else {
                    res.status(Http.Status.NOT_FOUND_404);
                    res.send();
                }
            })
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Disable the secrets engine on the default path.</li>
<li data-value="2">Enable the secrets engine on the default path.</li>
<li data-value="3">Create a secret from request entity.</li>
<li data-value="4">Delete the secret on a specified path.</li>
<li data-value="5">Get the secret on a specified path.</li>
</ul>
</div>

<h3 id="_kv2_secrets">KV2 Secrets</h3>
<div class="section">
<p>Key/Value version 2 secrets engine operations:</p>

<markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/create", this::createSecrets)
            .get("/secrets/{path:.*}", this::getSecret)
            .delete("/secrets/{path:.*}", this::deleteSecret);
}

private void createSecrets(ServerRequest req, ServerResponse res) { <span class="conum" data-value="1" />
    secrets.create("first/secret", Map.of("key", "secretValue"))
            .thenAccept(ignored -&gt; res.send("Created secret on path /first/secret"))
            .exceptionally(res::send);
}

private void deleteSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="2" />
    String path = req.path().param("path");

    secrets.deleteAll(path)
            .thenAccept(ignored -&gt; res.send("Deleted secret on path " + path));
}

private void getSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="3" />
    String path = req.path().param("path");

    secrets.get(path)
            .thenAccept(secret -&gt; {
                if (secret.isPresent()) {
                    // using toString so we do not need to depend on JSON-B
                    Kv2Secret kv2Secret = secret.get();
                    res.send("Version " + kv2Secret.metadata().version() + ", secret: " + kv2Secret.values().toString());
                } else {
                    res.status(Http.Status.NOT_FOUND_404);
                    res.send();
                }
            })
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Create a secret from request entity.</li>
<li data-value="2">Delete the secret on a specified path.</li>
<li data-value="3">Get the secret on a specified path.</li>
</ul>
</div>

<h3 id="_transit_secrets">Transit secrets</h3>
<div class="section">
<p>Transit secrets engine operations:</p>

<markup
lang="bash"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/enable", this::enableEngine)
            .get("/keys", this::createKeys)
            .delete("/keys", this::deleteKeys)
            .get("/batch", this::batch)
            .get("/encrypt/{text:.*}", this::encryptSecret)
            .get("/decrypt/{text:.*}", this::decryptSecret)
            .get("/sign", this::sign)
            .get("/hmac", this::hmac)
            .get("/verify/sign/{text:.*}", this::verify)
            .get("/verify/hmac/{text:.*}", this::verifyHmac)
            .get("/disable", this::disableEngine);
}

private void enableEngine(ServerRequest req, ServerResponse res) { <span class="conum" data-value="1" />
    sys.enableEngine(TransitSecretsRx.ENGINE)
            .thenAccept(ignored -&gt; res.send("Transit Secret engine enabled"))
            .exceptionally(res::send);
}

private void disableEngine(ServerRequest req, ServerResponse res) { <span class="conum" data-value="2" />
    sys.disableEngine(TransitSecretsRx.ENGINE)
            .thenAccept(ignored -&gt; res.send("Transit Secret engine disabled"))
            .exceptionally(res::send);
}

private void createKeys(ServerRequest req, ServerResponse res) { <span class="conum" data-value="3" />
    CreateKey.Request request = CreateKey.Request.builder()
            .name(ENCRYPTION_KEY);

    secrets.createKey(request)
            .flatMapSingle(ignored -&gt; secrets.createKey(CreateKey.Request.builder()
                                                                .name(SIGNATURE_KEY)
                                                                .type("rsa-2048")))
            .forSingle(ignored -&gt; res.send("Created keys"))
            .exceptionally(res::send);
}

private void deleteKeys(ServerRequest req, ServerResponse res) { <span class="conum" data-value="4" />

    secrets.updateKeyConfig(UpdateKeyConfig.Request.builder()
                                    .name(ENCRYPTION_KEY)
                                    .allowDeletion(true))
            .peek(ignored -&gt; System.out.println("Updated key config"))
            .flatMapSingle(ignored -&gt; secrets.deleteKey(DeleteKey.Request.create(ENCRYPTION_KEY)))
            .forSingle(ignored -&gt; res.send("Deleted key."))
            .exceptionally(res::send);
}

private void encryptSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="5" />
    String secret = req.path().param("text");

    secrets.encrypt(Encrypt.Request.builder()
                            .encryptionKeyName(ENCRYPTION_KEY)
                            .data(Base64Value.create(secret)))
            .forSingle(response -&gt; res.send(response.encrypted().cipherText()))
            .exceptionally(res::send);
}

private void decryptSecret(ServerRequest req, ServerResponse res) { <span class="conum" data-value="6" />
    String encrypted = req.path().param("text");

    secrets.decrypt(Decrypt.Request.builder()
                            .encryptionKeyName(ENCRYPTION_KEY)
                            .cipherText(encrypted))
            .forSingle(response -&gt; res.send(String.valueOf(response.decrypted().toDecodedString())))
            .exceptionally(res::send);
}

private void hmac(ServerRequest req, ServerResponse res) { <span class="conum" data-value="7" />
    secrets.hmac(Hmac.Request.builder()
                         .hmacKeyName(ENCRYPTION_KEY)
                         .data(SECRET_STRING))
            .forSingle(response -&gt; res.send(response.hmac()))
            .exceptionally(res::send);
}

private void sign(ServerRequest req, ServerResponse res) { <span class="conum" data-value="8" />
    secrets.sign(Sign.Request.builder()
                         .signatureKeyName(SIGNATURE_KEY)
                         .data(SECRET_STRING))
            .forSingle(response -&gt; res.send(response.signature()))
            .exceptionally(res::send);
}

private void verifyHmac(ServerRequest req, ServerResponse res) { <span class="conum" data-value="9" />
    String hmac = req.path().param("text");

    secrets.verify(Verify.Request.builder()
                           .digestKeyName(ENCRYPTION_KEY)
                           .data(SECRET_STRING)
                           .hmac(hmac))
            .forSingle(response -&gt; res.send("Valid: " + response.isValid()))
            .exceptionally(res::send);
}

private void verify(ServerRequest req, ServerResponse res) { <span class="conum" data-value="10" />
    String signature = req.path().param("text");

    secrets.verify(Verify.Request.builder()
                           .digestKeyName(SIGNATURE_KEY)
                           .data(SECRET_STRING)
                           .signature(signature))
            .forSingle(response -&gt; res.send("Valid: " + response.isValid()))
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Enable the secrets engine on the default path.</li>
<li data-value="2">Disable the secrets engine on the default path.</li>
<li data-value="3">Create the encryption and signature keys.</li>
<li data-value="4">Delete the encryption and signature keys.</li>
<li data-value="5">Encrypt a secret.</li>
<li data-value="6">Decrypt a secret.</li>
<li data-value="7">Create an HMAC for text.</li>
<li data-value="8">Create a signature for text.</li>
<li data-value="9">Verify HMAC.</li>
<li data-value="10">Verify signature.</li>
</ul>
</div>

<h3 id="_authentication_with_kubernetes">Authentication with Kubernetes</h3>
<div class="section">
<p>In order to use Kubernetes authentication:</p>

<markup
lang="java"

>class K8sExample {
    private static final String SECRET_PATH = "k8s/example/secret";
    private static final String POLICY_NAME = "k8s_policy";

    private final Vault tokenVault;
    private final String k8sAddress;
    private final Config config;
    private final SysRx sys;

    private Vault k8sVault;

    K8sExample(Vault tokenVault, Config config) {
        this.tokenVault = tokenVault;
        this.sys = tokenVault.sys(SysRx.API);
        this.k8sAddress = config.get("cluster-address").asString().get();
        this.config = config;
    }

    public Single&lt;String&gt; run() { <span class="conum" data-value="1" />
        /*
         The following tasks must be run before we authenticate
         */
        return enableK8sAuth()
                // Now we can login using k8s - must run within a k8s cluster (or you need the k8s configuration files locally)
                .flatMapSingle(ignored -&gt; workWithSecrets())
                // Now back to token based Vault, as we will clean up
                .flatMapSingle(ignored -&gt; disableK8sAuth())
                .map(ignored -&gt; "k8s example finished successfully.");
    }

    private Single&lt;ApiResponse&gt; workWithSecrets() { <span class="conum" data-value="2" />
        Kv2SecretsRx secrets = k8sVault.secrets(Kv2SecretsRx.ENGINE);

        return secrets.create(SECRET_PATH, Map.of("secret-key", "secretValue",
                                                  "secret-user", "username"))
                .flatMapSingle(ignored -&gt; secrets.get(SECRET_PATH))
                .peek(secret -&gt; {
                    if (secret.isPresent()) {
                        Kv2Secret kv2Secret = secret.get();
                        System.out.println("k8s first secret: " + kv2Secret.value("secret-key"));
                        System.out.println("k8s second secret: " + kv2Secret.value("secret-user"));
                    } else {
                        System.out.println("k8s secret not found");
                    }
                }).flatMapSingle(ignored -&gt; secrets.deleteAll(SECRET_PATH));
    }

    private Single&lt;ApiResponse&gt; disableK8sAuth() { <span class="conum" data-value="3" />
        return sys.deletePolicy(POLICY_NAME)
                .flatMapSingle(ignored -&gt; sys.disableAuth(K8sAuthRx.AUTH_METHOD.defaultPath()));
    }

    private Single&lt;ApiResponse&gt; enableK8sAuth() { <span class="conum" data-value="4" />
        // enable the method
        return sys.enableAuth(K8sAuthRx.AUTH_METHOD)
                // add policy
                .flatMapSingle(ignored -&gt; sys.createPolicy(POLICY_NAME, VaultPolicy.POLICY))
                .flatMapSingle(ignored -&gt; tokenVault.auth(K8sAuthRx.AUTH_METHOD)
                        .configure(ConfigureK8s.Request.builder()
                                           .address(k8sAddress)))
                .flatMapSingle(ignored -&gt; tokenVault.auth(K8sAuthRx.AUTH_METHOD)
                        // this must be the same role name as is defined in application.yaml
                        .createRole(CreateRole.Request.builder()
                                            .roleName("my-role")
                                            .addBoundServiceAccountName("*")
                                            .addBoundServiceAccountNamespace("default")
                                            .addTokenPolicy(POLICY_NAME)))
                .peek(ignored -&gt; k8sVault = Vault.create(config))
                .map(Function.identity());
    }
}</markup>

<ul class="colist">
<li data-value="1">Run the Kubernetes Authentication by enabling it.</li>
<li data-value="2">Create Kubernetes secrets.</li>
<li data-value="3">Disable Kubernetes authentication if needed.</li>
<li data-value="4">Function used to enable Kubernetes authentication.</li>
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