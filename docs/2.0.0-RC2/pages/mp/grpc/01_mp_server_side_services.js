<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC MicroProfile Server Services</dt>
<dd slot="desc"><p>The gRPC Microprofile APIs are an extension to <router-link to="#microprofile/01_introduction.adoc" @click.native="this.scrollFix('#microprofile/01_introduction.adoc')">Helidon MP</router-link> to allow building
of gRPC services and clients that integrate with the Microprofile APIs. Using Helidon gRPC MP makes building gRPC services
and clients an easier process that the traditional approach using Protobuf files and code generation. Services can be built
using POJOs that are then discovered and deployed at runtime in the same way the Helidon MP discovers and deploys web resources
in the MP http server.</p>

<p>Building gRPC services using Helidon gRPC MP is very simple and allows the developer to concentrate on their
application logic without needing to write a lot of boilerplate gRPC code.</p>
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
    &lt;groupId&gt;io.helidon.microprofile.grpc&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-grpc-server&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_defining_a_service">Defining a Service</h2>
<div class="section">
<p>The traditional approach to building Java gRPC services is to write Protobuf files describing the service and then
use these to generate service stubs and finally implementing the service methods by extending the generated stub classes.
Using Helidon gRPC MP you just need to write an annotated service implementation class that is just a normal POJO.</p>

<p>For example:</p>

<markup
lang="java"
title="Simple gRPC Service"
>@ApplicationScoped
@io.helidon.microprofile.grpc.core.Grpc
public class StringService {

    @io.helidon.microprofile.grpc.core.Unary
    public String upper(String s) {
        return s == null ? null : s.toUpperCase();
    }
}</markup>

<p>The code above is a simple service with a single unary method that just converts a String to uppercase.
The important parts in the example are the <code>@ApplicationScoped</code>, <code>@Grpc</code> and <code>@Unary</code> annotations; these,
along with other annotations discussed later, allow the gRPC MP APIs to discover, configure and deploy the service.</p>

<p>Of course Helidon gRPC MP does not preclude you from using the Protobuf files approach, traditional gRPC Java services
also work in a gRPC MP server.</p>

<p>As already shown above a Helidon gRPC MP service is just an annotated POJO. To make a class a service it requires two
annotations.</p>

<markup
lang="java"

>@ApplicationScoped                                <span class="conum" data-value="1" />
@io.helidon.microprofile.grpc.core.Grpc     <span class="conum" data-value="2" />
public class StringService {</markup>

<ul class="colist">
<li data-value="1">The <code>ApplicationScoped</code> annotation is what makes the service implementation a CDI bean and hence discoverable.</li>
<li data-value="2">The <code>Grpc</code> annotation is what defines the class as a gRPC service so that when the bean is discovered it is
then deployed by the gRPC MP server.</li>
</ul>

<h3 id="_service_name">Service Name</h3>
<div class="section">
<p>By default when a class is annotated with <code>Grpc</code> the class name will be used as the gRPC service name. So in the example
above the service name will be <code>StringService</code>. This can be change by supplying a name to the annotation.</p>

<markup
lang="java"

>@ApplicationScoped
@io.helidon.microprofile.grpc.core.Grpc(name="Strings") <span class="conum" data-value="1" />
public class StringService {</markup>

<ul class="colist">
<li data-value="1">in the example above the name of the deployed service will be <code>Strings</code>.</li>
</ul>
</div>
</div>

<h2 id="_defining_service_methods">Defining Service Methods</h2>
<div class="section">
<p>Once a class is properly annotated to make it a gRPC MP service it needs to have service methods that implement the
application business logic. In gRPC there are four different types of method:</p>

<ul class="ulist">
<li>
<p>Unary - a simple method with at most a single request value and returning at most a single response value.</p>

</li>
<li>
<p>Server Streaming - a method that takes at most a single request value but may return zero or more response values.</p>

</li>
<li>
<p>Client Streaming - a request that takes one or more request values and returns at most one response value.</p>

</li>
<li>
<p>Bi-directional Streaming - a method that can take one or more request values and return zero or more response values.</p>

</li>
</ul>
<p>The Helidon gRPC MP API determines a method type by its annotation, which should be one of the following:</p>

<markup
lang="java"

>@io.helidon.microprofile.grpc.core.Unary
@io.helidon.microprofile.grpc.core.ServerStreaming
@io.helidon.microprofile.grpc.core.ClientStreaming
@io.helidon.microprofile.grpc.core.Bidirectional</markup>


<h3 id="_request_an_response_types">Request an Response Types</h3>
<div class="section">
<p>A gRPC service method typically takes a request parameter and returns a response value (streaming methods may take or return
multiple requests or responses). In traditional gRPC Java the types used for the request and response values must be
Protobuf serializable classes but this is not the case with Helidon gRPC. Helidon supports <router-link to="#grpc/09_marshalling.adoc" @click.native="this.scrollFix('#grpc/09_marshalling.adoc')">pluggable Marshallers</router-link>
and by default will support any Java primitive or Java <code>Serializable</code> as well as Protobuf types. Any type that can be marshalled
by the built-in marshallers or custom supplied marshaller may be used as a request or response type.</p>

</div>

<h3 id="_unary_methods">Unary Methods</h3>
<div class="section">
<p>A unary gRPC method is the simplest type of service method. Typically a unary method takes a request value and returns a
response value but this does not have to be the case, a unary method could just as easily take no request parameter and/or
return no response.</p>

<p>All of the signatures below are valid unary methods in Helidon gRPC MP.</p>

<markup
lang="java"

>// A unary method with a simple request and response
@io.helidon.microprofile.grpc.core.Unary
public ResponseType invoke(RequestType req)

// A unary method that just returns a response
@io.helidon.microprofile.grpc.core.Unary
public ResponseType invoke()

// A unary method that takes a request but returns no response
@io.helidon.microprofile.grpc.core.Unary
public void invoke(RequestType req)

// A unary method that takes no request and returns no response
@io.helidon.microprofile.grpc.core.Unary
public void invoke()

// An async unary request that takes a request and returns a future
// that will complete when the response is ready
@io.helidon.microprofile.grpc.core.Unary
public CompletableFuture&lt;ResponseType&gt; invoke(RequestType req)

// An async unary request that takes no request and returns a future
// that will complete when the response is ready
@io.helidon.microprofile.grpc.core.Unary
public CompletableFuture&lt;ResponseType&gt; invoke()

// The standard gRPC Java unary method signature
@io.helidon.microprofile.grpc.core.Unary
public void invoke(RequestType req, StreamObserver&lt;ResponseType&gt; observer)

// The standard gRPC Java unary method signature but without a request type
@io.helidon.microprofile.grpc.core.Unary
public void invoke(StreamObserver&lt;ResponseType&gt; observer)

// A unary method that takes a request type and a future to complete
// with the response type
@io.helidon.microprofile.grpc.core.Unary
public void invoke(RequestType req, CompletableFuture&lt;ResponseType&gt; observer)

// A unary method that takes no request type but just takes a future
// to complete with the response type
@io.helidon.microprofile.grpc.core.Unary
public void invoke(CompletableFuture&lt;ResponseType&gt; observer)</markup>

<p>The various signatures supported above allow the service developer to choose the method signature that best fits their
application business logic without needing to worry about handling standard gRPC Java requests and StreamObservers. The
standard gRPC Java method signature is in the list above so it can still be used if required.</p>

</div>

<h3 id="_serverstreaming_methods">ServerStreaming Methods</h3>
<div class="section">
<p>A server streaming method receives a requests from the client and when the request stream is complete it sends back a stream
of response values. A traditional gRPC Java server streaming method takes two parameters, the request and a <code>StreamObserver</code>
that is used to send back the single response in the same way that a unary method sends a response. As with unary methods
Helidon gRPC MP supports different method signatures for server streaming methods.</p>

<p>All of the signatures below are valid server streaming methods in Helidon gRPC MP.</p>

<markup
lang="java"

>// The standard gRPC Java server streaming method signature
@io.helidon.microprofile.grpc.core.ServerStreaming
public void invoke(RequestType req, StreamObserver&lt;ResponseType&gt; observer)

// A server streaming method that uses a Stream to send the responses to the client
@io.helidon.microprofile.grpc.core.ServerStreaming
public Stream&lt;ResponseType&gt; invoke(RequestType req)

// The server streaming method without a request parameter
@io.helidon.microprofile.grpc.core.ServerStreaming
public void invoke(StreamObserver&lt;ResponseType&gt; observer)

// A server streaming method without a request parameter
// that uses a Stream to send the responses to the client
@io.helidon.microprofile.grpc.core.ServerStreaming
public Stream&lt;ResponseType&gt; invoke(RequestType req)</markup>

<p>As with unary methods, the Helidon gRPC MP API supports multiple different method signatures for implementing server streaming
methods.</p>

</div>

<h3 id="_clientstreaming_methods">ClientStreaming Methods</h3>
<div class="section">
<p>A client streaming method receives a stream of requests from the client and when the request stream is complete it sends back a
response. A traditional gRPC Java client streaming method takes two <code>StreamObserver</code> parameters, one is the stream of client
requests and the other is used to send back the single response in the same way that a unary method sends a response. As with
unary methods Helidon gRPC MP supports different method signatures for client streaming methods.</p>

<p>All of the signatures below are valid client streaming methods in Helidon gRPC MP.</p>

<markup
lang="java"

>// The standard gRPC Java client streaming method signature
@io.helidon.microprofile.grpc.core.ClientStreaming
public StreamObserver&lt;RequestType&gt; invoke(StreamObserver&lt;ResponseType&gt; observer)

// The gRPC Java client streaming method with an asynchronous response
@io.helidon.microprofile.grpc.core.ClientStreaming
public StreamObserver&lt;RequestType&gt; invoke(CompletableFuture&lt;ResponseType&gt; observer)</markup>

</div>

<h3 id="_bi_directional_streaming_methods">Bi-Directional Streaming Methods</h3>
<div class="section">
<p>A bidirectional streaming method is a method that is a constant stream of client requests and server responses. Other than
the standard gRPC Java <code>StreamObserver</code> there are not any other built in types that make sense to use to implement
different method signatures for a bidirectional method so the only supported signature is the standard gRPC Java method.</p>

<markup
lang="java"

>@io.helidon.microprofile.grpc.core.Bidirectional
public StreamObserver&lt;RequestType&gt; invoke(StreamObserver&lt;ResponseType&gt; observer)</markup>

</div>
</div>

<h2 id="_deploying_protobuf_services">Deploying Protobuf Services</h2>
<div class="section">
<p>Whilst the examples above show how simple it is to write gRPC services with basic POJOs there may be cases where there is a
requirement to deploy services built the traditional way using gRPC Java generated classes or built as
<router-link to="#grpc/04_service_implementation.adoc" @click.native="this.scrollFix('#grpc/04_service_implementation.adoc')">non-microprofile Helidon gRCP services</router-link>.</p>


<h3 id="_annotate_the_service_implementation">Annotate the Service Implementation</h3>
<div class="section">
<p>When the gRPC MP server is starting it will discover all CDI beans of type <code>io.grpc.BindableService</code>. Service sub-classes
implemented the traditional way with code generation are instances of <code>BindableService</code> so by annotating the implementation class
with the <code>@ApplicationScoped</code> annotation they become discoverable and will be deployed into the gRPC server.</p>

<markup
lang="java"

>@ApplicationScoped
public class StringService
    extends StringServiceGrpc.StringServiceImplBase {</markup>

<p>In exactly the same way, if a class is an implementation of <code>io.helidon.grpc.server.GrpcService</code> then by annotating the class with
the <code>@ApplicationScoped</code> annotation it will be discovered and deployed when the MP gRPC server starts.</p>

<markup
lang="java"

>@ApplicationScoped
public class StringService implements GrpcService {</markup>

</div>

<h3 id="_implement_a_grpcmpextension">Implement a GrpcMpExtension</h3>
<div class="section">
<p>If it is not possible to annotate the service class (for example the code is built by a third party) another way to deploy none
CDI bean services is to implement a gRPC MP server extension.
The extension will then be called when the MP server is starting and be given the chance to add additional services for deployment.
An extension should implement the <code>io.helidon.microprofile.grpc.server.spi.GrpcMpExtension</code> interface.</p>

<p>For example, assuming that there was a gRPC service class called <code>StringService</code> that needed to be deployed an extension class
might look like this:</p>

<markup
lang="java"

>public class MyExtension
        implements GrpcMpExtension {
    @Override
    public void configure(GrpcMpContext context) {  <span class="conum" data-value="1" />
        context.routing()
               .register(new ServiceService());     <span class="conum" data-value="2" />
    }
}</markup>

<ul class="colist">
<li data-value="1">The <code>configure</code> method of the extension will be called to allow the extension to add extra configuration to the server.</li>
<li data-value="2">In this example an instance of the <code>StringService</code> is registered with the routing (as described in
the <router-link to="#grpc/03_routing.adoc" @click.native="this.scrollFix('#grpc/03_routing.adoc')">basic gRPC server documentation</router-link>).</li>
</ul>
<p>The <code>GrpcMpExtension</code> instances are discovered and loaded using the service loader so for the example above to work a file
<code>META-INF/services/io.helidon.microprofile.grpc.server.spi.GrpcMpExtension</code> would need to be created that contained the names
of the service implementations.</p>

</div>
</div>
</doc-view>