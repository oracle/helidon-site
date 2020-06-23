<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Introduction</dt>
<dd slot="desc"><p>Helidon MP is an Eclipse MicroProfile runtime that allows the Jakarta EE community to run microservices in a portable way.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_about_helidon_mp_components">About Helidon MP Components</h2>
<div class="section">
<p>Helidon MP 2.0.0 is an implementation of the
<a id="" title="" target="_blank" href="https://microprofile.io">MicroProfile</a>
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile/releases">specification</a> and supports MicroProfile 3.2. Since
MicroProfile has its roots in Java EE, the MicroProfile
APIs follow a familiar, declarative approach with heavy use of annotations.
This makes it a good choice for Java EE developers.</p>

<p>Helidon has added additional APIs to the core set of Microprofile APIs giving you all the capabilities you need for writing modern cloud native applications.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 28.571%;">
<col style="width: 71.429%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">CDI Extensions</td>
<td class="">In addition to MicroProfile support, Helidon MP provides CDI extensions to address areas not covered by MicroProfile.
<router-link to="/mp/extensions/01_overview">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Configuration</td>
<td class="">The MP Config component provides a Java API to load and process configuration properties in key/value form into a Config object which the application can use to retrieve config data.
<router-link to="/mp/config/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">CORS Support</td>
<td class="">Although it is possible for any Helidon application to implement its own support for CORS, there are common tasks (such as processing preflight requests) that can be provided in a Helidon module.
<router-link to="/mp/cors/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">GraalVM Native Image Support for Helidon MP</td>
<td class="">GraalVM native-image support is now available for both Helidon MP and Helidon SE. Helidon MP includes support for GraalVM to enable the conversion of Helidon MP applications to native executable code via the native-image utility. <router-link to="/mp/guides/36_graalnative">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">gRPC</td>
<td class="">Helidon gRPC Server provides a framework for creating gRPC (general-purpose Remote Procedure Calls) applications.
<router-link to="#mp/grpc/01_introduction.adoc" @click.native="this.scrollFix('#mp/grpc/01_introduction.adoc')">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Health Checks</td>
<td class="">The health check API combines the statuses of all the dependencies that affect availability and the ability to perform correctly such as network latency and storage.
<router-link to="/mp/health/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">JAX-RS/Jersey</td>
<td class="">Helidon MP supports building RESTful services using JAX-RS/Jersey. <router-link to="/mp/jaxrs/02_server-configuration">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">JSON-P and JSON-B</td>
<td class="">Helidon supports both JSON processing (JSON P) and JSON building (JSON B) APIs.</td>
</tr>
<tr>
<td class="">Metrics</td>
<td class="">Heldion supports both a base set and a Helidon-specific set of metrics that expose information in JSON format (as specified by the MicroProfile Metrics specification) or in plain text (for Prometheus metrics).
<router-link to="/mp/metrics/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">OpenAPI</td>
<td class="">The OpenAPI in Helidon SE allows your Helidon SE application to serve an OpenAPI document that describes your application’s endpoints.
<router-link to="/mp/openapi/01_openapi">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">OpenTracing</td>
<td class="">Helidon includes support for tracing through the OpenTracing APIs. Tracing is integrated with WebServer, gRPC Server, and Security.
<router-link to="/mp/tracing/07_tracing">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Reactive Messaging and Reactive Operators</td>
<td class="">With Helidon MP 2.0 you can now formalize manipulation with reactive streams and reactive messaging. Reactive messaging heavily depends on standardized operators so together they provide great portability between existing implementations. <router-link to="/mp/reactivemessaging/01_introduction">Learn more about Reactive Messaging</router-link> and <router-link to="/mp/reactivestreams/01_overview">Reactive Streams</router-link>.</td>
</tr>
<tr>
<td class="">Security</td>
<td class="">The MP security modules support authentication, authorization, outbound security and audits for your applications.
<router-link to="/mp/security/01_security">Learn more</router-link>.</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Learn about the steps needed to get started with Helidon MP <router-link to="/mp/introduction/02_microprofile">Getting Started</router-link>.</p>

<p>For more information about the Helidon MicroProfile APIs see  <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/wiki/Supported-APIs">the Helidon API Wiki page</a>.</p>

<p>Try the <router-link to="/mp/guides/02_quickstart">Helidon MP quickstart</router-link> to get your
first Helidon MP application up and running in minutes.</p>

</div>
</doc-view>