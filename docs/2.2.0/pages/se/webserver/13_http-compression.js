<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebServer HTTP Compression</dt>
<dd slot="desc"><p>HTTP compression can improve bandwidth utilization and transfer speeds in certain scenarios. It
requires a few extra CPU cycles for compressing and uncompressing, but these can be offset
if data is transferred over low-bandwidth network links.</p>

<p>A client advertises the compression encodings it supports at request time, and the
WebServer responds by selecting an encoding it supports and setting it in a header,
effectively <em>negotiating</em> the content encoding of the response. If none of the
advertised encodings is supported by the WebServer, the response is returned
uncompressed.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_http_compression">Configuring HTTP Compression</h2>
<div class="section">
<p>HTTP compression in the Helidon WebServer is <em>disabled</em> by default. It can sometimes interfere
with certain applications that use streaming, even if a compression encoding has not been
negotiated with the client.</p>

<p>It can be enabled either programmatically or via configuration,
and it can also be enabled on a per-socket basis. When configured at the server level, it
applies only to the <em>default</em> socket.</p>

<p>Programmatically, simply use the <code>enableCompression</code> method during server creation:</p>

<markup
lang="java"

>    WebServer.builder()
             .port(8080)
             .routing(...)
             .enableCompression(true)        // compression enabled
             .build()</markup>

<p>Or use a config file as follows and make sure the WebServer is created using it:</p>

<markup
lang="yaml"
title="WebServer HTTP Compression configuration file <code>application.yaml</code>"
>server:
  port: 8080
  enable-compression: true</markup>

</div>

<h2 id="_http_compression_negotiation">HTTP Compression Negotiation</h2>
<div class="section">
<p>HTTP compression negotiation is controlled by clients using the <code>Accept-Encoding</code> header.
The value of this header is a comma-separated list of encodings. The WebServer
will select one of these encodings for compression purposes; it currently supports <code>gzip</code>
and <code>deflate</code>.</p>

<p>For example, if the request includes <code>Accept-Encoding: gzip, deflate</code>, and HTTP compression
has been enabled as shown above, the response shall include the header <code>Content-Encoding: gzip</code>
and a compressed payload.</p>

</div>
</doc-view>