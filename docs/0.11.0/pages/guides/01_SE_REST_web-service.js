<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE: Create a RESTful Web Service</dt>
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
<td><code>PUT localhost:8080/greet/greeting/Hola</code></td>
<td>Changes the greeting used in subsequent responses</td>
</tr>
</tbody>
</table>
</div>
<p>We create the app in three main steps:</p>

<ol style="margin-left: 15px;">
<li>
Write a basic Helidon SE app to respond to the HTTP requests.

</li>
<li>
Add code to perform simple health checks.

</li>
<li>
Add code to record simple metrics.

</li>
</ol>
<p>This guide walks you through the code and helps you understand what each part of the
code does as you write the app. But if you prefer, you can get the finished code for this example.
See the <router-link to="#downloading" @click.native="this.scrollFix('#downloading')">downloading</router-link> section for instructions.</p>

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

<h4 id="_create_a_new_maven_project">Create a new Maven project</h4>
<div class="section">
<p>You can create your Maven project in these ways:</p>

<ul class="ulist">
<li>
<p>use your IDE to create a new Java Maven project, or</p>

</li>
<li>
<p>run the standard Maven archetype to create a new Java project using this command:</p>
<markup
lang="bash"

>mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.3</markup>

</li>
</ul>
</div>

<h4 id="_update_your_pom_xml">Update your <code>pom.xml</code></h4>
<div class="section">
<p>Add the properties and dependencies listed here if they don&#8217;t exist in your <code>pom.xml</code>:</p>

<markup
lang="xml"

>    &lt;properties&gt;
        &lt;helidon.version&gt;0.11.0&lt;/helidon.version&gt;
        &lt;maven.compiler.source&gt;8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;${maven.compiler.source}&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencyManagement&gt;
        &lt;dependencies&gt;
            &lt;dependency&gt;
                &lt;groupId&gt;io.helidon&lt;/groupId&gt;
                &lt;artifactId&gt;helidon-bom&lt;/artifactId&gt;
                &lt;version&gt;${helidon.version}&lt;/version&gt;
                &lt;type&gt;pom&lt;/type&gt;
                &lt;scope&gt;import&lt;/scope&gt;
            &lt;/dependency&gt;
        &lt;/dependencies&gt;
    &lt;/dependencyManagement&gt;</markup>

<p>Now you can add Helidon dependencies to your project without having to specify the version.
For this example add these dependencies:</p>

<markup
lang="xml"

>    &lt;dependencies&gt;
        &lt;dependency&gt; <span class="conum" data-value="1" />
            &lt;groupId&gt;io.helidon.bundles&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-bundles-webserver&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt; <span class="conum" data-value="2" />
            &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-config-yaml&lt;/artifactId&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;</markup>

<ul class="colist">
<li data-value="1">Incorporates the Helidon web server.</li>
<li data-value="2">Pulls in support for YAML as a config format.</li>
</ul>
<p>If you run your project from the IDE, the IDE typically handles the main class and places
dependent JARs on the runtime classpath for you and your pom is now ready to go.</p>


<h5 id="_to_run_maven_outside_your_ide">To run Maven outside your IDE</h5>
<div class="section">
<p>If you want to use Maven yourself,
outside the IDE, then add the following to your pom. (This is typical with Maven
projects and is not specific to Helidon or this example):</p>

<markup
lang="xml"

>    &lt;properties&gt;
        ...
        &lt;mainClass&gt;your-fully-qualified-main-class&lt;/mainClass&gt; <span class="conum" data-value="1" />
        &lt;libs.classpath.prefix&gt;libs&lt;/libs.classpath.prefix&gt;
        &lt;copied.libs.dir&gt;${project.build.directory}/${libs.classpath.prefix}&lt;/copied.libs.dir&gt;
        ...
    &lt;/properties&gt;

    &lt;build&gt;
        &lt;pluginManagement&gt;
            &lt;plugins&gt;
                &lt;plugin&gt;
                    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                    &lt;artifactId&gt;maven-jar-plugin&lt;/artifactId&gt;
                    &lt;version&gt;2.5&lt;/version&gt;
                    &lt;configuration&gt;  <span class="conum" data-value="2" />
                        &lt;archive&gt;
                            &lt;manifest&gt;
                                &lt;addClasspath&gt;true&lt;/addClasspath&gt;
                                &lt;classpathPrefix&gt;${libs.classpath.prefix}&lt;/classpathPrefix&gt;
                                &lt;mainClass&gt;${mainClass}&lt;/mainClass&gt;
                            &lt;/manifest&gt;
                        &lt;/archive&gt;
                    &lt;/configuration&gt;
                &lt;/plugin&gt;
            &lt;/plugins&gt;
        &lt;/pluginManagement&gt;
        &lt;plugins&gt;
            &lt;plugin&gt; <span class="conum" data-value="3" />
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-dependency-plugin&lt;/artifactId&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;id&gt;copy-dependencies&lt;/id&gt;
                        &lt;phase&gt;prepare-package&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;copy-dependencies&lt;/goal&gt;
                        &lt;/goals&gt;
                        &lt;configuration&gt;
                            &lt;outputDirectory&gt;${copied.libs.dir}&lt;/outputDirectory&gt;
                            &lt;overWriteReleases&gt;false&lt;/overWriteReleases&gt;
                            &lt;overWriteSnapshots&gt;false&lt;/overWriteSnapshots&gt;
                            &lt;overWriteIfNewer&gt;true&lt;/overWriteIfNewer&gt;
                            &lt;overWriteIfNewer&gt;true&lt;/overWriteIfNewer&gt;
                            &lt;includeScope&gt;runtime&lt;/includeScope&gt;
                            &lt;excludeScope&gt;test&lt;/excludeScope&gt;
                        &lt;/configuration&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;</markup>

<ul class="colist">
<li data-value="1">Make sure to specify your own main class path.</li>
<li data-value="2">Instructs Maven what main class to set in the JAR&#8217;s manifest and what prefix to use for
copied dependency JARs.</li>
<li data-value="3">Tells Maven to package the dependency JARs in the specified directory relative to the project&#8217;s JAR.</li>
</ul>
</div>
</div>

<h4 id="_create_a_config_resource_file">Create a config resource file</h4>
<div class="section">
<p>Your app will use the Helidon config support to initialize the greeting and set up HTTP
listening.</p>

<p>Create this config file:</p>

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

<h4 id="_create_a_logging_properties_file">Create a logging properties file</h4>
<div class="section">
<markup

title="<code>src/main/resources/logging.properties</code>"
># Send messages to the console
handlers=java.util.logging.ConsoleHandler

# Global default logging level. Can be overriden by specific handlers and loggers
.level=INFO

# Helidon Web Server has a custom log formatter that extends SimpleFormatter.
# It replaces "!thread!" with the current thread name
java.util.logging.ConsoleHandler.level=INFO
java.util.logging.ConsoleHandler.formatter=io.helidon.webserver.netty.WebServerLogFormatter
java.util.logging.SimpleFormatter.format=%1$tY.%1$tm.%1$td %1$tH:%1$tM:%1$tS %4$s %3$s !thread!: %5$s%6$s%n</markup>

</div>

<h4 id="_create_your_greet_service">Create your "Greet" Service</h4>
<div class="section">
<p>In general, your application can implement multiple services, each tied to its own
URL path. We&#8217;ll start with just one service: the greeting service.</p>

<p>Create a new Java class <code>GreetService.java</code> as follows. Add these Java <code>import</code> statements:</p>

<markup
lang="java"

>import javax.json.Json;
import javax.json.JsonObject;

import io.helidon.config.Config;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;</markup>

<ol style="margin-left: 15px;">
<li>
Make <code>GreetService</code> implement <code>io.helidon.webserver.Service</code>.

</li>
<li>
Set two static fields by reading the config file and setting the initial greeting from
the loaded config:
<markup
lang="java"

>    private static final Config CONFIG = Config.create().get("app"); <span class="conum" data-value="1" />
    private String greeting = CONFIG.get("greeting").asString().orElse("Ciao"); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Loads the config from the (default) <code>application.yaml</code> resource you created earlier
and loads the subtree rooted at the <code>app</code> entry into the <code>CONFIG</code> field. The
type of the field is <code>io.helidon.config.Config</code>.</li>
<li data-value="2">Sets the initial greeting from the config, using "Ciao" if the expected
entry is missing from the loaded config.</li>
</ul>
</li>
<li>
Implement the responses to the three types of request by adding three methods.
<ol style="margin-left: 15px;">
<li>
Returning the default greeting
<markup
lang="java"

>    private void getDefaultMessage(final ServerRequest request,
                                   final ServerResponse response) {
        String msg = String.format("%s %s!", greeting, "World"); <span class="conum" data-value="1" />

        JsonObject returnObject = Json.createObjectBuilder()
                .add("message", msg) <span class="conum" data-value="2" />
                .build();
        response.send(returnObject); <span class="conum" data-value="3" />
    }</markup>

<ul class="colist">
<li data-value="1">Gets the greeting (defaults to "Hello") from the current setting (and adds "World").</li>
<li data-value="2">Creates the JSON response from the message and builds the response.</li>
<li data-value="3">Sends the response to the client.</li>
</ul>
</li>
<li>
Returning a personalized greeting
<markup
lang="java"

>    private void getMessage(final ServerRequest request,
                            final ServerResponse response) {
        String name = request.path().param("name"); <span class="conum" data-value="1" />
        String msg = String.format("%s %s!", greeting, name);

        JsonObject returnObject = Json.createObjectBuilder()
                .add("message", msg)
                .build();
        response.send(returnObject);
    }</markup>

<ul class="colist">
<li data-value="1">Get the name from the URL path in the request and use it in buildig the
JSON response.
The rest of the method is the same as <code>getDefaultMessage</code>.</li>
</ul>
</li>
<li>
Updating the greeting
<markup
lang="java"

>    private void updateGreeting(final ServerRequest request,
                                final ServerResponse response) {
        greeting = request.path().param("greeting"); <span class="conum" data-value="1" />

        JsonObject returnObject = Json.createObjectBuilder() <span class="conum" data-value="2" />
                .add("greeting", greeting)
                .build();
        response.send(returnObject);
    }</markup>

<ul class="colist">
<li data-value="1">Save the new greeting from the URL path in the request.</li>
<li data-value="2">Compose the JSON response to confirm the new setting for <code>greeting</code>.</li>
</ul>
</li>
</ol>
</li>
<li>
Link your logic with the correct URL paths
<markup
lang="java"

>    @Override
    public final void update(final Routing.Rules rules) { <span class="conum" data-value="1" />
        rules
            .get("/", this::getDefaultMessage) <span class="conum" data-value="2" />
            .get("/{name}", this::getMessage) <span class="conum" data-value="3" />
            .put("/greeting/{greeting}", this::updateGreeting); <span class="conum" data-value="4" />
    }</markup>

<ul class="colist">
<li data-value="1">Each service overrides <code>update</code> to define its routing rules.</li>
<li data-value="2">Handle <code>GET</code> requests with no extra path using <code>getDefaultMessage</code>.</li>
<li data-value="3">Handle <code>GET</code> requests with a name using <code>getMessage</code> which personalizes the response
using the name provided as the path suffix.</li>
<li data-value="4">Handle <code>PUT</code> requests to the <code>greeting</code> path using <code>updateGreeting</code>,
interpreting the end of the path as the new greeting string.</li>
</ul>
</li>
</ol>
</div>

<h4 id="_write_your_main_class">Write your main class</h4>
<div class="section">
<p>You need just a little more code so your app starts the Helidon web server
and makes it aware of your greeting service.</p>

<p>Add these Java <code>import</code> statements:</p>

<markup
lang="java"

>import io.helidon.config.Config;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerConfiguration;
import io.helidon.webserver.WebServer;
import io.helidon.webserver.json.JsonSupport;</markup>

<ol style="margin-left: 15px;">
<li>
Add a field to your main class to hold a reference to a <code>GreetService</code> instance.
<markup
lang="java"

>    private static GreetService greetService;</markup>

</li>
<li>
Add a method to your main class to set up routing for your app.
<markup
lang="java"

>    private static Routing createRouting() {
        greetService = new GreetService(); <span class="conum" data-value="1" />
        return Routing.builder()
                .register(JsonSupport.create()) <span class="conum" data-value="2" />
                .register("/greet", greetService) <span class="conum" data-value="3" />
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Creates and saves the reference to the <code>GreetService</code>. (We&#8217;ll use <code>greeting</code> reference again
later when we add support for health checking.)</li>
<li data-value="2">Tells the Helidon web server that you want to use JSON.</li>
<li data-value="3">Associates the greeting service with the <code>/greet</code> path.</li>
</ul>
</li>
<li>
Add the <code>startServer</code> method.
<markup
lang="java"

>    protected static WebServer startServer() throws IOException {

        // load logging configuration
        LogManager.getLogManager().readConfiguration(
                Main.class.getResourceAsStream("/logging.properties"));

        // By default this will pick up application.yaml from the classpath
        Config config = Config.create();

        // Get webserver config from the "server" section of application.yaml
        ServerConfiguration serverConfig =
                ServerConfiguration.create(config.get("server")); <span class="conum" data-value="1" />

        WebServer server = WebServer.create(serverConfig, createRouting()); <span class="conum" data-value="2" />

        // Start the server and print some info.
        server.start().thenAccept(ws -&gt; { <span class="conum" data-value="3" />
            System.out.println(
                    "WEB server is up! http://localhost:" + ws.port());
        });

        // Server threads are not demon. NO need to block. Just react.
        server.whenShutdown().thenRun(() <span class="conum" data-value="4" />
                -&gt; System.out.println("WEB server is DOWN. Good bye!"));

        return server;
    }</markup>

<ul class="colist">
<li data-value="1">Gets the webserver config from the "server" section of <code>application.yaml</code>. The
config system automatically maps the config&#8217;s <code>host</code> and <code>port</code> to those
attributes of <code>ServerConfiguration</code>.</li>
<li data-value="2">Creates the web server using the routing rules from the <code>createRouting</code> method.</li>
<li data-value="3">Starts the web server, then logs a message.</li>
<li data-value="4">Set up a shutdown hook so when the web server is shut down (for example, by ^C on the console)
the app prints a message.</li>
</ul>
</li>
<li>
Write your main method
<p>Add</p>

<markup
lang="java"

>        startServer();</markup>

<p>to your main method.</p>

</li>
</ol>
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

>java -jar target/your-jar-name.jar</markup>

<p>Once you have started your app, from another command window run these commands
to access its functions (order is important for the last two):</p>


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

>curl -X PUT http://localhost:8080/greet/greeting/Hola</markup>

</doc-view>
</td>
<td><doc-view>
<div class="listing">
<pre>{"greeting":"Hola"}</pre>
</div>

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

<h3 id="_add_health_checks">Add health checks</h3>
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
<p>For this example we define our service as "alive" in a very trivial way.
Our greeting service does not depend on any
host resources (like disk space) or any other services. So we choose to define our
greeting service to be OK if the greeting text has been assigned
<em>and is not empty</em> when trimmed of leading or trailing white space. Otherwise we
consider the service to be unhealthy, in which case the service will
still respond but its answers might not be what we want.</p>

<p>Normally we would
write our service to make
sure that a newly-assigned greeting is non-empty <em>before</em>
accepting it. But omitting that validation lets us create an easy health check
that we can use by simply setting the greeting to blank from
a <code>curl</code> command.</p>


<h4 id="_add_code_to_greetservice_java">Add code to <code>GreetService.java</code></h4>
<div class="section">
<p>For our simple service, assess health simply by making sure the greeting contains
something other than blanks.</p>

<markup
lang="java"

>    String checkHealth() {
        if (greeting == null || greeting.trim().length() == 0) { <span class="conum" data-value="1" />
           return "greeting is not set or is empty";
        }
        return null;
    }</markup>

</div>

<h4 id="_add_code_to_main_java">Add code to <code>Main.java</code></h4>
<div class="section">
<p>Now let&#8217;s add the code to actually implement the readiness and liveness endpoints to
to the <code>Main</code> class.</p>

<p>Add these imports:</p>

<markup
lang="java"

>import io.helidon.common.http.Http;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import javax.json.Json;
import javax.json.JsonObject;</markup>

<ol style="margin-left: 15px;">
<li>
Add a new <code>ready</code> method
<markup
lang="java"

>    private static void ready(final ServerRequest request,
                       final ServerResponse response) {
        response
                .status(Http.Status.OK_200)
                .send();
    }</markup>

<p>This method simply returns 200 so the client knows the service is up.</p>

</li>
<li>
Add a new <code>alive</code> method
<markup
lang="java"

>    private static void alive(final ServerRequest request,
                        final ServerResponse response) {
        /*
         * Return 200 if the greeting is set to something non-null and non-empty;
         * return 500 (server error) otherwise.
         */
        String greetServiceError = greetService.checkHealth(); <span class="conum" data-value="1" />
        if (greetServiceError == null) {
            response
                    .status(Http.Status.OK_200) <span class="conum" data-value="2" />
                    .send();
        } else {
            JsonObject returnObject = Json.createObjectBuilder() <span class="conum" data-value="3" />
                    .add("error", greetServiceError)
                    .build();
            response
                    .status(Http.Status.INTERNAL_SERVER_ERROR_500) <span class="conum" data-value="4" />
                    .send(returnObject);
        }
    }</markup>

<ul class="colist">
<li data-value="1">Delegates to <code>GreetService</code> to evaluate the liveness of the service&#8201;&#8212;&#8201;in our case, is the greeting non-empty.</li>
<li data-value="2">Replies with a simple 200 for the health case.</li>
<li data-value="3">For the unhealthy case prepares a description of the problem&#8230;&#8203;</li>
<li data-value="4">&#8230;&#8203;and replies with a 500.</li>
</ul>
</li>
<li>
Add the new endpoints to the routing
<p>In the <code>createRouting</code> method in <code>Main.java</code> insert these lines immediately
after the <code>.register</code> invocations:</p>

<markup
lang="java"

>                .get("/alive", Main::alive)
                .get("/ready", Main::ready)</markup>

<p>These link the health-related endpoints your code is exposing to the new methods.</p>

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

<h4 id="_try_the_readiness_check">Try the readiness check</h4>
<div class="section">
<p>Access the readiness check endpoint:</p>

<markup
lang="bash"

>curl -i -X GET http://localhost:8080/ready</markup>

<p>Our readiness check returns no payload, just the 200 status, so you won&#8217;t see any data
displayed. The <code>-i</code> option shows the
200 status in the response.</p>

</div>

<h4 id="_try_the_liveness_check">Try the liveness check</h4>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Ping the health check endpoint
<p>Without changing the greeting, ping the health endpoint:</p>

<markup
lang="bash"

>curl -i -X GET http://localhost:8080/alive</markup>

<p>The greeting is valid and in that case our health check code simply returns a 200
with no payload.</p>

</li>
<li>
Set the greeting to a blank
<markup
lang="bash"

>curl -X PUT http://localhost:8080/greet/greeting/%20</markup>

<p>Our code to update the greeting accepts this and saves it as the new greeting.</p>

</li>
<li>
Ping the health check endpoint again with the same command as before
<markup
lang="bash"

>curl -i -X GET http://localhost:8080/alive</markup>

<p>This time you should see</p>

<div class="listing">
<pre>{"error":"greeting is not set or is empty"}</pre>
</div>

<p>and with the <code>-i</code> added to the <code>curl</code> command you would see the 500 status returned.</p>

</li>
</ol>
</div>
</div>

<h3 id="_add_metrics_support">Add metrics support</h3>
<div class="section">
<p>As a simple illustration of using metrics, we revise our greeting service to count how many times
a client sends a request to the app.</p>

<ol style="margin-left: 15px;">
<li>
Add the metrics dependency to <code>pom.xml</code>
<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-metrics&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

</li>
<li>
Enable metrics in <code>Main.java</code>
<p>Add these imports:</p>

<markup
lang="java"

>import io.helidon.metrics.MetricsSupport;</markup>

<ol style="margin-left: 15px;">
<li>
Register metrics support in request routing
<p>In <code>Main.createRouting</code>:</p>

<ol style="margin-left: 15px;">
<li>
Just before the code instantiates <code>GreetService</code> add this:
<markup
lang="java"

>        final MetricsSupport metrics = MetricsSupport.create(); <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Initializes the metrics infrastructure in Helidon.</li>
</ul>
</li>
<li>
Just after the invocation of <code>register(JsonSupport.create())</code>
add this
<markup
lang="java"

>                .register(metrics) <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Registers the <code>MetricsSupport</code> handler with the web server&#8217;s
handler chain.</li>
</ul>
<p>Here is the whole, updated method:</p>

<markup
lang="java"

>    private static Routing createRouting() {
        final MetricsSupport metrics = MetricsSupport.create(); <span class="conum" data-value="1" />
        greetService = new GreetService(); <span class="conum" data-value="1" />
        return Routing.builder()
                .register(JsonSupport.create()) <span class="conum" data-value="2" />
                .register(metrics) <span class="conum" data-value="1" />
                .register("/greet", greetService) <span class="conum" data-value="3" />
                .get("/alive", Main::alive)
                .get("/ready", Main::ready)
                .build();
    }</markup>

</li>
</ol>
</li>
</ol>
</li>
<li>
Revise <code>GreetService.java</code> for metrics
<p>Add these imports:</p>

<markup
lang="java"

>import io.helidon.metrics.RegistryFactory;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricRegistry;</markup>

<ol style="margin-left: 15px;">
<li>
Register a metric in <code>GreetService.java</code>
<p>Add these declarations as private fields:</p>

<markup
lang="java"

>    private final MetricRegistry registry = RegistryFactory.getRegistryFactory().get()
            .getRegistry(MetricRegistry.Type.APPLICATION); <span class="conum" data-value="1" />
    private final Counter greetCounter = registry.counter("accessctr"); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Refers to the application-scoped metrics registry.</li>
<li data-value="2">Declares a metric of type <code>counter</code>.</li>
</ul>
</li>
<li>
Create a method to display which method is handling a request.
<p>Add this method:</p>

<markup
lang="java"

>    private void displayThread() {
        String methodName = Thread.currentThread().getStackTrace()[2].getMethodName();
        System.out.println("Method=" + methodName + " " + "Thread=" + Thread.currentThread().getName());
    }</markup>

</li>
<li>
Create a request handler to update the counter
<p>Add this method:</p>

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
</ul>
</li>
<li>
Register a filter to count requests
<p>To the <code>update</code> method add this line immediately before the
existing <code>get</code> invocations.</p>

<markup
lang="java"

>            .any(this::counterFilter) <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Invokes <code>counterFilter</code> for <em>any</em> incoming request.</li>
</ul>
</li>
</ol>
</li>
</ol>

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

>curl -X PUT http://localhost:8080/greet/greeting/Hola</markup>

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

<p>You should see a long JSON result. Note two parts:</p>


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
<pre>"application":{"accessctr":4}</pre>
</div>

</doc-view>
</td>
<td>The counter we added to the app</td>
</tr>
<tr>
<td><doc-view>
<div class="listing">
<pre>"requests.meter":{"count":5, ...</pre>
</div>

</doc-view>
</td>
<td>The total HTTP requests the Helidon web server received (and several values
reflecting the request arrival rate)</td>
</tr>
</tbody>
</table>
</div>
<p>The request count is higher because the access to <code>/metrics</code> to retrieve the
monitoring data is <em>not</em> handled by our app&#8217;s rules and filters but by the
metrics infrastructure.</p>

</div>
</div>

<h3 id="downloading">(Optional) Download the example source</h3>
<div class="section">
<p>Instead of building the application using the code snippets in this guide,
you can download it.</p>

<ol style="margin-left: 15px;">
<li>
Clone the <a id=""
title=""
target="_blank"
href="https://github.com/oracle/helidon"><code>git</code> workspace
for Helidon</a>

</li>
<li>
<code>cd</code> to the <code>examples/guides/se-restful-webservice</code> directory.

</li>
<li>
Run:
<markup
lang="bash"

>mvn package
java -jar target/se-restful-webservice.jar</markup>

</li>
</ol>
</div>
</div>
</doc-view>