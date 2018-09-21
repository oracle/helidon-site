<doc-view>

<h2 >Cloud Security Container Integrations</h2>
<div class="section">
<p>The following containers are integrated with Cloud Security:</p>


<h3 >Web server</h3>
<div class="section">
<p>Integration of <router-link to="/webserver/01_introduction">reactive web server</router-link></p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-integration-webserver&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 >Bootstrapping</h4>
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
    // gateDefaults - default enforcement for each route that hase a security gate
    // (to be changed in the future to "securedDefaults" and "secured")
    .register(WebSecurity.from(security).gateDefaults(WebSecurity.authenticate()))
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
    .register(WebSecurity.from(config))
    // continue with web server route configuration
    .build();</markup>

<markup
lang="conf"
title="Example using configuration - configuration (HOCON)"
># This may change in the future - to align with web server configuration, once it is supported
security.web-server {
    # Configuration of integration with web server
    defaults {
        authenticate = true
    }
    paths: [
        {
            path = "/service1"
            methods = ["get"]
            roles-allowed = ["user"]
        }
    ]
}</markup>

</div>
</div>

<h3 >Jersey</h3>
<div class="section">
<p>Integration of Jersey (JAX-RS implementation) both for inbound and outbound security.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-integration-jersey&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h4 >Inbound security</h4>
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

<h3 >Protecting a resource</h3>
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

<h3 >Access context</h3>
<div class="section">
<markup
lang="java"
title="Support in a JAX-RS resource"
>// inject io.helidon.security.SecurityContext
@Context
private SecurityContext securityContext;</markup>


<h4 >Outbound security</h4>
<div class="section">
<markup
lang="java"
title="Call remote target with outbound security"
>// I expect you have injected the ClientSecurityFeature as shown above
Client client = ClientBuilder.newClient()
    // integrate security
    .register(new ClientSecurityFeature());

try {
    // call the resource, will propagate identity as configured in Security
    String response = client.target("http://www.google.com")
        .request()
        // configure the security context for this request (as client and targets may be re-used)
        .property(ClientSecurityFeature.PROPERTY_CONTEXT, securityContext)
        .get(String.class);
} finally {
    client.close();
}</markup>

</div>
</div>
</div>
</doc-view>
