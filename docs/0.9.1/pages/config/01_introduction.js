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
configuration properties in key/value form into a <code>Config</code> object which the
application can use to retrieve config data.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Getting Started</h2>
<div class="section">

<h3 >Introducing the Config System</h3>
<div class="section">
<p>A brief overview of the config system helps clarify its different parts
and how they work together. Most applications will typically deal with more
than one of these parts.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/overview.png" alt="Configuration Overview" />
</v-card-text>
</v-card>

<p>The system reads configuration from a <em>config source</em>, a physical location (such as a file,
a URL, or a <code>String</code>) which holds config data. Each config source works with a
<em>config parser</em> which translates a particular text format (for example, Java properties or YAML)
into an in-memory tree which represents the configuration&#8217;s structure and values.
An optional <em>polling strategy</em> detects and publishes changes to the underlying config source
so the config source itself or your application can respond.</p>

<p>Your application uses the <code>Config</code>
object which results from building that in-memory tree to retrieve config data.
The app can navigate explicitly among the nodes in the tree and fetch a node&#8217;s
value</p>

<markup
lang="java"

>Optional&lt;String&gt; pageSize = Config.get("web").get("page-size").value();</markup>

<p>or it can address a node in the tree using the config key&#8217;s dotted name</p>

<markup
lang="java"

>int pageSize = Config.get("web.page-size").asInt();</markup>

<p>As part of
retrieving a value from a node, the config system applies <em>config filters</em>
which can change what values are returned for selected keys.</p>

<p>The <code>Config</code> object lets your application retrieve config data as:</p>

<ul class="ulist">
<li>
<p>an <code>Optional&lt;String&gt;</code> value <em>from a single node</em>,</p>

</li>
<li>
<p>the <code>String</code> value <em>from a single node</em> interpreted as a basic Java type
(primitive or simple object) already known to the config system (such as
a <code>boolean</code> or a <code>Double</code>), or</p>

</li>
<li>
<p>a complex Java type <em>from a subtree</em> of the config tree.</p>
<p>The config system automatically knows how to return <code>List</code> and <code>Map</code> complex types,
and you can provide <em>config mappers</em> to convert a config subtree to whatever
Java types your application needs.</p>

</li>
</ul>
</div>

<h3 >Your First Config Application</h3>
<div class="section">
<p>An easy way to start with the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.html">Config</a> API
is to follow these four steps:</p>

<ol style="margin-left: 15px;">
<li>
<router-link to="#maven-coords" @click.native="this.scrollFix('#maven-coords')">add config-related dependencies to your <code>pom.xml</code></router-link>

</li>
<li>
<router-link to="#update-module-info" @click.native="this.scrollFix('#update-module-info')">revise your <code>module-info.java</code> to refer to config (if you are using Java 9)</router-link>

</li>
<li>
<router-link to="#create-simple-config-props" @click.native="this.scrollFix('#create-simple-config-props')">create a simple config properties file</router-link>

</li>
<li>
<router-link to="#Config-Basics-DefaultConfig" @click.native="this.scrollFix('#Config-Basics-DefaultConfig')">retrieve and use the default <code>Config</code> from your app</router-link>

</li>
</ol>

<h4 >Add Maven Dependency on Config</h4>
<div class="section">
<markup
lang="xml"
title="Config Dependency in <code>pom.xml</code>"
>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-config&lt;/artifactId&gt;
        &lt;version&gt;version-of-config-you-are-using&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

</div>

<h4 >Update <code>module-info.java</code></h4>
<div class="section">
<p>If you are using Java 9 then create or update the <code>module-info.java</code> file for your application:</p>

<markup
lang="java"
title="Config Dependency in <code>module-info.java</code>"
>module myModule {
    requires io.helidon.config;
}</markup>

</div>

<h4 >Create simple Config Properties File</h4>
<div class="section">
<markup

title="Example <code>src/main/resources/application.properties</code> config file"
>greeting = Hello

web.debug = true
web.page-size = 20
web.ratio = 1.3

bl.initial-id = 10000000000

origin = props
java.home=homeFromProps # will be ignored</markup>

</div>

<h4 >Write Code using the Default Config</h4>
<div class="section">
<markup
lang="java"
title="Create and Use Default <code>Config</code> from Java"
>import io.helidon.config.Config; <span class="conum" data-value="1" />
...
        Config config = Config.create(); <span class="conum" data-value="2" />
        System.out.println(String.format(
                      "greeting is %s\n"
                    + "web.debug is %b\n"
                    + "web.page-size is %d\n"
                    + "web.ratio is %f\n"
                    + "bl.initial-id is %d\n"
                    + "origin is %s\n"
                    + "java.home is %s",
                config.get("greeting").asString(),  <span class="conum" data-value="3" />
                config.get("web.debug").asBoolean(),
                config.get("web.page-size").asInt(),
                config.get("web.ratio").asDouble(),
                config.get("bl.initial-id").asLong(),
                config.get("origin").asString(),
                config.get("java.home").asString()));</markup>

<ul class="colist">
<li data-value="1">Import <code>Config</code>.</li>
<li data-value="2">Create the root of the <code>Config</code> tree from the default sources.</li>
<li data-value="3">Retrieve various values by their dotted names and decode them as the appropriate
Java types.</li>
</ul>
<p>When you build and run your project, the output will look like this:</p>

<markup


>greeting is Hello
web.debug is true
web.page-size is 20
web.ratio is 1.300000
bl.initial-id is 10000000000
origin is props
java.home is /Library/Java/JavaVirtualMachines/jdk-10.0.1.jdk/Contents/Home</markup>


<h5 >Config Sources for the Default Config</h5>
<div class="section">
<p>The default config uses the following config sources, listed here from most to least important:</p>

<ol style="margin-left: 15px;">
<li>
Java system properties

</li>
<li>
Environment variables

</li>
<li>
<code>application.properties</code>, if on the classpath.

</li>
</ol>
<p>The priority (most to least important) means that if a given config key appears in
more than one source, the value assigned in a more important source overrules the
value from a less important source.</p>

<p>Verify this by noting that the program has displayed your actual <code>java.home</code> which
Java set as a system property, not the value set in the example <code>application.properties</code>
file.</p>

</div>

<h5 >Built-in Support for Config Formats</h5>
<div class="section">
<p>If you add additional Helidon config maven artifacts to your dependencies, then the
config system can read formats other than Java properties format and the default
configuration will search for other <code>application</code> file types
in the following order. Note that the default configuration <em>stops</em> once it finds
one of the files below; it <em>does not</em> merge all such files it can find.</p>

<div class="block-title"><span>Default Config Files (most to least important)</span></div>
<div class="table__overflow elevation-1 ">
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
<td><code>application.yaml</code></td>
<td><code>helidon-config-yaml</code></td>
<td>YAML format <a id=""
title=""
target="_blank"
href="http://yaml.org">http://yaml.org</a></td>
</tr>
<tr>
<td><code>application.conf</code></td>
<td><code>helidon-config-hcon</code></td>
<td>HOCON format <a id=""
title=""
target="_blank"
href="https://github.com/lightbend/config#using-hocon-the-json-superset">https://github.com/lightbend/config#using-hocon-the-json-superset</a></td>
</tr>
<tr>
<td><code>application.json</code></td>
<td><code>helidon-config-hcon</code></td>
<td>JSON format <a id=""
title=""
target="_blank"
href="https://json.org/">https://json.org/</a></td>
</tr>
<tr>
<td><code>application.properties</code></td>
<td><code>helidon-config</code></td>
<td>Java properties format</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>

<h2 >Next Steps</h2>
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
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.html"><code>Config.Builder</code></a>.</p>

<p>or</p>

</li>
<li>
<p>creating a <a id=""
title=""
target="_blank"
href="06_advanced-configuration.html#metaconfig">meta-configuration</a>
file on the runtime classpath to control how the config system prepares the
default configuration.</p>

</li>
</ul>
<p>Once created, the <code>Config</code> object provides many methods the application can use to
retrieve config data as various Java types. See the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.html"><code>Config</code></a>
JavaDoc for complete details.</p>

<p>The links in the following tables lead you to more information about various
other config topics.</p>

<div class="block-title"><span>Controlling How Config is Loaded</span></div>
<div class="table__overflow elevation-1 ">
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
<td>Where config comes from</td>
<td><a id=""
title=""
target="_blank"
href="02_config-sources.html">Config sources</a>,
<a id=""
title=""
target="_blank"
href="06_advanced-configuration.html#metaconfig">meta-configuration</a></td>
</tr>
<tr>
<td>What format config data is expressed in</td>
<td><a id=""
title=""
target="_blank"
href="02_config-sources.html#parsers">Config parsers</a>,
<a id=""
title=""
target="_blank"
href="08_supported-formats.html">supported formats</a></td>
</tr>
<tr>
<td>How to filter, override, and dereference values</td>
<td><a id=""
title=""
target="_blank"
href="06_advanced-configuration.html#">Filters and overrides</a></td>
</tr>
<tr>
<td>What happens when config data changes</td>
<td><a id=""
title=""
target="_blank"
href="05_mutability-support.html">Config polling</a></td>
</tr>
<tr>
<td>How to deal with loading errors</td>
<td><a id=""
title=""
target="_blank"
href="06_advanced-configuration.html#retry">Config retry policies</a></td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Accessing Configuration Data</span></div>
<div class="table__overflow elevation-1 ">
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
<td>How config data is translated into Java types</td>
<td><a id=""
title=""
target="_blank"
href="04_property-mapping.html">Config mappers</a></td>
</tr>
<tr>
<td>How to navigate config trees</td>
<td><a id=""
title=""
target="_blank"
href="03_hierarchical-features.html">Navigation</a></td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Extending and Fine-tuning the Config System</span></div>
<div class="table__overflow elevation-1 ">
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
<td>Writing extensions</td>
<td><a id=""
title=""
target="_blank"
href="07_extensions.html">Extensions</a></td>
</tr>
</tbody>
</table>
</div>
</div>
</doc-view>