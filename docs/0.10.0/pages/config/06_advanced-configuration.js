<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Advanced Configuration Topics</dt>
<dd slot="desc"><p>This section discusses several advanced topics related to Helidon configuration.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Advanced Config Sources and Config Parsers</h2>
<div class="section">

<h3 >Directory Config Source</h3>
<div class="section">
<p>The config system supports using a file system directory as a config source.
Each <em>non-directory</em> file in the directory becomes a config entry: the file name
is the key and the contents of that file
are used as the corresponding config <code>String</code> value.</p>

<p>The following example shows, for example, one way to load Kubernetes secrets
mounted on the pod&#8217;s filesystem.</p>

<p>If the directory <code>conf/secrets</code> contains these two files</p>

<markup

title="File <code>secrets/username</code>"
>jose</markup>

<markup

title="File <code>secrets/password</code>"
>^ery$ecretP&amp;ssword</markup>

<p>your application can load this as configuration as follows:</p>

<markup
lang="java"
title="Using <code>directory</code> config source"
>Config secrets = Config.withSources(
        ConfigSources.directory("conf/secrets")) <span class="conum" data-value="1" />
        .disableEnvironmentVariablesSource()     <span class="conum" data-value="2" />
        .disableSystemPropertiesSource()         <span class="conum" data-value="2" />
        .build();

assert secrets.get("username").asString()        <span class="conum" data-value="3" />
        .equals("jose");
assert secrets.get("password").asString()        <span class="conum" data-value="4" />
        .equals("^ery$ecretP&amp;ssword");</markup>

<ul class="colist">
<li data-value="1">Loads all files from the <code>conf/secrets</code> directory.</li>
<li data-value="2">No need to use environment variables or system properties as sources in building
the <code>Config</code>.</li>
<li data-value="3">The loaded config maps the key <code>username</code> to the value <code>jose</code>&#8230;&#8203;</li>
<li data-value="4">&#8230;&#8203;and the key <code>password</code> to <code>^ery$ecretP&amp;ssword</code>.</li>
</ul>
<p>Remember that your application can process the contents of a given file
as configuration. See the <router-link to="/config/02_config-sources">config sources</router-link> section
and the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.html#file-java.lang.String-"><code>ConfigSources.file</code></a>
JavaDoc.</p>

</div>

<h3 >In-memory Config Sources</h3>
<div class="section">
<p>The config system provides several ways to create a <code>Config</code> tree from data
already in memory. See the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.html"><code>ConfigSources</code> javadoc</a>
for further details. The numerous variants of the <code>from</code> method construct
<code>ConfigSource</code> or <code>Builder&lt;ConfigSource&gt;</code> instances.</p>


<h4 >Subtree of Another <code>Config</code></h4>
<div class="section">
<markup
lang="java"

>Config anotherConfig = Config.from(classpath("application.conf"));

Config config = Config.from(
        ConfigSources.from(anotherConfig.get("data")));</markup>

</div>

<h4 ><code>Properties</code> Object</h4>
<div class="section">
<markup
lang="java"

>Config config = Config.from(
        ConfigSources.from(System.getProperties()).build());                <span class="conum" data-value="1" /></markup>

</div>

<h4 ><code>String</code> of a Given Media Type</h4>
<div class="section">
<markup
lang="java"

>Config config = Config.from(
        ConfigSources.from("app.greeting = Hi", "text/x-java-properties")); <span class="conum" data-value="2" /></markup>

</div>

<h4 ><code>Map</code></h4>
<div class="section">
<markup
lang="java"

>Config config = Config.from(
        ConfigSources.from(Map.of("app.page-size", "20"))
            .lax()             <span class="conum" data-value="3" />
            .build());         <span class="conum" data-value="1" /></markup>

</div>

<h4 ><em>ad hoc</em> Config Nodes</h4>
<div class="section">
<markup
lang="java"

>Config config = Config.from(
        ConfigSources.from(ObjectNode.builder()
                                   .addList("app.basic-range", ListNode.builder()
                                           .addValue("-20")
                                           .addValue("20")
                                           .build())
                                   .build()));</markup>

<ul class="colist">
<li data-value="1"><code>ConfigSources.from</code> variants for <code>Properties</code> or <code>Map</code> arguments return a
<code>ConfigSources.MapBuilder</code> instance.</li>
<li data-value="2">A similar <code>from</code> variant accepts a <code>Readable</code> instead of a <code>String</code>.</li>
<li data-value="3"><code>MapBuilder</code> by default throws an exception if a key appears more than once
in the map. The <code>lax()</code> method relaxes this; the config system logs a warning instead.</li>
</ul>
</div>
</div>

<h3 >Multi-Source <code>Config</code>s and Composite Config Sources</h3>
<div class="section">
<p>Although the examples above use a single source, you can build a single <code>Config</code>
from multiple sources.</p>


<h4 >Handling Key Collisions</h4>
<div class="section">

<h5 >Prefixed Config Sources</h5>
<div class="section">
<p>Sometimes you might want to create a single config tree from
multiple sources but in a way that keeps the config from different sources
in different subtrees.</p>

<p>The config system lets you assign a prefix to all keys
from a given source using the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.html#prefixed-java.lang.String-java.util.function.Supplier-"><code>ConfigSources.prefixed</code></a> method.
The following example shows two YAML files as config sources
and the code to load each with a different prefix into a single <code>Config</code> tree:</p>

<markup
lang="hocon"
title="File <code>app.conf</code>"
>greeting = "Hello"
page-size = 20
basic-range = [ -20, 20 ]</markup>

<markup
lang="hocon"
title="File <code>data.conf</code>"
>providers: [
    {
        name = "Provider1"
        class = "this.is.my.Provider1"
    },
    {
        name = "Provider2"
        class = "this.is.my.Provider2"
    }
]</markup>

<markup
lang="java"
title="Using <code>prefixed</code> config source"
>Config config = Config.from(
        ConfigSources.prefixed("app",                    <span class="conum" data-value="1" />
                               classpath("app.conf")),   <span class="conum" data-value="2" />
        ConfigSources.prefixed("data",                   <span class="conum" data-value="3" />
                               classpath("data.conf"))); <span class="conum" data-value="4" />

assert config.get("app.greeting").asString()             <span class="conum" data-value="5" />
        .equals("Hello");

assert config.get("data.providers.0.name").asString()    <span class="conum" data-value="6" />
        .equals("Provider1");</markup>

<ul class="colist">
<li data-value="1">Specifies the prefix <code>app</code> for the associated source.</li>
<li data-value="2"><code>Supplier&lt;ConfigSource&gt;</code> for the file
<code>app.conf</code> loaded from the current <code>classpath</code>.</li>
<li data-value="3">Specifies the prefix <code>data</code> for the associated source.</li>
<li data-value="4">Supplier&lt;ConfigSource&gt; for the file <code>app.conf</code> loaded from the current <code>classpath</code>.</li>
<li data-value="5">Key <code>app.greeting</code> combines the <code>app</code> prefix and the original key <code>greeting</code>
from the <code>app.conf</code> source.</li>
<li data-value="6">Key <code>data.providers.0.name</code> combines the <code>data</code> prefix and
the original key <code>providers.0.name</code> property from <code>data.conf</code> source.</li>
</ul>
<p>This technique can be useful, for example, if multiple sources contain
keys that might overlap; assigning different prefixes to the keys from different
sources gives your application a way to access all config elements distinctly even
if their keys would otherwise conflict.</p>

</div>

<h5 >Merging Strategies</h5>
<div class="section">
<p>The <code>ConfigSources.from(Supplier&lt;ConfigSource&gt;&#8230;&#8203;)</code> and <code>ConfigSources.from(List&lt;Supplier&lt;ConfigSource&gt;&#8230;&#8203;)</code>
methods return a <code>CompositeConfigSource</code>.
By default, earlier sources in the list have higher priority than later ones, meaning
that if the same key appears in two or more sources the source earlier in the
list prevails.</p>

<p>Each <code>CompositeConfigSource</code>'s <em>merging strategy</em> actually controls this behavior.
The config system provides the
<code>FallbackMergingStrategy</code>
which implements the default, "first wins" algorithm. You can write your own
implementation of
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.MergingStrategy.html"><code>ConfigSources.MergingStrategy</code></a>
and use it instead to provide a different algorithm.</p>

<markup
lang="java"
title="Composite config source example"
>Config config = Config.from(                                                 <span class="conum" data-value="1" />
        ConfigSources.from(file("conf/dev.properties").optional(),           <span class="conum" data-value="2" />
                           file("conf/config.properties").optional())        <span class="conum" data-value="2" />
                .add(classpath("application.properties"))                    <span class="conum" data-value="3" />
                .mergingStrategy(ConfigSources.MergingStrategy.fallback())); <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">Creates a new <code>Config</code> instance from a single composite config source.</li>
<li data-value="2">Method <code>ConfigSources.from(sources&#8230;&#8203;)</code> returns <code>CompositeBuilder</code> instance
initialized with two sources (from <code>dev.properties</code> and <code>config.properties</code>
files).</li>
<li data-value="3">Adds third config source (<code>application.properties</code> on
classpath) to the same <code>CompositeBuilder</code>.</li>
<li data-value="4">Specifies the merging strategy. This example uses the default fallback
merging strategy.</li>
</ul>
</div>
</div>
</div>

<h3 >How Config Chooses Parsers</h3>
<div class="section">
<p>As the <a id=""
title=""
target="_blank"
href="config/02_config-sources.html">config sources and parsers</a> section describes,
these two work together to read and translate configuration data from some
external form into the corresponding in-memory config tree.</p>

<p>Although most applications are
explicit about the config sources they use in building a <code>Config</code>, the config system often
has to figure out what parser to use. It does so by:</p>

<ol style="margin-left: 15px;">
<li>
determining, the best that it can, the media type of the source, and

</li>
<li>
locating a parser that can translate that media type.

</li>
</ol>

<h4 >Identifying the Media Type</h4>
<div class="section">

<h5 >By Inference</h5>
<div class="section">
<p>Most applications let the config system try to infer the media type of the
config source.</p>

<p>By default config source implementations use the Java
<code>java.nio.file.Files.probeContentType(Path)</code> API to infer the source media type from
the source, typically (but not always) based on the file type portion of the file path.
The config system registers implementations of
the <code>java.nio.file.spi.FileTypeDetector</code> SPI that recognize
the supported formats: <code>.properties</code>, <code>.yaml</code>, <code>.json</code> and <code>.conf</code>. To handle
other formats you can implement and register your own <code>FileTypeDetector</code>
implementations. (Typically you would also write and register a config parser
to translate that format; see <router-link to="#locating-parser" @click.native="this.scrollFix('#locating-parser')">Locating a Parser</router-link> below.)</p>

</div>

<h5 >By Application Directive</h5>
<div class="section">
<p>Your application can specify what media type to use in interpreting a config
source. Use this if your application knows the media type but the system might
not be able to infer it correctly, either because no type detector would recognize it or
because there might be more than one inferred media type.</p>

<markup
lang="java"
title="Specify <code>mediaType</code> for config source"
>Config config = Config.from(classpath("props")                             <span class="conum" data-value="1" />
                                    .mediaType("text/x-java-properties")); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The config system cannot infer the media type because there is no file
type in the path <code>props</code>.</li>
<li data-value="2">The developer knows the file is in Java Properties format so specifies the
media type explicitly.</li>
</ul>
<p>Note that a file type detector <em>could</em> be written to
also inspect the contents of the file to infer the media type. The detector
which the config system provides looks only for the <code>.properties</code> file type in the
path.</p>

</div>
</div>

<h4 >Locating a Parser</h4>
<div class="section">

<h5 >By Inference from <code>media-type</code></h5>
<div class="section">
<p>Each config parser reports which media types it handles. Once the config system
has determined a source&#8217;s media type, it searches the config parsers associated
with the config builder for one that recognizes that media type. It then uses
that parser to translate the config in the source into the in-memory config tree.</p>

<p>The application can add one or more parsers to a <code>Config.Builder</code>
using the <code>addParser</code> method. This makes the parser available for use by the
config sources associated with that builder, but does not directly tie a given
parser to a given source. The builder uses media-type matching to select one of
the parsers registered with the builder for each source.</p>

<p>If the config system cannot locate a parser that matches the media type of a source, it throws
a <code>ConfigException</code> when trying to prepare the configuration.</p>

</div>

<h5 >By Application Directive</h5>
<div class="section">
<p>Your application can specify which parser to use for a config source. The
<code>AbstractParsableConfigSource.Builder</code> class exposes the <code>parser</code> method, which
accepts the <code>ConfigParser</code> to be used for that source. Several methods
on <code>ConfigSources</code> such as <code>classpath</code>, <code>directory</code>, and <code>file</code> return this
builder class.</p>

<p>Generally try to rely on media-type matching rather than specifying a given parser
for a given source in the application. This keeps your application more flexible,
both by insulating it from implementation classes and by letting it easily take
advantage of improvements in or alternatives to the parsers available for a given
media type.</p>

<markup
lang="java"
title="Specify <code>parser</code> for config source"
>Config config = Config.from(classpath("props")                            <span class="conum" data-value="1" />
                                    .parser(ConfigParsers.properties())); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The config system cannot infer the media type because there is no file
type in the path <code>props</code>.</li>
<li data-value="2">The developer knows the file is in Java Properties format so specifies the
properties parser explicitly.</li>
</ul>
</div>
</div>
</div>

<h3 >Parsing a Config Value as Config</h3>
<div class="section">
<p>A config value node might contain an entire config document in <code>String</code> form, but in
a format different from the containing document. Your application can tell the
config system to parse such a node as config in a different format and replace
the <code>String</code> value node in the original tree with the config tree that results
from parsing that <code>String</code>.</p>

<p>In this example, a YAML document contains a JSON document as a leaf.</p>

<markup
lang="yaml"
title="YAML file with included JSON formated property"
>secrets:
    username: "jose"
    password: "^ery$ecretP&amp;ssword"

app: &gt;                             <span class="conum" data-value="1" />
    {
        "greeting": "Hello",
        "page-size": 20,
        "basic-range": [ -20, 20 ]
    }</markup>

<ul class="colist">
<li data-value="1">The property <code>app</code> is itself formatted as a JSON document.</li>
</ul>

<h4 >Specify Key-to-media-type Mapping</h4>
<div class="section">
<markup
lang="java"
title="Specify JSON as media type for node"
>Config config = Config.from(
        classpath("application.yaml")
                .mediaTypeMapping(                          <span class="conum" data-value="1" />
                        key -&gt; "app".equals(key.toString()) <span class="conum" data-value="2" />
                                ? "application/json"
                                : null));

assert config.get("secrets.username").asString()            <span class="conum" data-value="3" />
        .equals("jose");
assert config.get("secrets.password").asString()            <span class="conum" data-value="3" />
        .equals("^ery$ecretP&amp;ssword");

assert config.get("app").type() == Type.OBJECT;             <span class="conum" data-value="4" />

assert config.get("app.greeting")                           <span class="conum" data-value="3" />
        .asString().equals("Hello");
assert config.get("app.page-size")                          <span class="conum" data-value="3" />
        .asInt() == 20;
assert config.get("app.basic-range.0")                      <span class="conum" data-value="3" />
        .asInt() == -20;
assert config.get("app.basic-range.1")                      <span class="conum" data-value="3" />
        .asInt() == 20;</markup>

<ul class="colist">
<li data-value="1">The source builder&#8217;s <code>mediaTypeMapping</code> method accepts a function
which returns the appropriate media types (if any) for config keys.</li>
<li data-value="2">The function says to treat the <code>app</code> property value as a JSON document and
leave other nodes unchanged.</li>
<li data-value="3">Other properties are loaded as expected.</li>
<li data-value="4">Property <code>app</code> is now an structured object node.</li>
</ul>
<p>Because the function passed to <code>mediaTypeMapping</code> identifies the <code>app</code> node as a JSON
document, the config system selects the config parser that is registered with the builder
which also handles the JSON media type.</p>

<p>Also, note that the config system replaces the original <code>String</code> value node with
an object node resulting from parsing that <code>String</code> value as JSON.</p>

</div>

<h4 >Specify Key-to-parser Mapping</h4>
<div class="section">
<p>Alternatively, your application could map config keys to the specific parsers
you want to use for parsing those keys' values.</p>

<markup
lang="java"
title="Specify JSON formatted property' parser instance"
>Config config = Config.from(
        ConfigSources.classpath("application.yaml")
                .parserMapping(                                           <span class="conum" data-value="1" />
                        key -&gt; "app".equals(key.toString())               <span class="conum" data-value="2" />
                                ? HoconConfigParserBuilder.buildDefault()
                                : null));</markup>

<ul class="colist">
<li data-value="1">Uses the <code>parserMapping</code> method to map keys to parser instances.</li>
<li data-value="2">Tells the config system to use the HOCON parser for translating the <code>String</code>
value of the <code>app</code> key. (HCON is a superset of JSON.)</li>
</ul>
<p>As before, the config system replaces the value node in the
containing config tree with the config tree resulting from the additional parse.</p>

</div>
</div>

<h3 >Loading Config using Meta-configuration</h3>
<div class="section">
<p>Instead of including code in your application to construct config trees from
builders, sources, etc., you can instead prepare <em>meta-configuration</em> in a file
that declares the sources to load and their attributes.</p>

<p>You can either specify the meta-config file in your application or
allow the config sytem to search for and load meta-config from a preset
list of possible sources.</p>


<h4 >Loading Config by Specifying a Meta-configuration File</h4>
<div class="section">
<p>Your application loads
the configuration specified by a meta-config file by:</p>

<ul class="ulist">
<li>
<p>invoking the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.html#load-io.helidon.config.Config-"><code>ConfigSources.load(Config)</code></a>
method, passing a config object read from the meta-config source as the argument;</p>

</li>
<li>
<p>invoking the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.html#loadSources-java.util.function.Supplier&#8230;&#8203;"><code>Config.loadSources</code></a>
method, or</p>

</li>
<li>
<p>invoking the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.html#loadSourcesFrom-java.util.function.Supplier&#8230;&#8203;"><code>Config.loadSourcesFrom</code></a>
method.</p>

</li>
</ul>
<p>These methods return either a <code>Config</code> tree or a <code>Config.Builder</code> which
your application can further fine-tune before using to construct a <code>Config</code>
tree. The config system interprets the meta-config as directions for how to
build a config tree, rather than as the config data itself.</p>

</div>

<h4 >Loading Config from an Implicit Meta-configuration File</h4>
<div class="section">
<p>The <router-link to="/config/01_introduction">introduction</router-link> section shows how to use
<code>Config.create()</code> to load config from one of several possible default config files.
That same method also searches for one of severl possible default meta-config files
from which to load config sources to be used for the default config.</p>

<p>The <code>Config.create()</code> method determines the default configuration from
the following search:</p>

<ol style="margin-left: 15px;">
<li>
Attempt to load <em>meta-config</em> from at most one of the following, checked in this order:
<ol style="margin-left: 15px;">
<li>
<code>meta-config.yaml</code> - meta configuration file in YAML format

</li>
<li>
<code>meta-config.conf</code> - meta configuration file in HOCON format

</li>
<li>
<code>meta-config.json</code> - meta configuration file in JSON format

</li>
<li>
<code>meta-config.properties</code> - meta configuration file in Java Properties format

</li>
</ol>
</li>
<li>
Otherwise, load <em>config</em> from:
<ol style="margin-left: 15px;">
<li>
environment variables, and

</li>
<li>
Java system properties, and

</li>
<li>
at most one of the following, checking in this order:
<ol style="margin-left: 15px;">
<li>
<code>application.yaml</code> - configuration file in YAML format

</li>
<li>
<code>application.conf</code> - configuration file in HOCON format

</li>
<li>
<code>application.json</code> - configuration file in JSON format

</li>
<li>
<code>application.properties</code> - configuration file in Java Properties format

</li>
</ol>
</li>
</ol>
</li>
</ol>
<p>Remember that the config system will check for these default meta-config and config files
only if the classpath includes the corresponding parsers. The introduction section on <router-link :to="{path: '/config/01_introduction', hash: '#built-in-formats'}">built-in formats</router-link>
section describes this further.</p>

</div>

<h4 >Meta-configuration File Format</h4>
<div class="section">
<p>Each meta-configuration file must contain the top-level <code>sources</code> property that is an
array (ordered list) of config sources. The meta-config file can contain other
top-level keys as well but the config system ignores them when it interprets the contents as
meta-configuration.</p>

<p>Each <code>sources</code> property must contain exactly one of following top level properties:</p>

<div class="block-title"><span>Meta-configuration Required Top-level Property</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property Name</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>type</code></td>
<td><doc-view>
<p></p>

<ul class="ulist">
<li>
<p>a predefined type (see <router-link to="#MetaConfig-built-in-types" @click.native="this.scrollFix('#MetaConfig-built-in-types')">below</router-link>), or</p>

</li>
<li>
<p>a custom config source ID</p>

</li>
</ul>
</doc-view>
</td>
</tr>
<tr>
<td><code>class</code></td>
<td><doc-view>
<p></p>

<ul class="ulist">
<li>
<p>a custom config source implementation, or</p>

</li>
<li>
<p>a builder class with a <code>build()</code> method that returns <code>ConfigSource</code></p>

</li>
</ul>
</doc-view>
</td>
</tr>
</tbody>
</table>
</div>
<p>If you specify both <code>type</code> and <code>class</code>, the config system ignores the <code>class</code>
setting.</p>

<p>In addition, each <code>sources</code> property can optionally have a <code>properties</code> property
which assigns type-specific attributes for the config source being defined.</p>


<h5 >Built-in Types</h5>
<div class="section">
<p>The config system supports these built-in types:</p>

<div class="block-title"><span>Built-in Meta-configuration Types</span></div>
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
<th>Type</th>
<th>Use</th>
<th>Related <code>ConfigSources</code> Method</th>
<th>Required Properties</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>system-properties</code></td>
<td>System properties are a config source</td>
<td><code>ConfigSources.systemProperties()</code></td>
<td>n/a</td>
</tr>
<tr>
<td><code>environment-variables</code></td>
<td>Environment variables are a config source</td>
<td><code>ConfigSources.environmentVariables()</code></td>
<td>n/a</td>
</tr>
<tr>
<td><code>classpath</code></td>
<td>Specified resource is used as a config source</td>
<td><code>ConfigSources.classpath(String)</code></td>
<td><code>resource</code> - path to the resource to load</td>
</tr>
<tr>
<td><code>file</code></td>
<td>Specified file is used as a config source</td>
<td><code>ConfigSources.file(Path)</code></td>
<td><code>path</code> - path to the file to load</td>
</tr>
<tr>
<td><code>directory</code></td>
<td>Each file in directory used as config entry, with key = file name and value = file contents</td>
<td><code>ConfigSources.directory(String)</code></td>
<td><code>path</code> - path to the directory to use</td>
</tr>
<tr>
<td><code>url</code></td>
<td>Specified URL is read as a config source</td>
<td><code>ConfigSources.url(URL)</code></td>
<td><code>url</code> - URL from which to load the config</td>
</tr>
<tr>
<td><code>prefixed</code></td>
<td>Associated config source is loaded with the specified prefix</td>
<td><code>ConfigSources.prefixed(String,Supplier)</code></td>
<td><doc-view>
<ul class="ulist">
<li>
<p><code>key</code> - key of config element in associated source to load</p>

</li>
<li>
<p><code>type</code> or <code>class</code> - associated config source specification</p>

</li>
<li>
<p><code>properties</code> - as needed to further qualify the associated config source</p>

</li>
</ul>
</doc-view>
</td>
</tr>
</tbody>
</table>
</div>
<p>Except for the <code>system-properties</code> and <code>environment-variables</code> types, the meta-config
<code>properties</code> section for a source can also specify any optional settings for the
corresponding config source type. The JavaDoc for the related config source
type builders lists the supported properties for each type. (For example,
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/internal/FileConfigSource.FileBuilder.html"><code>FileConfigSource.FileBuilder</code></a>.)</p>

<p>Here is example meta-configuration in HOCON format. Note how the <code>properties</code> sections
are at the same level as the <code>type</code> or <code>class</code> within a <code>sources</code> array entry.</p>

<markup
lang="hocon"
title="Meta-configuration <code>config-meta-all.conf</code> illustrating all built-in sources available on the classpath"
>sources = [
    {
        type = "environment-variables"
    }
    {
        type = "system-properties"
    }
    {
        type = "directory"
        properties {
            path = "conf/secrets"
            media-type-mapping {
                yaml = "application/x-yaml"
                password = "application/base64"
            }
            polling-strategy {
                type = "regular"
                properties {
                    interval = "PT15S"
                }
            }
        }
    }
    {
        type = "url"
        properties {
            url = "http://config-service/my-config"
            media-type = "application/hocon"
            optional = true
            retry-policy {
                type = "repeat"
                properties {
                    retries = 3
                }
            }
        }
    }
    {
        type = "file"
        properties {
            path = "conf/env.yaml"
            polling-strategy {
                type = "watch"
            }
        }
    }
    {
        type = "prefixed"
        properties {
            key = "app"
            type = "classpath"
            properties {
                resource = "app.conf"
            }
        }
    }
    {
        type = "classpath"
        properties {
            resource = "application.conf"
        }
    }
]</markup>

<p>Note that the example shows how your meta-configuration can configure optional features such as polling
strategies and retry policies for config sources.</p>

</div>
</div>

<h4 >Meta-config for Custom Source Types</h4>
<div class="section">
<p>You can use meta-config to set up custom config source types as well as the
built-in ones described above. Meta-config supports this in two ways:</p>

<ul class="ulist">
<li>
<p>by class name</p>

</li>
<li>
<p>by custom type name</p>

</li>
</ul>

<h5 >Custom Source Types using <code>class</code></h5>
<div class="section">
<p>Use the <code>class</code> property in one of your <code>sources</code> entries and as its value
give the fully-qualified class name of your custom source type. The config
system will use that class as the <code>ConfigSource</code> (or as a builder for one)
for that source.</p>

<markup
lang="hocon"

>{
    class = "io.helidon.config.git.GitConfigSourceBuilder"
    properties {
        path = "application.conf"
        directory = "/app-config"
    }
}</markup>

</div>

<h5 >Custom Source Type using <code>type</code></h5>
<div class="section">
<p>You can add your own custom type names to the built-in ones by adding to a
<code>META-INF/resources/meta-config-sources.properties</code> file on the classpath.
In this file each property name is a custom config source type name and its
value is the fully-qualified class name for a custom <code>ConfigSource</code> implementation
or a builder for it.</p>

<p>For example, the Helidon module <code>helidon-config-git</code> provides this
<code>META-INF/resources/meta-config-sources.properties</code> file:</p>

<markup

title="Definition of <code>git</code> Config Source Type"
>git = io.helidon.config.git.GitConfigSourceBuilder</markup>

<p>This definition lets you configure a git config source in meta-configuration as
follows:</p>

<markup
lang="hocon"

>{
    type = "git"
    properties {
        path = "application.conf"
        directory = "/app-config"
    }
}</markup>

<p>You can define and use your own custom config source type names similarly.</p>

<p>Note that it is the <code>AbstractSource</code> SPI class that provides support for
polling strategies and retry policies. If you create custom config sources that
should also offer this support be
sure they extend <code>AbstractSource</code> or one of its subclasses to inherit this behavior.</p>

</div>
</div>

<h4 >Loading Config using Meta-configuration</h4>
<div class="section">
<p>Here is how your application can use meta-configuration in a particular resource on the
classpath to load a <code>Config</code> tree:</p>

<markup
lang="java"
title="Loading Config using Meta-configuration"
>ConfigSource sourceFromMetaConfig = ConfigSources.load(  <span class="conum" data-value="1" />
        classpath("config-meta-all.conf")).build();      <span class="conum" data-value="2" />

Config config = Config.from(sourceFromMetaConfig);       <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">The <code>ConfigSources.load</code> method creates a config source for the eventual config
from the config source argument which specifies the meta-config.</li>
<li data-value="2">This example uses meta-config from a resource on the classpath but you can
use meta-config from any valid config source.</li>
<li data-value="3">The <code>load</code> method populates the <code>sourceFromMetaConfig</code> <code>ConfigSource</code> from
all the actual sources declared in the meta-configuration. The returned <code>ConfigSource</code>
is ready for use in creating a <code>Config</code> instance.</li>
</ul>
</div>

<h4 >Meta-config for Polling Strategies and Retry Policies</h4>
<div class="section">
<p>Your meta-config can include the set-up for polling strategies and retry
policies if the config source supports them. Declare them in a way similar to
how you declare the config sources themselves: by <code>type</code> or <code>class</code> and with
accompanying <code>properties</code>.</p>

<div class="block-title"><span>Meta-config Support for Built-in Polling Strategies</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Strategy Type</th>
<th>Usage</th>
<th>Properties</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>regular</code></td>
<td>Periodic polling - See <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/PollingStrategies.html#regular-java.time.Duration-"><code>PollingStrategies.regular</code></a> method</td>
<td><code>interval</code> (<code>Duration</code>) - indicating how often to poll; e.g., <code>PT15S</code> represents 15 seconds</td>
</tr>
<tr>
<td><code>watch</code></td>
<td>Filesystem monitoring - See <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/PollingStrategies.html#watch-java.nio.file.Path-"><code>PollingStrategies.watch</code></a> method</td>
<td><code>path</code> - file system path to the <code>classpath</code>, <code>file</code>, or <code>directory</code> to monitor</td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Meta-config Support for Built-in Retry Policies</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Policy Type</th>
<th>Usage</th>
<th>Properties</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>repeat</code></td>
<td>Regularly-scheduled - see <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/configRetryPolicies.html#repeat-int-"><code>RetryPolicies.repeat</code></a>.</td>
<td><doc-view>
<p></p>

<p>Optional:</p>

<ul class="ulist">
<li>
<p><code>delay</code> (<code>Duration</code>) - initial delay between retries</p>

</li>
<li>
<p><code>delay-factor</code> (<code>double</code>) - <code>delay</code> is repeatedly multiplied by this each retry to compute
the delay for each successive retry</p>

</li>
<li>
<p><code>call-timeout</code> (<code>Duration</code>) - timeout for a single invocation to load the source</p>

</li>
<li>
<p><code>overall-timeout</code> (<code>Duration</code>) - total timeout for all retry calls and delays</p>

</li>
</ul>
</doc-view>
</td>
</tr>
</tbody>
</table>
</div>
<p>To specify a custom polling strategy or custom retry policy, specify <code>class</code> (instead of
<code>type</code>) and give the fully-qualified class name for the implementation class.
If your custom class needs parameters to control its behavior the config system
uses <code>io.helidon.config.ConfigMapper</code> to initialize the class instance.
See <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/RetryPolicy.html"><code>RetryPolicy</code></a> and
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a> JavaDoc
sections.</p>

</div>
</div>
</div>

<h2 >Configuration Key</h2>
<div class="section">
<p>As described in the <router-link :to="{path: '/config/03_hierarchical-features', hash: '#accessByKey'}">hierarchical features
section</router-link> each config node (except the root) has a non-null key. Here is the formal
definition of what keys can be:</p>

<markup
lang="abnf"
title="The ABNF syntax of config key"
>config-key = *1( key-token *( "." key-token ) )
 key-token = *( unescaped / escaped )
 unescaped = %x00-2D / %x2F-7D / %x7F-10FFFF
           ; %x2E ('.') and %x7E ('~') are excluded from 'unescaped'
   escaped = "~" ( "0" / "1" )
           ; representing '~' and '.', respectively</markup>

<div class="admonition important">
<p class="admonition-textlabel">Important</p>
<p ><p>To emphasize, the dot character (&#8220;.&#8221;) has special meaning as a name separator
in keys. To include a dot as a character in a key escape it as
 &#8220;~1&#8221;. To include a tilda escape it as &#8220;~0&#8221;.</p>
</p>
</div>
<p>For example, the following configuration file contains two object nodes with
names <code>oracle</code> and <code>oracle.com</code>.</p>

<markup
lang="json"
title="Example <code>application.json</code> with dot character in key"
>{
    "oracle" : {
        "com" : true,
        "cz" : false
    },
    "oracle.com" : {
        "secured" : true
    }
}</markup>

<markup
lang="java"
title="Working with configuration with dot character in node name"
>Config config = Config.from(classpath("application.json"));

// node `oracle`
assert config.get("oracle.com").asBoolean() == true;                         <span class="conum" data-value="1" />
assert config.get("oracle").get("com").asBoolean() == true;                  <span class="conum" data-value="1" />
assert config.get("oracle.com").type() == Type.VALUE;                        <span class="conum" data-value="2" />
assert config.get("oracle.com").name().equals("com");                        <span class="conum" data-value="3" />
// node `oracle.com`
assert config.get("oracle~1com.secured").asBoolean() == true;                <span class="conum" data-value="4" />
assert config.get(Key.escapeName("oracle.com"))                              <span class="conum" data-value="5" />
        .get("secured").asBoolean() == true;
assert config.get(Key.escapeName("oracle.com")).type() == Type.OBJECT;       <span class="conum" data-value="6" />
assert config.get(Key.escapeName("oracle.com")).name().equals("oracle.com"); <span class="conum" data-value="7" /></markup>

<ul class="colist">
<li data-value="1">Work with the first <code>oracle</code> object as usual.
As always you can use the fully-qualified key <code>oracle.com</code> or chain <code>get(key)</code>
 calls to access the <code>com</code> property value.</li>
<li data-value="2">Config node <code>"oracle"</code> / <code>"com"</code> is a leaf node (has type <code>VALUE</code>)&#8230;&#8203;</li>
<li data-value="3">&#8230;&#8203; and has the name <code>com</code> (the last token in its key).</li>
<li data-value="4">The second object has name <code>oracle.com</code>. The code must escape the
dot in the node&#8217;s name using <code>oracle~1com</code>.</li>
<li data-value="5">Or, use the utility method <code>Config.Key.escapeName(name)</code> to escape dots or tildes
that might be in the node&#8217;s name, in this example in <code>oracle.com</code>.</li>
<li data-value="6">The config node <code>"oracle.com"</code> has type <code>OBJECT</code>&#8230;&#8203;</li>
<li data-value="7">&#8230;&#8203;and name <code>"oracle.com"</code>.</li>
</ul>
</div>

<h2 >Filter, Overrides, and Token Substitution</h2>
<div class="section">
<p>When your application retrieves a config value, the config system can transform it
before returning the value, according to <em>filters</em>, <em>overrides</em>, and
<em>tokens</em>. The config system provides some built-in instances of these
you can use, and you can add your own as described in the
sections which describe
<router-link :to="{path: '/config/07_extensions', hash: '#Config-SPI-ConfigFilter'}">filters</router-link> and
<router-link :to="{path: '/config/07_extensions', hash: '#Config-SPI-OverrideSource'}">overrides</router-link>.</p>

<p>Your application can add filters and overrides explicitly to a config builder
and the config system by default uses the Java service loader mechanism to
locate all available filters and overrides and add them automatically to all
config builders (unless your code disables that behavior for a given
builder).</p>


<h3 >Filters</h3>
<div class="section">
<p>Each filter accepts a key and the value as defined in the source, and returns
the value to be used. The filter can leave the value unchanged or
alter it, as it sees fit.</p>

<p>The built-in <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigFilters.html#valueResolving--">value-resolving</a>
filter enables the token substitution described below.</p>

<p>See the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigFilter.html"><code>ConfigFilter</code></a> JavaDoc
for more information.</p>

</div>

<h3 >Overrides</h3>
<div class="section">
<p>The overrides feature allows you to create an external document containing key/value
pairs which replace the value otherwise returned for the name, and then add that
document as an override source to a config builder.</p>

<p>There are some key differences between overrides and filters.
* Because overrides are loaded
from sources those sources can change while your application runs and so the
overrides they that prescribe can change.
* The override document can use wildcards in key expressions.
* Overrides can affect only keys that already exist in the original source; filters
can supply values even if the key is absent from the config source.</p>

<p>Each override entry consists of a Java properties-format definition. The key is an
expression (which can use wildcards) to match config keys read from the current
config sources, and the override value is the new value for any key matching the
key expression from that entry. Order is important. The
config system tests every key expression/value pair one by one in the order they appear
in the overrides sources. Once the config system finds an override entry in which
the key expression matches the configuration key, the system returns that entry&#8217;s
value for the key being processed.</p>

<p>See the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/OverrideSource.html"><code>OverrideSource</a></code> JavaDoc
for more detail.</p>

</div>

<h3 >Tokens</h3>
<div class="section">
<p>A token reference is a key token starting with <code>$</code>, optionally enclosed between
 <code>{</code> and <code>}</code>, i.e. <code>$ref</code>, <code>${ref}</code>. Even a key composed of more than one token
 can be referenced in another key, i.e. <code>${env.ref}</code>.</p>

<p>As an example use case, you can use token references to declare the default values (see
<code>resolving-tokens.yaml</code> below), while the references may be resolved in another
config source, which identifies a current environment (see <code>env.yaml</code> examples
below). You can then use the same overrides for different environments, say <code>test</code> and <code>prod</code>.
The configuration in each environment is then overridden with a different values
using wildcards (see <code>overrides.properties</code> below).</p>

<markup
lang="java"
title="Initialize <code>Config</code> with Override Definition from <code>overrides.properties</code> file"
>Config config = Config.builder()
        .overrides(OverrideSources.file("conf/overrides.properties")) <span class="conum" data-value="1" />
        .sources(file("conf/env.yaml"),                               <span class="conum" data-value="2" />
                 classpath("resolving-tokens.yaml"))                  <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Loads <em>overrides</em> from the specified file.</li>
<li data-value="2">A deployment-specific environment configuration file.</li>
<li data-value="3">A default configuration containing token references that are resolved
using the environment-specific override.</li>
</ul>
</div>
</div>

<h2 >Executors for Asynchronous Config Activity</h2>
<div class="section">
<p>Various parts of the config system work asychronously:</p>

<ul class="ulist">
<li>
<p>polling strategies to detect changes to config sources,</p>

</li>
<li>
<p>publishers to notify your application when such changes occur,</p>

</li>
<li>
<p><code>Config</code> instances which subscribe to and respond to change notifications for
their underlying sources, and</p>

</li>
<li>
<p>retry policies (which might wait between retries).</p>

</li>
</ul>
<p>Each of these uses an executor to perform its work. The config system provides default
executors, but your application can specify different ones if necessary.</p>


<h3 >Executors for Polling Strategy</h3>
<div class="section">
<p>The two methods <code>PollingStrategies.regular(Duration)</code> and
<code>PollingStrategies.watch(Path)</code> return builders for their respective strategies.
Both builders expose the <code>executor</code> method which your application can invoke, passing a
<code>java.util.concurrent.ScheduledExecutorService</code> instance it wants used for the
polling work. By default each polling strategy instance uses a separate thread
pool executor.</p>

<p>The following example shares the same executor for two different polling
strategy instances.</p>

<markup
lang="java"
title="Customize polling strategy executors"
>ScheduledExecutorService executor = Executors.newScheduledThreadPool(2); <span class="conum" data-value="1" />

Config config = Config.from(
        ConfigSources.file("conf/dev.properties")
                .pollingStrategy(
                        PollingStrategies.regular(Duration.ofSeconds(2)) <span class="conum" data-value="2" />
                                .executor(executor)),                    <span class="conum" data-value="3" />
        ConfigSources.file("conf/config.properties")
                .pollingStrategy(
                        path -&gt; PollingStrategies.watch(path)            <span class="conum" data-value="4" />
                                .executor(executor)));                   <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Prepares a thread pool executor with core pool size set <code>2</code> to be shared by
all polling strategies.</li>
<li data-value="2">Selects the built-in periodic polling strategy.</li>
<li data-value="3">Tells the config system to use the specific executor to poll the
<code>dev.properties</code> config source.</li>
<li data-value="4">Uses the Java filesystem <code>WatchService</code> to monitor the specified path.</li>
<li data-value="5">Tells the config system to use the same executor to monitor the path.</li>
</ul>
</div>

<h3 >Publishers for Source Change Events</h3>
<div class="section">
<p>Recall that when a polling strategy detects a change in a source, it informs
interested parties of the changes. By default each <code>Config.Builder</code> arranges
for the resulting <code>Config</code> tree to use a shared executor that reuses available threads
from a pool, creating new threads as needed. The same executor is used for actually
reloading the source.</p>

<p>Your application can invoke the polling strategy builder&#8217;s <code>changesExecutor</code> method to
tell the builder
to use a different <code>Executor</code>. (As an aside, your application can also control
the size of the buffer used for holding source change events by invoking the
builder&#8217;s <code>changesMaxBuffer</code> method. The default is 256.)</p>

<markup
lang="java"
title="Customize config and override sources' executors"
>Executor executor = Executors.newCachedThreadPool();               <span class="conum" data-value="1" />

Config config = Config.builder()
        .overrides(
                OverrideSources.file("conf/overrides.properties")
                        .pollingStrategy(PollingStrategies::watch)
                        .changesExecutor(executor)                 <span class="conum" data-value="2" />
                        .changesMaxBuffer(4))                      <span class="conum" data-value="3" />
        .sources(
                ConfigSources.file("conf/env.yaml")
                        .pollingStrategy(PollingStrategies::watch)
                        .changesExecutor(executor)                 <span class="conum" data-value="4" />
                        .changesMaxBuffer(4))                      <span class="conum" data-value="4" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Prepares a thread pool executor to be shared by selected sources.</li>
<li data-value="2">Tells the builder that the resulting overrides source should use the specified
<code>Executor</code> for notifying interested parties of changes and for reloading the
override source.</li>
<li data-value="3">Specifies an event buffer size of 4.</li>
<li data-value="4">Uses the same <code>Executor</code> and event buffer size for the config source as for
the override source above.</li>
</ul>
</div>

<h3 >Composite Config Source Executor</h3>
<div class="section">
<p>When your application supplies multiple sources to a config builder, as with
<code>Config.from(Supplier&lt;ConfigSource&gt;&#8230;&#8203;)</code> and <code>Config.from(List&lt;Supplier&lt;ConfigSource&gt;&gt;)</code>,
the config system
automatically uses a <em>composite config source</em> which aggregates the separate
sources but also listens for changes to any of the individual sources so it can
delegate the change notification. For this change detection and notification the
config system, by default, uses an executor with a dedicated thread pool that is
shared across all <code>Config</code> instances.</p>

<p>Your application can invoke the builder&#8217;s <code>changesExecutor</code> method to use a
different <code>ScheduledExecutorService</code> instance.
The builder returned by the <code>from</code> methods mentioned above is a
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.CompositeBuilder.html">CompositeBuilder</a>
which extends <code>Config.Builder</code>.</p>

<p>Because a composite source might yield more numerous change events&#8201;&#8212;&#8201;because of the
multiple underlying sources&#8201;&#8212;&#8201;your application can specify a <em>debounce timeout</em>
for the composite source by invoking the <code>CompositeBuilder.changesDebounce(Duration)</code>
method. The composite source aggregates multiple change events within this period
into a single event and broadcasts that one instead and reloads the sources at
that time, not necessarily in response to every single change in any source.
The default is <code>100</code> milliseconds.</p>

<markup
lang="java"
title="Customize composite source executors"
>ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);       <span class="conum" data-value="1" />

Config config = Config.from(
        ConfigSources.from(file("conf/dev.properties")                         <span class="conum" data-value="2" />
                                   .pollingStrategy(PollingStrategies::watch),
                           file("conf/config.properties")                      <span class="conum" data-value="2" />
                                   .pollingStrategy(PollingStrategies::watch))
                .changesExecutor(executor)                                     <span class="conum" data-value="3" />
                .changesMaxBuffer(4)                                           <span class="conum" data-value="4" />
                .changesDebounce(Duration.ofSeconds(1)));                      <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Prepares a thread pool executor.</li>
<li data-value="2"><code>ConfigSources.from(Supplier&lt;ConfigSource&gt;&#8230;&#8203;)</code> creates and returns a
<code>CompositeBuilder</code> based on the two sources.</li>
<li data-value="3">Specifies a particular executor for monitoring and change event notification.</li>
<li data-value="4">Sets the subscriber&#8217;s buffer size to 4 events. The composite source discards
any events not consumed by a subscriber if it needs to create room for more
recent events.</li>
<li data-value="5">Change events will not fire more frequently than once per a second.</li>
</ul>
</div>

<h3 >Config Custom Executor</h3>
<div class="section">
<p>A loaded config tree subscribes to change events publishes by its source(s).
By default, each <code>Config</code> uses an executor which manages a dedicated thread pool
reusing previously-created threads when they are available and creating new threads
as needed.
All <code>Config</code> instances share the dedicated thread pool.</p>

<p>Your application
can specify a non-default <code>Executor</code> for a tree to use for accepting and propagating
those events by invoking the <code>changesExecutor</code> method on the <code>Config.Builder</code>.
Each source subscriber has a dedicated buffer for holding changes events. This
defaults to 256 but you can tailor this value as needed.</p>

<markup
lang="java"
title="Customize config executor"
>Executor executor = Executors.newCachedThreadPool();        <span class="conum" data-value="1" />

Config config = Config.withSources(
        file("conf/config.properties")
                .pollingStrategy(PollingStrategies::watch))
        .changesExecutor(executor)                          <span class="conum" data-value="2" />
        .changesMaxBuffer(16)                               <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Prepares a specific thread pool executor.</li>
<li data-value="2">Specifies the executor the <code>Config</code> tree will use to listen for and propagate
change events.</li>
<li data-value="3">Sets the event subscriber buffer to <code>16</code> events.</li>
</ul>
</div>

<h3 >Retry Policy Custom Executor</h3>
<div class="section">
<p>You can control which executor a retry policy should use for its work.
The <code>RetryPolicies.repeat(int retries)</code> method returns
a <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/RetryPolicies.Builder.html">RetryPolicies.Builder</a>.
Your application can invoke the retry policy builder&#8217;s <code>executor</code> method to
specify which <code>ScheduledExecutorService</code> instance it should use to schedule and
execute delayed retries. By default the config system uses a separate thread
pool executor for each retry policy instance.</p>

<markup
lang="java"
title="Customize retry policy executors"
>ScheduledExecutorService executor = Executors.newScheduledThreadPool(2, myThreadFactory); <span class="conum" data-value="1" />

Config config = Config.from(
        ConfigSources.file("conf/dev.properties")
                .optional()                                                               <span class="conum" data-value="2" />
                .retryPolicy(RetryPolicies.repeat(2)                                      <span class="conum" data-value="3" />
                        .executor(executor)));                                            <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">Prepares a thread pool executor with core pool size set to <code>2</code> and a custom
<code>java.util.concurrent.ThreadFactory</code>.</li>
<li data-value="2">When the source is flagged as <code>optional()</code>, the loading attempt will be
 repeated as the retry policy defines, but an overall failure will <em>not</em> lead to
failing the initial load or preventing the source from being polled if so configured.</li>
<li data-value="3">Uses the built-in <em>repeating</em> implementation of <code>RetryPolicy</code> that can be used with any
config source, but typically for ones that might suffer brief, intermittent outages.</li>
<li data-value="4">Specifies the executor to use for loading and retries.</li>
</ul>
</div>
</div>
</doc-view>
