<doc-view>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>Helidon SE provides the following to support health checks:</p>

<ol style="margin-left: 15px;">
<li>
The endpoint <code>/health</code>: A configurable endpoint that exposes health checks in JSON
format as described by the MicroProfile Health specification

</li>
<li>
A base set of health checks (a separate library <code>io.helidon.health:helidon-health-checks</code>)

</li>
</ol>
<p>The Health Check component in Helidon SE is the core for the Helidon MP implementation of the MicroProfile Health specification.</p>


<h3 id="_prerequisites">Prerequisites</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-health&lt;/artifactId&gt;
    &lt;/dependency&gt;</markup>

<p>To enable the built-in health checks, add the following dependency:</p>

<markup
lang="xml"

>    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-health-checks&lt;/artifactId&gt;
    &lt;/dependency&gt;</markup>

</div>

<h3 id="_adding_health_checks_to_your_application">Adding health checks to your application</h3>
<div class="section">
<p>To enable health checks, register them with the web server.</p>

<markup
lang="java"

>import io.helidon.metrics.MetricsSupport;
//...
HealthSupport health = HealthSuport.builder()
    .add(HealthChecks.healthChecks())               <span class="conum" data-value="1" />
    .add(() -&gt; HealthCheckResponse.named("exampleHealthCheck")
                 .up()
                 .withData("time", System.currentTimeMillis())
                 .build())                          <span class="conum" data-value="2" />
    .build();

Routing.builder()
        .register(health)                           <span class="conum" data-value="3" />
        .register("/hello", (req, res) -&gt; res.send("HelloWorld"))
        .build();</markup>

<ul class="colist">
<li data-value="1">Add built-in health checks (requires the <code>helidon-health-checks</code> dependency)</li>
<li data-value="2">Add a custom health check. This example returns <code>UP</code> and current time</li>
<li data-value="3">Register health support with web server routing (adds the <code>/health</code> endpoint)</li>
</ul>
</div>

<h3 id="_accessing_the_health_check_endpoint">Accessing the health check endpoint</h3>
<div class="section">
<p>You can get health-check data through the <code>/health</code> endpoint.</p>

<p>The following is an example of the response (in JSON format) to a health-check request, based on the built-in and custom
    health checks implemented in the example provided earlier:</p>

<markup
lang="json"

>{
    "outcome": "UP",
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
            "name": "exampleHealthCheck",
            "state": "UP",
            "data": {
                "time": 1546958376613
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

</div>
</div>
</doc-view>