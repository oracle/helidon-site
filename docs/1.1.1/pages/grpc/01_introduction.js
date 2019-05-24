<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC Server Introduction</dt>
<dd slot="desc"><p>Helidon gRPC Server provides a framework for creating <a id="" title="" target="_blank" href="http://grpc.io/">gRPC</a> applications.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_experimental">Experimental</h2>
<div class="section">
<div class="admonition warning">
<p class="admonition-inline">The Helidon gRPC feature is currently experimental and the APIs are
 subject to changes until gRPC support is stabilized.</p>
</div>
</div>

<h2 id="_quick_start">Quick Start</h2>
<div class="section">
<p>Here is the code for a minimalist gRPC application that runs on a default port (1408):</p>

<markup
lang="java"

>    public static void main(String[] args) throws Exception {
        GrpcServer grpcServer = GrpcServer
                .create(GrpcRouting.builder()
                                .register(new HelloService()) <span class="conum" data-value="1" />
                                .build())
                .start() <span class="conum" data-value="2" />
                .toCompletableFuture()
                .get(10, TimeUnit.SECONDS); <span class="conum" data-value="3" />

        System.out.println("gRPC Server started at: http://localhost:" + grpcServer.port()); <span class="conum" data-value="4" />
    }

    static class HelloService implements GrpcService { <span class="conum" data-value="5" />
        @Override
        public void update(ServiceDescriptor.Rules rules) {
            rules.unary("SayHello", ((request, responseObserver) -&gt; complete(responseObserver, "Hello World!"))); <span class="conum" data-value="6" />
        }
    }</markup>

<ul class="colist">
<li data-value="1">Register gRPC service.</li>
<li data-value="2">Start the server.</li>
<li data-value="3">Wait for the server to start while throwing possible errors as exceptions.</li>
<li data-value="4">The server is bound to a default port (1408).</li>
<li data-value="5">Implement the simplest possible gRPC service.</li>
<li data-value="6">Add unary method <code>HelloService/SayHello</code> to the service definition.</li>
</ul>
<p>The example above deploys a very simple service to the gRPC server that by default uses Java serialization to marshall
requests and responses. We will look into deployment of "standard" gRPC services that use Protobuf for request and
response marshalling, as well as how you can configure custom marshallers, later in this document.</p>

</div>

<h2 id="_maven_coordinates">Maven Coordinates</h2>
<div class="section">
<p>The <router-link to="/about/04_managing-dependencies">Getting Started</router-link> page describes how you
should declare dependency management for Helidon applications. Then declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.grpc&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-grpc-server&lt;/artifactId&gt; <span class="conum" data-value="1" />
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">Dependency on gRPC Server.</li>
</ul>
</div>
</doc-view>