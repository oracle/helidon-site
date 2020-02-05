<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC Client Implementation</dt>
<dd slot="desc"><p>Helidon gRPC client framework allows you to write gRPC clients to access any gRPC
service implementation. The benefits of using Helidon gRPC Client Framework include:</p>

<ul class="ulist">
<li>
<p>It provides a number of helper methods that make client implementation
significantly simpler.</p>

</li>
<li>
<p>It allows you to configure some of the Helidon value-added features, such
as <router-link to="#08_security.adoc" @click.native="this.scrollFix('#08_security.adoc')">security</router-link> and <router-link to="#07_metrics.adoc" @click.native="this.scrollFix('#07_metrics.adoc')">metrics collection and interceptors</router-link>
down to the method level.</p>

</li>
<li>
<p>It allows you to easily specify custom marshaller for requests and
responses if <code>protobuf</code> does not satisfy your needs.</p>

</li>
</ul></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_client_implementation_basics">Client Implementation Basics</h2>
<div class="section">
<ul class="ulist">
<li>
<p>The first step to create a Helidon gRPC client application is to describe the set of methods in the gRPC service. Helidon
gRPC Client Framework (simply called the "Client framework" in the remainder of the document) provides a class called
<code>ClientServiceDescriptor</code> to describe the set of methods of a service that the client may invoke.</p>

</li>
</ul>
<p>There are three ways to build and initialize a <code>ClientServiceDescriptor</code>.
<strong> The first option is to initialize <code>ClientServiceDescriptor</code> using <code>protoc</code> generated artifacts like
<code>BindableService</code> or <code>io.grpc.ServiceDescriptor</code>. This option is possible if the gRPC service
was built using <code>.proto</code> file. In this case the set of gRPC methods, their types and
the appropriate marshallers are detected automatically. This is certainly the easiest way to initialize
a <code>ClientServiceDescriptor</code>.
</strong> The second option is to programmatically build the <code>ClientServiceDescriptor</code>. This option should be
taken if the service was <strong>not</strong> built from protobuf files or if the <code>protoc</code> generated artifacts are not
available to the client.
** The third option is to load the method descriptions from a configuration file. (Not yet implemented).</p>

<ul class="ulist">
<li>
<p>The next step is to create a gRPC <code>Channel</code> to use to communicate with the server.</p>

</li>
<li>
<p>Finally, you create an instance of <code>GrpcServiceClient</code> passing the <code>ClientMethodDescriptor</code> and the <code>Channel</code> instances.</p>

</li>
</ul>
</div>

<h2 id="_creating_grpc_clients_from_protoc_generated_artifacts">Creating gRPC clients from <code>protoc</code> generated artifacts</h2>
<div class="section">
<p>As mentioned above, the easiest way to create a <code>ClientServiceDescriptor</code> is to create it from an <code>io.grpc.ServiceDescriptor</code> or
from a <code>io.grpc.BindableService</code>. It is fairly trivial to obtain these from a service generated from artifacts generated
from protobuf IDL file.</p>

<p>For this section we will assume the following proto file:</p>

<markup
lang="proto"

>syntax = "proto3";
option java_package = "io.helidon.grpc.client.test";

service StringService {
  rpc Upper (StringMessage) returns (StringMessage) {}                  // (Unary)
  rpc Lower (StringMessage) returns (StringMessage) {}                  // (Unary)
  rpc Split (StringMessage) returns (stream StringMessage) {}           // (Server Streaming)
  rpc Join (stream StringMessage) returns (StringMessage) {}            // (Client Streaming)
  rpc Echo (stream StringMessage) returns (stream StringMessage) {}     // (Bidirectional Streaming)
}

message StringMessage {
  string text = 1;
}</markup>

<p>If you run it through <code>protoc</code> it will generate a class (among other things) called <code>StringService</code>.
Assuming that the <code>StringService</code> server is running on port 1408, here is how you can create a Helidon gRPC
Client that uses the Client Framework to invoke various types of gRPC methods.</p>


<h3 id="_creating_and_initializing_a_clientservicedescriptor_for_stringservice_generated_from_protoc">Creating and initializing a ClientServiceDescriptor for StringService (generated from <code>protoc</code>)</h3>
<div class="section">
<p>Lets build a class called <code>ProtoBasedStringServiceClient</code> that invokes the various types of
gRPC methods that our <code>StringService</code> offers.</p>

<markup
lang="java"

>public class ProtoBasedStringServiceClient {

    private GrpcServiceClient client;

    public ProtoBasedStringServiceClient() {
        ClientServiceDescriptor desc = ClientServiceDescriptor
                .builder(StringService.getServiceDescriptor())                  // (1)
                .build();

        Channel channel = ManagedChannelBuilder.forAddress("localhost", 1408)   // (2)
                .usePlaintext().build();

        this.client = GrpcServiceClient.create(channel, desc);                  // (3)
    }

    /**
     * Many gRPC methods take a {@link io.grpc.StreamObserver} as an argument. Lets
     * build a helper class that can be used in our example.
     */
    public static class StringMessageStream&lt;T&gt;                                  // (4)
        implements StreamObserver&lt;T&gt; {

        @Override
        public void onNext(T value) {
            System.out.println("Received : " + value);
        }

        @Override
        public void onError(Throwable t) {
          t.printStracktrace();
        }

        @Override
        public void onCompleted() {
          System.out.println("DONE");
        }
    }
}</markup>

<ol style="margin-left: 15px;">
<li>
Initialize the builder by specifying the <code>StringService&#8217;s proto `ServiceDescriptor</code>. From
the <code>ServiceDescriptor</code> the builder detects the service name, the set of method names, and for
each method its type (like Unary, ServerStreaming etc.), the request and response types (and
hence their corresponding Marshallers) etc.

</li>
<li>
We create a <code>Channel</code> to the service that is running on <code>localhost:1408</code>.

</li>
<li>
Finally, we create our <code>GrpcServiceClient</code> by using the above mentioned <code>ClientServiceDescriptor</code>
and <code>Channel</code>. This <code>client</code> reference will be used to invoke various gRPC methods in our
<code>StringService</code>

</li>
<li>
We define a static inner class that implements the <code>io.grpc.StreamObserver</code> interface. An instance
of this class can be used whereever a <code>io.grpc.StreamObserver</code> is required (like server streaming,
bi-directional streaming methods).

</li>
</ol>
</div>

<h3 id="_invoking_a_unary_method_on_the_stringservice">Invoking a unary method on the StringService</h3>
<div class="section">
<p>The Client Framework provides many helper methods to invoke gRPC unary methods.</p>

<markup
lang="java"

>public class ProtoBasedStringServiceClient {

    private GrpcServiceClient client;

    public ProtoBasedStringServiceClient() { /* code omitted */ }

    public void invokeUnaryMethod() throws Exception {
        StringMessage input = StringMessage.newBuilder().setText("ABC").build();

        CompletableFuture&lt;String&gt; result = client.unary("Lower", input);        // (1)

        String lcase = client.blockingUnary("Lower", input);                    // (2)

        StringMessageStream stream = new StringMessageStream&lt;StringMessage&gt;();
        client.blockingUnary("Lower", input);                                   // (3)
    }

    public static class StringMessageStream&lt;T&gt; { /* code omitted */ }
}</markup>

<ol style="margin-left: 15px;">
<li>
This variant of the <code>unary</code> API takes the method name and a request object and returns
a <code>CompletableFuture&lt;Response&gt;</code> where <code>&lt;Response&gt;</code> is the response type. Here we invoke the
<code>Lower</code> method passing the input <code>StringMessage</code>. This method returns a <code>CompletableFuture&lt;StringMessage&gt;</code>
as response thus allowing the client to obtain the result asynchronously.

</li>
<li>
This is simply a wrapper around the above method. This method blocks till the result is available.

</li>
<li>
Here we create invoke the <code>unary</code> method by passing the <code>StringMessageStream</code> whose <code>onNext</code> method
will be called (once) when the result is available.

</li>
</ol>
</div>

<h3 id="_invoking_a_client_streaming_method_on_the_stringservice">Invoking a client streaming method on the StringService</h3>
<div class="section">
<p>Lets invoke the <code>Join</code> method which causes the server to return a single result <strong>after</strong> the client
has streamed the request values to the server. gRPC API expects the client application to provide
an instance of <code>io.grpc.StreamObserver</code> as an argument during the invocation of the client
streaming method.</p>

<p>In order to simplify the task of invoking Client Streaming methods, Helidon Client Framework provides
a couple of methods to invoke gRPC Client Streaming methods. The first variant takes an <code>Iterable</code> as
argument which in turn is converted into a <code>io.grpc.StreamObserver</code>. The second variant takes a
<code>io.grpc.StreamObserver</code> as argument. The first variant can be used if the number of values to be
streamed in small and known a priori.</p>

<markup
lang="java"

>public class ProtoBasedStringServiceClient {

    private GrpcServiceClient client;

    public ProtoBasedStringServiceClient() { /* code omitted */ }

    public void invokeClientStreamingWithIterable() throws Exception {

        String sentence = "A simple invocation of a client streaming method";
        Collection&lt;StringMessage&gt; input = Arrays.stream(sentence.split(" "))        // (1)
                  .map(w -&gt; StringMessage.newBuilder().setText(w).build())
                  .collect(Collectors.toList());

        CompletableFuture&lt;StringMessage&gt; result =
                  grpcClient.clientStreaming("Join", input);                        // (2)
    }

    public void invokeClientStreaming() throws Exception {
        String sentence = "A simple invocation of a client streaming method";
        StringMessageStream responseStream = new StringMessageStream&lt;StringMessage&gt;();
        StreamObserver&lt;StringMessage&gt; clientStream =
                  grpcClient.clientStreaming("Join", responseStream);               // (3)

        for (String word : sentence.split(" ")) {
            clientStream.onNext(StringMessage.newBuilder().setText(word).build());  // (4)
        }
        clientStream.onCompleted();                                                 // (5)
    }

    public static class StringMessageStream&lt;T&gt; { /* code imitted */ }

}</markup>

<ol style="margin-left: 15px;">
<li>
We prepare the collection that contains the values to be streamed.

</li>
<li>
We call the first variant of the <code>clientStreaming()</code> method that takes the
method name and the collection of values to be streamed from the client.
Note: The above helper method is useful if the values to be streamed is fixed and small in number.

</li>
<li>
If the number of values to be streamed is large (or unknown), then it is better to use this
variant of the <code>clientStreaming()</code> method that takes a <code>io.grpc.StreamObserver</code> as an argument. This
method returns a client stream through which the client can stream (potentially a large number of)
value to the server.

</li>
<li>
Once the client stream is obtained, the client streams the values using the <code>onNext()</code> method on the
stream.

</li>
<li>
When all values have been stream, the client invokes the <code>onCompleted()</code> method signal that all values
have been streamed from the client.

</li>
</ol>
</div>

<h3 id="_invoking_a_server_streaming_method_on_the_stringservice_generated_from_protoc">Invoking a server streaming method on the StringService (generated from <code>protoc</code>)</h3>
<div class="section">
<p>Lets invoke the "Split" method which causes the server to stream the results back.</p>

<markup
lang="java"

>public class ProtoBasedStringServiceClient {

    private GrpcServiceClient client;

    public ProtoBasedStringServiceClient() { /* code omitted */ }

    public void invokeServerStreaming() throws Exception {
        String sentence = "This sentence will be split into words and sent back to client";
        StringMessage input = StringMessage.newBuilder().setText(sentence).build();   // (1)

        StringMessageStream&lt;StringMessage&gt; observer = new StringMessageStream&lt;&gt;();    // (2)
        grpcClient.serverStreaming("Split", input, observer);                         // (3)
    }

    public static class StringMessageStream&lt;T&gt; { /* code imitted */ }

}</markup>

<ol style="margin-left: 15px;">
<li>
We prepare the input <code>StringMessage</code> that needs to be  split.

</li>
<li>
We create a <code>StringMessageStream</code> which will receive the results streamed from the server.

</li>
<li>
We call the <code>serverStreaming()</code> passing the input and the <code>StringMessageStream</code> as arguments.
The server sends a stream of words by calling the <code>onNext()</code> method on the <code>StringMessageStream</code> for
each word.

</li>
</ol>
</div>

<h3 id="_invoking_a_bi_directional_streaming_method_on_the_stringservice_generated_from_protoc">Invoking a bi-directional streaming method on the StringService (generated from <code>protoc</code>)</h3>
<div class="section">
<p>Now lets invoke the <code>Echo</code> method in which both the client and the server have to stream
the request and response.</p>

<markup
lang="java"

>public class ProtoBasedStringServiceClient {

    private GrpcServiceClient client;

    public ProtoBasedStringServiceClient() { /* code omitted */ }

    public void invokeBidiStreaming() throws Exception {

        StringMessageStream&lt;StringMessage&gt; observer = new StringMessageStream&lt;&gt;();      // (1)
        StringMessageStream&lt;StringMessage&gt; clientStream = grpcClient
                                .bidiStreaming("Echo", observer);                       // (2)

        String sentence = "Each word will be echoed back to the client by the server";
        for (String word : sentence.split(" ")) {
            clientStream.onNext(StringMessage.newBuilder().setText(word).build());      // (3)
        }
        clientStream.onCompleted();                                                     // (4)
    }

    public static class StringMessageStream&lt;T&gt; { /* code imitted */ }

}</markup>

<ol style="margin-left: 15px;">
<li>
We create a <code>StringMessageStream</code> which will receive the results streamed from the server.

</li>
<li>
We call the <code>bidiStreaming()</code> passing the <code>observer</code> as argument. The server will
send its results through this stream (basically by calling the <code>onNext()</code> on the <code>observer</code>).
The method returns a (client) stream which should be used by the client to stream values to the
server.

</li>
<li>
We stream each word in our sentence to the server by calling the <code>onNext()</code> method on the
<code>clientStream</code>.

</li>
<li>
We call the <code>onCompleted()</code> method on the <code>clientStream</code> to signal that the client has
streamed all its values.

</li>
</ol>
</div>
</div>

<h2 id="_programmatically_creating_clientservicedescriptor_for_stringservice">Programmatically creating ClientServiceDescriptor for StringService</h2>
<div class="section">
<p>Assuming that the service is still running on port 1408, lets see how to create our Client
without using the <code>StringService</code> 's proto <code>ServiceDescriptor</code>.</p>

<p>Since we are <strong>not</strong> going to use the <code>StringService</code> 's proto <code>ServiceDescriptor</code>, we need to
describe the methods that the client need to invoke. The Helidon client framework provides a
bunch of APIs to easily describe gRPC methods.</p>

<p>For example, to register a unary method, we need to use the <code>unary</code> method and configure it to
specify the request and response types.</p>

<p>Other than describing the methods that our client will invoke, the rest of the following
code should be very similar (or same) as the previous section!!</p>

<markup
lang="java"

>public class StringServiceClient {

    public static void main(String[] args) {
        ClientMethodDescriptor lower = ClientMethodDescriptor
                    .unary("StringService", "Lower")                            // (1)
                    .requestType(StringMessage.class)                           // (2)
                    .responseType(StringMessage.class)                          // (3)
                    .build();                                                   // (4)

        ClientMethodDescriptor join = ClientMethodDescriptor
                    .clientStreaming("StringService", "Join")                   // (5)
                    .requestType(StringMessage.class)
                    .responseType(StringMessage.class)
                    .build();

        ClientMethodDescriptor split = ClientMethodDescriptor
                    .serverStreaming("StringService", "Split")                  // (6)
                    .requestType(StringMessage.class)
                    .responseType(StringMessage.class)
                    .build();

        ClientMethodDescriptor echo = ClientMethodDescriptor
                    .bidirectional("StringService", "Echo")                     // (7)
                    .requestType(StringMessage.class)
                    .responseType(StringMessage.class)
                    .build();

        ClientServiceDescriptor serviceDesc = ClientServiceDescriptor           // (8)
                    .builder(StringService.class)
                    .unary(lower)
                    .clientStreaming(join)
                    .serverStreaming(split)
                    .bidirectional(echo)
                    .build();


        Channel channel = ManagedChannelBuilder.forAddress("localhost", 1408)           // (9)
                .usePlaintext().build();

        GrpcServiceClient client = GrpcServiceClient.create(channel, serviceDesc);   // (10)

    }

}</markup>

<ol style="margin-left: 15px;">
<li>
Use the <code>unary()</code> method on <code>ClientMethodDescriptor</code> to create a builder for a gRPC unary method.
The service name and the method name ("Lower") are specified.

</li>
<li>
Set the request type of the method to be <code>StringMessage</code> (since the <code>Lower</code> method takes <code>StringMessage</code> as a parameter).

</li>
<li>
Set the response type of the method to be <code>StringMessage</code> (since the <code>Lower</code> method returns a <code>StringMessage</code> as a parameter).

</li>
<li>
Build the <code>ClientMethodDescriptor</code>. Note that the return value is a <code>ClientMethodDescriptor</code> that contains
the correct Marshallers for the request &amp; response types.

</li>
<li>
Use the <code>clientStreaming()</code> method on <code>ClientMethodDescriptor</code> to create a builder for a gRPC client streaming method.
The service name and the method name ("Join") are specified.

</li>
<li>
Use the <code>serverStreaming()</code> method on <code>ClientMethodDescriptor</code> to create a builder for a gRPC server streaming method.
The service name and the method name ("Split") are specified.

</li>
<li>
Use the <code>bidirectional()</code> method on <code>ClientMethodDescriptor</code> to create a builder for a gRPC Bidi streaming method.
The service name and the method name ("Echo") are specified.

</li>
<li>
Create a <code>ClientServiceDescriptor</code> for service named <code>StringService</code> and add all our <code>ClientMethodDescriptor</code> s.

</li>
<li>
We create a <code>Channel</code> to the service that is running on <code>localhost:1408</code>.

</li>
<li>
Finally, we create our <code>GrpcServiceClient</code> by using the above mentioned <code>ClientServiceDescriptor</code>
and <code>Channel</code>.

</li>
</ol>
<p>At this point the <code>client</code> object can be used to invoke any of the four types of methods we have seen in the
earlier sections!!</p>

</div>

<h2 id="_creating_grpc_clients_for_non_protobuf_services">Creating gRPC clients for non protobuf services</h2>
<div class="section">
<p>If your service is <strong>not</strong> using protobuf for serialization, then the Client framework allows
you to programmatically initialize <code>ClientMethodDescriptor</code> and create clients to invoke
methods on the service.</p>

<p>All you have to do is create the set of <code>ClientMethodDescriptor</code> s and the <code>ClientServiceDescriptor</code> as
described in the previous section, but with one change. Just <strong>do not</strong> to set the request and response types
in the <code>ClientMethodDescriptor</code>. That&#8217;s all!! In fact, there is an API in the <code>ClientServiceDescriptor</code>
that makes this even simpler. You can simply pass the method name. For example, to create a client streaming
method called "JoinString" that uses java serialization simply call the <code>clientStreamin("JoinString")</code>.</p>

<p>Lets see an example of creating a client for a service that uses Java serialization.</p>

<markup
lang="java"

>public static void main(String[] args) throws Exception {
    ClientServiceDescriptor descriptor = ClientServiceDescriptor.builder(HelloService.class)    // (1)
                                                                .clientStreaming("JoinString")  // (2)
                                                                .build();

    Channel channel = ManagedChannelBuilder.forAddress("localhost", 1408)
                                           .usePlaintext()
                                           .build();

    GrpcServiceClient client = GrpcServiceClient.create(channel, descriptor);

    String sentence = "A simple invocation of a client streaming method";
    Collection&lt;StringMessage&gt; input = Arrays.stream(sentence.split(" "))
                                        .map(w -&gt; StringMessage.newBuilder().setText(w).build())
                                        .collect(Collectors.toList());

  CompletableFuture&lt;StringMessage&gt; result = grpcClient.clientStreaming("Join", input);
}</markup>

<ol style="margin-left: 15px;">
<li>
Create a <code>ClientServiceDescriptor</code> for the <code>HelloService</code>.

</li>
<li>
Add the "JoinString" client streaming method to the <code>ClientServiceDescriptor</code>. Since  we didn&#8217;t set
the request or response type (like we did in the previous sections), Java serialization will be used for
Marshalling and Unmarshalling the request and response values.

</li>
</ol>
<p>Note that whether a <code>ClientServiceDescriptor</code> is built using protobuf artifacts or is built programmatically,
the same set of APIs provided by the Client Framework can be used to invoke gRPC methods.</p>

</div>
</doc-view>