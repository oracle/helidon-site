<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>SE REST Web Service</dt>
<dd slot="desc"><p>Create and build a ReSTful web service as your first Helidon SE application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_the_restful_web_service_guide">The RESTful Web Service Guide</h2>
<div class="section">
<p>Create and build a RESTful web service as your first Helidon SE application.</p>


<h3 id="_what_you_will_learn">What you will learn</h3>
<div class="section">
<p>You&#8217;ll learn how to use Helidon quickly to create a RESTful web service that accepts these HTTP requests:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Method and URL</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>GET localhost:8080/greet</code></td>
<td>Returns a generic but friendly greeting</td>
</tr>
<tr>
<td><code>GET localhost:8080/greet/Joe</code></td>
<td>Returns a personalized greeting for the specified person</td>
</tr>
<tr>
<td><code>PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}'
localhost:8080/greet/greeting</code></td>
<td>Changes the greeting used in subsequent responses</td>
</tr>
</tbody>
</table>
</div>
<p>You&#8217;ll create the app in three main steps:</p>

<ol style="margin-left: 15px;">
<li>
Use the Helidon Maven archetype to create a basic Helidon SE app that responds
to the HTTP requests.

</li>
<li>
Add code to perform a simple app-specific health check.

</li>
<li>
Add code to record a simple app-specific metric.

</li>
</ol>
<p>As you develop the app, this guide helps you understand what each part of the
code does. If you prefer to download the finished code for this example, follow the
instructions at <router-link to="#downloading" @click.native="this.scrollFix('#downloading')">Download the example source</router-link>.</p>

</div>

<h3 id="_what_you_need">What you need</h3>
<div class="section">

<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>About 15 minutes</td>
</tr>
<tr>
<td>An IDE or text editor</td>
</tr>
<tr>
<td>JDK 1.8 or later</td>
</tr>
<tr>
<td>Maven 3.5 or later</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 id="_develop_your_application">Develop your application</h3>
<div class="section">

<h4 id="_generate_the_maven_project_using_the_helidon_archetype">Generate the Maven project using the Helidon archetype</h4>
<div class="section">
<p>Helidon provides a Maven archetype you can use to create a new Helidon project that
includes sample code.</p>

<ol style="margin-left: 15px;">
<li>
<code>cd</code> to a directory that is not already a Maven project.

</li>
<li>
Run this command:
<div><markup
lang="bash"
title="Creating a new Helidon SE project"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=1.0.0 \
    -DgroupId=io.helidon.guides \
    -DartifactId=se-restful-webservice \
    -Dpackage=io.helidon.guides.se.restfulwebservice</markup>

<p>Running the archetype this way creates a subdirectory <code>se-restful-webservice</code>
(using the <code>artifactId</code> setting from the archetype invocation) that contains a new
Maven project for a Helidon service.</p>
</div>

</li>
</ol>
</div>

<h4 id="_browse_the_generated_source">Browse the generated source</h4>
<div class="section">

<h5 id="_pom_xml"><code>pom.xml</code></h5>
<div class="section">
<p>The input you provided to the archetype determines the project&#8217;s Maven
coordinates:</p>

<markup
lang="xml"

>&lt;artifactId&gt;se-restful-webservice&lt;/artifactId&gt;</markup>

<p>In the &lt;dependency-management&gt; section, note the dependency on the <code>helidon-bom</code>
POM:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-bom&lt;/artifactId&gt;
    &lt;version&gt;${helidon.version}&lt;/version&gt;
    &lt;type&gt;pom&lt;/type&gt;
    &lt;scope&gt;import&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<p>Later, in the <code>&lt;dependencies&gt;</code> section, you will see declarations for various
Helidon components:</p>

<ul class="ulist">
<li>
<p>web server</p>

</li>
<li>
<p>config support for YAML</p>

</li>
<li>
<p>health check</p>

</li>
<li>
<p>metrics</p>

</li>
</ul>
<p>The <code>helidon-bom</code> dependency adds <code>&lt;dependency-management&gt;</code> declarations for all the Helidon components.
You can add Helidon dependencies to your project without having to specify the
version. For example, see the declaration for config YAML support:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-config-yaml&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h5 id="_srcmainresourcesapplication_yaml_a_config_resource_file_for_the_application"><code>src/main/resources/application.yaml</code>: a config resource file for the application</h5>
<div class="section">
<p>Your app uses Helidon config to initialize the greeting and set up the HTTP
listener.</p>

<markup
lang="yaml"
title="<code>src/main/resources/application.yaml</code>"
>app:
  greeting: "Hello" <span class="conum" data-value="1" />

server:             <span class="conum" data-value="2" />
  port: 8080
  host: 0.0.0.0</markup>

<ul class="colist">
<li data-value="1">Sets the initial greeting text for responses from the service</li>
<li data-value="2">Sets how the service will listen for requests</li>
</ul>
</div>

<h5 id="_srcmainresourceslogging_properties"><code>src/main/resources/logging.properties</code></h5>
<div class="section">
<p>This file controls logging.
.<code>src/main/resources/logging.properties</code></p>

<markup


># Send messages to the console
handlers=java.util.logging.ConsoleHandler

# Global default logging level. Can be overriden by specific handlers and loggers
.level=INFO

# Helidon Web Server has a custom log formatter that extends SimpleFormatter.
# It replaces "!thread!" with the current thread name
java.util.logging.ConsoleHandler.level=INFO
java.util.logging.ConsoleHandler.formatter=io.helidon.webserver.WebServerLogFormatter
java.util.logging.SimpleFormatter.format=%1$tY.%1$tm.%1$td %1$tH:%1$tM:%1$tS %4$s %3$s !thread!: %5$s%6$s%n</markup>

</div>

<h5 id="_greetservice_java_the_greeting_service_for_the_app"><code>GreetService.java</code>: the greeting service for the app</h5>
<div class="section">
<p>In general, your application can implement multiple services, each tied to its own
URL path. The example includes just one service: the greeting service in
<code>src/main/java/io/helidon/guides/se/restfulwebservice/GreetService.java</code>.</p>

<ol style="margin-left: 15px;">
<li>
Note these <code>import</code> statements.
<div><markup
lang="java"

>import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;

import io.helidon.common.http.Http;
import io.helidon.config.Config;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;</markup>

<p>These imports are necessary for JSON and config support and for the key parts of
the web server.</p>
</div>

</li>
<li>
The <code>GreetService</code> class implements <code>io.helidon.webserver.Service</code>.

</li>
<li>
Its constructor accepts a <code>Config</code> object to control its behavior:
<div><markup
lang="java"

>GreetService(Config config) {
    this.greeting = config.get("app.greeting").asString().orElse("Ciao"); <span class="conum" data-value="1" />
}</markup>

<p>Here the code looks up the initial greeting from the configuration object
and saves it.</p>
</div>

</li>
<li>
The <code>update</code> method updates the routing rules in the web server to link
the service&#8217;s methods with the corresponding URL paths:
<div><markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules
        .get("/", this::getDefaultMessageHandler) <span class="conum" data-value="1" />
        .get("/{name}", this::getMessageHandler) <span class="conum" data-value="2" />
        .put("/greeting", this::updateGreetingHandler); <span class="conum" data-value="3" />
}</markup>

<ul class="colist">
<li data-value="1">Handle <code>GET</code> requests that contain no extra path using <code>getDefaultMessage</code>.</li>
<li data-value="2">Handle <code>GET</code> requests that contain a name using <code>getMessage</code>, which personalizes the response
using the name provided as the path suffix.</li>
<li data-value="3">Handle <code>PUT</code> requests to the <code>greeting</code> path using <code>updateGreeting</code>,
interpreting the <code>greeting</code> value in the JSON payload as the new greeting string.</li>
</ul></div>

</li>
<li>
The following methods respond to the three types of request.
<ol style="margin-left: 15px;">
<li>
Returning the default greeting:
<div><markup
lang="java"

>private void getDefaultMessageHandler(ServerRequest request,
                               ServerResponse response) {
    sendResponse(response, "World"); <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The default message ends with "World!"&#8201;&#8212;&#8201;that is, without personalizing the
message with the user&#8217;s name.</li>
</ul></div>

</li>
<li>
Returning a personalized greeting:
<div><markup
lang="java"

>private void getMessageHandler(ServerRequest request,
                        ServerResponse response) {
    String name = request.path().param("name"); <span class="conum" data-value="1" />
    sendResponse(response, name); <span class="conum" data-value="2" />
}</markup>

<ul class="colist">
<li data-value="1">Gets the name from the URL path in the request.</li>
<li data-value="2">Includes the user&#8217;s name in building the response.</li>
</ul></div>

</li>
<li>
Updating the greeting:
<div><markup
lang="java"

>private void updateGreetingHandler(ServerRequest request,
                                   ServerResponse response) {
    request.content().as(JsonObject.class) <span class="conum" data-value="1" />
            .thenAccept(jo -&gt; updateGreetingFromJson(jo, response));
}</markup>

<ul class="colist">
<li data-value="1">Compose the JSON response to confirm the new setting for <code>greeting</code>.</li>
</ul>
<p>This method delegates to <code>updateGreetingFromJson</code>:</p>

<markup
lang="java"

>    private void updateGreetingFromJson(JsonObject jo, ServerResponse response) {

        if (!jo.containsKey("greeting")) { <span class="conum" data-value="1" />
            JsonObject jsonErrorObject = JSON.createObjectBuilder()
                    .add("error", "No greeting provided")
                    .build();
            response.status(Http.Status.BAD_REQUEST_400)
                    .send(jsonErrorObject);
            return;
        }

        greeting = jo.getString("greeting"); <span class="conum" data-value="2" />

        response.status(Http.Status.NO_CONTENT_204) <span class="conum" data-value="3" />
                .send();
    }</markup>

<ul class="colist">
<li data-value="1">Rejects the request if the JSON payload does not include the <code>greeting</code> setting.</li>
<li data-value="2">Extracts the new greeting from the JSON object and saves it.</li>
<li data-value="3">Sends the "no content" response, acknowledging that the new greeting has been set.</li>
</ul></div>

</li>
</ol>
</li>
</ol>
</div>

<h5 id="_main_java"><code>Main.java</code></h5>
<div class="section">
<p>The job of <code>Main</code> is to create and start the web server. It uses the configuration
in the config file to initialize the server, registering the greeting service with it.
The <code>startServer</code> method does most of the work.</p>

<ol style="margin-left: 15px;">
<li>
Create and configure the server.
<div><markup
lang="java"

>// By default this will pick up application.yaml from the classpath
Config config = Config.create(); <span class="conum" data-value="1" />

// Get webserver config from the "server" section of application.yaml
ServerConfiguration serverConfig = <span class="conum" data-value="2" />
        ServerConfiguration.create(config.get("server"));

WebServer server = WebServer.create(serverConfig, createRouting(config)); <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Loads configuration from <code>application.yaml</code>.</li>
<li data-value="2">Creates the <code>ServerConfiguration</code> object from the relevant part of the <code>Config</code>
object just loaded.</li>
<li data-value="3">Creates the server using the config and the updated routing rules (see below).</li>
</ul></div>

</li>
<li>
Start the server.
<div><markup
lang="java"

>// Try to start the server. If successful, print some info and arrange to
// print a message at shutdown. If unsuccessful, print the exception.
server.start() <span class="conum" data-value="1" />
    .thenAccept(ws -&gt; { <span class="conum" data-value="2" />
        System.out.println(
                "WEB server is up! http://localhost:" + ws.port() + "/greet");
        ws.whenShutdown().thenRun(() <span class="conum" data-value="3" />
            -&gt; System.out.println("WEB server is DOWN. Good bye!"));
        })
    .exceptionally(t -&gt; { <span class="conum" data-value="4" />
        System.err.println("Startup failed: " + t.getMessage());
        t.printStackTrace(System.err);
        return null;
    });

// Server threads are not daemon. No need to block. Just react.</markup>

<ul class="colist">
<li data-value="1">Starts the server.</li>
<li data-value="2">When the startup completes successfully, prints a message.</li>
<li data-value="3">Prints a message when the server is shut down. The <code>CompletionStage</code> returned from <code>server.whenShutdown()</code> completes when
some other code invokes <code>server.shutdown()</code>.
The current example does not
invoke that method (except from a test), so in this example server the
<code>CompletionStage</code> will never complete and so the
message will not be printed. This code <em>does</em> show how easy it is to detect and
respond to an orderly shutdown if you trigger one from your app.</li>
<li data-value="4">Report a failed startup.</li>
</ul></div>

</li>
<li>
Create routing rules for the app.
<div><markup
lang="java"

>private static Routing createRouting(Config config) {

    MetricsSupport metrics = MetricsSupport.create();
    GreetService greetService = new GreetService(config);
    HealthSupport health = HealthSupport.builder()
            .add(HealthChecks.healthChecks())   // Adds a convenient set of checks
            .build(); <span class="conum" data-value="1" />
    return Routing.builder() <span class="conum" data-value="2" />
            .register(JsonSupport.create())
            .register(health)                   // Health at "/health"
            .register(metrics)                  // Metrics at "/metrics"
            .register("/greet", greetService)
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Sets up several built-in health checks (deadlock, disk space, heap memory) for
the server.</li>
<li data-value="2">Builds the <code>Routing</code> instance by registering the JSON, health, metrics, and the
app&#8217;s own greeting service.</li>
</ul>
<p>Later steps in this guide show how to add your own, app-specific health check and
metric.</p>
</div>

</li>
</ol>
</div>
</div>
</div>

<h3 id="_build_and_run">Build and run</h3>
<div class="section">
<p>You can use your IDE&#8217;s features to build and run the project directly.</p>

<p>Or, to use Maven outside the IDE, build your app this way:</p>

<markup
lang="bash"

>mvn package</markup>

<p>and run it like this:</p>

<markup
lang="bash"

>java -jar target/se-restful-webservice.jar</markup>

<p>Once you have started your app, from another command window run these commands
to access its functions:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Command</th>
<th>Result</th>
<th>Function</th>
</tr>
</thead>
<tbody>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>{"message":"Hello World!"}</pre>
</div>

</doc-view>
</td>
<td>Returns a greeting with no personalization</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet/Joe</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>{"message":"Hello Joe!"}</pre>
</div>

</doc-view>
</td>
<td>Returns the personalized greeting</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}' http://localhost:8080/greet/greeting</markup>

</doc-view>
</td>
<td><doc-view>
<p>(no response payload)</p>

</doc-view>
</td>
<td>Changes the greeting</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet/Jose</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>{"message":"Hola Jose!"}</pre>
</div>

</doc-view>
</td>
<td>Shows that the greeting change took effect</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 id="_add_an_app_specific_health_check">Add an app-specific health check</h3>
<div class="section">
<p>A well-behaved microservice reports on its own health.
Two common approaches for checking health, often used together, are:</p>

<ul class="ulist">
<li>
<p>readiness - a simple verification that the service has been started, has initialized itself,
and is ready to respond to requests; and</p>

</li>
<li>
<p>liveness - often a more thorough assessment of whether
and how well the service can do its job.</p>

</li>
</ul>
<p>For example, Kubernetes can ping your service&#8217;s
readiness endpoint after it starts the pod containing the service to determine
when the service is ready to accept requests, withholding traffic until the readiness
endpoint reports success. Kubernetes can use the liveness endpoint to find out if
the service considers itself able to function, attempting a pod restart if the
endpoint reports a problem.</p>

<p>In general a liveness check might assess:</p>

<ul class="ulist">
<li>
<p>service health - whether the service itself can do its job correctly</p>

</li>
<li>
<p>host health - if the host has sufficient resources (for example, disk space)
for the service to operate</p>

</li>
<li>
<p>health of other, dependent services - if other services on which this service
depends are themselves OK.</p>

</li>
</ul>
<p>We will add an app-specific liveness check.
Our greeting service does not depend on any
host resources (like disk space) or any other services. So for this
example we define our service as "alive" in a very trivial way:
if the greeting text has been assigned
<em>and is not empty</em> when trimmed of leading or trailing white space. Otherwise we
consider the service to be unhealthy, in which case the service will
still respond but its answers might not be what we want.</p>

<p>Normally we would
write our service to make
sure that a newly-assigned greeting is non-empty <em>before</em>
accepting it. But omitting that validation lets us create an easy health check
that we can use by simply setting the greeting to blank from
a <code>curl</code> command.</p>


<h4 id="_revise_greetservice_java">Revise <code>GreetService.java</code></h4>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Add health-related imports.
<div><markup
lang="java"

>import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.HealthCheckResponseBuilder;</markup>
</div>

</li>
<li>
Add a liveness check method.
<div><p>The new method returns a <code>HealthCheckResponse</code>. This will make it
very easy to add our custom health check to the built-in ones already in the code.</p>

<markup
lang="java"

>    HealthCheckResponse checkAlive() {
        HealthCheckResponseBuilder builder = HealthCheckResponse.builder()
                .name("greetingAlive"); <span class="conum" data-value="1" />
        if (greeting == null || greeting.trim().length() == 0) { <span class="conum" data-value="2" />
            builder.down() <span class="conum" data-value="3" />
                   .withData("greeting", "not set or is empty");
        } else {
            builder.up(); <span class="conum" data-value="4" />
        }
        return builder.build(); <span class="conum" data-value="5" />
    }</markup>

<ul class="colist">
<li data-value="1">Use a builder to assemble the response, giving the health check a human-readable
name.</li>
<li data-value="2">Enforce that the greeting be non-empty and non-null in order for the
greeting service to be considered alive.</li>
<li data-value="3">For a null or empty greeting the response indicates that the service
is <em>down</em>, in this case adding an explanation.</li>
<li data-value="4">For a valid greeting the response says the service is <em>up</em>.</li>
<li data-value="5">Either way, have the builder build the response.</li>
</ul></div>

</li>
</ol>
</div>

<h4 id="_revise_main_java">Revise <code>Main.java</code></h4>
<div class="section">
<p>We need to modify the <code>createRouting</code> method slightly to add our custom health check to the <code>HealthSupportBuilder</code>.</p>

<markup
lang="java"

>                .add(greetService::checkAlive)</markup>

<p>Here&#8217;s the revised method after this change:</p>

<markup
lang="java"

>private static Routing createRouting(Config config) {

    MetricsSupport metrics = MetricsSupport.create();
    GreetService greetService = new GreetService(config);
    HealthSupport health = HealthSupport.builder()
            .add(HealthChecks.healthChecks())   // Adds a convenient set of checks
            .add(greetService::checkAlive)
            .build(); <span class="conum" data-value="1" />
    return Routing.builder() <span class="conum" data-value="2" />
            .register(JsonSupport.create())
            .register(health)                   // Health at "/health"
            .register(metrics)                  // Metrics at "/metrics"
            .register("/greet", greetService)
            .build();
}</markup>

<ul class="colist">
<li data-value="1">The <code>health</code> instance now includes the greet service liveness check.</li>
<li data-value="2">The returned routing refers to the previously-instantiated and saved <code>GreetService</code>
instance.</li>
</ul>
</div>

<h4 id="_stop_rebuild_and_rerun_your_service">Stop, rebuild and rerun your service</h4>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Stop any running instance of your app.

</li>
<li>
Rebuild the app and then run it.

</li>
</ol>
</div>

<h4 id="_check_the_servers_health">Check the server&#8217;s health</h4>
<div class="section">
<p>Run this command:</p>

<markup
lang="bash"

>curl -X GET http://localhost:8080/health | json_pp</markup>

<p>You should see output as shown in this example:</p>

<div class="listing">
<pre>{
    "checks": [
        {
            "name": "deadlock",
            "state": "UP"
        },
        {
            "data": {
                "free": "179.37 GB",
                "freeBytes": 192597303296,
                "percentFree": "38.51%",
                "total": "465.72 GB",
                "totalBytes": 500068036608
            },
            "name": "diskSpace",
            "state": "UP"
        },
        <strong>{
"name": "greetingAlive",
"state": "UP"
}</strong>,
        {
            "data": {
                "free": "255.99 MB",
                "freeBytes": 268422144,
                "max": "4.00 GB",
                "maxBytes": 4294967296,
                "percentFree": "98.73%",
                "total": "308.00 MB",
                "totalBytes": 322961408
            },
            "name": "heapMemory",
            "state": "UP"
        }
    ],
    "outcome": "UP"
}</pre>
</div>

<p>The JSON output conveys various health indicators because the generated code
included <code>HealthChecks.healthChecks()</code> in the <code>HealthSupport.builder</code>.
The item labeled <code>outcome</code> describes the overall health of the
server based on all the other indicators. The state of all the indicators is UP.
So the <code>outcome</code> field shows UP. You should also see our app-specific liveness check in the output
(bolded above).</p>

</div>

<h4 id="_arrange_for_an_unhealthy_report">Arrange for an unhealthy report</h4>
<div class="section">
<p>Recall that our simple rule for liveness is that the greeting be non-null and
non-empty. We can easily force our server to report an unhealthy state.</p>

<ol style="margin-left: 15px;">
<li>
Set the greeting to a blank.
<div><markup
lang="bash"

>curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : " "}' http://localhost:8080/greet/greeting</markup>

<p>Our code to update the greeting accepts this and saves it as the new greeting.</p>
</div>

</li>
<li>
Ping the health check endpoint again with the same command as before.
<div><markup
lang="bash"

>curl -X GET http://localhost:8080/health | python -m json.tool</markup>

<p>This time you should see these two parts of the output indicating that something is
wrong:</p>

<div class="listing">
<pre>        {
            "data": {
                "greeting": "not set or is empty"
            },
            "name": "greetingAlive",
            "state": "DOWN"
        }
...
    "outcome": "DOWN"</pre>
</div>

<p>If you add <code>-i</code> to the <code>curl</code> command and remove the pipe, the output includes the status 503 "Service Unavailable" report:</p>

<markup
lang="bash"

>curl -i -X GET http://localhost:8080/health</markup>

<div class="listing">
<pre>HTTP/1.1 503 Service Unavailable
Content-Type: application/json
Date: Tue, 5 Feb 2019 08:09:22 -0600
transfer-encoding: chunked
connection: keep-alive
...</pre>
</div>
</div>

</li>
<li>
Set the greeting back to "Hello", so that the service is healthy again.
<div><markup
lang="bash"

>curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : "Hello"}' http://localhost:8080/greet/greeting</markup>
</div>

</li>
<li>
Check the health again.
<div><markup
lang="bash"

>curl -X GET http://localhost:8080/health | python -m json.tool</markup>

<p>This time the <code>outcome</code> and <code>greetingAlive</code> values will be back to <code>UP</code>.</p>
</div>

</li>
</ol>
</div>
</div>

<h3 id="_add_metrics_support">Add metrics support</h3>
<div class="section">
<p>As a simple illustration of using metrics, we revise our greeting service to count how many times
a client sends a request to the app.</p>


<h4 id="_review_default_metrics">Review default metrics</h4>
<div class="section">
<p>The generated <code>Main</code> class already instantiates and registers <code>MetricsSupport</code> in
the <code>createRouting</code> method. As a result, the system automatically collects and
reports a number of measurements related to CPU, threads, memory, and request traffic.
Use <code>curl -X GET <a id="" title="" target="_blank" href="http://localhost:8080/metrics">http://localhost:8080/metrics</a></code> to get the metrics data.</p>

</div>

<h4 id="_revise_greetservice_java_to_add_an_app_specific_metric">Revise <code>GreetService.java</code> to add an app-specific metric</h4>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Add metrics-related imports.
<div><markup
lang="java"

>import io.helidon.metrics.RegistryFactory;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricRegistry;</markup>
</div>

</li>
<li>
Register a metric in <code>GreetService.java</code>.
<div><p>Add these declarations as private fields:</p>

<markup
lang="java"

>    private final MetricRegistry registry = RegistryFactory.getRegistryFactory().get()
            .getRegistry(MetricRegistry.Type.APPLICATION); <span class="conum" data-value="1" />
    private final Counter greetCounter = registry.counter("accessctr"); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Refers to the application-scoped metrics registry.</li>
<li data-value="2">Declares a metric of type <code>counter</code> with name <code>accessctr</code>.</li>
</ul></div>

</li>
<li>
Create a method to display which method is handling a request.
<div><p>Add this method:</p>

<markup
lang="java"

>    private void displayThread() {
        String methodName = Thread.currentThread().getStackTrace()[2].getMethodName();
        System.out.println("Method=" + methodName + " " + "Thread=" + Thread.currentThread().getName());
    }</markup>
</div>

</li>
<li>
Create a request handler to update the counter.
<div><p>Add this method:</p>

<markup
lang="java"

>    private void counterFilter(final ServerRequest request,
                               final ServerResponse response) {
        displayThread(); <span class="conum" data-value="1" />
        greetCounter.inc(); <span class="conum" data-value="2" />
        request.next(); <span class="conum" data-value="3" />
    }</markup>

<ul class="colist">
<li data-value="1">Shows which method is handling the request.</li>
<li data-value="2">Updates the counter metric.</li>
<li data-value="3">Lets the next handler process the same request.</li>
</ul></div>

</li>
<li>
Register the filter to count requests.
<div><p>To the <code>update</code> method add this line immediately before the
existing <code>get</code> invocations.</p>

<markup
lang="java"

>.any(this::counterFilter) <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Invokes <code>counterFilter</code> for <em>any</em> incoming request.</li>
</ul></div>

</li>
</ol>
</div>

<h4 id="_rebuild_and_rerun_your_application">Rebuild and rerun your application</h4>
<div class="section">
<p>Follow the same steps as before, remembering to stop any instance
of your application that is still running.</p>

</div>

<h4 id="_send_some_requests">Send some requests</h4>
<div class="section">
<p>Use the same <code>curl</code> commands from the beginning to send requests to the server:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Command</th>
<th>Server Output</th>
</tr>
</thead>
<tbody>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>Method=counterFilter Thread=nioEventLoopGroup-3-1</pre>
</div>

</doc-view>
</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet/Joe</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>Method=counterFilter Thread=nioEventLoopGroup-3-2</pre>
</div>

</doc-view>
</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}' http://localhost:8080/greet/greeting</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>Method=counterFilter Thread=nioEventLoopGroup-3-3</pre>
</div>

</doc-view>
</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet/Jose</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>Method=counterFilter Thread=nioEventLoopGroup-3-4</pre>
</div>

</doc-view>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<h4 id="_retrieve_metrics">Retrieve metrics</h4>
<div class="section">
<p>Run this <code>curl</code> command to retrieve the collected metrics:</p>

<markup
lang="bash"

>curl -X GET http://localhost:8080/metrics</markup>

<p>You should see a long response. Note two items:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Output</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><doc-view>
<div class="listing">
<pre> application:accessctr 4</pre>
</div>

</doc-view>
</td>
<td>The counter we added to the app</td>
</tr>
<tr>
<td><doc-view>
<div class="listing">
<pre>vendor:requests_count 7</pre>
</div>

</doc-view>
</td>
<td>The total number of HTTP requests that the Helidon web server received</td>
</tr>
</tbody>
</table>
</div>
<p>The requests count is higher because the access to <code>/metrics</code> to retrieve the
monitoring data is <em>not</em> handled by our app&#8217;s rules and filters but by the
metrics infrastructure.</p>

</div>
</div>

<h3 id="downloading">(Optional) Download the example source</h3>
<div class="section">
<p>Instead of generating and then enhancing the application as described in this guide,
you can download it.</p>

<ol style="margin-left: 15px;">
<li>
Clone the Helidon repository:
<div><markup
lang="bash"
title="Using ssh"
>git clone git@github.com:oracle/helidon.git</markup>

<p>or</p>

<markup
lang="bash"
title="Using HTTPS"
>git clone https://github.com/oracle/helidon.git</markup>
</div>

</li>
<li>
<code>cd</code> to the <code>helidon/examples/guides/se-restful-webservice</code> directory.

</li>
<li>
Run:
<div><markup
lang="bash"

>mvn package
java -jar target/se-restful-webservice.jar</markup>
</div>

</li>
</ol>
</div>
</div>
</doc-view>