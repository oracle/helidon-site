<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebServer Configuration</dt>
<dd slot="desc"><p>Configure the WebServer either programmatically, or by the Helidon configuration framework.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_the_webserver_in_your_code">Configuring the WebServer in your code</h2>
<div class="section">
<p>The easiest way to configure the WebServer is in your
application code.</p>

<markup
lang="java"

>WebServer webServer = WebServer.builder()
      .bindAddress(InetAddress.getLocalHost())
      .port(8080)
      .build();</markup>

</div>

<h2 id="_configuring_the_webserver_in_a_configuration_file">Configuring the WebServer in a configuration file</h2>
<div class="section">
<p>You can also define the configuration in a file.</p>

<markup
lang="yaml"
title="WebServer configuration file <code>application.yaml</code>"
>server:
  port: 8080
  bind-address: "0.0.0.0"</markup>

<p>Then, in your application code, load the configuration from that file.</p>

<markup
lang="java"
title="WebServer initialization using the <code>application.yaml</code> file located on the classpath"
>Config config = Config.create(); <span class="conum" data-value="1" />
WebServer webServer = WebServer.create(routing, config.get("server")); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1"><code>application.yaml</code> is a default configuration source loaded when YAML support is on classpath, so we can
just use <code>Config.create()</code></li>
<li data-value="2">Server expects the configuration tree located on the node of <code>server</code></li>
</ul>
</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>See all configuration options
 <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver/io/helidon/webserver/WebServer.html">here</a>.</p>

</div>
</doc-view>