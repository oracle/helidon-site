<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Microprofile Config Sources</dt>
<dd slot="desc"><p>A Config Source provides configuration values from different sources such as property files and user classes that are registered by the application.</p>

<p>Helidon configuration sources can use different formats for the configuration data. You can specify the format on a per-source bases, mixing and matching formats as required.</p>

<p>The following configuration sources can be used to retrieve the configuration:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 37.5%;">
<col style="width: 62.5%;">
</colgroup>
<thead>
<tr>
<th>Source</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="">System properties</td>
<td class="">A mutable source that uses <code>System.getProperties()</code> to obtain configuration values.</td>
</tr>
<tr>
<td class="">Environment variables</td>
<td class="">An immutable source that uses <code>System.env()</code> to obtain configuration values and resolves aliases as defined by the MicroProfile Config specification.</td>
</tr>
<tr>
<td class=""><code>META-INF/microprofile-config.properties</code></td>
<td class="">The properties config source as defined by MicroProfile Config specification.</td>
</tr>
<tr>
<td class="">File</td>
<td class="">Creates the source from a properties file on the file system with <code>MpConfigSources.create(Path)</code>.</td>
</tr>
<tr>
<td class="">URL</td>
<td class="">Creates the source from properties from an URL with <code>MpConfigSources.create(URL)</code>.</td>
</tr>
<tr>
<td class=""><code>Map&lt;String, String&gt;</code></td>
<td class="">Creates the source from a Map with <code>MpConfigSources.create(Map)</code>.</td>
</tr>
<tr>
<td class=""><code>Properties</code></td>
<td class="">Creates the source directly from Properties with <code>MpConfigSources.create(Properties)</code>.</td>
</tr>
<tr>
<td class="">File on classpath</td>
<td class="">Creates the source from a properties file on classpath with <code>MpConfigSources.classpath(String)</code>.</td>
</tr>
<tr>
<td class="">YAML</td>
<td class="">Creates the source from YAML using <code>YamlMpConfigSource.create(Path)</code> or <code>YamlMpConfigSource.create(URL)</code>.</td>
</tr>
</tbody>
</table>
</div></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_understanding_the_ordering_of_default_config_sources">Understanding the Ordering of Default Config Sources</h2>
<div class="section">
<p>The default MicroProfile Config Sources are:</p>

<ul class="ulist">
<li>
<p>System properties (ordinal=400)</p>

</li>
<li>
<p>Environment variables (ordinal=300)</p>

</li>
<li>
<p>/META-INF/microprofile-config.properties (ordinal=100)</p>

</li>
</ul>
<p>Each Config Source has an ordinal that determines the priority of the Config Source.
A Config Source with higher ordinal has higher priority as compared to the Config Source with
lower ordinal. The values taken from the high-priority Config Source overrides the values
from low-priority Config Source.</p>

<p>This helps to customize the configuration of Config Sources using external Config Source
if an external Config Source has higher ordinal values than the built-in Config Sources of the application.</p>

</div>

<h2 id="_creating_custom_config_sources">Creating Custom Config Sources</h2>
<div class="section">
<p>Custom Config Sources are loaded using the Java Service Loader pattern, by implementing
either <code>org.eclipse.microprofile.config.spi.ConfigSource</code>,
or <code>org.eclipse.microprofile.config.spi.ConfigSourceProvider</code> SPI and registering
it as a service (Using <code>META-INF/services/${class-name}</code> file when using classpath, or
using the <code>provides</code> statement in <code>module-info.java</code> when using module path).</p>

<p>The interface <code>org.eclipse.microprofile.config.spi.ConfigSource</code> requires implementation of the following methods:</p>

<ul class="ulist">
<li>
<p><code>String getName()</code></p>

</li>
<li>
<p><code>Map&lt;String, String&gt; getProperties()</code></p>

</li>
<li>
<p><code>String getValue(String key)</code></p>

</li>
<li>
<p><code>getOrdinal()</code></p>

</li>
</ul>

<h3 id="_example_of_a_custom_config_source">Example of a Custom Config Source</h3>
<div class="section">
<markup
lang="java"

>public class CustomConfigSource implements ConfigSource {
    private static final String NAME = "MyConfigSource";
    private static final int ORDINAL = 200; // Default for MP is 100
    private static final Map&lt;String, String&gt; PROPERTIES = mapOf("app.greeting", "Hi");


    @Override
    public String getName() {
        return NAME; <span class="conum" data-value="1" />
    }

    @Override
    public Map&lt;String, String&gt; getProperties() {
        return PROPERTIES; <span class="conum" data-value="2" />
    }

    @Override
    public String getValue(String key) {
        return PROPERTIES.get(key); <span class="conum" data-value="3" />
    }

    @Override
    public int getOrdinal() {
        return ORDINAL; <span class="conum" data-value="4" />
    }
}</markup>

<ul class="colist">
<li data-value="1">Returns the name of the Config Source to use for logging or analysis of configured values.</li>
<li data-value="2">Returns the properties in this Config Source as a map.</li>
<li data-value="3">Returns the value of the requested key, or <code>null</code> if the key is not available</li>
<li data-value="4">Returns the ordinal of this Config Source.</li>
</ul>
</div>
</div>

<h2 id="_creating_microprofile_config_sources_for_manual_setup_of_config">Creating MicroProfile Config Sources for Manual Setup of Config</h2>
<div class="section">
<p>You can use the following methods to create MicroProfile Config Sources to manually set up the Config from <code>org.eclipse.microprofile.config.spi.ConfigProviderResolver#getBuilder()</code> on <code>io.helidon.config.mp.MpConfigSources</code> class:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 37.5%;">
<col style="width: 62.5%;">
</colgroup>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>systemProperties()</code></td>
<td class="">System properties config source.</td>
</tr>
<tr>
<td class=""><code>environmentVariables()</code></td>
<td class="">Environment variables config source.</td>
</tr>
<tr>
<td class=""><code>create(java.nio.file.Path)</code></td>
<td class="">Loads a properties file from file system.<br>
To load the properties file from file system with custom name, use <code>create(String, java.nio.file.Path)</code>.</td>
</tr>
<tr>
<td class=""><code>create(java.util.Map)</code></td>
<td class="">Creates an in-memory source from map.<br>
To create an in-memory source from map with custom name, use <code>create(String, java.util.Map)</code>.</td>
</tr>
<tr>
<td class=""><code>create(java.util.Properties)</code></td>
<td class="">Creates an in-memory source from properties.<br>
To create an in-memory source from properties with custom name, use <code>create(String, java.util.Properties)</code>.</td>
</tr>
</tbody>
</table>
</div>

<h3 id="_create_custom_map_microprofile_config_source">Create Custom Map MicroProfile Config Source</h3>
<div class="section">
<p>You can create Microprofile Config Source from a map.</p>

<markup
lang="java"
title="Create MicroProfile Config Source based on Environment Variables and Custom Map"
>ConfigProviderResolver resolver = ConfigProviderResolver.instance();

org.eclipse.microprofile.config.Config config = resolver.getBuilder() <span class="conum" data-value="1" />
        .withSources(MpConfigSources.environmentVariables()) <span class="conum" data-value="2" />
        .withSources(MpConfigSources.create(Map.of("key","value"))) <span class="conum" data-value="3" />
        .build(); <span class="conum" data-value="4" />

resolver.registerConfig(config, null); <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Creates MicroProfile Config Source builder.</li>
<li data-value="2">Adds environment variables.</li>
<li data-value="3">Adds a custom map.</li>
<li data-value="4">Builds the MicroProfile Config Source.</li>
<li data-value="5">Registers the config, so it can be used by other components</li>
</ul>
</div>

<h3 id="_create_yaml_microprofile_config_source">Create Yaml MicroProfile Config Source</h3>
<div class="section">
<p>You can create Yaml Microprofile Config Source from a path or a URL. When you create a MicroProfile instance from the builder,
the <code>YamlMpConfigSource</code> allows you to create a custom Config Source and register
it with the builder.</p>

<markup
lang="java"
title="Create YamlMPConfigSource from a path"
>ConfigProviderResolver.instance().newBuilder()
        .withSources(YamlMpConfigSource.create(path))
        .build();</markup>

</div>
</div>

<h2 id="_creating_microprofile_config_sources_from_meta_config">Creating MicroProfile Config Sources from meta-config</h2>
<div class="section">
<p>Instead of directly specifying the configuration sources in your code, you can use meta-configuration in a file that declares
the configuration sources, and their attributes as mentioned in <router-link to="/mp/config/01_introduction">Microprofile Config</router-link></p>

<p>When used, the Microprofile Config uses configuration sources and flags configured in the meta configuration file.</p>

<p>If a file named <code>mp-meta-config.yaml</code>, or <code>mp-meta-config.properties</code> is in the current directory or
on the classpath, and there is no explicit setup of configuration in the code, the configuration will
be loaded from the <code>meta-config</code> file.
The location of the file can be overridden using system property <code>io.helidon.config.mp.meta-config</code>,
or environment variable <code>HELIDON_MP_META_CONFIG</code></p>

<markup
lang="yaml"
title="Example of a YAML meta configuration file:"
>add-discovered-sources: true <span class="conum" data-value="1" />
add-discovered-converters: false <span class="conum" data-value="2" />
add-default-sources: false <span class="conum" data-value="3" />

sources:
  - type: "environment-variables" <span class="conum" data-value="4" />
  - type: "system-properties" <span class="conum" data-value="5" />
  - type: "properties" <span class="conum" data-value="6" />
    path: "/conf/prod.properties" <span class="conum" data-value="7" />
    ordinal: 50 <span class="conum" data-value="8" />
    optional: true <span class="conum" data-value="9" />
  - type: "yaml"  <span class="conum" data-value="10" />
    classpath: "META-INF/database.yaml" <span class="conum" data-value="11" /></markup>

<ul class="colist">
<li data-value="1">If configured to <code>true</code>, config sources discovered through service loader will be added</li>
<li data-value="2">If configured to <code>true</code>, converters discovered through service loader will be added</li>
<li data-value="3">If configured to <code>true</code>, default config sources (system properties, environment variables, and `META-INF/microprofile-config.properties) will be added</li>
<li data-value="4">Loads the environment variables config source.</li>
<li data-value="5">Loads the system properties config source.</li>
<li data-value="6">Loads a properties file</li>
<li data-value="7">Location of the file: <code>/conf/prod.properties</code> on the file system</li>
<li data-value="8">Custom ordinal, if not defined, the value defined in the file, or default value is used. The source precedence order is the order of appearance in the file.</li>
<li data-value="9">The file is optional (if not optional and no file is found, the bootstrap fails)</li>
<li data-value="10">Loads a YAML file</li>
<li data-value="11">Location of the file: <code>META-INF/database.yaml</code> on the classpath</li>
</ul>
</div>

<h2 id="_creating_microprofile_config_source_from_helidon_se_config_source">Creating MicroProfile Config Source from Helidon SE Config Source</h2>
<div class="section">
<p>To use the Helidon SE features in Helidon MP, create MicroProfile Config Source from Helidon SE Config Source. The Config Source is immutable regardless of configured polling strategy or change watchers.</p>

<div class="listing">
<pre>Config config = ConfigProviderResolver.instance()
                .getBuilder()
                .withSources(MpConfigSources.create(helidonConfigSource) <span class="conum" data-value="1" />
                .build();</pre>
</div>

<ul class="colist">
<li data-value="1">Creates a MicroProfile config instance using Helidon Config Source.</li>
</ul>
</div>

<h2 id="_creating_microprofile_config_source_from_helidon_se_config_instance">Creating MicroProfile Config Source from Helidon SE Config Instance</h2>
<div class="section">
<p>To use advanced Helidon SE features in Helidon MP, create MicroProfile Config Source from Helidon SE Config. The Config Source is mutable if the config uses either polling strategy and change watchers, or polling strategy or change watchers.
The latest config version is queried each time  <code>org.eclipse.microprofile.config.spi.ConfigSource#getValue(String)</code> is called.</p>

<div class="listing">
<pre>io.helidon.config.Config helidonConfig = io.helidon.config.Config.builder()
                .addSource(ConfigSources.create(Map.of("key", "value"))) <span class="conum" data-value="1" />
                .build();
ConfigProviderResolver.instance();
Config config = ConfigProviderResolver.instance()
                .getBuilder()
                .withSources(MpConfigSources.create(helidonConfig)) <span class="conum" data-value="2" />
                .build();</pre>
</div>

<ul class="colist">
<li data-value="1">Creates a config source from Helidon Config.</li>
<li data-value="2">Creates a MicroProfile config instance using Helidon Config.</li>
</ul>
</div>
</doc-view>