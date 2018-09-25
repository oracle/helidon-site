<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Configuration Secrets</dt>
<dd slot="desc"><p>When security requires a configuration with repeating complex elements, use Helidon
 Config.</p>

<p>This example configures a basic authentication provider and
 protects static content on the web server. It also includes annotations in Jersey.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Protecting Static Content</h2>
<div class="section">
<markup
lang="yaml"
title="application.yaml"
>security:
  providers:
    # Attribute based access control, validates roles
    - abac:
    # HTTP Basic authentication provider
    - http-basic-auth:
        realm: "helidon"
        users:
          - login: "jack"
            password: "password"
            roles: ["user", "admin"]
          - login: "jill"
            password: "password"
            roles: ["user"]
          - login: "john"
            password: "password"
  # Protect static content - require authenticated user
  web-server:
    paths:
      - path: "/static-cp[/{*}]"
        authenticate: true</markup>


<h3 >Protecting Configuration Secrets</h3>
<div class="section">
<p>If you don&#8217;t provide an explicit instance of Helidon Config to a MicroProfile server, then the
secure config filter <strong>is enabled by default</strong>. However, if you don&#8217;t configure it, the secure config filter
 only supports a template for aliasing that checks that no clear text passwords are
 present (template ${CLEAR=&#8230;&#8203;}.</p>

<p>To add the secure config filter:</p>

<markup
lang="java"
title="Add secure config filter"
>Config helidonConfig = Config.builder()
    .addFilter(SecureConfigFilter.fromConfig())
    .build();</markup>

<p>Put encrypted values into your
 configuration file so that it can be stored in a public repository with no danger of
 exposing the secret values. Be sure to use a strong and secret password.</p>

<p>The supported templates are:</p>

<div class="block-title"><span>Templates</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 11.111%;">
<col style="width: 33.333%;">
<col style="width: 55.556%;">
</colgroup>
<thead>
<tr>
<th>Template</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>${CLEAR=&#8230;&#8203;}</td>
<td>Secret in clear text (for testing) - <code>requiresEncryption</code> must be disabled</td>
<td>${CLEAR=knownSecret}</td>
</tr>
<tr>
<td>${RSA=&#8230;&#8203;}</td>
<td>Public/private key encryption, base64 value</td>
<td>${RSA=aGr3sFCMQznixrgbIk9qNfoLnO1cdi3H86qweCNjxFvH4dYg5IQM1EuoyTjJaXcSCG5MBskpeA3bjnWYrzeAFFlZHuYSPsb+wJVzGLrfUColTn+BPJjpJ3rmEd3AVkJl1ASfBBMh3q3deC+rvUdhfoTGBO8sC0teUATklCQSxfHOnIxswxqrplnoGXToGiTIfehiN2IZNulRKeoDQ0AeoKREmq5au4L8OOmS+D9BqnlKMc0F1tULZ7+h3Cxla4lXC5WRPoPfHBU4vzRZOGzeDvLkRgrD60caw/wKn5M0Wy1A1cKR8E46ceBXCjJ2eWIcLyhZSAZWDe3ceNrawHZtCg==}</td>
</tr>
<tr>
<td>${AES=&#8230;&#8203;}</td>
<td>Shared secret ecryption, base64 value</td>
<td>${AES=D/UgMzsNb265HU1NDvdzm7tACHdsW6u1PjYEcRkV/OLiWcI+ET6Q4MKCz0zHyEh9}</td>
</tr>
<tr>
<td>${ALIAS=&#8230;&#8203;}</td>
<td>Reference to another key</td>
<td>${ALIAS=someOtherKey}</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 >Requiring encryption</h3>
<div class="section">
<p>The secure config filter has an option that defines whether
encryption is required or not. If it&#8217;s set to true, which is the default, then:</p>

<ul class="ulist">
<li>
<p>Configuration values with ${CLEAR=&#8230;&#8203;} template will cause an exception when
requested.</p>

</li>
<li>
<p>The filter fails during bootstrap if <code>security.config.aes.insecure-passphrase</code>
is configured.</p>

</li>
</ul>
</div>

<h3 >Using symmetric encryption (AES)</h3>
<div class="section">
<p>Symmetric encryption is based on a shared secret that is known by the person
encrypting the value and is also provided to the application.</p>


<h4 >Encrypting values (AES)</h4>
<div class="section">
<p>The secure config filter provides a Main class <code>io.helidon.security.tools.config.Main</code>
 that can be used to encrypt values.</p>

<markup
lang="bash"
title="Encrypt secret <code>secretToEncrypt</code> using shared secret <code>masterPassword</code>"
>java io.helidon.security.tools.config.Main aes masterPassword secretToEncrypt</markup>

<p>The tool returns the string to be entered into configuration as the value of a
 property.</p>

</div>

<h4 >Shared Secret (AES)</h4>
<div class="section">
<p>You can provide a shared secret in a couple of ways:</p>

<ul class="ulist">
<li>
<p>in configuration - for testing/demo purposes only - key is
<code>security.config.aes.insecure-passphrase</code></p>

</li>
<li>
<p>as an environment variable - <code>SECURE_CONFIG_AES_MASTER_PWD</code></p>

</li>
</ul>
</div>
</div>

<h3 >Using asymmetric encryption (RSA)</h3>
<div class="section">
<p>This approach is based on a pair of keys: a public key which is known to anybody, and a
 private key which is known to a limited set of parties (usually a single person or
 process).
 For asymmetric encryption, the following is true:</p>

<ul class="ulist">
<li>
<p>a value encrypted by a public key can only be decrypted by the private key</p>

</li>
<li>
<p>a value encrypted by a private key can only be decrypted by the public key</p>

</li>
</ul>
<p>When using the secure config filter, you should encrypt the configuration values
using the public key, and give the application process access to the
private key to decrypt the values.</p>


<h4 >Encrypting values (RSA)</h4>
<div class="section">
<p>The secure config filter provides a Main class <code>io.helidon.security.tools.config.Main</code>
 that can be used to encrypt values.</p>

<markup
lang="bash"
title="Encrypt secret <code>secretToEncrypt</code> using public certificate in a keystore"
>java io.helidon.security.tools.config.Main rsa /path/to/keystore.p12 keystorePassword publicCertAlias secretToEncrypt</markup>

<p>The tool returns the string to be entered into configuration as the value of a
 property.</p>

</div>

<h4 >Configure secure config filter (RSA)</h4>
<div class="section">
<p>You can configure the properties of a private key. These
 keys are prefixed with <code>security.config.rsa</code></p>

<div class="block-title"><span>RSA Configuration Options: Keystore</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 25%;">
<col style="width: 41.667%;">
</colgroup>
<thead>
<tr>
<th>What</th>
<th>Configuration Key</th>
<th>Environment Variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Keystore path</td>
<td><code>keystore-path</code></td>
<td><code>SECURE_CONFIG_RSA_PRIVATE_KEY</code></td>
<td>Keystore is located in file system</td>
</tr>
<tr>
<td>Keystore</td>
<td><code>keystore-resource-path</code></td>
<td>N/A</td>
<td>Keystore is located on classpath</td>
</tr>
<tr>
<td>Private key alias</td>
<td><code>key-alias</code></td>
<td><code>SECURE_CONFIG_PRIVATE_KEY_ALIAS</code></td>
<td>Alias of the private key (such as "1", which is usually the default)</td>
</tr>
<tr>
<td>Keystore passphrase</td>
<td><code>keystore-passphrase</code></td>
<td><code>SECURE_CONFIG_PRIVATE_KEYSTORE_PASSPHRASE</code></td>
<td>Password for the keystore (and private key).</td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>RSA Configuration Options: PEM (PKCS#8) private key</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 25%;">
<col style="width: 41.667%;">
</colgroup>
<thead>
<tr>
<th>What</th>
<th>Configuration Key</th>
<th>Environment Variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Path</td>
<td><code>pem-key-path</code></td>
<td><code>SECURE_CONFIG_RSA_PEM_KEY</code></td>
<td>Key is located on file system</td>
</tr>
<tr>
<td>Resource path</td>
<td><code>pem-key-resource-path</code></td>
<td>N/A</td>
<td>Key is located on classpath</td>
</tr>
<tr>
<td>Passphrase</td>
<td><code>pem-key-passphrase</code></td>
<td><code>SECURE_CONFIG_PRIVATE_KEY_PASSPHRASE</code></td>
<td>Password protecting the private key</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="yaml"
title="Example yaml configuration"
>security.config:
  # Set to true for production - if set to true, clear text passwords will cause failure
  require-encryption: false
  # The "master" password for AES decryption. For production, set this via system property or environment variable.
  aes.insecure-passphrase: "myMasterPasswordForEncryption"
  # See documentation of pki-util
  rsa:
    # load from classpath
    keystore-resource-path: ".ssh/keystore.p12"
    # If keystore is used, alias to use from the keystore (in this example, it is "1")
    key-alias: "1"
    # Password of keystore
    keystore-passphrase: "helidon"</markup>

</div>
</div>
</div>
</doc-view>
