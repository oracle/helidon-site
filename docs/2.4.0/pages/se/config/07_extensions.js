<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Extensions</dt>
<dd slot="desc"><p>Developer-provided extensions influence how the config system behaves.</p>

<p>The <router-link to="/se/config/01_introduction">config system introduction</router-link> explains the design of the config
system and how its parts work together to read and parse config data, convert it
to Java types, fine-tune the look-up of config data, and reload and
reprocess data when it changes. <em>Config extensions</em> provided by the application
modify and expand the way the config system performs these steps.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>Each config extension implements one of the interfaces defined in the Configuration SPI:</p>

<ul class="ulist">
<li>
<p><code>ConfigSource</code> - Loads raw configuration data from a given type of source and delegates to a <code>ConfigParser</code>, producing the in-memory data structure which represents the loaded and parsed configuration.</p>

</li>
<li>
<p><code>ConfigParser</code> - Translates configuration content in a given format into the corresponding internal config data structures.</p>

</li>
<li>
<p><code>OverrideSource</code> - Provides key/value pairs which override config values loaded from any <code>ConfigSource</code>, given the key and <em>ignoring</em> the original value.</p>

</li>
<li>
<p><code>ConfigFilter</code> - Transforms config <code>String</code> values returned from any value-type
<code>Config</code> node, given the key <em>and</em> the original value.</p>

</li>
<li>
<p><code>ConfigMapperProvider</code> - Provides one or more <code>ConfigMapper</code>s each of which converts a <code>Config</code> object tree to a Java type specific to the application.</p>

</li>
<li>
<p><code>PollingStrategy</code> - Implements a custom technique to trigger polling of underlying sources for changes</p>

</li>
<li>
<p><code>ChangeWatcher</code> - Implements a custom technique to watch underlying sources for changes and notifying the config system of such a change</p>

</li>
</ul>
<p>The extension mechanism of Config can also use Java <code>ServiceLoader</code>.
For this purpose, you implement providers that serve as factories for your implementation of an extension.
This is to support config profiles even for custom extensions.
Service providers:</p>

<ul class="ulist">
<li>
<p><code>ConfigMapperProvider</code> - support for config mappers, automatically discovered by the config system</p>

</li>
<li>
<p><code>ConfigFilter</code> - support for config filters, automatically discovered by the config system</p>

</li>
<li>
<p><code>ConfigParser</code> - support for config parsers, automatically discovered by the config system</p>

</li>
<li>
<p><code>ConfigSourceProvider</code> - support for named config sources, configurable through profiles</p>

</li>
<li>
<p><code>ChangeWatcherProvider</code> - support for named change watchers, configurable through profiles</p>

</li>
<li>
<p><code>OverrideSourceProvider</code> - support for named override sources, configurable through profiles</p>

</li>
<li>
<p><code>PollingStrategyProvider</code> - support for named polling strategies, configurable through profiles</p>

</li>
<li>
<p><code>RetryPolicyProvider</code> - support for retry policies, configurable through profiles</p>

</li>
</ul>
<p>The config system itself implements several of these SPIs, as noted in the sections below.</p>

</div>

<h2 id="_setting_up_an_extension">Setting up an extension</h2>
<div class="section">
<p>You can configure a custom extension in two ways:</p>

<ol style="margin-left: 15px;">
<li>
Manual configuration with builder

</li>
<li>
Automatic configuration using a Java service loader

</li>
</ol>

<h3 id="_manual_configuration_with_builder">Manual configuration with builder</h3>
<div class="section">
<p>The following example shows configuration of all possible extensions with <code>Config</code> (all custom extension have a name prefix <code>My</code>):</p>

<markup
lang="java"

>Config config = Config.builder()
                .addSource(FileConfigSource.builder()
                                   .changeWatcher(MyChangeWatcher.create())
                                   .pollingStrategy(MyPollingStrategy.create())
                                   .parser(MyConfigParser.create())
                                   .retryPolicy(MyRetryPolicy.create()))
                .addSource(MySource.create())
                .addFilter(MyFilter.create())
                .overrides(MyOverrides.create())
                .build()</markup>

</div>

<h3 id="_automatic_configuration_using_a_service_loader">Automatic configuration using a service loader</h3>
<div class="section">
<p>The following extensions are loaded using a service loader for any configuration instance, and do not require an explicit setup:</p>

<ul class="ulist">
<li>
<p><code>ConfigParser</code> - each config parser on the classpath that implements <code>ConfigParserProvider</code> as a Java service loader service</p>

</li>
<li>
<p><code>ConfigFilter</code> - each filter on the classpath that implements <code>ConfigFilter</code> as a Java service loader service</p>

</li>
</ul>
<p>Other extensions are only used from Java service loader when you use config profiles.
Mapping is done through the type configured in config profile, and the type defined by the extension provider interface.
For example for config sources, the interface defines the following methods (only subset shown):</p>

<markup
lang="java"

>boolean supports(String type);
ConfigSource create(String type, Config metaConfig);</markup>

<p>Considering the following meta configuration (or config profile):</p>

<markup
lang="yaml"

>sources:
  - type: "my-type"
    properties:
      my-config: "configuration"</markup>

<p>The config system would iterate through all <code>ConfigSourceProvider</code> implementations found through Java <code>ServiceLoader</code> based on their priority.
First provider that returns <code>true</code> when <code>supports("my-type")</code> is called would be used, and an instance of a <code>ConfigSource</code> created using <code>create("my-type", config)</code>, where <code>config</code> is located on the node of <code>properties</code> from config profile.</p>

</div>

<h3 id="priority-info">About Priority</h3>
<div class="section">
<p>The config system invokes extensions of a given type in priority order.
Developers can express the relative importance of an extension by annotating the service implementation class with
<code>@javax.annotation.Priority</code>.
The default value is 100. A <em>lower</em> priority value represents <em>greater</em> importance.</p>

</div>
</div>

<h2 id="Config-SPI-ConfigSource">ConfigSource SPI</h2>
<div class="section">
<p>The config system includes built-in support for several types of sources
(for example, Java <code>String</code>, <code>Readable</code>, <code>Properties</code>, and <code>Map</code>
objects - see <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/ConfigSources.html"><code>ConfigSources</code></a>).
Implement a <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/ConfigSource.html"><code>ConfigSource</code></a> to
load raw configuration data from a type of source that the config system does
not already support.</p>


<div class="block-title"><span>ConfigSource SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ConfigSource.png" alt="ConfigSource SPI" />
</v-card-text>
</v-card>

<p>For config sources that work directly with config nodes, the followin API is available.
These interfaces have an implementation provided by Helidon.
The interfaces <code>ConfigNode</code>, <code>ObjectNode</code>, <code>ValueNode</code> and
<code>ListNode</code> represent the in-memory data structure for loaded and parsed configuration data.</p>


<div class="block-title"><span>ConfigNode API</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-node.png" alt="ConfigNode API" />
</v-card-text>
</v-card>

<p>For config sources that work return data (<code>NodeConfigSource</code> and <code>ParsableConfigSource</code>) a
<code>Content</code> must be returned that describes the loaded data.
The following diagram depicts the <code>Content</code> API.</p>


<div class="block-title"><span>Content API</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-content.png" alt="Content API" />
</v-card-text>
</v-card>

<p>Some of the methods provided are not always mandatory, yet they are part of the APIs to simplify the overall class structure:</p>

<ul class="ulist">
<li>
<p>ConfigContent.stamp() - this method is used by <code>PollingStrategy</code> to determine if content has been changed.
This can be always
<code>empty</code> for sources, that do not implement <code>PollableSource</code></p>

</li>
<li>
<p>ConfigParser.Content.charset() - this can return any <code>Charset</code> for media types that are binary</p>

</li>
<li>
<p>ConfigParser.Content.mediaType() - this can be used to override media type (that would otherwise be "guessed" from the underlying source)</p>

</li>
<li>
<p>ParsableSource.parser() - this can be used to override parser (that would otherwise be based on <code>mediaType</code>)</p>

</li>
<li>
<p>ParsableSource.mediaType() - return the configured or "guessed" media type of this source, see
<code>io.helidon.common.media.type.MediaTypes</code>, if not returned, media type must be present on <code>Content</code>, or provided through media type mapping</p>

</li>
</ul>
</div>

<h2 id="Config-SPI-ConfigParser">ConfigParser SPI</h2>
<div class="section">
<p>The parsing step converts config data in some format into the corresponding in-memory representation of config <code>ObjectNode</code>s.
The config system can already parse several data formats (for example Java <code>Properties</code>, YAML, and HOCON).
Implement the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/ConfigParser.html"><code>ConfigParser</code></a> SPI to allow the config system to handle additional formats.</p>


<div class="block-title"><span>ConfigParser SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ConfigParser.png" alt="ConfigParser SPI" />
</v-card-text>
</v-card>

<p>The <code>ConfigParser.Content</code> interface defines operations on the content that is to be parsed by a <code>ConfigParser</code> implementation:</p>

<ul class="ulist">
<li>
<p><code>mediaType()</code> - Reports the media type of the content (if it is to override media type defined on the config source)</p>

</li>
<li>
<p><code>data()</code> - Provides the <code>InputStream</code> with config source data</p>

</li>
<li>
<p><code>charset()</code> - Defines the charset to use to parse the stream in case this is a text based media type, ignored by parsers of binary content</p>

</li>
</ul>
<p>The application can register parsers for a builder by invoking <code>Config.Builder#addParser(ConfigParser)</code>.
The config system also uses the Java service loader mechanism to load automatically, for all builders, any parsers listed in the
<code>META-INF/services/io.helidon.config.spi.ConfigParser</code> resource on the runtime classpath.
Prevent autoloading of parsers for a given builder by invoking <code>Config.Builder#disableParserServices()</code>.</p>

<p><code>ConfigParser</code> accepts <code>@Priority</code>.
See <router-link to="#priority-info" @click.native="this.scrollFix('#priority-info')">About Priority</router-link>.</p>

<markup
lang="java"
title="Example custom parser implementation listed in <code>META-INF/services/io.helidon.config.spi.ConfigParser</code>"
>my.module.MyConfigParser</markup>

<markup
lang="java"
title="Example custom parser definition in <code>module-info.java</code>"
>module my.module {
    requires transitive io.helidon.config;
    provides io.helidon.config.spi.ConfigParser with myModule.MyConfigParser;
}</markup>

</div>

<h2 id="Config-SPI-OverrideSource">OverrideSource SPI</h2>
<div class="section">
<p>When the application retrieves a configuration value the config system first uses
the relevant config sources and filters. It then applies any <em>overrides</em> the
application has provided. Each override has:</p>

<ul class="ulist">
<li>
<p>a <code>Predicate&lt;Config.Key&gt;</code> (a boolean-valued function that operates on
the config key), and</p>

</li>
<li>
<p>a replacement, <em>overriding</em>, <code>String</code> value the config system should use if the predicate evaluates to true.</p>

</li>
</ul>
<p>To furnish overrides to the config system, implement the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/OverrideSource.html"><code>OverrideSource</code></a> SPI one or more times and pass instances of those implementations to the config builder&#8217;s
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/Config.Builder.html#overrides-java.util.function.Supplier-"><code>overrides</code></a>
method.
The config system will apply the overrides returned from each
<code>OverrideSource</code> to each config key requested from a <code>Config</code> that is based on that <code>Config.Builder</code>.</p>

<p>To support custom override sources in config profiles, also implement the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/OverrideSourceProvider.html"><code>OverrideSourceProvider</code></a> service loader SPI</p>


<div class="block-title"><span>OverrideSource SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-OverrideSource.png" alt="OverrideSource SPI" />
</v-card-text>
</v-card>

<p>Note that override sources can also implement <code>PollableSource</code>, and <code>WatchableSource</code> to add change support.</p>

</div>

<h2 id="Config-SPI-ConfigFilter">ConfigFilter SPI</h2>
<div class="section">
<p>Before returning a <code>String</code> from <code>Config.value()</code> the config system applies any <em>filters</em> set up on the <code>Config.Builder</code> used to create the config tree that contains the config node of interest.
The application provides filters as implementations of the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/ConfigFilter.html"><code>ConfigFilter</code></a> interface.
Each filter is a function which accepts a <code>Config.Key</code> and an input <code>String</code> value and returns a <code>String</code> value the config system should use for that key going forward.
The filter can return the original value or return some other value.</p>

<p>The application registers filters and filter providers by passing <code>ConfigFilter</code>
implementations to one of the config builder
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/Config.Builder.html"><code>addFilter</code> methods</a>. The config
system also uses the Java service loader mechanism to load
additional filters automatically, for all builders, using
the service interface described in the following table. Prevent a given
builder from using the auto-loaded filters by invoking the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/Config.Builder.html#disableFilterServices--"><code>disableFilterServices</code></a>
method.</p>

<div class="block-title"><span>Config SPI Interfaces for Filtering</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Interface</th>
<th>Method</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/ConfigFilter.html"><code>ConfigFilter</code></a></td><td class="">Accepts <code>@Priority</code>. See <router-link to="#priority-info" @click.native="this.scrollFix('#priority-info')">About Priority</router-link>.</td>
<td class=""><code>String apply(Config.Key key, String stringValue);</code></td>
<td class="">Accepts a key and the corresponding <code>String</code> value and
returns the <code>String</code> which the config system should use for that key.</td>
</tr>
</tbody>
</table>
</div>

<h3 id="_initializing_filters">Initializing Filters</h3>
<div class="section">
<p>The <code>ConfigFilter</code> JavaDoc describes multiple methods for adding filters to a
<code>Config.Builder</code>. Some accept a <code>ConfigFilter</code> directly and some accept a provider
function which, when passed a <code>Config</code> instance, returns a <code>ConfigFilter</code>.</p>

<p><strong><em>Neither a <code>ConfigFilter</code> nor a provider function which furnishes one should
access the <code>Config</code> instance passed to the provider function.</em></strong></p>

<p>Instead, implement the <code>ConfigFilter.init(Config)</code> method on the filter. The config
system invokes the filters' <code>init</code> methods according to the filters' <code>@Priority</code>
order.</p>

<p>Recall that whenever any code invokes <code>Config.get</code>, the <code>Config</code> instance
invokes the <code>apply</code> method of <em>all</em> registered filters. By the time the application
retrieves config this way the config system will have run the <code>init</code> method on all
the filters. <em>But note that when a filter&#8217;s <code>init</code> method invokes <code>Config.get</code>, the
<code>init</code> methods of lower-priority filters will not yet have run.</em></p>


<div class="block-title"><span>ConfigFilter SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ConfigFilter.png" alt="ConfigFilter SPI" />
</v-card-text>
</v-card>

</div>
</div>

<h2 id="Config-SPI-ConfigMapperProvider">ConfigMapperProvider SPI</h2>
<div class="section">
<p>The config system provides built-in mappings from <code>String</code> values to various Java
types. (See <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/ConfigMappers.html"><code>ConfigMappers</code></a>.)</p>

<p>To handle mappings to other types the application can register
custom mappers with the config system by implementing the
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/ConfigMapperProvider.html"><code>ConfigMapperProvider</code></a>
 SPI.</p>

<p>Such providers return a map, with entries in which:</p>

<ul class="ulist">
<li>
<p>the key is the Java type (a <code>Class</code> object) the mapper produces, and</p>

</li>
<li>
<p>the value is a <code>ConfigMapper</code> that converts the config in-memory
data structure into the type in the key.</p>

</li>
</ul>
<p>The provider may also implement other methods for finer tuned conversion mechanisms:</p>

<ul class="ulist">
<li>
<p><code>genericTypeMappers()</code> returns a map with entries for specific <code>GenericType</code> conversions,
for example when the provider supports only mapping for <code>GenericType&lt;Map&lt;String, Integer&gt;&gt;</code></p>

</li>
<li>
<p><code>mapper(Class)</code> returns a conversion function (optional) that converts a config node
to the typed instance (if supported by this provider)</p>

</li>
<li>
<p><code>mapper(GenericType)</code> returns a conversion function (optional) that coverts a config node
to the GenericType (if supported by this provider) - for example in case this provider supports
any Map&lt;String, ?&gt; type, such as <code>Map&lt;String, Integer&gt;</code> and <code>Map&lt;String, Double&gt;</code></p>

</li>
</ul>
<p>The config conversion system works as follows:</p>

<p>For <code>Config.as(Class)</code>:</p>

<ol style="margin-left: 15px;">
<li>
Check whether a conversion function exists for the class requested (from method <code>mappers()</code>).

</li>
<li>
Check whether a conversion function is provided by any <code>ConfigMapperProvider</code> with method <code>mapper(Class)</code>.

</li>
<li>
Check whether a conversion function exists for a generic type for the class requested (from method <code>genericTypeMappers</code>).

</li>
<li>
Check whether a conversion function is provided by any <code>ConfigMapperProvider</code> with method <code>mapper(GenericType)</code> for
a generic type for the class requested.

</li>
</ol>
<p>For <code>Config.as(GenericType)</code> - the first two steps are skipped.</p>

<p>The config system also uses the Java <code>ServiceLoader</code> mechanism to load automatically,
for all builders, any mappers returned by the providers listed in the
<code>META-INF/services/io.helidon.config.spi.ConfigMapperProvider</code> resource on the
runtime classpath. The application can prevent autoloading of mappers for a
given builder by invoking <code>Config.Builder#disableMapperServices()</code>. Note
that the built-in mappers described in <code>ConfigMappers</code> still operate.</p>

<p>Mapper providers accept <code>@Priority</code>. See <router-link to="#priority-info" @click.native="this.scrollFix('#priority-info')">About Priority</router-link>.</p>


<div class="block-title"><span>ConfigMapperProvider SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ConfigMapperProvider.png" alt="ConfigMapperProvider SPI" />
</v-card-text>
</v-card>

<p>A mapper provider can specify a <code>@javax.annotation.Priority</code>.
If no priority is explicitly assigned, the value of <code>100</code> is assumed.</p>

<markup
lang="java"
title="Reference custom mapper provider implementation in <code>META-INF/services/io.helidon.config.spi.ConfigMapperProvider</code>"
>my.module.MyConfigMapperProvider</markup>

<markup
lang="java"
title="Reference custom mapper provider implementation in <code>module-info.java</code>"
>module my.module {
    requires transitive io.helidon.config;
    provides io.helidon.config.spi.ConfigMapperProvider with my.module.MyConfigMapperProvider;
}</markup>

</div>

<h2 id="Config-SPI-PollingStrategy">Change support SPI</h2>
<div class="section">
<p>Once it loads a <code>Config</code> tree from <code>ConfigSource</code>s the config system does not itself change the in-memory <code>Config</code> tree.
Even so, the underlying data available via the tree&#8217;s <code>ConfigSource</code>s can change.
Implementations of <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a>
may trigger regular check whether a source has new data.
Implementation of <a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/ChangeWatcher.html"><code>ChangeWatcher</code></a>
may watch the underlying source for changes and trigger an update.</p>


<h3 id="_pollingstrategy_spi">PollingStrategy SPI</h3>
<div class="section">
<p>An implementation of <code>PollingStrategy</code> gets an instance to poll, and triggers its <code>poll</code>
method.
The result of <code>poll</code> method may be used to update the polling strategy schedule.</p>

<p>The approach of checking for changes is part of the config system, and the <code>PollingStrategy</code> does not need to be concerned with it.
This is based on the source <code>stamp</code> as defined in <code>ConfigContent</code>
and used in <code>PollableSource.isModified(Object)</code> methods.</p>

<p>If a more sophisticated solution is needed, you may need to implement a <code>ChangeWatcher</code> instead.</p>

<p>The config system offers polling strategy for periodic time-based checks.
Often an application can create a config source simply by using one of the methods on <code>ConfigSources</code> (for example,
<code>ConfigSources#file(path)</code> to get a builder and then invoke <code>pollingStrategy</code>
passing a polling strategy.
But the application can implement its own <code>PollingStrategy</code> and set it on the config source builder instead.</p>


<div class="block-title"><span>PollingStrategy SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-PollingStrategy.png" alt="PollingStrategy SPI" />
</v-card-text>
</v-card>

<p>To support polling strategies that can be configured in config profile, also implement the <code>PollingStrategyProvider</code> Java service loader SPI.</p>

</div>

<h3 id="_changewatcher_spi">ChangeWatcher SPI</h3>
<div class="section">
<p>An implementation of <code>ChangeWatcher</code> gets the underlying source information and a change listener.
The "watcher" then watches for changes of the source and notifies the listener when a change occurs.</p>

<p>This is designed to support sources that can react on changes (such as file system).
When a polling mechanism is needed, please check <code>PollingStrategy</code> above.</p>

<p>The config system offers a change watcher for any <code>Path</code> based config source (such as <code>FileConfigSource</code>) and for the <code>etcd</code> config source.</p>

<p>To use a change watcher, simply create a config source using its builder and register the change watcher on the builder (the config source must support appropriate type of change watchers).</p>


<div class="block-title"><span>ChangeWatcher SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ChangeWatcher.png" alt="ChangeWatcher SPI" />
</v-card-text>
</v-card>

<p>To support change watchers that can be configured in config profile, also implement the <code>ChangeWatcherProvider</code> Java service loader SPI.</p>

</div>
</div>

<h2 id="Config-SPI-RetryPolicy">RetryPolicy SPI</h2>
<div class="section">
<p>The builder for each <code>ConfigSource</code> and <code>OverrideSource</code> accepts a
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/spi/RetryPolicy.html"><code>RetryPolicy</code></a>
governing if and how the source should deal with failures loading the underlying
data.</p>

<p>A retry policy accepts a function, the invocation of which the policy will
govern according to its own implementation.
Applications can use the predefined policies in
<a id="" title="" target="_blank" href="./apidocs/io.helidon.config/io/helidon/config/RetryPolicies.html"><code>RetryPolicies</code></a>, such as
<code>RetryPolicies.justCall</code> which simply invokes the function without any retry.
That class also exposes a builder for constructing a time-based retry policy,
with several parameters:</p>

<div class="block-title"><span>Parameters Controlling Built-in <code>RetryPolicy</code></span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 33.333%;">
<col style="width: 33.333%;">
<col style="width: 33.333%;">
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Usage</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>delay</code></td>
<td class="">Initial delay between calls to the function</td>
<td class="">200 ms</td>
</tr>
<tr>
<td class=""><code>delayFactor</code></td>
<td class="">Multiplier applied to <code>delay</code> on each successive call</td>
<td class="">2</td>
</tr>
<tr>
<td class=""><code>callTimeout</code></td>
<td class="">Time limit for each individual call of the function</td>
<td class="">500 ms</td>
</tr>
<tr>
<td class=""><code>overallTimeout</code></td>
<td class="">Limit for the total elapsed time attempting to
call the function successfully, including delays between calls</td>
<td class="">2 s</td>
</tr>
</tbody>
</table>
</div>
<p>The actual delay between function call starts as <code>delay</code> and changes by the factor
<code>delayFactor</code> on each successive attempt.</p>

<p>Note that the job of each retry policy is to call the provided function
successfully. As such, the policy must perform the first attempt as well
as any retries.</p>


<div class="block-title"><span>RetryPolicy SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-RetryPolicy.png" alt="RetryPolicy SPI" />
</v-card-text>
</v-card>

<p>The application can try to cancel the overall execution of a <code>RetryPolicy</code> by invoking the <code>RetryPolicy#cancel(boolean mayInterruptIfRunning)</code> method.
Ideally the retry policy implementation should be able to abort the execution of the retry policy, even while a function call is in progress, but the policy must respond to cancels between function calls.
In either case <code>cancel</code> returns <code>true</code> if the retry was aborted without a successful call to the function, and <code>false</code> otherwise, including if the function call had already completed successfully or had previously been successfully canceled.</p>

<p>To support retry policies in config profiles, also implement the Java service loader SPI
<code>RetryPolicyProvider</code>.</p>

</div>
</doc-view>