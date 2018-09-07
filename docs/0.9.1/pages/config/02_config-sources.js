<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Loading Configuration: Config Sources and Parsers</dt>
<dd slot="desc"><p>Configuration can be loaded from different types of locations and expressed in different
formats. This section describes how your application can use <em>config sources</em> and
<em>config parsers</em> together to load configuration data.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Overview</h2>
<div class="section">
<p>Each config source reads data from a location of a specific type, without regard
to the format of the config data there. Each config parser
converts data expressed in a particular format into the in-memory config data
structure that the rest of the config system uses, without any concern for where
that data resides or how it is physically retrieved. These two work together to prepare
data in a given format at a given location for the config system.
When your application prepares a <code>Config.Builder</code> it sets what <code>ConfigSource</code>s and
<code>ConfigParser</code>s the builder should use in constructing the resulting <code>Config</code> object.</p>

</div>

<h2 >Config Sources</h2>
<div class="section">
<p>If your application uses the default configuration, then the config system
automatically sets up the config sources for you, as described in the
<a id=""
title=""
target="_blank"
href="01_introduction.html#config-sources-default-config">config introduction</a>.</p>

<p>If instead your application uses a <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.html"><code>Config.Builder</code></a>, then it can invoke one of the <code>sources</code> methods on that builder to set which config sources it should use.</p>

<p>The config system includes support for several types of config sources, for example:</p>

<ul class="ulist">
<li>
<p>a resource on the runtime classpath,</p>

</li>
<li>
<p>environment variables,</p>

</li>
<li>
<p>a file,</p>

</li>
<li>
<p>Java system properties,</p>

</li>
<li>
<p>a URL,</p>

</li>
<li>
<p>a variety of in-memory data structures (<code>String</code>, <code>Map</code>, <code>Properties</code>)</p>

</li>
</ul>
<p>See the JavaDoc for the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/ConfigSources.html"><code>ConfigSources</code></a>
class for a complete list of the built-in config source types and how to use them.</p>

<p>You can also extend the config system
to handle other types of sources by implementing the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigSource.html"><code>ConfigSource</code></a> interface. See
the <a id=""
title=""
target="_blank"
href="07_extensions.html">extensions</a> documentation for complete information.</p>

<p>See the <a id=""
title=""
target="_blank"
href="06_advanced-configuration.html">advanced topics</a> page for further
information on some more involved aspects of config sources.</p>

</div>

<h2 >Config Parsers</h2>
<div class="section">
<p>When it reads configuration text from sources, the config system uses config parsers
to translate that text into the in-memory data structures representing that configuration.
The config system includes several built-in parsers, such as for the Java properties, YAML, JSON, and HOCON formats. See <a id=""
title=""
target="_blank"
href="01_introduction.html#build-in-formats">this section in
the introduction</a> for
how to change your <code>pom.xml</code> to make parsers for those formats available to your
application. Then your application can invoke the
<a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/Config.Builder.html#addParser">config builder&#8217;s <code>addParser</code></a> method
so that builder will use the parsers you choose.</p>

<p>You can extend the system with custom parsers of your own. Implement the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/ConfigParser.html"><code>ConfigParser</code></a> interface, then construct a <code>Config.Builder</code> using the <code>addParser</code> method, passing an instance of your customer parser. Invoke one of the <code>sources</code> methods to include a source that uses the custom format and then build the <code>Config</code> object.</p>

</div>

<h2 >Detecting and Responding to Changes in Config Data</h2>
<div class="section">
<p>Each <code>Config</code> object which the config system returns to your application is
immutable; even if the information in one of the underlying config sources changes, an in-memory data structure built from the earlier
content remains unchanged.</p>

<p>Even so, the config system allows your application to learn when such underlying changes in the data occur and respond accordingly. The <a id=""
title=""
target="_blank"
href="-5_mutability-support.html">mutability</a> section explains this in detail, and the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/PollingStrategies.html"><code>PollingStrategies</code></a> JavaDoc describes the built-in implementations. You can, of course, write your own by implementing the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a> interface. On a config source builder invoke <code>pollingStrategy</code> with an instance of your custom strategy and then invoke <code>build</code> to create the <code>ConfigSource</code>.</p>

</div>

<h2 >Dealing with Loading Errors: Retry Policies</h2>
<div class="section">
<p>Config sources, especially those that depend on fallible mechanisms such as the network or a shared file system, might fail to load during momentary outages. The config system allows you to build resiliency into your application&#8217;s use of configuration that relies on such technologies.</p>

<p>When your application builds a <code>ConfigSource</code> it can specify a <em>retry policy</em>. When the config system needs to load data from that source it delegates the load operation to that retry policy. That policy is responsible not only for loading the data but also for detecting errors during loading and implementing the algorithm for deciding when and how many times to retry a failed load before reporting a failure back to your application.</p>

<p>The config system includes two predefined retry policies:</p>

<div class="block-title"><span>Predefined Retry Policies</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Policy</th>
<th>Summary</th>
</tr>
</thead>
<tbody>
<tr>
<td>"just call" (default)</td>
<td>asks the config source to load the data with no retry</td>
</tr>
<tr>
<td>"repeat"</td>
<td>performs a settable number of time-based retries, reporting failure only after all available retries have failed</td>
</tr>
</tbody>
</table>
</div>
<p>See the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/RetryPolicies.html"><code>RetryPolicies</code></a> JavaDoc for complete details on these built-in retry policies.</p>

<p>You can devise your own policy. Implement the <a id=""
title=""
target="_blank"
href="./apidocs/index.html?io/helidon/config/spi/RetryPolicy.html"><code>RetryPolicy</code></a> interface. Then pass an instance of your policy implementation to the config source builder&#8217;s <code>retryPolicy</code> method.</p>

</div>
</doc-view>