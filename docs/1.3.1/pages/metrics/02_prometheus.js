<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Prometheus Metrics</dt>
<dd slot="desc"><p>Helidon WebServer can serve Prometheus metrics.</p>

<p>This document describes how to register Prometheus support with WebServer and how to customize
the configuration. For information about using Prometheus, see the
Prometheus documentation: <a id="" title="" target="_blank" href="https://prometheus.io/docs/introduction/overview/">https://prometheus.io/docs/introduction/overview/</a>.</p>

<p>Note that Helidon has an in-built metrics implementation. See <router-link to="/metrics/01_metrics">Helidon Metrics</router-link>.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-metrics-prometheus&lt;/artifactId&gt;
    &lt;/dependency&gt;</markup>

</div>

<h2 id="_using_prometheus_metrics_in_your_application">Using Prometheus metrics in your application</h2>
<div class="section">
<p>To enable Prometheus metrics, register it with the web server.</p>

<markup
lang="java"

>import io.helidon.metrics.prometheus.PrometheusSupport;
//...

Routing.builder()
                .register(PrometheusSupport.create())
                .register("/myapp", new MyService())
                .build();</markup>

<p>This example uses the default <code>CollectorRegistry</code> and exposes an endpoint
<code>/metrics</code>. You can use fluent API builder obtained by <code>PrometheusSupport.builder()</code> to
configure a different <code>CollectorRegistry</code> or a different path.</p>

</div>
</doc-view>