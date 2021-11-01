<doc-view>

<h2 id="_cloud_security_container_integrations">Cloud Security Container Integrations</h2>
<div class="section">
<p>The following containers are integrated with Helidon Security:</p>


<h3 id="_web_server">Web server</h3>
<div class="section">
<p>Integration of <router-link to="#webserver/01_introduction.adoc" @click.native="this.scrollFix('#webserver/01_introduction.adoc')">reactive web server</router-link></p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.integration&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-integration-webserver&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_bootstrapping">Bootstrapping</h4>
<div class="section">
<p>There are two steps to configure security with web server:</p>

<ol style="margin-left: 15px;">
<li>
Create security instance and register it with server

</li>
<li>
Protect routes of web server with various security features

</li>
</ol>
<markup
lang="java"
title="Example using builders"
>// web server's Routing
Routing.builder()
    // This is step 1 - register security instance with web server processing
    // security - instance of security either from config or from a builder
    // securityDefaults - default enforcement for each route that has a security definition
    .register(WebSecurity.create(security).securityDefaults(WebSecurity.authenticate()))
    // this is step 2 - protect a route
    // protect this route with authentication (from defaults) and role "user"
    .get("/service1", WebSecurity.rolesAllowed("user"), (req, res) -&gt; {
        processService1Request(req, res);
    })
    .build();</markup>

<markup
lang="java"
title="Example using configuration"
>Routing.builder()
    // helper method to load both security and web server security from configuration
    .register(WebSecurity.create(config))
    // continue with web server route configuration
    .build();</markup>

<markup
lang="yaml"
title="Example using configuration (YAML)"
># This may change in the future - to align with web server configuration, once it is supported
security.web-server:
  # Configuration of integration with web server
  defaults:
    authenticate: true
  paths:
    - path: "/service1/[/{*}]"
      methods: ["get"]
      roles-allowed: ["user"]</markup>

</div>
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

<h3 id="_jersey">Jersey</h3>
<div class="section">
<p>Integration of Jersey (JAX-RS implementation) both for inbound and outbound security.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.integration&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-integration-jersey&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 id="_inbound_security">Inbound security</h4>
<div class="section">
<markup
lang="java"
title="Integrate with Jersey"
>ResourceConfig resourceConfig = new ResourceConfig()
    // register JAX-RS resource
    .register(JaxRsResource.class)
    // integrate security
    .register(new io.helidon.security.jersey.SecurityFeature(security));</markup>

</div>
</div>

<h3 id="_protecting_a_resource">Protecting a resource</h3>
<div class="section">
<p>The current approach does not have a configuration option. The security must be
 configured through annotations.
Security currently supports @Authenticated and @Authorized. When a resource is annotated with one of these
 annotations (application class, resource class, or resource method), security will
 be triggered.</p>

<markup
lang="java"
title="Securing a resource method"
>// this is sufficient for security to be triggered, see javadoc for further details
@Authenticated
@Path("/{name}")
@GET
@Produces(MediaType.TEXT_PLAIN)
// due to Jersey approach to path matching, we need two methods to match both the "root" and "root" + subpaths
public String getHelloName(@PathParam("name") String name) {
    return "Hello " + name + ", your current subject: " + securityContext.getSubject();
}</markup>

</div>

<h3 id="_access_context">Access context</h3>
<div class="section">
<markup
lang="java"
title="Support in a JAX-RS resource"
>// inject io.helidon.security.SecurityContext
@Context
private SecurityContext securityContext;</markup>


<h4 id="_outbound_security">Outbound security</h4>
<div class="section">
<p>Outbound security is automatically registered with Jersey client.
The provider must have outbound security configured for identity to be propagated.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.integration&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-integration-jersey-client&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="java"
title="Call remote target with outbound security"
>Client client = ClientBuilder.newClient();

try {
    // call the resource, will propagate identity as configured in Security
    String response = client.target("http://www.google.com")
        .request()
        // configure the security context for this request (as client and targets may be re-used)
        .property(ClientSecurity.PROPERTY_CONTEXT, securityContext)
        .get(String.class);
} finally {
    client.close();
}</markup>

</div>
</div>
</div>
</doc-view>