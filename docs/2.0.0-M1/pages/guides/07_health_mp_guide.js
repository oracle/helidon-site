<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Health Check MP Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample MicroProfile (MP) project
that can be used to run some basic examples using both built-in and custom health-checks with Helidon MP.</p>
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

<h3 id="_create_a_sample_mp_project">Create a sample MP project</h3>
<div class="section">
<p>Generate the project sources using the Helidon MP Maven archetype.
The result is a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype:"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.0.0-M1 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

</div>

<h3 id="_using_the_built_in_health_checks">Using the built-in health-checks</h3>
<div class="section">
<p>Helidon has a set of built-in health-checks that are automatically enabled to report various
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
from the root directory of your project (helidon-quickstart-mp).</p>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-mp.jar</markup>

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
        "free": "325.54 GB",
        "freeBytes": 349543358464,
        "percentFree": "69.91%",
        "total": "465.63 GB",
        "totalBytes": 499963174912
      }
    },
    {
      "name": "heapMemory",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "230.87 MB",
        "freeBytes": 242085696,
        "max": "3.56 GB",
        "maxBytes": 3817865216,
        "percentFree": "98.90%",
        "total": "271.00 MB",
        "totalBytes": 284164096
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
<p>You can create application-specific custom health-checks and integrate them with Helidon
using CDI.  The following example shows how to add a custom liveness health-check.</p>

<markup
lang="java"
title="Create a new <code>GreetLivenessCheck</code> class with the following content:"
>package io.helidon.examples.quickstart.mp;

import javax.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;

@Liveness <span class="conum" data-value="1" />
@ApplicationScoped <span class="conum" data-value="2" />
public class GreetLivenessCheck implements HealthCheck {
  private GreetingProvider provider;

  @Override
  public HealthCheckResponse call() {
    return HealthCheckResponse.named("LivenessCheck")  <span class="conum" data-value="3" />
        .up()
        .withData("time", System.currentTimeMillis())
        .build();
  }
}</markup>

<ul class="colist">
<li data-value="1">Annotation indicating this is a liveness health-check.</li>
<li data-value="2">Annotation indicating there is a single liveness <code>HealthCheck</code> object during the lifetime of the application.</li>
<li data-value="3">Build the HealthCheckResponse with status <code>UP</code> and the current time.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify the custom liveness health endpoint:"
>curl http://localhost:8080/health/live</markup>

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
        "time": 1566338255331
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
title="Create a new <code>GreetReadinessCheck</code> class with the following content:"
>package io.helidon.examples.quickstart.mp;

import java.time.Duration; <span class="conum" data-value="1" />
import java.util.concurrent.atomic.AtomicLong;
import javax.enterprise.context.ApplicationScoped;

import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;

@Readiness <span class="conum" data-value="2" />
@ApplicationScoped
public class GreetReadinessCheck implements HealthCheck {
  private AtomicLong readyTime = new AtomicLong(0);


  @Override
  public HealthCheckResponse call() {
    return HealthCheckResponse.named("ReadinessCheck")  <span class="conum" data-value="3" />
        .state(isReady())
        .withData("time", readyTime.get())
        .build();
  }

  public void onStartUp(
      @Observes @Initialized(ApplicationScoped.class) Object init) {
    readyTime = new AtomicLong(System.currentTimeMillis()); <span class="conum" data-value="4" />
  }

  /**
   * Become ready after 5 seconds
   *
   * @return true if application ready
   */
  private boolean isReady() {
    return Duration.ofMillis(System.currentTimeMillis() - readyTime.get()).getSeconds() &gt;= 5;
  }
}</markup>

<ul class="colist">
<li data-value="1">Include additional imports.</li>
<li data-value="2">Annotation indicating that this is a readiness health-check.</li>
<li data-value="3">Build the <code>HealthCheckResponse</code> with status <code>UP</code> after five seconds, else <code>DOWN</code>.</li>
<li data-value="4">Initialize the time at startup.</li>
</ul>
<markup
lang="bash"
title="Build and run the application.  Issue the curl command with -v within five seconds and you will see that the application is not ready:"
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
        "time": 1566399775700
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
        "time": 1566399775700
      }
    }
  ]
}</markup>

<ul class="colist">
<li data-value="1">The HTTP status is <code>200</code> indicating that the application is ready.</li>
</ul>
<p>When using the health-check URLs, you can get the following health-check data:</p>

<ul class="ulist">
<li>
<p>custom liveness only - <a id="" title="" target="_blank" href="http://localhost:8080/health/live">http://localhost:8080/health/live</a></p>

</li>
<li>
<p>custom readiness only -  <a id="" title="" target="_blank" href="http://localhost:8080/health/ready">http://localhost:8080/health/ready</a></p>

</li>
<li>
<p>all health-check data -  <a id="" title="" target="_blank" href="http://localhost:8080/health">http://localhost:8080/health</a></p>

</li>
</ul>
<markup
lang="bash"
title="Get all the health-check data, including custom data:"
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
        "time": 1566403431536
      }
    },
    {
      "name": "ReadinessCheck",
      "state": "UP",
      "status": "UP",
      "data": {
        "time": 1566403280639
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
        "free": "325.50 GB",
        "freeBytes": 349500698624,
        "percentFree": "69.91%",
        "total": "465.63 GB",
        "totalBytes": 499963174912
      }
    },
    {
      "name": "heapMemory",
      "state": "UP",
      "status": "UP",
      "data": {
        "free": "231.01 MB",
        "freeBytes": 242235928,
        "max": "3.56 GB",
        "maxBytes": 3817865216,
        "percentFree": "98.79%",
        "total": "275.00 MB",
        "totalBytes": 288358400
      }
    }
  ]
}</markup>

</div>

<h3 id="_custom_health_root_path_and_port">Custom health root path and port</h3>
<div class="section">
<p>You can specify a custom port and root context for the root health endpoint path.
However, you cannot use different ports, such as <a id="" title="" target="_blank" href="http://localhost:8080/myhealth">http://localhost:8080/myhealth</a> and <a id="" title="" target="_blank" href="http://localhost:8081/myhealth/live">http://localhost:8081/myhealth/live</a>.
Likewise, you cannot use different paths, such as <a id="" title="" target="_blank" href="http://localhost:8080/health">http://localhost:8080/health</a> and <a id="" title="" target="_blank" href="http://localhost:8080/probe/live">http://localhost:8080/probe/live</a>.</p>

<p>The example below will change the root path.</p>

<markup
lang="yaml"
title="Create a file named <code>application.yaml</code> in the <code>resources</code> directory with the following contents:"
>health:
  web-context: "myhealth"  <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">The web-context specifies a new root path for the health endpoint.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify that the health endpoint is using the new <code>/myhealth</code> root:"
>curl http://localhost:8080/myhealth
curl http://localhost:8080/myhealth/live
curl http://localhost:8080/myhealth/ready</markup>

<p>The following example will change the root path and the health port.</p>

<markup
lang="yaml"
title="Update application.yaml to use a different port and root path for the health endpoint:"
>server:
  port: 8080  <span class="conum" data-value="1" />
  host: "localhost"
  sockets:
    health: <span class="conum" data-value="2" />
      port: 8081 <span class="conum" data-value="3" />
      bind-address: "localhost"
health:
  routing: "health" <span class="conum" data-value="4" />
  web-context: "myhealth"</markup>

<ul class="colist">
<li data-value="1">The default port for the application.</li>
<li data-value="2">The name of the new socket, it can be any name, this example uses <code>health</code>.</li>
<li data-value="3">The port for the new health socket.</li>
<li data-value="4">The health endpoint routing uses the new socket <code>health</code>.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then verify the health endpoint using port <code>8081</code> and <code>/myhealth</code>:"
>curl http://localhost:8081/myhealth
curl http://localhost:8081/myhealth/live
curl http://localhost:8081/myhealth/ready</markup>

</div>

<h3 id="_using_liveness_and_readiness_health_checks_with_kubernetes">Using Liveness and Readiness health-checks with Kubernetes</h3>
<div class="section">
<p>The following example shows how to integrate the Helidon health API with an application that implements
health endpoints for the Kubernetes liveness and readiness probes.</p>

<p><strong>Delete the contents of <code>application.yaml</code> so that the default health endpoint path and port are used.</strong></p>

<markup
lang="bash"
title="Rebuild and start the application, then verify the health endpoint:"
>curl http://localhost:8080/health</markup>

<markup
lang="bash"
title="Stop the application and build the docker image:"
>docker build -t helidon-quickstart-mp .</markup>

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
          image: helidon-quickstart-mp
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
title="Verify the health endpoints using port '30116', your port may be different. The JSON response will be the same as your previous test:"
>curl http://localhost:30116/health</markup>

<markup
lang="bash"
title="Delete the application, cleaning up Kubernetes resources:"
>kubectl delete -f ./health.yaml</markup>

</div>

<h3 id="_summary">Summary</h3>
<div class="section">
<p>This guide demonstrated how to use health-check in a Helidon MP application as follows:</p>

<ul class="ulist">
<li>
<p>Access the default health-check</p>

</li>
<li>
<p>Create and use custom readiness and liveness checks</p>

</li>
<li>
<p>Customize the health-check root path and port</p>

</li>
<li>
<p>Integrate Helidon health-check with Kubernetes</p>

</li>
</ul>
<p>Please refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p>MicroProfile health-check specification at <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-health/releases/tag/2.0">https://github.com/eclipse/microprofile-health/releases/tag/2.0</a></p>

</li>
<li>
<p>MicroProfile health-check Javadoc at <a id="" title="" target="_blank" href="https://javadoc.io/doc/org.eclipse.microprofile.health/microprofile-health-api/2.0">https://javadoc.io/doc/org.eclipse.microprofile.health/microprofile-health-api/2.0</a></p>

</li>
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</div>
</doc-view>