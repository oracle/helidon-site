<doc-view>

<h2 id="_about_microprofile_config">About MicroProfile Config</h2>
<div class="section">
<p>Helidon MicroProfile Config is an implementation of <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-config/">Eclipse MicroProfile Config</a>.
You can configure your applications using MicroProfile&#8217;s config configuration sources and APIs.</p>

<p>You can also extend the configuration using MicroProfile SPI to add custom <code>ConfigSource</code> and <code>Converter</code> by implementing the
<code>org.eclipse.microprofile.config.spi.ConfigSource</code> and <code>org.eclipse.microprofile.config.spi.Converter</code> interfaces respectively.</p>


<h3 id="_microprofile_config_features">MicroProfile Config Features</h3>
<div class="section">
<p>MicroProfile Config uses <code>ConfigSource</code> SPI to load configuration data, either from default configuration sources such
file <code>META-INF/microprofile-config.properties</code>, environment variables, and system properties; or from custom <code>ConfigSource</code>
located by Java Service Loader.</p>

<p>The data is then available through MicroProfile Config APIs to be injected into CDI Beans, or to be obtained using a <code>Config</code>
instance programmatically.</p>

<p>MicroProfile Config provides typed access to configuration values, using built-in converters, and <code>Converter</code> implementations located
by Java Service Loader.</p>


<h4 id="_using_microprofile_config_api">Using MicroProfile Config API</h4>
<div class="section">
<p>You can use MicroProfile Config API to get configuration properties by using <code>ConfigProvider.getConfig()</code>
or injecting configuration values with <code>@ConfigProperty</code>.</p>

<markup
lang="java"
title="Using ConfigProvider.getConfig()"
>org.eclipse.microprofile.config.Config config = ConfigProvider.getConfig();
config.getOptionalValue("app.greeting", String.class).orElse("Hello");</markup>

<markup
lang="java"
title="Injecting configured properties into a constructor"
>@Inject
public GreetingProvider(@ConfigProperty(name = "app.greeting", defaultValue = "Hello") String message) {
    this.message = message
}</markup>

</div>

<h4 id="_microprofile_config_config_sources">MicroProfile Config Config Sources</h4>
<div class="section">
<p>The example below shows how the MicroProfile configuration file <code>microprofile-config.properties</code> can be used to modify the server listen port property.</p>

<markup
lang="properties"

>// Application properties. This is the default greeting
app.greeting=Hello

// Microprofile server properties
server.port=8080
server.host=0.0.0.0</markup>

</div>
</div>

<h3 id="_helidon_microprofile_config_features">Helidon MicroProfile Config Features</h3>
<div class="section">
<p>Helidon MicroProfile Config offers the following features on top of the specification:</p>

<ul class="ulist">
<li>
<p><strong>References</strong><br>
You can use <code>${reference}</code> to reference another configuration key in a key value. This
allows to configure a single key to be reused in multiple other keys.</p>

</li>
</ul>
<markup
lang="yaml"
title="Example"
>uri: "http://localhost:8080"
service-1: "${uri}/service1"
service-2: "${uri}/service2"</markup>

<ul class="ulist">
<li>
<p><strong>Encryption</strong><br>
You can encrypt secrets using a master password and store them in a configuration file.
The config encryption filter in MicroProfile Config is enabled by default.
For more information, see <router-link to="#about/02_configuration-secrets.adoc" @click.native="this.scrollFix('#about/02_configuration-secrets.adoc')">Configuration Secrets</router-link>.</p>

</li>
</ul>
<markup
lang="properties"
title="Example of encrypted secrets"
># Password encrypted using a master password
client_secret=${GCM=mYRkg+4Q4hua1kvpCCI2hg==}
# Password encrypted using public key (there are length limits when using RSA)
client_secret=${RSA=mYRkg+4Q4hua1kvpCCI2hg==}
# Password in clear text, can be used in development
# The system needs to be configured to accept clear text
client_secret=${CLEAR=known_password}</markup>

<ul class="ulist">
<li>
<p><strong>Meta Configuration</strong><br>
You can configure the Config using Helidon SE Config meta configuration feature.
When used, the MicroProfile Config uses a single configuration source - Helidon SE Config configured
from meta configuration.</p>

</li>
</ul>
<p>The meta-config allows configuration of config sources and other configuration options,
including retry policies and polling strategies.</p>

<p>If a file named <code>meta-config.yaml</code>, or <code>meta-config.properties</code> is in the current directory or
on the classpath and there is no explicit setup of <code>Config</code> in the code, the configuration will
be loaded from the <code>meta-config</code> file.</p>

<markup
lang="yaml"
title="Example of a YAML meta configuration file:"
>sources:
  - type: "system-properties" <span class="conum" data-value="1" />
  - type: "environment-variables" <span class="conum" data-value="2" />
  - type: "file"
    properties:
      optional: true
      path: "mp-config.yaml" <span class="conum" data-value="3" />
  - type: "classpath"
    properties:
      optional: true
      resource: application.yaml <span class="conum" data-value="4" />
  - type: "classpath"
      multi-source: true
    properties:
      resource: "META-INF/microprofile-config.properties" <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Loads the environment variables config source.</li>
<li data-value="2">Loads the system variables config source.</li>
<li data-value="3">Loads the file config source from <code>mp-config.yaml</code> that is optional.</li>
<li data-value="4">Loads the file config source from <code>application.yaml</code> that is optional.</li>
<li data-value="5">Loads the classpath resource config source for  <code>microprofile-config.properties</code> that is the default configuration source of Microprofile application and is mandatory.</li>
</ul>
</div>
</div>

<h2 id="_guides">Guides</h2>
<div class="section">
<v-layout row wrap class="mb-5">
<v-flex xs12>
<v-container fluid grid-list-md class="pa-0">
<v-layout row wrap class="pillars">
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/mp/guides/03_config"><div class="card__link-hover"/>
</router-link>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">MP Config Guide</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Step-by-step guide about using MicroProfile Config in your Helidon MP application.</p>
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>
</v-flex>
</v-layout>
</div>

<h2 id="_using_microprofile_config_sources">Using MicroProfile Config Sources</h2>
<div class="section">
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
<td class=""><code>application.yaml</code></td>
<td class="">The Helidon default configuration source.</td>
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
</div>
</div>

<h2 id="_using_helidon_config_apis">Using Helidon Config APIs</h2>
<div class="section">
<p>You can use <code>MpConfigSources.create(helidonConfig)</code> to create a config source from Helidon config and then use it to create a MicroProfile instance.</p>

<markup
lang="java"

>io.helidon.config.Config helidonConfig = io.helidon.config.Config.builder()
                .addSource(ConfigSources.create(Map.of("key", "value"))) <span class="conum" data-value="1" />
                .build();

Config config = ConfigProviderResolver.instance()
                .getBuilder()
                .withSources(MpConfigSources.create(helidonConfig)) <span class="conum" data-value="2" />
                .build();</markup>

<ul class="colist">
<li data-value="1">Creates a config source from Helidon Config.</li>
<li data-value="2">Creates a MicroProfile Config instance.</li>
</ul>
<p>For more information on using Helidon Config APIs, see the Helidon SE Configuration documentation.</p>

</div>

<h2 id="_additional_information">Additional Information</h2>
<div class="section">
<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/config/spi/package-summary.html">Helidon Config SPI</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/config/package-summary.html">Helidon Config API</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-config-1.3/apidocs/">Eclispe MicroProfile API</a></p>

</li>
</ul>
</div>
</doc-view>