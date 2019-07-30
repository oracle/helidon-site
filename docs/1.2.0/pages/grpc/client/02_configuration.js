<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC Client Configuration</dt>
<dd slot="desc"><p>Configure the gRPC client using the Helidon configuration framework, either programmatically or via a configuration file.</p>

<p>As mentioned earlier, creating a <code>GrpcServiceClient</code> involves:</p>

<ol style="margin-left: 15px;">
<li>
Creating a <code>ClientServiceDescriptor</code> which describes the methods in the service that this client can invoke.

</li>
<li>
Creating a gRPC <code>Channel</code> through which the client communicates with the server.

</li>
</ol></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_the_clientservicedescriptor">Configuring the ClientServiceDescriptor</h2>
<div class="section">

<h3 id="_configuring_the_clientservicedescriptor_in_your_code">Configuring the ClientServiceDescriptor in your code</h3>
<div class="section">
<p>The only way to configure the <code>ClientServiceDescriptor</code> is in your application code.</p>

<markup
lang="java"

>ClientServiceDescriptor descriptor = ClientServiceDescriptor +
        .builder(HelloService.class)    // (1)
        .unary("SayHello")              // (2)
        .build();                       // (3)</markup>

<ol style="margin-left: 15px;">
<li>
Create a  builder for a <code>ClientServiceDescriptor</code> for the <code>HelloService</code>.

</li>
<li>
Specify that the <code>HelloService</code> has a unary method named <code>SayHello</code>. There are many other methods in this class that allow you
to define <code>ClientStreaming</code>, <code>ServerStreaming</code> and <code>Bidirectional</code> methods.

</li>
<li>
Build the <code>ClientServiceDescriptor</code>.

</li>
</ol>
</div>
</div>

<h2 id="_configuring_the_grpc_channel">Configuring the gRPC Channel</h2>
<div class="section">
<p>gRPC allows various channel configurations (deadlines, retries, interceptors etc.)</p>

<p>Please refer to gRPC documentation: <a id="" title="" target="_blank" href="https://grpc.io/grpc-java/javadoc/io/grpc/ManagedChannelBuilder.html">https://grpc.io/grpc-java/javadoc/io/grpc/ManagedChannelBuilder.html</a>.</p>

</div>
</doc-view>