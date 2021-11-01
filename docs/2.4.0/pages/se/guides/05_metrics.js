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
that can be used to run some basic examples using both built-in and custom metrics with Helidon.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">
<p>For this 30 minute tutorial, you will need the following:</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">A Helidon MP Application</td>
<td class="">You can use your own application or use the <a id="" title="" target="_blank" href="https://helidon.io/docs/v2/#/mp/guides/02_quickstart">Helidon MP Quickstart</a> to create a sample application.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;11</a> (<a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;11</a>)</td>
<td class="">Helidon requires Java 11+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.6.1+</a></td>
<td class="">Helidon requires Maven 3.6.1+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://docs.docker.com/install/">Docker 18.09+</a></td>
<td class="">You need Docker if you
want to build and deploy Docker containers.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.16.5+</a></td>
<td class="">If you want to
deploy to Kubernetes, you need <code>kubectl</code> and a Kubernetes cluster (you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>).</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://github.com/helm/helm">Helm</a></td>
<td class="">To manage Kubernetes applications.</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="bash"
title="Verify Prerequisites"
>java -version
mvn --version
docker --version
kubectl version --short</markup>

<markup
lang="bash"
title="Setting JAVA_HOME"
># On Mac
export JAVA_HOME=`/usr/libexec/java_home -v 11`

# On Linux
# Use the appropriate path to your JDK
export JAVA_HOME=/usr/lib/jvm/jdk-11</markup>


<h3 id="_create_a_sample_helidon_se_project">Create a Sample Helidon SE Project</h3>
<div class="section">
<p>Use the Helidon SE Maven archetype to create a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=2.4.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

</div>

<h3 id="_using_the_built_in_metrics">Using the Built-In Metrics</h3>
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
from the root directory of your project (helidon-quickstart-se).</p>

<p>The generated source code is already configured for both metrics and health checks, but the following example removes health checks.</p>

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

<h3 id="_controlling_metrics_behavior">Controlling Metrics Behavior</h3>
<div class="section">
<p>By adding a <code>metrics</code> section to your application configuration you can control how the Helidon metrics subsystem behaves in any of several ways.</p>

<ul class="ulist">
<li>
<p><router-link to="#disabling-entirely" @click.native="this.scrollFix('#disabling-entirely')">Disable metrics subsystem entirely</router-link>.</p>

</li>
<li>
<p>Identify groups of metrics to control:</p>
<ul class="ulist">
<li>
<p><router-link to="#enabling-disabling-by-component" @click.native="this.scrollFix('#enabling-disabling-by-component')">registered by a particular component</router-link>, and</p>

</li>
<li>
<p><router-link to="#enabling-disabling-by-registry" @click.native="this.scrollFix('#enabling-disabling-by-registry')">by metric registry</router-link> (application, vendor, and base) and within a registry by metric names  which match patterns you provide.</p>

</li>
</ul>
</li>
<li>
<p>Select whether to collect <router-link to="#extend-kpi" @click.native="this.scrollFix('#extend-kpi')">extended key performance indicator metrics</router-link>.</p>

</li>
</ul>
<p>Your Helidon SE application can also control metrics processing programmatically as described in the following sections.</p>


<h4 id="disabling-entirely">Disabling Metrics Subsystem Entirely</h4>
<div class="section">
<p>By default, if your application depends on the <code>helidon-metrics</code> Maven module then full-featured metrics are enabled.
You can disable the metrics subsystem entirely using configuration:</p>

<markup
lang="properties"
title="Configuration properties file disabling metrics"
>metrics.enabled=false</markup>

<p>A Helidon SE application can disable metrics processing programmatically.</p>

<markup
lang="java"
title="Disable all metrics behavior"
>import io.helidon.metrics.api.MetricsSettings;
import io.helidon.metrics.serviceapi.MetricsSupport;
import io.helidon.metrics.api.RegistryFactory;
...

    MetricsSettings metricsSettings = MetricsSettings.builder()
            .enabled(false)
            .build(); <span class="conum" data-value="1" />

    MetricsSupport metricsSupport = MetricsSupport.create(metricsSettings); <span class="conum" data-value="2" />

    RegistryFactory registryFactory = RegistryFactory.getInstance(metricsSettings); <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/MetricsSettings.html"><code>MetricsSettings</a></code> instance (via its <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/MetricsSettings.Builder.html"><code>Builder</code></a>) with the metrics subsystem disabled.</li>
<li data-value="2">Get a <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.serviceapi/io/helidon/metrics/serviceapi/MetricsSupport.html"><code>MetricsSupport</a></code> service (usable in setting routing rules) that responds
to the <code>/metrics</code> endpoint with <code>404</code> and an explanatory message.</li>
<li data-value="3">Get a <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/RegistryFactory.html"><code>RegistryFactory</a></code> instance that provides <code>MetricRegistry</code> instances which register
no-op metric objects (counters, timers, etc.).</li>
</ul>
<p>These builders and interfaces also have methods which accept <code>Config</code> objects representing the <code>metrics</code> node from the application configuration.</p>

<p>With metrics processing disabled, Helidon never updates any metrics and the <code>/metrics</code> endpoints respond with <code>404</code> plus a message that the metrics subsystem is disabled.</p>

</div>

<h4 id="enabling-disabling-by-component">Enabling and Disabling Metrics Usage by a Component</h4>
<div class="section">
<p>Helidon contains several components and integrations which register and update metrics.
Depending on how the component is written, you might be able to disable just that component&#8217;s use of metrics:</p>

<markup
lang="properties"
title="Configuration properties file disabling a component&#8217;s use of metrics"
>some-component.metrics.enabled=false</markup>

<p>Check the documentation for a specific component to find out whether that component uses metrics and whether it allows you to disable that use.</p>

<p>Your Helidon SE application can disable a metrics-capable component&#8217;s use of metrics programmatically.</p>

<markup
lang="java"
title="Disable metrics use in a metrics-capable component"
>import io.helidon.metrics.api.ComponentMetricsSettings;
...

    ComponentMetricsSettings.Builder componentMetricsSettingsBuilder = ComponentMetricsSettings.builder()
            .enabled(false); <span class="conum" data-value="1" />

    SomeService someService = SomeService.builder()
            ...
            .componentMetricsSettings(componentMetricsSettingsBuilder)
            ...
            .build(); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/ComponentMetricsSettings.html"><code>ComponentMetricsSettings</a></code> instance (via its <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/ComponentMetricsSettings.Builder.html"><code>Builder</code></a>) indicating that metrics usage should be disabled.</li>
<li data-value="2">Create an instance of the service with its metrics usage disabled.</li>
</ul>
<p>If you disable a component&#8217;s use of metrics, Helidon does not register the component&#8217;s metrics in the visible metrics registries nor do those metrics ever update their values. The response from the <code>/metrics</code> endpoint excludes that component&#8217;s metrics.</p>

<p>Note that if you disable metrics processing entirely, no component updates its metrics regardless of any component-level metrics settings.</p>

</div>

<h4 id="enabling-disabling-by-registry">Controlling Metrics By Registry Type and Metric Name</h4>
<div class="section">
<p>You can control the collection and reporting of metrics by registry type and metric name within registry type.</p>


<h5 id="_disabling_all_metrics_of_a_given_registry_type">Disabling All Metrics of a Given Registry Type</h5>
<div class="section">
<p>To disable all metrics in a given registry type (application, vendor, or base), add one or more groups to the configuration:</p>

<markup
lang="properties"
title="Disabling <code>base</code> and <code>vendor</code> metrics (properties format)"
>metrics.registries.0.type = base
metrics.registries.0.enabled = false
metrics.registries.1.type = vendor
metrics.registries.1.enabled = false</markup>

<markup
lang="yaml"
title="Disabling <code>base</code> and <code>vendor</code> metrics (YAML format)"
>metrics:
  registries:
    - type: base
      enabled: false
    - type: vendor
      enables: false</markup>

</div>

<h5 id="_controlling_metrics_by_metric_name">Controlling Metrics by Metric Name</h5>
<div class="section">
<p>You can be even more selective. Within a registry type you can configure up to two regular expression patterns:</p>

<ul class="ulist">
<li>
<p>one matching metric names to <em>exclude</em>, and</p>

</li>
<li>
<p>one matching metric names to <em>include</em>.</p>

</li>
</ul>
<p>Helidon updates and reports a metric only if two conditions hold:</p>

<ul class="ulist">
<li>
<p>the metric name <em>does not</em> match the <code>exclude</code> regex pattern (if you define one), and</p>

</li>
<li>
<p>either</p>
<ul class="ulist">
<li>
<p>there is no <code>include</code> regex pattern, or</p>

</li>
<li>
<p>the metric name matches the <code>include</code> pattern.</p>

</li>
</ul>
</li>
</ul>
<div class="admonition caution">
<p class="admonition-textlabel">Caution</p>
<p ><p>Make sure any <code>include</code> regex pattern you specify matches <em>all</em> the metric names you want to capture.</p>
</p>
</div>
<p>Suppose your application creates and updates a group of metrics with names such as <code>myapp.xxx.queries</code>, <code>myapp.xxx.creates</code>, <code>myapp.xxx.updates</code>, and <code>myapp.xxx.deletes</code> where <code>xxx</code> can be either <code>supplier</code> or <code>customer</code>.</p>

<p>The following example gathers all metrics <em>except</em> those from your application regarding suppliers:</p>

<markup
lang="properties"
title="Disabling metrics by name (properties format)"
>metrics.registries.0.type = application
metrics.registries.0.filter.exclude = myapp\.supplier\..*</markup>

<p>The following settings select the particular subset of the metrics created in your application code representing updates of customers and suppliers:</p>

<markup
lang="properties"
title="Enabling metrics by name (properties format)"
>metrics.registries.0.type = application
metrics.registries.0.filter.include = myapp\..*\.updates</markup>

<p>If you use the YAML configuration format, enclose the regex patterns in single-quote marks:</p>

<markup
lang="yaml"
title="Enabling metrics by name (YAML format)"
>metrics:
  registries:
    - type: application
      filter:
        include: 'myapp\..*\.updates'</markup>

<p>The next example selects only your application&#8217;s metrics while excluding those which refer to deletions:</p>

<markup
lang="properties"
title="Combining <code>include</code> and <code>exclude</code>"
>metrics.registries.0.type = application
metrics.registries.0.filter.include = myapp\..*
metrics.registries.0.filter.exclude = myapp\..*/deletes</markup>

<p>Helidon would not update or report the metric <code>myapp.supplier.queries</code>, for example.
To  include metrics from your application for both updates and queries (but not for other operations), you could change the settings in the previous example to this:</p>

<markup


>metrics.registries.0.type = application
metrics.registries.0.filter.include = myapp\..*\.updates|myapp\..*\.queries
metrics.registries.0.filter.exclude = myapp\..*/deletes</markup>

<p>Your Helidon SE application can control the collection and reporting of metrics programmatically as well by preparing these settings objects:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/RegistryFilterSettings.html"><code>RegistryFilterSettings</code></a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/RegistrySettings.html"><code>RegistrySettings</code></a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/MetricsSettings.html"><code>MetricsSettings</code></a></p>

</li>
</ul>
<p>and using the resulting <code>MetricsSettings</code> to retrieve a suitable <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/RegistryFactory.html"><code>RegistryFactory</code></a>.</p>

<markup
lang="java"
title="Control metrics by registry type and name"
>import io.helidon.metrics.api.RegistryFilterSettings;
import org.eclipse.microprofile.metrics.MetricRegistry;
...
    RegistryFilterSettings appFilterSettings = RegistryFilterSettings.builder()  <span class="conum" data-value="1" />
        .include("myapp\..*\.updates")
        .build();
    RegistrySettings registrySettings = RegistrySettings.builder() <span class="conum" data-value="2" />
        .filterSettings(appFilterSettings)
        .build();
    MetricsSettings metricsSettings = MetricsSettings.builder() <span class="conum" data-value="3" />
        .registrySettings(MetricRegistry.Type.APPLICATION, appFilterSettings)
        .build();
    RegistryFactory rf = RegistryFactory.getInstance(metricsSettings); <span class="conum" data-value="4" />
    MetricRegistry registry = rf.getRegistry(MetricRegistry.Type.APPLICATION); <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Create the registry filter settings to include only those metrics with names indicating updates.</li>
<li data-value="2">Create the registry settings with that filter.</li>
<li data-value="3">Create the metrics settings, associating the registry settings with the <code>APPLICATION</code> metric registry.</li>
<li data-value="4">Set the overall metrics settings and retrieve a registry factory suitably initialized.</li>
<li data-value="5">Obtain a reference to the <code>APPLICATION</code> registry which is set up to create and report on only metrics with names starting with <code>myapp.updates.</code>.</li>
</ul>
</div>
</div>

<h4 id="extend-kpi">Collecting Extended Key Performance Indicator (KPI) Metrics</h4>
<div class="section">
<p>Any time you include the Helidon metrics module in your application, Helidon tracks two basic performance indicator metrics:</p>

<ul class="ulist">
<li>
<p>a <code>Counter</code> of all requests received (<code>requests.count</code>), and</p>

</li>
<li>
<p>a <code>Meter</code> of all requests received (<code>requests.meter</code>).</p>

</li>
</ul>
<p>Helidon SE also includes additional, extended KPI metrics which are disabled by default:</p>

<ul class="ulist">
<li>
<p>current number of requests in-flight - a <code>ConcurrentGauge</code> (<code>requests.inFlight</code>) of requests currently being processed</p>

</li>
<li>
<p>long-running requests - a <code>Meter</code> (<code>requests.longRunning</code>) measuring the rate at which Helidon processes requests which take at least a given amount of time to complete; configurable, defaults to 10000 milliseconds (10 seconds)</p>

</li>
<li>
<p>load - a <code>Meter</code> (<code>requests.load</code>) measuring the rate at which requests are worked on (as opposed to received)</p>

</li>
<li>
<p>deferred - a <code>Meter</code> (<code>requests.deferred</code>) measuring the rate at which a request&#8217;s processing is delayed after Helidon receives the request</p>

</li>
</ul>
<p>You can enable and control these metrics using configuration:</p>

<markup
lang="properties"
title="Configuration properties file controlling extended KPI metrics"
>metrics.key-performance-indicators.extended = true
metrics.key-performance-indicators.long-running.threshold-ms = 2000</markup>

<p>Your Helidon SE application can also control the KPI settings programmatically.</p>

<markup
lang="java"
title="Assign KPI metrics behavior from code"
>import io.helidon.metrics.api.KeyPerformanceIndicatorMetricsSettings;
import io.helidon.metrics.api.MetricsSettings;
import io.helidon.metrics.serviceapi.MetricsSupport;
import io.helidon.metrics.api.RegistryFactory;
...

    KeyPerformanceIndicatorMetricsSettings.Builder kpiSettingsBuilder =
        KeyPerformanceIndicatorMetricsSettings.builder()
            .extended(true)
            .longRunningThresholdMs(2000); <span class="conum" data-value="1" />

    MetricsSettings metricsSettings = MetricsSettings.builder()
            .keyPerformanceIndicatorSettings(kpiSettingsBuilder)
            .build(); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/KeyPerformanceIndicatorMetricsSettings.html"><code>KeyPerformanceIndicatorMetricsSettings</a></code> instance (via its <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/KeyPerformanceIndicatorMetricsSettings.Builder.html"><code>Builder</code></a>) with non-default values.</li>
<li data-value="2">Create a <a id="" title="" target="_blank" href="./apidocs/io.helidon.metrics.api/io/helidon/metrics/api/MetricsSettings.html"><code>MetricsSettings</a></code> instance reflecting the KPI settings.</li>
</ul>
</div>
</div>

<h3 id="_metrics_metadata">Metrics Metadata</h3>
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
type: The type of metric: <code>Counter</code>, <code>Timer</code>, <code>Meter</code>, <code>Histogram</code>, <code>SimpleTimer</code>, or <code>Gauge</code>.

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

<h3 id="_application_specific_metrics_data">Application-Specific Metrics Data</h3>
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


<h4 id="_counter_metric">Counter Metric</h4>
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

<h4 id="_meter_metric">Meter Metric</h4>
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

<h4 id="_timer_metric">Timer Metric</h4>
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

<h4 id="_histogram_metric">Histogram Metric</h4>
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

<h4 id="_gauge_metric">Gauge Metric</h4>
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

<h4 id="simple_timer_metric">Simple Timer Metric</h4>
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

<h4 id="_kubernetes_integration">Kubernetes Integration</h4>
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
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>31143</code>.</li>
</ul>
<markup
lang="bash"
title="Verify the metrics endpoint using port <code>30116</code>, your port will likely be different:"
>curl http://localhost:31143/metrics</markup>

<div class="admonition note">
<p class="admonition-inline">Leave the application running in Kubernetes since it will be used for Prometheus integration.</p>
</div>
</div>

<h4 id="_prometheus_integration">Prometheus Integration</h4>
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

<h4 id="_final_cleanup">Final Cleanup</h4>
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