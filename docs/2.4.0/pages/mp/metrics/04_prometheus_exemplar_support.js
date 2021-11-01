<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Metrics Support for Exemplars</dt>
<dd slot="desc"><p>Add Helidon MP support for  <a id="" title="" target="_blank" href="https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#exemplars">OpenMetrics (Prometheus) exemplars</a> for histograms, counters, and simple timers to your application simply by adding dependencies to your project&#8217;s <code>pom.xml</code>.</p>
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

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-metrics-trace-exemplar&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<p>Also, include either <router-link to="/mp/tracing/02_zipkin">Helidon Zipkin</router-link> or <router-link to="/mp/tracing/03_jaeger">Helidon Jaeger</router-link> support:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-tracing-zipkin&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>or</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-tracing-jaeger&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>Be sure Zipkin or Jaeger, whichever you chose, is running and accessible to your server.</p>

</div>

<h2 id="_interpreting_exemplars">Interpreting Exemplars</h2>
<div class="section">
<div class="admonition note">
<p class="admonition-textlabel">Note</p>
<p ><p><a id="" title="" target="_blank" href="https://www.merriam-webster.com/dictionary/exemplar"><em>exemplar</em></a> - one that serves as a model or example</p>

<p>&#8201;&#8212;&#8201;Merriam-Webster Dictionary</p>
</p>
</div>
<p>When you add the <code>helidon-metrics-trace-exemplar</code> dependency&#8212;&#8203;and one for either Zipkin or Jaeger&#8212;&#8203;to your application, Helidon automatically records a sample (label, value, and timestamp) with each update to a histogram, simple timer, or counter. Helidon adds the label, value, and timestamp to the OpenMetrics output returned from the Helidon metrics endpoint (<code>/metrics</code> unless you set it up otherwise).</p>

<div class="listing">
<pre># TYPE application_getTimer_mean_seconds gauge
application_getTimer_mean_seconds 8.303030623354298E-4 # {trace_id="067632454fe4e8d1"} 1.14701E-4 1617723032.570000 <span class="conum" data-value="1" />

# TYPE application_getTimer_max_seconds gauge
application_getTimer_max_seconds 0.003952636 # {trace_id="fce183094e471633"} 0.003952636 1617723030.108000 <span class="conum" data-value="2" />

# TYPE application_getTimer_min_seconds gauge
application_getTimer_min_seconds 5.5254E-5 # {trace_id="0b1a4bf22b4e47fd"} 5.5254E-5 1617723033.311000</pre>
</div>

<ul class="colist">
<li data-value="1">This exemplar is a sample with value at least as close to the mean as any other sample.</li>
<li data-value="2">This exemplar is for an exact sample with value the same as the maximum value the timer has observed.</li>
</ul>
<div class="listing">
<pre># TYPE application_globalRequestTracker_total counter
# HELP application_globalRequestTracker_total
application_globalRequestTracker_total 4 # {trace_id="daf26fe35fee9917"} 0.001183992 1617725180.234000 <span class="conum" data-value="1" />

# TYPE application_globalRequestTracker_elapsedTime_seconds gauge
application_globalRequestTracker_elapsedTime_seconds 0.030309068 # {trace_id="daf26fe35fee9917"} 0.001183992 1617725180.234000 <span class="conum" data-value="1" /></pre>
</div>

<ul class="colist">
<li data-value="1">The exemplar for a <code>SimpleTimer</code> is the same for the <code>total</code> and the <code>elapsedTime</code> submetrics: always the most recent sample which updated the <code>SimpleTimer</code>.</li>
</ul>
<p>Helidon adds an exemplar to the output for each statistical value&#8212;&#8203;such as minimum, maximum, mean, and quantiles&#8212;&#8203;for histograms, timers, simple times, and for counters. The exemplar information describes a single, actual sample that is representative of the statistical value.
Helidon chooses the representative examplar for each value using information that is already recorded for each type of metric:</p>

<ol style="margin-left: 15px;">
<li>
If a metric necessarily corresponds to a specific sample&#8212;&#8203;for example a minimum or maximum&#8212;&#8203;Helidon associates a sample that has that exact value as the exemplar for the metric.

</li>
<li>
If a metric collects samples into bins (quantiles), Helidon associates a sample from that bin with the bin&#8217;s output.

</li>
<li>
If a metric maintains running statistics (counts, totals), Helidon associates the most recent sample for that metric.

</li>
<li>
If Helidon computes a metric&#8217;s value from a number of samples&#8212;&#8203;for example, mean&#8212;&#8203;Helidon associates a sample for which its value is at least as close as other samples to the statistical calculation.

</li>
</ol>
<p>In cases with multiple representative samples (for example, two samples' values are equally close to the mean), Helidon chooses one of them arbitrarily.</p>

</div>
</doc-view>