<doc-view>

<h2 id="_configuring_tracing_with_helidon_mp">Configuring Tracing with Helidon MP</h2>
<div class="section">
<p>Tracing support is implemented for both for Helidon MP Server and for Jersey client.</p>

<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-tracing&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>In addition you need to add one of the tracer implementations (Zipkin or Jaeger).</p>

<p>The minimal required configuration is <code>tracing.service</code> that contains
the service name to be associated with tracing spans sent by this instance.</p>

<p>All tracer specific configuration is expected in config under <code>tracing</code>.</p>

<p>Example <code>microprofile-config.properties</code> with minimal tracer configuration:</p>

<div class="listing">
<pre>tracing.service=helidon-mp</pre>
</div>

<p>For additional supported properties, please see <router-link to="#Tracing-config" @click.native="this.scrollFix('#Tracing-config')">tracing configuration</router-link></p>

</div>

<h2 id="_creating_custom_spans">Creating custom spans</h2>
<div class="section">
<p>MicroProfile OpenTracing implementation will add support to simply
add custom spans by annotation. Until we implement this support, you
can configure custom spans as follows (in JAX-RS resources):</p>

<markup
lang="java"

>@Context
io.helidon.webserver.ServerRequest serverRequest;

//...

Span span = GlobalTracer.get()
        .buildSpan("my-operation")
        .asChildOf(serverRequest.spanContext())
        .start();</markup>

</div>

<h2 id="_trace_propagation_across_services">Trace propagation across services</h2>
<div class="section">
<p>Automated trace propagation is supported currently only with Jersey client.</p>

<p>Tracing propagation works automatically as long as you execute
the client call in the same thread as the Jersey server side.</p>

<p><em>Exceptions that require manual handling</em>:</p>

<ul class="ulist">
<li>
<p>When the resource method is annotated with Fault Tolerance annotations (e.g. <code>@Fallback</code>)</p>

</li>
<li>
<p>When you use <code>async()</code> on the Jersey client request</p>

</li>
</ul>
<p>In such cases, you must provide the SpanContext by hand:</p>

<markup
lang="java"
title="Tracing propagation with Jersey client (on a different thread)"
>import static io.helidon.tracing.jersey.client.ClientTracingFilter.CURRENT_SPAN_CONTEXT_PROPERTY_NAME;
import static io.helidon.tracing.jersey.client.ClientTracingFilter.TRACER_PROPERTY_NAME;

// ...

Response response = client.target(serviceEndpoint)
    .request()
    // tracer should be provided unless available as GlobalTracer
    .property(TRACER_PROPERTY_NAME, tracer)
    .property(CURRENT_SPAN_CONTEXT_PROPERTY_NAME, spanContext)
    .get();</markup>

<p>Tracer and SpanContext can be obtained from <code>ServerRequest</code> that can be injected into Resource classes:</p>

<div class="listing">
<pre>@Context
io.helidon.webserver.ServerRequest serverRequest;

//...

SpanContext spanContext = serverRequest.spanContext();
// optional, you could also use GlobalTracer.get() if it is configured
Tracer tracer = req.webServer().configuration().tracer();</pre>
</div>

</div>
</doc-view>