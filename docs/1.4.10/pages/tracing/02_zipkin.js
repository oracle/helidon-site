<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Zipkin Tracing</dt>
<dd slot="desc"><p>Helidon is integrated with the Zipkin tracer.</p>

<p>The Zipkin builder is loaded through <code>ServiceLoader</code> and configured. You could
also use the Zipkin builder directly, though this would create a source-code dependency
on the Zipkin tracer.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>To use Zipkin as a tracer,
    add the following dependency to your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-tracing-zipkin&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_configuring_zipkin">Configuring Zipkin</h2>
<div class="section">
<p>The Zipkin tracer supports the following configuration options:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
</colgroup>
<thead>
<tr>
<th>Key</th>
<th>Default value</th>
<th>Builder method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>service</td>
<td>N/A</td>
<td>serviceName</td>
<td>Name of the service, to distinguish traces crossing service boundaries;
                                                            Zipkin is using lower-case only, name will be automatically lower-cased</td>
</tr>
<tr>
<td>protocol</td>
<td>http</td>
<td>collectorProtocol</td>
<td>Protocol of the Zipkin trace collector (http or https)</td>
</tr>
<tr>
<td>host</td>
<td>localhost</td>
<td>collectorHost</td>
<td>Host of the Zipkin trace collector (IP Address, hostname, or FQDN)</td>
</tr>
<tr>
<td>port</td>
<td>9411</td>
<td>collectorPort</td>
<td>Port of the Zipkin trace collector</td>
</tr>
<tr>
<td>path</td>
<td>defined by version</td>
<td>collectorPath</td>
<td>Path of the Zipkin trace collector, each version uses a different path
                                                            by default.</td>
</tr>
<tr>
<td>api-version</td>
<td>2</td>
<td>version</td>
<td>Zipkin specific method, set the protocol version to communicate with
                                                            trace collector</td>
</tr>
<tr>
<td>enabled</td>
<td>true</td>
<td>enabled</td>
<td>If set to false, tracing would be disabled</td>
</tr>
<tr>
<td>tags</td>
<td>N/A</td>
<td>addTracerTag(String, String)</td>
<td><code>String</code> tags to add to each span</td>
</tr>
<tr>
<td>boolean-tags</td>
<td>N/A</td>
<td>addTracerTag(String, boolean)</td>
<td><code>boolean</code> tags to add to each span</td>
</tr>
<tr>
<td>int-tags</td>
<td>N/A</td>
<td>addTracerTag(String, int)</td>
<td><code>int</code> tags to add to each span</td>
</tr>
</tbody>
</table>
</div>
<p>The following is an example of a Zipkin configuration, specified in the YAML format.</p>

<markup
lang="yaml"

>tracing:
  zipkin:
    service: "helidon-service"
    protocol: "https"
    host: "192.168.1.1"
    port: 9987
    api-version: 1
    # this is the default path for API version 2
    path: "/api/v2/spans"
    tags:
      tag1: "tag1-value"
      tag2: "tag2-value"
    boolean-tags:
      tag3: true
      tag4: false
    int-tags:
      tag5: 145
      tag6: 741</markup>

<p>Example of Zipkin trace:</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/webserver/zipkin.png" alt="Zipkin example" />
</v-card-text>
</v-card>

</div>
</doc-view>