<doc-view>

<h2 id="_tracing_support">Tracing Support</h2>
<div class="section">
<p>Helidon includes support for tracing through the <code><a id="" title="" target="_blank" href="https://opentracing.io/">OpenTracing</a></code> APIs.
Tracing is integrated with WebServer, gRPC Server, and Security.</p>

<p>Support for specific tracers is abstracted. Your application can depend on
the abstraction layer and provide a specific tracer implementation as a Java
<code>ServiceLoader</code> service.</p>

</div>

<h2 id="_configuring_tracing_with_helidon_se">Configuring Tracing with Helidon SE</h2>
<div class="section">
<p>Declare the following dependency in your project to use the tracer abstraction:</p>

<markup
lang="xml"
title="Tracer Abstraction"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-tracing&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h3 id="_configuring_tracing_with_webserver">Configuring Tracing with WebServer</h3>
<div class="section">
<p>To configure tracer with WebServer:</p>

<markup
lang="java"
title="Configuring OpenTracing <code>Tracer</code>"
>ServerConfiguration.builder()
                   .tracer(TracerBuilder.create("my-application")                    <span class="conum" data-value="1" />
                                 .collectorUri(URI.create("http://10.0.0.18:9411"))  <span class="conum" data-value="2" />
                                 .build())
                   .build()</markup>

<ul class="colist">
<li data-value="1">The name of the application (service) to associate with the tracing events</li>
<li data-value="2">The endpoint for tracing events, specific to the tracer used, usually loaded from Config</li>
</ul>
</div>

<h3 id="_configuring_tracing_with_grpc_server">Configuring Tracing with gRPC Server</h3>
<div class="section">
<markup
lang="java"
title="Configuring OpenTracing <code>Tracer</code>"
>Tracer tracer = (Tracer) TracerBuilder.create("Server")
        .collectorUri(URI.create("http://10.0.0.18:9411"))   <span class="conum" data-value="1" />
        .build();</markup>

<ul class="colist">
<li data-value="1">If using zipkin tracing system, the endpoint would be:</li>
</ul>
<div class="listing">
<pre>http://10.0.0.18:9411/api/v2/spans</pre>
</div>

<div class="listing">
<pre>TracingConfiguration tracingConfig = new TracingConfiguration.Builder()
                .withStreaming()
                .withVerbosity()
                .withTracedAttributes(ServerRequestAttribute.CALL_ATTRIBUTES,
                     ServerRequestAttribute.HEADERS,
                     ServerRequestAttribute.METHOD_NAME)
                .build();</pre>
</div>

<div class="listing">
<pre>GrpcServerConfiguration serverConfig = GrpcServerConfiguration.builder().port(0)
                .tracer(tracer)
                .tracingConfig(tracingConfig)
                .build();</pre>
</div>

</div>

<h3 id="Tracing-config">Configuration using Helidon Config</h3>
<div class="section">
<p>There is a set of common configuration options that this section describes. In addition each tracer implementation
may have additional configuration options - please see the documentation of each of them.</p>

<p>Each implementation may provide defaults for these options.</p>

<p>All common configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>service</td>
<td>Name of the service sending the tracing information. This is usually visible in the trace data to
                distinguish actors in a conversation (e.g. when multiple microservices are connected together)</td>
</tr>
<tr>
<td>protocol</td>
<td>Protocol of the tracing collector (e.g. <code>http</code>, <code>https</code>)</td>
</tr>
<tr>
<td>host</td>
<td>Host of the tracing collector (e.g. <code>localhost</code>)</td>
</tr>
<tr>
<td>port</td>
<td>Port of the tracing collector (e.g. <code>9411</code>)</td>
</tr>
<tr>
<td>path</td>
<td>Path of the tracing collector service that is used to send spans to</td>
</tr>
<tr>
<td>enabled</td>
<td>If set to false, tracing would be disabled</td>
</tr>
<tr>
<td>tags</td>
<td>String tags that are to be added to each span reported (object node of string-string pairs)</td>
</tr>
<tr>
<td>boolean-tags</td>
<td>Boolean tags that are to be added to each span reported (object node of string-boolean pairs)</td>
</tr>
<tr>
<td>int-tags</td>
<td>Int tags that are to be added to each span reported (object node of string-int pairs)</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<h2 id="_creating_custom_spans">Creating custom spans</h2>
<div class="section">
<p>To create a custom span that is a child of the WebServer request:</p>

<markup
lang="java"

>// or you can register the tracer as a global tracer
// and use GlobalTracer.get()
Tracer tracer = request.webServer().configuration().tracer();
Span span = tracer
        .buildSpan("my-operation")
        .asChildOf(serverRequest.spanContext())
                         .start();</markup>

</div>

<h2 id="_trace_propagation_across_services">Trace propagation across services</h2>
<div class="section">
<p>Semi-automated trace propagation is supported currently only with Jersey client.</p>

<p>Currently you need to provide the tracer and parent span context to the client:</p>

<markup
lang="java"
title="Tracing propagation with Jersey client"
>import static io.helidon.tracing.jersey.client.ClientTracingFilter.CURRENT_SPAN_CONTEXT_PROPERTY_NAME;
import static io.helidon.tracing.jersey.client.ClientTracingFilter.TRACER_PROPERTY_NAME;

//...

Response response = client.target(serviceEndpoint)
    .request()
    // tracer should be provided unless available as GlobalTracer
    .property(TRACER_PROPERTY_NAME, tracer)
    .property(CURRENT_SPAN_CONTEXT_PROPERTY_NAME, spanContext)
    .get();</markup>

<p><code>Tracer</code> and <code>SpanContext</code> can be obtained from <code>ServerRequest</code>.</p>

</div>
</doc-view>