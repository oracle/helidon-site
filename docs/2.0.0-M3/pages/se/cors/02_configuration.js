<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using Configuration for CORS</dt>
<dd slot="desc"><p>Your application can use configuration in setting up CORS behavior.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="cors-configuration-formats">Understanding CORS Configuration Formats</h2>
<div class="section">
<p>The support in Helidon for CORS configuration works with two closely-related formats. Each corresponds to a class
in the Helidon CORS library which holds CORS information.</p>


<h3 id="_basic_cross_origin_configuration">Basic Cross-Origin Configuration</h3>
<div class="section">
<p>Cross-origin configuration is the basic building block of CORS information.</p>

<p id="config-key-table">The table below describes
the configuration keys that map to the headers defined in the CORS protocol.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Configuration Key</th>
<th>Default</th>
<th>CORS Header Name</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>allow-credentials</code></td>
<td class=""><code>false</code></td>
<td class=""><code>Access-Control-Allow-Credentials</code></td>
</tr>
<tr>
<td class=""><code>allow-headers</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Headers</code></td>
</tr>
<tr>
<td class=""><code>allow-methods</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Methods</code></td>
</tr>
<tr>
<td class=""><code>allow-origins</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Origins</code></td>
</tr>
<tr>
<td class=""><code>expose-headers</code></td>
<td class=""><code>none</code></td>
<td class=""><code>Access-COntrol-Expose-Headers</code></td>
</tr>
<tr>
<td class=""><code>max-age</code></td>
<td class=""><code>3600</code></td>
<td class=""><code>Access-Control-Max-Age</code></td>
</tr>
<tr>
<td class=""><code>enabled</code></td>
<td class=""><code>true</code></td>
<td class="">n/a</td>
</tr>
</tbody>
</table>
</div>
<p>If the cross-origin configuration is disabled (<code>enabled</code> = false), then the Helidon CORS implementation ignores the cross-origin configuration entry.</p>

<p>The following example, when loaded and used by the application, limits cross-origin resource sharing for <code>PUT</code> and
<code>DELETE</code> operations to only <code>foo.com</code> and <code>there.com</code>:</p>

<markup
lang="hocon"

>...
restrictive-cors:
  allow-origins: ["http://foo.com", "http://there.com"]
  allow-methods: ["PUT", "DELETE"]
...</markup>

</div>

<h3 id="_mapped_cross_origin_configuration">Mapped Cross-Origin Configuration</h3>
<div class="section">
<p>In some cases, you or your users might want to configure CORS behavior based on URL path matching. The following example of the  <em>mapped</em>
configuration format illustrates this.</p>

<markup
lang="hocon"

>...
my-cors:
  paths:
    - path-prefix: /greeting <span class="conum" data-value="1" />
      allow-origins: ["http://foo.com", "http://there.com", "http://other.com"]
      allow-methods: ["PUT", "DELETE"]
    - path-prefix: / <span class="conum" data-value="2" />
      allow-methods: ["GET", "HEAD", "OPTIONS", "POST"]
...</markup>

<ul class="colist">
<li data-value="1">Sets restrictions on CORS for the <code>/greeting</code> path.</li>
<li data-value="2">Permits sharing of resources at the top-level path with all origins (the default) for the indicated HTTP methods.
CORS would be denied to <code>PATCH</code> HTTP requests.</li>
</ul>
<p>Path expressions can be any expression accepted by the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver/io/helidon/webserver/PathMatcher.html"><code>PathMatcher</code></a> class.</p>

<p>Arrange the entries in the order that you want Helidon to check them. Usually this is from most specific to most general.
Helidon CORS support searches the cross-origin entries in the order you define them until it finds an entry that
matches an incoming request&#8217;s path expression and HTTP method.</p>

<p>You might want to avoid using mapped configuration to set up the <em>normal</em> CORS behavior in your application, because you have to
make sure the paths are the same in the configuration and in the code that establishes routing for your application.
You <em>can</em> use mapped configuration to your advantage if you want to allow your users to override the CORS behavior set up
in the application code. See the example below.</p>

</div>
</div>

<h2 id="_using_cors_configuration_from_the_application">Using CORS Configuration From the Application</h2>
<div class="section">
<p>To use basic or mapped CORS configuration, you add logic to your application to load sections of configuration and
use the loaded config to build <code>CrossOriginConfig</code> instances. (The
<router-link :to="{path: '/se/cors/01_introduction', hash: '#intro-quick-start-code-example'}"><code>CrossOriginConfig</code> Routing Example</router-link> shows
this in practice.)</p>

<p>You can create
a <code>CrossOriginConfig</code> instance directly from a config node, as shown in this example.</p>

<markup
lang="java"

>CorsSupport.Builder builder = CorsSupport.builder();

Config config = Config.create(); // Created from the current config sources

config.get("my-cors") <span class="conum" data-value="1" />
    .ifExists(builder::mappedConfig);

config.get("restrictive-cors") <span class="conum" data-value="2" />
    .ifExists(builder::config);

builder.addCrossOriginConfig(CrossOriginConfig.create()); <span class="conum" data-value="3" />

CorsSupport corsSupport = builder.build(); <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">If <code>my-cors</code> exists in the configuration, use it to add mapped CORS config to the <code>CorsSupport</code> builder.</li>
<li data-value="2">If <code>restrictive-cors</code> exists in the configuration, use it to add basic (not mapped) config to the builder.</li>
<li data-value="3">Provide default CORS handling for requests that do not match earlier entries.</li>
<li data-value="4">Obtain the finished <code>CorsSupport</code> instance, suitable for use in creating the application&#8217;s routing.</li>
</ul>
<p>As each request arrives, Helidon checks it against the cross-origin config instances in the order that your application added them to the <code>CorsSupport.Builder</code>. The <code>my-cors</code> mapped configuration acts as an override because the application added it to the builder first.</p>

</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="{helidon-se-cors-example}">CORS example</a>.</p>

</div>
</doc-view>