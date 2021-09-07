<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>The Configuration Component</dt>
<dd slot="desc"><p>The config component provides a Java API to load and process
configuration properties from various sources into a <code>Config</code> object which the
application can use to retrieve config data.</p>
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
<p>To enable Config
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-config&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

</div>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">

<h3 id="_introducing_the_config_system">Introducing the Config System</h3>
<div class="section">
<p>A brief overview of the config system helps clarify its different parts
and how they work together. Most applications will typically deal with more
than one of these parts.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/overview.png" alt="Configuration Overview" />
</v-card-text>
</v-card>

<p>These are the main parts of the configuration system:</p>

<ul class="ulist">
<li>
<p><code>Config</code> system - allows you to read configuration data in an application</p>

</li>
<li>
<p>A config source - a location containing configuration data (File, Map, Properties etc.)</p>

</li>
<li>
<p>A config parser - a component capable of transforming bytes into configuration data (such as JSON content, YAML etc.)</p>

</li>
</ul>
<p>The <code>Config</code> system handles configuration data in an in-memory tree that represents the configuration structure and values.</p>

<p>This approach allows us to take any source data, be it a flat properties file or an object structure such as JSON, and
transform it into a single tree that allows for overriding of values using heterogeneous config sources.</p>

<p>We are using the <code>.</code> as a separator of tree structure.</p>

<p>Example of two config sources that can be used by <code>Config</code> with the same data tree in different formats:</p>

<p>A Properties source:</p>

<markup
lang="properties"

>web.page-size=25</markup>

<p>A YAML source:</p>

<markup
lang="yaml"

>web:
  page-size: 25</markup>

<p>The configuration has the same internal representation in <code>Config</code> and can be accessed using
the <code>Config</code> API as follows:</p>

<markup
lang="java"

>int pageSize = config.get("web.page-size")
        .asInt()
        .orElse(20);</markup>

<p>Or using the tree node approach:</p>

<markup
lang="java"

>int pageSize = config
                .get("web")
                .get("page-size")
                .asInt()
                .orElse(20);</markup>

<p>For this first example we can see the basic features of <code>Config</code>:</p>

<ul class="ulist">
<li>
<p>Configuration is a tree of <code>Config</code> nodes</p>

</li>
<li>
<p>You can use <code>.</code> as a tree separator when requesting node values</p>

</li>
<li>
<p>Each config value can be retrieved as a typed object, with shortcut methods for the most
commonly used types, such as <code>int</code>, <code>String</code>, <code>long</code> and other</p>

</li>
<li>
<p>You can immediately provide a default value for the cases the configuration option is not defined
in any source</p>

</li>
</ul>
</div>

<h3 id="_overriding_values">Overriding Values</h3>
<div class="section">
<p>The <code>Config</code> system treats config sources as a hierarchy, where the first source that
has a specific configuration key "wins" and its value is used, other sources are not even queried for it.</p>

<p>For example the default configuration when you use <code>Config.create()</code> uses the following config sources:</p>

<ol style="margin-left: 15px;">
<li>
System properties config source

</li>
<li>
Environment variables config source

</li>
<li>
A classpath config source called <code>application.?</code> where the <code>?</code> depends on supported media types
currently on the classpath. By default it is <code>properties</code>, if you have YAML support on classpath,
it would be <code>application.yaml</code> (a <code>ConfigParser</code> may add additional supported suffixes for default file)

</li>
</ol>
<p>Let&#8217;s consider the following keys:</p>

<ol style="margin-left: 15px;">
<li>
System property <code>answer=42</code>

</li>
<li>
Environment variable <code>ANSWER=38</code>

</li>
<li>
A key in a configuration file <code>answer=36</code>

</li>
</ol>
<p>When you request <code>config.get(`answer</code>).asInt().orElse(25)<code>, you would get `42</code></p>

<p>This allows you to configure environment specific configuration values through
system properties, environment variables, or through files available on each environment (be it
a physical machine, a Kubernetes pod, or a docker image) without changing your source code.</p>

</div>

<h3 id="built-in-formats">Built-in Support for Config Formats</h3>
<div class="section">
<p>If you add additional Helidon config maven artifacts to your dependencies, then the
config system can read formats other than Java properties format and the default
configuration will search for other <code>application</code> file types
in the following order. Note that the default configuration <em>stops</em> once it finds
one of the files below; it <em>does not</em> merge all such files it can find.</p>

<div class="block-title"><span>Default Config Files (most to least important)</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Source</th>
<th>Helidon maven artifact ID (group ID: <code>io.helidon.config</code>)</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>application.yaml</code></td>
<td class=""><code>helidon-config-yaml</code></td>
<td class="">YAML format <a id="" title="" target="_blank" href="http://yaml.org">http://yaml.org</a></td>
</tr>
<tr>
<td class=""><code>application.conf</code></td>
<td class=""><code>helidon-config-hocon</code></td>
<td class="">HOCON format <a id="" title="" target="_blank" href="https://github.com/lightbend/config#using-hocon-the-json-superset">https://github.com/lightbend/config#using-hocon-the-json-superset</a></td>
</tr>
<tr>
<td class=""><code>application.json</code></td>
<td class=""><code>helidon-config-hocon</code></td>
<td class="">JSON format <a id="" title="" target="_blank" href="https://json.org/">https://json.org/</a></td>
</tr>
<tr>
<td class=""><code>application.properties</code></td>
<td class=""><code>helidon-config</code></td>
<td class="">Java properties format</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 id="_config_filters">Config Filters</h3>
<div class="section">
<p>Config system applies configured <em>config filters</em> on each value when it is requested
for the first time.</p>

<p>There is a built-in filter called <code>ValueResolvingFilter</code> (enabled by default, can be disabled through API)
 that resolves references to other keys in values in configuration.</p>

<p>Example:
Let&#8217;s consider the following example properties file</p>

<markup
lang="properties"

>host=localhost
first-service.host=${host}/firstservice
second-service.host=${host}/secondservice</markup>

<p>The filter resolves the <code>${host}</code> reference to the <code>localhost</code> value.</p>

<p>This makes it easier to override values in testing and production, as you can just
override the <code>host</code> key and leave the URIs same.</p>

</div>

<h3 id="_change_support">Change Support</h3>
<div class="section">
<p>Config is an immutable in-memory tree. Nevertheless we know that configuration sometimes changes,
 and we may want to react to such changes.</p>

<p>In <code>Config</code> system, you can do this through change support provided by these components:</p>

<ol style="margin-left: 15px;">
<li>
<code>Config.onChange()</code> API - you can use to add your listener, to be notified of configuration changes

</li>
<li>
<code>PollingStrategy</code> - a component providing regular events to check if a source has changed. This
requires support in config sources themselves (see <code>PollableSource</code>)

</li>
<li>
<code>ChangeWatcher</code> - a component watching the underlying source for changes. This requires support
in config sources themselves (see <code>WatchableSource</code>)

</li>
<li>
<code>EventConfigSource</code> - an event source that is capable of notifying about changes iteslf

</li>
</ol>
<p>If you want to receive <code>onChange</code> events, you must configure your Config with at least one source that is capable of providing changes (having a <code>PollingStrategy</code> or <code>ChangeWatcher</code> configured, or implementing <code>EventConfigSource</code>)</p>

</div>

<h3 id="_typed_config_values">Typed config values</h3>
<div class="section">
<p>The <code>Config</code> object lets your application retrieve config data as a typed ConfigValue.</p>

<p>You can retrieve a <code>ConfigValue&lt;T&gt;</code> using the following <code>as</code> methods in <code>Config</code>:
* <code>asString()</code> - to get a string config value
* <code>asBoolean()</code> and other accessors for primitive types
* <code>as(Class)</code> - to get a value for a type that has a mapper configured
* <code>as(Generic)</code> - to get a value for a type supporting generics (such as <code>Set&lt;String&gt;</code>)
* <code>asMap()</code> - to get a map of key to value pairs
* <code>asList(Class)</code> - to get a list of typed values
* <code>as(Function&lt;Config,T&gt;)</code> - to get a typed value providing a mapper function</p>

<p>ConfigValue&lt;T&gt; can be used to obtain:
* an <code>Optional&lt;T&gt;</code> value <em>from a single node</em>,
* the <code>T</code> value <em>from a single node</em> interpreted as a basic Java type (primitive or simple object) already known to the config system (such as a <code>boolean</code> or a <code>Double</code>), or
* a complex Java type <em>from a subtree</em> of the config tree.</p>

<p>+
The config system automatically knows how to return <code>List</code> and <code>Map</code> complex types, and you can provide <em>config mappers</em> to convert a config subtree to whatever
Java types your application needs.</p>

</div>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Although the default configuration is very simple to use, your
application can take as much control as it needs over</p>

<ul class="ulist">
<li>
<p>loading configuration data,</p>

</li>
<li>
<p>accessing the data once loaded, and</p>

</li>
<li>
<p>extending and modifying the behavior of the config system.</p>

</li>
</ul>
<p>You do this by:</p>

<ul class="ulist">
<li>
<p>creating and invoking methods on a <code>Config.Builder</code> object to construct a <code>Config</code> instance</p>
<p>Using a builder, the application can control everything about how the config
system creates the resulting <code>Config</code> instance: config sources, parsers, polling strategy,
filters, overrides, mappers, whether or not environment variables and Java
system properties serve as config sources. The JavaDoc explains how to use the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/Config.Builder.html"><code>Config.Builder</code></a>.</p>

<p>or</p>

</li>
<li>
<p>creating a <router-link to="#Config-Advanced-metaconfig" @click.native="this.scrollFix('#Config-Advanced-metaconfig')">meta-configuration</router-link>
file on the runtime classpath or file system to control how the config system prepares the
default configuration.</p>

</li>
</ul>
<p>Once created, the <code>Config</code> object provides many methods the application can use to
retrieve config data as various Java types. See the <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/Config.html"><code>Config</code></a>
JavaDoc for complete details.</p>

<p>The links in the following tables lead you to more information about various
other config topics.</p>

<div class="block-title"><span>Controlling How Config is Loaded</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Topic</th>
<th>Documentation</th>
</tr>
</thead>
<tbody>
<tr>
<td class="">Where config comes from</td>
<td class=""><router-link to="#config/02_config-sources.adoc" @click.native="this.scrollFix('#config/02_config-sources.adoc')">Config sources</router-link>,
<router-link to="#metaconfig" @click.native="this.scrollFix('#metaconfig')">meta-configuration</router-link></td>
</tr>
<tr>
<td class="">What format config data is expressed in</td>
<td class=""><router-link to="#parsers" @click.native="this.scrollFix('#parsers')">Config parsers</router-link>,
<router-link to="#config/08_supported-formats.adoc" @click.native="this.scrollFix('#config/08_supported-formats.adoc')">supported formats</router-link></td>
</tr>
<tr>
<td class="">How to filter, override, and dereference values</td>
<td class=""><router-link to="#filters-and-overrides" @click.native="this.scrollFix('#filters-and-overrides')">Filters and overrides</router-link></td>
</tr>
<tr>
<td class="">What happens when config data changes</td>
<td class=""><router-link to="#polling" @click.native="this.scrollFix('#polling')">Config polling</router-link></td>
</tr>
<tr>
<td class="">How to deal with loading errors</td>
<td class=""><router-link to="#retry" @click.native="this.scrollFix('#retry')">Config retry policies</router-link></td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Accessing Configuration Data</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Topic</th>
<th>Documentation</th>
</tr>
</thead>
<tbody>
<tr>
<td class="">How config data is translated into Java types</td>
<td class=""><router-link to="#config/04_property-mapping.adoc" @click.native="this.scrollFix('#config/04_property-mapping.adoc')">Config mappers</router-link></td>
</tr>
<tr>
<td class="">How to navigate config trees</td>
<td class=""><router-link to="#config/03_hierarchical-features.adoc" @click.native="this.scrollFix('#config/03_hierarchical-features.adoc')">Navigation</router-link></td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Extending and Fine-tuning the Config System</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Topic</th>
<th>Documentation</th>
</tr>
</thead>
<tbody>
<tr>
<td class="">Writing extensions</td>
<td class=""><router-link to="#config/07_extensions.adoc" @click.native="this.scrollFix('#config/07_extensions.adoc')">Extensions</router-link></td>
</tr>
</tbody>
</table>
</div>
</div>
</doc-view>