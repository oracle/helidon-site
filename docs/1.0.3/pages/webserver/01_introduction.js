<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebServer Introduction</dt>
<dd slot="desc"><p>WebServer provides an asynchonous and reactive API for creating web applications.
The API is inspired by popular NodeJS and Java frameworks.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_quick_start">Quick Start</h2>
<div class="section">
<p>Here is the code for a minimalist web application that runs on a random free port:</p>

<markup
lang="java"

>    public static void main(String[] args) throws Exception {
        WebServer webServer = WebServer
                .create(Routing.builder()
                        .any((req, res) -&gt; res.send("It works!")) <span class="conum" data-value="1" />
                        .build())
                .start() <span class="conum" data-value="2" />
                .toCompletableFuture()
                .get(10, TimeUnit.SECONDS); <span class="conum" data-value="3" />

        System.out.println("Server started at: http://localhost:" + webServer.port()); <span class="conum" data-value="4" />
    }</markup>

<ul class="colist">
<li data-value="1">For any kind of request, at any path, respond with <code>It works!</code>.</li>
<li data-value="2">Start the server.</li>
<li data-value="3">Wait for the server to start while throwing possible errors as exceptions.</li>
<li data-value="4">The server is bound to a random free port.</li>
</ul>
</div>

<h2 id="_maven_coordinates">Maven Coordinates</h2>
<div class="section">
<p>The <router-link to="#getting-started/03_managing-dependencies.adoc" @click.native="this.scrollFix('#getting-started/03_managing-dependencies.adoc')">Getting Started</router-link> page describes how you
should declare dependency management for Helidon applications. Then declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver&lt;/artifactId&gt; <span class="conum" data-value="1" />
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">Dependency on WebServer.</li>
</ul>
</div>
</doc-view>