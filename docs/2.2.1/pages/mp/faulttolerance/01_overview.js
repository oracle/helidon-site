<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Fault Tolerance Introduction</dt>
<dd slot="desc"><p>Fault Tolerance is part of the MicroProfile set of <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-fault-tolerance">specifications</a>. This API defines mostly
annotations that improve application robustness by providing support to conveniently handle
error conditions (faults) that may occur in real-world applications. Examples include
service restarts, network delays, temporal infrastructure instabilities, etc.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_fault_tolerance_in_helidon">Fault Tolerance in Helidon</h2>
<div class="section">
<p>The latest implementation of MP Fault Tolerance is built on top of Helidon&#8217;s SE
Fault Tolerance. Thus, some configuration for Helidon SE Fault
Tolerance also applies to MP. The next section describes some
configuration properties that are of particular interest to MP applications.</p>


<h3 id="_configuration">Configuration</h3>
<div class="section">
<p>Helidon&#8217;s implementation uses two types of thread pools: normal and scheduled. The default
core size of these executors is 16; however, that can be configured using an <code>application.yaml</code>
file as follows:</p>

<markup
lang="yaml"

>executor:
  core-pool-size: 8

scheduled-executor:
  core-pool-size: 8</markup>

<div class="admonition note">
<p class="admonition-inline">There is currently <em>no support</em> to configure these executor properties via a
<code>microprofile-config.properties</code> file.</p>
</div>
<p>The complete set of properties available to configure these executors is in
./apidocs/io.helidon.common.configurable/io/helidon/common/configurable/ThreadPoolSupplier.Builder.html#config(io.helidon.config.Config)[ServerThreadPoolSupplier] and
./apidocs/io.helidon.common.configurable/io/helidon/common/configurable/ScheduledThreadPoolSupplier.Builder.html#config(io.helidon.config.Config)[ScheduledThreadPoolSupplier].</p>

</div>
</div>
</doc-view>