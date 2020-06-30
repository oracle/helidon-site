<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Configuring the Server</dt>
<dd slot="desc"><p>By default, the server uses the MicroProfile Config, but you may also want to use Helidon configuration.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_the_server">Configuring the Server</h2>
<div class="section">
<p>There are 3 default MicroProfile Config sources:</p>

<ul class="ulist">
<li>
<p><code>System.getProperties()</code></p>

</li>
<li>
<p><code>System.getenv()</code></p>

</li>
<li>
<p>all <code>META-INF/microprofile-config.properties</code> files on the class path</p>

</li>
<li>
<p><code>application.yaml</code> on the classpath (read by default by Helidon Config)</p>

</li>
</ul>
<p>In this example, the configuration is in a file, and it includes Helidon configuration options.</p>

<markup
lang="properties"
title="META-INF/microprofile-config.properties - Server configuration"
># default is localhost
server.host=some.host
# default is 7001
server.port=7011

# Helidon configuration (optional)

# Length of queue for incoming connections. Default is 1024
server.backlog: 512
# TCP receive window. Default is 0 to use implementation default
server.receive-buffer: 256
# Socket timeout milliseconds - defaults to 0 (infinite)
server.timeout: 30000
# Defaults to Runtime.availableProcessors()
server.workers=4
# Default is not to use SSL
ssl:
 private-key:
    keystore-resource-path: "certificate.p12"
    keystore-passphrase: "abcd"</markup>

</div>

<h2 id="_configuring_additional_ports">Configuring additional ports</h2>
<div class="section">
<p>Helidon MP can expose multiple ports, with the following limitations:</p>

<ul class="ulist">
<li>
<p>The default port is the port that serves your application (JAX-RS applications and resources)</p>

</li>
<li>
<p>Other ports (in this example we configure one "admin" port) can be assigned endpoints that are exposed by Helidon components,
currently supported by MP Health and MP Metrics</p>

</li>
</ul>
<p>For this example, we will use a <code>yaml</code> file:</p>

<ul class="ulist">
<li>
<p>The port <code>7011</code> is the default port and will serve your application</p>

</li>
<li>
<p>The port <code>8011</code> is named "admin" (this is an arbitrary name)</p>

</li>
<li>
<p>MP Metrics are configured to use the "admin" port through the <code>routing</code> configuration (reference is by name)</p>

</li>
<li>
<p>MP Health is configured the same way to reference the "admin" port</p>

</li>
</ul>
<markup
lang="yaml"
title="application.yaml - Server configuration"
>server:
  port: 7011
  host: "some.host"
  sockets:
    admin:
      port: 8011
      bind-address: "some.host"

metrics:
  routing: "admin"

health:
  routing: "admin"</markup>

</div>

<h2 id="_assigning_jax_rs_applications_to_ports">Assigning JAX-RS applications to ports</h2>
<div class="section">
<p>Since 1.4</p>

<p>Helidon has the concept of named routings. These correspond to the named ports
we have described in the previous section.</p>

<p>You can assign a JAX-RS application to a named routing (and as a result to a named port) using
either an annotation or configuration (or both to override the value from annotation).</p>


<h3 id="_annotation_routingname">Annotation <code>@RoutingName</code></h3>
<div class="section">
<p>You can annotate an application with this annotation to assign it to a specific named routing,
that is (most likely) going to be bound to a specific port.</p>

<p>The annotation has two attributes:
- <code>value</code> that defines the routing name
- <code>required</code> to mark that the routing name MUST be configured in Helidon server</p>

<markup
lang="yaml"
title="<code>@RoutingName</code> example"
>@ApplicationScoped
@ApplicationPath("/admin")
@RoutingName(value="admin", required="true")
public class AdminApplication extends Application {
//....
}</markup>

<p>The example above will be bound to <code>admin</code> routing (and port) and will fail if such a port
is not configured.</p>

</div>

<h3 id="_configuration_override_of_routing_name">Configuration override of routing name</h3>
<div class="section">
<p>For each application class you can define the routing name and its required flag by specifying a configuration
option <code>class-name.routing-name.name</code> and <code>class-name.routing-name.required</code>.</p>

<p>Example (YAML) configuration for a class <code>io.helidon.examples.AdminApplication</code> that changes the
routing name to <code>management</code> and its required flag to <code>false</code>:</p>

<markup
lang="yaml"

>io.helidon.examples.AdminApplication:
  routing-name:
    name: "management"
    required: false</markup>

</div>
</div>

<h2 id="_overriding_jax_rs_application_path">Overriding JAX-RS application path</h2>
<div class="section">
<p>Since Helidon 1.4
In JAX-RS we can use <code>@ApplicationPath</code> to configure a path the JAX-RS application is available on.
As this is compiled into the source code, Helidon provides a way to override this using configuration.</p>

<p>For each application class you can define the routing path by specifying a configuration
option <code>class-name.routing-path.path</code>.</p>

<p>Example (YAML) configuration for a class <code>io.helidon.example.AdminApplication</code> that changes the
routing path to <code>/management</code>:</p>

<markup
lang="yaml"

>io.helidon.examples.AdminApplication:
  routing-path:
    path: "/management"</markup>

</div>

<h2 id="_example_configuration_of_jax_rs_application">Example configuration of JAX-RS application</h2>
<div class="section">
<p>A full configuration example (YAML):</p>

<markup
lang="yaml"

>server:
  port: 8080
  sockets:
    management:
      port: 8090

io.helidon.examples.AdminApplication:
  routing-name:
    name: "management"
    required: true
  routing-path:
    path: "/management"</markup>

</div>
</doc-view>