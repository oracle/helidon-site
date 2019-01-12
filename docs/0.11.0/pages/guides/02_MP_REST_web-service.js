<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP: Create a RESTful Web Service</dt>
<dd slot="desc"><p>Create and build a RESTful web service as your first Helidon MP application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_the_mp_restful_web_service_guide">The MP RESTful Web Service Guide</h2>
<div class="section">
<p>Create and build a JAX-RS RESTful web service as your first Helidon MP application.</p>


<h3 id="_what_you_will_learn">What you will learn</h3>
<div class="section">
<p>You&#8217;ll learn how to use Helidon MP quickly to create a JAX-RS RESTful web service that accepts these HTTP requests:</p>


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
<p>We create the app in these main steps:</p>

<ol style="margin-left: 15px;">
<li>
Write a basic Helidon MP app to respond to the HTTP requests.

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
title="Unix-style"
>mvn archetype:generate \
    -DarchetypeGroupId=org.apache.maven.archetypes \
    -DarchetypeArtifactId=maven-archetype-quickstart \
    -DarchetypeVersion=1.3</markup>

<markup
lang="bash"
title="Windows-style"
>mvn archetype:generate ^
    -DarchetypeGroupId=org.apache.maven.archetypes ^
    -DarchetypeArtifactId=maven-archetype-quickstart ^
    -DarchetypeVersion=1.3</markup>

<p>Answer the prompts for your module&#8217;s group ID, artifact ID, and version,
then <code>cd</code> to the <code>&lt;artifactId&gt;</code> directory you specified.</p>

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
            &lt;dependency&gt;
                &lt;groupId&gt;javax.activation&lt;/groupId&gt;
                &lt;artifactId&gt;javax.activation-api&lt;/artifactId&gt;
                &lt;version&gt;1.2.0&lt;/version&gt;
            &lt;/dependency&gt;
        &lt;/dependencies&gt;
    &lt;/dependencyManagement&gt;</markup>

<p>Now you can add Helidon dependencies to your project without having to specify the version.
For this example add these dependencies:</p>

<markup
lang="xml"

>    &lt;dependencies&gt;
        &lt;dependency&gt; <span class="conum" data-value="1" />
            &lt;groupId&gt;io.helidon.microprofile.bundles&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile-1.2&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt; <span class="conum" data-value="2" />
            &lt;groupId&gt;org.glassfish.jersey.media&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-media-json-binding&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt; <span class="conum" data-value="3" />
            &lt;groupId&gt;org.jboss&lt;/groupId&gt;
            &lt;artifactId&gt;jandex&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
            &lt;optional&gt;true&lt;/optional&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt; <span class="conum" data-value="4" />
            &lt;groupId&gt;javax.activation&lt;/groupId&gt;
            &lt;artifactId&gt;javax.activation-api&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;</markup>

<ul class="colist">
<li data-value="1">Incorporates the Helidon MicroProfile bundle.</li>
<li data-value="2">Pulls in JSON-B support.</li>
<li data-value="3">Adds jandex, a JAX-RS bean search optimizer.</li>
<li data-value="4">Adds the activation API.</li>
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

<h4 id="_create_an_mp_config_file">Create an MP config file</h4>
<div class="section">
<p>This file contains settings for the Helidon web server and the
application. Note that the MP Config specification says that
configuration data is read, by default, from <code>META-INF/microprofile-config.properties</code>;
the application does not have to do anything in code to load it.</p>

<markup

title="src/main/resources/META-INF/microprofile-config.properties"
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

<h4 id="_create_a_logging_config_file">Create a logging config file</h4>
<div class="section">
<p>This file controls logging within the application.</p>

<markup
lang="java"
title="src/main/resources/logging.properties"
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

<h4 id="_create_an_empty_beans_xml">Create an "empty" <code>beans.xml</code></h4>
<div class="section">
<p>We need to make sure JAX-RS searches for beans. This file accomplishes that.</p>

<markup
lang="java"
title="src/main/resources/META-INF/beans.xml"
>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                           http://xmlns.jcp.org/xml/ns/javaee/beans_2_0.xsd"
       version="2.0"
       bean-discovery-mode="annotated"&gt;
&lt;/beans&gt;</markup>

</div>

<h4 id="_create_a_bean_to_hold_the_greeting_message">Create a bean to hold the greeting message</h4>
<div class="section">
<p>The app contains a default greeting loaded from configuration which the user
can set via HTTP.
The app stores the current message in a JAX-RS bean so we can inject it where
we need it.</p>

<p>Add these imports:</p>

<markup
lang="java"

>import java.util.concurrent.atomic.AtomicReference;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;</markup>

<ol style="margin-left: 15px;">
<li>
Create <code>GreetingMessage.java</code>

</li>
<li>
Annotate the class with <code>javax.enterprise.context.ApplicationScoped</code>
<p>This makes sure that the system allocates one instance of <code>GreetingMessage</code> and
uses it for all requests.</p>

</li>
<li>
You need a <code>String</code> field to hold the greeting that can handle potential concurrent attempts to update it,
because your application might receive multiple concurrent HTTP requests that
try to modify the message. One way is to add an <code>AtomicReference</code> for a <code>String</code>:
<markup
lang="java"

>    private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;();</markup>

</li>
<li>
Add a constructor annotated with <code>javax.inject.Inject</code> and which
accepts the initial message value as a <code>String</code>.
<markup
lang="java"

>    @Inject <span class="conum" data-value="1" />
    public GreetingMessage(@ConfigProperty(name = "app.greeting") String message) { <span class="conum" data-value="2" />
        this.message.set(message); <span class="conum" data-value="3" />
    }</markup>

<ul class="colist">
<li data-value="1">Causes the annotated parameter to be processed and injected.</li>
<li data-value="2">The <code>ConfigProperty</code> annotation triggers automatic MP config processing
to look up the <code>app.greeting</code> config value from (in our case) the default
MP config source: <code>META-INF/microprofile-config.properties</code>.</li>
<li data-value="3">Assigns the parameter value to the <code>AtomicString</code> field.</li>
</ul>
</li>
<li>
Add a getter and setter for the <code>message</code>
<markup
lang="java"

>    String getMessage() {
        return message.get();
    }

    void setMessage(String message) {
        this.message.set(message);
    }</markup>

</li>
</ol>
</div>

<h4 id="_create_a_jax_rs_root_resource_for_the_application">Create a JAX-RS root resource for the application</h4>
<div class="section">
<p>This class defines the endpoints for the application.</p>

<p>Add these imports:</p>

<markup
lang="java"

>import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;</markup>

<ol style="margin-left: 15px;">
<li>
Create the <code>GreetResource.java</code> file.
Mark it as request-scoped and declare the common path prefix that
all endpoints in the resource share.
<markup
lang="java"

>@Path("/greet")
@RequestScoped
public class GreetResource {
}</markup>

</li>
<li>
Create a private field for the application&#8217;s <code>GreetingMessage</code>
<markup
lang="java"

>    @Inject
    private GreetingMessage greeting;</markup>

<p>The system injects our application-scoped <code>GreetingMessage</code>
instance.</p>

</li>
<li>
Write a private method to format the message your endpoints
return to the clients.
<markup
lang="java"

>    private JsonObject createResponse(String who) { <span class="conum" data-value="1" />
        String msg = String.format("%s %s!", greeting.getMessage(), who); <span class="conum" data-value="2" />

        return Json.createObjectBuilder() <span class="conum" data-value="3" />
                .add("message", msg)
                .build();
    }</markup>

<ul class="colist">
<li data-value="1"><code>who</code> is the name of the end-user we want to greet</li>
<li data-value="2">Retrieves the message from the <code>GreetingMessage</code> bean and embeds the end-user name
in it.</li>
<li data-value="3">Prepares the response as JSON.</li>
</ul>
</li>
</ol>
</div>

<h4 id="_add_the_code_for_the_resources_endpoints">Add the code for the resource&#8217;s endpoints</h4>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Returning the default message
<markup
lang="java"

>    @SuppressWarnings("checkstyle:designforextension")
    @GET <span class="conum" data-value="1" />
    @Produces(MediaType.APPLICATION_JSON) <span class="conum" data-value="2" />
    public JsonObject getDefaultMessage() {
        return createResponse("World");
    }</markup>

<ul class="colist">
<li data-value="1">Indicates the HTTP method: <code>GET</code>.</li>
<li data-value="2">Tells JAX-RS that this method returns JSON.</li>
</ul>
</li>
<li>
Returning the personalized greeting
<markup
lang="java"

>    @SuppressWarnings("checkstyle:designforextension")
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
</ul>
</li>
<li>
Setting a new greeting message
<markup
lang="java"

>    @SuppressWarnings("checkstyle:designforextension")
    @Path("/greeting/{greeting}") <span class="conum" data-value="1" />
    @PUT <span class="conum" data-value="2" />
    @Produces(MediaType.APPLICATION_JSON) <span class="conum" data-value="3" />
    public JsonObject updateGreeting(@PathParam("greeting") String newGreeting) { <span class="conum" data-value="4" />
        greeting.setMessage(newGreeting);

        return Json.createObjectBuilder()
                .add("greeting", newGreeting)
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Identifies the path parameter for the new greeting text.</li>
<li data-value="2">It&#8217;s an HTTP <code>PUT</code>.</li>
<li data-value="3">Tells JAX-RS that this method both consumes and produces JSON.</li>
<li data-value="4">JAX-RS injects the new greeting from the path parameter as the method argument.</li>
</ul>
</li>
</ol>
</div>

<h4 id="_add_an_application_class">Add an <code>Application</code> class</h4>
<div class="section">
<p>JAX-RS looks for an <code>Application</code>. Create <code>GreetApplication.java</code>.
Add these imports:</p>

<markup
lang="java"

>import java.util.Set;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import io.helidon.common.CollectionsHelper;</markup>

<markup
lang="java"
title="GreetApplication.java"
>@ApplicationScoped <span class="conum" data-value="1" />
@ApplicationPath("/") <span class="conum" data-value="2" />
public class GreetApplication extends Application { <span class="conum" data-value="3" />

    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        return CollectionsHelper.setOf(
                GreetResource.class
        );
    }
}</markup>

<ul class="colist">
<li data-value="1">Have JAX-RS create only one instance of this class.</li>
<li data-value="2">No path prefix for this application.</li>
<li data-value="3">Class must extend <code>javax.ws.rs.core.Application</code>.</li>
</ul>
<p>The <code>getClasses</code> method reports the resource classes in the application. We will
add to this method later.</p>

</div>

<h4 id="_write_the_main_class">Write the <code>Main</code> class</h4>
<div class="section">
<p>Add these imports:</p>

<markup
lang="java"

>import java.io.IOException;
import java.util.logging.LogManager;
import io.helidon.microprofile.server.Server;</markup>

<ol style="margin-left: 15px;">
<li>
Add the <code>startServer</code> method
<markup
lang="java"

>    static Server startServer() {
        // Server will automatically pick up configuration from
        // microprofile-config.properties
        // and Application classes annotated as @ApplicationScoped
        return Server.create().start(); <span class="conum" data-value="1" />
    }</markup>

<ul class="colist">
<li data-value="1">Automatically reads server configuration from <code>microprofile-config.properties</code>
and then starts the reactive web server.</li>
</ul>
</li>
<li>
Write a method to initialize logging
<markup
lang="java"

>    private static void setupLogging() throws IOException {
        // load logging configuration
        LogManager.getLogManager().readConfiguration(
                Main.class.getResourceAsStream("/logging.properties")); <span class="conum" data-value="1" />
    }</markup>

<ul class="colist">
<li data-value="1">Loads logging config from <code>logging.properties</code></li>
</ul>
</li>
<li>
Add or modify the <code>main</code> method
<markup
lang="java"

>    public static void main(final String[] args) throws IOException {
        setupLogging();

        Server server = startServer();

        System.out.println("http://localhost:" + server.port() + "/greet");
    }</markup>

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


<h4 id="_add_a_new_jax_rs_resource_class">Add a new JAX-RS resource class</h4>
<div class="section">
<p>Create <code>HealthResource.java</code> to define the endpoints for checking if the service is
active and if it is ready.</p>

<p>Add these imports:</p>

<markup
lang="java"

>import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;</markup>

<ol style="margin-left: 15px;">
<li>
Declare the class with these annotations:
<markup
lang="java"

>@Path("/")
@RequestScoped
public class HealthResource {
}</markup>

</li>
<li>
Declare an injected instance field to refer to the greeting message resource. This
is the only input to the active check in our simple implementation.
<markup
lang="java"

>    @Inject <span class="conum" data-value="1" />
    private GreetingMessage greeting; <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Indicates that JAX-RS should inject the field.</li>
<li data-value="2">Because <code>GreetingMessage</code> is an application-scoped bean, JAX-RS will inject a
reference to the single instance every time it creates this request-scoped resource.</li>
</ul>
</li>
<li>
Add the <code>checkHealth</code> method which decides whether the greeting resource is active
(healthy) or not.
<markup
lang="java"

>    private String checkHealth(String greeting) {
        if (greeting == null || greeting.trim().length() == 0) {
            return "greeting is not set or is empty";
        }
        return null;
    }</markup>

</li>
<li>
Add the method to implement the <code>/alive</code> endpoint
<markup
lang="java"

>    @SuppressWarnings("checkstyle:designforextension")
    @Path("/alive") <span class="conum" data-value="1" />
    @GET <span class="conum" data-value="2" />
    public Response alive() {
        Response response;

        String greetResourceError = checkHealth(greeting.getMessage()); <span class="conum" data-value="3" />
        if (greetResourceError == null) {  <span class="conum" data-value="4" />
            response = Response.ok().build();
        } else {
            JsonObject returnObject = Json.createObjectBuilder()
                    .add("error", greetResourceError)
                    .build();
            response = Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(returnObject).build();
        }
        return response;
    }</markup>

<ul class="colist">
<li data-value="1">Implements the path <code>/alive</code>.</li>
<li data-value="2">It&#8217;s an HTTP <code>GET</code>.</li>
<li data-value="3">Gets a <code>String</code> describing why the resource should <em>not</em> be considered alive;
null if the resource is OK.</li>
<li data-value="4">Build the <code>Response</code> object for return accordingly.</li>
</ul>
</li>
<li>
Add the method to implement <code>/ready</code>
<markup
lang="java"

>    @SuppressWarnings("checkstyle:designforextension")
    @Path("/ready")
    @GET
    public Response ready() {
        return Response.ok().build();
    }</markup>

</li>
</ol>
</div>

<h4 id="_update_greetapplication">Update <code>GreetApplication</code></h4>
<div class="section">
<p>In the <code>getClasses</code> method add <code>HealthResource.class</code> to the arguments
passed to <code>CollectionsHelper.setOf</code>:</p>

<markup
lang="java"

>    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        return CollectionsHelper.setOf(
                GreetResource.class
                , HealthResource.class
        );
    }</markup>

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
            &lt;groupId&gt;io.helidon.microprofile.metrics&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile-metrics&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;</markup>

</li>
<li>
Annotate each method to be measured, in our case <code>getDefaultMessage</code>,
<code>getMessage</code>, and <code>updateGreeting</code>. (We annotate <code>updateGreeting</code> for simplicity
and so the metrics
reported here have the same values as for the Helidon SE RESTful web
service example. In a real application we might measure the <code>update</code> method separately
from the <code>get</code> methods.)
<p>Add these imports:</p>

<markup
lang="java"

>import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Counted;</markup>

<markup
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
</ul>
</li>
</ol>

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

>curl -X PUT http://localhost:8080/greet/greeting/Hola</markup>

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
<p>A <code>curl</code> to <code><a id=""
title=""
target="_blank"
href="http://localhost:8080/metrics">http://localhost:8080/metrics</a></code> lists not only our application-scoped
metric but all the <em>base</em> and <em>vendor</em> metrics as defined in the MP metrics spec.
For example, you will see a <code>vendor:requests_count</code>
counter. This will be larger than our counter because that counter also tracks
requests to the <code>/metrics</code> path itself; our <code>accessctr</code> counter tracks only requests to
our application endpoints.</p>

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
<code>cd</code> to the <code>examples/guides/mp-restful-webservice</code> directory.

</li>
<li>
Run:
<markup
lang="bash"

>mvn package
java -jar target/mp-restful-webservice.jar</markup>

</li>
</ol>
</div>
</div>
</doc-view>