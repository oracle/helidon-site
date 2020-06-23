<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Kubernetes Probes</dt>
<dd slot="desc"><p>This document describes how to use the Helidon health check API with Kubernetes.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_about_kubernetes_probes">About Kubernetes probes</h2>
<div class="section">
<p>Probes is the term used by Kubernetes to describe health checks for containers
 (<a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes">Kubernetes documentation</a>).</p>

<p>There are two types of probes:</p>

<ul class="ulist">
<li>
<p><code>liveness</code>: Indicates whether the container is running</p>

</li>
<li>
<p><code>readiness</code>: Indicates whether the container is ready to service requests</p>

</li>
</ul>
<p>You can implement probes using the following mechanisms:</p>

<ol style="margin-left: 15px;">
<li>
Running a command inside a container

</li>
<li>
Sending an <code>HTTP</code> request to a container

</li>
<li>
Opening a <code>TCP</code> socket to a container

</li>
</ol>
<p>A microservice exposed to HTTP traffic will typically implement both the
 liveness probe and the readiness probe using HTTP requests.</p>

<p>You can configure several parameters for probes. The following are the most
 relevant parameters:</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 28.571%;">
<col style="width: 71.429%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class=""><code>initialDelaySeconds</code></td>
<td class="">Number of seconds after the container has started before liveness or readiness
 probes are initiated.</td>
</tr>
<tr>
<td class=""><code>periodSeconds</code></td>
<td class="">Probe interval. Default to 10 seconds. Minimum value is 1.</td>
</tr>
<tr>
<td class=""><code>timeoutSeconds</code></td>
<td class="">Number of seconds after which the probe times out. Defaults to 1 second.
 Minimum value is 1</td>
</tr>
<tr>
<td class=""><code>failureThreshold</code></td>
<td class="">Number of consecutive failures after which the probe should stop. Default: 3.
 Minimum: 1.</td>
</tr>
</tbody>
</table>
</div>

<h3 id="_liveness_probe">Liveness probe</h3>
<div class="section">
<p>The liveness probe is used to verify the container has become unresponsive.
 For example, it can be used to detect deadlocks or analyze heap usage. When
 Kubernetes gives up on a liveness probe, the corresponding pod is restarted.</p>

<div class="admonition note">
<p class="admonition-inline">The liveness probe can result in repeated restarts in certain cases.
 For example, if the probe is implemented to check all the dependencies
 strictly, then it can fail repeatedly for temporary issues. Repeated restarts
 can also occur if <code>timeoutSeconds</code> or <code>periodSeconds</code> is too low.</p>
</div>
<p>We recommend the following:</p>

<ul class="ulist">
<li>
<p>Avoid checking dependencies in a liveness probe.</p>

</li>
<li>
<p>Set <code>timeoutSeconds</code> to avoid excessive probe failures.</p>

</li>
<li>
<p>Acknowledge startup times with <code>initialDelaySeconds</code>.</p>

</li>
</ul>
</div>

<h3 id="_readiness_probe">Readiness probe</h3>
<div class="section">
<p>The readiness probe is used to avoid routing requests to the pod until it is
 ready to accept traffic. When Kubernetes gives up on a readiness probe, the
 pod is not restarted, traffic is not routed to the pod anymore.</p>

<div class="admonition note">
<p class="admonition-inline">In certain cases, the readiness probe can cause all the pods to be removed
 from service routing. For example, if the probe is implemented to check all the
 dependencies strictly, then it can fail repeatedly for temporary issues. This
 issue can also occur if <code>timeoutSeconds</code> or <code>periodSeconds</code> is too low.</p>
</div>
<p>We recommend the following:</p>

<ul class="ulist">
<li>
<p>Be conservative when checking shared dependencies.</p>

</li>
<li>
<p>Be aggressive when checking local dependencies.</p>

</li>
<li>
<p>Set <code>failureThreshold</code> according to <code>periodSeconds</code> in order to accommodate
temporary errors.</p>

</li>
</ul>
</div>
</div>

<h2 id="_troubleshooting_probes">Troubleshooting probes</h2>
<div class="section">
<p>Failed probes are recorded as events associated with their corresponding pods.
 The event message contains only the status code.</p>

<markup
lang="bash"
title="Get the events of a single pod:"
>POD_NAME=$(kubectl get pod -l app=acme -o jsonpath='{.items[0].metadata.name}') <span class="conum" data-value="1" />
kubectl get event --field-selector involvedObject.name=${POD_NAME} <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Get the effective pod name by filtering pods with the label <code>app=acme</code>.</li>
<li data-value="2">Filter the events for the pod.</li>
</ul>
<div class="admonition tip">
<p class="admonition-inline">Create log messages in your health check implementation when setting a
 <code>DOWN</code> status. This will allow you to correlate the cause of a failed probe.</p>
</div>
</div>

<h2 id="_example">Example</h2>
<div class="section">
<p>This example shows the usage of the Helidon health API in an application that
 implements health endpoints for the liveness and readiness probes. Note that
 the application code dissociates the health endpoints from the default routes,
 so that the health endpoints are not exposed by the service. An example YAML
 specification is also provided for the Kubernetes service and deployment.</p>

<markup
lang="java"
title="Application code:"
>Routing healthRouting = Routing.builder()
        .register(JsonSupport.create())
        .register(HealthSupport.builder()
                .webContext("/live") <span class="conum" data-value="1" />
                .addLiveness(HealthChecks.healthChecks()) <span class="conum" data-value="2" />
                .build())
        .register(HealthSupport.builder()
                .webContext("/ready") <span class="conum" data-value="3" />
                .addReadiness(() -&gt; HealthCheckResponse.named("database").up().build()) <span class="conum" data-value="4" />
                .build())
        .build();

Routing defaultRouting = Routing.builder()
        .any((req, res) -&gt; res.send("It works!")) <span class="conum" data-value="5" />
        .build();

WebServer server = WebServer.builder(defaultRouting)
        .config(ServerConfiguration.builder()
                .port(8080) <span class="conum" data-value="6" />
                .addSocket("health", SocketConfiguration.builder() <span class="conum" data-value="7" />
                        .port(8081)
                        .build())
                .build())
        .addNamedRouting("health", healthRouting) <span class="conum" data-value="8" />
        .build();

server.start();</markup>

<ul class="colist">
<li data-value="1">The health service for the <code>liveness</code> probe is exposed at <code>/live</code>.</li>
<li data-value="2">Using the built-in health checks for the <code>liveness</code> probe.</li>
<li data-value="3">The health service for the <code>readiness</code> probe is exposed at <code>/ready</code>.</li>
<li data-value="4">Using a custom health check for a pseudo database that is always <code>UP</code>.</li>
<li data-value="5">The default route: returns It works! for any request.</li>
<li data-value="6">The server uses port 8080 for the default routes.</li>
<li data-value="7">A socket configuration named <code>health</code> using port <code>8081</code>.</li>
<li data-value="8">Route the health services exclusively on the <code>health</code> socket.</li>
</ul>
<markup
lang="yaml"
title="Kubernetes descriptor:"
>kind: Service
apiVersion: v1
metadata:
  name: acme <span class="conum" data-value="1" />
  labels:
    app: acme
spec:
  type: NodePort
  selector:
    app: acme
  ports:
  - port: 8080
    targetPort: 8080
    name: http
---
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: acme <span class="conum" data-value="2" />
spec:
  replicas: 1
  template:
    metadata:
      name: acme
      labels:
        name: acme
    spec:
      containers:
      - name: acme
        image: acme
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /live <span class="conum" data-value="3" />
            port: 8081
          initialDelaySeconds: 3 <span class="conum" data-value="4" />
          periodSeconds: 10
          timeoutSeconds: 3
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready <span class="conum" data-value="5" />
            port: 8081
          initialDelaySeconds: 10 <span class="conum" data-value="6" />
          periodSeconds: 30
          timeoutSeconds: 10
---</markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>8080</code>.</li>
<li data-value="2">A deployment with one replica of a pod.</li>
<li data-value="3">The HTTP endpoint for the liveness probe.</li>
<li data-value="4">The liveness probe configuration.</li>
<li data-value="5">The HTTP endpoint for the readiness probe.</li>
<li data-value="6">The readiness probe configuration.</li>
</ul>
</div>
</doc-view>