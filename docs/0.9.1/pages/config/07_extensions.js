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

<p>The <a id=""
title=""
target="_blank"
href="#/config/01_introduction">config system introduction</a> explains the design of the config
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

<h2 >Introduction</h2>
<div class="section">
<p>Each config extension implements one of the interfaces defined in the Configuration SPI:</p>

<ul class="ulist">
<li>
<p><code>ConfigSource</code> - Loads raw configuration data from a given type of source and
delegates to a <code>ConfigParser</code>, producing the in-memory data structure which
represents the loaded and parsed configuration.</p>

</li>
<li>
<p><code>ConfigParser</code> - Translates configuration content in a given format into the
corresponding internal config data structures.</p>

</li>
<li>
<p><code>OverrideSource</code> - Provides key/value pairs which override config values loaded
from any <code>ConfigSource</code>, given the key and <em>ignoring</em> the original value.</p>

</li>
<li>
<p><code>ConfigFilter</code> - Transforms config <code>String</code> values returned from any value-type
<code>Config</code> node, given the key <em>and</em> the original value.</p>

</li>
<li>
<p><code>ConfigMapperProvider</code> - Provides one or more <code>ConfigMapper</code>s each of which
converts a <code>Config</code> object tree to a Java type specific to the application.</p>

</li>
<li>
<p><code>PollingStrategy</code> - Implements a custom technique for notifying the Config system
when the data underlying a <code>ConfigSource</code> or <code>OverrideSource</code> has changed.</p>

</li>
</ul>
<p>The config system itself implements several of these SPIs, as noted in the sections
below.</p>


<h3 >About Priority</h3>
<div class="section">
<p>The config system invokes extensions of a given type in priority order.
Developers can express the relative
importance of an extension by annotating the implementation class with
<code>@javax.annotation.Priority</code>. The default value is 100.
A <em>lower</em> priority value represents <em>greater</em> importance. The sections below for
each interface tell which SPIs support <code>@Priority</code>.</p>

</div>
</div>

<h2  id="Config-SPI-ConfigSource">ConfigSource SPI</h2>
<div class="section">
<p>The config system includes built-in support for several types of sources
(for example, Java <code>String</code>, <code>Readable</code>, <code>Properties</code>, and <code>Map</code>
objects - see <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/configio/helidon/config/ConfigSources.html"><code>ConfigSources</code></a>).
Implement a <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigSource.html"><code>ConfigSource</code></a> to
load raw configuration data from a type of source that the config system does
not already support.</p>


<div class="block-title"><span>ConfigSource SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ConfigSource.png" alt="ConfigSource SPI" />
</v-card-text>
</v-card>

<p>The interfaces <code>ConfigNode</code>, <code>ObjectNode</code>, <code>ValueNode</code> and
 <code>ListNode</code> represent the in-memory data structure for loaded and parsed configuration data.</p>

</div>

<h2  id="Config-SPI-ConfigParser">ConfigParser SPI</h2>
<div class="section">
<p>The parsing step converts config data in some format into the corresponding
in-memory representation of config <code>ObjectNode</code>s. The config system can already parse
several data formats (for example
Java <code>Properties</code>, YAML, and HOCON). Implement the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigParser.html"><code>ConfigParser</code></a> SPI to allow the
config system to handle additional formats.</p>


<div class="block-title"><span>ConfigParser SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-ConfigParser.png" alt="ConfigParser SPI" />
</v-card-text>
</v-card>

<p>The <code>ConfigParser.Content</code> interface defines operations on the content that is to
to be parsed by a <code>ConfigParser</code> implementation:</p>

<ul class="ulist">
<li>
<p><code>getStamp()</code> - Returns a stamp (for example, a time stamp) that is different for
different values of the content.</p>

</li>
<li>
<p><code>getMediaType()</code> - Reports the media type of the content.</p>

</li>
<li>
<p><code>asReadable()</code> - Provides a <code>Readable</code> and <code>Autocloseable</code> object from which
the content can be read.</p>

</li>
</ul>
<p>The application can register parsers for a builder by invoking <code>Config.Builder#addParser(ConfigParser)</code>.
The config system also uses the Java service loader mechanism to load automatically,
for all builders, any parsers listed in the
<code>META-INF/services/io.helidon.config.spi.ConfigParser</code> resource on the
runtime classpath. Prevent autoloading of parsers for a given builder
by invoking <code>Config.Builder#disableParserServices()</code>.</p>

<p><code>ConfigParser</code> accepts <code>@Priority</code>. See <router-link to="#priority-info" @click.native="this.scrollFix('#priority-info')">About Priority</router-link>.</p>

<markup
lang="java"
title="Example custom parser implementation listed in <code>META-INF/services/io.helidon.config.spi.ConfigParser</code>"
>myModule.MyConfigParser</markup>

<markup
lang="java"
title="Example custom parser definition in <code>module-info.java</code>"
>module myModule {
    requires transitive io.helidon.config;
    provides io.helidon.config.spi.ConfigParser with myModule.MyConfigParser;
}</markup>

</div>

<h2  id="Config-SPI-OverrideSource">OverrideSource SPI</h2>
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
<p>a replacement, <em>overriding</em>, <code>String</code> value the config system should use if the predicate
evaluates to true.</p>

</li>
</ul>
<p>To furnish overrides to the config system, implement the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/OverrideSource.html"><code>OverrideSource</code></a> SPI one or
more times and pass instances of those implementations to the config builder&#8217;s
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.html#overrides-java.util.function.Supplier-"><code>overrides</code></a>
method. The config system will apply the overrides returned from each
<code>OverrideSource</code> to each config key requested from a <code>Config</code> that is based on
that <code>Config.Builder</code>.</p>


<div class="block-title"><span>OverrideSource SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-OverrideSource.png" alt="OverrideSource SPI" />
</v-card-text>
</v-card>

</div>

<h2  id="Config-SPI-ConfigFilter">ConfigFilter SPI</h2>
<div class="section">
<p>Before returning a <code>String</code> from <code>Config.value()</code> the config system applies any
<em>filters</em> set up on the <code>Config.Builder</code> used to create the config tree that
contains the config node of interest. The application provides filters as
implementations of the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigFilter.html"><code>ConfigFilter</code></a> interface.
Each filter is a function which accepts a <code>Config.Key</code> and an input <code>String</code> value
and returns a <code>String</code> value the config system should use for that key going forward.
The filter can return the original value or return some other value.</p>

<p>The application registers filters and filter providers by passing <code>ConfigFilter</code>
implementations to one of the config builder
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.html"><code>addFilter</code> methods</a>. The config
system also uses the Java service loader mechanism to load
additional filters automatically, for all builders, using
the service interface described in the following table. Prevent a given
builder from using the auto-loaded filters by invoking the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.htlm#disableFilterServices--"><code>disableFilterServices</code></a>
method.</p>

<div class="block-title"><span>Config SPI Interfaces for Filtering</span></div>
<div class="table__overflow elevation-1 ">
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
<td><a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigFilter.html"><code>ConfigFilter</code></a></td><td>Accepts <code>@Priority</code>. See <router-link to="#priority-info" @click.native="this.scrollFix('#priority-info')">About Priority</router-link>.</td>
<td><code>String apply(Config.Key key, String stringValue);</code></td>
<td>Accepts a key and the corresponding <code>String</code> value and
returns the <code>String</code> which the config system should use for that key.</td>
</tr>
</tbody>
</table>
</div>

<h3 >Initializing Filters</h3>
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

<h2  id="Config-SPI-ConfigMapperProvider">ConfigMapperProvider SPI</h2>
<div class="section">
<p>The config system provides built-in mappings from <code>String</code> values to various Java
types. (See <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigMappers.html"><code>ConfigMappers</code></a>.)</p>

<p>To handle mappings to other types the application can register
custom mappers with the config system by implementing the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigMapperProvider.html"><code>ConfigMapperProvider</code></a>
 SPI. Such providers return a map, with entries in which:</p>

<ul class="ulist">
<li>
<p>the key is the Java type (a <code>Class</code> object) the mapper produces, and</p>

</li>
<li>
<p>the value is a <code>ConfigMapper</code> that converts the config in-memory
data structure into the type in the key.</p>

</li>
</ul>
<p>The config system also uses the Java service loader mechanism to load automatically,
for all builders, any mappers returned by the providers listed in the
<code>META-INF/services/io.helidon.config.spi.ConfigMapper</code> resource on the
runtime classpath. The application can prevent autoloading of mappers for a
given builder by invoking <code>Config.Builder#disableMapperServices()</code>. Note
that the build-in mappers described in <code>ConfigMappers</code> still operate.</p>

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
>myModule.MyConfigMapperProvider</markup>

<markup
lang="java"
title="Reference custom mapper provider implementation in <code>module-info.java</code>"
>module myModule {
    requires transitive io.helidon.config;
    provides io.helidon.config.spi.ConfigMapperProvider with myModule.MyConfigMapperProvider;
}</markup>

</div>

<h2  id="Config-SPI-PollingStrategy">PollingStrategy SPI</h2>
<div class="section">
<p>Once it loads a <code>Config</code> tree from <code>ConfigSource</code>s the config
system does not itself change the in-memory <code>Config</code> tree. Even so, the
underlying data available via the tree&#8217;s <code>ConfigSource</code>s can change.
Implementations of <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a>
informs other interested code when changes to that underlying data might have
occurred.</p>

<p>In implementations of <code>PollingStrategy</code> the <code>#ticks()</code> method
returns a <code>Flow.Publisher of <code>PollingEvent</code>s to which the
application or the <code>ConfigSource</code>s themselves can subscribe. Generally,
each event is a hint to the subscriber that
it should check to see if any of the underlying config data it relies on
has changed. Note that a <code>PollingStrategy</code>'s publication of an
event does not necessarily guarantee that the underlying data has in fact
changed, although this might be true for some `PollingStrategy</code>
implementations.</p>

<p>The config system offers polling strategies for periodic time-based
checks and for a file watcher. Often an application can create a config source
simply by using one of the methods on <code>ConfigSources</code> (for example,
<code>ConfigSources#file(path)</code> to get a builder and then invoke <code>pollingStrategy</code>
passing one of the predefined strategies. But the application can implement
its own <code>PollingStrategy</code> and set it on the config source builder instead.</p>


<div class="block-title"><span>PollingStrategy SPI</span></div>
<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/config/spi-PollingStrategy.png" alt="PollingStrategy SPI" />
</v-card-text>
</v-card>

<p><code>The PollingStrategy</code> <code>ticks()</code> method returns a <code>Publisher</code> of <code>PollingEvent</code>s.
Each event becomes available as the particular <code>PollingStrategy</code> publishes it.
Depending on the implementation of the polling strategy, such events might
indicate that the underlying source data <em>has</em> changed or that it <em>might have</em> changed.
In either case the subscribers to the publisher are notified. If the <code>ConfigSource</code>
itself subscribes to the publisher, for example, then it might choose to reload
the underlying data when its subscriber receives an event.</p>

</div>

<h2  id="Config-SPI-RetryPolicy">RetryPolicy SPI</h2>
<div class="section">
<p>The builder for each <code>ConfigSource</code> and <code>OverrideSource</code> accepts a
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/RetryPolicy.html"><code>RetryPolicy</code></a>
governing if and how the source should deal with failures loading the underlying
data.</p>

<p>A retry policy accepts a function, the invocation of which the policy will
govern according to its own implementation.
Applications can use the predefined policies in
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/RetryPolicies.html"><code>RetryPolicies</code></a>, such as
<code>RetryPolicies.justCall</code> which simply invokes the function without any retry.
That class also exposes a builder for constructing a time-based retry policy,
with several parameters:</p>

<div class="block-title"><span>Parameters Controlling Built-in <code>RetryPolicy</code></span></div>
<div class="table__overflow elevation-1 ">
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
<td><code>delay</code></td>
<td>Initial delay between calls to the function</td>
<td>200 ms</td>
</tr>
<tr>
<td><code>delayFactor</code></td>
<td>Multiplier applied to <code>delay</code> on each successive call</td>
<td>2</td>
</tr>
<tr>
<td><code>callTimeout</code></td>
<td>Time limit for each individual call of the function</td>
<td>500 ms</td>
</tr>
<tr>
<td><code>overallTimeout</code></td>
<td>Limit for the total elapsed time attempting to
call the function successfully, including delays between calls</td>
<td>2 s</td>
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

<p>The application can try to cancel the overall execution of a <code>RetryPolicy</code> by invoking
the <code>RetryPolicy#cancel(boolean mayInterruptIfRunning)</code> method. Ideally the retry policy
implementation should be able to abort the execution of the retry policy, even while
a function call is in progress, but the policy must respond to cancels between
function calls. In either case <code>cancel</code> returns <code>true</code> if the retry was aborted
without a successful call to the function, and <code>false</code> otherwise, including if
the function call had already completed successfully or had previously been
successfully canceled.</p>

</div>
</doc-view>
