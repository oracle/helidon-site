<doc-view>

<h2 >Introduction</h2>
<div class="section">
<p>Helidon is a collection of Java libraries for writing microservices.
There is no unique tooling or deployment model. Your microservice is
just a Java SE application.</p>

<p>The foundation of Helidon is composed of three components:</p>

<v-layout row wrap class="mb-5">
<v-flex xs12>
<v-container fluid grid-list-md class="pa-0">
<v-layout row wrap class="pillars">
<v-flex xs12 sm4 lg3>
<v-card>
<v-layout align-center justify-center class="pa-5">
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
A programmatic HTTP API with reactive features, powered by Netty.
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<v-layout align-center justify-center class="pa-5">
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
A flexible configuration framework with support for multiple sources and formats.
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<v-layout align-center justify-center class="pa-5">
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
A tool-chain to handle authentication, authorization and context propagation.
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>
</v-flex>
</v-layout>
</div>

<h2 >MicroProfile</h2>
<div class="section">
<p>On top of this foundation Helidon supports the MicroProfile family of APIs,
 including JAX-RS and CDI. This means you can choose from one of two
 programming models:</p>

<ul class="ulist">
<li>
<p>Helidon SE: a functional programming style that uses the Helidon WebServer,
Config and Security APIs directly. This gives you full
transparency and control.</p>

</li>
<li>
<p>Helidon MP: a more declarative model that supports the <a id=""
title=""
target="_blank"
href="https://microprofile.io">MicroProfile</a>
family of APIs. This will be familiar to Java EE developers.</p>

</li>
</ul>
<p>Our <router-link to="/getting-started/02_base-example">Quickstart Examples</router-link> gets
you started using either of these programming models.</p>


<h3 >Docker and Kubernetes support</h3>
<div class="section">
<p>The <router-link to="/getting-started/02_base-example">Helidon Quickstart Examples</router-link> contain
support for Docker and Kubernetes. Just follow the examples and you&#8217;ll have
a simple service up and running in minutes.</p>

</div>
</div>
</doc-view>