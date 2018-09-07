<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Additional Supported Formats and Sources</dt>
<dd slot="desc"><p>Helidon Config provides several extension modules that support other configuration
 formats (parsers) and sources. This section describes how to add these modules
to your build and how to use them from your application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Introduction</h2>
<div class="section">
<p>This document describes the additional config formats and sources the Helidon
config system supports and how to include them and use them in your project. In each
case you need to add module dependencies to your project and, in some cases,
write your application accordingly.</p>

</div>

<h2 >Additional Config Formats and Parsers</h2>
<div class="section">

<h3 >Automatic Media Type and File Type Handling</h3>
<div class="section">
<p>With each of the parsers described here, your application can either</p>

<ol style="margin-left: 15px;">
<li>
explicitly add a parser of the correct implementation to the <code>Config.Builder</code>, or

</li>
<li>
rely on Java service loading and the config system&#8217;s matching of file types and
media types to parsers.

</li>
</ol>
<p>If your application creates a <code>Config.Builder</code> with parser services <em>disabled</em>
(see <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.html#disableParserServices"><code>disableParserServices</code></a>
then that builder will not find the Java services for the various parsers and so
will be unable to match the file type or media type of sources with the corresponding
parser automatically. So if you want to use automatic type
matching with a given builder, do not invoke <code>Config.Builder.disableParserServices()</code>.</p>

</div>

<h3 >YAML</h3>
<div class="section">

<h4 >Maven Coordinates</h4>
<div class="section">
<p>Add the following dependency in your project:</p>

<markup
lang="xml"
title="Config YAML Dependency in <code>pom.xml</code>"
>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-config-yaml&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

<markup
lang="java"
title="Config YAML Dependency in <code>module-info.java</code>"
>module myModule {
    requires io.helidon.config.yaml;
}</markup>

</div>

<h4 >Using the YAML Parser</h4>
<div class="section">
<p>The YAML parser handles the following media type:</p>

<ul class="ulist">
<li>
<p><code>application/x-yaml</code> - YAML format (file type <code>.yaml</code>)</p>

</li>
</ul>
<markup
lang="java"
title="Automatic selection"
>Config config = Config.from(classpath("application.yaml")); <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">The config system automatically maps the file type <code>.yaml</code> to the media type <code>application/x-yaml</code>
which the Helidon YAML parser matches.</li>
</ul>
<markup
lang="java"
title="YAML parser specified - no file type on source"
>Config config = Config.from(classpath("my-config")                                    <span class="conum" data-value="1" />
                                    .parser(YamlConfigParserBuilder.buildDefault())); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The media type of the source <code>my-config</code> is unknown, so the config system
cannot choose a parser automatically.</li>
<li data-value="2">The config system will parse the resource <code>my-config</code> on the runtime classpath
using the YAML parser instance created by the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/yaml/YamlConfigParserBuilder.html"><code>YamlConfigParserBuilder</code></a>.
The <code>buildDefault()</code> method creates a config parser with default behavior.</li>
</ul>
<markup
lang="java"
title="Media type specified"
>Config config = Config.from(classpath("my-config")                     <span class="conum" data-value="1" />
                                    .mediaType("application/x-yaml")); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The media type of the source <code>my-config</code> is unknown, so the config system
cannot choose a parser automatically.</li>
<li data-value="2">Specifying the media type for the config source allows the config system to
use its matching algorithm with the available parsers to choose a parser for that type.</li>
</ul>
<markup
lang="java"
title="YAML parser specified because parser services disabled"
>Config config = Config.withSources(classpath("application.yaml"))
        .disableParserServices()                                  <span class="conum" data-value="1" />
        .addParser(YamlConfigParserBuilder.buildDefault())        <span class="conum" data-value="2" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Disables automatic parser lookup and registration.</li>
<li data-value="2">Explicit registration of the YAML parser is therefore required.</li>
</ul>
</div>
</div>

<h3 >HOCON/JSON</h3>
<div class="section">
<p>The Helidon HOCON config module handles sources in the
HOCON and JSON formats.</p>


<h4 >Maven Coordinates</h4>
<div class="section">
<p>Add the following dependency in your project:</p>

<markup
lang="xml"
title="Config HOCON Dependency in <code>pom.xml</code>"
>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-config-hocon&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

<markup
lang="java"
title="Config HOCON Dependency in <code>module-info.java</code>"
>module myModule {
    requires io.helidon.config.hocon;
}</markup>

</div>

<h4 >Using the HOCON/JSON Parser</h4>
<div class="section">
<p>The parser handles the following media types:</p>

<ul class="ulist">
<li>
<p><code>application/hocon</code> - HOCON format (file type <code>.conf</code>)</p>

</li>
<li>
<p><code>application/json</code> - JSON format (file type <code>.json</code>)</p>

</li>
</ul>
<markup
lang="java"
title="Automatic selection"
>Config config = Config.from(classpath("application.conf")); <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">The config system automatically maps the file type <code>.conf</code> to the media type `application/hocon
which the Helidon HOCON parser matches.</li>
</ul>
<p>The same module and parser supports file type <code>.json</code> and the media type
 <code>application/json</code>.</p>

<markup
lang="java"
title="HOCON parser specified - no file type on source"
>Config config = Config.from(classpath("my-config")                                     <span class="conum" data-value="1" />
                                    .parser(HoconConfigParserBuilder.buildDefault())); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">the media type of the source `my-config`is unknown, so the config system cannot
choose a parser automatically.</li>
<li data-value="2">The config system will parse the resource <code>my-config</code> using the HOCON parser created
by the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/hocon/HoconConfigParserBuilder.html">HoconConfigParserBuilder</a>.
The <code>buildDefault()</code> method creates a config parser with default behavior.</li>
</ul>
<markup
lang="java"
title="Media type specified"
>Config config = Config.from(classpath("my-config")                    <span class="conum" data-value="1" />
                                    .mediaType("application/hocon")); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The media type of the source <code>my-config</code> is unknown, so the config system
cannot choose a parser automatically.</li>
<li data-value="2">Specifying the media type for the config source allows the config system to
use its matching algorithm with the available parsers to choose a parser for that
type.</li>
</ul>
<markup
lang="java"
title="HOCON parser specified because parser services disabled"
>Config config = Config.withSources(classpath("application.conf"))
        .disableParserServices()                                  <span class="conum" data-value="1" />
        .addParser(HoconConfigParserBuilder.buildDefault())       <span class="conum" data-value="2" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Disables automatic parser lookup and registration.</li>
<li data-value="2">Explicit registration of the HOCON parser is therefore required.</li>
</ul>
<markup
lang="java"
title="Customized HOCON parser"
>Config config = Config.withSources(classpath("application.conf"))
        .disableParserServices()
        .addParser(HoconConfigParserBuilder.create()              <span class="conum" data-value="1" />
                           .disableResolving()                    <span class="conum" data-value="2" />
                           .build())                              <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Creates new instance of the parser builder.</li>
<li data-value="2">Disables resolution of substitutions.
(See the <a id=""
title=""
target="_blank"
href="https://github.com/lightbend/config/blob/master/HOCON.md#substitutions">HOCON documentation</a>.)</li>
<li data-value="3">Builds a new instance of the HOCON config parser.</li>
</ul>
<p>You can also specify
<a id=""
title=""
target="_blank"
href="https://github.com/lightbend/config/blob/master/config/src/main/java/com/typesafe/config/ConfigResolveOptions.java"><code>ConfigResolveOptions</code></a>
using the <code>HoconConfigParserBuilder.resolveOptions</code> method.</p>

</div>
</div>
</div>

<h2 >Additional Config Source Types</h2>
<div class="section">

<h3 >Etcd</h3>
<div class="section">
<p>The Helidon Etcd config module supports reading configuration from a specified
 Etcd key.</p>


<h4 >Maven Coordinates</h4>
<div class="section">
<p>Add the following dependency to your project:</p>

<markup
lang="xml"
title="Config Etcd Dependency in <code>pom.xml</code>"
>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-config-etcd&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

<markup
lang="java"
title="Config Etcd Dependency in <code>module-info.java</code>"
>module myModule {
    requires io.helidon.config.etcd;
}</markup>

</div>

<h4 >Using the Etcd Config Source</h4>
<div class="section">
<p>To read configuration from an Etcd source, your application uses the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/etcd/EtcdConfigSourceBuilder.html"><code>EtcdConfigSourceBuilder</code></a>.</p>

<markup
lang="java"
title="Use Etcd config source"
>Config config = Config.from(
        EtcdConfigSourceBuilder                             <span class="conum" data-value="1" />
                .from(URI.create("http://my-etcd:2379"),    <span class="conum" data-value="2" />
                      "/config.yaml",                       <span class="conum" data-value="3" />
                      EtcdConfigSourceBuilder.EtcdApi.v3)); <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">Use the factory method <code>EtcdConfigSourceBuilder.from</code> to initialize the builder.</li>
<li data-value="2">Specify the Etcd endpoint address.</li>
<li data-value="3">Specify the Etcd key of the configuration document.</li>
<li data-value="4">Version of the Etcd API to use; <code>v2</code> and <code>v3</code> are supported.</li>
</ul>
<p>The config system will use the <router-link to="#Config-ModuleYaml" @click.native="this.scrollFix('#Config-ModuleYaml')">YAML parser</router-link> automatically in this example
because the file type of the key is <code>.yaml</code>.</p>

<p>The <code>EtcdConfigSourceBuilder</code> class extends
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/AbstractParsableConfigSource.Builder.html"><code>AbstractParsableConfigSource.Builder</code></a>
and so supports the usual settings on config sources.</p>

</div>

<h4 >Monitoring for Source Changes</h4>
<div class="section">
<p>The Etcd support includes a polling strategy designed for an etcd config source.</p>

<markup
lang="java"
title="Use Etcd config source"
>Config config = Config.from(
        EtcdConfigSourceBuilder
                .from(URI.create("http://my-etcd:2379"), "/config.yaml", EtcdApi.v3)
                .pollingStrategy(EtcdWatchPollingStrategy::new));                    <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Use the etcd-specific polling strategy.</li>
</ul>
</div>

<h4 >Loading Meta-configuration via Etcd</h4>
<div class="section">
<p>The config system can load information about config sources from
<a id=""
title=""
target="_blank"
href="06_advanced-configuration.html#Config-Advanced-Config-MetaConfig">meta-configuration</a>
rather than requiring your application to construct the builder. To read
meta-configuration from an Etcd source set the following required properties
for the source:</p>

<ul class="ulist">
<li>
<p><code>type</code> to <code>etcd</code>, or <code>class</code> to <code>io.helidon.config.etcd.EtcdConfigSourceBuilder</code></p>

</li>
<li>
<p><code>uri</code> (type <code>URI</code>) - Etcd endpoint URI.</p>

</li>
<li>
<p><code>key</code> (type <code>String</code>) - Etcd key that is associated with the configuration.</p>

</li>
<li>
<p><code>api</code> (type <code>EtcdConfigSourceBuilder.EtcdApi</code>, i.e. <code>v2</code> or <code>v3</code>) - Etcd API
version.</p>

</li>
</ul>
<p>Other optional <code>properties</code> are inherited from
 <code>AbstractParsableConfigSource.Builder</code>. (see
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/AbstractParsableConfigSource.Builder.html#init-io.helidon.config.Config-">javadoc</a>)</p>

<markup
lang="java"
title="Load Config from meta-configuration"
>Config config = Config.loadSourcesFrom(classpath("config-meta-etcd.yaml"));</markup>

<markup
lang="YAML"
title="Meta-config <code>config-meta-etcd.yaml</code> for the etcd source"
>sources:
    - type: "etcd"                                                 <span class="conum" data-value="1" />
      properties:
          uri: "http://my-etcd:2379"                               <span class="conum" data-value="2" />
          key: "/config.yaml"                                      <span class="conum" data-value="2" />
          api: "v3"                                                <span class="conum" data-value="2" />
          polling-strategy:
              class: "io.helidon.config.etcd.EtcdWatchPollingStrategy" <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1"><code>etcd</code> config source type</li>
<li data-value="2">Etcd source-specific (mandatory) <code>properties</code>: <code>uri</code>, <code>key</code> and <code>api</code>.</li>
<li data-value="3">Polling strategy <code>EtcdWatchPollingStrategy</code> is automatically initialized by
specified mandatory <code>properties</code>.</li>
</ul>
</div>
</div>

<h3 >git</h3>
<div class="section">
<p>The Helidon git config module supports reading configuration from a git
 repository.</p>


<h4 >Maven Coordinates</h4>
<div class="section">
<p>Add the following dependency to your project:</p>

<markup
lang="xml"
title="Config git Dependency in <code>pom.xml</code>"
>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.config&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-config-git&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

<markup
lang="java"
title="Config git Dependency in <code>module-info.java</code>"
>module myModule {
    requires io.helidon.config.git;
}</markup>

</div>

<h4 >Using the git Config Source</h4>
<div class="section">
<p>To read configuration from a git source, your application uses the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/git/GitConfigSourceBuilder.html"><code>GitConfigSourceBuilder</code></a>.</p>

<markup
lang="java"
title="Use git config source"
>Config config = Config.from(
        GitConfigSourceBuilder
                .from("application.conf")                                           <span class="conum" data-value="1" />
                    .uri(URI.create("https://github.com/okosatka/test-config.git")) <span class="conum" data-value="2" />
                    .directory(Paths.get("/config"))                                <span class="conum" data-value="3" />
                    .branch("dev"));                                                <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">Use the factory method <code>GitConfigSourceBuilder.from</code> to initialize the builder
with a mandatory  path to the configuration file.</li>
<li data-value="2">Specify the git repository URI.</li>
<li data-value="3">Specify a directory where the git repository is already cloned or it will be cloned.</li>
<li data-value="4">Specify the git branch.</li>
</ul>
<p>Note that the config system will use the <router-link to="#Config-ModuleHocon" @click.native="this.scrollFix('#Config-ModuleHocon')">HOCON parser</router-link> in
this example because the file type is <code>.conf</code>. Recall that for this to work the
HOCON config module must be on module-path or classpath.</p>

<p>The <code>GitConfigSourceBuilder</code> supports the usual source builder properties because
 it extends
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/AbstractParsableConfigSource.Builder.html"><code>AbstractParsableConfigSource.Builder</code></a>.</p>

</div>

<h4 >Monitoring for Source Changes</h4>
<div class="section">
<p>Your application can monitor changes to a configuration loaded from a git source
associating the <code>regular</code> built-in polling strategy with the source.</p>

<markup
lang="java"
title="Use of git config source with polling strategy"
>Config config = Config.from(
        GitConfigSourceBuilder
                .from("application.conf")
                .uri(URI.create("https://github.com/okosatka/test-config.git"))
                .pollingStrategy(PollingStrategies.regular(Duration.ofMinutes(5)))); <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Use <code>PollingStrategies.regular(Duration duration)</code> to monitor for config changes.</li>
</ul>
<p>You can also implemention your own polling strategy by implementing
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a>. See
the <a id=""
title=""
target="_blank"
href="-5_mutability-support.html">mutability support</a> and
<a id=""
title=""
target="_blank"
href="07_extensions.html#Config-SPI-PollingStrategy">polling strategy</a> discussions.</p>

</div>

<h4 >Loading Meta-configuration via git</h4>
<div class="section">
<p>The config system can load information about config sources from meta-configuration
rather than requiring your application to construct the builder. To read
meta-configuration from a git config source set the following properties for the source:</p>

<ul class="ulist">
<li>
<p><code>type</code> to <code>git</code> or <code>class</code> to <code>io.helidon.config.git.GitConfigSourceBuilder</code></p>

</li>
<li>
<p><code>path</code> (type <code>String</code>) - Relative path to the configuration file in repository.</p>

</li>
<li>
<p><code>uri</code> (type <code>URI</code>) - URI to the git repository.</p>

</li>
<li>
<p><code>directory</code> (type <code>Path</code>) - Directory with a cloned repository, by default
a temporary directory.</p>

</li>
<li>
<p><code>branch</code> (type <code>String</code>) - git branch (default is <code>master</code>).</p>

</li>
</ul>
<p>The meta-configuration must set the <code>path</code> and one of <code>uri</code> or <code>directory</code>.
Other optional <code>properties</code> are inherited from
 <code>AbstractParsableConfigSource.Builder</code> (see
 <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/AbstractParsableConfigSource.Builder.html#init-io.helidon.config.Config-">javadoc</a>)</p>

<markup
lang="java"
title="Load Config from meta-configuration"
>Config config = Config.loadSourcesFrom(classpath("config-meta-git.yaml"));</markup>

<markup
lang="YAML"
title="Meta-config <code>config-meta-git.yaml</code> for the git source"
>sources:
    - type: "git"                                            <span class="conum" data-value="1" />
      properties:
          path: "application.conf"                           <span class="conum" data-value="2" />
          uri: "https://github.com/okosatka/test-config.git" <span class="conum" data-value="2" />
          directory: "/config"                               <span class="conum" data-value="2" />
          branch: "dev"                                      <span class="conum" data-value="2" />
          polling-strategy:
              type: "regular"                                <span class="conum" data-value="3" />
              properties:
                  interval: "PT5M"                           <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1"><code>git</code> config source type</li>
<li data-value="2">git source-specific properties: <code>path</code>, <code>uri</code>, <code>directory</code> and <code>branch</code>.</li>
<li data-value="3">Polling strategy <code>regular</code> with an interval, in
<code>Duration</code> format, of 5 minutes in this example.</li>
</ul>
</div>
</div>
</div>
</doc-view>