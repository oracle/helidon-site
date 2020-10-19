<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE</dt>
<dd slot="desc"><p>Helidon SE is a compact toolkit that embraces the latest Java SE features:
reactive streams, asynchrous and functional programming, and fluent-style
APIs.</p>
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
<p>The REST framework for Helidon SE is the Helidon WebServer. It is built on top of Netty and uses a straight forward request routing API.</p>

<p>Helidon SE supports a number of additional Helidon features:</p>

</div>

<h2 id="_components">Components</h2>
<div class="section">
<v-layout row wrap class="mb-5">
<v-flex xs12>
<v-container fluid grid-list-md class="pa-0">
<v-layout row wrap class="pillars">
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/aot/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">save</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Ahead-of-Time Compilation (AOT)</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Use GraalVM native image to compile Helidon applications into a native executable.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/config/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">settings</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Config</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>A flexible configuration framework with support for multiple sources and
formats.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/cors/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">share</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">CORS</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Add support for CORS to your application using a Helidon module.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/dbclient/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">storage</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">DB Client</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Provides a unified, reactive API for working with databases in non-blocking way.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/grpc/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">swap_horiz</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">gRPC</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Build gRPC servers and clients.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/health/01_health"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">favorite_outline</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Health Checks</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Expose health statuses of your applications.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/metrics/01_metrics"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">av_timer</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Metrics</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Instrumentation to expose metrics of your applications.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/openapi/01_openapi"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">donut_large</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">OpenAPI</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Support OpenAPI from your application.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/reactivemessaging/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">message</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Reactive Messaging</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Use prepared tools for repetitive use case scenarios.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/reactivestreams/01_overview"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">waves</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Reactive Streams</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>APIs to work with reactive streams in Helidon.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/security/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">security</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Security</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>A tool-chain to handle authentication, authorization and context propagation.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/tracing/01_tracing"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">timeline</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Tracing</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Profile and monitor your applications across multiple services.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/webclient/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">http</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">WebClient</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>HTTP client that handles responses to the HTTP requests in a reactive way.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/webserver/01_introduction"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">settings_ethernet</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">WebServer</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>A programmatic HTTP API with reactive features, powered by Netty.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/websocket/01_overview"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">timeline</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">WebSocket</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Enables Java applications to participate in WebSocket interactions as both servers and clients.</p>
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>
</v-flex>
</v-layout>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Try the Helidon SE quickstart guides to get your
first Helidon SE application up and running in minutes.</p>

<v-layout row wrap class="mb-5">
<v-flex xs12>
<v-container fluid grid-list-md class="pa-0">
<v-layout row wrap class="pillars">
<v-flex xs12 sm4 lg3>
<v-card>
<router-link to="/se/guides/01_overview"><div class="card__link-hover"/>
</router-link>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">explore</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Guides</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Follow step-by-step guides to build your applications using Helidon SE.</p>
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<a id="" title="" target="_blank" href="apidocs/index.html?overview-summary.html"><div class="card__link-hover"/>
</a>
<v-layout align-center justify-center class="">
<v-avatar size="150px">
<v-icon class="xxx-large">library_books</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Javadocs</span>
</v-card-title>
<v-card-text class="caption">
<p></p>
<p>Browse the Helidon Javadocs.</p>
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>
</v-flex>
</v-layout>
</div>
</doc-view>