<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using Configuration with CORS in Helidon MP</dt>
<dd slot="desc"><p>Your application code establishes the CORS behavior of your endpoints using the <code>@CrossOrigin</code> annotation.
You and your users can override that behavior, as well as the CORS behavior of the built-in services,
using MicroProfile configuration.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="cors-configuration-formats">Understanding the CORS Configuration Formats</h2>
<div class="section">
<p>Support in Helidon for CORS configuration uses two closely-related cross-origin configuration formats: basic and mapped.
Each format corresponds to a class
in the Helidon CORS library.
The basic format corresponds to the <a id="" title="" target="_blank" href="./apidocs/io.helidon.microprofile.cors/io/helidon/microprofile/cors/CrossOriginConfig.html"><code>CrossOriginConfig</code></a>
class, and the mapped format corresponds to the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.microprofile.cors/io/helidon/microprofile/cors/MappedCrossOriginConfig.html"><code>MappedCrossOriginConfig</code></a> class.</p>


<h3 id="basic-cross-origin-config">Basic Cross-Origin Configuration</h3>
<div class="section">
<p>In configuration, Helidon represents basic CORS information as a section, identified by a configuration
key of your choosing, that contains
one or more key/value pairs. Each key-value pair assigns one characteristic of CORS behavior.</p>

<p>The table below lists the parameters for the <code>@CrossOriginConfig</code> annotation and the configuration keys that identify the CORS characteristics.</p>


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
<th>Annotation Parameter</th>
<th>Configuration Key</th>
<th>Default</th>
<th>CORS Header Name</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>allowCredentials</code></td>
<td class=""><code>allow-credentials</code></td>
<td class=""><code>false</code></td>
<td class=""><code>Access-Control-Allow-Credentials</code></td>
</tr>
<tr>
<td class=""><code>allowHeaders</code></td>
<td class=""><code>allow-headers</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Headers</code></td>
</tr>
<tr>
<td class=""><code>allowMethods</code></td>
<td class=""><code>allow-methods</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Methods</code></td>
</tr>
<tr>
<td class=""><code>allowOrigins</code></td>
<td class=""><code>allow-origins</code></td>
<td class=""><code>["*"]</code></td>
<td class=""><code>Access-Control-Allow-Origins</code></td>
</tr>
<tr>
<td class=""><code>exposeHeaders</code></td>
<td class=""><code>expose-headers</code></td>
<td class=""><code>none</code></td>
<td class=""><code>Access-Control-Expose-Headers</code></td>
</tr>
<tr>
<td class=""><code>maxAgeSeconds</code></td>
<td class=""><code>max-age</code></td>
<td class=""><code>3600</code></td>
<td class=""><code>Access-Control-Max-Age</code></td>
</tr>
<tr>
<td class=""><code>enabled</code></td>
<td class=""><code>enabled</code></td>
<td class=""><code>true</code></td>
<td class="">n/a</td>
</tr>
</tbody>
</table>
</div>
<p>If the cross-origin configuration is disabled (<code>enabled</code> = false), then the Helidon CORS implementation ignores the cross-origin configuration entry.</p>

<p>The following example of basic cross-origin
configuration
limits cross-origin resource sharing for <code>PUT</code> and
<code>DELETE</code> operations to only <code>foo.com</code> and <code>there.com</code>:</p>

<markup
lang="hocon"

>...
  allow-origins: ["http://foo.com", "http://there.com"]
  allow-methods: ["PUT", "DELETE"]
...</markup>

</div>

<h3 id="_understanding_the_mapped_cross_origin_configuration_format">Understanding the Mapped Cross-Origin Configuration Format</h3>
<div class="section">
<p>In Helidon MP, you use
the mapped cross-origin configuration format.</p>

<p>Helidon represents mapped CORS information as a section, identified by a configuration
key of your choosing, that contains:</p>

<ul class="ulist">
<li>
<p>An optional <code>enabled</code> setting which defaults to <code>true</code> and applies to the whole mapped CORS config section, and</p>

</li>
<li>
<p>An optional <code>paths</code> subsection containing zero or more entries, each of which contains:</p>
<ul class="ulist">
<li>
<p>a basic CORS config section, and</p>

</li>
<li>
<p>a <code>path-pattern</code> path pattern that maps that basic CORS config section to the resource(s) it affects.</p>

</li>
</ul>
</li>
</ul>
<p>You can use mapped configuration to your advantage if you want to allow your users to override the CORS behavior set up
in the application code.</p>

<p>The following example illustrates the mapped cross-origin configuration format.</p>

<markup
lang="hocon"

>...
cors: <span class="conum" data-value="1" />
  paths: <span class="conum" data-value="2" />
    - path-pattern: /greeting <span class="conum" data-value="3" />
      allow-origins: ["http://foo.com", "http://there.com", "http://other.com"] <span class="conum" data-value="4" />
      allow-methods: ["PUT", "DELETE"]
    - path-pattern: / <span class="conum" data-value="5" />
      allow-methods: ["GET", "HEAD", "OPTIONS", "POST"] <span class="conum" data-value="6" />
...</markup>

<ul class="colist">
<li data-value="1">The unique identifier for this mapped CORS config section must be <code>cors</code>.</li>
<li data-value="2">Collects the sequence of entries, each of which maps a basic CORS config to a path pattern.</li>
<li data-value="3">Marks the beginning of an entry (the <code>-</code> character) and maps the associated basic CORS config
to the <code>/greeting</code> subresource (the <code>path-pattern</code> key and value).</li>
<li data-value="4">Begins the basic CORS config section for <code>/greeting</code>; it
restricts sharing via <code>PUT</code> and <code>DELETE</code> to the listed origins.</li>
<li data-value="5">Marks the beginning of the next entry (the <code>-</code> character) and maps the associated basic CORS config to
the top-level resource in the app (the <code>path-pattern</code> key and value).</li>
<li data-value="6">Begins the basic CORS config section for <code>/</code>; it permits sharing of resources at the top-level path with all origins
for the indicated HTTP methods.</li>
</ul>
<p>Path patterns can be any expression accepted by the <a id="" title="" target="_blank" href="./apidocs/io.helidon.webserver/io/helidon/webserver/PathMatcher.html"><code>PathMatcher</code></a> class.</p>

<div class="admonition note">
<p class="admonition-inline">Be sure to arrange the entries in the order that you want Helidon to check them.
Helidon CORS support searches the cross-origin entries in the order you define them until it finds an entry that
matches an incoming request&#8217;s path pattern and HTTP method.</p>
</div>
</div>
</div>

<h2 id="_specifying_override_values_in_configuration">Specifying Override Values in Configuration</h2>
<div class="section">
<p>In configuration, you can specify the same CORS-related attributes that you specify using the <code>@CrossOrigin</code> annotation.</p>

<p>The following example shows how you can express configuration similar to that shown
previously using the mapped cross-origin configuration format.
Here, the example uses properties-file syntax
in your applications&#8217;s <code>META-INF/microprofile-config.properties</code> file. Note that the top-level config key
must be <code>cors</code>.</p>

<markup
lang="properties"

>cors.paths.0.path-pattern = /greeting
cors.paths.0.allow-origins = http://foo.com, http://there.com, http://other.com
cors.paths.0.allow-methods = PUT, DELETE
cors.paths.1.path-pattern = /
cors.paths.1.allow-methods = GET, HEAD, OPTIONS, POST</markup>

<div class="admonition note">
<p class="admonition-inline">Remember that if you set configuration in a file that you include as part of your application JAR file, then you need to
rebuild and restart your application for any changes to take effect.</p>
</div>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<ul class="ulist">
<li>
<p>Use these same configuration techniques to control the behavior of the CORS-enabled
built-in services. <router-link to="/mp/cors/04_support-in-builtin-services">Learn more.</router-link></p>

</li>
<li>
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.3.0/examples/microprofile/cors">CORS example</a>.</p>

</li>
</ul>
</div>
</doc-view>