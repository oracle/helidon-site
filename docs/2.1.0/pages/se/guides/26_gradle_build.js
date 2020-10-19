<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Gradle Guide</dt>
<dd slot="desc"><p>This guide describes Helidon&#8217;s support for Gradle projects.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>While most of Helidon&#8217;s examples use Maven, you can also use Helidon
with a Gradle project. We recommend Gradle 6+.</p>

</div>

<h2 id="_gradle_example">Gradle Example</h2>
<div class="section">
<p>The Helidon
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.1.0/examples/quickstarts/helidon-quickstart-se">Quickstart Example</a>
contains a <code>build.gradle</code> file that you can use as an example for building
your Helidon application using Gradle.</p>

</div>

<h2 id="_dependency_management">Dependency Management</h2>
<div class="section">
<p>Gradle supports using a Maven POM to perform dependency management. You
can use the Helidon Dependencies POM for this purpose. Once you import
the Helidon dependency management POM you can specify dependencies
without providing a version.</p>

<markup
lang="xml"
title="Using the Helidon Dependencies POM"
>dependencies {
    // import Helidon dependency management
    implementation platform("io.helidon:helidon-dependencies:${project.helidonversion}")

    implementation 'io.helidon.microprofile.bundles:helidon-microprofile'
    implementation 'org.glassfish.jersey.media:jersey-media-json-binding'

    runtimeOnly 'org.jboss:jandex'
    runtimeOnly 'javax.activation:javax.activation-api'

    testCompileOnly 'org.junit.jupiter:junit-jupiter-api:'
}</markup>

</div>
</doc-view>