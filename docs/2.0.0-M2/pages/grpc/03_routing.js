<doc-view>

<h2 id="_grpc_server_routing">gRPC Server Routing</h2>
<div class="section">
<p>Unlike Webserver, which allows you to route requests based on path expression
and the HTTP verb, gRPC server always routes requests based on the service and
method name. This makes routing configuration somewhat simpler&#8201;&#8212;&#8201;all you need
to do is register your services:</p>

<markup
lang="java"

>    private static GrpcRouting createRouting(Config config) {
        return GrpcRouting.builder()
                .register(new GreetService(config)) <span class="conum" data-value="1" />
                .register(new EchoService())        <span class="conum" data-value="2" />
                .register(new MathService())        <span class="conum" data-value="3" />
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Register <code>GreetService</code> instance.</li>
<li data-value="2">Register <code>EchoService</code> instance.</li>
<li data-value="3">Register <code>MathService</code> instance.</li>
</ul>
<p>Both "standard" gRPC services that implement <code>io.grpc.BindableService</code> interface
(typically implemented by extending generated server-side stub and overriding
its methods), and Helidon gRPC services that implement
<code>io.helidon.grpc.server.GrpcService</code> interface can be registered.</p>

<p>The difference is that Helidon gRPC services allow you to customize behavior
down to the method level, and provide a number of useful helper methods that
make service implementation easier, as we&#8217;ll see in a moment.</p>

</div>

<h2 id="_customizing_service_definitions">Customizing Service Definitions</h2>
<div class="section">
<p>When registering a service, regardless of its type, you can customize its
descriptor by providing configuration consumer as a second argument to the
<code>register</code> method.</p>

<p>This is particularly useful when registering standard <code>BindableService</code>
instances, as it allows you to add certain Helidon-specific behaviors, such as
<router-link to="#06_health_checks.adoc" @click.native="this.scrollFix('#06_health_checks.adoc')">health checks</router-link> and <router-link to="#07_metrics.adoc" @click.native="this.scrollFix('#07_metrics.adoc')">metrics</router-link> to them:</p>

<markup
lang="java"

>    private static GrpcRouting createRouting(Config config) {
        return GrpcRouting.builder()
                .register(new GreetService(config))
                .register(new EchoService(), service -&gt; {
                    service.healthCheck(CustomHealthChecks::echoHealthCheck)  <span class="conum" data-value="1" />
                           .metered();                                        <span class="conum" data-value="2" />
                })
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Add custom health check to the service.</li>
<li data-value="2">Specify that all the calls to service methods should be metered.</li>
</ul>
</div>

<h2 id="_specifying_global_interceptors">Specifying Global Interceptors</h2>
<div class="section">
<p><code>GrpcRouting</code> also allows you to specify <router-link to="#05_interceptors.adoc" @click.native="this.scrollFix('#05_interceptors.adoc')">custom interceptors</router-link>
that will be applied to all registered services.</p>

<p>This is useful to configure features such as tracing, security and metrics collection,
and we provide built-in interceptors for those purposes that you can simply register
with the routing definition:</p>

<markup
lang="java"

>    private static GrpcRouting createRouting(Config config) {
        return GrpcRouting.builder()
                .intercept(GrpcMetrics.timed())     <span class="conum" data-value="1" />
                .register(new GreetService(config))
                .register(new EchoService())
                .register(new MathService())
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Register <code>GrpcMetrics</code> interceptor that will collect timers for all methods of
all services (but can be overridden at the individual service or even method level).</li>
</ul>
</div>
</doc-view>