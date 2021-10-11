<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebClient TLS configuration</dt>
<dd slot="desc"><p>Configure TLS either programmatically or by the Helidon configuration framework.</p>
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
<p>The one way to configure TLS in WebClient is in your application code.</p>

<markup
lang="java"

>KeyConfig keyConfig = KeyConfig.keystoreBuilder()
                //Whether this keystore is also trust store
                .trustStore()
                //Keystore location/name
                .keystore(Resource.create("client.p12"))
                //Password to the keystore
                .keystorePassphrase("password")
                .build();

WebClient.builder()
         .tls(WebClientTls.builder()
               .certificateTrustStore(keyConfig)
               .clientKeyStore(keyConfig)
               .build())
         .build();</markup>

</div>

<h2 id="_configuring_tls_in_the_config_file">Configuring TLS in the config file</h2>
<div class="section">
<p>It is also possible to configure TLS via the config file.</p>

<markup
lang="yaml"
title="WebClient TLS configuration file <code>application.yaml</code>"
>webclient:
  tls:
    #Server part defines settings for server certificate validation and truststore
    server:
      keystore:
        passphrase: "password"
        trust-store: true
        resource:
          resource-path: "keystore.p12"
    #Client part defines access to the keystore with client private key or certificate
    client:
      keystore:
        passphrase: "password"
        resource:
          resource-path: "keystore.p12"</markup>

<p>Then, in your application code, load the configuration from that file.</p>

<markup
lang="java"
title="WebClient initialization using the <code>application.yaml</code> file located on the classpath"
>Config config = Config.create();
WebClient webClient = WebClient.create(config.get("webclient"));</markup>

<p>Or you can only create WebClientTls instance based on the config file.</p>

<markup
lang="java"
title="WebClientTls instance based on <code>application.yaml</code> file located on the classpath"
>Config config = Config.create();
WebClientTls.builder()
    .config(config.get("webclient.tls"))
    .build();</markup>

</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>See all configuration options
<a id="" title="" target="_blank" href="./apidocs/io.helidon.webclient/io/helidon/webclient/WebClientTls.html">here</a>.</p>

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
<td class=""><strong><code>disable-hostname-verification</code></strong></td>
<td class="">false</td>
<td class="">boolean</td>
<td class="">Whether hostname verification should be performed</td>
</tr>
<tr>
<td class=""><strong><code>trust-all</code></strong></td>
<td class="">false</td>
<td class="">boolean</td>
<td class="">Whether all of the server certificates should be trusted</td>
</tr>
<tr>
<td class=""><strong><code>keystore</code></strong></td>
<td class="">&#160;</td>
<td class="">Object</td>
<td class="">Keystore configuration, please follow the example above</td>
</tr>
</tbody>
</table>
</div>
<p>Available client configuration options:</p>


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
<td class=""><strong><code>keystore</code></strong></td>
<td class="">&#160;</td>
<td class="">Object</td>
<td class="">Keystore configuration, please follow the example above</td>
</tr>
</tbody>
</table>
</div>
</div>
</doc-view>