<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Configuration Profiles</dt>
<dd slot="desc"><p>Configuration profiles provide a capability to prepare structure of configuration for each
environment in advance, and then simply switch between these structures using a system property
or an environment variable.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_profile_options">Profile options</h2>
<div class="section">
<p>To choose a configuration profile to use at runtime, you can use:</p>

<ol style="margin-left: 15px;">
<li>
A system property <code>config.profile</code>

</li>
<li>
An environment variable <code>HELIDON_CONFIG_PROFILE</code>

</li>
</ol>
<p>There are two ways to define a profile configuration:</p>

<ol style="margin-left: 15px;">
<li>
Use a config source with a <router-link to="#Profile-Source" @click.native="this.scrollFix('#Profile-Source')">profile specific name</router-link>

</li>
<li>
Use a <router-link to="#Profile-File" @click.native="this.scrollFix('#Profile-File')">profile file</router-link> defining all configuration sources

</li>
</ol>
<p>Configuration profiles can only be used when config is created using the <code>Config.create()</code> method without parameters. If you explicitly configure sources, profiles are ignored.</p>

</div>

<h2 id="Profile-Source">Profile Config Sources</h2>
<div class="section">
<p>If a profile is specified, config will load the profile-specific default configuration source
before the "main" source.</p>

<p>Let&#8217;s consider the selected profile is <code>dev</code>, and we have <code>yaml</code> configuration support on classpath;
config will look for the following sources (in this order):</p>

<ol style="margin-left: 15px;">
<li>
<code>application-dev.yaml</code> on file system

</li>
<li>
<code>application-dev.properties</code> on file system

</li>
<li>
<code>application-dev.yaml</code> on classpath

</li>
<li>
<code>application-dev.properties</code> on classpath

</li>
<li>
<code>application.yaml</code> on file system

</li>
<li>
<code>application.properties</code> on file system

</li>
<li>
<code>application.yaml</code> on classpath

</li>
<li>
<code>application.properties</code> on classpath

</li>
</ol>
</div>

<h2 id="Profile-File">Profile Files</h2>
<div class="section">
<p>If a profile is specified, config will look for a profile-specific "meta configuration".</p>

<p>Let&#8217;s consider the selected profile is <code>dev</code>, and we have <code>yaml</code> configuration support on classpath;
config will look for the following profiles (in this order):</p>

<ol style="margin-left: 15px;">
<li>
<code>config-profile-dev.yaml</code> on file system

</li>
<li>
<code>config-profile-dev.properties</code> on file system

</li>
<li>
<code>config-profile-dev.yaml</code> on classpath

</li>
<li>
<code>config-profile-dev.properties</code> on classpath

</li>
</ol>
<p>If any of these files is discovered, it would be used to set up the configuration. In case none is found,
 the config falls back to <router-link to="#Profile Config Sources" @click.native="this.scrollFix('#Profile Config Sources')">profile specific config sources</router-link>.</p>

<p>The structure of the file is described below in <router-link to="#Profile File Format" @click.native="this.scrollFix('#Profile File Format')">profile file format</router-link>.</p>

<p>In case you need to customize the location of the profile file, you can use the system property
<code>io.helidon.config.meta-config</code>. For example if it is configured to <code>config/profile.yaml</code>,
config looks for file <code>config/profile-dev.yaml</code> when <code>dev</code> profile is configured.</p>


<h3 id="Config-Profile-Format">Profile File Format</h3>
<div class="section">
<p>Configuration profile provides similar options to the configuration builder.
The profile file must contain at least the list of sources from which configuration can be loaded.</p>

<p>The root <code>sources</code> property contains an array (ordered) of objects defining each config source to
be used.
Each element of the array must contain at least the <code>type</code> property, determining the
config source type (such as <code>system-properties</code>, <code>file</code>). It may also contain a <code>properties</code>
property with additional configuration of the config source.</p>

<p>An example development profile using "inlined" configuration:</p>

<markup
lang="yaml"
title="Config profile <code>config-profile-dev.yaml</code>"
>sources:
  - type: "inlined"
    properties:
      app.greeting: "Hello World"</markup>

<p>An example of a profile using environment variables, system properties, classpath, and file configuration:</p>

<markup
lang="yaml"
title="Config profile <code>config-profile-prod.yaml</code>"
>sources:
  - type: "environment-variables"
  - type: "system-properties"
  - type: "file"
    properties:
      path: "config/config-prod.yaml"
  - type: "classpath"
    properties:
      resource: "application.yaml"</markup>


<h4 id="_built_in_types">Built-in Types</h4>
<div class="section">
<p>The config system supports these built-in types:</p>

<div class="block-title"><span>Built-in Types</span></div>
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
<th>Type</th>
<th>Use</th>
<th>Related <code>ConfigSources</code> Method</th>
<th>Required Properties</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>system-properties</code></td>
<td class="">System properties are a config source</td>
<td class=""><code>ConfigSources.systemProperties()</code></td>
<td class="">n/a</td>
</tr>
<tr>
<td class=""><code>environment-variables</code></td>
<td class="">Environment variables are a config source</td>
<td class=""><code>ConfigSources.environmentVariables()</code></td>
<td class="">n/a</td>
</tr>
<tr>
<td class=""><code>classpath</code></td>
<td class="">Specified resource is used as a config source</td>
<td class=""><code>ConfigSources.classpath(String)</code></td>
<td class=""><code>resource</code> - path to the resource to load</td>
</tr>
<tr>
<td class=""><code>file</code></td>
<td class="">Specified file is used as a config source</td>
<td class=""><code>ConfigSources.file(Path)</code></td>
<td class=""><code>path</code> - path to the file to load</td>
</tr>
<tr>
<td class=""><code>directory</code></td>
<td class="">Each file in directory used as config entry, with key = file name and value = file contents</td>
<td class=""><code>ConfigSources.directory(String)</code></td>
<td class=""><code>path</code> - path to the directory to use</td>
</tr>
<tr>
<td class=""><code>url</code></td>
<td class="">Specified URL is read as a config source</td>
<td class=""><code>ConfigSources.url(URL)</code></td>
<td class=""><code>url</code> - URL from which to load the config</td>
</tr>
<tr>
<td class=""><code>inlined</code></td>
<td class="">The whole configuration tree under <code>properties</code> is added as a configuration source (excluding the <code>properties</code> node)</td>
<td class="">n/a</td>
<td class="">n/a</td>
</tr>
<tr>
<td class=""><code>prefixed</code></td>
<td class="">Associated config source is loaded with the specified prefix</td>
<td class=""><code>ConfigSources.prefixed(String,Supplier)</code></td>
<td class=""><doc-view>
<ul class="ulist">
<li>
<p><code>key</code> - key of config element in associated source to load</p>

</li>
<li>
<p><code>type</code> - associated config source specification</p>

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
<p>Except for the <code>system-properties</code> and <code>environment-variables</code> types, the profile
<code>properties</code> section for a source can also specify any optional settings for the
corresponding config source type. The JavaDoc for the related config source
type builders lists the supported properties for each type. (For example,
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/internal/FileConfigSource.FileBuilder.html"><code>FileConfigSource.FileBuilder</code></a>.)</p>

<p>Here is an example profile in YAML format. Note how the <code>properties</code> sections
are at the same level as the <code>type</code> or <code>class</code> within a <code>sources</code> array entry.</p>

<markup
lang="yaml"
title="Profile <code>config-profile.yaml</code> illustrating all built-in sources available on the classpath"
>caching.enabled: false
sources:
  - type: "system-properties"
  - type: "environment-variables"
  - type: "directory"
    properties:
      path: "conf/secrets"
      media-type-mapping:
        yaml: "application/x-yaml"
        password: "application/base64"
      polling-strategy:
        type: "regular"
        properties:
          interval: "PT15S"
  - type: "url"
    properties:
      url: "http://config-service/my-config"
      media-type: "application/hocon"
      optional: true
      retry-policy:
        type: "repeat"
        properties:
          retries: 3
  - type: "file"
    properties:
      optional: true
      path: "conf/env.yaml"
      change-watcher:
        type: "file"
        properties:
          delay-millis: 5000
  - type: "prefixed"
    properties:
      key: "app"
      type: "classpath"
      properties:
        resource: "app.conf"
  - type: "classpath"
    properties:
      resource: "application.conf"</markup>

<p>Note that the example shows how your profile can configure optional features such as polling
strategies and retry policies for config sources.</p>

</div>

<h4 id="_support_for_custom_sources">Support for Custom Sources</h4>
<div class="section">
<p>Profiles can be used to set up custom config sources as well as the built-in ones described above.</p>

<p>Implement the <code>ConfigSourceProvider</code></p>

<markup
lang="java"

>public class MyConfigSourceProvider implements ConfigSourceProvider {
    private static final String TYPE = "my-type";

    @Override
    public boolean supports(String type) {
        return TYPE.equals(type);
    }

    @Override
    public ConfigSource create(String type, Config metaConfig) {
        // as we only support one in this implementation, we can just return it
        return MyConfigSource.create(metaConfig);
    }

    @Override
    public Set&lt;String&gt; supported() {
        return Collections.singleton(TYPE);
    }
}</markup>

<p>Register it as a java service loader service</p>

<markup

title="File <code>META-INF/services/io.helidon.config.spi.ConfigSourceProvider</code>"
>io.helidon.examples.MyConfigSourceProvider</markup>

<p>And in <code>module-info.java</code> if using JPMS:</p>

<markup
lang="java"
title="File <code>module-info.java</code>"
>provides io.helidon.config.spi.ConfigSourceProvider with io.helidon.examples.MyConfigSourceProvider</markup>

<p>Now you can use the following profile:</p>

<markup
lang="yaml"

>sources:
  - type: "system-properties"
  - type: "environment-variables"
  - type: "my-type"
    properties:
        my-property: "some-value"</markup>

<p>Note that it is the <code>io.helidon.config.AbstractConfigSource</code> class that provides support for
polling strategies, change watchers, and retry policies. If you create custom config sources that
should also offer this support be sure they extend <code>AbstractConfigSource</code> and implement appropriate
SPI interfaces (such as <code>io.helidon.config.spi.WatchableSource</code>) to support such features.</p>

</div>

<h4 id="_support_for_custom_polling_strategies_change_watchers_and_retry_policies">Support for Custom Polling Strategies, Change Watchers, and Retry Policies</h4>
<div class="section">
<p>Your config profile can include the set-up for polling strategies, change watchers, and retry
policies if the config source supports them. Declare them in a way similar to
how you declare the config sources themselves: by <code>type</code> and with
accompanying <code>properties</code>.</p>

<div class="block-title"><span>Config Profile Support for Built-in Polling Strategies</span></div>
<div class="table__overflow elevation-1  ">
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
<td class=""><code>regular</code></td>
<td class="">Periodic polling - See <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/PollingStrategies.html#regular-java.time.Duration-"><code>PollingStrategies.regular</code></a> method</td>
<td class=""><code>interval</code> (<code>Duration</code>) - indicating how often to poll; e.g., <code>PT15S</code> represents 15 seconds</td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Config Profile Support for Built-in Change Watchers</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Type</th>
<th>Usage</th>
<th>Properties</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>file</code></td>
<td class="">Filesystem monitoring - See <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/PollingStrategies.html#watch-java.nio.file.Path-"><code>PollingStrategies.watch</code></a> method</td>
<td class=""><code>initial-delay-millis</code> - delay between the start of the watcher and first check for changes</td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Config Profile Support for Built-in Retry Policies</span></div>
<div class="table__overflow elevation-1  ">
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
<td class=""><code>repeat</code></td>
<td class="">Regularly-scheduled - see <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/configRetryPolicies.html#repeat-int-"><code>RetryPolicies.repeat</code></a>.</td>
<td class=""><doc-view>
<p><code>retries</code> (<code>int</code>) - number of retries to perform<br></p>

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
<p>To specify a custom polling strategy or custom retry policy, implement the interface
(<code>io.helidon.config.spi.PollingStrategy</code>, <code>io.helidon.config.spi.ChangeWatcher</code>,
 or <code>io.helidon.config.spi.RetryPolicy</code>), and then implement the provider interface
(<code>io.helidon.config.spi.PollingStrategyProvider</code>, <code>io.helidon.config.spi.ChangeWatcherProvider</code>, or
<code>io.helidon.config.spi.RetryPolicyProvider</code>) to enable your custom implementations for
profiles.
You can then use any custom properties - these are provided as a <code>Config</code> instance to
the <code>create</code> method of the Provider implementation.</p>

<p>See <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/RetryPolicy.html"><code>RetryPolicy</code></a>,
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/RetryPolicy.html"><code>ChangeWatcher</code></a>, and
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a> JavaDoc
sections.</p>

</div>
</div>
</div>
</doc-view>