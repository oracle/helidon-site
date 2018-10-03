<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Quickstart Examples</dt>
<dd slot="desc"><p>There are two quickstart samples, one for Helidon SE and one for Helidon
MP (MicroProfile). Generate the examples using Maven archetypes.
The resulting Maven projects contain support for Docker and Kubernetes.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Prerequisites</h2>
<div class="section">
<p>If you haven&#8217;t already, make sure you have satisfied the
<router-link to="/getting-started/01_prerequisites">system prerequisites</router-link></p>

</div>

<h2 >Generate The Project</h2>
<div class="section">
<p>Generate the project sources using one (or both) of the Helidon Maven archetypes.
Both examples result in a REST service that supports the same
REST API, but they implement it differently:</p>

<ol style="margin-left: 15px;">
<li>
The Helidon SE example implements the REST service using the Helidon WebServer
component directly. It shows the basics of configuring the WebServer
and implementing basic routing rules.

</li>
<li>
The Helidon MP example implements the REST service using the JAX-RS
support provided by the Helidon MicroProfile server.

</li>
</ol>
<markup
lang="bash"
title="Helidon SE Example"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=0.10.1 \
    -DgroupId=io.helidon.examples \
    -DartifactId=quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

<markup
lang="bash"
title="Helidon MP Example"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=0.10.1 \
    -DgroupId=io.helidon.examples \
    -DartifactId=quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<p>The archetype generates a Maven project in your current directory
(for example, <code>quickstart-mp</code>). Change into this directory.</p>

<markup
lang="bash"

>cd quickstart-*</markup>

<div class="admonition tip">
<p class="admonition-inline">If you want to use the generated project as a starter
for your own application, then you can replace groupId, artifactId
and package with values appropriate for your application.</p>
</div>
</div>

<h2 >Build the Application</h2>
<div class="section">
<p>For either example:</p>

<markup
lang="bash"

>mvn package</markup>

</div>

<h2 >Run the Application</h2>
<div class="section">
<p>The project builds an application jar for the example and
saves all runtime dependencies in the <code>target/libs</code> directory.
This means you can easily start the application by running the
application jar file:</p>

<markup
lang="bash"
title="Helidon SE Example"
>java -jar target/quickstart-se.jar</markup>

<markup
lang="bash"
title="Helidon MP Example"
>java -jar target/quickstart-mp.jar</markup>

</div>

<h2 >Try the Application</h2>
<div class="section">
<p>Both examples support the same REST interface, so you exercise both examples
the same way.</p>

<p>The example is a very simple "Hello World" greeting service. It supports
GET requests for generating a greeting message, and a PUT request for
changing the greeting itself. The response is encoded using JSON.
For example:</p>

<markup


>curl -X GET http://localhost:8080/greet
{"message":"Hello World!"}

curl -X GET http://localhost:8080/greet/Joe
{"message":"Hello Joe!"}

curl -X PUT http://localhost:8080/greet/greeting/Hola
{"greeting":"Hola"}

curl -X GET http://localhost:8080/greet/Jose
{"message":"Hola Jose!"}</markup>

</div>

<h2 >Build a Docker Image</h2>
<div class="section">
<p>The project also contains a Docker file so that you can easily
build and run a docker image. Because the example&#8217;s runtime
dependencies are already in <code>target/libs</code>, the Docker file is
pretty simple (see <code>target/Dockerfile</code>). To build the Docker
image, you need to have Docker installed and running on your system.</p>

<markup
lang="bash"
title="Helidon SE Example"
>docker build -t quickstart-se target</markup>

<markup
lang="bash"
title="Helidon MP Example"
>docker build -t quickstart-mp target</markup>

</div>

<h2 >Run Docker Image</h2>
<div class="section">
<markup
lang="bash"
title="Helidon SE Example"
>docker run --rm -p 8080:8080 quickstart-se:latest</markup>

<markup
lang="bash"
title="Helidon MP Example"
>docker run --rm -p 8080:8080 quickstart-mp:latest</markup>

<p>Then you can try the application as you did before.</p>

</div>

<h2  id="deploy-to-k8s">Deploy the application to Kubernetes</h2>
<div class="section">
<p>If you don&#8217;t have access to a Kubernetes cluster, you can
<router-link to="/getting-started/04_kubernetes">install one on your desktop</router-link>.
Then deploy the example:</p>

<markup
lang="bash"
title="Verify connectivity to cluster"
>kubectl cluster-info
kubectl get nodes</markup>

<markup
lang="bash"
title="Deploy the application to Kubernetes"
>kubectl create -f target/app.yaml
kubectl get pods                    # Wait for quickstart pod to be RUNNING</markup>

</div>

<h2 >Exercise the Application on Kubernetes</h2>
<div class="section">
<p>Start the Kubernetes proxy server so you can connect to your service via localhost:</p>

<markup
lang="bash"
title="Start kubctl proxy"
>kubectl proxy</markup>

<p>Next get the service&#8217;s info.</p>

<markup
lang="bash"
title="Helidon SE Example"
>kubectl get service quickstart-se</markup>

<markup
lang="bash"
title="Helidon MP Example"
>kubectl get service quickstart-mp</markup>

<p>Note the PORTs. You can now exercise the application as you did before
but use the second port number (the NodePort) instead of 8080. For example:</p>

<markup


>curl -X GET http://localhost:31431/greet</markup>

<p>After you&#8217;re done, cleanup.</p>

<markup
lang="bash"
title="Remove the application from Kubernetes"
>kubectl delete -f target/app.yaml</markup>

</div>
</doc-view>