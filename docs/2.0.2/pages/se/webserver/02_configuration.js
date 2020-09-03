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

<p>Available socket configuration options:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 16.667%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Configuration key</th>
<th>Default value</th>
<th>Java type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><strong><code>port</code></strong></td>
<td class="">&#160;</td>
<td class="">int</td>
<td class="">Port to open server socket on, defaults to an available ephemeral port</td>
</tr>
<tr>
<td class=""><strong><code>bind-address</code></strong></td>
<td class="">all local addresses</td>
<td class="">String</td>
<td class="">Address to listen on (may be an IPV6 address as well)</td>
</tr>
<tr>
<td class=""><strong><code>backlog</code></strong></td>
<td class=""><code>1024</code></td>
<td class="">int</td>
<td class="">Maximum length of the queue of incoming connections on the server socket.</td>
</tr>
<tr>
<td class=""><strong><code>max-header-size</code></strong></td>
<td class=""><code>8192</code></td>
<td class="">int</td>
<td class="">Maximal number of bytes of all header values combined. Returns <code>400</code> if headers are bigger</td>
</tr>
<tr>
<td class=""><strong><code>max-initial-line-length</code></strong></td>
<td class=""><code>4096</code></td>
<td class="">int</td>
<td class="">Maximal number of characters in the initial HTTP line. Returns <code>400</code> if line is longer</td>
</tr>
<tr>
<td class=""><strong><code>timeout-millis</code></strong></td>
<td class="">no timeout</td>
<td class="">long</td>
<td class="">Server socket timeout.</td>
</tr>
<tr>
<td class=""><strong><code>receive-buffer-size</code></strong></td>
<td class="">implementation default</td>
<td class="">int</td>
<td class="">Proposed value of the TCP receive window that is advertised to the remote peer on the server socket.</td>
</tr>
<tr>
<td class=""><strong><code>name</code></strong></td>
<td class=""><code>@default</code> for default socket</td>
<td class="">String</td>
<td class="">Name used for named sockets, to support additional server sockets (and their named routing)</td>
</tr>
<tr>
<td class=""><strong><code>enabled</code></strong></td>
<td class=""><code>true</code></td>
<td class="">boolean</td>
<td class="">A socket can be disabled through configuration, in which case it is never opened</td>
</tr>
<tr>
<td class=""><strong><code>max-chunk-size</code></strong></td>
<td class=""><code>8192</code></td>
<td class="">int</td>
<td class="">Maximal size of a chunk to read from incoming requests</td>
</tr>
<tr>
<td class=""><strong><code>validate-headers</code></strong></td>
<td class=""><code>true</code></td>
<td class="">boolean</td>
<td class="">Whether to validate header names, if they contain illegal characters.</td>
</tr>
<tr>
<td class=""><strong><code>initial-buffer-size</code></strong></td>
<td class=""><code>128</code></td>
<td class="">int</td>
<td class="">Initial size of buffer used to parse HTTP line and headers</td>
</tr>
<tr>
<td class=""><strong><code>tls</code></strong></td>
<td class="">&#160;</td>
<td class="">Object</td>
<td class="">Configuration of TLS, please see our TLS example in repository</td>
</tr>
</tbody>
</table>
</div>
</div>
</doc-view>