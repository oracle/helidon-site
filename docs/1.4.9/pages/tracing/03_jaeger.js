<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Jaeger Tracing</dt>
<dd slot="desc"><p>Helidon is integrated with the Jaeger tracer.</p>

<p>The Jaeger builder is loaded through <code>ServiceLoader</code> and configured. You could
also use the Jaeger builder directly, though this would create a source-code dependency
on the Jaeger tracer.</p>
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
<p>To use Jaeger as a tracer,
    add the following dependency to your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-tracing-jaeger&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_configuring_jaeger">Configuring Jaeger</h2>
<div class="section">
<p>The Jaeger tracer supports the following configuration options:</p>


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
                                                            Jaeger is using lower-case only, name will be automatically lower-cased</td>
</tr>
<tr>
<td>protocol</td>
<td>http</td>
<td>collectorProtocol</td>
<td>Protocol of the Jaeger trace collector (<code>udp</code>, <code>http</code> or <code>https</code>), to switch
                                                            to agent mode, use <code>udp</code></td>
</tr>
<tr>
<td>host</td>
<td>localhost</td>
<td>collectorHost</td>
<td>Host of the Jaeger trace collector (IP Address, hostname, or FQDN)</td>
</tr>
<tr>
<td>port</td>
<td>14268</td>
<td>collectorPort</td>
<td>Port of the Jaeger trace collector</td>
</tr>
<tr>
<td>path</td>
<td>/api/traces</td>
<td>collectorPath</td>
<td>Path of the Jaeger trace collector</td>
</tr>
<tr>
<td>token</td>
<td>N/A</td>
<td>token</td>
<td>Authentication token to use (token authentication)</td>
</tr>
<tr>
<td>username</td>
<td>N/A</td>
<td>username</td>
<td>User to authenticate (basic authentication)</td>
</tr>
<tr>
<td>password</td>
<td>N/A</td>
<td>password</td>
<td>Password of the user to authenticate (basic authentication)</td>
</tr>
<tr>
<td>propagation</td>
<td>library default</td>
<td>addPropagation</td>
<td>Propagation type (<code>jaeger</code> or <code>b3</code>)</td>
</tr>
<tr>
<td>log-spans</td>
<td>library default</td>
<td>logSpans</td>
<td>Whether to log spans (boolean)</td>
</tr>
<tr>
<td>max-queue-size</td>
<td>library default</td>
<td>maxQueueSize</td>
<td>Maximal queue size of the reporter (int)</td>
</tr>
<tr>
<td>flush-interval-ms</td>
<td>library default</td>
<td>flushInterval</td>
<td>Reporter flush interval in milliseconds</td>
</tr>
<tr>
<td>sampler-type</td>
<td>library default</td>
<td>samplerType</td>
<td>Sampler type (<code>probabilistic</code>, <code>ratelimiting</code>, <code>remote</code>)</td>
</tr>
<tr>
<td>sampler-param</td>
<td>library default</td>
<td>samplerParam</td>
<td>Numeric parameter specifying details for the sampler type</td>
</tr>
<tr>
<td>sampler-manager</td>
<td>library default</td>
<td>samplerManager</td>
<td>Host and port of the sampler manager for <code>remote</code> type</td>
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
<p>The following is an example of a Jaeger configuration, specified in the YAML format.</p>

<markup
lang="yaml"

>tracing:
    service: "helidon-full-http"
    protocol: "https"     # JAEGER_ENDPOINT (if not udp, http is expected and endpoint is filled)
    host: "192.168.1.3"   # JAEGER_ENDPOINT
    port: 14240           # JAEGER_ENDPOINT
    path: "/api/traces/mine"   # JAEGER_ENDPOINT
    token: "token"        # JAEGER_AUTH_TOKEN
    # Either token or username/password
    #username:  "user"     # JAEGER_USER
    #password: "pass"      # JAEGER_PASSWORD
    propagation: "jaeger" # JAEGER_PROPAGATION either "jaeger" or "b3"
    log-spans: false      # JAEGER_REPORTER_LOG_SPANS
    max-queue-size: 42    # JAEGER_REPORTER_MAX_QUEUE_SIZE
    flush-interval-ms: 10001 # JAEGER_REPORTER_FLUSH_INTERVAL
    sampler-type: "remote"# JAEGER_SAMPLER_TYPE (https://www.jaegertracing.io/docs/latest/sampling/#client-sampling-configuration)
    sampler-param: 0.5    # JAEGER_SAMPLER_PARAM (number)
    sampler-manager: "localhost:47877" # JAEGER_SAMPLER_MANAGER_HOST_PORT
    tags:
      tag1: "tag1-value"  # JAEGER_TAGS
      tag2: "tag2-value"  # JAEGER_TAGS
    boolean-tags:
      tag3: true          # JAEGER_TAGS
      tag4: false         # JAEGER_TAGS
    int-tags:
      tag5: 145           # JAEGER_TAGS
      tag6: 741           # JAEGER_TAGS</markup>

</div>
</doc-view>