<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebServer Configuration</dt>
<dd slot="desc"><p>Configure the WebServer using the Helidon configuration framework, either programmatically
or via a configuration file.</p>
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

>ServerConfiguration configuration = ServerConfiguration.builder()
                                                       .bindAddress(InetAddress.getLocalHost())
                                                       .port(8080)
                                                       .build();
WebServer webServer = WebServer.create(configuration, routing);</markup>

</div>

<h2 id="_configuring_the_webserver_in_a_configuration_file">Configuring the WebServer in a configuration file</h2>
<div class="section">
<p>You can also define the configuration in a file.</p>

<markup
lang="hocon"
title="WebServer configuration file <code>application.conf</code>"
>webserver {
  port: 8080,
  bind-address: "0.0.0.0",
}</markup>

<p>Then, in your application code, load the configuration from that file.</p>

<markup
lang="java"
title="WebServer initialization using the <code>application.conf</code> file located on the classpath"
>ServerConfiguration configuration = ServerConfiguration.create(
        Config.builder()
              .source(classpath("application.conf"))
              .build());

WebServer webServer = WebServer.create(configuration, routing);</markup>

</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>See all configuration options
 <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/webserver/ServerConfiguration.html">here</a>.</p>

</div>
</doc-view>