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
# Default is CPU_COUNT * 2
server.workers=4
# Default is not to use SSL
ssl:
 private-key:
    keystore-resource-path: "certificate.p12"
    keystore-passphrase: "abcd"</markup>

<p>For Helidon config, the default file is <code>application.yaml</code> on the classpath
 (e.g. src/main/resources/application.yaml).</p>

<markup
lang="yaml"
title="application.yaml - Server configuration"
>server:
  sockets:
    - secure:
        port: 443
        # supports all socket related properties of server
        backlog: 1024
        receive-buffer: 0
        timeout: 60000
        ssl:
          ....
    - another:
        port: 12041</markup>

</div>
</doc-view>