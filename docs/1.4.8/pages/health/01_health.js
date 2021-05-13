<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Health Checks</dt>
<dd slot="desc"><p>This document describes the health check API available with Helidon SE.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_about_health_checks">About health checks</h2>
<div class="section">
<p>It’s a good practice to monitor your microservice’s health, to ensure that it is
 available and performs correctly.</p>

<p>Applications implement health checks to expose health status that is collected
 at regular intervals by external tooling, such as orchestrators like
 Kubernetes. The orchestrator may then take action, such as restarting your
 application if the health check fails.</p>

<p>A typical health check combines the statuses of all the dependencies that
 affect availability and the ability to perform correctly:</p>

<ul class="ulist">
<li>
<p>network latency</p>

</li>
<li>
<p>storage</p>

</li>
<li>
<p>database</p>

</li>
<li>
<p>other services used by your application</p>

</li>
</ul>

<h3 id="_prerequisites">Prerequisites</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-health&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="xml"
title="Optional dependency to use built-in health checks:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-health-checks&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</div>

<h2 id="_api_overview">API overview</h2>
<div class="section">
<div class="block-title"><span>Health check API classes</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 40%;">
<col style="width: 60%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td><code>org.eclipse.microprofile.health.HealthCheck</code></td>
<td>Java functional interface representing the logic of a single health check</td>
</tr>
<tr>
<td><code>org.eclipse.microprofile.health.HealthCheckResponse</code></td>
<td>Result of a health check invocation that contains a state and a description.</td>
</tr>
<tr>
<td><code>org.eclipse.microprofile.health.HealthCheckResponseBuilder</code></td>
<td>Builder class to create <code>HealthCheckResponse</code> instances</td>
</tr>
<tr>
<td><code>io.helidon.health.HealthSupport</code></td>
<td>WebServer service that exposes <code>/health</code> and invokes the registered health
 checks</td>
</tr>
<tr>
<td><code>io.helidon.health.HealthSupport.Builder</code></td>
<td>Builder class to create <code>HealthSupport</code> instances</td>
</tr>
</tbody>
</table>
</div>
<p>A health check is a Java functional interface that returns a
 <code>HealthCheckResponse</code> object. You can choose to implement a health check
 inline with a lambda expression or you can reference a method with the double
 colon operator <code>::</code>.</p>

<markup
lang="java"
title="Health check with a lambda expression:"
>HealthCheck hc = () -&gt; HealthCheckResponse
        .named("exampleHealthCheck")
        .up()
        .build();</markup>

<markup
lang="java"
title="Health check with method reference:"
>HealthCheckResponse exampleHealthCheck(){
    return HealthCheckResponse
        .named("exampleHealthCheck")
        .up()
        .build();
}
HealthCheck hc = this::exampleHealthCheck;</markup>

<p><code>HealthSupport</code> is a WebServer service that contains a collection of
 registered <code>HealthCheck</code> instances. When queried, it invokes the registered
 health check and returns a response with a status code representing the overall
 state of the application.</p>

<div class="block-title"><span>Health status codes</span></div>
<div class="table__overflow elevation-1 flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 83.333%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td><code>200</code></td>
<td>The application is healthy.</td>
</tr>
<tr>
<td><code>503</code></td>
<td>The application is not healthy.</td>
</tr>
<tr>
<td><code>500</code></td>
<td>An error occurred while reporting the health.</td>
</tr>
</tbody>
</table>
</div>
<p>The HTTP response also contains a JSON payload that describes the statuses for
 all health checks.</p>

<markup
lang="java"
title="Create the health support service:"
>HealthSupport health = HealthSupport.builder()
    .addLiveness(hc)
    .build();</markup>

<div class="admonition note">
<p class="admonition-inline">Health check requires the <code>JSON-P</code> support to be enabled. See the example
 below.</p>
</div>

<h3 id="_example">Example</h3>
<div class="section">
<markup
lang="java"
title="Register a custom health check:"
>HealthSupport health = HealthSupport.builder()
    .addLiveness(() -&gt; HealthCheckResponse.named("exampleHealthCheck")
                 .up()
                 .withData("time", System.currentTimeMillis())
                 .build()) <span class="conum" data-value="1" />
    .build();

Routing.builder()
        .register(JsonSupport.create()) <span class="conum" data-value="2" />
        .register(health) <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Add a custom health check. This example returns <code>UP</code> and current time.</li>
<li data-value="2">Enable support for <code>JSON</code>.</li>
<li data-value="3">Register health support with web server routing (adds the <code>/health</code>
endpoint).</li>
</ul>
<div class="admonition tip">
<p class="admonition-inline">Balance collecting a lot of information with the need to avoid overloading
 the application and overwhelming users.</p>
</div>
<markup
lang="json"
title="JSON response:"
>{
    "outcome": "UP",
    "status": "UP",
    "checks": [
        {
            "name": "exampleHealthCheck",
            "state": "UP",
            "data": {
                "time": 1546958376613
            }
        }
    ]
}</markup>

</div>

<h3 id="_built_in_health_checks">Built-in health-checks</h3>
<div class="section">
<p>You can use Helidon-provided health checks to report various
common health check statuses:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 4.348%;">
<col style="width: 4.348%;">
<col style="width: 13.043%;">
<col style="width: 65.217%;">
<col style="width: 13.044%;">
</colgroup>
<thead>
<tr>
<th>Built-in health check</th>
<th>Health check name</th>
<th>JavaDoc</th>
<th>Config properties</th>
<th>Default config value</th>
</tr>
</thead>
<tbody>
<tr>
<td>deadlock detection</td>
<td><code>deadlock</code></td>
<td><a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/health/checks/DeadlockHealthCheck.html"><code>DeadlockHealthCheck</code></a></td>
<td>n/a</td>
<td>n/a</td>
</tr>
<tr>
<td>available disk space</td>
<td><code>diskSpace</code></td>
<td><a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/health/checks/DiskSpaceHealthCheck.html"><code>DiskSpaceHealthCheck</code></a></td>
<td><code>helidon.healthCheck.diskSpace.thresholdPercent</code><br>
<br>
<code>helidon.healthCheck.diskSpace.path</code></td>
<td><code>99.999</code><br>
<br>
<code>/</code></td>
</tr>
<tr>
<td>available heap memory</td>
<td><code>heapMemory</code></td>
<td><a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/health/checks/HeapMemoryHealthCheck.html"><code>HeapMemoryHealthCheck</code></a></td>
<td><code>helidon.healthCheck.heapMemory.thresholdPercent</code></td>
<td><code>98</code></td>
</tr>
</tbody>
</table>
</div>
<p>The following code adds the default built-in health checks to your application:</p>

<markup
lang="java"

>HealthSupport health = HealthSupport.builder()
    .addLiveness(HealthChecks.healthChecks()) <span class="conum" data-value="1" />
    .build();

Routing.builder()
        .register(JsonSupport.create()) <span class="conum" data-value="2" />
        .register(health) <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Add built-in health checks  using defaults (requires the <code>helidon-health-checks</code>
dependency).</li>
<li data-value="2">Register the <code>JSON-P</code> support in the web server routing.</li>
<li data-value="3">Register the created health support with web server routing (adds the
<code>/health</code> endpoint).</li>
</ul>
<p>You can control the thresholds for built-in health checks in either of two ways:</p>

<ul class="ulist">
<li>
<p>Create the health checks individually
using their builders instead of using the <code>HealthChecks</code> convenience class.
Follow the JavaDoc links in the <router-link to="#built-in-health-checks-table" @click.native="this.scrollFix('#built-in-health-checks-table')">table</router-link> above.</p>

</li>
<li>
<p>Configure the behavior of the built-in health checks using the config property keys in the
<router-link to="#built-in-health-checks-table" @click.native="this.scrollFix('#built-in-health-checks-table')">table</router-link>.</p>

</li>
</ul>
<p>Further, you can suppress one or more of the built-in health checks by setting the configuration item
<code>helidon.health.exclude</code> to a comma-separated list of the health check names
(from the <router-link to="#built-in-health-checks-table" @click.native="this.scrollFix('#built-in-health-checks-table')">table</router-link>) you want to exclude.</p>

</div>
</div>

<h2 id="_health_report">Health report</h2>
<div class="section">
<p>Accessing the Helidon-provided <code>/health</code> endpoint reports the health of your application:</p>

<markup
lang="json"
title="JSON response."
>{
    "outcome": "UP",
    "status": "UP",
    "checks": [
        {
            "name": "deadlock",
            "state": "UP"
        },
        {
            "name": "diskSpace",
            "state": "UP",
            "data": {
                "free": "211.00 GB",
                "freeBytes": 226563444736,
                "percentFree": "45.31%",
                "total": "465.72 GB",
                "totalBytes": 500068036608
            }
        },
        {
            "name": "heapMemory",
            "state": "UP",
            "data": {
                "free": "215.15 MB",
                "freeBytes": 225600496,
                "max": "3.56 GB",
                "maxBytes": 3817865216,
                "percentFree": "99.17%",
                "total": "245.50 MB",
                "totalBytes": 257425408
            }
        }
    ]
}</markup>


<h3 id="_strict_json_output">Strict JSON Output</h3>
<div class="section">
<p>The JSON responses shown above contain properties <code>"status"</code> and <code>"outcome"</code> with the same
values. Helidon reports both of these to maintain backward compatibility with older
versions of MicroProfile Health. This behavior can be disabled by setting
the property <code>health.backward-compatible</code> to <code>false</code>, in which case only <code>"status"</code>
is reported. Future versions of Helidon will drop support for older versions of Health,
so it is recommended to rely on <code>"status"</code> instead of <code>"outcome"</code> in your applications.</p>

</div>
</div>
</doc-view>