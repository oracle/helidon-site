<doc-view>

<h2 >Metrics Support</h2>
<div class="section">
<p>Helidon WebServer includes support for MicroProfile Metrics. MicroProfile
Metrics has a variety of metric types and two reporting formats that
are exposed at the <code>/metrics</code> endpoint.</p>


<h3 >Prerequisites</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"
title="Webserver Metrics Dependency"
>    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.microprofile.metrics&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-metrics-se&lt;/artifactId&gt;
    &lt;/dependency&gt;</markup>

</div>

<h3 >Using Metrics in Your Application</h3>
<div class="section">
<p>To enable Metrics, register it with the WebServer.</p>

<markup
lang="java"
title="Configuring Metrics in WebServer"
>import io.helidon.metrics.MetricsSupport;
. . .

Routing.builder()
                .register(MetricsSupport.create())
                .register("/myapp", new MyService())
                .build();</markup>

<p>Then you can use metrics in your service.</p>

<markup
lang="java"
title="Define and use a Metrics Counter"
>import io.helidon.metrics.RegistryFactory;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricRegistry;
. . .

public class MyService implements Service {

    private final MetricRegistry registry = RegistryFactory.getRegistryFactory().get()
        .getRegistry(MetricRegistry.Type.APPLICATION); <span class="conum" data-value="1" />
    private final Counter accessCtr = registry.counter("accessctr"); <span class="conum" data-value="2" />

    @Override
    public void update(Routing.Rules rules) {
        rules
             .any(this::countAccess)
             .get("/", this::myGet);
    }

    private void countAccess(ServerRequest request, ServerResponse response) {
            accessCtr.inc(); <span class="conum" data-value="3" />
            request.next();
    }
}</markup>

<ul class="colist">
<li data-value="1">Get the application metrics registry</li>
<li data-value="2">Create a counter in that registry</li>
<li data-value="3">Increment the counter for every request</li>
</ul>
</div>

<h3 >Accessing Metrics Endpoint</h3>
<div class="section">
<p>Access metrics data via the <code>/metrics</code> endpoint. Two reporting formats
are supported. The HTTP Accept header sent by the client determines
the reporting format:</p>

<ol style="margin-left: 15px;">
<li>
JSON format - used when the HTTP Accept header matches <code>application/json</code>

</li>
<li>
Prometheus text format - used when the HTTP Accept header is <code>text/plain</code>
or otherwise does not match <code>application/json</code>

</li>
</ol>
<markup
lang="bash"
title="Example Reporting: Prometheus format"
>curl -s -H 'Accept: text/plain' -X GET http://localhost:8080/metrics/
# TYPE base:classloader_total_loaded_class_count counter
# HELP base:classloader_total_loaded_class_count Displays the total number of classes that have been loaded since the Java virtual machine has started execution.
base:classloader_total_loaded_class_count 3157
. . .</markup>

<markup
lang="bash"
title="Example Reporting: JSON format"
>curl -s -H 'Accept: application/json' -X GET http://localhost:8080/metrics/ | json_pp
{
   "base" : {
      "memory.maxHeap" : 3817865216,
      "memory.committedHeap" : 335544320,
. . .</markup>

<p>In addition to your application metrics the reports contain other
metrics of interest such as system and VM information.</p>

<p>For full details see the
<a id=""
title=""
target="_blank"
href="https://github.com/eclipse/microprofile-metrics/releases">MicroProfile Metrics</a>
specification.</p>

</div>
</div>

<h2 >Implementing a Health Check</h2>
<div class="section">
<p>The WebServer does not include a dedicated health check feature, but you
can implement a health check by defining an appropriate endpoint.</p>

<p>To create a health check that runs on a separate port from your main web application:</p>

<ol style="margin-left: 15px;">
<li>
Define a second socket in the WebServer&#8217;s configuration.

</li>
<li>
Create a health service to handle requests on the socket.

</li>
<li>
Add a route to the health service.

</li>
</ol>
<markup
lang="yaml"
title="Define a health check socket in application.yaml"
>server:
  port: 8080
  sockets:
    health:  <span class="conum" data-value="1" />
        port: 9090</markup>

<ul class="colist">
<li data-value="1">Name this socket "health"</li>
</ul>
<markup
lang="java"
title="Create a health service"
>public class HealthCheckService implements Service {

    HealthCheckService() {
    }

    @Override
    public void update(Routing.Rules rules) {
        rules.get("/health", this::get);
    }

    public void get(ServerRequest req, ServerResponse res) {
        res.status(200).send();
    }
}</markup>

<markup
lang="java"
title="Define a route to the HealthCheckService service on the socket"
>        // By default this picks up application.yaml from the classpath
        Config config = Config.create();

        // Get WebServer config from the "server" section of application.yaml
        ServerConfiguration serverConfig = ServerConfiguration.
            fromConfig(config.get("server"));

        WebServer server = WebServer.builder(createRouting())  <span class="conum" data-value="1" />
                        .configuration(serverConfig)
                        .addNamedRouting("health",  <span class="conum" data-value="2" />
                                Routing.builder()
                                .register(new HealthCheckService())  <span class="conum" data-value="3" />
                                .build())
                        .build();</markup>

<ul class="colist">
<li data-value="1"><code>createRouting()</code> creates a <code>Routing</code> object for your main application.
See the <router-link :to="{path: '/getting-started/02_base-example', hash: '#Quickstart Examples'}">Quickstart examples</router-link>.</li>
<li data-value="2">Add routing for a named socket. This name must match the name of the socket
used in the WebServer configuration.</li>
<li data-value="3">Register the health check service on that socket.</li>
</ul>
<p>You can access your health check at <code>host:9090/health</code></p>

</div>
</doc-view>