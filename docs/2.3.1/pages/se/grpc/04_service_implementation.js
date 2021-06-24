<doc-view>

<h2 id="_service_implementation">Service Implementation</h2>
<div class="section">
<p>While Helidon gRPC Server allows you to deploy any standard gRPC service that
implements <code>io.grpc.BindableService</code> interface, including services generated
from the Protobuf IDL files (and even allows you to customize them to a certain
extent), using Helidon gRPC framework to implement your services has a number of
benefits:</p>

<ul class="ulist">
<li>
<p>It allows you to define both HTTP and gRPC services using similar programming
model, simplifying learning curve for developers.</p>

</li>
<li>
<p>It provides a number of helper methods that make service implementation
significantly simpler.</p>

</li>
<li>
<p>It allows you to configure some of the Helidon value-added features, such
as <router-link to="#08_security.adoc" @click.native="this.scrollFix('#08_security.adoc')">security</router-link> and <router-link to="#07_metrics.adoc" @click.native="this.scrollFix('#07_metrics.adoc')">metrics collection</router-link>
down to the method level.</p>

</li>
<li>
<p>It allows you to easily specify custom marshaller for requests and
responses if Protobuf does not satisfy your needs.</p>

</li>
<li>
<p>It provides built in support for <router-link to="#06_health_checks.adoc" @click.native="this.scrollFix('#06_health_checks.adoc')">health checks</router-link>.</p>

</li>
</ul>
</div>

<h2 id="_service_implementation_basics">Service Implementation Basics</h2>
<div class="section">
<p>At the very basic level, all you need to do in order to implement a Helidon
gRPC service is create a class that implements <code>io.helidon.grpc.server.GrpcService</code>
interface and define one or more methods for the service:</p>

<markup
lang="java"

>class EchoService implements GrpcService {

    @Override
    public void update(ServiceDescriptor.Rules rules) {
        rules.unary("Echo", this::echo); <span class="conum" data-value="1" />
    }

    /**
     * Echo the message back to the caller.
     *
     * @param request   the echo request containing the message to echo
     * @param observer  the response observer
     */
    public void echo(String request, StreamObserver&lt;String&gt; observer) {  <span class="conum" data-value="2" />
        complete(observer, request);  <span class="conum" data-value="3" />
    }
}</markup>

<ul class="colist">
<li data-value="1">Define unary method <code>Echo</code> and map it to the <code>this::echo</code> handler.</li>
<li data-value="2">Create a handler for the <code>Echo</code> method.</li>
<li data-value="3">Send the request string back to the client by completing response observer.</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">The <code>complete</code> method shown in the example above is just one of many helper
      methods available in the <code>GrpcService</code> class. See the full list
      <a id="" title="" target="_blank" href="./apidocs/io.helidon.grpc.server/io/helidon/grpc/server/GrpcService.html">here</a>.</p>
</div>
<p>The example above implements a service with a single unary method, which will be
exposed at the `EchoService/Echo' endpoint. The service does not explicitly define
a marshaller for requests and responses, so Java serialization will be used as a
default.</p>

<p>Unfortunately, this implies that you will have to implement clients by hand and
configure them to use the same marshaller as the server. Obviously, one of the
major selling points of gRPC is that it makes it easy to generate clients for a
number of languages (as long as you use Protobuf for marshalling), so let&#8217;s see
how we would implement Protobuf enabled Helidon gRPC service.</p>

</div>

<h2 id="_implementing_protobuf_services">Implementing Protobuf Services</h2>
<div class="section">
<p>In order to implement Protobuf-based service, you would follow the official
<a id="" title="" target="_blank" href="https://grpc.io/docs/quickstart/java.html">instructions</a> on the gRPC
web site, which boil down to the following:</p>


<h3 id="_define_the_service_idl">Define the Service IDL</h3>
<div class="section">
<p>For this example, we will re-implement the <code>EchoService</code> above as a Protobuf
service in <code>echo.proto</code> file.</p>

<markup
lang="proto"

>syntax = "proto3";
option java_package = "org.example.services.echo";

service EchoService {
  rpc Echo (EchoRequest) returns (EchoResponse) {}
}

message EchoRequest {
  string message = 1;
}

message EchoResponse {
  string message = 1;
}</markup>

<p>Based on this IDL, the gRPC compiler will generate message classes (<code>EchoRequest</code>
and <code>EchoResponse</code>), client stubs that can be used to make RPC calls to the server,
as well as the base class for the server-side service implementation.</p>

<p>We can ignore the last one, and implement the service using Helidon gRPC framework
instead.</p>

</div>

<h3 id="_implement_the_service">Implement the Service</h3>
<div class="section">
<p>The service implementation will be very similar to our original implementation:</p>

<markup
lang="java"

>class EchoService implements GrpcService {

    @Override
    public void update(ServiceDescriptor.Rules rules) {
        rules.proto(Echo.getDescriptor())  <span class="conum" data-value="1" />
             .unary("Echo", this::echo);   <span class="conum" data-value="2" />
    }

    /**
     * Echo the message back to the caller.
     *
     * @param request   the echo request containing the message to echo
     * @param observer  the response observer
     */
    public void echo(Echo.EchoRequest request, StreamObserver&lt;Echo.EchoResponse&gt; observer) {  <span class="conum" data-value="3" />
        String message = request.getMessage();  <span class="conum" data-value="4" />
        Echo.EchoResponse response = Echo.EchoResponse.newBuilder().setMessage(message).build();  <span class="conum" data-value="5" />
        complete(observer, response);  <span class="conum" data-value="6" />
    }
}</markup>

<ul class="colist">
<li data-value="1">Specify proto descriptor in order to provide necessary type information and
enable Protobuf marshalling.</li>
<li data-value="2">Define unary method <code>Echo</code> and map it to the <code>this::echo</code> handler.</li>
<li data-value="3">Create a handler for the <code>Echo</code> method, using Protobuf message types for request and response.</li>
<li data-value="4">Extract message string from the request.</li>
<li data-value="5">Create the response containing extracted message.</li>
<li data-value="6">Send the response back to the client by completing response observer.</li>
</ul>
</div>
</div>
</doc-view>