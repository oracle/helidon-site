<doc-view>

<h2 id="_interceptors">Interceptors</h2>
<div class="section">
<p>Helidon gRPC allows you to configure standard `io.grpc.ServerInterceptor`s.</p>

<p>For example, you could implement an interceptor that logs each RPC call:</p>

<markup
lang="java"

>class LoggingInterceptor implements ServerInterceptor {   <span class="conum" data-value="1" />

    private static final Logger LOG = Logger.getLogger(LoggingInterceptor.class.getName());

    @Override
    public &lt;ReqT, ResT&gt; ServerCall.Listener&lt;ReqT&gt; interceptCall(ServerCall&lt;ReqT, ResT&gt; call,
                                                                 Metadata metadata,
                                                                 ServerCallHandler&lt;ReqT, ResT&gt; handler) {

        LOG.info(() -&gt; "CALL: " + call.getMethodDescriptor());  <span class="conum" data-value="2" />
        return handler.startCall(call, metadata);               <span class="conum" data-value="3" />
    }
}</markup>

<ul class="colist">
<li data-value="1">Implement <code>io.grpc.ServerInterceptor</code></li>
<li data-value="2">Implement the logging logic</li>
<li data-value="3">Start intercepted call</li>
</ul>
</div>

<h2 id="_registering_interceptors">Registering Interceptors</h2>
<div class="section">
<p>You can register interceptors globally, in which case they will be applied to all
methods of all services, by simply adding them to the <code>GrpcRouting</code> instance:</p>

<markup
lang="java"

>private static GrpcRouting createRouting(Config config) {
    return GrpcRouting.builder()
            .intercept(new LoggingInterceptor())  <span class="conum" data-value="1" />
            .register(new GreetService(config))
            .register(new EchoService())
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Adds <code>LoggingInterceptor</code> to all methods of <code>GreetService</code> and <code>EchoService</code></li>
</ul>
<p>You can also register an interceptor for a specific service, either by implementing
<code>GrpcService.update</code> method:</p>

<markup
lang="java"

>public class MyService implements GrpcService {

    @Override
    public void update(ServiceDescriptor.Rules rules) {
        rules.intercept(new LoggingInterceptor())   <span class="conum" data-value="1" />
                .unary("MyMethod", this::myMethod);
    }

    private &lt;ReqT, ResT&gt; void myMethod(ReqT request, StreamObserver&lt;ResT&gt; observer) {
        // do something
    }
}</markup>

<ul class="colist">
<li data-value="1">Adds <code>LoggingInterceptor</code> to all methods of <code>MyService</code></li>
</ul>
<p>Or by configuring <code>ServiceDescriptor</code> externally, when creating <code>GrpcRouting</code>, which
allows you to add interceptors to plain <code>io.grpc.BindableService</code> services as well:</p>

<markup
lang="java"

>private static GrpcRouting createRouting(Config config) {
    return GrpcRouting.builder()
            .register(new GreetService(config), cfg -&gt; cfg.intercept(new LoggingInterceptor()))  <span class="conum" data-value="1" />
            .register(new EchoService())
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Adds <code>LoggingInterceptor</code> to all methods of <code>GreetService</code> only</li>
</ul>
<p>Finally, you can also register an interceptor at the method level:</p>

<markup
lang="java"

>public class MyService implements GrpcService {

    @Override
    public void update(ServiceDescriptor.Rules rules) {
        rules.unary("MyMethod",
                     this::myMethod,
                     cfg -&gt; cfg.intercept(new LoggingInterceptor()));  <span class="conum" data-value="1" />
    }

    private &lt;ReqT, ResT&gt; void myMethod(ReqT request, StreamObserver&lt;ResT&gt; observer) {
        // do something
    }
}</markup>

<ul class="colist">
<li data-value="1">Adds <code>LoggingInterceptor</code> to <code>MyService::MyMethod</code> only</li>
</ul>
</div>
</doc-view>