<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>MP REST Web Service</dt>
<dd slot="desc"><p>Create and build a RESTful web service as your first Helidon MP application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_the_microprofile_restful_web_service_guide">The MicroProfile RESTful Web Service Guide</h2>
<div class="section">
<p>Create and build a JAX-RS RESTful web service as your first Helidon MicroProfile application.</p>


<h3 id="_what_you_will_learn">What you will learn</h3>
<div class="section">
<p>You&#8217;ll learn how to use Helidon MicroProfile quickly to create a JAX-RS RESTful web service that accepts these HTTP requests:</p>


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
<td><code>PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}' localhost:8080/greet/greeting</code></td>
<td>Changes the greeting used in subsequent responses</td>
</tr>
</tbody>
</table>
</div>
<p>You&#8217;ll create the app in three main steps:</p>

<ol style="margin-left: 15px;">
<li>
Write a basic Helidon MP app to respond to the HTTP requests.

</li>
<li>
Add code to perform a simple app-specific health check.

</li>
<li>
Add code to record a simple app-specific metric.

</li>
</ol>
<p>As you develop the app, this guide helps you understand what each part of the code
does. If you prefer to download the finished code for this example, follow the
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
<td>JDK 8 or later</td>
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
title="Creating a new Helidon MP project"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=1.0.0 \
    -DgroupId=io.helidon.guides \
    -DartifactId=mp-restful-webservice \
    -Dpackage=io.helidon.guides.mp.restfulwebservice</markup>

<p>Running the archetype this way creates a subdirectory <code>mp-restful-webservice</code>
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

>&lt;artifactId&gt;mp-restful-webservice&lt;/artifactId&gt;</markup>

<p>In the <code>&lt;dependency-management&gt;</code> section, note the dependency on the <code>helidon-bom</code> POM:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-bom&lt;/artifactId&gt;
    &lt;version&gt;${helidon.version}&lt;/version&gt;
    &lt;type&gt;pom&lt;/type&gt;
    &lt;scope&gt;import&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<p>Later, in the <code>&lt;dependencies&gt;</code> section, you will see a declaration for the Helidon
MicroProfile bundle.</p>

</div>

<h5 id="_srcmainresourcesmeta_infmicroprofile_config_properties"><code>src/main/resources/META-INF/microprofile-config.properties</code></h5>
<div class="section">
<p>This file contains settings for the Helidon web server and the
application. Note that the MicroProfile Config specification stipulates that
configuration data is read, by default, from this file;
the application does not have to do anything in code to load it.</p>

<markup


># Application properties. This is the default greeting
<span class="conum" data-value="1" />
app.greeting=Hello

# Microprofile server properties
<span class="conum" data-value="2" />
server.port=8080
server.host=0.0.0.0</markup>

<ul class="colist">
<li data-value="1">Initial application greeting.</li>
<li data-value="2">Web server configuration.</li>
</ul>
</div>

<h5 id="_srcmainresourceslogging_properties"><code>src/main/resources/logging.properties</code></h5>
<div class="section">
<p>This file controls logging within the application.</p>

<markup
lang="java"

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

<h5 id="_srcmainresourcesmeta_infbeans_xmlempty_beans_xml"><code>src/main/resources/META-INF/beans.xml</code>&#8201;&#8212;&#8201;"empty" <code>beans.xml</code></h5>
<div class="section">
<p>This "empty" <code>beans.xml</code> file makes sure JAX-RS searches for beans.</p>

<markup
lang="java"

>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                           http://xmlns.jcp.org/xml/ns/javaee/beans_2_0.xsd"
       version="2.0"
       bean-discovery-mode="annotated"&gt;
&lt;/beans&gt;</markup>

</div>

<h5 id="_greetingprovider_java_a_bean_to_hold_the_greeting_message"><code>GreetingProvider.java</code> - a bean to hold the greeting message</h5>
<div class="section">
<p>The app contains a default greeting loaded from configuration which the user
can set via HTTP.
The app stores the current greeting message in this JAX-RS bean for injection where needed.</p>

<markup
lang="java"

>@ApplicationScoped <span class="conum" data-value="1" />
public class GreetingProvider {
    private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;(); <span class="conum" data-value="2" />

    /**
     * Create a new greeting provider, reading the message from configuration.
     *
     * @param message greeting to use
     */
    @Inject
    public GreetingProvider(@ConfigProperty(name = "app.greeting") String message) { <span class="conum" data-value="3" />
        this.message.set(message);
    }

    String getMessage() { <span class="conum" data-value="4" />
        return message.get();
    }

    void setMessage(String message) { <span class="conum" data-value="5" />
        this.message.set(message);
    }
}</markup>

<ul class="colist">
<li data-value="1">Makes sure the system allocates one instance of <code>GreetingProvider</code> and uses
that instance wherever <code>GreetingProvider</code> is injected.</li>
<li data-value="2">An <code>AtomicReference&lt;String&gt;</code>, which will handle concurrent updates correctly,
holds the greeting message. Your application might receive multiple concurrent HTTP requests that
try to modify the message.</li>
<li data-value="3">The constructor is annotated with <code>javax.inject.Inject</code> and
accepts the initial message value as a <code>String</code> argument. The <code>ConfigProperty</code> annotation
on that argument triggers automatic MicroProfile config processing to look up the
<code>app.greeting</code> config value from (in our case) the default
MicroProfile config source: <code>META-INF/microprofile-config.properties</code>.</li>
<li data-value="4">Returns the greeting.</li>
<li data-value="5">Sets the greeting.</li>
</ul>
</div>

<h5 id="_greetresource_java_the_jax_rs_root_resource_for_the_application"><code>GreetResource.java</code> - the JAX-RS root resource for the application</h5>
<div class="section">
<p>This class defines the endpoints for the application.</p>

<p>Note the following:</p>

<ol style="margin-left: 15px;">
<li>
The resource is request-scoped and declares the common path prefix that
all endpoints in the resource share.
<div><markup
lang="java"

>@Path("/greet")
@RequestScoped
public class GreetResource {
}</markup>
</div>

</li>
<li>
JAX-RS injects the single instance of the <code>GreetingProvider</code> bean so the
resource can access the greeting message.
<div><markup
lang="java"

>@Inject
public GreetResource(GreetingProvider greetingConfig) {
    this.greetingProvider = greetingConfig;
}</markup>
</div>

</li>
<li>
A private method formats the messages that the endpoints
return to the clients.
<div><markup
lang="java"

>private JsonObject createResponse(String who) { <span class="conum" data-value="1" />
    String msg = String.format("%s %s!", greetingProvider.getMessage(), who); <span class="conum" data-value="2" />

    return JSON.createObjectBuilder() <span class="conum" data-value="3" />
            .add("message", msg)
            .build();
}</markup>

<ul class="colist">
<li data-value="1"><code>who</code> is the name of the end-user we want to greet</li>
<li data-value="2">Retrieves the greeting message from the <code>GreetingProvider</code> bean and embeds the end-user name
in it.</li>
<li data-value="3">Prepares the response as JSON.</li>
</ul></div>

</li>
<li>
The following methods implement the resource&#8217;s three endpoints.
<ol style="margin-left: 15px;">
<li>
Returning the default message
<div><markup
lang="java"

>@SuppressWarnings("checkstyle:designforextension")
@GET <span class="conum" data-value="1" />
@Produces(MediaType.APPLICATION_JSON) <span class="conum" data-value="2" />
public JsonObject getDefaultMessage() {
    return createResponse("World");
}</markup>

<ul class="colist">
<li data-value="1">Indicates the HTTP method: <code>GET</code>.</li>
<li data-value="2">Tells JAX-RS that this method returns JSON.</li>
</ul></div>

</li>
<li>
Returning the personalized greeting
<div><markup
lang="java"

>@SuppressWarnings("checkstyle:designforextension")
@Path("/{name}") <span class="conum" data-value="1" />
@GET <span class="conum" data-value="2" />
@Produces(MediaType.APPLICATION_JSON) <span class="conum" data-value="3" />
public JsonObject getMessage(@PathParam("name") String name) { <span class="conum" data-value="4" />
    return createResponse(name);
}</markup>

<ul class="colist">
<li data-value="1">Declares the path parameter which is the name to use for personalizing
the returned message.</li>
<li data-value="2">Indicates the HTTP method: <code>GET</code>.</li>
<li data-value="3">Tells JAX-RS that this method returns JSON.</li>
<li data-value="4">Triggers injection of the path parameter <code>name</code> as an argument to the method.</li>
</ul></div>

</li>
<li>
Setting a new greeting message
<div><markup
lang="java"

>@SuppressWarnings("checkstyle:designforextension")
@Path("/greeting") <span class="conum" data-value="1" />
@PUT <span class="conum" data-value="2" />
@Consumes(MediaType.APPLICATION_JSON) <span class="conum" data-value="3" />
@Produces(MediaType.APPLICATION_JSON) <span class="conum" data-value="3" />
public Response updateGreeting(JsonObject jsonObject) {
    if (!jsonObject.containsKey("greeting")) {
        JsonObject entity = JSON.createObjectBuilder()
                .add("error", "No greeting provided")
                .build();
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(entity)
                .build();
    }

    String newGreeting = jsonObject.getString("greeting"); <span class="conum" data-value="4" />

    greetingProvider.setMessage(newGreeting); <span class="conum" data-value="5" />
    return Response.status(Response.Status.NO_CONTENT) <span class="conum" data-value="6" />
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Identifies the path for this endpoint.</li>
<li data-value="2">It&#8217;s an HTTP <code>PUT</code>.</li>
<li data-value="3">Tells JAX-RS that this method both consumes and produces JSON.</li>
<li data-value="4">Retrieve the new greeting from the JSON payload.</li>
<li data-value="5">Save the new greeting for later use.</li>
<li data-value="6">Prepare the response.</li>
</ul></div>

</li>
</ol>
</li>
</ol>
</div>

<h5 id="_greetapplication_java_the_application_class"><code>GreetApplication.java</code> - the <code>Application</code> class</h5>
<div class="section">
<p>JAX-RS looks for an <code>Application</code> and will find <code>GreetApplication</code>.</p>

<markup
lang="java"

>@ApplicationScoped <span class="conum" data-value="1" />
@ApplicationPath("/") <span class="conum" data-value="2" />
public class GreetApplication extends Application { <span class="conum" data-value="3" />

    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        return CollectionsHelper.setOf(GreetResource.class); <span class="conum" data-value="4" />
    }
}</markup>

<ul class="colist">
<li data-value="1">JAX-RS creates only one instance of this class.</li>
<li data-value="2">No path prefix for this application.</li>
<li data-value="3">Class must extend <code>javax.ws.rs.core.Application</code>.</li>
<li data-value="4">Reports the resource classes in the application.</li>
</ul>
</div>

<h5 id="_main_java"><code>Main.java</code></h5>
<div class="section">
<p>The main class is quite short.</p>

<ol style="margin-left: 15px;">
<li>
<code>startServer</code>
<div><markup
lang="java"

>static Server startServer() {
    // Server will automatically pick up configuration from
    // microprofile-config.properties
    // and Application classes annotated as @ApplicationScoped
    return Server.create().start(); <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">Automatically reads server configuration from <code>microprofile-config.properties</code>
and then starts the reactive web server.</li>
</ul></div>

</li>
<li>
<code>setupLogging</code>
<div><markup
lang="java"

>private static void setupLogging() throws IOException {
    // load logging configuration
    LogManager.getLogManager().readConfiguration(
            Main.class.getResourceAsStream("/logging.properties")); <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">Loads logging config from <code>logging.properties</code></li>
</ul></div>

</li>
<li>
<code>main</code>
<div><p>The <code>main</code> method simply sets up logging, starts the server, and announces
a successful start-up.</p>

<markup
lang="java"

>    public static void main(final String[] args) throws IOException {
        setupLogging();

        Server server = startServer();

        System.out.println("http://localhost:" + server.port() + "/greet");
    }</markup>
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

>java -jar target/mp-restful-webservice.jar</markup>

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

<p>Helidon MicroProfile provides a built-in health framework. We can use that
framework easily to add our app-specific liveness check.</p>


<h4 id="_add_a_new_class_for_the_health_check">Add a new class for the health check</h4>
<div class="section">
<p>Create <code>CheckLiveness.java</code> to define the endpoints for checking whether the service is
active and whether it is ready.</p>

<ol style="margin-left: 15px;">
<li>
Add these imports:
<div><markup
lang="java"

>import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.HealthCheckResponseBuilder;</markup>
</div>

</li>
<li>
Declare the class:
<div><markup
lang="java"

>@ApplicationScoped <span class="conum" data-value="1" />
@Health <span class="conum" data-value="2" />
public class CheckLiveness implements HealthCheck { <span class="conum" data-value="3" />
}</markup>

<ul class="colist">
<li data-value="1">Mark the class as <code>@ApplicationScoped</code>; we need only one instance in the app.</li>
<li data-value="2">Identify this as a health resource.</li>
<li data-value="3">The class must implement <code>HealthCheck</code>.</li>
</ul></div>

</li>
<li>
Declare an injected instance field to refer to the greeting message provider. This
is the only input to the active check in our simple implementation.
<div><markup
lang="java"

>    @Inject <span class="conum" data-value="1" />
    private GreetingProvider greeting; <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Indicates that JAX-RS should inject the field.</li>
<li data-value="2">JAX-RS will inject a reference to the single <code>GreetingProvider</code> instance.</li>
</ul></div>

</li>
<li>
Add the <code>call</code> method.
<div><p>The health framework invokes <code>call</code> to retrieve the health information associated
with this health check.</p>

<markup
lang="java"

>    public HealthCheckResponse call() {
        HealthCheckResponseBuilder builder = HealthCheckResponse.builder()
                .name("greetingAlive"); <span class="conum" data-value="1" />
        if (greeting == null || greeting.getMessage().trim().length() == 0) { <span class="conum" data-value="2" />
            builder.down() <span class="conum" data-value="3" />
                   .withData("greeting", "not set or is empty");
        } else {
            builder.up(); <span class="conum" data-value="4" />
        }
        return builder.build(); <span class="conum" data-value="5" />
    }</markup>

<ul class="colist">
<li data-value="1">Create the health check with the name <code>greetingAlive</code>.</li>
<li data-value="2">The service is alive as long as the greeting message (trimmed) is not empty.</li>
<li data-value="3">If the message is empty, then report that this liveness check is <code>down</code> and add an explanatory
message.</li>
<li data-value="4">If the message is non-empty, then report that this liveness check is <code>up</code>.</li>
<li data-value="5">In either case, build the response and return it.</li>
</ul></div>

</li>
</ol>
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

<p>The item labeled <code>outcome</code> describes the overall health of the
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


<h4 id="_update_the_code">Update the code</h4>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Add the metrics dependency to <code>pom.xml</code>.
<div><markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.microprofile.metrics&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile-metrics&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;</markup>
</div>

</li>
<li>
In <code>GreetResource</code> annotate each method that is to be measured, in our case <code>getDefaultMessage</code>,
<code>getMessage</code>, and <code>updateGreeting</code>. (We annotate <code>updateGreeting</code> for simplicity
and so the metrics
reported here have the same values as for the Helidon SE RESTful web
service example. In a real application we might measure the <code>update</code> method separately
from the <code>get</code> methods.)
<ol style="margin-left: 15px;">
<li>
Add these imports:
<div><markup
lang="java"

>import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Counted;</markup>
</div>

</li>
<li>
Annotate <code>getDefaultMessage</code>, <code>getMessage</code>, and <code>updateGreeting</code> so they are
instrumented.
<div><markup
lang="java"

>    @Counted(<span class="conum" data-value="1" />
            name = "accessctr", <span class="conum" data-value="2" />
            reusable = true,    <span class="conum" data-value="3" />
            description = "Total greetings accesses",
            displayName = "Access Counter",
            monotonic = true,   <span class="conum" data-value="4" />
            unit = MetricUnits.NONE)</markup>

<ul class="colist">
<li data-value="1">Marks this method as measured by a <code>Counter</code> metric.</li>
<li data-value="2">Declares the unique name for this counter among all metrics.</li>
<li data-value="3">Allows the same counter to accumulate uses of multiple methods.</li>
<li data-value="4">Indicates that the metrics system should increment the counter on each invocation but
<em>not</em> decrement it when the method returns.</li>
</ul></div>

</li>
</ol>
</li>
</ol>
</div>

<h4 id="_stop_rebuild_and_rerun_your_application">Stop, rebuild and rerun your application</h4>
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

<h4 id="_send_some_requests">Send some requests</h4>
<div class="section">
<p>Use the same <code>curl</code> commands as before to send requests to
the server:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>Command</td>
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>

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
</tr>
<tr>
<td><doc-view>
<markup
lang="bash"

>curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}' http://localhost:8080/greet/greeting</markup>

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

>curl -X GET http://localhost:8080/metrics/application <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Requests all application-scoped metrics (we only have one).
You should see this output (in Prometheus format):</li>
</ul>
<div class="listing">
<pre># TYPE application:io_helidon_guides_mp_restfulwebservice_greet_resource_accessctr counter
# HELP application:io_helidon_guides_mp_restfulwebservice_greet_resource_accessctr Total greetings accesses
application:io_helidon_guides_mp_restfulwebservice_greet_resource_accessctr 4</pre>
</div>

<p>Note that:</p>

<ol style="margin-left: 15px;">
<li>
The name of the counter is automatically qualified with the package and class name of the JAX-RS
resource that records the metric (<code>io_helidon_guides_mp_restfulwebservice_greet_resource_accessctr</code>). If we
had added <code>absolute=true</code> to the <code>@Counted</code> annotation attributes then the name would be
simply <code>accessctr</code>.

</li>
<li>
The first two lines are gathered from the metadata we included in the <code>@Counted</code>
annotation.

</li>
<li>
As expected, the value for the counter is 4.

</li>
</ol>
<p>A <code>curl</code> to <code><a id="" title="" target="_blank" href="http://localhost:8080/metrics">http://localhost:8080/metrics</a></code> lists not only our application-scoped
metric but all the <em>base</em> and <em>vendor</em> metrics as defined in the MicroProfile metrics
specification.
For example, you will see a <code>vendor:requests_count</code>
counter. This will be larger than our counter because that counter also tracks
requests to the <code>/metrics</code> path itself; our <code>accessctr</code> counter tracks only requests to
our application endpoints.</p>

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
<code>cd</code> to the <code>helidon/examples/guides/mp-restful-webservice</code> directory.

</li>
<li>
Run:
<div><markup
lang="bash"

>mvn package
java -jar target/mp-restful-webservice.jar</markup>
</div>

</li>
</ol>
</div>
</div>
</doc-view>