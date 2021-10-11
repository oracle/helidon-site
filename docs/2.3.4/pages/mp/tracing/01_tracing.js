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
In addition you need to add one of the tracer implementations:</p>

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
</doc-view>