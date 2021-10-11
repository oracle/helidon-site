<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebServer TLS configuration</dt>
<dd slot="desc"><p>Configure TLS either programmatically, or by the Helidon configuration framework.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_tls_in_your_code">Configuring TLS in your code</h2>
<div class="section">
<p>To configure TLS in WebServer programmatically create your keystore configuration and pass it to the WebServer builder.</p>

<markup
lang="java"

>KeyConfig keyConfig = KeyConfig.keystoreBuilder()
                //Whether this keystore is also trust store
                .trustStore()
                //Keystore location/name
                .keystore(Resource.create("keystore.p12"))
                //Password to the keystore
                .keystorePassphrase("password")
                .build();

WebServer.builder()
         .tls(WebServerTls.builder()
               .trust(keyConfig)
               .privateKey(keyConfig)
               .build())
         .build();</markup>

</div>

<h2 id="_configuring_tls_in_the_config_file">Configuring TLS in the config file</h2>
<div class="section">
<p>It is also possible to configure TLS via the config file.</p>

<markup
lang="yaml"
title="WebServer TLS configuration file <code>application.yaml</code>"
>server:
  tls:
    #Truststore setup
    trust:
      keystore:
        passphrase: "password"
        trust-store: true
        resource:
          resource-path: "keystore.p12"
    #Keystore with private key and server certificate
    private-key:
      keystore:
        passphrase: "password"
        resource:
          resource-path: "keystore.p12"</markup>

<p>Then, in your application code, load the configuration from that file.</p>

<markup
lang="java"
title="WebServer initialization using the <code>application.yaml</code> file located on the classpath"
>Config config = Config.create();
WebServer webClient = WebServer.create(routing, config.get("server"));</markup>

<p>Or you can only create WebServerTls instance based on the config file.</p>

<markup
lang="java"
title="WebServerTls instance based on <code>application.yaml</code> file located on the classpath"
>Config config = Config.create();
WebServerTls.builder()
    .config(config.get("server.tls"))
    .build();</markup>

</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>See all configuration options
<a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver/io/helidon/webserver/WebServerTls.html">here</a>.</p>

<p>Available server certificate configuration options:</p>


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
<td class=""><strong><code>client-auth</code></strong></td>
<td class="">NONE</td>
<td class="">Enum</td>
<td class="">See <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver/io/helidon/webserver/ClientAuthentication.html">here</a> for all possible values.
Whether to require client certificate authentication</td>
</tr>
<tr>
<td class=""><strong><code>protocols</code></strong></td>
<td class="">&#160;</td>
<td class="">String</td>
<td class="">TLS protocols to enable with the server socket</td>
</tr>
<tr>
<td class=""><strong><code>session-cache-size</code></strong></td>
<td class="">&#160;</td>
<td class="">int</td>
<td class="">The size of the cache used for storing SSL session objects</td>
</tr>
<tr>
<td class=""><strong><code>session-timeout-seconds</code></strong></td>
<td class="">&#160;</td>
<td class="">int</td>
<td class="">The timeout for the cached SSL session objects, in seconds</td>
</tr>
<tr>
<td class=""><strong><code>private-key</code></strong></td>
<td class="">&#160;</td>
<td class="">Object</td>
<td class="">Keystore configuration, please follow the example above</td>
</tr>
<tr>
<td class=""><strong><code>trust</code></strong></td>
<td class="">&#160;</td>
<td class="">Object</td>
<td class="">Keystore configuration, please follow the example above</td>
</tr>
</tbody>
</table>
</div>
</div>
</doc-view>