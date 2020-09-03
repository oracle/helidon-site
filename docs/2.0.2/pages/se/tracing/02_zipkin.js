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


<div class="table__overflow elevation-1  ">
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
<td class="">service</td>
<td class="">N/A</td>
<td class="">serviceName</td>
<td class="">Name of the service, to distinguish traces crossing service boundaries;
                                                            Zipkin is using lower-case only, name will be automatically lower-cased</td>
</tr>
<tr>
<td class="">protocol</td>
<td class="">http</td>
<td class="">collectorProtocol</td>
<td class="">Protocol of the Zipkin trace collector (http or https)</td>
</tr>
<tr>
<td class="">host</td>
<td class="">localhost</td>
<td class="">collectorHost</td>
<td class="">Host of the Zipkin trace collector (IP Address, hostname, or FQDN)</td>
</tr>
<tr>
<td class="">port</td>
<td class="">9411</td>
<td class="">collectorPort</td>
<td class="">Port of the Zipkin trace collector</td>
</tr>
<tr>
<td class="">path</td>
<td class="">defined by version</td>
<td class="">collectorPath</td>
<td class="">Path of the Zipkin trace collector, each version uses a different path
                                                            by default.</td>
</tr>
<tr>
<td class="">api-version</td>
<td class="">2</td>
<td class="">version</td>
<td class="">Zipkin specific method, set the protocol version to communicate with
                                                            trace collector</td>
</tr>
<tr>
<td class="">enabled</td>
<td class="">true</td>
<td class="">enabled</td>
<td class="">If set to false, tracing would be disabled</td>
</tr>
<tr>
<td class="">tags</td>
<td class="">N/A</td>
<td class="">addTracerTag(String, String)</td>
<td class=""><code>String</code> tags to add to each span</td>
</tr>
<tr>
<td class="">boolean-tags</td>
<td class="">N/A</td>
<td class="">addTracerTag(String, boolean)</td>
<td class=""><code>boolean</code> tags to add to each span</td>
</tr>
<tr>
<td class="">int-tags</td>
<td class="">N/A</td>
<td class="">addTracerTag(String, int)</td>
<td class=""><code>int</code> tags to add to each span</td>
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