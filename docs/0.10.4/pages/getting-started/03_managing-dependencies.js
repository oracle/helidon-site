<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Managing Dependencies</dt>
<dd slot="desc"><p>Helidon provides a &#8220;Bill Of Materials&#8221; (BOM) to manage dependencies.
This is a special Maven pom file that provides dependency management.</p>

<p>Using the Helidon BOM allows you to use Helidon component dependencies with a single
 version: the Helidon version.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_the_helidon_bom_pom">The Helidon BOM POM</h2>
<div class="section">
<p>Add the following snippet to your pom.xml file in order to import the Helidon BOM.</p>

<markup
lang="xml"
title="Import the Helidon BOM"
>&lt;dependencyManagement&gt;
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-bom&lt;/artifactId&gt;
            &lt;version&gt;0.10.4&lt;/version&gt;
            &lt;type&gt;pom&lt;/type&gt;
            &lt;scope&gt;import&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/dependencyManagement&gt;</markup>

</div>

<h2 id="_using_helidon_component_dependencies">Using Helidon Component Dependencies</h2>
<div class="section">
<p>Once you have imported the BOM, you can declare dependencies on Helidon components
 without specifying a version.</p>

<markup
lang="xml"
title="Component dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</doc-view>