<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>About Helidon</dt>
<dd slot="desc"><p>Helidon is a collection of Java libraries for writing microservices that run on a fast web core powered by Netty. Its available in two frameworks: Helidon SE and Helidon MP.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_a_collection_of_java_libraries">A Collection of Java Libraries</h2>
<div class="section">
<p>Helidon provides an open source, lightweight, fast, reactive, cloud native framework for developing Java microservices. Helidon implements and supports MicroProfile, a baseline platform definition that leverages Java EE and Jakarta EE technologies for microservices and delivers application portability across multiple runtimes.</p>

</div>

<h2 id="_using_cloud_native_tools_with_helidon">Using Cloud-native Tools with Helidon</h2>
<div class="section">
<p>Helidon libraries interoperate with popular tools from the cloud-native space, so there&#8217;s no need for any specific tooling or deployment model. Helidon can be used with:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://www.docker.com/">Docker</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://kubernetes.io/">Kubernetes</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://prometheus.io/">Prometheus</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://opentracing.io/">OpenTracing</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://coreos.com/etcd/">Etcd</a></p>

</li>
</ul>
<div class="admonition tip">
<p class="admonition-inline">The <router-link to="#_getting_started" @click.native="this.scrollFix('#_getting_started')">Helidon Quickstart Examples</router-link>
 contain support for Docker and Kubernetes.</p>
</div>
</div>

<h2 id="_understanding_the_helidon_frameworks">Understanding the Helidon Frameworks</h2>
<div class="section">
<p>Helidon supports two programming models for writing microservices: <strong>Helidon SE</strong> and <strong>Helidon MP</strong>.</p>

<p>SE is designed to be a microframework that supports the reactive programming model, while Helidon MP is an Eclipse MicroProfile runtime that allows the Jakarta EE community to run microservices in a portable way.</p>

<p>The table below shows to primary differences between Helidon SE and Helidon MP.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th><strong>Helidon SE</strong></th>
<th><strong>Helidon MP</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td class="">Helidon SE gives you full transparency and puts you in control.</td>
<td class="">Helidon MP is built on top of the Helidon libraries and provides platform definition that is familiar to enterprise Java developers.</td>
</tr>
<tr>
<td class="">Microframework model with a very small footprint and limited functionality (~7 MB)</td>
<td class=""><a id="" title="" target="_blank" href="https://projects.eclipse.org/proposals/eclipse-microprofile">Eclipse MicroProfile</a> implementation; slightly larger footprint than SE (~13 MB)</td>
</tr>
<tr>
<td class="">Functional style is reactive non-blocking</td>
<td class="">Declarative style with dependency injection</td>
</tr>
<tr>
<td class="">Transparent "no magic" development experience; pure java application development with no annotations and no dependency injections</td>
<td class="">Jakarta EE microprofile development experience; all Jakarta components (CDI, JAX-RS, JSON-P/B)</td>
</tr>
<tr>
<td class="">Learn more about <router-link to="#se/01_introduction.adoc" @click.native="this.scrollFix('#se/01_introduction.adoc')">Helidon SE</router-link>.</td>
<td class="">Learn more about <router-link to="#mp/01_introduction.adoc" @click.native="this.scrollFix('#mp/01_introduction.adoc')">Helidon MP</router-link>.</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_whats_new_in_helidon_2_0">What&#8217;s New in Helidon 2.0</h2>
<div class="section">
<p>The Helidon 2.0 release contains significant new features, enhancements and fixes.</p>

<div class="admonition tip">
<p class="admonition-inline">For a complete list of fixes and enhancements, see the Helidon 2.0  <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/blob/2.0.0/CHANGELOG.md">changelog</a>.</p>
</div>
<ul class="ulist">
<li>
<p><strong>GraalVM Native-image Support in Helidon MP</strong><br>
Helidon SE already supports GraalVM, but in 2.0 GraalVM native image support will also be available in Helidon MP. <router-link to="#guides/36_graalnative.adoc" @click.native="this.scrollFix('#guides/36_graalnative.adoc')">GraalVM Native Images Guide</router-link><br></p>

</li>
<li>
<p><strong>Helidon Command Line Tool</strong><br>
One of the new features in Helidon 2.0 is the addition of a command line interface. The Helidon CLI enables developers to get started with Helidon with minimal effort: you can create a new application, build it, run it, and more, by writing some simple commands. <router-link to="#se/cli/01_introduction.adoc" @click.native="this.scrollFix('#se/cli/01_introduction.adoc')">Learn more about Helidon CLI</router-link>.</p>

</li>
<li>
<p><strong>DB Client for Helidon SE</strong><br>
The new database client for Helidon SE will include support for the MongoDB reactive driver and brings Health Checks, Metrics, and Tracing support to every Helidon API. <router-link to="/se/dbclient/01_introduction">Learn more about the DB Client</router-link>.</p>

</li>
<li>
<p><strong>Extending MicroProfile Reactive Messaging and Reactive Operators Support</strong><br>
MP Reactive Operators will be included in both frameworks, while MP Reactive Messaging will only be included in Helidon MP. <router-link to="/mp/reactivemessaging/01_introduction">Learn more about Reactive Messaging</router-link> and <router-link to="#mp/reactivestreams/01_introduction.adoc" @click.native="this.scrollFix('#mp/reactivestreams/01_introduction.adoc')">Reactive Streams</router-link>.</p>

</li>
<li>
<p><strong>Helidon Web Client</strong><br>
The new reactive web client can integrate with other Helidon SE APIs.
<router-link to="/se/webclient/01_introduction">Learn more about the Helidon Web Client</router-link>.</p>

</li>
<li>
<p><strong>Additional Websocket Support</strong><br>
Based upon the Tyrus implementation, Helidon receives WebSocket API support.
<router-link to="/se/websocket/01_overview">Learn more about Websocket Support</router-link>.</p>

</li>
<li>
<p><strong>Support for Java 11 APIs</strong><br>
Helidon will require Java 11 or newer.
<router-link to="/about/03_prerequisites">Learn more about the prerequisites for Helidon 2.0</router-link>.</p>

</li>
<li>
<p><strong>CORS support for MP and SE</strong><br>
Although it is possible for any Helidon application to implement its own support for CORS, there are common tasks (such as processing preflight requests) that can be provided in a Helidon module. <router-link to="/se/cors/01_introduction">Learn more about CORS support</router-link>.</p>

</li>
<li>
<p><strong>Backward Incompatible Changes</strong><br>
View the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/blob/2.0.0-M1/CHANGELOG.md#backward-incompatible-changes">changelog</a> for information about potential breaking changes, including package name changes.</p>

</li>
</ul>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p><router-link to="#_getting_started" @click.native="this.scrollFix('#_getting_started')">Helidon Quickstart Examples</router-link></p>

</div>
</doc-view>