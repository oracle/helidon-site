<doc-view>

<h2 >Implemented Security Providers</h2>
<div class="section">
<p>The following providers are implemented:</p>

<ul class="ulist">
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
<p>Google Login Authentication Provider - please see security examples</p>

</li>
<li>
<p>OIDC (Open ID Connect) Authentication provider (with Oracle IDCS extension) - please see security examples</p>

</li>
</ul>

<h3 >HTTP Basic Authentication Provider</h3>
<div class="section">
<p>Basic authentication support authentication of request and identity propagation for
outbound calls.
Outbound security with basic authentication only works if the request is authenticated
with basic authentication (e.g. we re-use the username and password from inbound request).</p>

<p>Basic authentication is an HTTP header named <code>Authorization</code>
with value of <code>basic base64(username:password)</code>.</p>

<p>This provider also supports "challenging" the client to provide basic
authentication if missing from request.</p>

<p>See <a id=""
title=""
target="_blank"
href="https://tools.ietf.org/html/rfc7617">https://tools.ietf.org/html/rfc7617</a>.</p>

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
<td>io.helidon.security</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-provider-http-auth</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.provider.httpauth</td>
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
<p>Authorization Provider</p>

</li>
<li>
<p>Outbound Security Provider</p>

</li>
<li>
<p>Audit Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-provider-http-auth&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 >Configuration Based Approach</h4>
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
<td> realm</td>
<td>Authentication realm - may be shown to user by browser</td>
</tr>
<tr>
<td>principal-type</td>
<td>USER</td>
<td>Type of subject authenticated by this provider - USER or SERVICE</td>
</tr>
<tr>
<td>users</td>

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
clear text to show its value (see secure config)</p>

<markup
lang="yaml"

>- http-basic-auth:
    realm: "helidon"
    users:
      - login: "jack"
        password: "${CLEAR=jackIsGreat}"
        roles: ["user", "admin"]</markup>

</div>

<h4 >Builder Based Approach</h4>
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

<h3 >HTTP Digest Authentication</h3>
<div class="section">
<p>Digest authentication provider supports only authentication of inbound requests (no outbound).</p>

<p>This provider also supports "challenging" the client to provide digest
authentication if missing from request.</p>

<p>See <a id=""
title=""
target="_blank"
href="https://tools.ietf.org/html/rfc7616">https://tools.ietf.org/html/rfc7616</a>.</p>

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
<td>io.helidon.security</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-provider-http-auth</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.provider.httpauth</td>
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
<li>
<p>Authorization Provider</p>

</li>
<li>
<p>Outbound Security Provider</p>

</li>
<li>
<p>Audit Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-provider-http-auth&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 >Configuration based approach</h4>
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
<td> realm</td>
<td>Authentication realm - may be shown to user by browser</td>
</tr>
<tr>
<td>principal-type</td>
<td>USER</td>
<td>Type of subject authenticated by this provider - USER or SERVICE</td>
</tr>
<tr>
<td>users</td>

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

<h4 >Builder based approach</h4>
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

<h3 >Header Authentication Provider</h3>
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
<td>io.helidon.security</td>
</tr>
<tr>
<td>Maven artifactId</td>
<td>helidon-security-provider-header-atn</td>
</tr>
<tr>
<td>Provider package</td>
<td>io.helidon.security.provider.header</td>
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
<p>Authorization Provider</p>

</li>
<li>
<p>Outbound Security Provider</p>

</li>
<li>
<p>Audit Provider</p>

</li>
</ul>
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-provider-header-atn&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 >Configuration Based Approach</h4>
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

<h4 >Builder Based Approach</h4>
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

<h3 >HTTP Signatures</h3>
<div class="section">
<p>Support for HTTP Signatures (both inbound and outbound).</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-provider-http-signature&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 >Signature basics</h4>
<div class="section">
<ul class="ulist">
<li>
<p>standard: based on <a id=""
title=""
target="_blank"
href="https://tools.ietf.org/html/draft-cavage-http-signatures-03">https://tools.ietf.org/html/draft-cavage-http-signatures-03</a></p>

</li>
<li>
<p>key-id: an arbitrary string used to locate signature configuration - when a
request is received the provider locates validation configuration based on this
id (e.g. HMAC shared secret or RSA public key). Commonly used meanings are: key
fingerprint (RSA); API Key</p>

</li>
</ul>
</div>

<h4 >Inbound signatures</h4>
<div class="section">
<p>We act as a server and another party is calling us with a signed HTTP request.
We validate the signature and assume identity of the caller.</p>

<p>Builder example, starting from inside out:</p>

<markup
lang="java"
title="Inbound signature configuration"
>// Configuration of public key certificate to validate inbound requests
        KeyConfig keyConfig = KeyConfig.keystoreBuilder()
                .keystore(Resource.from(Paths.get("keystore.p12")))
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

<h4 >Outbound signatures</h4>
<div class="section">
<p>We act as a client and we sign our outgoing requests.</p>

<p>Builder example, starting from inside out (rsa only, as hmac is significantly
 simpler):</p>

<markup
lang="java"
title="Outbound signature configuration"
>// Configuration of private key to sign outbound requests
KeyConfig keyConfig = KeyConfig.keystoreBuilder()
        .keystore(Resource.from(Paths.get("src/main/resources/keystore.p12")))
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
http://[]

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

<h3 >ABAC (Attribute based access control) Authorization Provider</h3>
<div class="section">
<p>This provider is an authorization provider validating various attributes against
configured validators.</p>

<p>Any attribute of the following objects can be used:
 - environment (such as time of request) - e.g. env.time.year
 - subject (user) - e.g. subject.principal.id
 - subject (service) - e.g. service.principal.id
 - object (must be explicitly invoked by developer in code, as object cannot be automatically added to security context) - e.g. object.owner</p>

<p>This provider checks that all defined ABAC validators are validated.
If there is a definition for a validator (e.g. an annotation) that is not checked,
the request is denied.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-provider-abac&lt;/artifactId&gt;
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


<h4 >Role Validator</h4>
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

<h4 >Scope Validator</h4>
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

<h4 >Expression Language Policy Validator</h4>
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

<h4 >Time Validator</h4>
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