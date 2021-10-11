<doc-view>

<h2 id="_implemented_security_providers">Implemented Security Providers</h2>
<div class="section">
<p>Helidon provides the following security providers for endpoint protection:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 16.667%;">
<col style="width: 8.333%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Provider</th>
<th>Type</th>
<th>Outbound supported</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><router-link to="#_oidc_provider" @click.native="this.scrollFix('#_oidc_provider')">OIDC Provider</router-link></td>
<td class="">Authentication</td>
<td class="">✅</td>
<td class="">Open ID Connect supporting JWT, Scopes, Groups and OIDC code flow</td>
</tr>
<tr>
<td class=""><router-link to="#_http_basic_authentication_provider" @click.native="this.scrollFix('#_http_basic_authentication_provider')">HTTP Basic Authentication</router-link></td>
<td class="">Authentication</td>
<td class="">✅</td>
<td class="">HTTP Basic Authentication support</td>
</tr>
<tr>
<td class=""><router-link to="#_http_digest_authentication_provider" @click.native="this.scrollFix('#_http_digest_authentication_provider')">HTTP Digest Authentication</router-link></td>
<td class="">Authentication</td>
<td class="">🚫</td>
<td class="">HTTP Digest Authentication support</td>
</tr>
<tr>
<td class=""><router-link to="#_header_authentication_provider" @click.native="this.scrollFix('#_header_authentication_provider')">Header Assertion</router-link></td>
<td class="">Authentication</td>
<td class="">✅</td>
<td class="">Asserting a user based on a header value</td>
</tr>
<tr>
<td class=""><router-link to="#_http_signatures_provider" @click.native="this.scrollFix('#_http_signatures_provider')">HTTP Signatures</router-link></td>
<td class="">Authentication</td>
<td class="">✅</td>
<td class="">Protecting service to service communication through signatures</td>
</tr>
<tr>
<td class=""><router-link to="#_idcs_role_mapper" @click.native="this.scrollFix('#_idcs_role_mapper')">IDCS Roles</router-link></td>
<td class="">Role Mapping</td>
<td class="">🚫</td>
<td class="">Retrieves roles from IDCS provider for authenticated user</td>
</tr>
<tr>
<td class=""><router-link to="#_abac_provider" @click.native="this.scrollFix('#_abac_provider')">ABAC Authorization</router-link></td>
<td class="">Authorization</td>
<td class="">🚫</td>
<td class="">Attribute based access control authorization policies</td>
</tr>
</tbody>
</table>
</div>
<p>The following providers are no longer evolved:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 16.667%;">
<col style="width: 8.333%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Provider</th>
<th>Type</th>
<th>Outbound supported</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><router-link to="#_google_login_provider" @click.native="this.scrollFix('#_google_login_provider')">Google Login</router-link></td>
<td class="">Authentication</td>
<td class="">✅</td>
<td class="">Authenticates a token from request against Google servers</td>
</tr>
<tr>
<td class=""><router-link to="#_jwt_provider" @click.native="this.scrollFix('#_jwt_provider')">JWT Provider</router-link></td>
<td class="">Authentication</td>
<td class="">✅</td>
<td class="">JWT tokens passed from frontend</td>
</tr>
</tbody>
</table>
</div>

<h3 id="_oidc_provider">OIDC Provider</h3>
<div class="section">
<p>Open ID Connect security provider.</p>


<h4 id="_setup">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-oidc&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.oidc.OidcProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>oidc</markup>

</div>

<h4 id="_example_code">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/idcs-login">https://github.com/oracle/helidon/tree/master/examples/security/idcs-login</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
  - oidc:
      client-id: "client-id-of-this-service"
      client-secret: "${CLEAR=client-secret-of-this-service}"
      identity-uri: "http://your-tenant.identity-server.com"
      frontend-uri: "http://my-service:8080"
      audience: "http://my-service"
      outbound:
        - name: "internal-services"
          hosts: ["*.example.org"]
          outbound-token:
            header: "X-Internal-Auth"</markup>

</div>

<h4 id="_configuration_options">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>client-id</code></td>
<td class="">&#160;</td>
<td class="">Client ID as generated by identity server</td>
</tr>
<tr>
<td class=""><code>client-secret</code></td>
<td class="">&#160;</td>
<td class="">Client secret as generated by identity server</td>
</tr>
<tr>
<td class=""><code>identity-uri</code></td>
<td class="">&#160;</td>
<td class="">URI of the identity server, base used to retrieve OIDC metadata</td>
</tr>
<tr>
<td class=""><code>frontend-uri</code></td>
<td class="">&#160;</td>
<td class="">Full URI of this service for redirects back from OIDC server</td>
</tr>
<tr>
<td class=""><code>issuer</code></td>
<td class=""><code>issuer</code> from OIDC metadata</td>
<td class="">Issuer of token - each JWT is validated to check the issuer</td>
</tr>
<tr>
<td class=""><code>audience</code></td>
<td class="">&#160;</td>
<td class="">Audience of a token - each JWT is validated to check the audience</td>
</tr>
<tr>
<td class=""><code>proxy-protocol</code></td>
<td class=""><code>http</code></td>
<td class="">Proxy protocol to use when proxy is used</td>
</tr>
<tr>
<td class=""><code>proxy-host</code></td>
<td class=""><code>null</code></td>
<td class="">Proxy host to use. When defined, triggers usage of proxy for HTTP requests</td>
</tr>
<tr>
<td class=""><code>proxy-port</code></td>
<td class=""><code>80</code></td>
<td class="">Port of the proxy server to use</td>
</tr>
<tr>
<td class=""><code>redirect-uri</code></td>
<td class=""><code>/oidc/redirect</code></td>
<td class="">URI to register web server component on, used by the OIDC server to redirect authorization requests to after a user logs in or approves scopes. Note that usually the redirect URI configured here must be the same one as configured on OIDC server.</td>
</tr>
<tr>
<td class=""><code>scope-audience</code></td>
<td class="">empty string</td>
<td class="">Audience of the scope required by this application. This is prefixed to the scope name when requesting scopes from the identity server.</td>
</tr>
<tr>
<td class=""><code>cookie-use</code></td>
<td class=""><code>true</code></td>
<td class="">Whether to use cookie to store JWT. If used, redirects happen only in case the user is not authenticated or has insufficient scopes</td>
</tr>
<tr>
<td class=""><code>cookie-name</code></td>
<td class=""><code>JSESSIONID</code></td>
<td class="">Name of the cookie</td>
</tr>
<tr>
<td class=""><code>cookie-domain</code></td>
<td class="">&#160;</td>
<td class="">Domain the cookie is valid for. Not used by default</td>
</tr>
<tr>
<td class=""><code>cookie-path</code></td>
<td class=""><code>/</code></td>
<td class="">Path the cookie is valid for.</td>
</tr>
<tr>
<td class=""><code>cookie-max-age-seconds</code></td>
<td class="">{nsbp}</td>
<td class="">When using cookie, used to set MaxAge attribute of the cookie, defining how long the cookie is valid.</td>
</tr>
<tr>
<td class=""><code>cookie-http-only</code></td>
<td class=""><code>true</code></td>
<td class="">When using cookie, if set to true, the HttpOnly attribute will be configured.</td>
</tr>
<tr>
<td class=""><code>cookie-secure</code></td>
<td class=""><code>false</code></td>
<td class="">When using cookie, if set to true, the Secure attribute will be configured.</td>
</tr>
<tr>
<td class=""><code>cookie-same-site</code></td>
<td class=""><code>Lax</code></td>
<td class="">When using cookie, used to set the SameSite cookie value. Can be "Strict" or "Lax". Setting this to "Strict" will result in infinite redirects when calling OIDC on a different host.</td>
</tr>
<tr>
<td class=""><code>query-param-use</code></td>
<td class=""><code>false</code></td>
<td class="">Whether to expect JWT in a query parameter</td>
</tr>
<tr>
<td class=""><code>query-param-name</code></td>
<td class=""><code>accessToken</code></td>
<td class="">Name of a query parameter that contains the JWT token when parameter is used.</td>
</tr>
<tr>
<td class=""><code>header-use</code></td>
<td class=""><code>false</code></td>
<td class="">Whether to expect JWT in a header field.</td>
</tr>
<tr>
<td class=""><code>header-token</code></td>
<td class=""><code>Authorization</code> header with prefix <code>bearer</code></td>
<td class="">A TokenHandler configuration to process header containing a JWT</td>
</tr>
<tr>
<td class=""><code>oidc-metadata-well-known</code></td>
<td class=""><code>true</code></td>
<td class="">If set to true, metadata will be loaded from default (well known) location, unless it is explicitly defined using oidc-metadata-resource. If set to false, it would not be loaded even if oidc-metadata-resource is not defined. In such a case all URIs must be explicitly defined (e.g. token-endpoint-uri).</td>
</tr>
<tr>
<td class=""><code>oidc-metadata.resource</code></td>
<td class=""><code>identity-uri/.well-known/openid-configuration</code></td>
<td class="">Resource configuration for OIDC Metadata containing endpoints to various identity services, as well as information about the identity server. See Resource.create(io.helidon.config.Config)</td>
</tr>
<tr>
<td class=""><code>token-endpoint-uri</code></td>
<td class=""><code>token_endpoint</code> in OIDC metadata, or <code>identity-url/oauth2/v1/token</code> if not available</td>
<td class="">URI of a token endpoint used to obtain a JWT based on the authentication code.</td>
</tr>
<tr>
<td class=""><code>authorization-endpoint-uri</code></td>
<td class="">"authorization_endpoint" in OIDC metadata, or <code>identity-uri/oauth2/v1/authorize</code> if not available</td>
<td class="">URI of an authorization endpoint used to redirect users to for logging-in.</td>
</tr>
<tr>
<td class=""><code>validate-with-jwk</code></td>
<td class=""><code>true</code></td>
<td class="">When true - validate against jwk defined by "sign-jwk", when false validate JWT through OIDC Server endpoint "validation-endpoint-uri"</td>
</tr>
<tr>
<td class=""><code>sign-jwk.resource</code></td>
<td class="">"jwks-uri" in OIDC metadata, or <code>identity-uri/admin/v1/SigningCert/jwk</code> if not available, only needed when jwt validation is done by us</td>
<td class="">A resource pointing to JWK with public keys of signing certificates used to validate JWT. See Resource.create(io.helidon.config.Config)</td>
</tr>
<tr>
<td class=""><code>introspect-endpoint-uri</code></td>
<td class="">"introspection_endpoint" in OIDC metadata, or <code>identity-uri/oauth2/v1/introspect</code></td>
<td class="">When validate-with-jwk is set to "false", this is the endpoint used</td>
</tr>
<tr>
<td class=""><code>base-scopes</code></td>
<td class=""><code>openid</code></td>
<td class="">Configure scopes to be requested by default. If the scope has a qualifier, it must be included here</td>
</tr>
<tr>
<td class=""><code>redirect</code></td>
<td class=""><code>true</code></td>
<td class="">Whether to redirect to identity server when authentication failed.</td>
</tr>
<tr>
<td class=""><code>realm</code></td>
<td class=""><code>helidon</code></td>
<td class="">Realm returned in HTTP response if redirect is not enabled or possible.</td>
</tr>
<tr>
<td class=""><code>redirect-attempt-param</code></td>
<td class=""><code>h_ra</code></td>
<td class="">Query parameter holding the number of times we redirected to an identity server. Customizable to prevent conflicts with application parameters</td>
</tr>
<tr>
<td class=""><code>max-redirects</code></td>
<td class=""><code>5</code></td>
<td class="">Maximal number of times we can redirect to an identity server. When the number is reached, no further redirects happen and the request finishes with an error (status 401)</td>
</tr>
<tr>
<td class=""><code>server-type</code></td>
<td class="">&#160;</td>
<td class="">Type of identity server. Currently supported is idcs or not configured (for default).</td>
</tr>
<tr>
<td class=""><code>propagate</code></td>
<td class="">&#160;</td>
<td class="">Whether to propagate the token we have. Defaults to <code>false</code> unless an outbound configuration is defined</td>
</tr>
<tr>
<td class=""><code>outbound</code></td>
<td class="">&#160;</td>
<td class="">A list of outbound configurations</td>
</tr>
<tr>
<td class=""><code>outbound.*.name</code></td>
<td class="">&#160;</td>
<td class="">Required name of outbound configuration</td>
</tr>
<tr>
<td class=""><code>outbound.*.transports</code></td>
<td class="">any transport</td>
<td class="">An array of transports this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.hosts</code></td>
<td class="">any host</td>
<td class="">An array of hosts this outbound configuration should be used for, can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.paths</code></td>
<td class="">any path</td>
<td class="">An array of paths this outbound configuration should be used for (such as <code>/greet</code>), can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.methods</code></td>
<td class="">any method</td>
<td class="">An array of HTTP methods this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token</code></td>
<td class=""><code>Authorization</code> header with <code>bearer</code> prefix</td>
<td class="">Configuration of outbound header used to propagate</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.header</code></td>
<td class="">&#160;</td>
<td class="">Name of the header used to propagate the token</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.prefix</code></td>
<td class="">&#160;</td>
<td class="">Prefix for the header value, such as <code>"bearer"</code> (only one of <code>prefix</code>, <code>regexp</code> and <code>format</code> should be defined, <code>regexp</code> wins over <code>prefix</code>, <code>format</code> wins over <code>regexp</code>)</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.format</code></td>
<td class="">&#160;</td>
<td class="">String format with a single parameter to create the header value, such as <code>"bearer %1s"</code></td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.regexp</code></td>
<td class="">&#160;</td>
<td class="">Regular expression to create the header value, such as <code>"bearer (.*)"</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work">How does it work?</h4>
<div class="section">
<p>At Helidon startup, if OIDC provider is configured, the following will happen:</p>

<ol style="margin-left: 15px;">
<li>
<code>client-id</code>, <code>client-secret</code>, and <code>identityUri</code> are validated - these must provide values

</li>
<li>
Unless all resources are configured as local resources, the provider attempts
to contact the <code>oidc-metadata.resource</code> endpoint to retrieve all endpoints

</li>
</ol>
<p>At runtime, depending on configuration&#8230;&#8203;</p>

<p>If a request comes without a token or with insufficient scopes:</p>

<ol style="margin-left: 15px;">
<li>
If <code>redirect</code> is set to <code>true</code> (default), request is redirected to the authorization
endpoint of the identity server. If set to false, <code>401</code> is returned

</li>
<li>
User authenticates against the identity server

</li>
<li>
The identity server redirects back to Helidon service with a code

</li>
<li>
Helidon service contacts the identity server&#8217;s token endpoint, to exchange the code
for a JWT

</li>
<li>
The JWT is stored in a cookie (if cookie support is enabled, which it is by default)

</li>
<li>
Helidon service redirects to original endpoint (on itself)

</li>
</ol>
<p>Helidon obtains a token from request (from cookie, header, or query parameter):</p>

<ol style="margin-left: 15px;">
<li>
Token is parsed as a singed JWT

</li>
<li>
We validate the JWT signature either against local JWK or against the identity server&#8217;s
introspection endpoint depending on configuration

</li>
<li>
We validate the issuer and audience of the token if it matches the configured values

</li>
<li>
A subject is created from the JWT, including scopes from the token

</li>
<li>
We validate that we have sufficient scopes to proceed, and return <code>403</code> if not

</li>
<li>
Handling is returned to security to process other security providers

</li>
</ol>
</div>
</div>

<h3 id="_http_basic_authentication_provider">HTTP Basic Authentication Provider</h3>
<div class="section">
<p>HTTP Basic authentication support</p>


<h4 id="_setup_2">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-http-auth&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.httpauth.HttpBasicAuthProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>http-basic-auth</markup>

</div>

<h4 id="_example_code_2">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/outbound-override">https://github.com/oracle/helidon/tree/master/examples/security/outbound-override</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
  - http-basic-auth:
      realm: "helidon"
      users:
      - login: "john"
        password: "${CLEAR=password}"
        roles: ["admin"]
      - login: "jack"
        password: "password"
        roles: ["user", "admin"]
      outbound:
        - name: "internal-services"
          hosts: ["*.example.org"]
          # Propagates current user's identity or identity from request property
          outbound-token:
            header: "X-Internal-Auth"
        - name: "partner-service"
          hosts: ["*.partner.org"]
          # Uses this username and password
          username: "partner-user-1"
          password: "${CLEAR=password}"</markup>

</div>

<h4 id="_configuration_options_2">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>realm</code></td>
<td class=""><code>helidon</code></td>
<td class="">The realm shown in challenge when user accesses a service without authentication</td>
</tr>
<tr>
<td class=""><code>principal-type</code></td>
<td class=""><code>USER</code></td>
<td class="">Type of authenticated entity - either <code>USER</code> or <code>SERVICE</code>, can be used in combination with
                            other authentication mechanism to authenticate both the user (as in person sitting in front of a computer)
                            and a service (as in the application requesting this service on user&#8217;s behalf)</td>
</tr>
<tr>
<td class=""><code>users</code></td>
<td class="">&#160;</td>
<td class="">List of users when using configuration based approach. As an alternative, you can implement a java service (see below).</td>
</tr>
<tr>
<td class=""><code>outbound</code></td>
<td class="">&#160;</td>
<td class="">A list of outbound configurations</td>
</tr>
<tr>
<td class=""><code>outbound.*.name</code></td>
<td class="">&#160;</td>
<td class="">Required name of outbound configuration</td>
</tr>
<tr>
<td class=""><code>outbound.*.username</code></td>
<td class="">&#160;</td>
<td class="">Optional username used for outbound security; if not provided, current identity is propagated</td>
</tr>
<tr>
<td class=""><code>outbound.*.password</code></td>
<td class="">&#160;</td>
<td class="">Optional password used for outbound security</td>
</tr>
<tr>
<td class=""><code>outbound.*.transports</code></td>
<td class="">any transport</td>
<td class="">An array of transports this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.hosts</code></td>
<td class="">any host</td>
<td class="">An array of hosts this outbound configuration should be used for, can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.paths</code></td>
<td class="">any path</td>
<td class="">An array of paths this outbound configuration should be used for (such as <code>/greet</code>), can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.methods</code></td>
<td class="">any method</td>
<td class="">An array of HTTP methods this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token</code></td>
<td class=""><code>Authorization</code> header with <code>basic</code> prefix</td>
<td class="">Configuration of outbound header used to propagate</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.header</code></td>
<td class="">&#160;</td>
<td class="">Name of the header used to propagate the token</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.prefix</code></td>
<td class="">&#160;</td>
<td class="">Prefix for the header value, such as <code>"basic "</code> (only one of <code>prefix</code>, <code>regexp</code> and <code>format</code> should be defined, <code>regexp</code> wins over <code>prefix</code>, <code>format</code> wins over <code>regexp</code>)</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.format</code></td>
<td class="">&#160;</td>
<td class="">String format with a single parameter to create the header value, such as <code>"basic %1s"</code></td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.regexp</code></td>
<td class="">&#160;</td>
<td class="">Regular expression to create the header value, such as <code>"basic (.*)"</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_2">How does it work?</h4>
<div class="section">
<p>See <a id="" title="" target="_blank" href="https://tools.ietf.org/html/rfc7617">https://tools.ietf.org/html/rfc7617</a>.</p>

<p><strong>Authentication of request</strong></p>

<p>When a request is received without the <code>Authorization: basic &#8230;&#8203;.</code> header, a challenge is returned to provide such
authentication.</p>

<p>When a request is received with the <code>Authorization: basic &#8230;&#8203;.</code> header, the username and password is validated
against configured users (and users obtained from custom service if any provided).</p>

<p>Subject is created based on the username and roles provided by the user store.</p>

<p><strong>Identity propagation</strong></p>

<p>When identity propagation is configured, there are several options for identifying username and password to propagate:</p>

<ol style="margin-left: 15px;">
<li>
We propagate the current username and password (inbound request must be authenticated using basic authentication).

</li>
<li>
We use username and password from an explicitly configured property (See <code>HttpBasicAuthProvider.EP_PROPERTY_OUTBOUND_USER</code>
and <code>HttpBasicAuthProvider.EP_PROPERTY_OUTBOUND_PASSWORD</code>)

</li>
<li>
We use username and password associated with an outbound target (see example configuration above)

</li>
</ol>
<p>Identity is propagated only if:</p>

<ol style="margin-left: 15px;">
<li>
There is an outbound target configured for the endpoint

</li>
<li>
Or there is an explicitly configured username/password for the current request (through request property)

</li>
</ol>
<p><strong>Custom user store</strong></p>

<p>Java service loader service <code>io.helidon.security.providers.httpauth.spi.UserStoreService</code> can be implemented to provide
 users to the provider, such as when validated against an internal database or LDAP server.
The user store is defined so you never need the clear text password of the user.</p>

<p><em>Warning on security of HTTP Basic Authenticaton (or lack thereof)</em></p>

<p>Basic authentication uses base64 encoded username and password and passes it over the network. Base64 is only encoding,
 not encryption - so anybody that gets hold of the header value can learn the actual username and password of the user.
This is a security risk and an attack vector that everybody should be aware of before using HTTP Basic Authentication.
We recommend using this approach only for testing and demo purposes.</p>

</div>
</div>

<h3 id="_http_digest_authentication_provider">HTTP Digest Authentication Provider</h3>
<div class="section">
<p>HTTP Digest authentication support</p>


<h4 id="_setup_3">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-http-auth&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.httpauth.HttpDigestAuthProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>http-digest-auth</markup>

</div>

<h4 id="_example_code_3">Example code</h4>
<div class="section">
<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
  - http-digest-auth:
      realm: "helidon"
      server-secret: "${CLEAR=service-wide-secret-not-known-outside}"
      users:
      - login: "john"
        password: "${CLEAR=password}"
        roles: ["admin"]
      - login: "jack"
        password: "password"
        roles: ["user", "admin"]</markup>

</div>

<h4 id="_configuration_options_3">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>realm</code></td>
<td class=""><code>helidon</code></td>
<td class="">The realm shown in challenge when user accesses a service without authentication</td>
</tr>
<tr>
<td class=""><code>principal-type</code></td>
<td class=""><code>USER</code></td>
<td class="">Type of authenticated entity - either <code>USER</code> or <code>SERVICE</code>, can be used in combination with
                            other authentication mechanism to authenticate both the user (as in person sitting in front of a computer)
                            and a service (as in the application requesting this service on user&#8217;s behalf)</td>
</tr>
<tr>
<td class=""><code>users</code></td>
<td class="">&#160;</td>
<td class="">List of users when using configuration based approach. As an alternative, you can implement a java service (see below).</td>
</tr>
<tr>
<td class=""><code>algorithm</code></td>
<td class=""><code>MD5</code></td>
<td class="">Only <code>MD5</code> supported</td>
</tr>
<tr>
<td class=""><code>nonce-timeout-millis</code></td>
<td class="">1 day</td>
<td class="">Number of milliseconds for the nonce timeout</td>
</tr>
<tr>
<td class=""><code>server-secret</code></td>
<td class="">random</td>
<td class="">A string to use as a server secret - this is to use digest auth between multiple servers (e.g. when in a cluster). Used to encrypt nonce. This must not be known outside of this app, as others may create digest requests we would trust.</td>
</tr>
<tr>
<td class=""><code>qop</code></td>
<td class=""><code>NONE</code></td>
<td class="">only <code>AUTH</code> supported. If left empty, uses the legacy approach (older RFC version). <code>AUTH-INT</code> is not supported.</td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_3">How does it work?</h4>
<div class="section">
<p>See <a id="" title="" target="_blank" href="https://tools.ietf.org/html/rfc7616">https://tools.ietf.org/html/rfc7616</a>.</p>

<p><strong>Authentication of request</strong></p>

<p>When a request is received without the <code>Authorization: digest &#8230;&#8203;.</code> header, a challenge is returned to provide such
authentication using <code>WWW-Authenticate</code> header.</p>

<p>When a request is received with the <code>Authorization: digest &#8230;&#8203;.</code> header, the request is validated
against configured users (and users obtained from custom service if any provided).</p>

<p>Subject is created based on the username and roles provided by the user store.</p>

<p><strong>Custom user store</strong></p>

<p>Java service loader service <code>io.helidon.security.providers.httpauth.spi.UserStoreService</code> can be implemented to provide
 users to the provider, such as when validated against an internal database or LDAP server.
The user store is defined so you never need the clear text password of the user.</p>

<p><em>Note on security of HTTP Digest Authenticaton</em></p>

<p>These authentication schemes
should be <em>obsolete</em>, though they provide a very easy way to test a protected resource.</p>

</div>
</div>

<h3 id="_header_authentication_provider">Header Authentication Provider</h3>
<div class="section">
<p>Asserts user or service identity based on a value of a header.</p>


<h4 id="_setup_4">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-header&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.header.HeaderAtnProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>header-atn</markup>

</div>

<h4 id="_example_code_4">Example code</h4>
<div class="section">
<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
    header-atn:
      atn-token:
        header: "X-AUTH-USER"
      outbound:
        - name: "internal-services"
          hosts: ["*.example.org"]
          # propagates the current user or service id using the same header as authentication
        - name: "partner-service"
          hosts: ["*.partner.org"]
          # propagates an explicit username in a custom header
          username: "service-27"
          outbound-token:
            header: "X-Service-Auth"</markup>

</div>

<h4 id="_configuration_options_4">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>optional</code></td>
<td class=""><code>false</code></td>
<td class="">If set to <code>true</code>, failure to authenticate will return <code>ABSTAIN</code> result instead of <code>FAILURE</code>. This is
    an important distinction when more than one provider is used</td>
</tr>
<tr>
<td class=""><code>authenticate</code></td>
<td class=""><code>true</code></td>
<td class="">If set to <code>false</code>, authentication will not be attempted (outbound security can still be used)</td>
</tr>
<tr>
<td class=""><code>propagate</code></td>
<td class=""><code>false</code></td>
<td class="">If explicitly set to <code>false</code>, identity propagation will not be done. Otherwise it is done if an <code>outbound</code>
                section is configured</td>
</tr>
<tr>
<td class=""><code>principal-type</code></td>
<td class=""><code>USER</code></td>
<td class="">Can be <code>USER</code> or <code>SERVICE</code></td>
</tr>
<tr>
<td class=""><code>atn-token</code></td>
<td class=""><code>none</code></td>
<td class="">Token extraction and propagation, you can define which header to use and how to extract it</td>
</tr>
<tr>
<td class=""><code>outbound</code></td>
<td class="">&#160;</td>
<td class="">A list of outbound configurations</td>
</tr>
<tr>
<td class=""><code>outbound.*.name</code></td>
<td class="">&#160;</td>
<td class="">Required name of outbound configuration</td>
</tr>
<tr>
<td class=""><code>outbound.*.username</code></td>
<td class="">&#160;</td>
<td class="">Optional username used for outbound security; if not provided, current identity is propagated</td>
</tr>
<tr>
<td class=""><code>outbound.*.transports</code></td>
<td class="">any transport</td>
<td class="">An array of transports this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.hosts</code></td>
<td class="">any host</td>
<td class="">An array of hosts this outbound configuration should be used for, can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.paths</code></td>
<td class="">any path</td>
<td class="">An array of paths this outbound configuration should be used for (such as <code>/greet</code>), can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.methods</code></td>
<td class="">any method</td>
<td class="">An array of HTTP methods this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token</code></td>
<td class="">same as <code>atn-token</code></td>
<td class="">Configuration of outbound header used to propagate</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.header</code></td>
<td class="">&#160;</td>
<td class="">Name of the header used to propagate the token</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.prefix</code></td>
<td class="">&#160;</td>
<td class="">Prefix for the header value, such as <code>"username "</code> (only one of <code>prefix</code>, <code>regexp</code> and <code>format</code> should be defined, <code>regexp</code> wins over <code>prefix</code>, <code>format</code> wins over <code>regexp</code>)</td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.format</code></td>
<td class="">&#160;</td>
<td class="">String format with a single parameter to create the header value, such as <code>"username %1s"</code></td>
</tr>
<tr>
<td class=""><code>outbound.*.outbound-token.regexp</code></td>
<td class="">&#160;</td>
<td class="">Regular expression to create the header value, such as <code>"username (.*)"</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_4">How does it work?</h4>
<div class="section">
<p>This provider inspects a specified request header and extracts the username/service name from it and
asserts it as current subject&#8217;s principal.</p>

<p>This can be used when we use perimeter authentication (e.g. there is a gateway that takes
care of authentication and propagates the user in a header).</p>

<p><strong>Identity propagation</strong></p>

<p>Identity is propagated only if an outbound target matches the target service.</p>

<p>The following options exist when propagating identity:
1. We propagate the current username using the configured header
2. We use username associated with an outbound target (see example configuration above)</p>

<p><strong>Caution</strong></p>

<p>When using this provider, you must be sure the header cannot be explicitly configured by a user or another service.
All requests should go through a gateway that removes this header from inbound traffic, and only configures it for
authenticated users/services.
Another option is to use this with fully trusted parties (such as services within a single company, on a single
protected network not accessible to any users), and of course for testing and demo purposes.</p>

</div>
</div>

<h3 id="_http_signatures_provider">HTTP Signatures Provider</h3>
<div class="section">
<p>Support for HTTP Signatures.</p>


<h4 id="_setup_5">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-http-sign&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.httpsign.HttpSignProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>http-signatures</markup>

</div>

<h4 id="_example_code_5">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/webserver-signatures">https://github.com/oracle/helidon/tree/master/examples/security/webserver-signatures</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
    - http-signatures:
        inbound:
          keys:
            - key-id: "service1-hmac"
              principal-name: "Service1 - HMAC signature"
              hmac.secret: "${CLEAR=somePasswordForHmacShouldBeEncrypted}"
            - key-id: "service1-rsa"
              principal-name: "Service1 - RSA signature"
              public-key:
                keystore:
                  resource.path: "src/main/resources/keystore.p12"
                  passphrase: "password"
                  cert.alias: "service_cert"
        outbound:
          - name: "service2-hmac"
            hosts: ["localhost"]
            paths: ["/service2"]
            signature:
              key-id: "service1-hmac"
              hmac.secret: "${CLEAR=somePasswordForHmacShouldBeEncrypted}"
          - name: "service2-rsa"
            hosts: ["localhost"]
            paths: ["/service2-rsa.*"]
            signature:
              key-id: "service1-rsa"
              private-key:
                keystore:
                  resource.path: "src/main/resources/keystore.p12"
                  passphrase: "password"
                  key.alias: "myPrivateKey"</markup>

</div>

<h4 id="_configuration_options_5">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>optional</code></td>
<td class=""><code>false</code></td>
<td class="">If set to <code>true</code>, failure to authenticate will return <code>ABSTAIN</code> result instead of <code>FAILURE</code>. This is
    an important distinction when more than one provider is used</td>
</tr>
<tr>
<td class=""><code>realm</code></td>
<td class=""><code>helidon</code></td>
<td class="">Realm used for challenge when request does not have a signature</td>
</tr>
<tr>
<td class=""><code>headers</code></td>
<td class=""><code>[SIGNATURE,AUTHORIZATION]</code></td>
<td class="">Headers to look for inbound signatures and to store outbound signatures</td>
</tr>
<tr>
<td class=""><code>sign-headers</code></td>
<td class=""><code>always = ["date"]</code></td>
<td class="">Headers to be signed</td>
</tr>
<tr>
<td class=""><code>sign-headers.*.method</code></td>
<td class="">default for all methods</td>
<td class="">Method this configuration is valid for</td>
</tr>
<tr>
<td class=""><code>sign-headers.*.always</code></td>
<td class="">&#160;</td>
<td class="">Array of headers to be always required in the request signature</td>
</tr>
<tr>
<td class=""><code>sign-headers.*.if-present</code></td>
<td class="">&#160;</td>
<td class="">Array of headers to be part of the signatures if present in the request</td>
</tr>
<tr>
<td class=""><code>inbound</code></td>
<td class="">&#160;</td>
<td class="">Configuration of inbound traffic for authenticating incoming requests</td>
</tr>
<tr>
<td class=""><code>inbound.keys</code></td>
<td class="">&#160;</td>
<td class="">Configuration of signature keys to verify incoming requests</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.key-id</code></td>
<td class="">&#160;</td>
<td class="">Key id as used in inbound signature to find the correct certificate/hmac configuration to verify the signature</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.principal-name</code></td>
<td class="">&#160;</td>
<td class="">The principal name (or user name) asserted when the signature is valid</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.principal-type</code></td>
<td class=""><code>SERVICE</code></td>
<td class="">The type of principal to assert (can be <code>USER</code>)</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.algorithm</code></td>
<td class="">according to other configuration</td>
<td class=""><code>hmac-sha256</code> or <code>rsa-sha256</code> is assumed if other configuration options for that type are set</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.hmac.secret</code></td>
<td class="">&#160;</td>
<td class="">Secret shared by the service that signed the request and this service for <code>hmac-sha256</code> algorithm</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.public-key</code></td>
<td class="">&#160;</td>
<td class="">Public key configuration, implies <code>rsa-sha256</code> algorithm</td>
</tr>
<tr>
<td class=""><code>inbound.keys.*.public-key.keystore</code></td>
<td class="">&#160;</td>
<td class="">Keystore configuration for public key - full configuration as defined by <code>KeyStore</code> class</td>
</tr>
<tr>
<td class=""><code>outbound</code></td>
<td class="">&#160;</td>
<td class="">A list of outbound configurations</td>
</tr>
<tr>
<td class=""><code>outbound.*.name</code></td>
<td class="">&#160;</td>
<td class="">Required name of outbound configuration</td>
</tr>
<tr>
<td class=""><code>outbound.*.username</code></td>
<td class="">&#160;</td>
<td class="">Optional username used for outbound security; if not provided, current identity is propagated</td>
</tr>
<tr>
<td class=""><code>outbound.*.password</code></td>
<td class="">&#160;</td>
<td class="">Optional password used for outbound security</td>
</tr>
<tr>
<td class=""><code>outbound.*.transports</code></td>
<td class="">any transport</td>
<td class="">An array of transports this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.hosts</code></td>
<td class="">any host</td>
<td class="">An array of hosts this outbound configuration should be used for, can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.paths</code></td>
<td class="">any path</td>
<td class="">An array of paths this outbound configuration should be used for (such as <code>/greet</code>), can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.methods</code></td>
<td class="">any method</td>
<td class="">An array of HTTP methods this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.signature</code></td>
<td class="">&#160;</td>
<td class="">Configuration related to outbound signature configuration</td>
</tr>
<tr>
<td class=""><code>outbound.*.signature.key-id</code></td>
<td class="">&#160;</td>
<td class="">Key id to use in the outbound signature (to map to appropriate public key in target service&#8217;s configuration)</td>
</tr>
<tr>
<td class=""><code>outbound.*.signature.hmac.secret</code></td>
<td class="">&#160;</td>
<td class="">Shared secret for hmac</td>
</tr>
<tr>
<td class=""><code>outbound.*.signature.private-key</code></td>
<td class="">&#160;</td>
<td class="">Private key configuration for rsa based signatures</td>
</tr>
<tr>
<td class=""><code>outbound.*.signature.private-key.keystore</code></td>
<td class="">&#160;</td>
<td class="">Keystore configuration for private key - full configuration as defined by <code>KeyStore</code> class</td>
</tr>
</tbody>
</table>
</div>
</div>

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

<h4 id="_how_does_it_work_5">How does it work?</h4>
<div class="section">
<p><strong>Inbound Signatures</strong>
We act as a server and another party is calling us with a signed HTTP request.
We validate the signature and assume identity of the caller.</p>

<p><strong>Outbound Signatures</strong>
We act as a client and we sign our outgoing requests.
If there is a matching <code>outbound</code> target specified in configuration,
 its configuration will be applied for signing the outgoing request,
 otherwise there is no signature added</p>

</div>
</div>

<h3 id="_idcs_role_mapper">IDCS Role Mapper</h3>
<div class="section">
<p>A role mapper to retrieve roles from Oracle IDCS.</p>


<h4 id="_setup_6">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-idcs-mapper&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.idcs.mapper.IdcsRoleMapperProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>idcs-role-mapper</markup>

</div>

<h4 id="_example_code_6">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/idcs-login/">https://github.com/oracle/helidon/tree/master/examples/security/idcs-login/</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
    - idcs-role-mapper:
        multitenant: false
        oidc-config:
            client-id: "client-id"
            client-secret: "client-secret"
            identity-uri: "IDCS identity server address"</markup>

</div>

<h4 id="_configuration_options_6">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>multitenant</code></td>
<td class=""><code>true</code></td>
<td class="">Whether to support multi-tenancy with this provider</td>
</tr>
<tr>
<td class=""><code>idcs-tenant-handler</code></td>
<td class="">Header <code>X-USER-IDENTITY-SERVICE-GUID</code></td>
<td class="">Multi-tenant specific <code>TokenHandler</code> configuration to retrieve the tenant id</td>
</tr>
<tr>
<td class=""><code>idcs-app-name-handler</code></td>
<td class="">Header <code>X-RESOURCE-SERVICE-INSTANCE-IDENTITY-APPNAME</code></td>
<td class="">Multi-tenant specific <code>TokenHandler</code> configuration to retrieve the application name</td>
</tr>
<tr>
<td class=""><code>cache-config</code></td>
<td class="">&#160;</td>
<td class="">Configuration of cache of roles for subjects</td>
</tr>
<tr>
<td class=""><code>cache-config.cache-enabled</code></td>
<td class=""><code>true</code></td>
<td class="">Possibility to disable the cache altogether</td>
</tr>
<tr>
<td class=""><code>cache-config.max-size</code></td>
<td class=""><code>100_000</code></td>
<td class="">Maximal number of records in the cache</td>
</tr>
<tr>
<td class=""><code>cache-config.cache-timeout-millis</code></td>
<td class="">1 hour</td>
<td class="">Cache timeout in milliseconds</td>
</tr>
<tr>
<td class=""><code>cache-config.cache-evict-delay-millis</code></td>
<td class="">1 minute</td>
<td class="">How long to wait before starting the first eviction process</td>
</tr>
<tr>
<td class=""><code>cache-config.cache-evict-period-millis</code></td>
<td class="">5 minutes</td>
<td class="">Period of running the eviction process</td>
</tr>
<tr>
<td class=""><code>cache-config.parallelism-threshold</code></td>
<td class=""><code>10_000</code></td>
<td class="">Threshold as used by <code>ConcurrentHashMap.forEachKey</code></td>
</tr>
<tr>
<td class=""><code>cache-config.evictor-class</code></td>
<td class="">&#160;</td>
<td class="">Implementation of <code>BiFunction</code> that receives key and value, and returns <code>true</code> for records that should be removed
    from the cache. Eviction mechanism should be fast, as it is called within methods of <code>ConcurrentHashMap</code></td>
</tr>
<tr>
<td class=""><code>subject-types</code></td>
<td class=""><code>USER</code></td>
<td class="">Can use <code>USER</code> and/or <code>SERVICE</code></td>
</tr>
<tr>
<td class=""><code>default-idcs-subject-type</code></td>
<td class=""><code>user</code></td>
<td class="">Default subject type to use when requesting roles, can be <code>user</code> or <code>client</code></td>
</tr>
<tr>
<td class=""><code>oidc-config</code></td>
<td class="">&#160;</td>
<td class=""><code>OidcConfig</code> configuration, except <code>validate-with-jwk</code> is set to <code>false</code>,
        and <code>server-type</code> is set to <code>idcs</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_6">How does it work?</h4>
<div class="section">
<p>The provider asks the IDCS server to provide list of roles for the currently
authenticated user.
The result is cached for a certain period of time (see <code>cache-config</code> above).</p>

</div>
</div>

<h3 id="_abac_provider">ABAC Provider</h3>
<div class="section">
<p>Attribute based access control authorization provider.</p>


<h4 id="_setup_7">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-abac&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.abac.AbacProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>abac</markup>

</div>

<h4 id="_example_code_7">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/attribute-based-access-control">https://github.com/oracle/helidon/tree/master/examples/security/attribute-based-access-control</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
    - abac:</markup>

</div>

<h4 id="_configuration_options_7">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>fail-on-unvalidated</code></td>
<td class=""><code>true</code></td>
<td class="">"Unvalidated" means: an attribute is defined, but there is no validator available for it</td>
</tr>
<tr>
<td class=""><code>fail-if-none-validated</code></td>
<td class=""><code>true</code></td>
<td class="">"None validated" means: there was not a single attribute that was validated</td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_7">How does it work?</h4>
<div class="section">
<p>ABAC uses available validators and validates them against attributes of the authenticated
 user.</p>

<p>Combinations of <code>fail-on-unvalidated</code> and <code>fail-if-none-validated</code>:</p>

<ol style="margin-left: 15px;">
<li>
<code>true</code> &amp; <code>true</code>: Will fail if any attribute is not validated and if any has failed validation

</li>
<li>
<code>false</code> &amp; <code>true</code>: Will fail if there is one or more attributes present and NONE of them is validated or if any has failed validation,
Will NOT fail if there is at least one validated attribute and any number of not validated attributes (and NONE failed)

</li>
<li>
<code>false</code> &amp; <code>false</code>: Will fail if there is any attribute that failed validation,
Will NOT fail if there are no failed validation or if there are NONE validated

</li>
</ol>
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
If there is a definition for a validator that is not checked,
the request is denied (depending on configuration as mentioned above).</p>

<p>ABAC provider also allows an object to be used in authorization process, such
as when evaluating if an object&#8217;s owner is the current user.
The following example uses the Expression language validator to demonstrate the point
in a JAX-RS resource:</p>

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

<p><strong>The following validators are implemented:</strong></p>

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
</ul>
</div>

<h4 id="_role_validator">Role Validator</h4>
<div class="section">
<p>Checks whether user/service is in either of the required role(s).</p>

<p>Configuration Key: <code>role-validator</code></p>

<p>Annotations: <code>@RolesAllowed</code>, <code>@RoleValidator.Roles</code></p>

<markup
lang="yaml"
title="Configuration example for <code>WebServer</code>"
>security:
  web-server.paths:
    - path: "/user[/{*}]"
      roles-allowed: ["user"]</markup>

<markup
lang="java"
title="JAX-RS example"
>@RolesAllowed("user")
@RoleValidator.Roles(value = "service_role", subjectType = SubjectType.SERVICE)
@Authenticated
@Path("/abac")
public class AbacResource {
}</markup>


<h5 id="_interaction_with_jax_rs_sub_resource_locators">Interaction with JAX-RS sub-resource locators</h5>
<div class="section">
<p>When using sub-resource locators in JAX-RS, the roles allowed are collected from each "level" of
execution:
- Application class annotations
- Resource class annotations + resource method annotations
- Sub-resource class annotations + sub-resource method annotations
- Sub-resource class annotations + sub-resource method annotations (for every sub-resource on the path)</p>

<p>The <code>RolesAllowed</code> or <code>Roles</code> annotation to be used is the last one in the path as defined above.</p>

<p><em>Example 1:</em>
There is a <code>RolesAllowed("admin")</code> defined on a sub-resource locator resource class.
In this case the required role is <code>admin</code>.</p>

<p><em>Example 2:</em>
There is a <code>RolesAllowed("admin")</code> defined on a sub-resource locator resource class and
a <code>RolesAllowed("user")</code> defined on the method of the sub-resource that provides the response.
In this case the required role is <code>user</code>.</p>

</div>
</div>

<h4 id="_scope_validator">Scope Validator</h4>
<div class="section">
<p>Checks whether user has all the required scopes.</p>

<p>Configuration Key: <code>scope-validator</code></p>

<p>Annotations: <code>@Scope</code></p>

<markup
lang="yaml"
title="Configuration example for <code>WebServer</code>"
>security:
  web-server.paths:
    - path: "/user[/{*}]"
      abac.scopes:
        ["calendar_read", "calendar_edit"]</markup>

<markup
lang="java"
title="JAX-RS example"
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

<p>Configuration Key: <code>policy-javax-el</code></p>

<p>Annotations: <code>@PolicyStatement</code></p>

<p>Example of a policy statement: <code>${env.time.year &gt;= 2017}</code></p>

<markup
lang="yaml"
title="Configuration example for <code>WebServer</code>"
>security:
  web-server.paths:
    - path: "/user[/{*}]"
      policy:
        statement: "hasScopes('calendar_read','calendar_edit') AND timeOfDayBetween('8:15', '17:30')"</markup>

<markup
lang="java"
title="JAX-RS example"
>@PolicyStatement("${env.time.year &gt;= 2017}")
@Authenticated
@Path("/abac")
public class AbacResource {
}</markup>

</div>
</div>

<h3 id="_google_login_provider">Google Login Provider</h3>
<div class="section">
<p>Authenticates a token from request against Google identity provider</p>


<h4 id="_setup_8">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-google-login&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.google.login.GoogleTokenProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>google-login</markup>

</div>

<h4 id="_example_code_8">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/google-login">https://github.com/oracle/helidon/tree/master/examples/security/google-login</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
    - provider:
        client-id: "Google client id"</markup>

</div>

<h4 id="_configuration_options_8">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>client-id</code></td>
<td class="">&#160;</td>
<td class="">Client id of an application. To create an application, use
    the Google developer console (<a id="" title="" target="_blank" href="https://developers.google.com/identity/sign-in/web/sign-in">https://developers.google.com/identity/sign-in/web/sign-in</a>)</td>
</tr>
<tr>
<td class=""><code>optional</code></td>
<td class=""><code>false</code></td>
<td class="">If set to <code>true</code>, failure to authenticate will return <code>ABSTAIN</code> result instead of <code>FAILURE</code>. This is
    an important distinction when more than one provider is used</td>
</tr>
<tr>
<td class=""><code>realm</code></td>
<td class=""><code>helidon</code></td>
<td class="">Realm used in the challenge when authentication is not provided and it is required</td>
</tr>
<tr>
<td class=""><code>proxy-host</code></td>
<td class="">none</td>
<td class="">Configuration of a proxy host to use when authenticating the user</td>
</tr>
<tr>
<td class=""><code>proxy-port</code></td>
<td class=""><code>80</code></td>
<td class="">Proxy port</td>
</tr>
<tr>
<td class=""><code>token</code></td>
<td class=""><code>Authorization</code> header with <code>bearer</code> prefix</td>
<td class="">Configuration of the location of the token (see <code>TokenHandler</code>)</td>
</tr>
<tr>
<td class=""><code>outbound</code></td>
<td class="">&#160;</td>
<td class="">A list of outbound configurations</td>
</tr>
<tr>
<td class=""><code>outbound.*.name</code></td>
<td class="">&#160;</td>
<td class="">Required name of outbound configuration</td>
</tr>
<tr>
<td class=""><code>outbound.*.username</code></td>
<td class="">&#160;</td>
<td class="">Optional username used for outbound security; if not provided, current identity is propagated</td>
</tr>
<tr>
<td class=""><code>outbound.*.password</code></td>
<td class="">&#160;</td>
<td class="">Optional password used for outbound security</td>
</tr>
<tr>
<td class=""><code>outbound.*.transports</code></td>
<td class="">any transport</td>
<td class="">An array of transports this outbound configuration should be used for</td>
</tr>
<tr>
<td class=""><code>outbound.*.hosts</code></td>
<td class="">any host</td>
<td class="">An array of hosts this outbound configuration should be used for, can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.paths</code></td>
<td class="">any path</td>
<td class="">An array of paths this outbound configuration should be used for (such as <code>/greet</code>), can be a regular expression</td>
</tr>
<tr>
<td class=""><code>outbound.*.methods</code></td>
<td class="">any method</td>
<td class="">An array of HTTP methods this outbound configuration should be used for</td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_8">How does it work?</h4>
<div class="section">
<p>We expect to receive a token (with sufficient scopes) from the inbound request,
 such as when using the Google login button on a page.
The page has access to the token in javascript and can send it to backend with
every request in a header field (<code>Authorization</code> with `bearer ` prefix is assumed by default).</p>

<p>Once we receive the token in Helidon, we parse it and:</p>

<ol style="margin-left: 15px;">
<li>
Validate if it timed out locally

</li>
<li>
Return a cached response (see <code>EvictableCache</code> with default values)

</li>
<li>
Otherwise verify using Google API - <code>GoogleIdTokenVerifier</code>

</li>
</ol>
<p>We build a subject from the Google token with the following attributes filled (if in token):</p>

<ul class="ulist">
<li>
<p>userId</p>

</li>
<li>
<p>email</p>

</li>
<li>
<p>name</p>

</li>
<li>
<p>emailVerified</p>

</li>
<li>
<p>locale</p>

</li>
<li>
<p>family_name</p>

</li>
<li>
<p>given_name</p>

</li>
<li>
<p>picture (URL)</p>

</li>
</ul>
<p><strong>Outbound security</strong>
The token will be propagated to outbound calls if an outbound target exists
that matches the invoked endpoint (see <code>outbound</code> configuration above).</p>

</div>
</div>

<h3 id="_jwt_provider">JWT Provider</h3>
<div class="section">
<p>JWT token authentication and outbound security provider.</p>


<h4 id="_setup_9">Setup</h4>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.providers&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-providers-jwt&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="text"
title="Provider class name"
>io.helidon.security.providers.jwt.JwtProvider</markup>

<markup
lang="text"
title="Provider configuration key"
>jwt</markup>

</div>

<h4 id="_example_code_9">Example code</h4>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/security/outbound-override">https://github.com/oracle/helidon/tree/master/examples/security/outbound-override</a></p>

<markup
lang="yaml"
title="Configuration example"
>security:
  providers:
    - provider:
        atn-token:
          jwk.resource.resource-path: "verifying-jwk.json"
          jwt-audience: "http://my.service"
        sign-token:
          jwk.resource.resource-path: "signing-jwk.json"
          jwt-issuer: "http://my.server/identity"
          outbound:
          - name: "propagate-token"
            hosts: ["*.internal.org"]
          - name: "generate-token"
            hosts: ["1.partner-service"]
            jwk-kid: "partner-1"
            jwt-kid: "helidon"
            jwt-audience: "http://1.partner-service"</markup>

</div>

<h4 id="_configuration_options_9">Configuration options</h4>
<div class="section">
<p>The following table shows all configuration options of the provider and their default values</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
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
<td class=""><code>optional</code></td>
<td class=""><code>false</code></td>
<td class="">If set to <code>true</code>, failure to authenticate will return <code>ABSTAIN</code> result instead of <code>FAILURE</code>. This is
        an important distinction when more than one provider is used</td>
</tr>
<tr>
<td class=""><code>authenticate</code></td>
<td class=""><code>true</code></td>
<td class="">Whether to attempt authentication</td>
</tr>
<tr>
<td class=""><code>propagate</code></td>
<td class=""><code>true</code></td>
<td class="">Whether to attempt identity propagation/JWT creation</td>
</tr>
<tr>
<td class=""><code>principal-type</code></td>
<td class=""><code>USER</code></td>
<td class="">Whether we authenticate a user or a service (other option is SERVICE)</td>
</tr>
<tr>
<td class=""><code>atn-token</code></td>

<td class="">A group for configuring authentication of the request</td>
</tr>
<tr>
<td class=""><code>atn-token.verify-signature</code></td>
<td class=""><code>true</code></td>
<td class="">Whether to verify signature in incoming JWT. If disabled, <em>ANY</em> JWT will be accepted</td>
</tr>
<tr>
<td class=""><code>atn-token.jwt-audience</code></td>
<td class="">&#160;</td>
<td class="">Expected audience of the JWT. If not defined, any audience is accepted (and we may accept JWT not inteded for us)</td>
</tr>
<tr>
<td class=""><code>atn-token.jwk.resource.*</code></td>
<td class="">&#160;</td>
<td class="">Configuration of the JWK to obtain key(s) to validate signatures of inbound token. The JWK should contain public keys. This may be: jwk.resource.path, jwk.resource.resource-path, jwk.resource.url, jwk.resource.content-plain (actual JSON string), jwk.resource.content (base64)</td>
</tr>
<tr>
<td class=""><code>atn-token.handler</code></td>
<td class=""><code>Authorization</code> header with `bearer ` prefix</td>
<td class="">A handler configuration for inbound token - e.g. how to extract it</td>
</tr>
<tr>
<td class=""><code>atn-token.handler.header</code></td>
<td class="">&#160;</td>
<td class="">Name of a header the token is expected in</td>
</tr>
<tr>
<td class=""><code>atn-token.handler.prefix</code></td>
<td class="">&#160;</td>
<td class="">Prefix before the token value (optional)</td>
</tr>
<tr>
<td class=""><code>atn-token.handler.regexp</code></td>
<td class="">&#160;</td>
<td class="">Regular expression to obtain the token, first matching group is used (optional)</td>
</tr>
<tr>
<td class=""><code>sign-token</code></td>
<td class="">&#160;</td>
<td class="">A group for configuring outbound security</td>
</tr>
<tr>
<td class=""><code>sign-token.jwk.resource.*</code></td>
<td class="">&#160;</td>
<td class="">Configuration of the JWK to use when generating tokens (follows same rules as atn-token.jwk above), this JWK must contain private keys when using asymmetric ciphers</td>
</tr>
<tr>
<td class=""><code>sign-token.jwt-issuer</code></td>
<td class="">&#160;</td>
<td class="">When we issue a new token, this is the issuer to be placed into it (validated by target service)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound</code></td>
<td class="">&#160;</td>
<td class="">A group for configuring outbound rules (based on transport, host and.or path)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.name</code></td>
<td class="">&#160;</td>
<td class="">A short descriptive name for configured target service(s)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.transports</code></td>
<td class="">any</td>
<td class="">An array of transports this outbound matches (e.g. https)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.hosts</code></td>
<td class="">any</td>
<td class="">An array of hosts this outbound matches, may use * as a wild-card (e.g. *.oracle.com)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.paths</code></td>
<td class="">any</td>
<td class="">An array of paths on the host this outbound matches, may use * as a wild-card (e.g. /some/path/*)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.outbound-token</code></td>
<td class=""><code>Authorization</code> header with `bearer ` prefix</td>
<td class="">Configuration of outbound token handler (same as atn-token.handler)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.outbound-token.format</code></td>
<td class="">&#160;</td>
<td class="">Java text format for generating the value of outbound token header (e.g. "bearer %1$s")</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.jwk-kid</code></td>
<td class="">&#160;</td>
<td class="">If this key is defined, we are generating a new token, otherwise we propagate existing. Defines the key id of a key definition in the JWK file to use for signing the outbound token</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.jwt-kid</code></td>
<td class="">&#160;</td>
<td class="">A key to use in the generated JWT - this is for the other service to locate the verification key in their JWK</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.jwt-audience</code></td>
<td class="">&#160;</td>
<td class="">Audience this key is generated for (e.g. <a id="" title="" target="_blank" href="http://www.example.org/api/myService">http://www.example.org/api/myService</a>) - validated by the other service</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.jwt-not-before-seconds</code></td>
<td class=""><code>5</code></td>
<td class="">Makes this key valid this amount of seconds into the past. Allows a certain time-skew for the generated token to be valid before current time (e.g. when we expect a certain misalignment of clocks)</td>
</tr>
<tr>
<td class=""><code>sign-token.outbound.*.jwt-validity-seconds</code></td>
<td class="">1 day</td>
<td class="">Token validity in seconds</td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_how_does_it_work_9">How does it work?</h4>
<div class="section">
<p>JSON Web Token (JWT) provider has support for authentication and outbound security.</p>

<p>Authentication is based on validating the token (signature, valid before etc.) and on asserting the subject
of the JWT subject claim.</p>

<p>For outbound, we support either token propagation (e.g. the token from request is propagated further) or
support for generating a brand new token based on configuration of this provider.</p>

</div>
</div>
</div>
</doc-view>