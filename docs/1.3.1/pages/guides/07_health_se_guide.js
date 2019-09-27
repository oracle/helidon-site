<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Health Check SE Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample Helidon SE project
that can be used to run some basic examples using both built-in and custom health-checks.</p>
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

<div class="table__overflow elevation-1 flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>About 15 minutes</td>
</tr>
<tr>
<td><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>

<h3 id="_create_a_sample_se_project">Create a sample SE project</h3>
<div class="section">
<p>Generate the project sources using the Helidon SE Maven archetype.
The result is a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype:"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=1.3.1 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

</div>

<h3 id="_using_the_built_in_health_checks">Using the built-in health-checks</h3>
<div class="section">
<p>Helidon has a set of built-in health-checks that can be optionally enabled to report various
 health-check statuses that are commonly used:</p>

<ul class="ulist">
<li>
<p>deadlock detection</p>

</li>
<li>
<p>available disk space</p>

</li>
<li>
<p>available heap memory</p>

</li>
</ul>
<p>The following example will demonstrate how to use the built-in health-checks.  These examples are all executed
from the root directory of your project (helidon-quickstart-se).</p>

<markup
lang="xml"
title="Notice that the built-in health-check dependency is already in the project&#8217;s pom.xml file:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-health-checks&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="java"
title="Modify <code>Main.java</code>, import <code>HealthCheckReponse</code>, and replace the <code>createRouting</code> method:"
>import org.eclipse.microprofile.health.HealthCheckResponse;  <span class="conum" data-value="1" />

...

private static Routing createRouting(Config config) {

    HealthSupport health = HealthSupport.builder()
      .addLiveness(HealthChecks.healthChecks())  <span class="conum" data-value="2" />
      .build();

    return Routing.builder()
      .register(JsonSupport.create()) <span class="conum" data-value="3" />
      .register(health)  <span class="conum" data-value="4" />
      .build();
}</markup>

<ul class="colist">
<li data-value="1">Import <code>HealthCheckResponse</code>.</li>
<li data-value="2">Add built-in health-checks (requires the <code>helidon-health-checks</code>
dependency).</li>
<li data-value="3">Register the <code>JSON-P</code> support in the WebServer routing.</li>
<li data-value="4">Register the created health support with web server routing (adds the
<code>/health</code> endpoint).</li>
</ul>
<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-se.jar</markup>

<markup
lang="bash"
title="Verify the health endpoint in a new terminal window:"
>curl http://localhost:8080/health</markup>

<markup
lang="json"
title="JSON response:"
>{
  "outcome": "UP",
  "status": "UP",
  "checks": [
    {
      "name": "deadlock",
      "state": "UP",
      "status": "UP"
    },
    {
      "name": "diskSpace",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "319.58 GB",
        "freeBytes": 343144304640,
        "percentFree": "68.63%",
        "total": "465.63 GB",
        "totalBytes": 499963174912
      }
    },
    {
      "name": "heapMemory",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "196.84 MB",
        "freeBytes": 206404016,
        "max": "3.56 GB",
        "maxBytes": 3817865216,
        "percentFree": "98.66%",
        "total": "245.50 MB",
        "totalBytes": 257425408
      }
    }
  ]
}</markup>

<div class="admonition note">
<p class="admonition-inline">In MicroProfile Health 2.0 <code>outcome</code> and <code>state</code> were replaced by <code>status</code> in the JSON response wire format.
Helidon currently provides both fields for backwards compatibility, but use of <code>outcome</code> and <code>state</code> is deprecated
and will be removed in a future release. You should rely on <code>status</code> instead.</p>
</div>
</div>

<h3 id="_custom_liveness_health_checks">Custom liveness health-checks</h3>
<div class="section">
<p>You can create application specific custom health-checks and integrate them with Helidon
using the <code>HealthSupport</code> class, which is a  WebServer service that contains
a collection of registered <code>HealthCheck</code> instances. When queried, it invokes the registered
health-check and returns a response with a status code representing the overall
state of the application.</p>

<markup
lang="xml"
title="Notice the custom health-checks dependency is already in the project&#8217;s pom.xml file:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-health&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<markup
lang="java"
title="Replace the <code>HealthSupport</code> builder in the <code>Main.createRouting</code> method:"
>HealthSupport health = HealthSupport.builder()
  .addLiveness(() -&gt; HealthCheckResponse.named("LivenessCheck")
      .up()
      .withData("time", System.currentTimeMillis())
      .build()) <span class="conum" data-value="1" />
  .build();</markup>

<ul class="colist">
<li data-value="1">Add a custom liveness health-check. This example returns <code>UP</code> and current time.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify the custom health endpoint:"
>curl http://localhost:8080/health</markup>

<markup
lang="json"
title="JSON response:"
>{
    "outcome": "UP",
    "checks": [
        {
            "name": "LivenessCheck",
            "state": "UP",
            "data": {
                "time": 1546958376613
            }
        }
    ]
}</markup>

</div>

<h3 id="_custom_readiness_health_check">Custom readiness health-check</h3>
<div class="section">
<p>You can add a readiness check to indicate that the application is ready to be used.  In this
example, the server will wait five seconds before it becomes ready.</p>

<markup
lang="java"
title="Add a <code>readyTime</code> variable to the <code>Main</code> class, then set it five seconds after the application starts:"
>import java.util.concurrent.atomic.AtomicLong; <span class="conum" data-value="1" />

public final class Main {

  private static AtomicLong readyTime = new AtomicLong(0); <span class="conum" data-value="2" />
  ...

    static WebServer startServer() throws IOException {
    ...
      server.start() ...

        // Server threads are not daemon. No need to block. Just react.
      try {
        Thread.sleep(5000); <span class="conum" data-value="3" />
      } catch (InterruptedException e) {
        throw new RuntimeException(e);
      }

      readyTime.set(System.currentTimeMillis()); <span class="conum" data-value="4" />
      return server;</markup>

<ul class="colist">
<li data-value="1">Import AtomicLong.</li>
<li data-value="2">Declare the <code>readyTime</code> variable.</li>
<li data-value="3">Sleep five seconds.</li>
<li data-value="4">Set the <code>readyTime</code> to the time when the server became ready.</li>
</ul>
<markup
lang="java"
title="Add a readiness check to the <code>HealhSupport</code> builder in the <code>Main.createRouting</code> method:"
>HealthSupport health = HealthSupport.builder()
  .addLiveness(() -&gt; HealthCheckResponse.named("LivenessCheck")
      .up()
      .withData("time", System.currentTimeMillis())
      .build())
  .addReadiness(() -&gt; HealthCheckResponse.named("ReadinessCheck")
      .state (readyTime.get() != 0 )
      .withData( "time", readyTime.get())
      .build()) <span class="conum" data-value="1" />
  .build();</markup>

<ul class="colist">
<li data-value="1">Add the readiness check.</li>
</ul>
<markup
lang="bash"
title="Build and run the application.  Issue the curl command with -v within five seconds and you see the application is not ready:"
>curl -v  http://localhost:8080/health/ready</markup>

<markup
lang="json"
title="HTTP response:"
>...
&lt; HTTP/1.1 503 Service Unavailable <span class="conum" data-value="1" />
...
{
  "outcome": "DOWN",
  "status": "DOWN",
  "checks": [
    {
      "name": "ReadinessCheck",
      "state": "DOWN",
      "status": "DOWN",
      "data": {
        "time,": 0
      }
    }
  ]
}</markup>

<ul class="colist">
<li data-value="1">The HTTP status is <code>503</code> since the application is not ready.</li>
</ul>
<markup
lang="bash"
title="After five seconds you will see the application is ready:"
>curl -v http://localhost:8080/health/ready</markup>

<markup
lang="json"
title="JSON response:"
>...
&lt; HTTP/1.1 200 OK <span class="conum" data-value="1" />
...
{
  "outcome": "UP",
  "status": "UP",
  "checks": [
    {
      "name": "ReadinessCheck",
      "state": "UP",
      "status": "UP",
      "data": {
        "time,": 1566243562097
      }
    }
  ]
}</markup>

<ul class="colist">
<li data-value="1">The HTTP status is <code>200</code> indicating that the application is ready.</li>
</ul>
<p>When using the health-check URLs, you can get the following health-check data</p>

<ul class="ulist">
<li>
<p>liveness only - <a id="" title="" target="_blank" href="http://localhost:8080/health/live">http://localhost:8080/health/live</a></p>

</li>
<li>
<p>readiness only -  <a id="" title="" target="_blank" href="http://localhost:8080/health/ready">http://localhost:8080/health/ready</a></p>

</li>
<li>
<p>both -  <a id="" title="" target="_blank" href="http://localhost:8080/health">http://localhost:8080/health</a></p>

</li>
</ul>
<markup
lang="bash"
title="Get both liveness and readiness data from a single query:"
>curl http://localhost:8080/health</markup>

<markup
lang="json"
title="JSON response:"
>{
  "outcome": "UP",
  "status": "UP",
  "checks": [
    {
      "name": "LivenessCheck",
      "state": "UP",
      "status": "UP",
      "data": {
        "time": 1566244094548
      }
    },
    {
      "name": "ReadinessCheck",
      "state": "UP",
      "status": "UP",
      "data": {
        "time,": 1566244093012
      }
    }
  ]
}</markup>

</div>

<h3 id="_combine_built_in_and_custom_health_checks">Combine built-in and custom health-checks</h3>
<div class="section">
<p>You can combine built-in and custom health-checks using the same HealthSupport builder.</p>

<markup
lang="java"
title="Register a custom health-check in the <code>Main.createRouting</code> method:"
>HealthSupport health = HealthSupport.builder()
    .addLiveness(HealthChecks.healthChecks())  <span class="conum" data-value="1" />
    .addLiveness(() -&gt; HealthCheckResponse.named("LivenessCheck")
      .up()
      .withData("time", System.currentTimeMillis())
      .build())
    .addReadiness(() -&gt; HealthCheckResponse.named("ReadinessCheck")
      .state (readyTime.get() != 0 )
      .withData( "time", readyTime.get())
      .build())
    .build();</markup>

<ul class="colist">
<li data-value="1">Add the built-in health-checks back to <code>HealthSupport</code> builder.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify the health endpoint.  You will see both the built-in and custom health-check data:"
>curl http://localhost:8080/health</markup>

<markup
lang="json"
title="JSON response:"
>{
  "outcome": "UP",
  "status": "UP",
  "checks": [
    {
      "name": "LivenessCheck",
      "state": "UP",
      "status": "UP",
      "data": {
        "time": 1566245527673
      }
    },
    {
      "name": "ReadinessCheck",
      "state": "UP",
      "status": "UP",
      "data": {
        "time,": 1566245527620
      }
    },
    {
      "name": "deadlock",
      "state": "UP",
      "status": "UP"
    },
    {
      "name": "diskSpace",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "326.17 GB",
        "freeBytes": 350224424960,
        "percentFree": "70.05%",
        "total": "465.63 GB",
        "totalBytes": 499963174912
      }
    },
    {
      "name": "heapMemory",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "247.76 MB",
        "freeBytes": 259791680,
        "max": "4.00 GB",
        "maxBytes": 4294967296,
        "percentFree": "99.80%",
        "total": "256.00 MB",
        "totalBytes": 268435456
      }
    }
  ]
}</markup>

</div>

<h3 id="_custom_health_check_url_path">Custom health-check URL path</h3>
<div class="section">
<p>You can use a custom URL path for heath checks by setting the <code>WebContext</code>.  In the following example, only
the liveness URL is changed, but you can do the same for the readiness and default
health-checks.</p>

<markup
lang="java"
title="Register a custom URL path with the custom health-check in the <code>Main.createRouting</code> method:"
>HealthSupport health = HealthSupport.builder()
    .webContext("/probe/live")<span class="conum" data-value="1" />
    .addLiveness(() -&gt; HealthCheckResponse.named("livenessProbe")
      .up()
      .withData("time", System.currentTimeMillis())
      .build())
    .build();</markup>

<ul class="colist">
<li data-value="1">Change the liveness URL path using a <code>WebContext</code>.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify that the liveness endpoint is using the <code>/probe/live</code>:"
>curl http://localhost:8080/probe/live</markup>

<markup
lang="json"
title="JSON response:"
>{
  "outcome": "UP",
  "checks": [
    {
      "name": "livenessProbe",
      "state": "UP",
      "data": {
        "time": 1546958376613
      }
    }
  ]
}</markup>

</div>

<h3 id="_using_liveness_and_readiness_health_checks_with_kubernetes">Using Liveness and Readiness health-checks with Kubernetes</h3>
<div class="section">
<p>The following example shows how to integrate the Helidon health API in an application that implements
health endpoints for the Kubernetes liveness and readiness probes.</p>

<markup
lang="java"
title="Change the <code>HealthSupport</code> builder in the <code>Main.createRouting</code> method to use the built-in liveness checks, a custom liveness check, and a readiness check:"
>HealthSupport health = HealthSupport.builder()
    .addLiveness(HealthChecks.healthChecks()) <span class="conum" data-value="1" />
    .addLiveness(() -&gt; HealthCheckResponse.named("LivenessCheck")  <span class="conum" data-value="2" />
      .up()
      .withData("time", System.currentTimeMillis())
      .build())
    .addReadiness(() -&gt; HealthCheckResponse.named("ReadinessCheck")  <span class="conum" data-value="3" />
      .state (readyTime.get() != 0 )
      .withData( "time", readyTime.get())
      .build())
    .build();</markup>

<ul class="colist">
<li data-value="1">Add built-in health-checks.</li>
<li data-value="2">Add a custom liveness check.</li>
<li data-value="3">Add a custom readiness check.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify the liveness and readiness endpoints:"
>curl http://localhost:8080/health/live
curl http://localhost:8080/health/ready</markup>

<markup
lang="bash"
title="Stop the application and build the docker image:"
>docker build -t helidon-quickstart-se .</markup>

<markup
lang="yaml"
title="Create the Kubernetes YAML specification, named <code>health.yaml</code>, with the following content:"
>kind: Service
apiVersion: v1
metadata:
  name: helidon-health <span class="conum" data-value="1" />
  labels:
    app: helidon-health
spec:
  type: NodePort
  selector:
    app: helidon-health
  ports:
    - port: 8080
      targetPort: 8080
      name: http
---
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: helidon-health <span class="conum" data-value="2" />
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: helidon-health
        version: v1
    spec:
      containers:
        - name: helidon-health
          image: helidon-quickstart-se
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          livenessProbe:
            httpGet:
              path: /health/live <span class="conum" data-value="3" />
              port: 8080
            initialDelaySeconds: 5 <span class="conum" data-value="4" />
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /health/ready <span class="conum" data-value="5" />
              port: 8080
            initialDelaySeconds: 5 <span class="conum" data-value="6" />
            periodSeconds: 2
            timeoutSeconds: 3
---</markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>8080</code>.</li>
<li data-value="2">A deployment with one replica of a pod.</li>
<li data-value="3">The HTTP endpoint for the liveness probe.</li>
<li data-value="4">The liveness probe configuration.</li>
<li data-value="5">The HTTP endpoint for the readiness probe.</li>
<li data-value="6">The readiness probe configuration.</li>
</ul>
<markup
lang="bash"
title="Create and deploy the application into Kubernetes:"
>kubectl apply -f ./health.yaml</markup>

<markup
lang="bash"
title="Get the service information:"
>kubectl get service/helidon-health</markup>

<markup
lang="bash"

>NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
helidon-health   NodePort   10.107.226.62   &lt;none&gt;        8080:30116/TCP   4s <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>30116</code>.</li>
</ul>
<markup
lang="bash"
title="Verify the health endpoints using port '30116', your port may be different:"
>curl http://localhost:30116/health</markup>

<markup
lang="bash"
title="Delete the application, cleaning up Kubernetes resources:"
>kubectl delete -f ./health.yaml</markup>

</div>

<h3 id="_summary">Summary</h3>
<div class="section">
<p>This guide demonstrated how to use health-check in a Helidon SE application as follows:</p>

<ul class="ulist">
<li>
<p>Access the default health-check</p>

</li>
<li>
<p>Create and use custom readiness and liveness checks</p>

</li>
<li>
<p>Customize the health-check root path</p>

</li>
<li>
<p>Integrate Helidon health-check with Kubernetes</p>

</li>
</ul>
<p>Please refer to the following reference for additional information:</p>

<ul class="ulist">
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</div>
</doc-view>