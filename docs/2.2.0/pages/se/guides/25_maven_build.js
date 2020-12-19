<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Maven Guide</dt>
<dd slot="desc"><p>This guide describes Helidon&#8217;s support for Maven projects.</p>
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
<p>Helidon supports Maven by providing the following:</p>

<ol style="margin-left: 15px;">
<li>
The Helidon Application parent POM

</li>
<li>
Dependency managment via the Helidon BOM and Dependencies POMs

</li>
<li>
The <code>helidon-maven-plugin</code>

</li>
</ol>
</div>

<h2 id="_the_helidon_application_pom">The Helidon Application POM</h2>
<div class="section">
<p>Helidon examples and projects generated using the <router-link to="/se/guides/02_quickstart">Helidon Quickstart</router-link>
use a Helidon application POM as their parent. This parent POM provides the following:</p>

<ol style="margin-left: 15px;">
<li>
Helidon dependency management.

</li>
<li>
Maven plugin configurations to help in the building and packaging of your
Helidon application.

</li>
</ol>
<p>If you want to use your own parent POM, then take a look at the
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.2.0/examples/quickstarts/helidon-standalone-quickstart-se">standalone quickstart example</a>.
This example has a stand-alone POM that you can pattern your own application POM after.</p>

<p>For more details on Helidon application POMs see the
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/blob/2.2.0/docs-internal/application-pom.md">Helidon&#8217;s Application POMS</a></p>

</div>

<h2 id="_dependency_management">Dependency Management</h2>
<div class="section">
<p>In Maven you use Dependency Management to manage the versions of the
dependencies used by your project so that you do not need to specify
versions when declaring project dependencies.</p>

<p>Helidon provides two POMs that are used together for dependency management:</p>

<ol style="margin-left: 15px;">
<li>
The Helidon Bill of Materials (BOM) POM (<code>io.helidon:helidon-bom</code>): manages the version
of Helidon artifacts (to align with the Helidon version).

</li>
<li>
The Helidon Dependencies POM (<code>io.helidon:helidon-dependencies</code>): manages the versions of third party
dependencies to ensure consistency across Helidon and your Helidon application.
Inherits the Helidon BOM POM.

</li>
</ol>
<p>When you use a Helidon Application POM as your project&#8217;s parent pom, you
inheritent Helidon&#8217;s dependency management. If
you have your own parent, then you can import Helidon dependency management
like this:</p>

<markup
lang="xml"
title="Import Helidon Dependency Management"
>&lt;dependencyManagement&gt;
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-dependencies&lt;/artifactId&gt;
            &lt;version&gt;2.2.0&lt;/version&gt;
            &lt;type&gt;pom&lt;/type&gt;
            &lt;scope&gt;import&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/dependencyManagement&gt;</markup>

<p>You then declare dependencies on Helidon (and other) components without specifying a version.</p>

<markup
lang="xml"
title="Component dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_the_helidon_maven_plugin">The <code>helidon-maven-plugin</code></h2>
<div class="section">
<p>Helidon provides a Maven plugin that, among other things, provides the following goals:</p>

<ol style="margin-left: 15px;">
<li>
native-image: Build a <router-link to="/se/guides/36_graalnative">GraalVM native image</router-link>.

</li>
<li>
jlink-image:  Build a <router-link to="/se/guides/37_jlink_image">custom runtime Java image</router-link>.

</li>
</ol>
<p>For full documentation of the plugin please see the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon-build-tools/tree/master/helidon-maven-plugin">Helidon Maven Plugin README</a>.</p>

<p>If you use the Helidon application parent POM you will have this plugin configured
for you. If you need to customize the <code>helidon-maven-plugin</code> you can do so in a few ways:</p>

<ol style="margin-left: 15px;">
<li>
Passing system properties to Maven on the command line.

</li>
<li>
Setting system properties in your project&#8217;s <code>pom.xml</code>

</li>
<li>
Overriding the plugin configuration by using <code>pluginManagment</code>

</li>
</ol>

<h3 id="_pass_property_on_command_line">Pass Property on Command Line</h3>
<div class="section">
<p>You can override many of the plugin attributes by passing a system property to the
<code>mvn</code> command:</p>

<markup


>mvn -Djlink.image.addClassDataSharingArchive=false ...</markup>

</div>

<h3 id="_set_property_in_pom_xml">Set Property in pom.xml</h3>
<div class="section">
<p>Or you can set the properties in your project&#8217;s pom.xml:</p>

<markup


>&lt;properties&gt;
    &lt;jlink.image.addClassDataSharingArchive&gt;false&lt;/jlink.image.addClassDataSharingArchive&gt;
    &lt;native.image.reportExceptionStackTraces&gt;true&lt;/native.image.reportExceptionStackTraces&gt;
&lt;/properties&gt;</markup>

</div>

<h3 id="_override_plugin_configuration_using_pluginmanagement">Override Plugin Configuration using <code>pluginManagement</code></h3>
<div class="section">
<p>For full control you can override the plugin&#8217;s configuration using <code>pluginManagement</code>:</p>

<markup
lang="xml"
title="Turn off generation of the CDS Archive when generating a custom Java runtime image"
>    &lt;build&gt;
        &lt;pluginManagement&gt;
            &lt;plugins&gt;
                &lt;plugin&gt;
                    &lt;groupId&gt;io.helidon.build-tools&lt;/groupId&gt;
                    &lt;artifactId&gt;helidon-maven-plugin&lt;/artifactId&gt;
                    &lt;executions&gt;
                        &lt;execution&gt;
                            &lt;id&gt;jlink-image&lt;/id&gt;
                            &lt;configuration&gt;
                                &lt;addClassDataSharingArchive&gt;false&lt;/addClassDataSharingArchive&gt;
                            &lt;/configuration&gt;
                        &lt;/execution&gt;
                    &lt;/executions&gt;
                &lt;/plugin&gt;
            &lt;/plugins&gt;
        &lt;/pluginManagement&gt;
    &lt;/build&gt;</markup>

<markup
lang="xml"
title="Override final name of native image binary"
>    &lt;build&gt;
        &lt;pluginManagement&gt;
            &lt;plugins&gt;
                &lt;plugin&gt;
                    &lt;groupId&gt;io.helidon.build-tools&lt;/groupId&gt;
                    &lt;artifactId&gt;helidon-maven-plugin&lt;/artifactId&gt;
                    &lt;executions&gt;
                        &lt;execution&gt;
                            &lt;id&gt;native-image&lt;/id&gt;
                            &lt;configuration&gt;
                                &lt;finalName&gt;my-fantastic-service&lt;/finalName&gt;
                            &lt;/configuration&gt;
                        &lt;/execution&gt;
                    &lt;/executions&gt;
                &lt;/plugin&gt;
            &lt;/plugins&gt;
        &lt;/pluginManagement&gt;
    &lt;/build&gt;</markup>

</div>
</div>
</doc-view>