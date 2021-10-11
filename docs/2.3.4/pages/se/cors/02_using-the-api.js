<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using the Helidon SE CORS API</dt>
<dd slot="desc"><p>Every Helidon SE application explicitly creates routing rules that govern how Helidon delivers each incoming
 request to the code that needs to respond. The Helidon CORS SE API provides a simple way to include CORS into
 the routing rules that you construct for your application.</p>
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
<p>To enable CORS
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver-cors&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_understanding_the_helidon_se_cors_api">Understanding the Helidon SE CORS API</h2>
<div class="section">
<p>To add CORS behavior to endpoints, you need to make only minimal changes to how you set up the routing for those endpoints.
Using the Helidon SE CORS API,
you define the CORS behavior that you want and then include that behavior as you build the routing rules for the services
in your application.</p>

<p>The Helidon SE CORS API provides two key classes that you use in your application:</p>

<ul class="ulist">
<li>
<p><code>CorsSupport</code> - Represents information about resource sharing for a single resource.
Typically, you create one <code>CorsSupport</code> instance for each distinct resource in your application
(such as the <code>/greet</code> resource in the QuickStart greeting application) that should participate in CORS.</p>

</li>
<li>
<p><code>CrossOriginConfig</code> - Represents the details for a particular type of sharing, such as which origins are
allowed to have access using which HTTP methods, etc.
Create one instance of <code>CrossOriginConfig</code> for each different type of sharing you need.</p>

</li>
</ul>
<p>You associate one or more <code>CrossOriginConfig</code> objects with each <code>CorsSupport</code> object.
You use the <code>CorsSupport</code> object when you construct the routing rules for the service.
When your application is running and requests arrive, the Helidon CORS implementation enforces
the CORS behavior represented by the <code>CorsSupport</code> object before routing the request to your
endpoint code for the resource.</p>

</div>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">
<p>To add CORS support to your Helidon SE application:</p>

<ol style="margin-left: 15px;">
<li>
Determine the type of cross origin sharing you want to allow for each endpoint in your
application.

</li>
<li>
Add a dependency on the Helidon SE CORS <router-link to="#maven-coordinates" @click.native="this.scrollFix('#maven-coordinates')">artifact</router-link> to your Maven <code>pom.xml</code> file.

</li>
<li>
Modify how your application constructs routing rules so they include CORS as described in the following sections.

</li>
</ol>
</div>

<h2 id="adding-cors-support">Adding CORS Support in Your Helidon SE Application</h2>
<div class="section">
<p>Because Helidon SE does not use annotation processing to identify endpoints, you need to
provide the CORS information for your application another way -
by including CORS into the routing you construct for your application.</p>

<p>For each distinct resource or subresource your application exposes:</p>

<ol style="margin-left: 15px;">
<li>
Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver.cors/io/helidon/webserver/cors/CorsSupport.html"><code>CorsSupport</code></a> instance corresponding to the resource.

</li>
<li>
For each different type of sharing you want to provide for that resource:
<ol style="margin-left: 15px;">
<li>
Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver.cors/io/helidon/webserver/cors/CrossOriginConfig.html"><code>CrossOriginConfig</code></a> instance.<br>
The <code>CrossOriginConfig</code> Java class represents the details for a particular type of sharing, such as
which origins are allowed to share via which HTTP methods, etc.

</li>
<li>
Add the <code>CrossOriginConfig</code> to the <code>CorsSupport</code> instance for this resource.

</li>
</ol>
</li>
<li>
Use the resource&#8217;s <code>CorsSupport</code> object in setting up the routing rules for that resource.

</li>
</ol>
<p>Each of these classes has an associated builder that you use in constructing instances of the class.</p>

<p>The table below describes the methods on the <code>CrossOriginConfig.Builder</code> class
that map to the headers defined in the CORS protocol.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Method</th>
<th>Default</th>
<th>CORS Header Name</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>allowCredentials</code></td>
<td class=""><code>false</code></td>
<td class=""><code>Access-Control-Allow-Credentials</code></td>
</tr>
<tr>
<td class=""><code>allowHeaders</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Headers</code></td>
</tr>
<tr>
<td class=""><code>allowMethods</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Methods</code></td>
</tr>
<tr>
<td class=""><code>allowOrigins</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Origins</code></td>
</tr>
<tr>
<td class=""><code>exposeHeaders</code></td>
<td class=""><code>none</code></td>
<td class=""><code>Access-Control-Expose-Headers</code></td>
</tr>
<tr>
<td class=""><code>maxAgeSeconds</code></td>
<td class=""><code>3600</code></td>
<td class=""><code>Access-Control-Max-Age</code></td>
</tr>
<tr>
<td class=""><code>enabled</code></td>
<td class=""><code>true</code></td>
<td class="">n/a</td>
</tr>
</tbody>
</table>
</div>
<p>If the cross-origin configuration is disabled (<code>enabled</code> = false), then the Helidon CORS implementation ignores the cross-origin configuration entry.</p>

</div>

<h2 id="se-api-routing-example">Sample Routing Setup Using the <code>CrossOriginConfig</code> API</h2>
<div class="section">
<p>The <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.3.4/examples/quickstarts/helidon-quickstart-se">Helidon SE Quickstart application</a> lets you change the greeting by sending a <code>PUT</code>
request to the <code>/greet/greeting</code> resource.</p>

<p>This example, based on the QuickStart greeting app, uses the low-level <code>CrossOriginConfig</code> API and
the <code>CorsSupport</code> API to influence the <router-link to="/se/webserver/03_routing">routing</router-link>,
thereby determining how that resource is shared. (If desired, you can use configuration instead of the low-level API.
<router-link to="/se/cors/03_using-configuration">Learn more.</router-link>)</p>

<p>The following code shows how to prepare your application&#8217;s routing to support metrics and health support, as well as
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
                            .build()) <span class="conum" data-value="5" />
                .addCrossOriginConfig(CrossOriginConfig.create()) <span class="conum" data-value="6" />
                .build(); <span class="conum" data-value="7" />

        // Note: Add the CORS routing *before* registering the GreetService routing.
        return Routing.builder()
                .register(JsonSupport.create())
                .register(health)                   // Health at "/health"
                .register(metrics)                 // Metrics at "/metrics"
                .register("/greet", corsSupport, greetService) <span class="conum" data-value="8" />
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Create a <code>CorsSupport.Builder</code> instance.</li>
<li data-value="2">Add a <code>CrossOriginSupport</code> instance (using <em>its</em> builder) to constrain resource sharing.</li>
<li data-value="3">List the origins (sites) allowed to share resources from this app.</li>
<li data-value="4">List the HTTP methods the constraint applies to.</li>
<li data-value="5">Build the <code>CrossOriginSupport</code> instance.</li>
<li data-value="6">Add a <code>CrossOriginSupport</code> instance that permits all sharing (the default).</li>
<li data-value="7">Build the <code>CorsSupport</code> instance.</li>
<li data-value="8">Register the new <code>CorsSupport</code> instance with&#8201;&#8212;&#8201;but in front of&#8201;&#8212;&#8201;the service which implements the business logic.</li>
</ul>
<p>The order of steps 2 and 6 above is important. When processing an incoming request, the Helidon CORS implementation
scans the <code>CrossOriginConfig</code> instances in the order they were added to the <code>CorsSupport</code> object, stopping as soon as
it finds a <code>CrossOriginConfig</code> instance for which <code>allowMethods</code> matches the HTTP method of the
request.</p>

<p>The few additional lines described above allow the greeting application to participate in CORS.</p>

</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<ul class="ulist">
<li>
<p>Use configuration in combination with the API to add CORS to your application.
<router-link to="/se/cors/03_using-configuration">Learn more.</router-link></p>

</li>
<li>
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.3.4/examples/cors">CORS example</a>.</p>

</li>
</ul>
</div>
</doc-view>