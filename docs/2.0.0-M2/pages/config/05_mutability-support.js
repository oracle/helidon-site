<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Mutability Support</dt>
<dd slot="desc"><p>An in-memory config tree, once loaded, is immutable, even though the data in the underlying
config sources <em>can</em> change over time. Your application can find out metadata about a
loaded in-memory config and can track changes in config sources.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>Even though in-memory config trees are immutable, the config system internally
records which config sources it used to load each config tree and some metadata
about the configuration. Your application can be aware of updates to the underlying
config sources by:</p>

<ol style="margin-left: 15px;">
<li>
using the metadata the config system maintains,

</li>
<li>
responding to changes when the config sources are updated, or

</li>
<li>
using <code>Supplier</code>s of particular config values to obtain the always-current
value for a key.

</li>
</ol>
</div>

<h2 id="_using_config_metadata">Using Config Metadata</h2>
<div class="section">

<h3 id="_loading_time">Loading Time</h3>
<div class="section">
<p>The config system records when it loads each configuration into memory.
Your application can retrieve it by invoking the <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.html#timestamp--">timestamp method</a>:</p>

<markup
lang="java"

>java.time.Instance loadTime = myConfig.timestamp();</markup>

<p>on any config node.</p>

</div>

<h3 id="_config_context">Config Context</h3>
<div class="section">
<p>The config system maintains a <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.Context.html"><code>Config.Context</code></a>
for each <code>Config</code> node. Your application can retrieve the context by invoking the <code>Config.context()</code>
method and then use it for these operations:</p>

<div class="block-title"><span>Uses of <code>Config.Context</code></span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Method</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Instant timestamp()</code></td>
<td>Returns the load time of the last loaded configuration
that used the context.</td>
</tr>
<tr>
<td><code>Config last()</code></td>
<td>Returns the most recently loaded configuration that used the context.</td>
</tr>
<tr>
<td><code>Config reload()</code></td>
<td>Reloads the
entire config tree from the current contents of the same config sources used to
load the tree in which the current node resides.</td>
</tr>
</tbody>
</table>
</div>
<p>Note that the config context describes or replaces a currently-loaded config tree.
It by itself does not help your application decide <em>when</em> reloading the config might be
useful.</p>

</div>
</div>

<h2 id="polling">Responding to Changes in Config Sources</h2>
<div class="section">
<div class="admonition important">
<p class="admonition-textlabel">Evolving API</p>
<p ><p>This section describes the <code>Config.changes()</code> method. It is marked
as deprecated because it returns an <code>io.helidon.reactive.Flow.Publisher</code> object.
In a future Helidon release that requires Java 11 or later this method will be undeprecated
and changed&#8201;&#8212;&#8201;or a similar method will be added&#8201;&#8212;&#8201;so that the return type is
<code>java.util.concurrent.Flow.Publisher</code> instead.</p>

<p>Any code you write using the existing <code>Config.changes()</code> method might need
to change at that time.</p>
</p>
</div>
<p>Although in-memory config trees do not change once loaded, applications can respond to changes
in the underlying config sources by:</p>

<ol style="margin-left: 15px;">
<li>
setting up change detection for the config sources used to build a configuration, and

</li>
<li>
registering a response to be run when a source changes.

</li>
</ol>
<p>Your code&#8217;s response can react to the changes in whatever way makes sense
for your application.</p>

<p>The following sections describe these steps in detail.</p>


<h3 id="_setting_up_config_source_change_detection">Setting up Config Source Change Detection</h3>
<div class="section">
<p>When the application creates a config source, it can set up change detection for
that source. This is called <em>polling</em> in the Helidon API but specific change detection
algorithms might not use actual polling. You choose a specific
<a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/spi/PollingStrategy.html"><code>PollingStrategy</code></a> for each
config source you want to monitor. See the section on
<router-link :to="{path: '/config/07_extensions', hash: '#Config-SPI-PollingStrategy'}">polling strategies</router-link> in the
config extensions doc page for more information.</p>

<p>The config system provides some built-in polling strategies, exposed as these methods
on the <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/PollingStrategies.html"><code>PollingStrategies</code></a> class:</p>

<ul class="ulist">
<li>
<p><code>regular(Duration interval)</code> - a general-purpose scheduled polling strategy with a specified,
constant polling interval.</p>

</li>
<li>
<p><code>watch(Path watchedPath)</code> - a filesystem-specific strategy to watch
 specified path. You can use this strategy with the <code>file</code> and <code>classpath</code>
built-in config sources.</p>

</li>
<li>
<p><code>nop()</code> - a no-op strategy</p>

</li>
</ul>
<p>This example builds a <code>Config</code> object from three sources, each set up with a
different polling strategy:</p>

<markup
lang="java"
title="Build a <code>Config</code> with a different <code>PollingStrategy</code> for each config source"
>Config config = Config.create(
        ConfigSources.file("conf/dev.properties")
                .pollingStrategy(PollingStrategies.regular(Duration.ofSeconds(2))) <span class="conum" data-value="1" />
                .optional(),
        ConfigSources.file("conf/config.properties")
                .pollingStrategy(PollingStrategies::watch)                         <span class="conum" data-value="2" />
                .optional(),
        ConfigSources.classpath("application.properties")
                .pollingStrategy(PollingStrategies::nop));                         <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Optional <code>file</code> source <code>conf/dev.properties</code> will be checked for changes every
<code>2</code> seconds.</li>
<li data-value="2">Optional <code>file</code> source <code>conf/config.properties</code> will be watched by the Java
<code>WatchService</code> for changes on filesystem.</li>
<li data-value="3">The <code>classpath</code> resource <code>application.properties</code> will not be checked for
 changes.
<code>PollingStrategies.nop()</code> polling strategy is default.</li>
</ul>
<p>The polling strategies internally inform the config system when they
detect changes in the monitored config sources (except that the <code>nop</code> strategy does
nothing).</p>

</div>

<h3 id="_registering_a_config_change_response">Registering a Config Change Response</h3>
<div class="section">
<p>To know when config sources have changed, your application must register its interest
on the <code>Config</code> node of interest. The config system will then notify
your application of any change within the subtree rooted at that node.
In particular, if you register on the root node,
then the config system notifies your code of changes anywhere in the config tree.</p>

<p>You can register in either of two ways:</p>

<ol style="margin-left: 15px;">
<li>
register an action to be run upon each change, or

</li>
<li>
subscribe to a <code>Flow.Publisher</code> that notifies of changes.

</li>
</ol>

<h4 id="_registering_actions">Registering Actions</h4>
<div class="section">
<p>A simple approach is for your application to register a function that should
run when any change occurs.</p>

<markup
lang="java"
title="Subscribe on <code>greeting</code> property changes via <code>onChange</code> method"
>config.get("greeting")                                                         <span class="conum" data-value="1" />
        .onChange((changedNode) -&gt; {                                           <span class="conum" data-value="2" />
            System.out.println("Node " + changedNode.key() + " has changed!");
            return true;                                                       <span class="conum" data-value="3" />
        });</markup>

<ul class="colist">
<li data-value="1">Navigate to the <code>Config</code> node on which you want to register.</li>
<li data-value="2">Invoke the <code>onChange</code> method, passing a function (<code>Function&lt;Config, Boolean&gt;</code>).
The config system invokes that function each time the subtree rooted at the
<code>greeting</code> node changes. The <code>changedNode</code> is a new instance of <code>Config</code>
representing the updated subtree rooted at <code>greeting</code>.</li>
<li data-value="3">The function should return <code>true</code> to continue being run on subsequent changes, <code>false</code>
to stop.</li>
</ul>
</div>

<h4 id="_subscribing_to_events">Subscribing to Events</h4>
<div class="section">
<p>The config system also supports the flow publisher/subscriber model for applications
that need more control over the pace at which the config system delivers
config change events.</p>

<p>Each <code>Config</code> instance exposes the <a id="" title="" target="_blank" href="./apidocs/index.html?io/helidon/config/Config.html#changes--"><code>Config.changes()</code></a>
method which returns a <code>Flow.Publisher&lt;Config&gt;</code>.
Your application can invoke this method, then invoke <code>subscribe</code> on the returned
<code>Flow.Publisher</code>, passing your own <code>Flow.Subscriber</code> implementation. The config system will
invoke your subscriber&#8217;s methods as appropriate, most notably calling <code>onNext</code>
whenever it detects a change in one of the underlying config sources for the config
node of interest.</p>

<p>Mote that your subscriber will be notified when a change occurs anywhere in the
subtree represented by the <code>Config</code> node.</p>

<markup
lang="java"
title="Subscribe on <code>greeting</code> property changes"
>config.get("greeting")                                                             <span class="conum" data-value="1" />
        .changes()                                                                 <span class="conum" data-value="2" />
        .subscribe(new Flow.Subscriber&lt;&gt;() {                                       <span class="conum" data-value="3" />
            Flow.Subscription subscription;

            @Override
            public void onSubscribe(Flow.Subscription subscription) {              <span class="conum" data-value="4" />
                this.subscription = subscription;
                subscription.request(1);
            }

            @Override
            public void onNext(Config changedNode) {                               <span class="conum" data-value="5" />
                System.out.println("Node " + changedNode.key() + " has changed!");
                subscription.request(1);
            }

            @Override
            public void onError(Throwable throwable) {                             <span class="conum" data-value="6" />
            }

            @Override
            public void onComplete() {                                             <span class="conum" data-value="7" />
            }
        });</markup>

<ul class="colist">
<li data-value="1">Navigate to the <code>Config</code> node on which you want to register.</li>
<li data-value="2">Invoke <code>changes</code> to get the <code>Flow.Publisher</code> of changes to the subtree rooted
at the <code>Config</code> node.</li>
<li data-value="3">Subscribe to the publisher passing a custom <code>Flow.Subscriber&lt;Config&gt;</code> implementation.</li>
<li data-value="4">Request the first event delivery in <code>onSubscribe</code> method.</li>
<li data-value="5">The config system invokes <code>onNext</code> each time the subtree rooted at the
<code>greeting</code> node changes. The <code>changedNode</code> is a new instance of <code>Config</code> representing
the updated subtree rooted at <code>greeting</code>, regardless of where in the subtree
the change actually occurred. Remember to request the next event delivery in <code>onNext</code>.</li>
<li data-value="6">The config system does not currently invoke <code>onError</code>.</li>
<li data-value="7">The config system invokes <code>onComplete</code> if all config sources indicate <em>there will
be no other change event</em>.</li>
</ul>
<div class="admonition note">
<p class="admonition-textlabel">Note</p>
<p >Your application <em>does not</em> need to subscribe to the new <code>Config</code> instance passed
to your <code>onNext</code> method. The original subscription remains in force for changes
to the "new" instance.</p>
</div>
</div>
</div>
</div>

<h2 id="_accessing_always_current_values">Accessing Always-current Values</h2>
<div class="section">
<p>Some applications do not need to respond to changes as they happen. Instead it&#8217;s
sufficient that they simply have access to the current value for a particular
key in the configuration.</p>

<p>Each <code>asXXX</code> method on the <code>Config</code> class has a companion <code>asXXXSupplier</code> method.
These supplier methods return <code>Supplier&lt;XXX&gt;</code>, and when your application invokes
the supplier&#8217;s <code>get</code> method the config system returns the <em>then-current value</em>
as stored in the config source.</p>

<markup
lang="java"
title="Access <code>greeting</code> property as <code>Supplier&lt;String&gt;</code>"
>// Construct a Config with the appropriate PollingStrategy on each config source.

Supplier&lt;String&gt; greetingSupplier = config.get("greeting")                     <span class="conum" data-value="1" />
        .asString().supplier();                                                   <span class="conum" data-value="2" />

System.out.println("Always actual greeting value: " + greetingSupplier.get()); <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Navigate to the <code>Config</code> node for which you want access to the always-current
value.</li>
<li data-value="2">Retrieve and store the returned supplier for later use.</li>
<li data-value="3">Invoke the supplier&#8217;s <code>get()</code> method to retrieve the current value of the node.</li>
</ul>
<div class="admonition important">
<p class="admonition-textlabel">Important</p>
<p ><p>Supplier support requires that you create the <code>Config</code> object from config sources that
have proper polling strategies set up.</p>
</p>
</div>
</div>
</doc-view>