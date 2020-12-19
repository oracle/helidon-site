<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE Metrics Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample Helidon SE project
that can be used to run some basic examples using both built-in and custom metrics.</p>
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
<tr>
<td class=""><a id="" title="" target="_blank" href="https://github.com/helm/helm">Helm</a></td>
</tr>
</tbody>
</table>
</div>

<h3 id="_create_a_sample_helidon_se_project">Create a sample Helidon SE project</h3>
<div class="section">
<p>Use the Helidon SE Maven archetype to create a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=2.2.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

</div>

<h3 id="_using_the_built_in_metrics">Using the built-in metrics</h3>
<div class="section">
<p>Helidon provides three scopes of metrics: base, vendor, and application. Here are the metric endpoints:</p>

<ol style="margin-left: 15px;">
<li>
<code>/metrics/base</code> - Base metrics data as specified by the MicroProfile Metrics specification.

</li>
<li>
<code>/metrics/vendor</code> - Helidon-specific metrics data.

</li>
<li>
<code>/metrics/application</code> - Application-specific metrics data.

</li>
</ol>
<div class="admonition note">
<p class="admonition-inline">The <code>/metrics</code> endpoint will return data for all scopes.</p>
</div>
<p>The following example will demonstrate how to use the built-in metrics.  All examples are executed
from the root directory of your project (helidon-quickstart-se).  The generated source code is
already configured for both metrics and health-checks, but the following example removes health-checks.</p>

<markup
lang="xml"
title="Notice that the metrics dependency is already in the project&#8217;s pom.xml file:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-metrics&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="java"
title="Replace the <code>Main.createRouting</code> method with the following code:"
>    private static Routing createRouting(Config config) {

      GreetService greetService = new GreetService(config);

      return Routing.builder()
          .register(MetricsSupport.create()) <span class="conum" data-value="1" />
          .register("/greet", greetService)
          .build();
    }</markup>

<ul class="colist">
<li data-value="1">Register the built-in base and vendor metrics.</li>
</ul>
<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-se.jar</markup>

<div class="admonition note">
<p class="admonition-inline">Metrics can be returned in either text format (the default), or JSON.  The text format uses Prometheus Text Format,
see <a id="" title="" target="_blank" href="https://prometheus.io/docs/instrumenting/exposition_formats/#text-format-details">https://prometheus.io/docs/instrumenting/exposition_formats/#text-format-details</a>.</p>
</div>
<markup
lang="bash"
title="Verify the metrics endpoint in a new terminal window:"
>curl http://localhost:8080/metrics</markup>

<markup
lang="text"
title="Text response:"
># TYPE base:classloader_current_loaded_class_count counter
# HELP base:classloader_current_loaded_class_count Displays the number of classes that are currently loaded in the Java virtual machine.
base:classloader_current_loaded_class_count 7511
# TYPE base:classloader_total_loaded_class_count counter
# HELP base:classloader_total_loaded_class_count Displays the total number of classes that have been loaded since the Java virtual machine has started execution.
base:classloader_total_loaded_class_count 7512
...</markup>

<p>You can get the same data in JSON format.</p>

<markup
lang="bash"
title="Verify the metrics endpoint with an HTTP accept header:"
>curl -H "Accept: application/json"  http://localhost:8080/metrics</markup>

<markup
lang="json"
title="JSON response:"
>{
  "base": {
    "classloader.currentLoadedClass.count": 7534,
    "classloader.totalLoadedClass.count": 7538,
    "classloader.totalUnloadedClass.count": 1,
    "cpu.availableProcessors": 4,
    "cpu.systemLoadAverage": 2.83349609375,
    "gc.PS MarkSweep.count": 2,
    "gc.PS MarkSweep.time": 77,
    "gc.PS Scavenge.count": 5,
    "gc.PS Scavenge.time": 37,
    "jvm.uptime": 727588,
    "memory.committedHeap": 284164096,
    "memory.maxHeap": 3817865216,
    "memory.usedHeap": 53283088,
    "thread.count": 44,
    "thread.daemon.count": 35,
    "thread.max.count": 44
  },
  "vendor": {
    "grpc.requests.count": 0,
    "grpc.requests.meter": {
      "count": 0,
      "meanRate": 0.0,
      "oneMinRate": 0.0,
      "fiveMinRate": 0.0,
      "fifteenMinRate": 0.0
    },
    "requests.count": 6,
    "requests.meter": {
      "count": 6,
      "meanRate": 0.008275992296704147,
      "oneMinRate": 0.01576418632772332,
      "fiveMinRate": 0.006695060022357365,
      "fifteenMinRate": 0.0036382699664488415
    }
  }
}</markup>

<p>You can get a single metric by specifying the name in the URL path.</p>

<markup
lang="bash"
title="Get the Helidon <code>requests.meter</code> metric:"
>curl -H "Accept: application/json"  http://localhost:8080/metrics/vendor/requests.meter</markup>

<markup
lang="json"
title="JSON response:"
>{
  "requests.meter": {
    "count": 6,
    "meanRate": 0.008275992296704147,
    "oneMinRate": 0.01576418632772332,
    "fiveMinRate": 0.006695060022357365,
    "fifteenMinRate": 0.0036382699664488415
  }
}</markup>

<div class="admonition note">
<p class="admonition-inline">You cannot get the individual fields of a metric. For example, you cannot target <a id="" title="" target="_blank" href="http://localhost:8080/metrics/vendor/requests.meter.count">http://localhost:8080/metrics/vendor/requests.meter.count</a>.</p>
</div>
</div>

<h3 id="_metrics_metadata">Metrics metadata</h3>
<div class="section">
<p>Each metric has associated metadata that describes:</p>

<ol style="margin-left: 15px;">
<li>
name: The name of the metric.

</li>
<li>
units: The unit of the metric such as time (seconds, millisecond), size (bytes, megabytes), etc.

</li>
<li>
type: The type of metric: <code>Counter</code>, <code>Timer</code>, <code>Meter</code>, <code>Histogram</code>, or <code>Gauge</code>.

</li>
</ol>
<p>You can get the metadata for any scope, such as <code>/metrics/base</code>, as shown below:</p>

<markup
lang="bash"
title="Get the metrics metadata using HTTP OPTIONS method:"
> curl -X OPTIONS -H "Accept: application/json"  http://localhost:8080/metrics/base</markup>

<markup
lang="json"
title="JSON response (truncated):"
>{
  "classloader.currentLoadedClass.count": {
    "unit": "none",
    "type": "counter",
    "description": "Displays the number of classes that are currently loaded in the Java virtual machine.",
    "displayName": "Current Loaded Class Count"
  },
...
  "jvm.uptime": {
    "unit": "milliseconds",
    "type": "gauge",
    "description": "Displays the start time of the Java virtual machine in milliseconds. This attribute displays the approximate time when the Java virtual machine started.",
    "displayName": "JVM Uptime"
  },
...
  "memory.usedHeap": {
    "unit": "bytes",
    "type": "gauge",
    "description": "Displays the amount of used heap memory in bytes.",
    "displayName": "Used Heap Memory"
  }
}</markup>

</div>

<h3 id="_application_specific_metrics_data">Application-specific metrics data</h3>
<div class="section">
<p>This section demonstrates how to use application-specific metrics and integrate them with Helidon.
It is the application&#8217;s responsibility to create and update the metrics at runtime.  The application has
complete control over when and how each metric is used. For example, an application may use the
same counter for multiple methods, or one counter per method.  Helidon maintains an application
<code>MetricRegistry</code> which is used to manage all of the application metrics.
Helidon returns these metrics in response to a <code>/metrics/application</code> REST request.</p>

<p>In all of these examples, the scope and lifetime of the metric is at the application-level.
Each metric, except <code>Gauge</code>, is updated in response to a REST request and the contents of the
metric is cumulative.</p>


<h4 id="_counter_metric">Counter metric</h4>
<div class="section">
<p>The <code>Counter</code> metric is a monotonically increasing or decreasing number. The following example
will demonstrate how to use a <code>Counter</code> to track the number of times the <code>/cards</code> endpoint is called.</p>

<markup
lang="java"
title="Create a new class named <code>GreetingCards</code> with the following code:"
>package io.helidon.examples.quickstart.se;

import io.helidon.metrics.RegistryFactory;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
import java.util.Collections;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import org.eclipse.microprofile.metrics.Counter;  <span class="conum" data-value="1" />
import org.eclipse.microprofile.metrics.MetricRegistry;

public class GreetingCards implements Service {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final Counter cardCounter;   <span class="conum" data-value="2" />

  GreetingCards() {
    RegistryFactory metricsRegistry = RegistryFactory.getInstance();
    MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
    cardCounter = appRegistry.counter("cardCount");  <span class="conum" data-value="3" />
  }

  @Override
  public void update(Routing.Rules rules) {
    rules.get("/", this::getDefaultMessageHandler);
  }

  private void getDefaultMessageHandler(ServerRequest request, ServerResponse response) {
    cardCounter.inc();   <span class="conum" data-value="4" />
    sendResponse(response, "Here are some cards ...");
  }

  private void sendResponse(ServerResponse response, String msg) {
    JsonObject returnObject = JSON.createObjectBuilder().add("message", msg).build();
    response.send(returnObject);
  }
}</markup>

<ul class="colist">
<li data-value="1">Import metrics classes.</li>
<li data-value="2">Declare a <code>Counter</code> member variable.</li>
<li data-value="3">Create and register the <code>Counter</code> metric in the <code>MetricRegistry</code>.  This <code>Counter</code> will exist for the lifetime of
the application.</li>
<li data-value="4">Increment the count.</li>
</ul>
<markup
lang="java"
title="Update the <code>Main.createRouting</code> method as follows:"
>    private static Routing createRouting(Config config) {

        MetricsSupport metrics = MetricsSupport.create();
        GreetService greetService = new GreetService(config);

        return Routing.builder()
                .register(JsonSupport.create())
                .register(metrics)
                .register("/greet", greetService)
                .register("/cards", new GreetingCards()) <span class="conum" data-value="1" />
            .build();
    }</markup>

<ul class="colist">
<li data-value="1">Add the <code>GreetingCards</code> service to the <code>Routing.builder</code>.  Helidon will route any REST requests with
the <code>/cards</code> root path to the <code>GreetingCards</code> service.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints below:"
>curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "cardCount": 1 <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The count value is one since the method was called once.</li>
</ul>
</div>

<h4 id="_meter_metric">Meter metric</h4>
<div class="section">
<p>The <code>Meter</code> metric is used to measure throughput, the number of times an event occurs within a certain time period.
When a <code>Meter</code> object is created, its internal clock starts running.  That clock is used to calculate the various rates
stored this metric.  The <code>Meter</code> also includes the <code>count</code> field from the <code>Counter</code> metric.  When you mark an event,
the count is incremented.</p>

<p>The following example marks an event each time the <code>/cards</code> endpoint is called.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.se;

import io.helidon.metrics.RegistryFactory;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
import java.util.Collections;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import org.eclipse.microprofile.metrics.Meter; <span class="conum" data-value="1" />
import org.eclipse.microprofile.metrics.MetricRegistry; <span class="conum" data-value="1" />

public class GreetingCards implements Service {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final Meter cardMeter; <span class="conum" data-value="2" />

  GreetingCards() {
    RegistryFactory metricsRegistry = RegistryFactory.getInstance();
    MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
    cardMeter = appRegistry.meter("cardMeter"); <span class="conum" data-value="3" />
  }

  @Override
  public void update(Routing.Rules rules) {
    rules.get("/", this::getDefaultMessageHandler);
  }

  private void getDefaultMessageHandler(ServerRequest request, ServerResponse response) {
    cardMeter.mark(); <span class="conum" data-value="4" />
    sendResponse(response, "Here are some cards ...");
  }

  private void sendResponse(ServerResponse response, String msg) {
    JsonObject returnObject = JSON.createObjectBuilder().add("message", msg).build();
    response.send(returnObject);
  }
}</markup>

<ul class="colist">
<li data-value="1">Import metrics classes.</li>
<li data-value="2">Declare a <code>Meter</code> member variable.</li>
<li data-value="3">Create and register the <code>Meter</code> metric in the <code>MetricRegistry</code>.</li>
<li data-value="4">Mark the occurrence of an event.</li>
</ul>
<div class="admonition tip">
<p class="admonition-inline">Note: you can specify a count parameter such as <code>mark(100)</code> to mark multiple events.</p>
</div>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints below:"
>curl http://localhost:8080/cards
curl http://localhost:8080/cards
curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "cardMeter": { <span class="conum" data-value="1" />
    "count": 3, <span class="conum" data-value="2" />
    "meanRate": 0.17566568722974535,
    "oneMinRate": 0.04413761384322548,
    "fiveMinRate": 0.009753212003766951,
    "fifteenMinRate": 0.0033056752265846544
  }
}</markup>

<ul class="colist">
<li data-value="1">The <code>Meter</code> metric has a set of fields to show various rates, along with the count.</li>
<li data-value="2">The <code>/cards</code> endpoint was called three times.</li>
</ul>
</div>

<h4 id="_timer_metric">Timer metric</h4>
<div class="section">
<p>(See also <router-link to="#simple_timer_metric" @click.native="this.scrollFix('#simple_timer_metric')">Simple timer metric</router-link>.)</p>

<p>The <code>Timer</code> metric aggregates durations, provides timing statistics, and includes throughput statistics
using an internal <code>Meter</code> metric. The <code>Timer</code> measures duration in nanoseconds. In the following example,
a <code>Timer</code> metric is used to measure the duration of a method&#8217;s execution.  Whenever the REST <code>/cards</code>
endpoint is called, the <code>Timer</code> will be updated with additional timing information.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.se;

import io.helidon.metrics.RegistryFactory;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
import java.util.Collections;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import org.eclipse.microprofile.metrics.MetricRegistry; <span class="conum" data-value="1" />
import org.eclipse.microprofile.metrics.Timer;

public class GreetingCards implements Service {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final Timer cardTimer; <span class="conum" data-value="2" />

  GreetingCards() {
    RegistryFactory metricsRegistry = RegistryFactory.getInstance();
    MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
    cardTimer = appRegistry.timer("cardTimer"); <span class="conum" data-value="3" />
  }

  @Override
  public void update(Routing.Rules rules) {
    rules.get("/", this::getDefaultMessageHandler);
  }

  private void getDefaultMessageHandler(ServerRequest request, ServerResponse response) {
    Timer.Context timerContext = cardTimer.time(); <span class="conum" data-value="4" />
    sendResponse(response, "Here are some cards ...");
    response.whenSent().thenAccept(res -&gt; timerContext.stop()); <span class="conum" data-value="5" />
  }

  private void sendResponse(ServerResponse response, String msg) {
    JsonObject returnObject = JSON.createObjectBuilder().add("message", msg).build();
    response.send(returnObject);
  }
}</markup>

<ul class="colist">
<li data-value="1">Import metrics classes.</li>
<li data-value="2">Declare a <code>Timer</code> member variable.</li>
<li data-value="3">Create and register the <code>Timer</code> metric in the <code>MetricRegistry</code>.</li>
<li data-value="4">Start the timer.</li>
<li data-value="5">Stop the timer.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints below:"
>curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "cardTimer": {
    "count": 1,
    "meanRate": 0.03843465264149663, <span class="conum" data-value="1" />
    "oneMinRate": 0.014712537947741825,
    "fiveMinRate": 0.0032510706679223173,
    "fifteenMinRate": 0.0011018917421948848,
    "min": 40876527,  <span class="conum" data-value="2" />
    "max": 40876527,
    "mean": 40876527,
    "stddev": 0.0,
    "p50": 40876527,
    "p75": 40876527,
    "p95": 40876527,
    "p98": 40876527,
    "p99": 40876527,
    "p999": 40876527
  }
}</markup>

<ul class="colist">
<li data-value="1">These are the same fields used by <code>Meter</code>.</li>
<li data-value="2">These are the <code>Timer</code> fields that measure the duration of the <code>getDefaultMessageHandler</code> method. Some of these values
will change each time you invoke the <code>/cards</code> endpoint.</li>
</ul>
</div>

<h4 id="_histogram_metric">Histogram metric</h4>
<div class="section">
<p>The <code>Histogram</code> metric calculates the distribution of a set of values within ranges.  This metric does
not relate to time at all.  The following example will record a set of random numbers in a <code>Histogram</code> metric when
the <code>/cards</code> endpoint is invoked.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.se;

import io.helidon.metrics.RegistryFactory;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
import java.util.Collections;
import java.util.Random;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import org.eclipse.microprofile.metrics.Histogram; <span class="conum" data-value="1" />
import org.eclipse.microprofile.metrics.MetricRegistry; <span class="conum" data-value="1" />

public class GreetingCards implements Service {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final Histogram cardHistogram; <span class="conum" data-value="2" />

  GreetingCards() {
    RegistryFactory metricsRegistry = RegistryFactory.getInstance();
    MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
    cardHistogram = appRegistry.histogram("cardHistogram"); <span class="conum" data-value="3" />
  }

  @Override
  public void update(Routing.Rules rules) {
    rules.get("/", this::getDefaultMessageHandler);
  }

  private void getDefaultMessageHandler(ServerRequest request, ServerResponse response) {

    Random r = new Random();
    for (int i = 0; i &lt; 1000; i++) {  <span class="conum" data-value="4" />
      cardHistogram.update(1 + r.nextInt(25)); <span class="conum" data-value="5" />
    }
    sendResponse(response, "Here are some cards ...");
  }

  private void sendResponse(ServerResponse response, String msg) {
    JsonObject returnObject = JSON.createObjectBuilder().add("message", msg).build();
    response.send(returnObject);
  }
}</markup>

<ul class="colist">
<li data-value="1">Import metrics classes.</li>
<li data-value="2">Declare a <code>Histogram</code> member variable.</li>
<li data-value="3">Create and register the <code>Histogram</code> metric in the <code>MetricRegistry</code>.</li>
<li data-value="4">Update the <code>Histogram</code> metric with a random number.</li>
<li data-value="5">Loop, loading the histogram with numbers.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints below:"
>curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "cardHistogram": { <span class="conum" data-value="1" />
    "count": 1000,
    "min": 1,
    "max": 25,
    "mean": 12.743999999999915,
    "stddev": 7.308793607702962,
    "p50": 13.0,
    "p75": 19.0,
    "p95": 24.0,
    "p98": 25.0,
    "p99": 25.0,
    "p999": 25.0
  }
}</markup>

<ul class="colist">
<li data-value="1">This is the histogram data.  Some of these values will change each time you invoke the <code>/cards</code> endpoint.</li>
</ul>
</div>

<h4 id="_gauge_metric">Gauge metric</h4>
<div class="section">
<p>The <code>Gauge</code> metric measures a discreet value at a point in time, such as a temperature.  The metric is not normally
tied to a REST endpoint, rather it should be registered during application startup.  When the <code>/metrics/application</code> endpoint
is invoked, Helidon will call the <code>getValue</code> method of each registered <code>Gauge</code>.  The following example demonstrates
how a <code>Gauge</code> is used to get the current temperature.</p>

<markup
lang="java"
title="Add new imports to <code>Main.java</code> and replace the <code>Main.createRouting</code> method with the following code:"
>import io.helidon.metrics.RegistryFactory;
import java.util.Random;
import org.eclipse.microprofile.metrics.Gauge;
import org.eclipse.microprofile.metrics.MetricRegistry;

...

    private static Routing createRouting(Config config) {

      MetricsSupport metrics = MetricsSupport.create();

      RegistryFactory metricsRegistry = RegistryFactory.getInstance();
      MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
      appRegistry.register("temperature", (Gauge&lt;Integer&gt;)() -&gt;  new Random().nextInt(100)); <span class="conum" data-value="1" />

      GreetService greetService = new GreetService(config);
      return Routing.builder()
          .register(JsonSupport.create())
          .register(metrics)                  // Metrics at "/metrics"
          .register("/greet", greetService)
          .register("/cards", new GreetingCards())
          .build();
    }</markup>

<ul class="colist">
<li data-value="1">Register the <code>Gauge</code>, providing a lambda function that will return a random temperature.</li>
</ul>
<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code to use the <code>Counter</code> metric which will simplify the JSON output:"
>package io.helidon.examples.quickstart.se;

import io.helidon.metrics.RegistryFactory;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
import java.util.Collections;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricRegistry;

public class GreetingCards implements Service {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final Counter cardCounter;

  GreetingCards() {
    RegistryFactory metricsRegistry = RegistryFactory.getInstance();
    MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
    cardCounter = appRegistry.counter("cardCount");
  }

  @Override
  public void update(Routing.Rules rules) {
    rules.get("/", this::getDefaultMessageHandler);
  }

  private void getDefaultMessageHandler(ServerRequest request, ServerResponse response) {
    cardCounter.inc();   <span class="conum" data-value="4" />
    sendResponse(response, "Here are some cards ...");
  }

  private void sendResponse(ServerResponse response, String msg) {
    JsonObject returnObject = JSON.createObjectBuilder().add("message", msg).build();
    response.send(returnObject);
  }
}</markup>

<markup
lang="bash"
title="Build and run the application, then invoke the endpoints below:"
>curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response from <code>/metrics/application</code>:"
>{
  "cardCount": 1,
  "temperature": 11 <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The current temperature is returned.  Invoke the <code>/metrics/application</code> endpoint again and you should get a different value.</li>
</ul>
</div>

<h4 id="simple_timer_metric">Simple timer metric</h4>
<div class="section">
<p>The <code>SimpleTimer</code> metric counts invocations and accumulates duration (in seconds). In the following example,
a <code>SimpleTimer</code> metric is used to count and measure the duration of a method&#8217;s execution. Whenever the REST <code>/cards</code>
endpoint is called, the <code>SimpleTimer</code> updates its count and total elapsed time.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.se;

import io.helidon.metrics.RegistryFactory;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
import java.util.Collections;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import org.eclipse.microprofile.metrics.MetricRegistry; <span class="conum" data-value="1" />
import org.eclipse.microprofile.metrics.SimpleTimer;

public class GreetingCards implements Service {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());
  private final SimpleTimer cardTimer; <span class="conum" data-value="2" />

  GreetingCards() {
    RegistryFactory metricsRegistry = RegistryFactory.getInstance();
    MetricRegistry appRegistry = metricsRegistry.getRegistry(MetricRegistry.Type.APPLICATION);
    cardTimer = appRegistry.simpleTimer("cardSimpleTimer"); <span class="conum" data-value="3" />
  }

  @Override
  public void update(Routing.Rules rules) {
    rules.get("/", this::getDefaultMessageHandler);
  }

  private void getDefaultMessageHandler(ServerRequest request, ServerResponse response) {
    cardTimer.time(() -&gt; sendResponse(response, "Here are some cards ...")); <span class="conum" data-value="4" />
  }

  private void sendResponse(ServerResponse response, String msg) {
    JsonObject returnObject = JSON.createObjectBuilder().add("message", msg).build();
    response.send(returnObject);
  }
}</markup>

<ul class="colist">
<li data-value="1">Import metrics classes, particularly the <code>SimpleTimer</code> interface for this example.</li>
<li data-value="2">Declare a <code>SimpleTimer</code> member variable.</li>
<li data-value="3">Create and register the <code>SimpleTimer</code> metric in the <code>MetricRegistry</code>.</li>
<li data-value="4">Wrap the business logic in the simple timer&#8217;s <code>time</code> method which updates the count and the total elapsed time.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoints below:"
>curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "cardSimpleTimer":
    {
      "count":1, <span class="conum" data-value="1" />
      "elapsedTime":0.034274025 <span class="conum" data-value="2" />
    }
}</markup>

<ul class="colist">
<li data-value="1">How many times the <code>getDefaultMessageHandler</code> method ran.</li>
<li data-value="2">Cumulative time spent in the <code>getDefaultMessageHandler</code> method during its executions.</li>
</ul>
</div>
</div>

<h3 id="_integration_with_kubernetes_and_prometheus">Integration with Kubernetes and Prometheus</h3>
<div class="section">
<p>The following example shows how to integrate the Helidon SE application with Kubernetes.</p>

<markup
lang="bash"
title="Stop the application and build the docker image:"
>docker build -t helidon-metrics-se .</markup>

<markup
lang="yaml"
title="Create the Kubernetes YAML specification, named <code>metrics.yaml</code>, with the following content:"
>kind: Service
apiVersion: v1
metadata:
  name: helidon-metrics <span class="conum" data-value="1" />
  labels:
    app: helidon-metrics
  annotations:
    prometheus.io/scrape: 'true' <span class="conum" data-value="2" />
spec:
  type: NodePort
  selector:
    app: helidon-metrics
  ports:
    - port: 8080
      targetPort: 8080
      name: http
---
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: helidon-metrics
spec:
  replicas: 1 <span class="conum" data-value="3" />
  template:
    metadata:
      labels:
        app: helidon-metrics
        version: v1
    spec:
      containers:
        - name: helidon-metrics
          image: helidon-metrics-se
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080</markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>8080</code>.</li>
<li data-value="2">An annotation that will allow Prometheus to discover and scrape the application pod.</li>
<li data-value="3">A deployment with one replica of a pod.</li>
</ul>
<markup
lang="bash"
title="Create and deploy the application into Kubernetes:"
>kubectl apply -f ./metrics.yaml</markup>

<markup
lang="bash"
title="Get the service information:"
>kubectl get service/helidon-metrics</markup>

<markup
lang="bash"

>NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
helidon-metrics   NodePort   10.99.159.2   &lt;none&gt;        8080:31143/TCP   8s <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>31143</code></li>
</ul>
<markup
lang="bash"
title="Verify the metrics endpoint using port <code>31143</code>, your port will likely be different:"
>curl http://localhost:31143/metrics</markup>

<div class="admonition note">
<p class="admonition-inline">Leave the application running in Kubernetes since it will be used for Prometheus integration.</p>
</div>

<h4 id="_prometheus_integration">Prometheus integration</h4>
<div class="section">
<p>The metrics service that you just deployed into Kubernetes is already annotated with <code>prometheus.io/scrape:</code>.  This will allow
Prometheus to discover the service and scrape the metrics.  In this exercise, you will install Prometheus
into Kubernetes, then verify that it discovered the Helidon metrics in your application.</p>

<markup
lang="bash"
title="Install Prometheus and wait until the pod is ready:"
>helm install stable/prometheus --name metrics
export POD_NAME=$(kubectl get pods --namespace default -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")
kubectl get pod $POD_NAME</markup>

<p>You will see output similar to the following.  Repeat the <code>kubectl get pod</code> command until you see <code>2/2</code> and <code>Running</code>. This may take up to one minute.</p>

<markup
lang="bash"

>metrics-prometheus-server-5fc5dc86cb-79lk4   2/2     Running   0          46s</markup>

<markup
lang="bash"
title="Create a port-forward so you can access the server URL:"
>kubectl --namespace default port-forward $POD_NAME 7090:9090</markup>

<p>Now open your browser and navigate to <code><a id="" title="" target="_blank" href="http://localhost:7090/targets">http://localhost:7090/targets</a></code>.  Search for helidon on the page and you will see your
Helidon application as one of the Prometheus targets.</p>

</div>

<h4 id="_final_cleanup">Final cleanup</h4>
<div class="section">
<p>You can now delete the Kubernetes resources that were just created during this example.</p>

<markup
lang="bash"
title="Delete the Prometheus Kubernetes resources:"
>helm delete --purge metrics</markup>

<markup
lang="bash"
title="Delete the application Kubernetes resources:"
>kubectl delete -f ./metrics.yaml</markup>

</div>
</div>

<h3 id="_summary">Summary</h3>
<div class="section">
<p>This guide demonstrated how to use metrics in a Helidon SE application using various combinations of
metrics and scopes.</p>

<ul class="ulist">
<li>
<p>Access metrics for all three scopes: base, vendor, and application</p>

</li>
<li>
<p>Configure metrics that are updated by the application when an application REST endpoint is invoked</p>

</li>
<li>
<p>Configure a <code>Gauge</code> metric</p>

</li>
<li>
<p>Integrate Helidon metrics with Kubernetes and Prometheus</p>

</li>
</ul>
<p>Refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p>MicroProfile Metrics specification at <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-metrics/releases/tag/1.1">https://github.com/eclipse/microprofile-metrics/releases/tag/1.1</a></p>

</li>
<li>
<p>MicroProfile Metrics Javadoc at <a id="" title="" target="_blank" href="https://javadoc.io/doc/org.eclipse.microprofile.metrics/microprofile-metrics-api/1.1.1">https://javadoc.io/doc/org.eclipse.microprofile.metrics/microprofile-metrics-api/1.1.1</a></p>

</li>
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</div>
</doc-view>