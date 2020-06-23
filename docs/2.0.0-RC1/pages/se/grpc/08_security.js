<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC Server Security</dt>
<dd slot="desc"><p>Security integration of the  <router-link to="#grpc/01_introduction.adoc" @click.native="this.scrollFix('#grpc/01_introduction.adoc')">gRPC server</router-link></p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security.integration&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-integration-grpc&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_bootstrapping">Bootstrapping</h2>
<div class="section">
<p>There are two steps to configure security with gRPC server:</p>

<ol style="margin-left: 15px;">
<li>
Create security instance and register it with server

</li>
<li>
Protect gRPC services of server with various security features

</li>
</ol>
<markup
lang="java"
title="Example using builders"
>// gRPC server's routing
GrpcRouting.builder()
    // This is step 1 - register security instance with gRPC server processing
    // security - instance of security either from config or from a builder
    // securityDefaults - default enforcement for each service that has a security definition
    .intercept(GrpcSecurity.create(security).securityDefaults(GrpcSecurity.authenticate()))
    // this is step 2 - protect a service
    // register and protect this service with authentication (from defaults) and role "user"
    .register(greetService, GrpcSecurity.rolesAllowed("user"))
    .build();</markup>

<markup
lang="java"
title="Example using builders for more fine grained method level security"
>// create the service descriptor
ServiceDescriptor greetService = ServiceDescriptor.builder(new GreetService())
        // Add an instance of gRPC security that will apply to all methods of
        // the service - in this case require the "user" role
        .intercept(GrpcSecurity.rolesAllowed("user"))
        // Add an instance of gRPC security that will apply to the "SetGreeting"
        // method of the service - in this case require the "admin" role
        .intercept("SetGreeting", GrpcSecurity.rolesAllowed("admin"))
        .build();

// Create the gRPC server's routing
GrpcRouting.builder()
    // This is step 1 - register security instance with gRPC server processing
    // security - instance of security either from config or from a builder
    // securityDefaults - default enforcement for each service that has a security definition
    .intercept(GrpcSecurity.create(security).securityDefaults(GrpcSecurity.authenticate()))
    // this is step 2 - add the service descriptor
    .register(greetService)
    .build();</markup>

<markup
lang="java"
title="Example using configuration"
>GrpcRouting.builder()
    // helper method to load both security and gRPC server security from configuration
    .intercept(GrpcSecurity.create(config))
    // continue with gRPC server route configuration...
    .register(new GreetService())
    .build();</markup>

<markup
lang="conf"
title="Example using configuration - configuration (HOCON)"
># This may change in the future - to align with gRPC server configuration,
# once it is supported
security
  grpc-server:
    # Configuration of integration with gRPC server
    defaults:
        authenticate: true
    # Configuration security for individual services
    services:
    - name: "GreetService"
      defaults:
      roles-allowed: ["user"]
      # Configuration security for individual methods of the service
      methods:
      - name: "SetGreeting"
        roles-allowed: ["admin"]</markup>


<h3 id="_client_security">Client security</h3>
<div class="section">
<p>When using the Helidon SE gRPC client API security can be configured for a gRPC service
or at the individual method level. The client API has a custom <code>CallCredentials</code> implementation that
integrates with the Helidon security APIs.</p>

<markup
lang="java"
title="Example configuring client security for a service"
>Security security = Security.builder()  <span class="conum" data-value="1" />
        .addProvider(HttpBasicAuthProvider.create(config.get("http-basic-auth")))
        .build();

GrpcClientSecurity clientSecurity = GrpcClientSecurity.builder(security.createContext("test.client")) <span class="conum" data-value="2" />
        .property(HttpBasicAuthProvider.EP_PROPERTY_OUTBOUND_USER, user)
        .property(HttpBasicAuthProvider.EP_PROPERTY_OUTBOUND_PASSWORD, password)
        .build();

ClientServiceDescriptor descriptor = ClientServiceDescriptor <span class="conum" data-value="3" />
        .builder(StringService.class)
        .unary("Lower")
        .callCredentials(clientSecurity)                     <span class="conum" data-value="4" />
        .build();

GrpcServiceClient client = GrpcServiceClient.create(channel, descriptor); <span class="conum" data-value="5" />

String response = client.blockingUnary("Lower", "ABCD"); <span class="conum" data-value="6" /></markup>

<ul class="colist">
<li data-value="1">Create the Helidon <code>Security</code> instance (in this case using the basic auth provider)</li>
<li data-value="2">Create the <code>GrpcClientSecurity</code> gRPC <code>CallCredentials</code> adding the user and password
property expected by the basic auth provider.</li>
<li data-value="3">Create the gRPC <code>ClientServiceDescriptor</code> for the <code>StringService</code> gRPC service.</li>
<li data-value="4">Set the <code>GrpcClientSecurity</code> instance as the call credentials for all methods of the service</li>
<li data-value="5">Create a <code>GrpcServiceClient</code> that will allow methods to be called on the service</li>
<li data-value="6">Call the "Lower" method which will use the configured basic auth credentials</li>
</ul>
<markup
lang="java"
title="Example configuring client security for a specific method"
>GrpcClientSecurity clientSecurity = GrpcClientSecurity.builder(security.createContext("test.client")) <span class="conum" data-value="1" />
        .property(HttpBasicAuthProvider.EP_PROPERTY_OUTBOUND_USER, user)
        .property(HttpBasicAuthProvider.EP_PROPERTY_OUTBOUND_PASSWORD, password)
        .build();

ClientServiceDescriptor descriptor = ClientServiceDescriptor <span class="conum" data-value="2" />
        .builder(StringService.class)
        .unary("Lower")
        .unary("Upper", rules -&gt; rules.callCredentials(clientSecurity)) <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Create the <code>GrpcClientSecurity</code> call credentials in the same way as above.</li>
<li data-value="2">Create the <code>ClientServiceDescriptor</code>, this time with two unary methods, "Lower" and "Upper".</li>
<li data-value="3">The "Upper" method is configured to use the <code>GrpcClientSecurity</code> call credentials, the "Lower" method
will be called without any credentials.</li>
</ul>
</div>

<h3 id="_outbound_security">Outbound security</h3>
<div class="section">
<p>Outbound security covers three scenarios:</p>

<ul class="ulist">
<li>
<p>Calling a secure gRPC service from inside a gRPC service method handler</p>

</li>
<li>
<p>Calling a secure gRPC service from inside a web server method handler</p>

</li>
<li>
<p>Calling a secure web endpoint from inside a gRPC service method handler</p>

</li>
</ul>
<p>Within each scenario credentials can be propagated if the gRPC/http method
handler is executing within a security context or credentials can be overridden
to provide a different set of credentials to use to call the outbound endpoint.</p>

<markup
lang="java"
title="Example calling a secure gRPC service from inside a gRPC service method handler"
>// Obtain the SecurityContext from the current gRPC call Context
SecurityContext securityContext = GrpcSecurity.SECURITY_CONTEXT.get();

// Create a gRPC CallCredentials that will use the current request's
// security context to configure outbound credentials
GrpcClientSecurity clientSecurity = GrpcClientSecurity.create(securityContext);

// Create the gRPC stub using the CallCredentials
EchoServiceGrpc.EchoServiceBlockingStub stub = noCredsEchoStub.withCallCredentials(clientSecurity);</markup>

<markup
lang="java"
title="Example calling a secure gRPC service from inside a web server method handler"
>private static void propagateCredentialsWebRequest(ServerRequest req, ServerResponse res) {
    try {
        // Create a gRPC CallCredentials that will use the current request's
        // security context to configure outbound credentials
        GrpcClientSecurity clientSecurity = GrpcClientSecurity.create(req);

        // Create the gRPC stub using the CallCredentials
        EchoServiceGrpc.EchoServiceBlockingStub stub = noCredsEchoStub.withCallCredentials(clientSecurity);

        String message = req.queryParams().first("message").orElse(null);
        Echo.EchoResponse echoResponse = stub.echo(Echo.EchoRequest.newBuilder().setMessage(message).build());
        res.send(echoResponse.getMessage());
    } catch (StatusRuntimeException e) {
        res.status(GrpcHelper.toHttpResponseStatus(e)).send();
    } catch (Throwable thrown) {
        res.status(Http.ResponseStatus.create(500, thrown.getMessage())).send();
    }
}</markup>

<markup
lang="java"
title="Example calling a secure web endpoint from inside a gRPC service method handler"
>// Obtain the SecurityContext from the gRPC call Context
SecurityContext securityContext = GrpcSecurity.SECURITY_CONTEXT.get();

// Use the SecurityContext as normal to make a http request
Response webResponse = client.target(url)
        .path("/test")
        .request()
        .property(ClientSecurityFeature.PROPERTY_CONTEXT, securityContext)
        .get();</markup>

</div>
</div>
</doc-view>