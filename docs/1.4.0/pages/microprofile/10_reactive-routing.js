<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Reactive routing in Helidon MP</dt>
<dd slot="desc"><p>Since Helidon 1.4</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_a_reactive_route_in_helidon_mp">Configuring a reactive route in Helidon MP</h2>
<div class="section">
<p>Helidon MP Server will pick up CDI beans that implement the <code>io.helidon.webserver.Service</code>
interface and configure them with the underlying WebServer.</p>

<p>This allows configuration of reactive routes to run alongside a JAX-RS application.</p>

<p>The bean is expected to be either <code>ApplicationScoped</code> or <code>Dependent</code> and will be requested
only once during the boot of the <code>Server</code>.</p>

<p>The bean will support injection of <code>ApplicationScoped</code> and <code>Dependent</code> scoped beans.
You cannot inject <code>RequestScoped</code> beans. Please use WebServer features to handle request
related objects.</p>


<h3 id="_customizing_the_reactive_service">Customizing the reactive service</h3>
<div class="section">
<p>The service can be customized using annotations and/or configuration to be</p>

<ul class="ulist">
<li>
<p>registered on a specific path</p>

</li>
<li>
<p>registered with a named routing</p>

</li>
</ul>

<h4 id="_assigning_a_reactive_service_to_named_ports">Assigning a reactive service to named ports</h4>
<div class="section">
<p>Helidon has the concept of named routings. These correspond to the named ports
configured with WebServer.</p>

<p>You can assign a reactive service to a named routing (and as a result to a named port) using
either an annotation or configuration (or both to override the value from annotation).</p>


<h5 id="_annotation_routingname">Annotation <code>@RoutingName</code></h5>
<div class="section">
<p>You can annotated a service with this annotation to assign it to a specific named routing,
that is (most likely) going to be bound to a specific port.</p>

<p>The annotation has two attributes:
- <code>value</code> that defines the routing name
- <code>required</code> to mark that the routing name MUST be configured in Helidon server</p>

<p>Example:</p>

<div class="listing">
<pre>@ApplicationScoped
@RoutingName(value="admin", required="true")
@RoutingPath("/admin")
public class AdminService implements Service {
//....
}</pre>
</div>

<p>The example above will be bound to <code>admin</code> routing (and port) and will fail if such a port
is not configured.</p>

</div>

<h5 id="_configuration_override_of_routing_name">Configuration override of routing name</h5>
<div class="section">
<p>For each service class you can define the routing name and its required flag by specifying a configuration
option <code>class-name.routing-name.name</code> and <code>class-name.routing-name.required</code>.</p>

<p>Example (YAML) configuration for a class <code>io.helidon.examples.AdminService</code> that changes the
routing name to <code>management</code> and its required flag to <code>false</code>:</p>

<div class="listing">
<pre>io.helidon.examples.AdminService:
  routing-name:
    name: "management"
    required: false</pre>
</div>

</div>
</div>

<h4 id="_configuring_a_reactive_service_path">Configuring a reactive service path</h4>
<div class="section">
<p>Each service is registered on a path. If none is configured, then the service would be
configured on the root path.</p>

<p>You can configure service path using an annotation or configuration (or both to override value from annotation)</p>


<h5 id="_annotation_routingpath">Annotation <code>@RoutingPath</code></h5>
<div class="section">
<p>You can configure <code>@RoutingPath</code> to define the path a service is registered on.</p>

</div>

<h5 id="_configuration_override_of_routing_path">Configuration override of routing path</h5>
<div class="section">
<p>For each reactive service class you can define the routing path by specifying a configuration
option <code>class-name.routing-path.path</code>.</p>

<p>Example (YAML) configuration for a class <code>io.helidon.example.AdminService</code> that changes the
routing path to <code>/management</code>:</p>

<div class="listing">
<pre>io.helidon.examples.AdminService:
  routing-path:
    path: "/management"</pre>
</div>

</div>
</div>
</div>

<h3 id="_example_configuration_of_reactive_service">Example configuration of reactive service</h3>
<div class="section">
<p>A full configuration example (YAML):</p>

<div class="listing">
<pre>server:
  port: 8080
  sockets:
    management:
      port: 8090

io.helidon.examples.AdminService:
  routing-name:
    name: "management"
    required: true
  routing-path:
    path: "/management"</pre>
</div>

</div>
</div>
</doc-view>