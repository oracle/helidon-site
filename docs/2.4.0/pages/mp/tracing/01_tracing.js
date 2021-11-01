<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable MicroProfile Tracing
either add a dependency on the <router-link to="/mp/introduction/02_microprofile">helidon-microprofile bundle</router-link> or
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-tracing&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_configuring_tracing_with_helidon_mp">Configuring Tracing with Helidon MP</h2>
<div class="section">
<p>Tracing support is implemented for both for Helidon MP Server and for Jersey client.
In addition, you need to add one of the tracer implementations:</p>

<ul class="ulist">
<li>
<p><router-link to="#tracing/02_zipkin.adoc" @click.native="this.scrollFix('#tracing/02_zipkin.adoc')">Zipkin</router-link></p>

</li>
<li>
<p><router-link to="#tracing/03_jaeger.adoc" @click.native="this.scrollFix('#tracing/03_jaeger.adoc')">Jaeger</router-link></p>

</li>
</ul>
<p>You can configure a custom service name using the <code>tracing.service</code> configuration property. If this
property is undefined, name is created from JAX-RS Application name, or <code>Helidon MP</code> is used if no application
is defined.</p>

<p>All tracer specific configuration is expected in configuration under key <code>tracing</code>.</p>

<markup
lang="properties"
title="Example <code>microprofile-config.properties</code> with customized service name."
>tracing.service=event-service</markup>


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
<p>To disable Helidon tracing for web server and security:</p>

<markup
lang="properties"

>tracing.components.web-server.enabled=false
tracing.components.security.enabled=false</markup>

<p>To disables MP Tracing as by specification:</p>

<markup
lang="properties"

>mp.opentracing.server.skip-pattern=.*</markup>

</div>
</div>

<h2 id="_creating_custom_spans">Creating custom spans</h2>
<div class="section">
<p>Helidon MP fully supports MicroProfile OpenTracing.
You can add custom spans using <code>@Traced</code> annotation on methods of CDI beans.</p>

<p><strong>Note for invoking methods on same class:</strong>
<em>If you invoke a method on the same class, <code>@Traced</code> annotation would be ignored, as it is not
invoked through a CDI proxy and as such cannot be intercepted.
To make sure <code>@Traced</code> is honored, use it on JAX-RS resource methods and on CDI bean methods used from other beans.</em></p>

</div>

<h2 id="_trace_propagation_across_services">Trace propagation across services</h2>
<div class="section">
<p>Automated trace propagation is supported currently only with Jersey client.</p>

<p>Tracing propagation works automatically as long as you run within the scope of
Helidon MP and use Helidon components to invoke external services.</p>


<h3 id="_manual_handling_of_traces_in_jersey_client">Manual handling of traces in Jersey Client</h3>
<div class="section">
<p>There is an option to provide <code>SpanContext</code> programmatically (such as when writing a command line
application that starts the span manually).</p>

<p>You can either configure the span context as the active span, or explicitly define it as client property.</p>

<markup
lang="java"
title="Tracing propagation with Jersey client"
>import static io.helidon.tracing.jersey.client.ClientTracingFilter.CURRENT_SPAN_CONTEXT_PROPERTY_NAME;
import static io.helidon.tracing.jersey.client.ClientTracingFilter.TRACER_PROPERTY_NAME;

// ...

Response response = client.target(serviceEndpoint)
    .request()
    // tracer should be provided unless available as GlobalTracer
    .property(TRACER_PROPERTY_NAME, tracer)
    .property(CURRENT_SPAN_CONTEXT_PROPERTY_NAME, spanContext)
    .get();</markup>

</div>
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

<h4 id="_configuration_using_mp_config">Configuration using MP Config</h4>
<div class="section">
<p>Tracing configuration can be defined in <code>microprofile-config.properties</code> file.</p>

<markup
lang="properties"
title="Tracing configuration"
>tracing.components.web-server.spans.0.name="HTTP Request"
tracing.components.web-server.spans.0.logs.0.name="content-write"
tracing.components.web-server.spans.0.logs.0.enabled=false</markup>

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
lang="properties"
title="Configuration properties"
>tracing.paths.0.path="/favicon.ico"
tracing.paths.0.enabled=false
tracing.paths.1.path="/metrics"
tracing.paths.1.enabled=false
tracing.paths.2.path="/health"
tracing.paths.2.enabled=false</markup>

</div>

<h4 id="_renaming_top_level_span_using_request_properties">Renaming top level span using request properties</h4>
<div class="section">
<p>To have a nicer overview in search pane of a tracer, you can customize the top-level span name using configuration.</p>

<p>Example:</p>

<markup
lang="properties"
title="Configuration properties"
>tracing.components.web-server.spans.0.name="HTTP Request"
tracing.components.web-server.spans.0.new-name: "HTTP %1$s %2$s"</markup>

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
</doc-view>