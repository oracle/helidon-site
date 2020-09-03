<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Tracing Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample MicroProfile (MP) project
that can be used to run some basic examples using tracing with Helidon MP.</p>
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

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>Distributed tracing is a critical feature of micro-service based applications, since it traces workflow both
within a service and across multiple services.  This provides insight to sequence and timing data for specific blocks of work,
which helps you identify performance and operational issues.  Helidon MP includes support for distributed tracing
through the <a id="" title="" target="_blank" href="https://opentracing.io">OpenTracing API</a>.  Tracing is integrated with WebServer, gRPC Server,
and Security using either the <a id="" title="" target="_blank" href="https://zipkin.io">Zipkin</a> or <a id="" title="" target="_blank" href="https://www.jaegertracing.io">Jaeger</a> tracers.</p>


<h3 id="_tracing_concepts">Tracing concepts</h3>
<div class="section">
<p>This section explains a few concepts that you need to understand before you get started with tracing.
In the context of this document, a service is synonymous with an application.
A <em>span</em> is the basic unit of work done within a single service, on a single host.
Every span has a name, starting timestamp, and duration.  For example, the work done by a REST endpoint is a span.
A span is associated to a single service, but its descendants can belong to different services and hosts.
A <em>trace</em> contains a collection of spans from one or more services, running on one or more hosts. For example,
if you trace a service endpoint that calls another service, then the trace would contain spans from both services.
Within a trace, spans are organized as a directed acyclic graph (DAG) and
can belong to multiple services, running on multiple hosts.  The <em>OpenTracing Data Model</em> describes the details
at <a id="" title="" target="_blank" href="https://opentracing.io/specification">The OpenTracing Semantic Specification</a>.
Spans are automatically created by Helidon as needed during execution of the REST request.</p>

</div>
</div>

<h2 id="_getting_started_with_tracing">Getting started with tracing</h2>
<div class="section">
<p>The examples in this guide demonstrate how to integrate tracing with helidon, how to view traces, how to trace
across multiple services, and how to integrate with tracing with Kubernetes.  All examples use Zipkin and traces
will be viewed using both the Zipkin API and UI.</p>


<h3 id="_create_a_sample_helidon_mp_project">Create a sample Helidon MP project</h3>
<div class="section">
<p>Use the Helidon MP Maven archetype to create a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype:"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.0.2 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<markup
lang="bash"
title="The project will be built and run from the <code>helidon-quickstart-mp</code> directory:"
>cd helidon-quickstart-mp</markup>

</div>

<h3 id="_setup_zipkin">Setup Zipkin</h3>
<div class="section">
<p>First, you need to run the Zipkin tracer.  Helidon will communicate with this tracer at runtime.</p>

<markup
lang="bash"
title="Run Zipkin within a docker container, then check the Zipkin server health:"
>docker run -d --name zipkin -p 9411:9411 openzipkin/zipkin  <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Run the Zipkin docker image named <code>openzipkin/zipkin</code>.</li>
</ul>
<markup
lang="bash"
title="Check the Zipkin server health:"
>curl http://localhost:9411/health <span class="conum" data-value="1" />
...
{
  "status": "UP", <span class="conum" data-value="2" />
  "zipkin": {
    "status": "UP",
    "details": {
      "InMemoryStorage{}": {
        "status": "UP"
      }
    }
  }
}</markup>

<ul class="colist">
<li data-value="1">Invoke the Zipkin REST API to check the Zipkin server health.</li>
<li data-value="2">All <code>status</code> fields should be <code>UP</code>.</li>
</ul>
</div>

<h3 id="_enable_tracing_in_your_helidon_application">Enable Tracing in your Helidon application</h3>
<div class="section">
<p>Update the pom.xml file and add the following Zipkin dependency to the <code>&lt;dependencies&gt;</code>
section (<strong>not</strong> <code>&lt;dependencyManagement&gt;</code>).  This will enable Helidon to use Zipkin at the
default host and port, <code>localhost:9411</code>.</p>

<markup
lang="xml"
title="Add the following dependency to <code>pom.xml</code>:"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-tracing-zipkin&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>All spans sent by Helidon to Zipkin need to be associated with a service.  Specify the service name below.</p>

<markup
lang="bash"
title="Add the following line to <code>META-INF/microprofile-config.properties</code>:"
>tracing.service=helidon-mp-1</markup>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-mp.jar</markup>

<markup
lang="bash"
title="Run the curl command in a new terminal window and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "Hello World!"
}</markup>

</div>

<h3 id="_viewing_tracing_using_zipkin_rest_api">Viewing tracing using Zipkin REST API</h3>
<div class="section">
<p>Because you had tracing enabled, the previous <code>/greet</code> endpoint invocation resulted in a new trace being created.
Let&#8217;s get the trace data that was generated using the Zipkin API.  First, get the service information.</p>

<div class="admonition note">
<p class="admonition-inline">Helidon automatically enables tracing for JAX-RS resources methods so you don&#8217;t need to use annotations with JAX-RS.
See <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-opentracing/releases/tag/1.3">MicroProfile OpenTracing</a> for more details.</p>
</div>
<markup
lang="bash"
title="Run the curl command and check the response:"
>curl http://localhost:9411/api/v2/services
...
["helidon-mp-1"] <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">This is the tracing service name specified in <code>META-INF/microprofile-config.properties</code>.</li>
</ul>
<p>Each span used by a service has a name, which is unique within a trace. If you
invoke the <code>/greet</code> endpoint multiple times, you will still get the same set
of names.</p>

<markup
lang="bash"
title="Invoke the endpoint below and check the response:"
><span class="conum" data-value="1" />
curl -X GET "http://localhost:9411/api/v2/spans?serviceName=helidon-mp-1" -H "accept: application/json"
...
[ <span class="conum" data-value="2" />
  "content-read",
  "content-write",
  "get:io.helidon.examples.quickstart.mp.greetresource.getdefaultmessage",
  "security",
  "security:atn",
  "security:atz",
  "security:response"
]</markup>

<ul class="colist">
<li data-value="1">Get the span names for the <code>helidon-mp-1</code> service.</li>
<li data-value="2">These are the span names.  If you invoke the <code>/greet</code> endpoint again, then
invoke the <code>/spans</code> endpoint, you will get the same response.</li>
</ul>
<p>Next, get the contents of the trace as shown below.  Notice that each span has a <code>parentId</code> field,
except the <code>get:io.helidon.examples.quickstart.mp.greetresource.getdefaultmessage</code> span,
which is the root.</p>

<markup
lang="bash"
title="Invoke the endpoint below and check the response:"
><span class="conum" data-value="1" />
curl -X GET "http://localhost:9411/api/v2/traces?serviceName=helidon-mp-1&amp;limit=1" -H "accept: application/json"
...
[
  [ <span class="conum" data-value="2" />
    {
      "traceId": "2e0af8866efdef35",
      "parentId": "2e0af8866efdef35",
      "id": "b5d61690f230fde4",
      "kind": "SERVER",
      "name": "content-read",
      "timestamp": 1568077339998659,
      "duration": 41,
      "localEndpoint": {
        "serviceName": "helidon-mp-1",
        "ipv4": "192.168.1.115"
      },
      "tags": {
        "requested.type": "java.io.InputStream"
      }
    },
...
(truncated)
]</markup>

<ul class="colist">
<li data-value="1">Get the newest trace only, using the <code>limit=1</code> query param.  There are other query params that let you restrict
results to a specific time window.</li>
<li data-value="2">The request will return seven spans, one for each name, along with an unnamed JSON node, which
has the status.</li>
</ul>
</div>

<h3 id="_viewing_tracing_using_zipkin_ui">Viewing tracing using Zipkin UI</h3>
<div class="section">
<p>The tracing output data is verbose and can be difficult to interpret using the REST API, especially since it represents
a structure of spans.  Zipkin provides a web-based UI at <a id="" title="" target="_blank" href="http://localhost:9411/zipkin">http://localhost:9411/zipkin</a>, where you can see a visual
representation of the same data and the relationship between spans within a trace.  If you see a <code>Lens UI</code> button at the top center then
click on it and it will take you to the specific UI used by this guide.</p>

<p>Click on the UI refresh button (the search icon) as shown in the image below.  Notice that you can change the look-back time
to restrict the trace list.</p>


<div class="block-title"><span>Trace refresh</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_refresh.png" alt="Trace Refresh" />
</v-card-text>
</v-card>

<p>The image below shows the trace summary, including start time and duration of each trace. There are two traces,
each one generated in response to a <code>curl <a id="" title="" target="_blank" href="http://localhost:8080/greet">http://localhost:8080/greet</a></code> invocation.  The oldest trace will have a much
longer duration since there is one-time initialization that occurs.</p>


<div class="block-title"><span>Tracing list view</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_top.png" alt="Traces" />
</v-card-text>
</v-card>

<p>Click on a trace and you will see the trace detail page where the spans are listed.  You can clearly
see the root span and the relationship among all the spans in the trace, along with timing information.</p>


<div class="block-title"><span>Trace detail page</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_detail.png" alt="Trace Detail" />
</v-card-text>
</v-card>

<div class="admonition note">
<p class="admonition-inline">A parent span might not depend on the result of the child. This is called a <code>FollowsFrom</code> reference, see
<a id="" title="" target="_blank" href="https://github.com/opentracing/specification/blob/master/specification.md">Open Tracing Semantic Spec</a>.  Notice, the
last span which writes the response after the root span ends, falls into this category.</p>
</div>
<p>You can examine span details by clicking on the span row.  Refer to the image below, which shows the <code>security</code> span details, including timing information.
You can see times for each space relative to the root span.  These rows are annotated with <code>Server Start</code> and <code>Server Finish</code>, as shown in the third column.</p>


<div class="block-title"><span>Span detail page</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_span_detail.png" alt="Span Details" />
</v-card-text>
</v-card>

</div>

<h3 id="_enabling_tracing_on_cdi_beans">Enabling Tracing on CDI beans</h3>
<div class="section">
<p>So far, you have used tracing with JAX-RS without needing to annotate.  You can enable tracing on other CDI beans, either at the class level
or at the method level, as shown by the following examples.</p>


<h4 id="_tracing_at_the_method_level">Tracing at the method level</h4>
<div class="section">
<p>To trace at the method level, you just annotate a method with @Traced.</p>

<markup
lang="java"
title="Update the <code>GreetingProvider</code> class; 1) Add a new import and 2) Add the @Traced annotation to the <code>getMessage</code> method:"
>import org.eclipse.microprofile.opentracing.Traced; <span class="conum" data-value="1" />
...
    @Traced  <span class="conum" data-value="2" />
    String getMessage() {
        return message.get();
    }
...</markup>

<ul class="colist">
<li data-value="1">Import the <code>Traced</code> annotation.</li>
<li data-value="2">Enable tracing for getMessage.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints and check the response:"
>curl http://localhost:8080/greet
curl -X GET "http://localhost:9411/api/v2/spans?serviceName=helidon-mp-1" -H "accept: application/json"
...
[
  "content-read",
  "content-write",
  "dosomework",
  "get:io.helidon.examples.quickstart.mp.greetresource.getdefaultmessage",
  "io.helidon.examples.quickstart.mp.greetingprovider.getmessage", <span class="conum" data-value="1" />
  "security",
  "security:atn",
  "security:atz",
  "security:response"
]</markup>

<ul class="colist">
<li data-value="1">There is new span name for the <code>getmessage</code> method, since your code called that method during the
invocation of <code>/greet</code>.</li>
</ul>
<p>Click the back button on your browser, then click on the UI refresh button to see the new trace.  Select the newest trace
in the list to see the trace detail page like the one below.
Notice the new span named <code>io.helidon.examples.quickstart.mp.greetingprovider.getmessage</code>.</p>


<div class="block-title"><span>Trace detail page with new span <code>getmessage</code></span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_getmessage.png" alt="Trace getmessage" />
</v-card-text>
</v-card>

</div>

<h4 id="_tracing_at_the_class_level">Tracing at the class level</h4>
<div class="section">
<p>To trace at the class level, annotate the class with @Traced. This will enable tracing for all class methods,
except for the constructor and private methods.</p>

<markup
lang="java"
title="Update the <code>GreetingProvider</code> class; 1) Add @Traced to the <code>GreetingProvider</code> class and 2) Remove @Traced from the <code>getMessage</code> method:"
>@Traced <span class="conum" data-value="1" />
@ApplicationScoped
public class GreetingProvider {
...

    String getMessage() { <span class="conum" data-value="2" />
        return message.get();
    }</markup>

<ul class="colist">
<li data-value="1">This will enable tracing for all class methods, except for the constructor and methods that are private.</li>
<li data-value="2">Remove @Traced for the <code>getMessage</code> method.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints and check the response:"
>curl http://localhost:8080/greet
curl -X GET "http://localhost:9411/api/v2/spans?serviceName=helidon-mp-1" -H "accept: application/json"
[
...
  "io.helidon.examples.quickstart.mp.greetingprovider.getmessage", <span class="conum" data-value="1" />
...
]</markup>

<ul class="colist">
<li data-value="1">The service has the same set of span names as above, since <code>getmessage</code> was the only method called in this bean.</li>
</ul>
<p>Next, invoke HTTP PUT to change the greeting, which will cause <code>setMessage</code> to be called.</p>

<markup
lang="bash"

>Invoke the endpoints and check the response:
----
curl -i -X PUT -H "Content-Type: application/json" -d '{"greeting": "Hi"}'  http://localhost:8080/greet/greeting <span class="conum" data-value="1" />
curl -X GET "http://localhost:9411/api/v2/spans?serviceName=helidon-mp-1" -H "accept: application/json"
...
[
  "content-read",
  "content-write",
  "get:io.helidon.examples.quickstart.mp.greetresource.getdefaultmessage",
  "io.helidon.examples.quickstart.mp.greetingprovider.getmessage",
  "io.helidon.examples.quickstart.mp.greetingprovider.setmessage", <span class="conum" data-value="2" />
  "put:io.helidon.examples.quickstart.mp.greetresource.updategreeting", <span class="conum" data-value="3" />
  "security",
  "security:atn",
  "security:atz",
  "security:response"
]
----
&lt;1&gt; Invoke the endpoint to change the greeting.
&lt;2&gt; The `GreetingProvider.setmessage` method was traced since you enabled class level tracing.
&lt;3&gt; The JAX-RS method `GreetResource.updategreeting` was traced automatically by Helidon.</markup>

<p>You can refresh the UI view and drill down the trace to see the new spans.</p>

<div class="admonition note">
<p class="admonition-inline">Methods invoked directly by your code are not enabled for tracing, even if you explicitly annotate them with @Traced.
Tracing only works for methods invoked on CDI beans. See the example below.</p>
</div>
<markup
lang="java"
title="Update the <code>GreetingProvider</code> class with the following code:"
>@ApplicationScoped
public class GreetingProvider {
    private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;();

    @Inject
    public GreetingProvider(@ConfigProperty(name = "app.greeting") String message) {
        this.message.set(message);
    }

    @Traced <span class="conum" data-value="1" />
    String getMessage() {
        return getMessage2();
    }

    @Traced  <span class="conum" data-value="2" />
    String getMessage2() {
        return message.get();
    }

    void setMessage(String message) {
        this.message.set(message);
    }
}</markup>

<ul class="colist">
<li data-value="1">The <code>getMessage</code> method will be traced since it is externally invoked by <code>GreetResource</code>.</li>
<li data-value="2">The <code>getMessage2</code> method will not be traced, even with the @Traced annotation, since it is called internally by <code>getMessage</code>.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints and check the response:"
>curl http://localhost:8080/greet
curl -X GET "http://localhost:9411/api/v2/spans?serviceName=helidon-mp-1" -H "accept: application/json"
...
[
...
  "io.helidon.examples.quickstart.mp.greetingprovider.getmessage", <span class="conum" data-value="1" />
...
]</markup>

<ul class="colist">
<li data-value="1">The <code>getMessage</code> method is traced, but <code>getMessage2</code> is not.</li>
</ul>
</div>
</div>

<h3 id="_tracing_across_services">Tracing across services</h3>
<div class="section">
<p>Helidon automatically traces across services, providing that the services use the same tracer, for example, the same instance of Zipkin.
This means a single trace can include spans from multiple services and hosts.  OpenTracing uses a <code>SpanContext</code> to
propagate tracing information across process boundaries.  When you make client API calls, Helidon will
internally call OpenTracing APIs to propagate the <code>SpanContext</code>. There is nothing you need to do in your application to make this work.</p>

<p>To demonstrate distributed tracing, you will need to create a second project, where the server listens on port 8081.
Create a new root directory to hold this new project, then do the following steps, similar to
what you did at the start of this guide:</p>


<h4 id="_create_a_second_service">Create a second service</h4>
<div class="section">
<markup
lang="bash"
title="Run the Maven archetype:"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.0.2 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp-2 \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<markup
lang="bash"
title="The project will be built and run from the <code>helidon-quickstart-mp</code> directory:"
>cd helidon-quickstart-mp-2</markup>

<markup
lang="xml"
title="Add the following dependency to <code>pom.xml</code>:"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-tracing-zipkin&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="bash"
title="Replace <code>META-INF/microprofile-config.properties</code> with the following:"
>app.greeting=Hello From MP-2
tracing.service=helidon-mp-2

# Microprofile server properties
server.port=8081
server.host=0.0.0.0</markup>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-mp-2.jar</markup>

<markup
lang="bash"
title="Run the curl command in a new terminal window and check the response (<strong>notice the port is 8081</strong>) :"
>curl http://localhost:8081/greet
...
{
  "message": "Hello From MP-2 World!"
}</markup>

</div>

<h4 id="_modify_the_first_service">Modify the first service</h4>
<div class="section">
<p>Once you have validated that the second service is running correctly, you need to modify the original application to
call it.</p>

<markup
lang="java"
title="Replace the <code>GreetResource</code> class with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import org.glassfish.jersey.server.Uri;

@Path("/greet")
@RequestScoped
public class GreetResource {

  @Uri("http://localhost:8081/greet")
  private WebTarget target; <span class="conum" data-value="1" />

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final GreetingProvider greetingProvider;

  @Inject
  public GreetResource(GreetingProvider greetingConfig) {
    this.greetingProvider = greetingConfig;
  }

  @SuppressWarnings("checkstyle:designforextension")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public JsonObject getDefaultMessage() {
    return createResponse("World");
  }

  @GET
  @Path("/outbound") <span class="conum" data-value="2" />
  public JsonObject outbound() {
    return target.request().accept(MediaType.APPLICATION_JSON_TYPE).get(JsonObject.class);
  }

  private JsonObject createResponse(String who) {
    String msg = String.format("%s %s!", greetingProvider.getMessage(), who);

    return JSON.createObjectBuilder().add("message", msg).build();
  }
}</markup>

<ul class="colist">
<li data-value="1">This is the <code>WebTarget</code> needed to send a request to the second service at port <code>8081</code>.</li>
<li data-value="2">This is the new endpoint that will call the second service.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl -i http://localhost:8080/greet/outbound <span class="conum" data-value="1" />
...
{
  "message": "Hello From MP-2 World!" <span class="conum" data-value="2" />
}</markup>

<ul class="colist">
<li data-value="1">The request went to the service on <code>8080</code>, which then invoked the service at <code>8081</code> to get the greeting.</li>
<li data-value="2">Notice the greeting came from the second service.</li>
</ul>
<p>Refresh the Zipkin UI trace listing page and notice that there is a trace across two services.</p>


<div class="block-title"><span>Tracing multiple service list view</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_top_2_services.png" alt="Traces" />
</v-card-text>
</v-card>

<p>Click on the trace with two services to see the detail view.</p>


<div class="block-title"><span>Tracing across multiple services detail view</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/guides/12_tracing_detail_2_services.png" alt="Traces" />
</v-card-text>
</v-card>

<p>In the image above, you can see that the trace includes spans from two services. You will notice there is a gap before the sixth span,
which is a <code>get</code> operation. This is a one-time client initialization delay.  Run the <code>/outbound</code> curl command again and look at the new trace to
see that the delay no longer exists.</p>

<p>You can now stop your second service, it is no longer used in this guide.</p>

</div>
</div>
</div>

<h2 id="_integration_with_kubernetes">Integration with Kubernetes</h2>
<div class="section">
<p>The following example demonstrate how to use Zipkin from a Helidon application running in Kubernetes.</p>

<markup
lang="bash"
title="Add the following line to <code>META-INF/microprofile-config.properties</code>:"
>tracing.host=zipkin</markup>

<markup
lang="bash"
title="Stop the application and build the docker image for your application:"
>docker build -t helidon-tracing-mp .</markup>


<h3 id="_deploy_zipkin_into_kubernetes">Deploy Zipkin into Kubernetes</h3>
<div class="section">
<markup
lang="yaml"
title="Create the Kubernetes YAML specification, named <code>zipkin.yaml</code>, with the following contents:"
>apiVersion: v1
kind: Service
metadata:
  name: zipkin
spec:
  ports:
    - port: 9411
      protocol: TCP
  selector:
    app: zipkin
---
kind: Pod
apiVersion: v1
metadata:
  name: zipkin
  labels:
    app: zipkin
spec:
  containers:
    - name: zipkin
      image: openzipkin/zipkin
      imagePullPolicy: IfNotPresent
      ports:
        - containerPort: 9411</markup>

<markup
lang="bash"
title="Create the Zipkin pod and ClusterIP service:"
>kubectl apply -f ./zipkin.yaml</markup>

<markup
lang="bash"
title="Create a Zipkin external server and expose it on port 9142:"
>kubectl expose pod  zipkin --name=zipkin-external --port=9412 --target-port=9411 --type=LoadBalancer <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Create a service so that you can access the Zipkin UI.</li>
</ul>
<p>Navigate to <a id="" title="" target="_blank" href="http://localhost:9412/zipkin">http://localhost:9412/zipkin</a> to validate that you can access Zipkin running in Kubernetes.  It may
take a few seconds before it is ready.</p>

</div>

<h3 id="_deploy_your_helidon_application_into_kubernetes">Deploy your Helidon application into Kubernetes</h3>
<div class="section">
<markup
lang="yaml"
title="Create the Kubernetes YAML specification, named <code>tracing.yaml</code>, with the following contents:"
>kind: Service
apiVersion: v1
metadata:
  name: helidon-tracing <span class="conum" data-value="1" />
  labels:
    app: helidon-tracing
spec:
  type: NodePort
  selector:
    app: helidon-tracing
  ports:
    - port: 8080
      targetPort: 8080
      name: http
---
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: helidon-tracing
spec:
  replicas: 1 <span class="conum" data-value="2" />
  template:
    metadata:
      labels:
        app: helidon-tracing
        version: v1
    spec:
      containers:
        - name: helidon-tracing
          image: helidon-tracing-mp
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080</markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>8080</code>.</li>
<li data-value="2">A deployment with one replica of a pod.</li>
</ul>
<markup
lang="bash"
title="Create and deploy the application into Kubernetes:"
>kubectl apply -f ./tracing.yaml</markup>

</div>

<h3 id="_access_your_application_and_the_zipkin_trace">Access your application and the Zipkin trace</h3>
<div class="section">
<markup
lang="bash"
title="Get the application service information:"
>kubectl get service/helidon-tracing</markup>

<markup
lang="bash"

>NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
helidon-tracing   NodePort   10.99.159.2   &lt;none&gt;        8080:31143/TCP   8s <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>31143</code>.</li>
</ul>
<markup
lang="bash"
title="Verify the tracing endpoint using port <code>31143</code>, your port will likely be different:"
>curl http://localhost:31143/greet
...
{
  "message": "Hello World!"
}</markup>

<p>Access the Zipkin UI at <a id="" title="" target="_blank" href="http://localhost:9412/zipkin">http://localhost:9412/zipkin</a> and click on the refresh icon to see the trace that was just created.</p>

</div>

<h3 id="_cleanup">Cleanup</h3>
<div class="section">
<p>You can now delete the Kubernetes resources that were just created during this example.</p>

<markup
lang="bash"
title="Delete the Kubernetes resources:"
>kubectl delete -f ./zipkin.yaml
kubectl delete -f ./tracing.yaml
kubectl delete service zipkin-external
docker rm -f zipkin</markup>

</div>
</div>

<h2 id="_summary">Summary</h2>
<div class="section">
<p>This guide has demonstrated how to use the Helidon MP tracing feature with Zipkin.  You have learned to do the following:</p>

<ul class="ulist">
<li>
<p>Enable tracing within a service</p>

</li>
<li>
<p>Use tracing with JAX-RS and CDI beans</p>

</li>
<li>
<p>Use the Zipkin REST API and UI</p>

</li>
<li>
<p>Use tracing across multiple services</p>

</li>
<li>
<p>Integrate tracing with Kubernetes</p>

</li>
</ul>
<p>Refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p>MicroProfile OpenTracing specification at <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-opentracing/releases/tag/1.3">https://github.com/eclipse/microprofile-opentracing/releases/tag/1.3</a></p>

</li>
<li>
<p>MicroProfile OpenTracing Javadoc at <a id="" title="" target="_blank" href="https://javadoc.io/doc/org.eclipse.microprofile.opentracing/microprofile-opentracing-api/1.3">https://javadoc.io/doc/org.eclipse.microprofile.opentracing/microprofile-opentracing-api/1.3</a></p>

</li>
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</doc-view>