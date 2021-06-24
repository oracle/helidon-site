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

<p>Using the Helidon BOM allows you to use Helidon component dependencies with a
 single version: the Helidon version.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_the_helidon_application_poms">The Helidon Application POMs</h2>
<div class="section">
<p>If you created your application using the <router-link to="/about/05_cli">Helidon CLI</router-link> or
<router-link to="/about/03_prerequisites">archetypes</router-link> then your
project will have a Helidon Application POM as its parent POM. In this case you
will get Helidon&#8217;s dependency management automatically.</p>

<p>If your project doesn&#8217;t use a Helidon Application POM as its parent, then
you will need to import the Helidon BOM POM.</p>

</div>

<h2 id="_the_helidon_bom_pom">The Helidon BOM POM</h2>
<div class="section">
<p>To import the Helidon BOM POM add the following snippet to your pom.xml file.</p>

<markup
lang="xml"
title="Import the Helidon BOM"
>&lt;dependencyManagement&gt;
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-bom&lt;/artifactId&gt;
            &lt;version&gt;2.3.1&lt;/version&gt;
            &lt;type&gt;pom&lt;/type&gt;
            &lt;scope&gt;import&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/dependencyManagement&gt;</markup>

</div>

<h2 id="_using_helidon_component_dependencies">Using Helidon Component Dependencies</h2>
<div class="section">
<p>Once you have imported the BOM, you can declare dependencies on Helidon
 components without specifying a version.</p>

<markup
lang="xml"
title="Component dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_for_more_information">For More Information</h2>
<div class="section">
<ul class="ulist">
<li>
<p>Maven Build Guide for
<router-link to="/se/guides/25_maven_build">SE</router-link> and
<router-link to="/mp/guides/25_maven_build">MP</router-link></p>

</li>
<li>
<p>Gradle Build Guide for
<router-link to="/se/guides/26_gradle_build">SE</router-link> and
<router-link to="/mp/guides/26_gradle_build">MP</router-link></p>

</li>
</ul>
</div>
</doc-view>