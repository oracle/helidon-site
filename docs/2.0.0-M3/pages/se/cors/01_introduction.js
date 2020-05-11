<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>About CORS in Helidon SE</dt>
<dd slot="desc"><p><a id="" title="" target="_blank" href="https://www.w3.org/TR/cors/">Cross-origin resource sharing</a> (CORS) support in Helidon SE provides a flexible
mechanism that allows a Helidon SE application to control how other web applications can access its resources, even if that web application is not served from the same domain.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">
<p>Before you begin you must:</p>

<ol style="margin-left: 15px;">
<li>
Determine the type of cross origin sharing you want to allow for each endpoint in your application.
<p>For example, suppose you want to allow unrestricted access for GET, HEAD, and POST requests
(what CORS refers to as "simple" requests), but permit other types of requests only from the two
origins <code>foo.com</code> and <code>there.com</code>. This means that you have two types of CORS sharing: relaxed for the
simple requests and stricter for others. In practice, you can use as many types of sharing as makes sense for
your application.</p>

</li>
<li>
Add the CORS dependencies to the Maven <code>pom.xml</code> file.

</li>
<li>
Add the CORS support in your application.

</li>
</ol>
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications. For CORS support, you must include
the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver-cors&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="adding-cors-support">Adding CORS Support in Your Helidon SE Application</h2>
<div class="section">
<p>Because Helidon SE does not use annotation processing to identify endpoints, you need to
provide the CORS information for your application another way.</p>

<p>The high-level process for adding CORS support in your Helidon SE application is:</p>

<ol style="margin-left: 15px;">
<li>
Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver.cors/io/helidon/webserver/cors/CrossOriginConfig.html"><code>CrossOriginConfig</code></a> instance for each type of resource sharing that you decided your application should provide.
The <code>CrossOriginConfig</code> Java class represents the details for a particular type of sharing.

</li>
<li>
Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver.cors/io/helidon/webserver/cors/CorsSupport.html"><code>CorsSupport</code></a> instance that includes the <code>CrossOriginConfig</code> instances from the previous step.

</li>
<li>
Use that <code>CorsSupport</code> instance to set up the routing rules.

</li>
</ol>
<p>Each of these classes has an associated builder.
The table below describes
the methods on the <code>CrossOriginConfig.Builder</code> class and
the configuration keys that map to the headers defined in the CORS protocol.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
</colgroup>
<thead>
<tr>
<th>Methods</th>
<th>Configuration Key</th>
<th>Default</th>
<th>CORS Header Name</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>allowCredentials</code></td>
<td class=""><code>allow-credentials</code></td>
<td class=""><code>false</code></td>
<td class=""><code>Access-Control-Allow-Credentials</code></td>
</tr>
<tr>
<td class=""><code>allowHeaders</code></td>
<td class=""><code>allow-headers</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Headers</code></td>
</tr>
<tr>
<td class=""><code>allowMethods</code></td>
<td class=""><code>allow-methods</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Methods</code></td>
</tr>
<tr>
<td class=""><code>allowOrigins</code></td>
<td class=""><code>allow-origins</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Origins</code></td>
</tr>
<tr>
<td class=""><code>exposeHeaders</code></td>
<td class=""><code>expose-headers</code></td>
<td class=""><code>none</code></td>
<td class=""><code>Access-COntrol-Expose-Headers</code></td>
</tr>
<tr>
<td class=""><code>maxAgeSeconds</code></td>
<td class=""><code>max-age</code></td>
<td class=""><code>3600</code></td>
<td class=""><code>Access-Control-Max-Age</code></td>
</tr>
<tr>
<td class=""><code>enabled</code></td>
<td class=""><code>enabled</code></td>
<td class=""><code>true</code></td>
<td class="">n/a</td>
</tr>
</tbody>
</table>
</div>
<p>If the cross-origin configuration is disabled (<code>enabled</code> = false), then the Helidon CORS implementation ignores the cross-origin configuration entry.</p>

</div>

<h2 id="_sample_routing_setup_using_the_crossoriginconfig_api">Sample Routing Setup Using the CrossOriginConfig API</h2>
<div class="section">
<p>In the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0-M3/examples/quickstarts/helidon-quickstart-se">Helidon SE Quickstart application</a> you can change the greeting by sending a PUT request to the <code>/greet/greeting</code> resource.</p>

<p>In this example, we use the low-level <code>CrossOriginConfig</code> API and the <code>CorsSupport</code> API to influence the <router-link to="/se/webserver/03_routing">routing</router-link>,
thereby restricting how that resource is shared.</p>

<p>To understand how to use configuration instead of the low-level API, see <router-link to="/se/cors/02_configuration">Using Configuration for CORS</router-link>.</p>

<p>The following code shows how to prepare your application&#8217;s routing to support metrics and health support as well as
CORS.</p>

<markup
lang="java"

>    private static Routing createRouting(Config config) {

        MetricsSupport metrics = MetricsSupport.create();
        GreetService greetService = new GreetService(config);
        HealthSupport health = HealthSupport.builder()
                .addLiveness(HealthChecks.healthChecks())   // Adds a convenient set of checks
                .build();
        CorsSupport corsSupport = CorsSupport.builder()  <span class="conum" data-value="1" />
                .addCrossOriginConfig(CrossOriginConfig.builder() <span class="conum" data-value="2" />
                            .allowOrigins("http://foo.com", "http://there.com") <span class="conum" data-value="3" />
                            .allowMethods("PUT", "DELETE") <span class="conum" data-value="4" />
                            .build())
                .addCrossOriginConfig(CrossOriginConfig.create()) <span class="conum" data-value="5" />
                .build();

        // Note: Add the CORS routing *before* registering the GreetService routing.
        return Routing.builder()
                .register(JsonSupport.create())
                .register(health)                   // Health at "/health"
                .register(metrics)                 // Metrics at "/metrics"
                .register("/greet", corsSupport, greetService) <span class="conum" data-value="6" />
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Create a <code>CorsSupport</code> instance using its builder.</li>
<li data-value="2">Add a <code>CrossOriginSupport</code> instance (using <em>its</em> builder) to constrain resource sharing.</li>
<li data-value="3">List the origins (sites) allowed to share resources from this app.</li>
<li data-value="4">List the HTTP methods the constraint applies to.</li>
<li data-value="5">Add a <code>CrossOriginSupport</code> instance that permits all sharing (the default).</li>
<li data-value="6">Register the new <code>CorsSupport</code> instance with&#8201;&#8212;&#8201;but in front of&#8201;&#8212;&#8201;the service which implements the business logic.</li>
</ul>
<p>The few additional lines identified above allow the application to participate in CORS.</p>

</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0-M3/examples/cors">CORS example</a>.</p>

</div>
</doc-view>