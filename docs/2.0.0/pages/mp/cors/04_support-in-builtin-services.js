<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using CORS in Helidon MP Built-in Services</dt>
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
<p>Helidon lets you easily include <router-link to="/mp/health/01_introduction">health</router-link>, <router-link to="/mp/metrics/01_introduction">metrics</router-link>, and
<router-link to="/mp/openapi/01_openapi">OpenAPI</router-link> services in your Helidon application.
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
 configuration.
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

<div><p>Add a dependency on the Helidon MP CORS artifact to your Maven <code>pom.xml</code> file.</p>

<div class="admonition note">
<p class="admonition-inline">If you want the built-in services to support CORS, then you need to add the CORS dependency even if your own endpoints do not use CORS.</p>
</div>
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications.
For CORS support in Helidon MP, you must include
the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-cors&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>
</div>

</li>
<li>
Use
configuration to customize the CORS behavior as needed.

</li>
</ol>
<p>The documentation for the individual built-in services describes how to add each
service to your application, including
adding a Maven
dependency.
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
<td class=""><router-link to="/mp/health/01_introduction">health</router-link></td>
<td class=""><code>health</code></td>
</tr>
<tr>
<td class=""><router-link to="/mp/metrics/01_introduction">metrics</router-link></td>
<td class=""><code>metrics</code></td>
</tr>
<tr>
<td class=""><router-link to="/mp/openapi/01_openapi">OpenAPI</router-link></td>
<td class=""><code>openapi</code></td>
</tr>
</tbody>
</table>
</div>
<p>The <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0/examples/quickstarts/helidon-quickstart-mp">Helidon MP QuickStart example</a>
uses these services, so you can use that as a template for your
own application, or use the example project itself to experiment with customizing the CORS
behavior in the built-in services.</p>

</div>

<h2 id="_configuring_cors_for_built_in_services">Configuring CORS for Built-in Services</h2>
<div class="section">
<p>You can
use configuration to control whether and how each of the built-in services works with CORS.</p>

<p>For the health, metrics, and OpenAPI services, your configuration can include a section for CORS.</p>

<p>You have full control over the CORS configuration for a built-in Helidon service. Use a basic CORS config section
as described in
<router-link to="/mp/cors/03_configuration-with-cors-mp">Using Configuration with CORS in Helidon MP</router-link>.</p>

<p>The following example restricts sharing of</p>

<ul class="ulist">
<li>
<p>the <code>/health</code> resource, provided by the health built-in service, to only the origin <code>http://there.com</code>, and</p>

</li>
<li>
<p>the <code>/metrics</code> resource, provided by the metrics built-in service, to only the origin <code>http://foo.com</code>.</p>

</li>
</ul>
<markup
lang="hocon"

>...
health:
  cors:
    allow-origins: [http://there.com]
metrics:
  cors:
    allow-origins: [http://foo.com]
...</markup>

</div>

<h2 id="_accessing_the_shared_resources">Accessing the Shared Resources</h2>
<div class="section">
<p>If you have edited the Helidon MP QuickStart application as described in the previous topics and saved your changes,
you can build and run the application. Once you do so you can execute <code>curl</code> commands to demonstrate the behavior changes
in the metric and health services with the addition of the CORS functionality. Note the addition of the
<code>Origin</code> header value in the <code>curl</code> commands, and the <code>Access-Control-Allow-Origin</code> in the successful responses.</p>


<h3 id="_build_and_run_the_application">Build and Run the Application</h3>
<div class="section">
<p>Build and run the QuickStart application as usual.</p>

<markup
lang="bash"

>mvn package
java -jar target/helidon-quickstart-mp.jar
...
2020.05.12 05:44:08 INFO io.helidon.microprofile.server.ServerCdiExtension Thread[main,5,main]: Server started on http://localhost:8080 (and all other host addresses) in 5280 milliseconds (since JVM startup).
...</markup>

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