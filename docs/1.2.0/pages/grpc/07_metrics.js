<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Service Metrics</dt>
<dd slot="desc"><p>Helidon gRPC Server has built-in support for metrics capture, which allows
service developers to easily enable application-level metrics for their services.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_enabling_metrics_capture">Enabling Metrics Capture</h2>
<div class="section">
<p>By default, gRPC Server only captures two vendor-level metrics: <code>grpc.request.count</code>
and <code>grpc.request.meter</code>. These metrics provide aggregate view of requests across
all services, and serve as an indication of the overall server load.</p>

<p>However, users can enable more fine grained metrics by simply configuring a built-in
<code>GrpcMetrics</code> interceptor within the routing:</p>

<markup
lang="java"

>    private static GrpcRouting createRouting(Config config) {
        return GrpcRouting.builder()
                .intercept(GrpcMetrics.timed())       <span class="conum" data-value="1" />
                .register(new GreetService(config))
                .register(new EchoService())
                .build();
    }</markup>

<ul class="colist">
<li data-value="1">Capture metrics for all methods of all services as a <code>timer</code></li>
</ul>
<p>In the example above we have chosen to create and keep a <code>timer</code> metric type for
each method of each service. Alternatively, we could&#8217;ve chosen to use a
<code>counter</code>, <code>meter</code> or a <code>histogram</code> instead.</p>

</div>

<h2 id="_overriding_metrics_capture">Overriding Metrics Capture</h2>
<div class="section">
<p>While global metrics capture is certainly useful, it is not always sufficient.
Keeping a separate <code>timer</code> for each gRPC method may be an overkill, so the user
could decide to use a lighter-weight metric type, such as <code>counter</code> or a <code>meter</code>.</p>

<p>However, she may still want to enable <code>histogram</code> or a <code>timer</code> for some services,
or even only some methods of some services.</p>

<p>This can be easily accomplished by overriding the type of the captured metric at
either service or the method level:</p>

<markup
lang="java"

>    private static GrpcRouting createRouting(Config config) {
        return GrpcRouting.builder()
                .intercept(GrpcMetrics.counted())   <span class="conum" data-value="1" />
                .register(new MyService())
                .build();
    }

    public static class MyService implements GrpcService {

        @Override
        public void update(ServiceDescriptor.Rules rules) {
            rules
                .intercept(GrpcMetrics.metered())                     <span class="conum" data-value="2" />
                .unary("MyMethod", this::myMethod,
                           cfg -&gt; cfg.intercept(GrpcMetrics.timer())) <span class="conum" data-value="3" />
        }

        private &lt;ReqT, ResT&gt; void myMethod(ReqT request, StreamObserver&lt;ResT&gt; observer) {
            // do something
        }
    }</markup>

<ul class="colist">
<li data-value="1">Use <code>counter</code> for all methods of all services, unless overridden</li>
<li data-value="2">Use <code>meter</code> for all methods of <code>MyService</code></li>
<li data-value="3">Use <code>timer</code> for <code>MyService::MyMethod</code></li>
</ul>
</div>

<h2 id="_exposing_metrics_externally">Exposing Metrics Externally</h2>
<div class="section">
<p>Collected metrics are stored in the standard Helidon Metric Registries, such as vendor and
application registry, and can be exposed via standard <code>/metrics</code> REST API.</p>

<markup
lang="java"

>        Routing routing = Routing.builder()
                .register(MetricsSupport.create())    <span class="conum" data-value="1" />
                .build();

        WebServer.create(webServerConfig(), routing)  <span class="conum" data-value="2" />
                 .start()</markup>

<ul class="colist">
<li data-value="1">Add <code>MetricsSupport</code> instance to web server routing</li>
<li data-value="2">Create and start Helidon web server</li>
</ul>
<p>See <router-link to="/metrics/01_metrics">Helidon Metrics</router-link> documentation for more details.</p>

</div>

<h2 id="_specifying_metric_meta_data">Specifying Metric Meta-data</h2>
<div class="section">
<p>Helidon metrics contain meta-data such as tags, a description, units etc. It is possible to
add this additional meta-data when specifying the metrics.</p>


<h3 id="_adding_tags">Adding Tags</h3>
<div class="section">
<p>To add tags to a metric a <code>Map</code> of key/value tags can be supplied.
For example:</p>

<markup
lang="java"

>Map&lt;String, String&gt; tagMap = new HashMap&lt;&gt;();
tagMap.put("keyOne", "valueOne");
tagMap.put("keyTwo", "valueTwo");

GrpcRouting routing = GrpcRouting.builder()
        .intercept(GrpcMetrics.counted().tags(tagMap))   <span class="conum" data-value="1" />
        .register(new MyService())
        .build();</markup>

<ul class="colist">
<li data-value="1">the <code>tags()</code> method is used to add the <code>Map</code> of tags to the metric.</li>
</ul>
</div>

<h3 id="_adding_a_description">Adding a Description</h3>
<div class="section">
<p>A meaningful description can be added to a metric:
For example:</p>

<markup
lang="java"

>GrpcRouting routing = GrpcRouting.builder()
        .intercept(GrpcMetrics.counted().description("Something useful")) <span class="conum" data-value="1" />
        .register(new MyService())
        .build();</markup>

<ul class="colist">
<li data-value="1">the <code>description()</code> method is used to add the description to the metric.</li>
</ul>
</div>

<h3 id="_adding_metric_units">Adding Metric Units</h3>
<div class="section">
<p>A units value can be added to the Metric:
For example:</p>

<markup
lang="java"

>GrpcRouting routing = GrpcRouting.builder()
        .intercept(GrpcMetrics.timed().units(MetricUnits.SECONDS)) <span class="conum" data-value="1" />
        .register(new MyService())
        .build();</markup>

<ul class="colist">
<li data-value="1">the <code>units()</code> method is used to add the metric units to the metric.
Typically the units value is one of the constants from <code>org.eclipse.microprofile.metrics.MetricUnits</code> class.</li>
</ul>
</div>
</div>

<h2 id="_overriding_the_metric_name">Overriding the Metric Name</h2>
<div class="section">
<p>By default the metric name is the gRPC service name followed by a dot ('.') followed by the method name.
It is possible to supply a function that can be used to override the default behaviour.</p>

<p>The function should implement the <code>io.helidon.grpc.metrics.GrpcMetrics.NamingFunction</code> interface</p>

<markup
lang="java"

>    @FunctionalInterface
    public interface NamingFunction {
        /**
         * Create a metric name.
         *
         * @param service    the service descriptor
         * @param methodName the method name
         * @param metricType the metric type
         * @return the metric name
         */
        String createName(ServiceDescriptor service, String methodName, MetricType metricType);
    }</markup>

<p>This is a functional interface so lambda can be used too.</p>

<p>For example:</p>

<markup
lang="java"

>GrpcRouting routing = GrpcRouting.builder()
        .intercept(GrpcMetrics.counted()
                .nameFunction((svc, method, metric) -&gt; "grpc." + service.name() + '.' + method) <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">the <code>NamingFunction</code> is just a lambda that returns the concatenated service name and method name
with the prefix <code>grpc.</code> So for a service "Foo", method "bar" the above example would produce a name
"grpc.Foo.bar".</li>
</ul>
</div>
</doc-view>