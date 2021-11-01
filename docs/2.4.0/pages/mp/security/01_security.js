<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Adding Security</dt>
<dd slot="desc"><p>To add security, such as protecting
resource methods with authentication, to a MicroProfile application, add the Helidon
 security integration dependency to your project.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Security
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-security&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h3 id="_securing_a_jax_rs_resource">Securing a JAX-RS Resource</h3>
<div class="section">
<p>For JAX-RS resources, declare security by adding annotations to a resource class or
 method.</p>

<markup
lang="java"
title="Protected resource method"
>@GET
@io.helidon.security.annotations.Authenticated
@io.helidon.security.annotations.Authorized
// you can also use io.helidon.security.abac.role.RoleValidator.Roles
@RolesAllowed("admin")
public String adminResource(@Context io.helidon.security.SecurityContext securityContext) {
  return "you are " + securityContext.userName();
}</markup>

<p>Security in Helidon MicroProfile is built on top of Jersey&#8217;s and can be enabled/disabled
using the property <code>security.jersey.enabled=[true|false]</code>.</p>

</div>

<h3 id="_protecting_helidon_endpoints">Protecting Helidon endpoints</h3>
<div class="section">
<p>There are several endpoints provided by Helidon services, such as:</p>

<ul class="ulist">
<li>
<p>Health endpoint (<code>/health</code>)</p>

</li>
<li>
<p>Metrics endpoint (<code>/metrics</code>)</p>

</li>
<li>
<p>OpenAPI endpoint (<code>/openapi</code>)</p>

</li>
<li>
<p>Configured static content (can use any path configured)</p>

</li>
</ul>
<p>These endpoints are all implemented using Helidon reactive WebServer and as such
can be protected only through Security integration with WebServer.</p>

<p>The following section describes configuration of such protection using configuration files,
 in this case using a <code>yaml</code> file, as it provides a tree structure.</p>


<h4 id="_configuring_endpoint_protection">Configuring endpoint protection</h4>
<div class="section">
<p>The configuration is usually placed under <code>security.web-server</code> (this can be
customized in Helidon SE).</p>

<p>The following shows an example we will explain in detail:</p>

<markup
lang="yaml"
title="application.yaml"
>security:
  providers:
    - abac: <span class="conum" data-value="1" />
    - provider-key: <span class="conum" data-value="2" />
  web-server:
    defaults:
      authenticate: true <span class="conum" data-value="3" />
    paths:
      - path: "/metrics[/{*}]" <span class="conum" data-value="4" />
        roles-allowed: "admin"
      - path: "/health[/{*}]" <span class="conum" data-value="5" />
        roles-allowed: "monitor"
      - path: "/openapi[/{*}]" <span class="conum" data-value="6" />
        abac:
          scopes: ["openapi"]
      - path: "/static[/{*}]" <span class="conum" data-value="7" />
        roles-allowed: ["user", "monitor"]</markup>

<ul class="colist">
<li data-value="1">Attribute based access control provider that checks roles and scopes</li>
<li data-value="2">The provider(s) used in your application, such as <code>oidc</code></li>
<li data-value="3">Default configuration for all configured paths</li>
<li data-value="4">Protection of <code>/metrics</code> and all nested paths with <code>admin</code> role required</li>
<li data-value="5">Protection of <code>/health</code> and all nested paths with <code>monitor</code> role required</li>
<li data-value="6">Protection of <code>/openapi</code> and all nested paths with <code>openapi</code> scope required</li>
<li data-value="7">Protection of static content configured on <code>/static</code> path with either <code>user</code> or <code>monitor</code> role required</li>
</ul>
<p>If you need to use a properties file, such as <code>microprofile-config.properties</code>, you
can convert the file by using index based numbers for arrays, such as:</p>

<markup
lang="properties"
title="microprofile-config.properties"
>security.providers.0.abac=
security.providers.1.provider-key.optional=false
security.web-server.defaults.authenticate=true
security.web-server.paths.0.path=/metrics[/{*}]
security.web-server.paths.0.roles-allowed=admin
# ....
security.web-server.paths.3.path=/static[/{*}]
security.web-server.paths.3.roles-allowed=user,monitor</markup>

</div>
</div>
</div>
</doc-view>