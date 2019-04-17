<doc-view>

<h2 id="_implemented_security_providers">Implemented Security Providers</h2>
<div class="section">
<p>The following providers are implemented:</p>

<ul class="ulist">
<li>
<p><router-link to="#_jwt_provider" @click.native="this.scrollFix('#_jwt_provider')">JWT Provider</router-link></p>

</li>
<li>
<p><router-link to="#_http_basic_authentication_provider" @click.native="this.scrollFix('#_http_basic_authentication_provider')">HTTP Basic Authentication</router-link></p>

</li>
<li>
<p><router-link to="#HTTP Digest Authentication Provider" @click.native="this.scrollFix('#HTTP Digest Authentication Provider')">HTTP Digest Authentication</router-link></p>

</li>
<li>
<p><router-link to="#_header_authentication_provider" @click.native="this.scrollFix('#_header_authentication_provider')">Header Assertion</router-link></p>

</li>
<li>
<p><router-link to="#_http_signatures" @click.native="this.scrollFix('#_http_signatures')">HTTP Signatures</router-link></p>

</li>
<li>
<p><router-link to="#_abac_attribute_based_access_control_authorization_provider" @click.native="this.scrollFix('#_abac_attribute_based_access_control_authorization_provider')">ABAC Authorization</router-link></p>

</li>
<li>
<p>Google Login Authentication Provider</p>
<ul class="ulist">
<li>
<p>please see security example: <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/google-login">https://github.com/oracle/helidon/tree/master/examples/security/google-login</a></p>

</li>
</ul>
</li>
<li>
<p>OIDC (Open ID Connect) Authentication provider - an OAuth extension for authentication</p>
<ul class="ulist">
<li>
<p>please see security example: <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/idcs-login">https://github.com/oracle/helidon/tree/master/examples/security/idcs-login</a></p>

</li>
</ul>
</li>
<li>
<p>IDCS Role Mapping Provider - a role mapper that can be used with any authentication provider, retrieves roles from IDCS</p>
<ul class="ulist">
<li>
<p>please see security example: <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/idcs-login">https://github.com/oracle/helidon/tree/master/examples/security/idcs-login</a></p>

</li>
</ul>
</li>
</ul>

<h3 id="_jwt_provider">JWT Provider</h3>
<div class="section">
<p>JSON Web Token (JWT) provider has support for authentication and outbound security.</p>

<p>Authentication is based on validating the token (signature, valid before etc.) and on asserting the subject
of the JWT subject claim.</p>

<p>For outbound, we support either token propagation (e.g. the token from request is propagated further) or
support for generating a brand new token based on configuration of this provider.</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Maven groupId</td>
<td>io.helidon.security.providers</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-providers-jwt</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.providers.jwt</td>
</tr>
<tr>
<td>Provider class</td>
<td>JwtProvider</td>
</tr>
<tr>
<td>Provider key</td>
<td>jwt</td>
</tr>
</tbody>
</table>
</div>
<p>This provider is:</p>

<ul class="ulist">
<li>
<p>Authentication Provider</p>

</li>
<li>
<p>Outbound Security Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-jwt&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_configuration_based_approach">Configuration Based Approach</h4>
<div class="section">
<p>All configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>optional</td>
<td> false</td>
<td>If set to true, the provider will return "ABSTAIN" rather than "FAILURE" if token is not present in request</td>
</tr>
<tr>
<td>authenticate</td>
<td>true</td>
<td>Whether to attempt authentication</td>
</tr>
<tr>
<td>propagate</td>
<td>true</td>
<td>Whether to attempt identity propagation/JWT creation</td>
</tr>
<tr>
<td>principal-type</td>
<td>USER</td>
<td>Whether we authenticate a user or a service (other option is SERVICE)</td>
</tr>
<tr>
<td>atn-token</td>

<td>A group for configuring authentication of the request</td>
</tr>
<tr>
<td>atn-token/jwk-*</td>

<td>Configuration of the JWK to obtain key(s) to validate signatures of inbound token. The JWK should contain public keys. This may be: jwk-path, jwk-resource-path, jwk-url, jwk-content-plain (actual JSON string), jwk-content (base64)</td>
</tr>
<tr>
<td>atn-token/handler</td>
<td>Authorization bearer</td>
<td>A handler configuration for inbound token - e.g. how to extract it</td>
</tr>
<tr>
<td>atn-token/handler/header</td>
<td>Authorization</td>
<td>Name of a header the token is expected in</td>
</tr>
<tr>
<td>atn-token/handler/prefix</td>
<td>bearer</td>
<td>Prefix before the token value (optional)</td>
</tr>
<tr>
<td>atn-token/handler/regexp</td>

<td>Regular expression to obtain the token, first matching group is used (optional)</td>
</tr>
<tr>
<td>sign-token</td>

<td>A group for configuring outbound security</td>
</tr>
<tr>
<td>sign-token/jwk-*</td>

<td>Configuration of the JWK to use when generating tokens (follows same rules as atn-token/jwk above), this JWK must contain private keys when using asymmetric ciphers</td>
</tr>
<tr>
<td>sign-token/jwt-issuer</td>

<td>When we issue a new token, this is the issuer to be placed into it (validated by target service)</td>
</tr>
<tr>
<td>sign-token/outbound</td>

<td>A group for configuring outbound rules (based on transport, host and/or path)</td>
</tr>
<tr>
<td>sign-token/outbound/name</td>

<td>A short descriptive name for configured target service(s)</td>
</tr>
<tr>
<td>sign-token/outbound/transports</td>
<td>*</td>
<td>An array of transports this outbound matches (e.g. https)</td>
</tr>
<tr>
<td>sign-token/outbound/hosts</td>
<td>*</td>
<td>An array of hosts this outbound matches, may use * as a a wild-card (e.g. *.oracle.com)</td>
</tr>
<tr>
<td>sign-token/outbound/paths</td>
<td>*</td>
<td>An array of paths on the host this outbound matches, may use * as a wild-card (e.g. /some/path/*)</td>
</tr>
<tr>
<td>sign-token/outbound/outbound-token</td>
<td>Authorization bearer</td>
<td>Configuration of outbound token handler (same as atn-token/handler)</td>
</tr>
<tr>
<td>sign-token/outbound/outbound-token/format</td>

<td>Java text format for generating the value of outbound token header (e.g. "bearer %1$s")</td>
</tr>
<tr>
<td>sign-token/outbound/jwk-kid</td>

<td>If this key is defined, we are generating a new token, otherwise we propagate existing. Defines the key id of a key definition in the JWK file to use for signing the outbound token</td>
</tr>
<tr>
<td>sign-token/outbound/jwt-kid</td>

<td>A key to use in the generated JWT - this is for the other service to locate the verification key in their JWK</td>
</tr>
<tr>
<td>sign-token/outbound/jwt-audience</td>

<td>Audience this key is generated for (e.g. <a id="" title="" target="_blank" href="http://www.example.org/api/myService">http://www.example.org/api/myService</a>) - validated by the other service</td>
</tr>
<tr>
<td>sign-token/outbound/jwt-not-before-seconds</td>
<td>5</td>
<td>Makes this key valid this amount of seconds into the past. Allows a certain time-skew for the generated token to be valid before current time (e.g. when we expect a certain misalignment of clocks)</td>
</tr>
<tr>
<td>sign-token/outbound/jwt-validity-seconds</td>
<td>1 day</td>
<td>Token validity in seconds</td>
</tr>
</tbody>
</table>
</div>
<p>Example configuration with authentication and outbound security:</p>

<markup
lang="yaml"

>- jwt:
    atn-token:
        jwk-path: "/config/securiy/verify-jwk.json"
    sign-token:
        jwk-path: "/config/security/sign-jwk.json"
        jwt-issuer: "http://www.example.org/myservice"
        outbound:
         - name: "internal-services"
           # create a new token
           hosts:
             - "*.example.org"
           jwk-kid: "internal-key"
           jwt-audience: "http://www.example.org/services"
         - name: "b2b-service-49"
           # create a new token and send it in a custom header
           hosts:
             - "b2b.partner.org"
           paths:
             - "/services/49"
           jwk-kid: "partner-b2b"
           jwt-audience: "http://b2b.partner.org"
           outbound-token:
             header: "X-Partner-Auth"
         - name: "as-is"
           # identity propagation (use existing token)
           hosts:
             - "*.internal.org"</markup>

</div>
</div>

<h3 id="_http_basic_authentication_provider">HTTP Basic Authentication Provider</h3>
<div class="section">
<p>Basic authentication support authentication of request and identity propagation for
outbound calls.
Outbound security with basic authentication only works if the request is authenticated
with basic authentication (e.g. we re-use the username and password from inbound request).</p>

<p>Basic authentication is an HTTP header named <code>Authorization</code>
with value of <code>basic base64(username:password)</code>.</p>

<p>This provider also supports "challenging" the client to provide basic
authentication if missing from request.</p>

<p>See <a id="" title="" target="_blank" href="https://tools.ietf.org/html/rfc7617">https://tools.ietf.org/html/rfc7617</a>.</p>

<p>These authentication schemes
should be <em>obsolete</em>, though they provide a very easy way to test a protected resource.
Note that basic authentication sends username and password unencrypted over the network!</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Maven groupId</td>
<td>io.helidon.security.providers</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-providers-http-auth</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.providers.httpauth</td>
</tr>
<tr>
<td>Provider class</td>
<td>HttpBasicAuthProvider</td>
</tr>
<tr>
<td>Provider key</td>
<td>http-basic-auth</td>
</tr>
</tbody>
</table>
</div>
<p>This provider is:</p>

<ul class="ulist">
<li>
<p>Authentication Provider</p>

</li>
<li>
<p>Outbound Security Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-http-auth&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_configuration_based_approach_2">Configuration Based Approach</h4>
<div class="section">
<p>All configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>realm</td>
<td> helidon</td>
<td>Authentication realm - may be shown to user by browser</td>
</tr>
<tr>
<td>principal-type</td>
<td>USER</td>
<td>Type of subject authenticated by this provider - USER or SERVICE</td>
</tr>
<tr>
<td>users</td>
<td>none</td>
<td>A list of users (login, password and roles). Currently to externalize this you must use builder approach.</td>
</tr>
</tbody>
</table>
</div>
<p>Example configuration with a single user (may have more):</p>

<markup
lang="yaml"

>- http-basic-auth:
    users:
      - login: "jack"
        password: "jackIsGreat"
        roles: ["user", "admin"]</markup>

<p>Example configuration with a single user (may have more) using secured config
filter (to encrypt passwords) - in this example, the password is intentionally in
clear text to show its value (see <router-link to="/microprofile/06_configuration">Configuration Secrets</router-link>)</p>

<markup
lang="yaml"

>- http-basic-auth:
    realm: "helidon"
    users:
      - login: "jack"
        password: "${CLEAR=jackIsGreat}"
        roles: ["user", "admin"]</markup>

</div>

<h4 id="_builder_based_approach">Builder Based Approach</h4>
<div class="section">
<p>Example of builder with a user store (UserStore is an interface that must be implemented).
There is an existing implementation "ConfigUserStore" that can read configuration of users
from Helidon config instance (see "users" configuration key above).
The built instance can then be registered with security to be used for request authentication.</p>

<markup
lang="java"

>HttpBasicAuthProvider.builder()
  .realm("helidon")
  .subjectType(SubjectType.SERVICE)
  .userStore(aUserStore)
  .build();</markup>

</div>
</div>

<h3 id="_http_digest_authentication">HTTP Digest Authentication</h3>
<div class="section">
<p>Digest authentication provider supports only authentication of inbound requests (no outbound).</p>

<p>This provider also supports "challenging" the client to provide digest
authentication if missing from request.</p>

<p>See <a id="" title="" target="_blank" href="https://tools.ietf.org/html/rfc7616">https://tools.ietf.org/html/rfc7616</a>.</p>

<p>These authentication schemes
should be <em>obsolete</em>, though they provide a very easy way to test a protected resource.
Note that basic authentication sends username and password unencrypted over the network!</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Maven groupId</td>
<td>io.helidon.security.providers</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-providers-http-auth</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.providers.httpauth</td>
</tr>
<tr>
<td>Provider class</td>
<td>HttpDigestAuthProvider</td>
</tr>
<tr>
<td>Provider key</td>
<td>http-digest-auth</td>
</tr>
</tbody>
</table>
</div>
<p>This provider is:</p>

<ul class="ulist">
<li>
<p>Authentication Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-http-auth&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_configuration_based_approach_3">Configuration based approach</h4>
<div class="section">
<p>All configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>realm</td>
<td>helidon</td>
<td>Authentication realm - may be shown to user by browser</td>
</tr>
<tr>
<td>principal-type</td>
<td>USER</td>
<td>Type of subject authenticated by this provider - USER or SERVICE</td>
</tr>
<tr>
<td>users</td>
<td>none</td>
<td>A list of users (login, password and roles). Currently to externalize this you must use builder approach.</td>
</tr>
<tr>
<td>algorithm</td>
<td>MD5</td>
<td>Only MD5 supported</td>
</tr>
<tr>
<td>nonce-timeout-millis</td>
<td>1 day</td>
<td>Number of milliseconds for the nonce timeout</td>
</tr>
<tr>
<td>server-secret</td>
<td>random</td>
<td>A string to use as a server secret - this is to use digest auth between multiple servers (e.g. when in a cluster). Used to encrypt nonce. This must not be known outside of this app, as others may create digest requests we would trust.</td>
</tr>
<tr>
<td>qop</td>
<td>NONE</td>
<td>only AUTH supported. If left empty, uses the legacy approach (older RFC version). AUTH-INT is not supported.</td>
</tr>
</tbody>
</table>
</div>
<p>Example configuration with a single user (may have more):</p>

<markup
lang="yaml"

>- http-digest-auth:
    realm: "helidon"
    users:
      - login: "jack"
        password: "${CLEAR=jackIsGreat}"
        roles: ["user", "admin"]</markup>

</div>

<h4 id="_builder_based_approach_2">Builder based approach</h4>
<div class="section">
<p>Example of builder with a user store (UserStore is an interface that must be implemented).
There is an existing implementation "ConfigUserStore" that can read configuration of users
from Helidon config instance (see "users" configuration key above).
The built instance can then be registered with security to be used for request authentication.</p>

<markup
lang="java"

>HttpDigestAuthProvider.builder()
  .realm("helidon")
  .digestServerSecret("aPassword".toCharArray())
  .userStore(buildUserStore())</markup>

</div>
</div>

<h3 id="_header_authentication_provider">Header Authentication Provider</h3>
<div class="section">
<p>This provider inspects a specified request header and extracts the username/service name from it and
asserts it as current subject&#8217;s principal.</p>

<p>This can be used when we use perimether authentication (e.g. there is a gateway that takes
care of authentication and propagates the user in a header).</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Maven groupId</td>
<td>io.helidon.security.providers</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-providers-header</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.providers.header</td>
</tr>
<tr>
<td>Provider class</td>
<td>HeaderAtnProvider</td>
</tr>
<tr>
<td>Provider key</td>
<td>header-atn</td>
</tr>
</tbody>
</table>
</div>
<p>This provider is:</p>

<ul class="ulist">
<li>
<p>Authentication Provider</p>

</li>
<li>
<p>Outbound Security Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-header&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_configuration_based_approach_4">Configuration Based Approach</h4>
<div class="section">
<p>All configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>optional</td>
<td> false</td>
<td>If set to true, provider will abstain rather then fail if header not available</td>
</tr>
<tr>
<td>authenticate</td>
<td>true</td>
<td>If set to false, authentication will not be attempted</td>
</tr>
<tr>
<td>propagate</td>
<td>true</td>
<td>If set to false, identity propagation will not be done</td>
</tr>
<tr>
<td>principal-type</td>
<td>USER</td>
<td>Can be USER or SERVICE</td>
</tr>
<tr>
<td>atn-token</td>
<td>none</td>
<td>Token extraction and propagation, you can define which header to use and how to extract it</td>
</tr>
<tr>
<td>outbound-token</td>
<td>atn-token</td>
<td>If outbound token should be created differently than inbound</td>
</tr>
</tbody>
</table>
</div>
<p>Example configuration:</p>

<markup
lang="yaml"

>- header-atn:
    optional: true
    principal-type: SERVICE
    atn-token:
      header: "X-AUTH-USER"
    outbound-token:
      header: "Authorization"
      format: "bearer %1$s"</markup>

</div>

<h4 id="_builder_based_approach_3">Builder Based Approach</h4>
<div class="section">
<p>Example of a builder that configures the provider the same way as the above configuration approach.</p>

<markup
lang="java"

>HeaderAtnProvider.builder()
    .optional(true)
    .subjectType(SubjectType.SERVICE)
    .atnTokenHandler(TokenHandler.builder()
                             .tokenHeader("X-AUTH-USER")
                             .build())
    .outboundTokenHandler(TokenHandler.builder()
                                  .tokenHeader("Authorization")
                                  .tokenFormat("bearer %1$s")
                                  .build())
    .build();</markup>

</div>
</div>

<h3 id="_http_signatures">HTTP Signatures</h3>
<div class="section">
<p>Support for HTTP Signatures (both inbound and outbound).</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-http-sign&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_signature_basics">Signature basics</h4>
<div class="section">
<ul class="ulist">
<li>
<p>standard: based on <a id="" title="" target="_blank" href="https://tools.ietf.org/html/draft-cavage-http-signatures-03">https://tools.ietf.org/html/draft-cavage-http-signatures-03</a></p>

</li>
<li>
<p>key-id: an arbitrary string used to locate signature configuration - when a
request is received the provider locates validation configuration based on this
id (e.g. HMAC shared secret or RSA public key). Commonly used meanings are: key
fingerprint (RSA); API Key</p>

</li>
</ul>
</div>

<h4 id="_inbound_signatures">Inbound signatures</h4>
<div class="section">
<p>We act as a server and another party is calling us with a signed HTTP request.
We validate the signature and assume identity of the caller.</p>

<p>Builder example, starting from inside out:</p>

<markup
lang="java"
title="Inbound signature configuration"
>// Configuration of public key certificate to validate inbound requests
        KeyConfig keyConfig = KeyConfig.keystoreBuilder()
                .keystore(Resource.create(Paths.get("keystore.p12")))
                .keystorePassphrase("password".toCharArray())
                .certAlias("service_cert")
                .build();

        // Create inbound client definition (e.g. map key-id to a public key and principal name)
        InboundClientDefinition rsaInbound = InboundClientDefinition.builder("service1-rsa")
                .principalName("Service1")
                .publicKeyConfig(keyConfig)
                .build();

        // Now create a HTTP signature provider with inbound support (with a single supported signature)
        HttpSignProvider.builder()
                .addInbound(rsaInbound)
                .build();</markup>

<p>Configuration examples for hmac-sha256 and rsa-sha256 algorithms (as supported by
 this provider):</p>

<markup
lang="conf"
title="Inbound signature configuration"
>http-signatures {
    inbound {
        keys: [
            {
                key-id = "service1-hmac"
                # name of principal of the connecting party
                principal-name = "Service1"
                # SERVICE or USER, defaults to SERVICE
                principal-type = SERVICE
                # defaults to the one we configure (e.g. if hmac.secret is configured
                # it is hmac-sha256; if public-key is configured, it is rsa-sha256)
                algorithm = "hmac-sha256"
                # shared secret for symmetric signatures
                hmac.secret = "${CLEAR=encryptMe}"
            },
            {
                key-id = "service1-rsa"
                principal-name = "Service1"
                # configuration of public key to validate signature
                public-key {
                    # path to keystore
                    keystore-path = "src/main/resources/keystore.p12"
                    # defaults to PKCS12
                    keystore-type = "PKCS12"
                    # password of the keystore
                    # the ${CLEAR=} is a feature of
                    keystore-passphrase = "${CLEAR=password}"
                    # alias of the certificate to get public key from
                    cert-alias = "service_cert"
                }
            }
        ]
    }
}</markup>

</div>

<h4 id="_outbound_signatures">Outbound signatures</h4>
<div class="section">
<p>We act as a client and we sign our outgoing requests.</p>

<p>Builder example, starting from inside out (rsa only, as hmac is significantly
 simpler):</p>

<markup
lang="java"
title="Outbound signature configuration"
>// Configuration of private key to sign outbound requests
KeyConfig keyConfig = KeyConfig.keystoreBuilder()
        .keystore(Resource.create(Paths.get("src/main/resources/keystore.p12")))
        .keystorePassphrase("password".toCharArray())
        .keyAlias("myPrivateKey")
        .build();

OutboundTarget rsaTarget =  OutboundTarget.builder("service2-rsa")
        .addHost("service2") // considering service registry
        .addPath("/service2-rsa")
        .customObject(OutboundTargetDefinition.class,
                      OutboundTargetDefinition.builder("service1-rsa")
                              .privateKeyConfig(keyConfig)
                              .build())
        .build();

// Now create a HTTP signature provider with outbound support (with a single supported signature)
HttpSignProvider.builder()
        .outbound(OutboundConfig.builder()
                          .addTarget(rsaTarget)
                          .build())
        .build();</markup>

<p>Configuration examples for hmac-sha256 and rsa-sha256 algorithms (as supported by
 this provider):</p>

<markup
lang="conf"
title="Inbound signature configuration"
>http-signatures {
outbound: [
    {
        # Logical name of this outbound configuration
        name = "service2-trust-circle"
        # If ommited or one value is "*", all are supported
        transports = ["http", "https"]
        # If ommited or one value is "*", all are supported, may contain * as a sequence "any" characters/nubmers
        hosts = ["service2"]
        # If ommited, all are supported - regular expression
        paths = ["/service2"]

        # Configuration of signature (signing the request)
        signature {
            key-id = "service2-shared-secret"
            # HMAC shared secret (algorithm hmac-sha256)
            hmac.secret = "${CLEAR=somePasswordForHmacShouldBeEncrypted}"
        }
    },
    {
        name = "service2-rsa"
        hosts = ["service2"]
        paths = ["/service2-rsa"]

        signature {
            key-id = "service1-rsa"
            # RSA private key (algorithm rsa-sha256)
            private-key {
                # path to keystore
                keystore-path = "src/main/resources/keystore.p12"
                # Keystore type
                # PKCS12, JSK or RSA (not really a keystore, but directly the linux style private key unencrypted)
                # defaults to jdk default
                keystore-type = "PKCS12"
                # password of the keystore
                keystore-passphrase = "password"
                # alias of the key to sign request
                key-alias = "myPrivateKey"
            }
        }
    }
]
}</markup>

</div>
</div>

<h3 id="_abac_attribute_based_access_control_authorization_provider">ABAC (Attribute based access control) Authorization Provider</h3>
<div class="section">
<p>This provider is an authorization provider validating various attributes against
configured validators.</p>

<p>Any attribute of the following objects can be used:</p>

<ul class="ulist">
<li>
<p>environment (such as time of request) - e.g. env.time.year</p>

</li>
<li>
<p>subject (user) - e.g. subject.principal.id</p>

</li>
<li>
<p>subject (service) - e.g. service.principal.id</p>

</li>
<li>
<p>object (must be explicitly invoked by developer in code, as object cannot be automatically added to security context) - e.g. object.owner</p>

</li>
</ul>
<p>This provider checks that all defined ABAC validators are validated.
If there is a definition for a validator (e.g. an annotation) that is not checked,
the request is denied.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-abac&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>The following validators are implemented:</p>

<ul class="ulist">
<li>
<p><router-link to="#_role_validator" @click.native="this.scrollFix('#_role_validator')">Roles</router-link></p>

</li>
<li>
<p><router-link to="#_scope_validator" @click.native="this.scrollFix('#_scope_validator')">Scopes</router-link></p>

</li>
<li>
<p><router-link to="#_expression_language_policy_validator" @click.native="this.scrollFix('#_expression_language_policy_validator')">EL Policy</router-link></p>

</li>
<li>
<p><router-link to="#_time_validator" @click.native="this.scrollFix('#_time_validator')">Time</router-link></p>

</li>
</ul>
<markup
lang="java"
title="Example of using an object"
>@Authenticated
@Path("/abac")
public class AbacResource {
  @GET
  @Authorized(explicit = true)
  @PolicyStatement("${env.time.year &gt;= 2017 &amp;&amp; object.owner == subject.principal.id}")
  public Response process(@Context SecurityContext context) {
      // probably looked up from a database
      SomeResource res = new SomeResource("user");
      AuthorizationResponse atzResponse = context.authorize(res);

      if (atzResponse.isPermitted()) {
          //do the update
          return Response.ok().entity("fine, sir").build();
      } else {
          return Response.status(Response.Status.FORBIDDEN)
                  .entity(atzResponse.getDescription().orElse("Access not granted"))
                  .build();
      }
  }
}</markup>


<h4 id="_role_validator">Role Validator</h4>
<div class="section">
<p>Checks whether user/service is in role(s)</p>

<p>Configuration Key: role-validator</p>

<p>Annotations: @RolesAllowed, @Roles</p>

<markup
lang="java"
title="Example"
>@Roles("user_role")
@Roles(value = "service_role", subjectType = SubjectType.SERVICE)
@Authenticated
@Path("/abac")
public class AbacResource {
}</markup>

</div>

<h4 id="_scope_validator">Scope Validator</h4>
<div class="section">
<p>Checks whether user has the defined scopes</p>

<p>Configuration Key: scope-validator</p>

<p>Annotations: @Scope</p>

<markup
lang="java"
title="Example"
>@Scope("calendar_read")
@Scope("calendar_edit")
@Authenticated
@Path("/abac")
public class AbacResource {
}</markup>

</div>

<h4 id="_expression_language_policy_validator">Expression Language Policy Validator</h4>
<div class="section">
<p>Policy executor using Java EE policy expression language (EL)</p>

<p>Configuration Key: policy-javax-el</p>

<p>Annotations: @PolicyStatement</p>

<markup
lang="java"
title="Example"
>@PolicyStatement("${env.time.year &gt;= 2017}")
@Authenticated
@Path("/abac")
public class AbacResource {
}</markup>

</div>

<h4 id="_time_validator">Time Validator</h4>
<div class="section">
<p>Supports time of day and day of week checks</p>

<p>Configuration Key: time-validator</p>

<p>Annotations: @DaysOfWeek, @TimesOfDay</p>

<markup
lang="java"
title="Example"
>@TimeOfDay(from = "08:15:00", to = "12:00:00")
@TimeOfDay(from = "12:30:00", to = "17:30:00")
@DaysOfWeek({DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY})
@Authenticated
@Path("/abac")
public class AbacResource {
}</markup>

</div>
</div>
</div>
</doc-view>