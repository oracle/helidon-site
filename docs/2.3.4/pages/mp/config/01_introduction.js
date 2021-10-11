<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>MicroProfile Config</dt>
<dd slot="desc"><p>Helidon&#8217;s MicroProfile Config, an implementation of Eclipse MicroProfile Config, enables you to configure your applications using MicroProfile’s config configuration sources and APIs.</p>
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
<p>To enable MicroProfile Config
either add a dependency on the <router-link to="/mp/introduction/02_microprofile">helidon-microprofile bundle</router-link> or
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.microprofile.config&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile-config&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

</div>

<h2 id="_about_microprofile_config">About MicroProfile Config</h2>
<div class="section">
<p>Helidon MicroProfile Config is an implementation of <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-config/">Eclipse MicroProfile Config</a>.
You can configure your applications using MicroProfile&#8217;s config configuration sources and APIs. You can also extend the
configuration using MicroProfile SPI to add custom <code>ConfigSource</code> and <code>Converter</code>.</p>


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

<h4 id="_microprofile_config_profiles">MicroProfile Config Profiles</h4>
<div class="section">
<p>MicroProfile Config supports a concept of configuration profiles. You can define a profile using the configuration property <code>mp.config.profile</code>
(when using default configuration, this can be defined as a system property, environment variable or as a property in <code>microprofile-config.properties</code>).
When a profile is defined, additional config source is loaded (<code>microprofile-config-profile.properties</code>) and properties from profile have precedence over
default properties. Profile properties can be defined using <code>%profile</code> prefix, such as <code>%dev.server.port</code>.</p>

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
For more information, see <router-link to="/mp/security/03_configuration-secrets">Configuration Secrets</router-link>.</p>

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
You can configure the Config using Helidon MP Config meta configuration feature. The meta-config allows configuration of config sources and other
configuration options, including addition of discovered sources and converters.</p>

</li>
</ul>
<p>This is a Helidon specific feature available since version 2.3.0. See <router-link to="/mp/config/02_MP_config_sources">Microprofile Config Sources</router-link> for detailed information.</p>

<div class="admonition note">
<p class="admonition-inline">For backward compatibility, we will support usage of Helidon SE meta-configuration until version 3.0.0. Using this approach causes behavior that is not compatible with MicroProfile Config specification.</p>
</div>
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

<h2 id="_additional_information">Additional Information</h2>
<div class="section">
<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="./apidocs//io.helidon.config/io/helidon/config/spi/package-summary.html">Helidon Config SPI</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="./apidocs//io.helidon.config/io/helidon/config/package-summary.html">Helidon Config API</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-config-1.3/apidocs/">Eclispe MicroProfile API</a></p>

</li>
</ul>
</div>
</doc-view>