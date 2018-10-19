<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Creating a ReSTful Web Service using Helidon SE</dt>
<dd slot="desc"><p>Create and build a ReSTful web service as your first Helidon SE application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h1 id="_the_restful_web_service_guide">The ReSTful Web Service Guide</h1>
<div class="section">
<p>Create and build a ReSTful web service as your first Helidon SE application.</p>


<h2 id="_what_you_will_learn">What You Will Learn</h2>
<div class="section">
<p>You&#8217;ll learn how to use Helidon quickly to create a ReSTful web service that accepts these HTTP requests:</p>


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
</div>

<h2 id="_what_you_need">What You Need</h2>
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
<td>About 10 minutes</td>
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

<h2 id="_write_your_application">Write Your Application</h2>
<div class="section">
<p>(See the last section to find out how to get the entire finished code for this example.)</p>


<h3 id="_create_a_new_maven_project">Create a new Maven Project</h3>
<div class="section">
<p>You can create your maven project in these ways:</p>

<ul class="ulist">
<li>
<p>use your IDE to create a new Java maven project, or</p>

</li>
<li>
<p>run the standard maven archetype to create a new Java project using this command:</p>
<markup
lang="bash"

>mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.3</markup>

</li>
</ul>
</div>

<h3 id="_update_your_code_pom_xml_code">Update Your <code>pom.xml</code></h3>
<div class="section">

<h4 id="_the_essentials">The Essentials</h4>
<div class="section">
<p>Make sure your POM contains these sections:</p>

<markup
lang="xml"

>    &lt;properties&gt;
        &lt;helidon.version&gt;0.10.4&lt;/helidon.version&gt;
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
            &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-webserver-bundle&lt;/artifactId&gt;
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

</div>

<h4 id="_to_run_code_maven_code_outside_your_ide">To Run <code>maven</code> Outside your IDE</h4>
<div class="section">
<p>If you want to use <code>maven</code> yourself,
outside the IDE, then add the following to your pom. (This is typical with maven
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
<li data-value="2">Instructs maven what main class to set in the JAR&#8217;s manifest and what prefix to use for
copied dependency JARs.</li>
<li data-value="3">Tells maven to package the dependency JARs in the specified directory relative to the project&#8217;s JAR.</li>
</ul>
</div>
</div>

<h3 id="_create_a_config_resource_file">Create a Config Resource File</h3>
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

<h3 id="_create_a_logging_properties_file">Create a logging properties file</h3>
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

<h3 id="_create_your_greet_service">Create your "Greet" Service</h3>
<div class="section">
<p>In general, your application can implement multiple services, each tied to its own
URL path. We&#8217;ll start with just one service: the greeting service.</p>

<p>Create a new Java class <code>GreetService.java</code> as follows. Note that along the way
you or your IDE will be adding these Java <code>import</code> statements:</p>

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
    private static String greeting = CONFIG.get("greeting").asString("Ciao"); <span class="conum" data-value="2" /></markup>

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

<h3 id="_write_your_main_class">Write your main class</h3>
<div class="section">
<p>You need just a little more code so your app starts the Helidon web server
and makes it aware of your greeting service.</p>

<p>Along the way you or your IDE will be adding these Java <code>import</code> statements:</p>

<markup
lang="java"

>import io.helidon.config.Config;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerConfiguration;
import io.helidon.webserver.WebServer;
import io.helidon.webserver.json.JsonSupport;</markup>

<ol style="margin-left: 15px;">
<li>
Add a method to your main class to set up routing for your app.
<markup
lang="java"

>    private static Routing createRouting() {
        return Routing.builder()
                .register(JsonSupport.get()) <span class="conum" data-value="1" />
                .register("/greet", new GreetService()) <span class="conum" data-value="2" />
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Tells the Helidon web server that you want to use JSON.</li>
<li data-value="2">Associates the <code>/greet</code> path with your greet service.</li>
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
                ServerConfiguration.fromConfig(config.get("server")); <span class="conum" data-value="1" />

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

<h2 id="_build_and_run">Build and Run</h2>
<div class="section">
<p>You can use your IDE&#8217;s features to build and run the project directly.</p>

<p>Or, to use <code>maven</code> outside the IDE, build your app this way:</p>

<markup
lang="bash"

>mvn package</markup>

<p>and run it like this:</p>

<markup
lang="bash"

>java -jar target/your-jar-name.jar</markup>

<p>Once you have started your app, from another command window run these commands
to access its three functions (order is important for the last two):</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Commmand</th>
<th>Result</th>
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
<markup
lang="bash"

>{"message":"Hello World!"}</markup>

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
<markup
lang="bash"

>{"message":"Hello Joe!"}</markup>

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
<markup
lang="bash"

>{"greeting":"Hola"}</markup>

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
<markup
lang="bash"

>{"message":"Hola Jose!"}</markup>

</doc-view>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_or_download_the_example_source">(Or, Download the Example Source)</h2>
<div class="section">
<p>We think the guide is most useful if you follow along step-by-step, building
up the app and understanding what each part of the code is doing as you go.</p>

<p>But if you prefer, you can get the finished code for this example by cloning the <a id=""
title=""
target="_blank"
href="https://github.com/oracle/helidon"><code>git</code> workspace
for Helidon</a>, navigating to the <code>examples/guides/se-restful-webservice</code> directory, and
running</p>

<markup
lang="bash"

>mvn package
java -jar target/se-restful-webservice.jar</markup>

</div>
</div>
</doc-view>