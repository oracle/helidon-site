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
              .sources(classpath("application.conf"))
              .build());

WebServer webServer = WebServer.create(configuration, routing);</markup>

</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>See all configuration options
 <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/webserver/ServerConfiguration.html">here</a>.</p>

<p>Available socket configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td><strong>Configuration key</strong></td>
<td>Default value</td>
<td>Java type</td>
<td>Description</td>
</tr>
<tr>
<td><strong><code>port</code></strong></td>
<td>&#160;</td>
<td>int</td>
<td>Port to open server socket on, defaults to an available ephemeral port</td>
</tr>
<tr>
<td><strong><code>bind-address</code></strong></td>
<td>all local addresses</td>
<td>String</td>
<td>Address to listen on (may be an IPV6 address as well)</td>
</tr>
<tr>
<td><strong><code>backlog</code></strong></td>
<td><code>1024</code></td>
<td>int</td>
<td>Maximum length of the queue of incoming connections on the server socket.</td>
</tr>
<tr>
<td><strong><code>max-header-size</code></strong></td>
<td><code>8192</code></td>
<td>int</td>
<td>Maximal number of bytes of all header values combined. Returns <code>400</code> if headers are bigger</td>
</tr>
<tr>
<td><strong><code>max-initial-line-length</code></strong></td>
<td><code>4096</code></td>
<td>int</td>
<td>Maximal number of characters in the initial HTTP line. Returns <code>400</code> if line is longer</td>
</tr>
<tr>
<td><strong><code>timeout-millis</code></strong></td>
<td>no timeout</td>
<td>long</td>
<td>Server socket timeout.</td>
</tr>
<tr>
<td><strong><code>receive-buffer-size</code></strong></td>
<td>implementation default</td>
<td>int</td>
<td>Proposed value of the TCP receive window that is advertised to the remote peer on the server socket.</td>
</tr>
<tr>
<td><strong><code>max-chunk-size</code></strong></td>
<td><code>8192</code></td>
<td>int</td>
<td>Maximal size of a chunk to read from incoming requests</td>
</tr>
<tr>
<td><strong><code>validate-headers</code></strong></td>
<td><code>true</code></td>
<td>boolean</td>
<td>Whether to validate header names, if they contain illegal characters.</td>
</tr>
<tr>
<td><strong><code>initial-buffer-size</code></strong></td>
<td><code>128</code></td>
<td>int</td>
<td>Initial size of buffer used to parse HTTP line and headers</td>
</tr>
<tr>
<td><strong><code>ssl</code></strong></td>
<td>&#160;</td>
<td>Object</td>
<td>Configuration of SSL, please see our SSL example in repository</td>
</tr>
</tbody>
</table>
</div>
</div>
</doc-view>