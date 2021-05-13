<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Metrics</dt>
<dd slot="desc"><p>Helidon SE provides the following to support metrics:</p>

<ol style="margin-left: 15px;">
<li>
The endpoint <code>/metrics</code>: A configurable endpoint that exposes metrics information in JSON format (as specified by the
MicroProfile Metrics specification) or in plain text (for Prometheus metrics).

</li>
<li>
A base set of metrics, available at <code>/metrics/base</code>, as specified by the MicroProfile Metrics specification.

</li>
<li>
A set of Helidon-specific metrics, available at <code>/metrics/vendor</code>

</li>
</ol></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable DB Client
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-metrics&lt;/artifactId&gt;
    &lt;/dependency&gt;</markup>

</div>

<h2 id="_using_metrics_in_your_application">Using Metrics in Your Application</h2>
<div class="section">
<p>To enable Metrics, register it with the WebServer.</p>

<markup
lang="java"

>import io.helidon.metrics.MetricsSupport;
//...

Routing.builder()
                .register(MetricsSupport.create())
                .register("/myapp", new MyService())
                .build();</markup>

<p>Then you can use metrics in your service.</p>

<markup
lang="java"
title="Define and use a Metrics Counter"
>import io.helidon.metrics.RegistryFactory;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricRegistry;
//...

public class MyService implements Service {

    private final MetricRegistry registry = RegistryFactory.getInstance()
        .getRegistry(MetricRegistry.Type.APPLICATION); <span class="conum" data-value="1" />
    private final Counter accessCtr = registry.counter("accessctr"); <span class="conum" data-value="2" />

    @Override
    public void update(Routing.Rules rules) {
        rules
             .any(this::countAccess)
             .get("/", this::myGet);
    }

    private void countAccess(ServerRequest request, ServerResponse response) {
            accessCtr.inc(); <span class="conum" data-value="3" />
            request.next();
    }
}</markup>

<ul class="colist">
<li data-value="1">Get the application metrics registry</li>
<li data-value="2">Create a counter in that registry</li>
<li data-value="3">Increment the counter for every request</li>
</ul>
</div>

<h2 id="_accessing_metrics_endpoint">Accessing Metrics Endpoint</h2>
<div class="section">
<p>Access metrics data via the <code>/metrics</code> endpoint. Two reporting formats
are supported. The HTTP Accept header sent by the client determines
the reporting format:</p>

<ol style="margin-left: 15px;">
<li>
JSON format - used when the HTTP Accept header matches <code>application/json</code>

</li>
<li>
Prometheus text format - used when the HTTP Accept header is <code>text/plain</code>
or otherwise does not match <code>application/json</code>

</li>
</ol>
<markup
lang="bash"
title="Example Reporting: Prometheus format"
>curl -s -H 'Accept: text/plain' -X GET http://localhost:8080/metrics/
# TYPE base:classloader_total_loaded_class_count counter
# HELP base:classloader_total_loaded_class_count Displays the total number of classes that have been loaded since the Java virtual machine has started execution.
base:classloader_total_loaded_class_count 3157
#...</markup>

<markup
lang="bash"
title="Example Reporting: JSON format"
>curl -s -H 'Accept: application/json' -X GET http://localhost:8080/metrics/ | json_pp
{
   "base" : {
      "memory.maxHeap" : 3817865216,
      "memory.committedHeap" : 335544320,
#...</markup>

<p>In addition to your application metrics the reports contain other
metrics of interest such as system and VM information.</p>

<p>For full details see the
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-metrics/releases">MicroProfile Metrics</a>
specification.</p>

<p>The Metrics component in Helidon SE is the core for the Helidon MP implementation of the MicroProfile Metrics specification.</p>

</div>
</doc-view>