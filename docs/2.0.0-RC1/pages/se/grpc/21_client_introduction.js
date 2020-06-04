<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC Client Introduction</dt>
<dd slot="desc"><p>Helidon gRPC Client provides a framework for creating <a id="" title="" target="_blank" href="http://grpc.io/">gRPC</a> client applications. The client framework
allows a uniform way to access gRPC services that use either Protobuf or some custom serialization format. It also allows access
to gRPC services that use either Java serialization, Protobuf or a custom serialization format.</p>

<p>The class <code>GrpcServiceClient</code> acts as the client object for accessing a gRPC service. Creating a <code>GrpcServiceClient</code> involves:</p>

<ol style="margin-left: 15px;">
<li>
Creating a <code>ClientServiceDescriptor</code> which describes the methods in the service that this client can invoke.

</li>
<li>
Creating a gRPC <code>Channel</code> through which the client communicates with the server.

</li>
</ol>
<p>In later sections in this document, you will see how to customize both <code>ClientServiceDescriptor</code> and the <code>Channel</code>.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_maven_coordinates">Maven Coordinates</h2>
<div class="section">
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications. Then declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.grpc&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-grpc-client&lt;/artifactId&gt; <span class="conum" data-value="1" />
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">Declare dependency on Helidon gRPC Client.</li>
</ul>
</div>

<h2 id="_quick_start">Quick Start</h2>
<div class="section">
<p>First, create and run a minimalist <code>HelloService</code> gRPC server application as described in the
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/blob/master/docs/src/main/docs/grpc/01_introduction.adoc">gRPC Server</a> documentation.</p>

<p>Assuming that the server is running on port 1408, create a client as follows:</p>

<markup
lang="java"

>public static void main(String[] args) throws Exception {
    ClientServiceDescriptor descriptor = ClientServiceDescriptor.builder(HelloService.class)    // (1)
                                                                .unary("SayHello")              // (2)
                                                                .build();

    Channel channel = ManagedChannelBuilder.forAddress("localhost", 1408)                       // (3)
                                           .usePlaintext()
                                           .build();

    GrpcServiceClient client = GrpcServiceClient.create(channel, descriptor);                   // (4)

    CompletionStage&lt;String&gt; future = client.unary("SayHello", "Helidon gRPC!!");                                // (5)
    System.out.println(future.get());                                                           // (6)

}</markup>

<ol style="margin-left: 15px;">
<li>
Create a <code>ClientServiceDescriptor</code> for the <code>HelloService</code>.

</li>
<li>
Add the <code>SayHello</code> unary method to the <code>ClientServiceDescriptor</code>. This method, by default, uses Java serialization for
marshalling and unmarshalling the request and response values.

</li>
<li>
Create a gRPC <code>Channel</code> that is communicates with the server that is running in localhost and on port 1408 (using plaintext).

</li>
<li>
Create the <code>GrpcServiceClient</code> that uses the above <code>Channel</code> and <code>ClientServiceDescriptor</code>. <code>GrpcClientService</code> represents
a client that can be used to define the set of methods described by the specified <code>ClientServiceDescriptor</code>. In our case, the
<code>ClientServiceDescriptor</code> defines one unary method called <code>SayHello</code>.

</li>
<li>
Invoke the <code>SayHello</code> method which returns a <code>CompletionStage&lt;String&gt;</code>.

</li>
<li>
Print the result.

</li>
</ol>
<p>The example above creates a very simple client to the gRPC server that by default uses Java serialization to marshall
requests and responses.</p>

<p>We will look into deployment of "standard" gRPC services that use Protobuf for request and response marshalling, as well as
how you can configure custom marshallers, later in this document.</p>

</div>
</doc-view>