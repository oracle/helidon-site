<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Metrics Support for Jaeger</dt>
<dd slot="desc"><p>Integrate the metrics from Jaeger tracing into your Helidon MP application simply by adding a dependency.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>As the <router-link to="/mp/tracing/03_jaeger">Helidon Jaeger Tracing</router-link> document describes, you can use Jaeger tracing in your Helidon MP application.</p>

<p>Jaeger maintains several metrics about its own activity (briefly outlined in the <a id="" title="" target="_blank" href="https://www.jaegertracing.io/docs/1.22/client-libraries/#metrics">Jaeger client documentation</a>). This document explains how you can integrate those Jaeger tracing metrics with Helidon&#8217;s metrics.</p>

</div>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Your <code>pom.xml</code> file should already contain the dependency for Helidon-Jaeger tracing integration.</p>

<p>To enable integration with Jaeger&#8217;s metrics, add the following dependency:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-metrics-jaeger&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<p>You can leave your application&#8217;s Java code unchanged.
By adding this dependency, you instruct Helidon to monitor the Jaeger tracing metrics internally and to publish them using the Helidon metrics system.</p>

<p>Rebuild and start your application.</p>

</div>

<h2 id="_accessing_jaeger_tracing_metrics">Accessing Jaeger Tracing Metrics</h2>
<div class="section">
<p>Submit a few requests to your application&#8217;s endpoints.
This causes Jaeger to update its internal metrics.</p>

<p>Then, when you access your application&#8217;s metrics endpoint (<code>/metrics</code> by default), Helidon displays the updated Jaeger tracing metrics as part of the <code>vendor</code> metrics section.</p>

<markup
lang="bash"

>curl -H "Accept: application/json" -X GET http://localhost:8080/metrics/vendor</markup>

<markup
lang="json"
title="Partial Helidon Metrics <code>vendor</code> Output Showing Jaeger Metrics"
> ... "jaeger_tracer_baggage_restrictions_updates;result=err": 0,
  "jaeger_tracer_baggage_restrictions_updates;result=ok": 0,
  "jaeger_tracer_baggage_truncations": 0,
  "jaeger_tracer_baggage_updates;result=err": 0,
  "jaeger_tracer_baggage_updates;result=ok": 0,
  "jaeger_tracer_finished_spans": 0,
  "jaeger_tracer_reporter_queue_length": 0,
  "jaeger_tracer_reporter_spans;result=dropped": 0,
  "jaeger_tracer_reporter_spans;result=err": 0,
  "jaeger_tracer_reporter_spans;result=ok": 0,
  "jaeger_tracer_sampler_queries;result=err": 1,
  "jaeger_tracer_sampler_queries;result=ok": 0,
  "jaeger_tracer_sampler_updates;result=err": 0,
  "jaeger_tracer_sampler_updates;result=ok": 0,
  "jaeger_tracer_span_context_decoding_errors": 0,
  "jaeger_tracer_started_spans;sampled=n": 15,
  "jaeger_tracer_started_spans;sampled=y": 0,
  "jaeger_tracer_traces;sampled=n;state=joined": 2,
  "jaeger_tracer_traces;sampled=n;state=started": 3,
  "jaeger_tracer_traces;sampled=y;state=joined": 0,
  "jaeger_tracer_traces;sampled=y;state=started": 0,
...</markup>

<p>Helidon publishes whatever metrics Jaeger creates.</p>

</div>
</doc-view>