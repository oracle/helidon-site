<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC MicroProfile Clients</dt>
<dd slot="desc"><p>Building Java gRPC clients using the Helidon MP gRPC APIs is very simple and removes a lot of the boiler plate code typically
associated to more traditional approaches to writing gRPC Java clients. At it simplest a gRPC Java client can be written using
nothing more than a suitably annotated interface.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable gRPC MicroProfile Clients
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.grpc&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-grpc-client&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_building_a_grpc_client">Building a gRPC Client</h2>
<div class="section">
<p>There are a few steps to building and using a gRPC client in Helidon MP.</p>

<p>As discussed in the section on <router-link to="#grpc/32_mp_server_side_services.adoc" @click.native="this.scrollFix('#grpc/32_mp_server_side_services.adoc')">Server-Side Services</router-link> there are four different types of gRPC method.</p>

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
<p>An as with the server-side APIS, the Helidon MP gRPC client APIs support a number of different method signatures for each of the
different gRPC method types.</p>


<h3 id="_the_client_service_interface">The Client Service Interface</h3>
<div class="section">
<p>The next step is to produce an interface with the service methods that the client requires.</p>

<p>For example, suppose we have a simple server side service that has a unary method to convert a string to uppercase.</p>

<markup
lang="java"
title="Simple gRPC Service"
>@ApplicationScoped
@io.helidon.microprofile.grpc.core.Grpc
public interface StringService {

    @io.helidon.microprofile.grpc.core.Unary
    public String upper(String s) {
        return s == null ? null : s.toUpperCase();
    }
}</markup>

<p>The service has been written using the Helidon MP APIs but could just as easily be a traditional gRPC Java service generated from
Protobuf files. The client API is agnostic of the server side implementation, it only cares about the method type, the request
and response types and the type of Marshaller used to serialize the request and response.</p>

<p>To write a client for the StringService all that is required is an interface.</p>

<markup
lang="java"
title="Simple gRPC Service"
>@ApplicationScoped
@io.helidon.microprofile.grpc.core.Grpc
public interface StringService {

    @io.helidon.microprofile.grpc.core.Unary
    public String upper(String s);
}</markup>

<p>There is no need to write any code to implement the client. The Helidon MP gRPC APIs will create a dynamic proxy for the interface
using the information from the annotations and method signatures.</p>

<p>The interface in the example above used the same method signature as the server but this does not have to be the case, the
interface could have used any supported signature for a unary method, so for example it could just have easily been the standard
unary method signature:</p>

<markup
lang="java"
title="Simple gRPC Service"
>@ApplicationScoped
@io.helidon.microprofile.grpc.core.Grpc
public interface StringService {

    @io.helidon.microprofile.grpc.core.Unary
    public void upper(String s, StreamObserver&lt;String&gt; response);
}</markup>

<p>We could also have made the client asynchronous by using one of the async method signatures:</p>

<markup
lang="java"
title="Simple gRPC Service"
>@ApplicationScoped
@io.helidon.microprofile.grpc.core.Grpc
public interface StringService {

    @io.helidon.microprofile.grpc.core.Unary
    public CompletableFuture&lt;String&gt; upper(String s);
}</markup>

</div>

<h3 id="_configuring_channels">Configuring Channels</h3>
<div class="section">
<p>For a gRPC client to connect to a server it requires a Channel. The Helidon MP gRPC APIs provide a way to inject channels into
CDI beans that require them.</p>

<p>Channels are configured in the <code>grpc</code> section of the Helidon application configuration. The examples below use an <code>application.yaml</code>
file but there are many other ways to use and override <router-link to="#config/01_introduction.adoc" @click.native="this.scrollFix('#config/01_introduction.adoc')">configuration in Helidon</router-link></p>

<markup
lang="yaml"
title="application.yaml"
>grpc:
  channels:                <span class="conum" data-value="1" />
    test-server:           <span class="conum" data-value="2" />
      host: localhost      <span class="conum" data-value="3" />
      port: 1408           <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">Channels are configured in the`channels` section</li>
<li data-value="2">Each sub-section is the Channel name that is then used to refer to this Channel in the application code</li>
<li data-value="3">Each channel contains a host name</li>
<li data-value="4">and a port.</li>
</ul>
<p>While most client application only connect to a single server it is possible to configure multiple named channels if the client
needs to connect to multiple servers.</p>

<markup
lang="yaml"
title="application.yaml"
>grpc:
  channels:
    london:
      host: london.foo.com
      port: 1408
    new-york:
      host: ny.foo.com
      port: 1408</markup>

<p>The above example shows two channel configurations, one named <code>london</code> and the other <code>new-york</code>.</p>


<h4 id="_configuring_tls">Configuring TLS</h4>
<div class="section">
<p>It is also possible to configure a Channel to use TLS if the server is using TLS.</p>

<markup
lang="yaml"
title="application.yaml"
>grpc:
  channels:
    test-server:
      host: localhost
      port: 1408
      tls:                          <span class="conum" data-value="1" />
        enabled: true               <span class="conum" data-value="2" />
        tls-cert-path: /certs/foo.cert    <span class="conum" data-value="3" />
        tls-key-path: /certs/foo.key      <span class="conum" data-value="4" />
        tls-ca-cert-path: /certs/ca.cert   <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">The <code>tls</code> section of the channel configuration is used to configure TLS.</li>
<li data-value="2">The <code>enabled</code> value is used to enable or disable TLS for this channel.</li>
<li data-value="3">The <code>tls-cert</code> value is the location of the TLS certificate file</li>
<li data-value="4">The <code>tls-key</code> value is the location of the TLS key file</li>
<li data-value="5">The <code>tls-ca-cert</code> value is the location of the TLS CA certificate file</li>
</ul>
<p>The SSL configuration uses the Helidon <code>Resource</code> class to locate configured keys and certificates.
In the example above the <code>tls-cert-path</code> config key has the <code>-path</code> suffix which tells the configuration to load <code>/certs/foo.cert</code>
as a file. If <code>/certs/foo.cert</code> was a resource on the classpath the configuration key could have been changed to
<code>tls-cert-resource-path</code> to load <code>/certs/foo.cert</code> from the classpath. The same applies to the <code>tls-key</code> and <code>tls-ca-cert</code>
configuration keys. See the <code>io.helidon.common.configurable.Resource</code> class for details.</p>

</div>
</div>

<h3 id="_using_channels">Using Channels</h3>
<div class="section">
<p>Once one or more channels have been configured they can be used by client code. The simplest way to use a channel is to inject it
into beans using CDI. The Helidon gRPC client APIs have CDI producers that can provide <code>io.grpc.Channel</code> instances.</p>

<p>For example, a class might have an injectable <code>io.grpc.Channel</code> field:</p>

<markup
lang="java"
title="gRPC Channel Injection"
>    @Inject                             <span class="conum" data-value="1" />
    @GrpcChannel(name = "test-server")  <span class="conum" data-value="2" />
    private Channel channel;</markup>

<ul class="colist">
<li data-value="1">The <code>@Inject</code> annotation tells CDI to inject the channel.</li>
<li data-value="2">The <code>@GrpcChannel</code> annotation is the qualifier that supplies the Channel name. This is the same name as used in the channel
configuration in the configuration examples above.</li>
</ul>
<p>When an instance of the CDI bean with the channel field is instantiated a channel will be injected into it.</p>


<h4 id="_the_in_process_channel">The In-Process Channel</h4>
<div class="section">
<p>If code is running in an application that is executing as part of a Helidon MP gRPC server there is a special in-process channel
available. This allows code executing on the server to make calls to gRPC services deployed on that server in the same way an
external client does. To inject an in-process channel a different qualifier annotation is used.</p>

<markup
lang="java"
title="gRPC in-Process Channel Injection"
>    @Inject                  <span class="conum" data-value="1" />
    @InProcessGrpcChannel    <span class="conum" data-value="2" />
    private Channel channel;</markup>

<ul class="colist">
<li data-value="1">The <code>@Inject</code> annotation is used the same as previously.</li>
<li data-value="2">The <code>@InProcessGrpcChannel</code> is the qualifier that is used to tell the Helidon MP gRPC API to inject an in-process channel.</li>
</ul>
</div>
</div>

<h3 id="_using_the_client_interface_in_an_application">Using the Client Interface in an Application</h3>
<div class="section">
<p>Now that there is a client interface and a Channel configuration we can use these in the client application. The simplest way is
to use the client in a CDI microprofile application.</p>

<p>In the application class that requires the client we can declare a field of the same type as the client service interface.
The field is then annotated so that CDI will inject the client proxy into the field.</p>

<markup
lang="java"
title="Simple gRPC Service"
>@ApplicationScoped
public class Client {

    @Inject                                  <span class="conum" data-value="1" />
    @GrpcProxy                        <span class="conum" data-value="2" />
    @GrpcChannel(name = "test-server")       <span class="conum" data-value="3" />
    private StringService stringService;</markup>

<ul class="colist">
<li data-value="1">The <code>@Inject</code> annotation tells the CDI to inject the client implementation; the gRPC MP APIs have a bean provider that does this.</li>
<li data-value="2">The <code>@GrpcProxy</code> annotation is used by the CDI container to match the injection point to the gRPC MP APIs provider</li>
<li data-value="3">The <code>@GrpcChannel</code> annotation identifies the gRPC channel to be used by the client. The name used in the annotation refers to
a channel name in the application configuration.</li>
</ul>
<p>Now when the CDI container instantiates instances of the <code>Client</code> it will inject a dynamic proxy into the <code>stringService</code> field
and then any code in methods in the <code>Client</code> class can call methods on the <code>StringService</code> which will be translated to gRPC calls.</p>

<p>In the example above there is no need to directly use a <code>Channel</code> directly. The correct channel is added to the dynamic client
proxy internally by the Helidon MP gRPC APIs.</p>

</div>
</div>
</doc-view>