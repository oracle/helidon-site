<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Fault Tolerance Introduction</dt>
<dd slot="desc"><p>Fault Tolerance is part of the MicroProfile set of specifications [1]. This API defines mostly
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
<p>Fault Tolerance method annotations are internally implemented using <em>commands</em>.
Essentially, each Fault Tolerance method invocation runs under the supervision
of one of these commands. Command execution can be affected by certain properties:
some defined by the Fault Tolerance specification and others internal to Helidon.</p>

</div>

<h2 id="_fault_tolerance_configuration">Fault Tolerance Configuration</h2>
<div class="section">
<p>This section describes a few configuration parameters that are specific to Helidon&#8217;s Fault
Tolerance implementation. The reader is referred to [1] for further information about the
Fault Tolerance MicroProfile API.</p>

<p>The following is a list of config properties supported by Helidon that are
<em>not</em> part of the Fault Tolerance specification:</p>

<ul class="ulist">
<li>
<p><code>fault-tolerance.commandThreadPoolSize</code>: Asynchronous commands require the use of a
separate thread pool. Threads created in this pool are named <code>helidon-ft-async-&lt;N&gt;</code>.
This config property controls the size of such a pool. The default size is 8.</p>

</li>
<li>
<p><code>fault-tolerance.threadWaitingPeriod</code>: A thread that has been interrupted but
is still running (e.g. in a busy loop) has to be waited for. This config property
controls the maximum waiting time in milliseconds. Default value is 2000 milliseconds.</p>

</li>
<li>
<p><code>fault-tolerance.bulkheadTaskQueueingPeriod</code>: Time to wait
for a task to be queued on a bulkhead. Default value is 2000 milliseconds.</p>

</li>
<li>
<p><code>fault-tolerance.delayCorrection</code>: This is an internal correction applied to
a <code>@Retry</code> delay that accounts for the execution of some internal logic in
Helidon. This value will be subtracted from the actual delay. Default is
250 milliseconds.</p>

</li>
</ul>
<p>[1] <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-fault-tolerance">https://github.com/eclipse/microprofile-fault-tolerance</a></p>

</div>
</doc-view>