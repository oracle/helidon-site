<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Metrics Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample MicroProfile (MP) project
that can be used to run some basic examples using both built-in and custom metrics with Helidon MP.</p>
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

<h3 id="_create_a_sample_helidon_mp_project">Create a sample Helidon MP project</h3>
<div class="section">
<p>Use the Helidon MP Maven archetype to create a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype:"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.2.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

</div>

<h3 id="_using_the_built_in_metrics">Using the built-in metrics</h3>
<div class="section">
<p>Helidon provides three scopes of metrics: base, vendor, and application.  Helidon automatically provides built-in base and vendor metrics.
Applications can use these metrics without additional configuration or code changes.  Here are the metric endpoints:</p>

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
from the root directory of your project (helidon-quickstart-mp).</p>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-mp.jar</markup>

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
># TYPE base_REST_request_total counter
# HELP base_REST_request_total The number of invocations and total response time of RESTful resource methods since the start of the server.
base_REST_request_total{class="io.helidon.examples.quickstart.mp.GreetResource",method="getDefaultMessage"} 0
# TYPE base_REST_request_elapsedTime_seconds gauge
base_REST_request_elapsedTime_seconds{class="io.helidon.examples.quickstart.mp.GreetResource",method="getDefaultMessage"} 0.0
base_REST_request_total{class="io.helidon.examples.quickstart.mp.GreetResource",method="getMessage_java.lang.String"} 0
base_REST_request_elapsedTime_seconds{class="io.helidon.examples.quickstart.mp.GreetResource",method="getMessage_java.lang.String"} 0.0
base_REST_request_total{class="io.helidon.examples.quickstart.mp.GreetResource",method="updateGreeting_javax.json.JsonObject"} 0
base_REST_request_elapsedTime_seconds{class="io.helidon.examples.quickstart.mp.GreetResource",method="updateGreeting_javax.json.JsonObject"} 0.0
# TYPE base:classloader_current_loaded_class_count counter
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
    "REST.request":
      {
        "count;class=io.helidon.examples.quickstart.mp.GreetResource;method=getDefaultMessage":0,
        "elapsedTime;class=io.helidon.examples.quickstart.mp.GreetResource;method=getDefaultMessage":0.0,
        "count;class=io.helidon.examples.quickstart.mp.GreetResource;method=getMessage_java.lang.String":0,
        "elapsedTime;class=io.helidon.examples.quickstart.mp.GreetResource;method=getMessage_java.lang.String":0.0,
        "count;class=io.helidon.examples.quickstart.mp.GreetResource;method=updateGreeting_javax.json.JsonObject":0,
        "elapsedTime;class=io.helidon.examples.quickstart.mp.GreetResource;method=updateGreeting_javax.json.JsonObject":0.0
      },
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

<h4 id="_controlling_rest_request_metrics">Controlling <code>REST.request</code> metrics</h4>
<div class="section">
<p>Helidon implements the optional family of metrics, all with the name <code>REST.request</code>, as described in the
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-metrics-2.3/microprofile-metrics-spec-2.3.html#_optional_rest">MicroProfile Metrics specification</a>.
Each instance is a <code>SimpleTimer</code> with tags <code>class</code> and <code>method</code> identifying exactly which REST endpoint Java
method that instance measures.</p>

<p>By default, Helidon MP does <em>not</em> enable this feature.
Enable it by editing your application configuration to set <code>metrics.rest-request.enabled</code> to <code>true</code>.</p>

<p>Note that the applications you generate using the full Helidon archetype <em>do</em> enable this feature in the
generated config file.
You can see the results in the sample output shown in earlier example runs.</p>

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
<p>You can create application-specific metrics and integrate them with Helidon using CDI.
To add a new metric, simply annotate the JAX-RS resource with one of the metric annotations. Metrics can
be injected at the class, method, and field-levels.  This document shows examples of all three.</p>

<p>Helidon will automatically create and register annotated application metrics and store them in the application <code>MetricRegistry</code>, which
also contains the metric metadata. The metrics will exist for the lifetime of the application.
Each metric annotation has mandatory and optional fields. The name field, for example, is optional.</p>


<h4 id="_method_level_metrics">Method level metrics</h4>
<div class="section">
<p>There are four metrics that you can use by annotating a method:</p>

<ol style="margin-left: 15px;">
<li>
<code>@Counted</code> - Register a <code>Counter</code> metric

</li>
<li>
<code>@Timed</code> - Register a <code>Timer</code> metric

</li>
<li>
<code>@Metered</code> - Register a <code>Meter</code> metric

</li>
<li>
<code>@SimplyTimed</code> - Register a <code>SimpleTimer</code> metric

</li>
</ol>
<p>The following example will demonstrate how to use the <code>@Counted</code> annotation to track the number of times
the <code>/cards</code> endpoint is called.</p>

<markup
lang="java"
title="Create a new class <code>GreetingCards</code> with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.metrics.annotation.Counted;

@Path("/cards") <span class="conum" data-value="1" />
@RequestScoped <span class="conum" data-value="2" />
public class GreetingCards {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(name = "any-card")  <span class="conum" data-value="3" />
  public JsonObject anyCard() throws InterruptedException {
    return createResponse("Here are some random cards ...");
  }

  private JsonObject createResponse(String msg) {
    return JSON.createObjectBuilder().add("message", msg).build();
  }
}</markup>

<ul class="colist">
<li data-value="1">This class is annotated with <code>Path</code> which sets the path for this resource
as <code>/cards</code>.</li>
<li data-value="2">The <code>@RequestScoped</code> annotation defines that this bean is
request scoped.  The request scope is active only for the duration of
one web service invocation and it is destroyed at the end of that
invocation.</li>
<li data-value="3">The annotation <code>@Counted</code> will register a <code>Counter</code> metric for this method, creating it if needed.
The counter is incremented each time the anyCards method is called.  The <code>name</code> attribute is optional.</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">For Metrics 1.1, you must set <code>monotonic</code> field to <code>true</code> to force the count to increment when entering the method.
The default behavior is to decrement when exiting the method.  Here is an example:
<code>@Counted(name = "any-card", monotonic = true)</code>.</p>
</div>
<markup
lang="bash"
title="Build and run the application, then invoke the application endpoints below:"
>curl http://localhost:8080/cards
curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "io.helidon.examples.quickstart.mp.GreetingCards.any-card":2 <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The any-card count is two, since you invoked the endpoint twice.</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">Notice the counter is fully qualified.  You can remove the package prefix by using the <code>absolute=true</code> field in the <code>@Counted</code> annotation.
You must use  <code>absolute=false</code> for class-level annotations.</p>
</div>
</div>

<h4 id="_additional_method_level_metrics">Additional method-level metrics</h4>
<div class="section">
<p>The <code>@Timed</code>, <code>@Metered</code>, and <code>@SimplyTimed</code> annotations can also be used with a method.  For the following example.
you can just annotate the same method with <code>@Metered</code> and <code>@Timed</code>. These metrics collect significant
information about the measured methods, but at a cost of some overhead and more complicated output.
Use <code>@SimplyTimed</code> in cases where capturing the invocation count and the total elapsed time
spent in a block of code is sufficient.</p>

<p>Note that when using multiple annotations on a method, you <strong>must</strong> give the metrics different names as shown below.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Counted;
import org.eclipse.microprofile.metrics.annotation.Metered;
import org.eclipse.microprofile.metrics.annotation.Timed;

@Path("/cards")
@RequestScoped
public class GreetingCards {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(name = "cardCount", absolute = true) <span class="conum" data-value="1" />
  @Metered(name = "cardMeter", absolute = true, unit = MetricUnits.MILLISECONDS) <span class="conum" data-value="2" />
  @Timed(name = "cardTimer", absolute = true, unit = MetricUnits.MILLISECONDS) <span class="conum" data-value="3" />
  public JsonObject anyCard() throws InterruptedException {
    return createResponse("Here are some random cards ...");
  }

  private JsonObject createResponse(String msg) {
    return JSON.createObjectBuilder().add("message", msg).build();
  }
}</markup>

<ul class="colist">
<li data-value="1">Specify a custom name for the <code>Counter</code> metric and set <code>absolute=true</code> to remove the path prefix from the name.</li>
<li data-value="2">Add the <code>@Metered</code> annotation to get a <code>Meter</code> metric.</li>
<li data-value="3">Add the <code>@Timed</code> annotation to get a <code>Timer</code> metric.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the application endpoints below:"
>curl http://localhost:8080/cards
curl http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response:"
>{
  "cardCount": 2,
  "cardMeter": {  <span class="conum" data-value="1" />
    "count": 2,
    "meanRate": 0.3664337145491488,
    "oneMinRate": 0.4,
    "fiveMinRate": 0.4,
    "fifteenMinRate": 0.4
  },
  "cardTimer": { <span class="conum" data-value="2" />
    "count": 2,
    "meanRate": 0.36649792432150535,
    "oneMinRate": 0.4,
    "fiveMinRate": 0.4,
    "fifteenMinRate": 0.4,
    "min": 12944,
    "max": 2078856,
    "mean": 1045900.0,
    "stddev": 1032956.0,
    "p50": 2078856.0,
    "p75": 2078856.0,
    "p95": 2078856.0,
    "p98": 2078856.0,
    "p99": 2078856.0,
    "p999": 2078856.0
  }
}</markup>

<ul class="colist">
<li data-value="1">The <code>Meter</code> metric includes the count field (it is a superset of <code>Counter</code>).</li>
<li data-value="2">The <code>Timer</code> metric includes the <code>Meter</code> fields (it is a superset of <code>Meter</code>).</li>
</ul>
</div>

<h4 id="_reusing_metrics">Reusing metrics</h4>
<div class="section">
<p>You can share a metric across multiple endpoints by specifying the reusable field in the metric annotation as
demonstrated below.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.metrics.annotation.Counted;

@Path("/cards")
@RequestScoped
public class GreetingCards {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(name = "anyCard",absolute = true)
  public JsonObject anyCard() throws InterruptedException {
    return createResponse("Here are some cards ...");
  }

  @GET
  @Path("/birthday")
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(name = "specialEventCard", absolute = true, reusable = true)  <span class="conum" data-value="1" />
  public JsonObject birthdayCard() throws InterruptedException {
    return createResponse("Here are some birthday cards ...");
  }

  @GET
  @Path("/wedding")
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(name = "specialEventCard", absolute = true, reusable = true)  <span class="conum" data-value="2" />
  public JsonObject weddingCard() throws InterruptedException {
    return createResponse("Here are some wedding cards ...");
  }

  private JsonObject createResponse(String msg) {
    return JSON.createObjectBuilder().add("message", msg).build();
  }
}</markup>

<ul class="colist">
<li data-value="1">The <code>/birthday</code> endpoint uses a <code>Counter</code> metric, named <code>specialEventCard</code>.</li>
<li data-value="2">The <code>/wedding</code> endpoint uses the same <code>Counter</code> metric, named <code>specialEventCard</code>.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the following endpoints:"
>curl  http://localhost:8080/cards/wedding
curl  http://localhost:8080/cards/birthday
curl  http://localhost:8080/cards
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response from <code>/metrics/application</code>:"
>{
"anyCard": 1,
"specialEventCard": 2  <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">Notice that <code>specialEventCard</code> count is two, since you accessed <code>/cards/wedding</code> and <code>/cards/birthday</code>.</li>
</ul>
</div>

<h4 id="_class_level_metrics">Class-level metrics</h4>
<div class="section">
<p>You can collect metrics at the class-level to aggregate data from all methods in that class using the same metric.
The following example introduces a metric to count all card queries.  In the following example, the method-level metrics are not
needed to aggregate the counts, but they are left in the example to demonstrate the combined output of all three metrics.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.metrics.annotation.Counted;

@Path("/cards")
@RequestScoped
@Counted(name = "totalCards") <span class="conum" data-value="1" />
public class GreetingCards {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(absolute = true) <span class="conum" data-value="2" />
  public JsonObject anyCard() throws InterruptedException {
    return createResponse("Here are some random cards ...");
  }

  @Path("/birthday")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(absolute = true) <span class="conum" data-value="3" />
  public JsonObject birthdayCard() throws InterruptedException {
    return createResponse("Here are some birthday cards ...");
  }

  private JsonObject createResponse(String msg) {
    return JSON.createObjectBuilder().add("message", msg).build();
  }
}</markup>

<ul class="colist">
<li data-value="1">This class is annotated with <code>@Counted</code>, which aggregates count data from all the method that have a <code>Count</code> annotation.</li>
<li data-value="2">Use <code>absolute=true</code> to remove path prefix for method-level annotations.</li>
<li data-value="3">Add a method with a <code>Counter</code> metric to get birthday cards.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the following endpoints:"
>curl http://localhost:8080/cards
curl http://localhost:8080/cards/birthday
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response from <code>/metrics/application</code>:"
>{
  "anyCard": 1,
  "birthdayCard": 1,
  "io.helidon.examples.quickstart.mp.totalCards.GreetingCards": 2  <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The <code>totalCards</code> count is a total of all the method-level <code>Counter</code> metrics.  Class level metric names are always
fully qualified.</li>
</ul>
</div>

<h4 id="_field_level_metrics">Field-level metrics</h4>
<div class="section">
<p>Field level metrics can be injected into managed objects, but they need to be updated by the application code.
This annotation can be used on fields of type <code>Meter</code>, <code>Timer</code>, <code>Counter</code>, and <code>Histogram</code>.</p>

<p>The following example shows how to use a field-level <code>Counter</code> metric to track cache hits.</p>

<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import java.util.Random;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.annotation.Counted;
import org.eclipse.microprofile.metrics.annotation.Metric;

@Path("/cards")
@RequestScoped
@Counted(name = "totalCards")
public class GreetingCards {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

  @Inject
  @Metric(name = "cacheHits", absolute = true) <span class="conum" data-value="1" />
  private Counter cacheHits;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(absolute = true)
  public JsonObject anyCard() throws InterruptedException {
    updateStats(); <span class="conum" data-value="2" />
    return createResponse("Here are some random cards ...");
  }

  @Path("/birthday")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(absolute = true)
  public JsonObject birthdayCard() throws InterruptedException {
    updateStats();  <span class="conum" data-value="3" />
    return createResponse("Here are some birthday cards ...");
  }

  private JsonObject createResponse(String msg) {
    return JSON.createObjectBuilder().add("message", msg).build();
  }

  private void updateStats() {
    if (new Random().nextInt(3) == 1) {
      cacheHits.inc(); <span class="conum" data-value="4" />
    }
  }
}</markup>

<ul class="colist">
<li data-value="1">A <code>Counter</code> metric field, <code>cacheHits</code>, is automatically injected by Helidon.</li>
<li data-value="2">Call <code>updateStats()</code> to update the cache hits.</li>
<li data-value="3">Call <code>updateStats()</code> to update the cache hits.</li>
<li data-value="4">Randomly increment the <code>cacheHits</code> counter.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the following endpoints:"
>curl http://localhost:8080/cards
curl http://localhost:8080/cards
curl http://localhost:8080/cards/birthday
curl http://localhost:8080/cards/birthday
curl http://localhost:8080/cards/birthday
curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response from <code>/metrics/application</code>:"
>{
  "anyCard": 2,
  "birthdayCard": 3,
  "cacheHits": 2, <span class="conum" data-value="1" />
  "io.helidon.examples.quickstart.mp.totalCards.GreetingCards": 5
}</markup>

<ul class="colist">
<li data-value="1">The cache was hit two times out of five queries.</li>
</ul>
</div>

<h4 id="_gauge_metric">Gauge metric</h4>
<div class="section">
<p>The metrics you have tested so far are updated in response to an application REST request, i.e GET <code>/cards</code>.  These
metrics can be declared in a request scoped class and Helidon will store the metric in the <code>MetricRegistry</code>, so the value persists
across requests. When GET <code>/metrics/application</code> is invoked, Helidon will return the current value of the metric stored in the <code>MetricRegistry</code>.
The <code>Gauge</code> metric is different from all the other metrics. The application must provide a getter to return the gauge value in an
application scoped class. When GET <code>/metrics/application</code> is invoked, Helidon will call the <code>Gauge</code> getter, store that value
in the <code>MetricsRegistry</code>, and return it as part of the metrics response payload.  So, the <code>Gauge</code> metric value is updated real-time, in response to the
get metrics request.</p>

<p>The following example demonstrates how to use a <code>Gauge</code> to track application up-time.</p>

<markup
lang="java"
title="Create a new <code>GreetingCardsAppMetrics</code> class with the following code:"
>package io.helidon.examples.quickstart.mp;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicLong;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import org.eclipse.microprofile.metrics.annotation.Gauge;

@ApplicationScoped <span class="conum" data-value="1" />
public class GreetingCardsAppMetrics {

  private AtomicLong startTime = new AtomicLong(0); <span class="conum" data-value="2" />

  public void onStartUp(@Observes @Initialized(ApplicationScoped.class) Object init) {
    startTime = new AtomicLong(System.currentTimeMillis()); <span class="conum" data-value="3" />
  }

  @Gauge(unit = "TimeSeconds")
  public long appUpTimeSeconds() {
    return Duration.ofMillis(System.currentTimeMillis() - startTime.get()).getSeconds();  <span class="conum" data-value="4" />
  }
}</markup>

<ul class="colist">
<li data-value="1">This managed object must be application scoped to properly register and use the <code>Gauge</code> metric.</li>
<li data-value="2">Declare an <code>AtomicLong</code> field to hold the start time of the application.</li>
<li data-value="3">Initialize the application start time.</li>
<li data-value="4">Return the application <code>appUpTimeSeconds</code> metric, which will be included in the application metrics.</li>
</ul>
<markup
lang="java"
title="Update the <code>GreetingCards</code> class with the following code to simplify the metrics output:"
>package io.helidon.examples.quickstart.mp;

import java.util.Collections;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.eclipse.microprofile.metrics.annotation.Counted;

@Path("/cards")
@RequestScoped
public class GreetingCards {

  private static final JsonBuilderFactory JSON = Json.createBuilderFactory(Collections.emptyMap());

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Counted(name = "cardCount", absolute = true)
  public JsonObject anyCard() throws InterruptedException {
    return createResponse("Here are some random cards ...");
  }

  private JsonObject createResponse(String msg) {
    return JSON.createObjectBuilder().add("message", msg).build();
  }
}</markup>

<markup
lang="bash"
title="Build and run the application, then invoke the application metrics endpoint:"
>curl -H "Accept: application/json"  http://localhost:8080/metrics/application</markup>

<markup
lang="json"
title="JSON response from <code>/metrics/application</code>:"
>{
  "cardCount": 0,
  "io.helidon.examples.quickstart.mp.GreetingCardsAppMetrics.appUpTimeSeconds": 6 <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The application has been running for 6 seconds.</li>
</ul>
</div>
</div>

<h3 id="_integration_with_kubernetes_and_prometheus">Integration with Kubernetes and Prometheus</h3>
<div class="section">
<p>The following example shows how to integrate the Helidon MP application with Kubernetes.</p>

<markup
lang="bash"
title="Stop the application and build the docker image:"
>docker build -t helidon-metrics-mp .</markup>

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
          image: helidon-metrics-mp
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
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>31143</code>.</li>
</ul>
<markup
lang="bash"
title="Verify the metrics endpoint using port <code>30116</code>, your port will likely be different:"
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
<p>This guide demonstrated how to use metrics in a Helidon MP application using various combinations of
metrics and scopes.</p>

<ul class="ulist">
<li>
<p>Access metrics for all three scopes: base, vendor, and application</p>

</li>
<li>
<p>Configure application metrics at the class, method, and field-level</p>

</li>
<li>
<p>Integrate Helidon metrics with Kubernetes and Prometheus</p>

</li>
</ul>
<p>Refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p>MicroProfile Metrics specification at <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-metrics/releases/tag/2.0">https://github.com/eclipse/microprofile-metrics/releases/tag/2.0</a></p>

</li>
<li>
<p>MicroProfile Metrics Javadoc at <a id="" title="" target="_blank" href="https://javadoc.io/doc/org.eclipse.microprofile.metrics/microprofile-metrics-api/2.0.0">https://javadoc.io/doc/org.eclipse.microprofile.metrics/microprofile-metrics-api/2.0.0</a></p>

</li>
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</div>
</doc-view>