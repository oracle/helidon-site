<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using Configuration for CORS</dt>
<dd slot="desc"><p>You and your users can override the annotated CORS set-up using MicroProfile configuration.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="cors-configuration-formats">Understanding the CORS Configuration Format</h2>
<div class="section">
<p>The support in Helidon MP for CORS configuration works with the following format.</p>

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

<p>If the cross-origin configuration is disabled (<code>enabled</code> = false), then the Helidon CORS implementation ignores the cross-origin configuration entry.</p>

<p>Although there are two types of CORS cross-origin configuration, for Helidon MP use
the mapped format.</p>


<h3 id="_mapped_cross_origin_configuration">Mapped Cross-Origin Configuration</h3>
<div class="section">
<p>In some cases, you or your users might want to configure CORS behavior based on URL path matching. The following example of the  <em>mapped</em>
configuration format illustrates this.</p>

<markup
lang="hocon"

>...
cors:
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
<a id="" title="" target="_blank" href="{javadoc-base-url-webserver}/PathMatcher.html"><code>PathMatcher</code></a> class.</p>

<p>Arrange the entries in the order that you want Helidon to check them. Usually this is from most specific to most general.
Helidon CORS support searches the cross-origin entries in the order you define them until it finds an entry that
matches an incoming request&#8217;s path expression and HTTP method.</p>

<p>The following example shows how you can express similar configuration using properties-file syntax
in your applications&#8217;s <code>META-INF/microprofile-config.properties</code> file. Note that the top-level config key
must be <code>cors</code>.</p>

<markup
lang="properties"

>cors.paths.0.path-prefix = /greeting
cors.paths.0.allow-origins = http://foo.com, http://there.com, http://other.com
cors.paths.0.allow-methods = PUT, DELETE
cors.paths.1.path-prefix = /
cors.paths.1.allow-methods = GET, HEAD, OPTIONS, POST</markup>

</div>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0-M3/examples/microprofile/cors">CORS example</a>.</p>

</div>
</doc-view>