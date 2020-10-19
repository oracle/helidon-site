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
<li data-value="1">If using zipkin tracing system, the endpoint would be: <code><a id="" title="" target="_blank" href="http://10.0.0.18:9411/api/v2/spans">http://10.0.0.18:9411/api/v2/spans</a></code></li>
</ul>
<markup
lang="java"
title="Configuring Tracing Attributes"
>GrpcTracingConfig tracingConfig = new GrpcTracingConfig.Builder()
                .withStreaming()
                .withVerbosity()
                .withTracedAttributes(ServerRequestAttribute.CALL_ATTRIBUTES,
                     ServerRequestAttribute.HEADERS,
                     ServerRequestAttribute.METHOD_NAME)
                .build();</markup>

<markup
lang="java"
title="Configuring gRPC Server"
>GrpcServerConfiguration serverConfig = GrpcServerConfiguration.builder().port(0)
                .tracer(tracer)
                .tracingConfig(tracingConfig)
                .build();</markup>

</div>

<h3 id="Tracing-config">Configuration using Helidon Config</h3>
<div class="section">
<p>There is a set of common configuration options that this section describes. In addition each tracer implementation
may have additional configuration options - please see the documentation of each of them.</p>

<p>Each implementation may provide defaults for these options.</p>

<p>All common configuration options:</p>


<div class="table__overflow elevation-1  ">
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
<td class="">service</td>
<td class="">Name of the service sending the tracing information. This is usually visible in the trace data to
distinguish actors in a conversation (e.g. when multiple microservices are connected together)</td>
</tr>
<tr>
<td class="">protocol</td>
<td class="">Protocol of the tracing collector (e.g. <code>http</code>, <code>https</code>)</td>
</tr>
<tr>
<td class="">host</td>
<td class="">Host of the tracing collector (e.g. <code>localhost</code>)</td>
</tr>
<tr>
<td class="">port</td>
<td class="">Port of the tracing collector (e.g. <code>9411</code>)</td>
</tr>
<tr>
<td class="">path</td>
<td class="">Path of the tracing collector service that is used to send spans to</td>
</tr>
<tr>
<td class="">enabled</td>
<td class="">If set to false, tracing would be disabled</td>
</tr>
<tr>
<td class="">tags</td>
<td class="">String tags that are to be added to each span reported (object node of string-string pairs)</td>
</tr>
<tr>
<td class="">boolean-tags</td>
<td class="">Boolean tags that are to be added to each span reported (object node of string-boolean pairs)</td>
</tr>
<tr>
<td class="">int-tags</td>
<td class="">Int tags that are to be added to each span reported (object node of string-int pairs)</td>
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

>Span span = request.tracer()
        .buildSpan("my-operation")
        .asChildOf(request.spanContext())
                         .start();</markup>

</div>

<h2 id="_trace_propagation_across_services">Trace propagation across services</h2>
<div class="section">
<p>Automated trace propagation is supported currently only with Jersey client.</p>

<markup
lang="java"
title="Tracing propagation with Jersey client"
>Response response = client.target(serviceEndpoint)
    .request()
    .get();</markup>

</div>

<h2 id="_traced_spans">Traced spans</h2>
<div class="section">
<p>The following table lists all spans traced by Helidon components:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>component</th>
<th>span name</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>web-server</code></td>
<td class=""><code>HTTP Request</code></td>
<td class="">The overall span of the Web Server from request intitiation until response
                                            Note that in <code>Zipkin</code> the name is replaced with <code>jax-rs</code> span name if <code>jax-rs</code> tracing
                                            is used.</td>
</tr>
<tr>
<td class=""><code>web-server</code></td>
<td class=""><code>content-read</code></td>
<td class="">Span for reading the request entity</td>
</tr>
<tr>
<td class=""><code>web-server</code></td>
<td class=""><code>content-write</code></td>
<td class="">Span for writing the response entity</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>security</code></td>
<td class="">Processing of request security</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>security:atn</code></td>
<td class="">Span for request authentication</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>security:atz</code></td>
<td class="">Span for request authorization</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>security:response</code></td>
<td class="">Processing of response security</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>security:outbound</code></td>
<td class="">Processing of outbound security</td>
</tr>
<tr>
<td class=""><code>jax-rs</code></td>
<td class="">A generated name</td>
<td class="">Span for the resource method invocation, name is generated from class and method name</td>
</tr>
<tr>
<td class=""><code>jax-rs</code></td>
<td class=""><code>jersey-client-call</code></td>
<td class="">Span for outbound client call</td>
</tr>
</tbody>
</table>
</div>
<p>Some of these spans <code>log</code> to the span. These log events can be (in most cases) configured:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 20%;">
<col style="width: 20%;">
</colgroup>
<thead>
<tr>
<th>span name</th>
<th>log name</th>
<th>configurable</th>
<th>enabled by default</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>HTTP Request</code></td>
<td class=""><code>handler.class</code></td>
<td class="">YES</td>
<td class="">YES</td>
<td class="">Each handler has its class and event logged</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>status</code></td>
<td class="">YES</td>
<td class="">YES</td>
<td class="">Logs either "status: PROCEED" or "status: DENY"</td>
</tr>
<tr>
<td class=""><code>security:atn</code></td>
<td class=""><code>security.user</code></td>
<td class="">YES</td>
<td class="">NO</td>
<td class="">The username of the user if logged in</td>
</tr>
<tr>
<td class=""><code>security:atn</code></td>
<td class=""><code>security.service</code></td>
<td class="">YES</td>
<td class="">NO</td>
<td class="">The name of the service if logged in</td>
</tr>
<tr>
<td class=""><code>security:atn</code></td>
<td class=""><code>status</code></td>
<td class="">YES</td>
<td class="">YES</td>
<td class="">Logs the status of security response (such as <code>SUCCESS</code>)</td>
</tr>
<tr>
<td class=""><code>security:atz</code></td>
<td class=""><code>status</code></td>
<td class="">YES</td>
<td class="">YES</td>
<td class="">Logs the status of security response (such as <code>SUCCESS</code>)</td>
</tr>
<tr>
<td class=""><code>security:outbound</code></td>
<td class=""><code>status</code></td>
<td class="">YES</td>
<td class="">YES</td>
<td class="">Logs the status of security response (such as <code>SUCCESS</code>)</td>
</tr>
</tbody>
</table>
</div>
<p>There are also tags that are set by Helidon components. These are not configurable.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>span name</th>
<th>tag name</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>HTTP Request</code></td>
<td class=""><code>component</code></td>
<td class="">name of the component - <code>helidon-webserver</code>, or <code>jaxrs</code> when using MP</td>
</tr>
<tr>
<td class=""><code>HTTP Request</code></td>
<td class=""><code>http.method</code></td>
<td class="">HTTP method of the request, such as <code>GET</code>, <code>POST</code></td>
</tr>
<tr>
<td class=""><code>HTTP Request</code></td>
<td class=""><code>http.status_code</code></td>
<td class="">HTTP status code of the response</td>
</tr>
<tr>
<td class=""><code>HTTP Request</code></td>
<td class=""><code>http.url</code></td>
<td class="">The path of the request (for SE without protocol, host and port)</td>
</tr>
<tr>
<td class=""><code>HTTP Request</code></td>
<td class=""><code>error</code></td>
<td class="">If the request ends in error, this tag is set to <code>true</code>, usually accompanied by logs with details</td>
</tr>
<tr>
<td class=""><code>content-read</code></td>
<td class=""><code>requested.type</code></td>
<td class="">Type (class) of the requested entity (if entity is read)</td>
</tr>
<tr>
<td class=""><code>content-write</code></td>
<td class=""><code>response.type</code></td>
<td class="">Type (class) of the entity being sent (if enitty is sent)</td>
</tr>
<tr>
<td class=""><code>security</code></td>
<td class=""><code>security.id</code></td>
<td class="">ID of the security context created for this request (if security is used)</td>
</tr>
<tr>
<td class=""><code>jersey-client-call</code></td>
<td class=""><code>http.method</code></td>
<td class="">HTTP method of the client request</td>
</tr>
<tr>
<td class=""><code>jersey-client-call</code></td>
<td class=""><code>http.status_code</code></td>
<td class="">HTTP status code of client response</td>
</tr>
<tr>
<td class=""><code>jersey-client-call</code></td>
<td class=""><code>http.url</code></td>
<td class="">Full URL of the request (such as <code><a id="" title="" target="_blank" href="http://localhost:8080/greet">http://localhost:8080/greet</a></code>)</td>
</tr>
</tbody>
</table>
</div>

<h3 id="_traced_spans_configuration">Traced spans configuration</h3>
<div class="section">
<p>Each component and its spans can be configured using Config.
The traced configuration has the following layers:</p>

<ul class="ulist">
<li>
<p><code>TracingConfig</code> - the overall configuration of traced components of Helidon</p>

</li>
<li>
<p><code>ComponentTracingConfig</code> - a component of Helidon that traces spans (such as <code>web-server</code>, <code>security</code>, <code>jax-rs</code>)</p>

</li>
<li>
<p><code>SpanTracingConfig</code> - a single traced span within a component (such as <code>security:atn</code>)</p>

</li>
<li>
<p><code>SpanLogTracingConfig</code> - a single log event on a span (such as <code>security.user</code> in span <code>security:atn</code>)</p>

</li>
</ul>
<p>The components using tracing configuration use the
<code>TracingConfigUtil</code>. This uses the <code>io.helidon.common.Context</code> to retrieve
current configuration.</p>


<h4 id="_configuration_using_builder">Configuration using builder</h4>
<div class="section">
<p>Builder approach, example that disables a single span log event:</p>

<markup
lang="java"
title="Configure tracing using a builder"
>TracingConfig.builder()
     .addComponent(ComponentTracingConfig.builder("web-server")
             .addSpan(SpanTracingConfig.builder("HTTP Request")
                     .addSpanLog(SpanLogTracingConfig.builder("content-write").enabled(false).build())
                     .build())
             .build())
     .build()</markup>

</div>

<h4 id="_configuration_using_helidon_config">Configuration using Helidon Config</h4>
<div class="section">
<p>Tracing configuration can be defined in a config file.</p>

<markup
lang="yaml"
title="Tracing configuration"
>tracing:
    components:
      web-server:
        spans:
          - name: "HTTP Request"
            logs:
              - name: "content-write"
                enabled: false</markup>

<markup
lang="java"
title="Use the configuration in web server"
>routing.register(WebTracingConfig.create(config.get("tracing")));</markup>

</div>

<h4 id="_path_based_configuration_in_helidon_web_server">Path based configuration in Helidon Web Server</h4>
<div class="section">
<p>For Web Server we have a path based support for configuring tracing, in addition
to the configuration described above.</p>

<p>Configuration of path can use any path string supported by the
Web Server. The configuration itself has the same possibilities
 as traced configuration described above. The path specific configuration
 will be merged with global configuration (path is the "newer" configuration, global is the "older")</p>

<markup
lang="yaml"
title="Configuration in YAML"
>tracing:
  paths:
    - path: "/favicon.ico"
      enabled: false
    - path: "/metrics"
      enabled: false
    - path: "/health"
      enabled: false
    - path: "/greet"
      components:
        web-server:
          spans:
          - name: "content-read"
            new-name: "read"
            enabled: false</markup>

<markup
lang="java"
title="Configuration with Web Server"
>routingBuilder.register(WebTracingConfig.create(config.get("tracing"));</markup>

<markup
lang="java"
title="Configuration with Web Server using a builder"
>routingBuilder.register(WebTracingConfig.builder()
    .addPathConfig(PathTracingConfig.builder()
        .path("/metrics")
        .tracingConfig(TracingConfig.DISABLED)
        .build();
    .build());</markup>

</div>

<h4 id="_renaming_top_level_span_using_request_properties">Renaming top level span using request properties</h4>
<div class="section">
<p>To have a nicer overview in search pane of a tracer, you can customize the top-level span name using configuration.</p>

<p>Example:</p>

<markup
lang="yaml"
title="Configuration in YAML"
>tracing:
  components:
    web-server:
      spans:
      - name: "HTTP Request"
        new-name: "HTTP %1$s %2$s"</markup>

<p>This is supported ONLY for the span named "HTTP Request" on component "web-server".</p>

<p>Parameters provided:</p>

<ol style="margin-left: 15px;">
<li>
Method - HTTP method

</li>
<li>
Path - path of the request (such as '/greet')

</li>
<li>
Query - query of the request (may be null)

</li>
</ol>
</div>
</div>
</div>
</doc-view>