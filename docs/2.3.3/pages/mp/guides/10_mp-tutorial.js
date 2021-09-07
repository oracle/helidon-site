<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Tutorial</dt>
<dd slot="desc"><p>This tutorial describes how to build a Helidon MicroProfile (MP) application from scratch
 including JSON REST endpoints, metrics, health check, and configuration.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What you need</h2>
<div class="section">

<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">About 30 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_create_the_maven_project">Create The Maven Project</h2>
<div class="section">
<p>This tutorial demonstrates how to create the application from scratch, without
 using the Maven archetypes as a quickstart.</p>

<p>Create a new empty directory for the project (for example, <code>helidon-mp-tutorial</code>).  Change into this directory.</p>

<p>Create a new Maven POM file (called <code>pom.xml</code>) and add the following
 content:</p>

<markup
lang="xml"
title="Initial Maven POM file"
>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;parent&gt; <span class="conum" data-value="1" />
        &lt;groupId&gt;io.helidon.applications&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-mp&lt;/artifactId&gt;
        &lt;version&gt;2.3.3&lt;/version&gt;
        &lt;relativePath/&gt;
    &lt;/parent&gt;

    &lt;groupId&gt;io.helidon.examples&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-mp-tutorial&lt;/artifactId&gt;  <span class="conum" data-value="2" />
    &lt;name&gt;${project.artifactId}&lt;/name&gt;

    &lt;properties&gt;
        &lt;mainClass&gt;io.helidon.examples.Main&lt;/mainClass&gt; <span class="conum" data-value="3" />
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.microprofile.bundles&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile&lt;/artifactId&gt; <span class="conum" data-value="4" />
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

    &lt;build&gt; <span class="conum" data-value="5" />
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-dependency-plugin&lt;/artifactId&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;id&gt;copy-libs&lt;/id&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.jboss.jandex&lt;/groupId&gt;
                &lt;artifactId&gt;jandex-maven-plugin&lt;/artifactId&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;id&gt;make-index&lt;/id&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;</markup>

<p>The POM file contains the basic project information and configurations
 needed to get started and does the following:</p>

<ul class="colist">
<li data-value="1">Includes the Helidon MP application parent pom. This parent pom
contains dependency and plugin management to keep your application&#8217;s
pom simple and clean.</li>
<li data-value="2">Establishes the Maven coordinates for the new project.</li>
<li data-value="3">Sets the <code>mainClass</code> which will be used later
when building a JAR file.  The class will be created later in this
tutorial.</li>
<li data-value="4">Adds a dependency for the MicroProfile bundle which allows the
use of MicroProfile features in the application. The helidon-mp
parent pom includes dependency management, so you don&#8217;t need to
include a version number here. You will automatically use the
version of Helidon that matches the version of the parent pom
({helidon.version} in this case).</li>
<li data-value="5">Adds plugins to be executed during the build. The <code>maven-dependency-plugin</code>
is used to copy the runtime dependencies into your target directory. The
<code>jandex-maven-plugin</code> builds an index of your class files for faster
loading. The Helidon parent pom handles the details of configuring
these plugins. But you can modify the configuration here.</li>
</ul>
<div class="admonition tip">
<p class="admonition-inline">MicroProfile contains features like Metrics, Health Check,
 Streams Operators, Open Tracing, OpenAPI, REST client, and fault
 tolerance. You can find detailed information about MicroProfile on the
 <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/technology.microprofile">Eclipse MicroProfile</a> site.</p>
</div>
<p>With this <code>pom.xml</code>, the application can be built successfully with Maven:</p>

<markup
lang="bash"

>mvn clean package</markup>

<p>This will create a JAR file in the <code>target</code> directory.</p>

<div class="admonition tip">
<p class="admonition-inline">The warning message <code>JAR will be empty - no content was marked for inclusion!</code>
 can be ignored for now  because there is no actual content in the
 application yet.</p>
</div>
</div>

<h2 id="_start_implementing_the_microprofile_application">Start implementing the MicroProfile application</h2>
<div class="section">
<p>The actual application logic can be created now.
Create a directory for your source code, and then create
directories for the package hierarchy:</p>

<markup
lang="bash"
title="Create directories for source code"
>mkdir -p src/main/java/io/helidon/examples</markup>

<p>The application will be a simple REST service that will return a
greeting to the caller.  The first iteration of the application will
contain a resource class and a Main class which will be used to
start up the Helidon server and the application.</p>

<div class="admonition tip">
<p class="admonition-inline">Technically, your own main class is not needed unless you want to control
the startup sequence. You can set the <code>mainClass</code> property to
<code>io.helidon.microprofile.cdi.Main</code> and it will use Helidon&#8217;s default
main class.</p>
</div>
<p>The <code>GreetResource</code> is defined in the <code>GreetResource.java</code> class as shown
below:</p>

<markup
lang="java"
title="src/main/java/io/helidon/examples/GreetResource.java"
>package io.helidon.examples;

import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collections;

@Path("/greet") <span class="conum" data-value="1" />
@RequestScoped <span class="conum" data-value="2" />
public class GreetResource {

    private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getDefaultMessage() { <span class="conum" data-value="3" />
        return JSON.createObjectBuilder()
                .add("message", "Hello World")
                .build(); <span class="conum" data-value="4" />
    }

}</markup>

<ul class="colist">
<li data-value="1">This class is annotated with <code>Path</code> which sets the path for this resource
as <code>/greet</code>.</li>
<li data-value="2">The <code>RequestScoped</code> annotation defines that this bean is
 request scoped.  The request scope is active only for the duration of
 one web service invocation and it is destroyed at the end of that
 invocation. You can learn more about scopes and contexts, and how they are used
from the <a id="" title="" target="_blank" href="https://docs.jboss.org/cdi/api/2.0/index.html">Specification</a>.</li>
<li data-value="3">A <code>public JsonObject getDefaultMessage()</code> method is defined
which is annotated with <code>GET</code>, meaning it will accept the HTTP GET method.
It is also annotated with <code>Produces(MediaType.APPLICATION_JSON)</code> which
declares that this method will return JSON data.</li>
<li data-value="4">The method body creates
a JSON object containing a single object named "message" with the content
"Hello World".  This method will be expanded and improved
later in the tutorial.</li>
</ul>
<div class="admonition tip">
<p class="admonition-inline">So far this is just a JAX-RS application, with no Helidon or MicroProfile
 specific code in it.  There are many JAX-RS tutorials available if you
 want to learn more about this kind of application.</p>
</div>
<p>A main class is also required to start up the server and run the
application. If you don&#8217;t use Helidon&#8217;s built-in main class you can
define your own:</p>

<markup
lang="java"
title="src/main/java/io/helidon/examples/Main.java"
>package io.helidon.examples;

import io.helidon.microprofile.server.Server;
import java.io.IOException;

public final class Main {

    private Main() { } <span class="conum" data-value="1" />

    public static void main(final String[] args) throws IOException {
        Server server = startServer();
        System.out.println("http://localhost:" + server.port() + "/greet");
    }

    static Server startServer() {
        return Server.create().start(); <span class="conum" data-value="2" />
    }

}</markup>

<p>In this class, a <code>main</code> method is defined which starts the Helidon MP
 server and prints out a message with the listen address.</p>

<ul class="colist">
<li data-value="1">Notice that
this class has an empty no-args constructor to make sure this class
cannot be instantiated.</li>
<li data-value="2">The MicroProfile server is started with the default configuration.</li>
</ul>
<p>Helidon MP applications also require a <code>beans.xml</code> resource file to
 tell Helidon to use the annotations discussed above to discover Java
 beans in the application.</p>

<p>Create a <code>beans.xml</code> in the <code>src/main/resources/META-INF</code> directory
 with the following content:</p>

<markup
lang="xml"
title="src/main/resources/META-INF/beans.xml"
>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                           http://xmlns.jcp.org/xml/ns/javaee/beans_2_0.xsd"
       version="2.0"
       bean-discovery-mode="annotated"&gt; <span class="conum" data-value="1" />
&lt;/beans&gt;</markup>

<ul class="colist">
<li data-value="1">The <code>bean-discovery-mode</code> tells Helidon to look for the annotations
to discover Java beans in the application.</li>
</ul>
</div>

<h2 id="_build_the_application">Build the application</h2>
<div class="section">
<p>Helidon MP applications are packaged into a JAR file and the dependencies
 are copied into a <code>libs</code> directory.</p>

<pre>You can now build the application.</pre>
<markup
lang="bash"
title="Build the Application"
>mvn package</markup>

<p>This will build the application jar and save all runtime
dependencies in the <code>target/libs</code> directory. This means you can easily start the
 application by running the application jar file:</p>

<markup
lang="bash"
title="Run the application"
>java -jar target/helidon-mp-tutorial.jar</markup>

<p>At this stage, the application is a very simple "Hello World" greeting service.
 It supports a single GET request for generating a greeting message.
 The response is encoded using JSON.
 For example:</p>

<markup
lang="bash"
title="Try the Application"
>curl -X GET http://localhost:7001/greet
{"message":"Hello World!"}</markup>

<p>In the output you can see the JSON output from the <code>getDefaultMessage()</code>
 method that was discussed earlier.  The server has used a default port
 <code>7001</code>.  The application can be stopped cleanly by pressing Ctrl+C.</p>

</div>

<h2 id="_configuration">Configuration</h2>
<div class="section">
<p>Helidon MP applications can use the <code>META-INF/microprofile-config.properties</code>
 file to specify configuration data.  This file (resource) is read by default
 if it is present on the classpath. Create this file in
 <code>src/main/resources/META-INF</code> with the following content:</p>

<markup
lang="bash"
title="Initial microprofile-config.properties"
># Microprofile server properties
server.port=8080
server.host=0.0.0.0</markup>

<p>Rebuild the application and run it again.  Notice that it now uses port
 8080 as specified in the configuration file.</p>

<div class="admonition tip">
<p class="admonition-inline">You can learn more about options for configuring the Helidon Server on the
 <router-link to="/mp/jaxrs/02_server-configuration">Configuring the Server</router-link> page.</p>
</div>
<p>In addition to predefined server properties, application-specific
 configuration information can be added to this file.  Add the <code>app.greeting</code>
 property to the file as shown below. This property will be used to set the
 content of greeting message.</p>

<markup
lang="bash"
title="Updated META-INF/microprofile-config.properties"
># Microprofile server properties
server.port=8080
server.host=0.0.0.0

# Application properties
app.greeting=Hello</markup>

<p>Add a new "provider" class to read this property and make it available
 to the application.  The class will be called <code>GreetingProvider.java</code>
 and have the following content:</p>

<markup
lang="java"
title="src/main/java/io/helidon/examples/GreetingProvider.java"
>package io.helidon.examples;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.concurrent.atomic.AtomicReference;

@ApplicationScoped <span class="conum" data-value="1" />
public class GreetingProvider {
  private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;(); <span class="conum" data-value="2" />

  @Inject <span class="conum" data-value="3" />
  public GreetingProvider(@ConfigProperty(name = "app.greeting") String message) {
    this.message.set(message);
  }

  String getMessage() {
    return message.get();
  }

  void setMessage(String message) {
    this.message.set(message);
  }
}</markup>

<ul class="colist">
<li data-value="1">This class also has the <code>ApplicationScoped</code> annotation, so it will persist
for the life of the application.</li>
<li data-value="2">The class contains an <code>AtomicReference</code>
to a <code>String</code> where the greeting will be stored.  The <code>AtomicReference</code>
provides lock-free thread-safe access to the underlying <code>String</code>.</li>
<li data-value="3">The <code>public GreetingProvider(&#8230;&#8203;)</code> constructor is annotated with <code>Inject</code>
which tells Helidon to use Contexts and Dependency Injection to provide
the needed values.  In this case, the <code>String message</code> is annotated with
<code>ConfigProperty(name = "app.greeting")</code> so Helidon will inject the
property from the configuration file with the key <code>app.greeting</code>.
This method demonstrates how to read configuration information into
the application.  A getter and setter are also included in this class.</li>
</ul>
<p>The <code>GreetResource</code> must be updated to use this value instead of the
 hard coded response.  Make the following updates to that class:</p>

<markup
lang="java"
title="Updated GreetResource class"
>package io.helidon.examples;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collections;

@Path("/greet")
@RequestScoped
public class GreetResource {

    private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
    private final GreetingProvider greetingProvider;

    @Inject <span class="conum" data-value="1" />
    public GreetResource(GreetingProvider greetingConfig) {
        this.greetingProvider = greetingConfig;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getDefaultMessage() {
        return createResponse("World"); <span class="conum" data-value="2" />
    }

    private JsonObject createResponse(String who) { <span class="conum" data-value="3" />
        String msg = String.format("%s %s!", greetingProvider.getMessage(), who);

        return JSON.createObjectBuilder()
                .add("message", msg)
                .build();
    }

}</markup>

<ul class="colist">
<li data-value="1">This updated class adds a <code>GreetingProvider</code> and uses constructor injection
to get the value from the configuration file.</li>
<li data-value="2">The logic to create the
response message is refactored into a <code>createResponse</code> method and the
<code>getDefaultMessage()</code> method is updated to use this new method.</li>
<li data-value="3">In <code>createResponse()</code> the message is obtained from the <code>GreetingProvider</code>
which in turn got it from the configuration files.</li>
</ul>
<p>Rebuild and run the application. Notice that it now uses the greeting
 from the configuration file.  Change the configuration file and restart
 the application, notice that it uses the changed value.</p>

<div class="admonition tip">
<p class="admonition-inline">To learn more about Helidon MP configuration please see the
 <router-link to="/mp/config/01_introduction">Config</router-link> section of the documentation.</p>
</div>
</div>

<h2 id="_extending_the_application">Extending the application</h2>
<div class="section">
<p>In this section, the application will be extended to add a PUT
 resource method which will allow users to update the greeting and a
 second GET resource method which will accept a parameter.</p>

<p>Here are the two new methods to add to <code>GreetResource.java</code>:</p>

<markup
lang="java"
title="New methods for GreetResource.java"
>import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

    // some lines omitted

    @Path("/{name}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getMessage(@PathParam("name") String name) { <span class="conum" data-value="1" />
        return createResponse(name);
    }

    @Path("/greeting")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateGreeting(JsonObject jsonObject) { <span class="conum" data-value="2" />

        if (!jsonObject.containsKey("greeting")) {
            JsonObject entity = JSON.createObjectBuilder()
                    .add("error", "No greeting provided")
                    .build();
            return Response.status(Response.Status.BAD_REQUEST).entity(entity).build();
        }

        String newGreeting = jsonObject.getString("greeting");

        greetingProvider.setMessage(newGreeting);
        return Response.status(Response.Status.NO_CONTENT).build();
    }</markup>

<ul class="colist">
<li data-value="1">The first of these two methods implements a new HTTP GET service
that returns JSON and it has a path parameter.  The <code>Path</code> annotation
defines the next part of the path to be a parameter named <code>name</code>.
In the method arguments the <code>PathParam("name")</code> annotation on
<code>String name</code> has the effect of passing the parameter from the
URL into this method as <code>name</code>.</li>
<li data-value="2">The second method implements a new HTTP PUT service which produces
and consumes JSON, note the <code>Consumes</code> and <code>PUT</code> annotations.
It also defines a path of "/greeting".  Notice that the method
argument is a <code>JsonObject</code>. Inside the method body there is code
to check for the expected JSON, extract the value and update the
message in the <code>GreetingProvider</code>.</li>
</ul>
<p>Rebuild and run the application.  Test the new services using curl
 commands similar to those shown below:</p>

<markup
lang="bash"
title="Testing the new services"
>curl -X GET http://localhost:8080/greet
{"message":"Hello World!"}

curl -X GET http://localhost:8080/greet/Joe
{"message":"Hello Joe!"}

curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}' http://localhost:8080/greet/greeting

curl -X GET http://localhost:8080/greet/Jose
{"message":"Hola Jose!"}</markup>

<p>Helidon MP provides many other features which can be added to the application.</p>

</div>

<h2 id="_logging">Logging</h2>
<div class="section">
<p>The application logging can be customized.  The default logging provider
 is <code>java.util.logging</code>, however it is possible to use other providers.
 In this tutorial the default provider is used.</p>

<p>Create a <code>logging.properties</code> file in <code>src/main/resources</code> with
 the following content:</p>

<markup
lang="properties"
title="Example logging.properties file"
># Send messages to the console
handlers=io.helidon.common.HelidonConsoleHandler <span class="conum" data-value="1" />

# HelidonConsoleHandler uses a SimpleFormatter subclass that replaces "!thread!" with the current thread
java.util.logging.SimpleFormatter.format=%1$tY.%1$tm.%1$td %1$tH:%1$tM:%1$tS %4$s %3$s !thread!: %5$s%6$s%n <span class="conum" data-value="2" />

# Global logging level. Can be overridden by specific loggers
.level=INFO <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">The Helidon console logging handler is configured. This handler writes to <code>System.out</code>, does not filter by level
and uses a custom <code>SimpleFormatter</code> that supports thread names.</li>
<li data-value="2">The format string is set using the standard options to include the timestamp,
thread name and message.</li>
<li data-value="3">The global logging level is set to <code>INFO</code>.</li>
</ul>
<p>The Helidon MicroProfile server will detect the new <code>logging.properties</code> file and configure
the LogManager for you.</p>

<p>Rebuild and run the application and notice the new logging format takes effect.</p>

<markup
lang="bash"
title="Log output"
>// before
Aug 22, 2019 11:10:11 AM io.helidon.webserver.NettyWebServer lambda$start$8
INFO: Channel '@default' started: [id: 0xd0afba31, L:/0:0:0:0:0:0:0:0:8080]
Aug 22, 2019 11:10:11 AM io.helidon.microprofile.server.ServerImpl lambda$start$10
INFO: Server started on http://localhost:8080 (and all other host addresses) in 182 milliseconds.
http://localhost:8080/greet

// after
2019.08.22 11:24:42 INFO io.helidon.webserver.NettyWebServer Thread[main,5,main]: Version: 1.2.0
2019.08.22 11:24:42 INFO io.helidon.webserver.NettyWebServer Thread[nioEventLoopGroup-2-1,10,main]: Channel '@default' started: [id: 0x8f652dfe, L:/0:0:0:0:0:0:0:0:8080]
2019.08.22 11:24:42 INFO io.helidon.microprofile.server.ServerImpl Thread[nioEventLoopGroup-2-1,10,main]: Server started on http://localhost:8080 (and all other host addresses) in 237 milliseconds.
http://localhost:8080/greet</markup>

</div>

<h2 id="_metrics">Metrics</h2>
<div class="section">
<p>Helidon provides built-in support for metrics endpoints.</p>

<markup
lang="bash"
title="Metrics in Prometheus Format"
>curl -s -X GET http://localhost:8080/metrics</markup>

<markup
lang="bash"
title="Metrics in JSON Format"
>curl -H 'Accept: application/json' -X GET http://localhost:8080/metrics</markup>

<p>It is possible to disable metrics by adding properties to the
<code>microprofile-config.properties</code> file, for example:</p>

<markup
lang="bash"
title="Disable a metric"
>metrics.base.classloader.currentLoadedClass.count.enabled=false</markup>

<p>Call the metrics endpoint before adding this change to confirm that the metric
is included, then add the property to disable the metric, rebuild and restart
the application and check again:</p>

<markup
lang="bash"
title="Checking metrics before and after disabling the metric"
># before
curl -s http://localhost:8080/metrics | grep classloader_current
# TYPE base:classloader_current_loaded_class_count counter
# HELP base:classloader_current_loaded_class_count Displays the number of classes that are currently loaded in the Java virtual machine.
base:classloader_current_loaded_class_count 7936

# after
curl -s http://localhost:8080/metrics | grep classloader_current
# (no output)</markup>

<p>Helidon also support custom metrics.  To add a new metric, annotate the
 JAX-RS resource with one of the metric annotations as shown in the example
 below:</p>

<div class="admonition tip">
<p class="admonition-inline">You can find details of the available annotations in the
 <a id="" title="" target="_blank" href="https://microprofile.io/project/eclipse/microprofile-metrics">MicroProfile Metrics
Specification</a>.</p>
</div>
<markup
lang="java"
title="Updated GreetResource.java with custom metrics"
>import org.eclipse.microprofile.metrics.annotation.Timed;

    // some lines omitted

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Timed <span class="conum" data-value="1" />
    public JsonObject getDefaultMessage() {
        return createResponse("World");
    }</markup>

<ul class="colist">
<li data-value="1">The <code>Timed</code> annotation is added to the <code>getDefaultMessage()</code> method.</li>
</ul>
<p>Rebuild and run the application.  Make some calls to the endpoint
 (<a id="" title="" target="_blank" href="http://localhost:8080/greet">http://localhost:8080/greet</a>) so there will be some data to report.
 Then obtain the application metrics as follows:</p>

<markup
lang="bash"
title="Checking the application metrics"
>curl -H "Accept: application/json" http://localhost:8080/metrics/application
{
  "io.helidon.examples.GreetResource.getDefaultMessage": {
    "count": 2,
    "meanRate": 0.036565171873527716,
    "oneMinRate": 0.015991117074135343,
    "fiveMinRate": 0.0033057092356765017,
    "fifteenMinRate": 0.0011080303990206543,
    "min": 78658,
    "max": 1614077,
    "mean": 811843.8728029992,
    "stddev": 766932.8494434259,
    "p50": 78658,
    "p75": 1614077,
    "p95": 1614077,
    "p98": 1614077,
    "p99": 1614077,
    "p999": 1614077
  }
}</markup>

<p>Learn more about using Helidon and MicroProfile metrics in the <router-link to="/mp/guides/05_metrics">Metrics Guide</router-link>.</p>

</div>

<h2 id="_health_check">Health Check</h2>
<div class="section">
<p>Helidon provides built-in support for health check endpoints.  Obtain
 the built-in health check using the following URL:</p>

<markup
lang="bash"
title="Health check"
>curl -s -X GET http://localhost:8080/health
{
  "outcome": "UP",
  "status": "UP",
  "checks": [
    {
      "name": "deadlock",
      "state": "UP",
      "status": "UP"
    },
    {
      "name": "diskSpace",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "381.23 GB",
        "freeBytes": 409340088320,
        "percentFree": "43.39%",
        "total": "878.70 GB",
        "totalBytes": 943491723264
      }
    },
    {
      "name": "heapMemory",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "324.90 MB",
        "freeBytes": 340682920,
        "max": "3.46 GB",
        "maxBytes": 3715629056,
        "percentFree": "97.65%",
        "total": "408.00 MB",
        "totalBytes": 427819008
      }
    }
  ]
}</markup>

<p>Endpoints for readiness and liveness checks are also provided by default.
 Obtain the default results using these URLs, which return the same result as the previous example.:</p>

<markup
lang="bash"
title="Default readiness and liveness endpoints"
># readiness
curl -i  -X GET http://localhost:8080/health/ready

# liveness
curl -i  -X GET http://localhost:8080/health/live</markup>

<p>Helidon allows the addition of custom health checks to applications.
 Create a new class <code>GreetHealthcheck.java</code> with the following content:</p>

<markup
lang="java"
title="src/main/java/io/helidon/examples/GreetHealthcheck.java"
>package io.helidon.examples;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;

@Liveness <span class="conum" data-value="1" />
@ApplicationScoped <span class="conum" data-value="2" />
public class GreetHealthcheck implements HealthCheck {
  private GreetingProvider provider;

  @Inject <span class="conum" data-value="3" />
  public GreetHealthcheck(GreetingProvider provider) {
    this.provider = provider;
  }

  @Override
  public HealthCheckResponse call() { <span class="conum" data-value="4" />
    String message = provider.getMessage();
    return HealthCheckResponse.named("greeting") <span class="conum" data-value="5" />
        .state("Hello".equals(message))
        .withData("greeting", message)
        .build();
  }
}</markup>

<ul class="colist">
<li data-value="1">This class has the MicroProfile <code>Liveness</code> annotation which tells
Helidon that this class provides a custom health check.  You can
learn more about the available annotations in the <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-health/blob/master/spec/src/main/asciidoc/protocol-wireformat.adoc">MicroProfile Health Protocol and Wireformat</a> document.</li>
<li data-value="2">This class also has the <code>ApplicationScoped</code> annotation, as seen previously.</li>
<li data-value="3">The <code>GreetingProvider</code> is injected using Context and Dependency
Injection.  This example will use the greeting to determine whether
the application is healthy, this is a contrived example for demonstration
purposes.</li>
<li data-value="4">Health checks must implement the <code>HealthCheck</code> functional interface, which
includes the method <code>HealthCheckResponse call()</code>.  Helidon will invoke the
<code>call()</code> method to verify the healthiness of the application.</li>
<li data-value="5">In this example, the application is deemed to be healthy if the
<code>GreetingProvider,getMessage()</code> method returns the string <code>"Hello"</code>
and unhealthy otherwise.</li>
</ul>
<p>Rebuild the application, make sure that the <code>mp.conf</code> has the <code>greeting</code> set
 to something other than <code>"Hello"</code> and then run the application and check
 the health:</p>

<markup
lang="bash"
title="Custom health check reporting unhealthy state"
>curl -i -X GET http://localhost:8080/health/live
HTTP/1.1 503 Service Unavailable <span class="conum" data-value="1" />
Content-Type: application/json
Date: Fri, 23 Aug 2019 10:07:23 -0400
transfer-encoding: chunked
connection: keep-alive

{"outcome":"DOWN","status":"DOWN","checks":[{"name":"deadlock","state":"UP","status":"UP"},{"name":"diskSpace","state":"UP","status":"UP","data":{"free":"381.08 GB","freeBytes":409182306304,"percentFree":"43.37%","total":"878.70 GB","totalBytes":943491723264}},{"name":"greeting","state":"DOWN","status":"DOWN","data":{"greeting":"Hey"}},{"name":"heapMemory","state":"UP","status":"UP","data":{"free":"243.81 MB","freeBytes":255651048,"max":"3.46 GB","maxBytes":3715629056,"percentFree":"98.58%","total":"294.00 MB","totalBytes":308281344}}]} <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The HTTP return code is now 503 Service Unavailable.</li>
<li data-value="2">The status is reported as "DOWN" and the custom check is included in
the output.</li>
</ul>
<p>Now update the greeting to <code>"Hello"</code> using the following request, and then
 check health again:</p>

<markup
lang="bash"
title="Update the greeting and check health again"
># update greeting
curl -i -X PUT -H "Content-Type: application/json" -d '{"greeting": "Hello"}' http://localhost:8080/greet/greeting
HTTP/1.1 204 No Content <span class="conum" data-value="1" />
Date: Thu, 22 Aug 2019 13:29:57 -0400
connection: keep-alive

# check health
curl -i -X GET http://localhost:8080/health/live
HTTP/1.1 200 OK <span class="conum" data-value="2" />
Content-Type: application/json
Date: Fri, 23 Aug 2019 10:08:09 -0400
connection: keep-alive
content-length: 536

{"outcome":"UP","status":"UP","checks":[{"name":"deadlock","state":"UP","status":"UP"},{"name":"diskSpace","state":"UP","status":"UP","data":{"free":"381.08 GB","freeBytes":409179811840,"percentFree":"43.37%","total":"878.70 GB","totalBytes":943491723264}},{"name":"greeting","state":"UP","status":"UP","data":{"greeting":"Hello"}},{"name":"heapMemory","state":"UP","status":"UP","data":{"free":"237.25 MB","freeBytes":248769720,"max":"3.46 GB","maxBytes":3715629056,"percentFree":"98.40%","total":"294.00 MB","totalBytes":308281344}}]} <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">The PUT returns a HTTP 204.</li>
<li data-value="2">The health check now returns a HTTP 200.</li>
<li data-value="3">The status is now reported as "UP" and the details are provided in the
checks.</li>
</ul>
<p>Learn more about health checks in the <router-link to="/mp/guides/04_health">Health Check Guide</router-link>.</p>

</div>

<h2 id="_build_a_docker_image">Build a Docker Image</h2>
<div class="section">
<p>To run the application in Docker (or Kubernetes), a <code>Dockerfile</code> is needed
 to build a Docker image. To build the Docker image, you need to have Docker installed and running on your system.</p>

<p>Add a new <code>Dockerfile</code> in the project root directory with the following content:</p>

<markup
lang="bash"
title="Dockerfile content"
>FROM maven:3.6-jdk-11 as build <span class="conum" data-value="1" />
WORKDIR /helidon

ADD pom.xml .
RUN mvn package -DskipTests <span class="conum" data-value="2" />

ADD src src
RUN mvn package -DskipTests <span class="conum" data-value="3" />
RUN echo "done!"

FROM openjdk:11-jre-slim <span class="conum" data-value="4" />
WORKDIR /helidon

COPY --from=build /helidon/target/helidon-mp-tutorial.jar ./ <span class="conum" data-value="5" />
COPY --from=build /helidon/target/libs ./libs

CMD ["java", "-jar", "helidon-mp-tutorial.jar"] <span class="conum" data-value="6" />
EXPOSE 8080</markup>

<ul class="colist">
<li data-value="1">This Dockerfile uses Docker&#8217;s multi-stage build feature.  The <code>FROM</code>
keyword creates the first stage.  In this stage, the base container has
the build tools needed to build the application.  These are not required
to run the application, so the second stage uses a smaller container.</li>
<li data-value="2">Add the <code>pom.xml</code> and running an "empty" maven build will download
all of the dependencies and plugins in this layer.  This will make future
builds faster because they will use this cached layer rather than downloading
everything again.</li>
<li data-value="3">Add the source code and do the real build.</li>
<li data-value="4">Start a second stage using a much smaller runtime image.</li>
<li data-value="5">Copy the binary and libraries from the first stage.</li>
<li data-value="6">Set the initial command and expose port 8080.</li>
</ul>
<p>To create the Docker image, use the following command:</p>

<markup
lang="bash"
title="Docker build"
>docker build -t helidon-mp-tutorial .</markup>

<p>Make sure the application is shutdown if it was still running
 locally so that port 8080 will not be in use, then start the application
 in Docker using the following command:</p>

<markup
lang="bash"
title="Run Docker Image"
>docker run --rm -p 8080:8080 helidon-mp-tutorial:latest</markup>

<p>Try the application as before.</p>

<markup
lang="bash"
title="Try the application"
>curl http://localhost:8080/greet/bob
{"message":"Howdee bob!"}

curl http://localhost:8080/health/ready
{"outcome":"UP","status":"UP","checks":[]}</markup>

</div>

<h2 id="_deploy_the_application_to_kubernetes">Deploy the application to Kubernetes</h2>
<div class="section">
<p>If you don&#8217;t have access to a Kubernetes cluster, you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>.
Then deploy the example:</p>

<markup
lang="bash"
title="Verify connectivity to cluster"
>kubectl cluster-info
kubectl get nodes</markup>

<p>To deploy the application to Kubernetes, a Kubernetes YAML file that
 defines the deployment and associated resources is needed.  In this
 case all that is required is the deployment and a service.</p>

<p>Create a file called <code>app.yaml</code> in the project&#8217;s root directory with
 the following content:</p>

<markup
lang="yaml"
title="Kubernetes YAML file"
>---
kind: Service <span class="conum" data-value="1" />
apiVersion: v1
metadata:
  name: helidon-mp-tutorial
  labels:
    app: helidon-mp-tutorial
spec:
  type: NodePort <span class="conum" data-value="2" />
  selector:
    app: helidon-mp-tutorial
  ports:
    - port: 8080
      targetPort: 8080
      name: http
---
kind: Deployment <span class="conum" data-value="3" />
apiVersion: apps/v1
metadata:
  name: helidon-mp-tutorial
spec:
  replicas: 1 <span class="conum" data-value="4" />
  selector:
    matchLabels:
      app: helidon-mp-tutorial
  template:
    metadata:
      labels:
        app: helidon-mp-tutorial
        version: v1
    spec:
      containers:
        - name: helidon-mp-tutorial
          image: helidon-mp-tutorial <span class="conum" data-value="5" />
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080</markup>

<ul class="colist">
<li data-value="1">Define a Service to provide access to the application.</li>
<li data-value="2">Define a NodePort to expose the application outside the Kubernetes
cluster.</li>
<li data-value="3">Define a Deployment of the application.</li>
<li data-value="4">Define how many replicas of the application to run.</li>
<li data-value="5">Define the Docker image to use - this must be the one that was built
in the previous step.  If the image was built on a different machine to the
one where Kubernetes is running, or if Kubernetes is running on multiple
machines (worker nodes) then the image must either be manually copied to
each node or otherwise pushed to a Docker registry that is accessible to
the worker nodes.</li>
</ul>
<p>This Kubernetes YAML file can be used to deploy the application to Kubernetes:</p>

<markup
lang="bash"
title="Deploy the application to Kubernetes"
>kubectl create -f app.yaml
kubectl get pods                    # Wait for quickstart pod to be RUNNING</markup>

<div class="admonition tip">
<p class="admonition-inline">Remember, if Kubernetes is running on a different machine, or inside
 a VM (as in Docker for Desktop) then the Docker image must either be manually
 copied to the Kubernetes worker nodes or pushed to a Docker registry that
 is accessible to those worker nodes.  Update the <code>image</code> entry in the
 example above to include the Docker registry name.  If the registry is
 private a Docker registry secret will also be required.</p>
</div>
<p>The step above created a service that is exposed using any available node
 port. Kubernetes allocates a free port. Lookup the service to find the port.</p>

<markup
lang="bash"
title="Lookup the service"
>kubectl get service helidon-mp-tutorial</markup>

<p>Note the PORTs. The application can be exercised as before but use
 the second port number (the NodePort) instead of 8080. For example:</p>

<markup
lang="bash"
title="Access the application"
>curl -X GET http://localhost:31431/greet</markup>

<p>If desired, the Kubernetes YAML file can also be used to remove the
 application from Kubernetes as follows:</p>

<markup
lang="bash"
title="Remove the application from Kubernetes"
>kubectl delete -f app.yaml</markup>

</div>

<h2 id="_conclusion">Conclusion</h2>
<div class="section">
<p>This concludes the tutorial.  The tutorial has demonstrated how to build
 a Helidon MP application from scratch, how to use Helidon and MicroProfile
 configuration, logging, metrics, and health checks.  It also demonstrated
 how to package the application in a Docker image and run it in Kubernetes.</p>

<p>There were several links to more detailed information included in the
 tutorial.  These links are repeated below and can be explored to learn
 more details about Helidon application development.</p>

</div>

<h2 id="_related_links">Related links</h2>
<div class="section">
<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/technology.microprofile">Eclipse MicroProfile</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://docs.jboss.org/cdi/api/2.0/index.html">Contexts and Dependency Injection Specification</a></p>

</li>
<li>
<p><router-link to="/mp/jaxrs/02_server-configuration">Configuring the Server</router-link></p>

</li>
<li>
<p><router-link to="/mp/config/01_introduction">Config</router-link></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://microprofile.io/project/eclipse/microprofile-metrics">MicroProfile Metrics Specification</a></p>

</li>
<li>
<p><router-link to="/mp/guides/05_metrics">Metrics Guide</router-link></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-health/blob/master/spec/src/main/asciidoc/protocol-wireformat.adoc">MicroProfile Health Protocol and Wireformat</a></p>

</li>
<li>
<p><router-link to="/about/05_kubernetes">Install Kubernetes on your desktop</router-link></p>

</li>
</ul>
</div>
</doc-view>