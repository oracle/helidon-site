<doc-view>

<h2 id="_service_health_checks">Service Health Checks</h2>
<div class="section">
<p>Helidon gRPC services provide a built-in support for Helidon Health Checks.</p>

<p>Unless a custom health check is implemented by the service developer, each service
deployed to the gRPC server will be provisioned with a default health check, which
always returns status of <code>UP</code>.</p>

<p>This allows all services, including the ones that don&#8217;t have a meaningful health check,
to show up in the health report (or to be queried for health) without service developer
having to do anything.</p>

<p>However, services that do need custom health checks can easily define one,
directly within <code>GrpcService</code> implementation:</p>

<markup
lang="java"

>public class MyService implements GrpcService {

    @Override
    public void update(ServiceDescriptor.Rules rules) {
        rules.unary("MyMethod", this::myMethod)
                .healthCheck(this::healthCheck);  <span class="conum" data-value="1" />
    }

    private HealthCheckResponse healthCheck() {
        boolean fUp = isMyServiceUp();            <span class="conum" data-value="2" />
        return HealthCheckResponse
                .named(name())                    <span class="conum" data-value="3" />
                .state(fUp)                       <span class="conum" data-value="4" />
                .withData("ts", System.currentTimeMillis())  <span class="conum" data-value="5" />
                .build();
    }

    private &lt;ReqT, ResT&gt; void myMethod(ReqT request, StreamObserver&lt;ResT&gt; observer) {
        // do something
    }
}</markup>

<ul class="colist">
<li data-value="1">Configure a custom health check for the service</li>
<li data-value="2">Determine service status</li>
<li data-value="3">Use service name as a health check name for consistency</li>
<li data-value="4">Use determined service status</li>
<li data-value="5">Optionally, provide additional metadata</li>
</ul>
<p>You can also define custom health check for an existing service, including plain
<code>io.grpc.BindableService</code> implementations, using service configurer inside the
<code>GrpcRouting</code> deefinition:</p>

<markup
lang="java"

>private static GrpcRouting createRouting() {
    return GrpcRouting.builder()
            .register(new EchoService(), cfg -&gt; cfg.healthCheck(MyCustomHealthChecks::echoHealthCheck))  <span class="conum" data-value="1" />
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Configure custom health check for an existing or legacy service</li>
</ul>
</div>

<h2 id="_exposing_health_checks">Exposing Health Checks</h2>
<div class="section">
<p>All gRPC service health checks are managed by the Helidon gRPC Server, and are
automatically exposed to the gRPC clients using custom implementation of the
standard gRPC <code>HealthService</code> API.</p>

<p>However, they can also be exposed to REST clients via standard Helidon/Microprofile
<code>/health</code> endpoint:</p>

<markup
lang="java"

>        GrpcServer grpcServer = GrpcServer.create(grpcServerConfig(), createRouting(config));  <span class="conum" data-value="1" />
        grpcServer.start();                                                                    <span class="conum" data-value="2" />

        HealthSupport health = HealthSupport.builder()
                .add(grpcServer.healthChecks())     <span class="conum" data-value="3" />
                .build();

        Routing routing = Routing.builder()
                .register(health)                   <span class="conum" data-value="4" />
                .build();

        WebServer.create(webServerConfig(), routing).start();   <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Create <code>GrpcServer</code> instance</li>
<li data-value="2">Start gRPC server, which will deploy all services and register default and custom health checks</li>
<li data-value="3">Add gRPC server managed health checks to <code>HealthSupport</code> instance</li>
<li data-value="4">Add <code>HealthSupport</code> to the web server routing definition</li>
<li data-value="5">Create and start web server</li>
</ul>
<p>All gRPC health checks will now be available via <code>/health</code> REST endpoint, in
addition to the standard gRPC <code>HealthService</code></p>

</div>
</doc-view>