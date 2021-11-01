<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using CORS in Built-in Services</dt>
<dd slot="desc"><p>Several built-in Helidon services&#8201;&#8212;&#8201;health, metrics, and OpenAPI&#8201;&#8212;&#8201;have integrated CORS support.
You can include these services in your application and control their CORS behavior.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_understanding_cors_support_in_helidon_services">Understanding CORS Support in Helidon Services</h2>
<div class="section">
<p>Helidon lets you easily include <router-link to="/se/health/01_health">health</router-link>, <router-link to="/se/metrics/01_metrics">metrics</router-link>, and
<router-link to="/se/openapi/01_openapi">OpenAPI</router-link> services in your Helidon application.
These services add endpoints to your application so that clients can retrieve information about it.
As with the application endpoints you write, these endpoints represent resources that can be shared across origins.</p>

<p>For example, several websites related to OpenAPI run a web application in your browser.
You provide the URL for your application to the browser application.
The browser application uses the URL to retrieve the OpenAPI document
that describes the application&#8217;s endpoints directly from your application.
The browser application then displays a user interface that you use to "drive" your application. That is,
you provide input, have the web application
send requests to your application endpoints, and then view the responses.
This scenario is exactly the situation CORS addresses: an application in the browser from one origin&#8201;&#8212;&#8201;the user interface downloaded from the
website&#8201;&#8212;&#8201;requests a resource from another origin&#8201;&#8212;&#8201;the <code>/openapi</code> endpoint which Helidon&#8217;s OpenAPI built-in
service automatically adds to your application.</p>

<p>Integrating CORS support into these built-in services allows such third-party web sites and their browser applications&#8201;&#8212;&#8201;or
more generally, apps from any other origin&#8201;&#8212;&#8201;to work with your Helidon application.</p>

<p>Because all three of these built-in Helidon services serve only <code>GET</code> endpoints, by default the
integrated CORS support in all three services permits
any origin to share their resources using <code>GET</code>, <code>HEAD</code>, and <code>OPTIONS</code> HTTP requests. You can customize the CORS set-up
for these built-in services independently from each other using
 either the Helidon API, configuration, or both.
You can use this override feature to control the CORS behavior of the built-in services even if you do not add CORS behavior
to your own endpoints.</p>

</div>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">
<p>To use built-in services with CORS support and customize the
CORS behavior:</p>

<ol style="margin-left: 15px;">
<li>
Add the built-in service or services to your application. The health, metrics, and OpenAPI services automatically
include default CORS support.

</li>
<li>

<div><p>Add a dependency on the Helidon SE CORS artifact to your Maven <code>pom.xml</code> file.</p>

<div class="admonition note">
<p class="admonition-inline">If you want the built-in services to support CORS, then you need to add the CORS dependency even if your own endpoints do not use CORS.</p>
</div>
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications.
For CORS support in Helidon SE, you must include
the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver-cors&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>
</div>

</li>
<li>
Use
the Helidon API or
configuration to customize the CORS behavior as needed.

</li>
</ol>
<p>The documentation for the individual built-in services describes how to add each
service to your application, including
adding a Maven
dependency and including the service in your application&#8217;s routing rules.
In your
application&#8217;s configuration file, the configuration for each service appears under its own key.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Helidon Service Documentation</th>
<th>Configuration Key</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><router-link to="/se/health/01_health">health</router-link></td>
<td class=""><code>health</code></td>
</tr>
<tr>
<td class=""><router-link to="/se/metrics/01_metrics">metrics</router-link></td>
<td class=""><code>metrics</code></td>
</tr>
<tr>
<td class=""><router-link to="/se/openapi/01_openapi">OpenAPI</router-link></td>
<td class=""><code>openapi</code></td>
</tr>
</tbody>
</table>
</div>
<p>The <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.4.0/examples/quickstarts/helidon-quickstart-se">Helidon SE QuickStart example</a>
uses these services, so you can use that as a template for your
own application, or use the example project itself to experiment with customizing the CORS
behavior in the built-in services.</p>

</div>

<h2 id="_controlling_cors_for_built_in_services_using_the_api">Controlling CORS for Built-in Services Using the API</h2>
<div class="section">
<p>Although services such as health, metrics, and OpenAPI are built into Helidon, to use them your application must create
instances of the services and then use those instances in building your application&#8217;s routing rules.</p>

<p>Recall that each
service type has a <code>Builder</code> class. To control the CORS behavior of a built-in service using the API, follow these steps:</p>

<ol style="margin-left: 15px;">
<li>
Create a <code>Builder</code> for the type of service of interest.

</li>
<li>
Build an instance of <code>CrossOriginConfig</code> with the settings you want.

</li>
<li>
Invoke the <code>builder.crossOriginConfig</code> method, passing that <code>CrossOriginConfig</code> instance.

</li>
<li>
Invoke the builder&#8217;s <code>build</code> method to initialize the service instance.

</li>
<li>
Use the service instance in preparing the routing rules.

</li>
</ol>
<p>The following excerpt shows changes to the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.4.0/examples/quickstarts/helidon-quickstart-se">Helidon SE QuickStart example</a> which limit
sharing of the <code>/metrics</code> endpoint to <code>http://foo.com</code>.</p>

<markup
lang="java"

>private static Routing createRouting(Config config) {

        CrossOriginConfig metricsCrossOriginConfig = CrossOriginConfig.builder() <span class="conum" data-value="1" />
                .allowOrigins("http://foo.com")
                .build();
        MetricsSupport metrics = MetricsSupport.builder()
                .crossOriginConfig(metricsCrossOriginConfig) <span class="conum" data-value="2" />
                .build();
        GreetService greetService = new GreetService(config);
        HealthSupport health = HealthSupport.builder()
                .addLiveness(HealthChecks.healthChecks())   // Adds a convenient set of checks
                .build();

        return Routing.builder()
                .register(health)                   // Health at "/health"
                .register(metrics)                  // Metrics at "/metrics" <span class="conum" data-value="3" />
                .register("/greet", greetService)
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Create the <code>CrossOriginConfig</code> for metrics, limiting sharing to <code>http://foo.com</code>.</li>
<li data-value="2">Use the <code>CrossOriginConfig</code> instance in constructing the <code>MetricsSupport</code> service.</li>
<li data-value="3">Use the <code>MetricsSupport</code> object in creating the routing rules.</li>
</ul>
</div>

<h2 id="_configuring_cors_for_built_in_services">Configuring CORS for Built-in Services</h2>
<div class="section">
<p>You can
also
use configuration to control whether and how each of the built-in services works with CORS.</p>

<p>Your application can pass configuration to the builder for each built-in service.
For the health, metrics, and OpenAPI services, your configuration can include a section for CORS.</p>

<p>The following example restricts sharing of the
<code>/health</code> resource, provided by the health built-in service, to only the origin <code>http://there.com</code>.</p>

<markup
lang="hocon"

>...
health:
  cors:
    allow-origins: [http://there.com]
...</markup>

<p>Modify your application to load the <code>health</code> config node and use it to construct the <code>HealthSupport</code> service.
The following code shows this change in the the QuickStart SE example.</p>

<markup
lang="java"

>HealthSupport health = HealthSupport.builder()
        .config(config.get("health")) <span class="conum" data-value="1" />
        .addLiveness(HealthChecks.healthChecks())   // Adds a convenient set of checks
        .build();</markup>

<ul class="colist">
<li data-value="1">Use the <code>health</code> config section (if present) to configure the health service.</li>
</ul>
<p>You have full control over the CORS configuration for a built-in Helidon service. Use a basic CORS config section
as described in
<router-link to="/se/cors/03_using-configuration">Using Configuration for CORS</router-link>.</p>

</div>

<h2 id="_accessing_the_shared_resources">Accessing the Shared Resources</h2>
<div class="section">
<p>If you have edited the Helidon SE QuickStart application as described in the previous topics and saved your changes,
you can build and run the application. Once you do so you can execute <code>curl</code> commands to demonstrate the behavior changes
in the metric and health services with the addition of the CORS functionality. Note the addition of the
<code>Origin</code> header value in the <code>curl</code> commands, and the <code>Access-Control-Allow-Origin</code> in the successful responses.</p>


<h3 id="_build_and_run_the_application">Build and Run the Application</h3>
<div class="section">
<p>Build and run the QuickStart application as usual.</p>

<markup
lang="bash"

>mvn package
java -jar target/helidon-quickstart-se.jar
...
WEB server is up! http://localhost:8080/greet</markup>

</div>

<h3 id="_retrieve_metrics">Retrieve Metrics</h3>
<div class="section">
<p>The metrics service rejects attempts to access metrics on behalf of a disallowed origin.</p>

<markup
lang="bash"

>curl -i -H "Origin: http://other.com" http://localhost:8080/metrics

HTTP/1.1 403 Forbidden
Date: Mon, 11 May 2020 11:08:09 -0500
transfer-encoding: chunked
connection: keep-alive</markup>

<p>But accesses from <code>foo.com</code> succeed.</p>

<markup
lang="bash"

>curl -i -H "Origin: http://foo.com" http://localhost:8080/metrics

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://foo.com
Content-Type: text/plain
Date: Mon, 11 May 2020 11:08:16 -0500
Vary: Origin
connection: keep-alive
content-length: 6065

# TYPE base_classloader_loadedClasses_count gauge
# HELP base_classloader_loadedClasses_count Displays the number of classes that are currently loaded in the Java virtual machine.
base_classloader_loadedClasses_count 3568
...</markup>

</div>

<h3 id="_retrieve_health">Retrieve Health</h3>
<div class="section">
<p>The health service rejects requests from origins not specifically approved.</p>

<markup
lang="bash"

>curl -i -H "Origin: http://foo.com" http://localhost:8080/health

HTTP/1.1 403 Forbidden
Date: Mon, 11 May 2020 12:06:55 -0500
transfer-encoding: chunked
connection: keep-alive</markup>

<p>And responds successfully only to cross-origin requests from <code>http://there.com</code>.</p>

<markup
lang="bash"

>curl -i -H "Origin: http://there.com" http://localhost:8080/health

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://there.com
Content-Type: application/json
Date: Mon, 11 May 2020 12:07:32 -0500
Vary: Origin
connection: keep-alive
content-length: 461

{"outcome":"UP",...}</markup>

</div>
</div>
</doc-view>