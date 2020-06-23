<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE</dt>
<dd slot="desc"><p>Helidon is a collection of Java libraries for writing microservices. Helidon
offers two programming models: Helidion SE and Helidon MP.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_about_helidon_se_components">About Helidon SE Components</h2>
<div class="section">
<p>Helidon SE is a compact toolkit that embraces the latest Java SE features:
reactive streams, asynchrous and functional programming, and fluent-style
APIs.</p>

<p>The REST framework for Helidon SE is the Helidon WebServer. It&#8217;s built on top
of Netty and uses a straight forward request routing API and supports a
number of additional Helidon features:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 75%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">Reactive Web Server</td>
<td class="">WebServer provides an asynchonous and reactive API for creating web applications. The API is inspired by popular NodeJS and Java frameworks.
<router-link to="/se/webserver/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Health Checks</td>
<td class="">The health check API combines the statuses of all the dependencies that affect availability and the ability to perform correctly such as network latency and storage. <router-link to="/se/health/01_health">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">gRPC</td>
<td class="">Helidon gRPC Server provides a framework for creating gRPC (general-purpose Remote Procedure Calls) applications.
<router-link to="/se/grpc/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Configuration</td>
<td class="">The Config component provides a Java API to load and process configuration properties in key/value form into a Config object which the application can use to retrieve config data.
<router-link to="/se/config/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Metrics</td>
<td class="">Heldion supports both a base set and a Helidon-specific set of metrics that expose information in JSON format (as specified by the MicroProfile Metrics specification) or in plain text (for Prometheus metrics).
<router-link to="/se/metrics/01_metrics">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Helidon DB Client</td>
<td class="">The new Helidon SE DB Client for Helidon 2.0 provides a unified, reactive API for working with databases in non-blocking way.
<router-link to="/se/dbclient/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Security</td>
<td class="">The security modules modules support authentication, authorization, outbound security and audits for your applications.
<router-link to="/se/security/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">CORS Support</td>
<td class="">Although it is possible for any Helidon application to implement its own support for CORS, there are common tasks (such as processing preflight requests) that can be provided in a Helidon module. <router-link to="/se/cors/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">OpenTracing</td>
<td class="">Helidon includes support for tracing through the OpenTracing APIs. Tracing is integrated with WebServer, gRPC Server, and Security.
<router-link to="/se/tracing/01_tracing">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Helidon Web Client</td>
<td class="">The new Helidon WebClient for Helidon SE 2.0 allows you to perform any HTTP requests to the target endpoint (via GET, PUT, etc.), and handle the provided response in a reactive way.
<router-link to="/se/webclient/01_introduction">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">OpenAPI</td>
<td class="">The OpenAPI in Helidon SE allows your Helidon SE application to serve an OpenAPI document that describes your application’s endpoints.
<router-link to="/se/openapi/01_openapi">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">GraalVM Native Image support</td>
<td class="">Helidon SE supports GraalVM native images for small footprint and lightening fast startup. <router-link to="/se/guides/36_graalnative">Learn more</router-link>.</td>
</tr>
<tr>
<td class="">Netty I/O Client-Server Framework</td>
<td class="">Helidon runs on top of Netty so there is no need for an application server. It is not derived from a Java EE application server. That means your cloud native application is compact and efficient without unnecessary overhead or bloat.</td>
</tr>
<tr>
<td class="">JSON-P and JSON-B</td>
<td class="">Helidon supports both JSON processing (JSON P) and JSON building (JSON B) APIs.</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Try the <router-link to="/se/guides/02_quickstart">Helidon SE quickstart</router-link> to get your
first Helidon SE application up and running in minutes.</p>

</div>
</doc-view>