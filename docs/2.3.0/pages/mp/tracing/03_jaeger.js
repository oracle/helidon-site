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

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Jaeger Tracing
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

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
                                                            Jaeger is using lower-case only, name will be automatically lower-cased</td>
</tr>
<tr>
<td class="">protocol</td>
<td class="">http</td>
<td class="">collectorProtocol</td>
<td class="">Protocol of the Jaeger trace collector (<code>udp</code>, <code>http</code> or <code>https</code>), to switch
                                                            to agent mode, use <code>udp</code></td>
</tr>
<tr>
<td class="">host</td>
<td class="">localhost</td>
<td class="">collectorHost</td>
<td class="">Host of the Jaeger trace collector (IP Address, hostname, or FQDN)</td>
</tr>
<tr>
<td class="">port</td>
<td class="">14268</td>
<td class="">collectorPort</td>
<td class="">Port of the Jaeger trace collector</td>
</tr>
<tr>
<td class="">path</td>
<td class="">/api/traces</td>
<td class="">collectorPath</td>
<td class="">Path of the Jaeger trace collector</td>
</tr>
<tr>
<td class="">token</td>
<td class="">N/A</td>
<td class="">token</td>
<td class="">Authentication token to use (token authentication)</td>
</tr>
<tr>
<td class="">username</td>
<td class="">N/A</td>
<td class="">username</td>
<td class="">User to authenticate (basic authentication)</td>
</tr>
<tr>
<td class="">password</td>
<td class="">N/A</td>
<td class="">password</td>
<td class="">Password of the user to authenticate (basic authentication)</td>
</tr>
<tr>
<td class="">propagation</td>
<td class="">library default</td>
<td class="">addPropagation</td>
<td class="">Propagation type (<code>jaeger</code> or <code>b3</code>)</td>
</tr>
<tr>
<td class="">log-spans</td>
<td class="">library default</td>
<td class="">logSpans</td>
<td class="">Whether to log spans (boolean)</td>
</tr>
<tr>
<td class="">max-queue-size</td>
<td class="">library default</td>
<td class="">maxQueueSize</td>
<td class="">Maximal queue size of the reporter (int)</td>
</tr>
<tr>
<td class="">flush-interval-ms</td>
<td class="">library default</td>
<td class="">flushInterval</td>
<td class="">Reporter flush interval in milliseconds</td>
</tr>
<tr>
<td class="">sampler-type</td>
<td class="">library default</td>
<td class="">samplerType</td>
<td class="">Sampler type (<code>probabilistic</code>, <code>ratelimiting</code>, <code>remote</code>)</td>
</tr>
<tr>
<td class="">sampler-param</td>
<td class="">library default</td>
<td class="">samplerParam</td>
<td class="">Numeric parameter specifying details for the sampler type</td>
</tr>
<tr>
<td class="">sampler-manager</td>
<td class="">library default</td>
<td class="">samplerManager</td>
<td class="">Host and port of the sampler manager for <code>remote</code> type</td>
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