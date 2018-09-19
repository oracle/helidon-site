<doc-view>

<h2 >Metrics Support</h2>
<div class="section">
<p>The WebServer includes Prometheus support for metrics.</p>


<h3 >Prerequisites</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"
title="Webserver Prometheus Support Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver-prometheus&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 >Configuring Prometheus</h3>
<div class="section">
<p>To enable Prometheus integration, register Prometheus support
with the WebServer:</p>

<markup
lang="java"
title="Configuring Prometheus"
>Routing.builder()
                .register(PrometheusSupport.create())
                .register("/myapp", new MyService())
                .build();</markup>

<p>Then you can interact with Prometheus collectors in your service. Metrics are available at <code>/metrics</code></p>

<markup
lang="java"
title="Define a Prometheus Counter"
>public class MyService implements Service {
    static final Counter accessCtr = Counter.build()
        .name("requests_total").help("Total requests.").register();  <span class="conum" data-value="1" />

    @Override
    public void update(Routing.Rules rules) {
            rules
                 .any(this::countAccess)
                 .get("/", this::myGet);
        }

    private void countAccess(ServerRequest request, ServerResponse response) {
            accessCtr.inc(); <span class="conum" data-value="2" />
            request.next();
    }
}</markup>

<ul class="colist">
<li data-value="1">Register a Prometheus <code>Counter</code> with the default Collector</li>
<li data-value="2">Use the <code>Counter</code> in a request handler</li>
</ul>
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