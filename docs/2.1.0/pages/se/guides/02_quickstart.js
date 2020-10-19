<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE Quickstart</dt>
<dd slot="desc"><p>This guide describes a basic example of an Helidon SE application using Docker
 and Kubernetes.</p>
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
<td class="">About 5 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_generate_the_project">Generate The Project</h2>
<div class="section">
<p>Generate the project sources using one (or both) of the Helidon Maven
 archetypes. The result is a simple project that shows the basics of configuring
 the WebServer and implementing basic routing rules.</p>

<markup
lang="bash"
title="Run the Maven archetype"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=2.1.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

<p>The archetype generates a Maven project in your current directory
(for example, <code>helidon-quickstart-se</code>). Change into this directory.</p>

<markup
lang="bash"

>cd helidon-quickstart-se</markup>

<div class="admonition tip">
<p class="admonition-inline">If you want to use the generated project as a starter
for your own application, then you can replace groupId, artifactId
and package with values appropriate for your application.</p>
</div>
<markup
lang="bash"
title="Build the Application"
>mvn package</markup>

<p>The project builds an application jar for the example and saves all runtime
dependencies in the <code>target/libs</code> directory. This means you can easily start the
 application by running the application jar file:</p>

<markup
lang="bash"
title="Run the application"
>java -jar target/helidon-quickstart-se.jar</markup>

<p>The example is a very simple "Hello World" greeting service. It supports GET
 requests for generating a greeting message, and a PUT request for changing the
 greeting itself. The response is encoded using JSON.
For example:</p>

<markup
lang="bash"
title="Try the Application"
>curl -X GET http://localhost:8080/greet
{"message":"Hello World!"}

curl -X GET http://localhost:8080/greet/Joe
{"message":"Hello Joe!"}

curl -X PUT -H "Content-Type: application/json" -d '{"greeting" : "Hola"}' http://localhost:8080/greet/greeting

curl -X GET http://localhost:8080/greet/Jose
{"message":"Hola Jose!"}</markup>

</div>

<h2 id="_health_and_metrics">Health and Metrics</h2>
<div class="section">
<p>Helidon provides built-in support for health and metrics endpoints.</p>

<markup
lang="bash"
title="Health"
>curl -s -X GET http://localhost:8080/health</markup>

<markup
lang="bash"
title="Metrics in Prometheus Format"
>curl -s -X GET http://localhost:8080/metrics</markup>

<markup
lang="bash"
title="Metrics in JSON Format"
>curl -H 'Accept: application/json' -X GET http://localhost:8080/metrics</markup>

</div>

<h2 id="_build_a_docker_image">Build a Docker Image</h2>
<div class="section">
<p>The project also contains a Dockerfile so that you can easily build and run a
 Docker image. To build the Docker image, you need to have Docker installed and
 running on your system.</p>

<markup
lang="bash"
title="Docker build"
>docker build -t helidon-quickstart-se .</markup>

<markup
lang="bash"
title="Run Docker Image"
>docker run --rm -p 8080:8080 helidon-quickstart-se:latest</markup>

<p>Then you can try the application as you did before.</p>

</div>

<h2 id="_deploy_the_application_to_kubernetes">Deploy the application to Kubernetes</h2>
<div class="section">
<p>If you don&#8217;t have access to a Kubernetes cluster, you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>.
Then deploy the example:</p>

<markup
lang="bash"
title="Verify connectivity to cluster"
>kubectl cluster-info
kubectl get nodes</markup>

<markup
lang="bash"
title="Deploy the application to Kubernetes"
>kubectl create -f app.yaml
kubectl get pods                    # Wait for quickstart pod to be RUNNING</markup>

<p>The step above created a service that is exposed into any node port. Lookup
 the service to find the port.</p>

<markup
lang="bash"
title="Lookup the service"
>kubectl get service helidon-quickstart-se</markup>

<p>Note the PORTs. You can now exercise the application as you did before but use
 the second port number (the NodePort) instead of 8080. For example:</p>

<markup
lang="bash"

>curl -X GET http://localhost:31431/greet</markup>

<p>After you&#8217;re done, cleanup.</p>

<markup
lang="bash"
title="Remove the application from Kubernetes"
>kubectl delete -f app.yaml</markup>

</div>

<h2 id="_building_native_and_custom_runtime_images">Building Native and Custom Runtime Images</h2>
<div class="section">
<p>Helidon also includes support for GraalVM Native Images and Java Custom
Runtime Images. For more information see:</p>

<ul class="ulist">
<li>
<p><router-link to="/se/guides/36_graalnative">GraalVM Native Images</router-link></p>

</li>
<li>
<p><router-link to="/se/guides/37_jlink_image">Custom Runtime Images using <code>jlink</code></router-link></p>

</li>
</ul>
</div>

<h2 id="_the_helidon_cli">The Helidon CLI</h2>
<div class="section">
<p>With the Helidon CLI you can create additional types of Helidon applications and
use the "dev loop" to do fast, iterative development.
<router-link to="/about/05_cli">Try it now</router-link>.</p>

</div>
</doc-view>