<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>MicroProfile Introduction</dt>
<dd slot="desc"><p>MicroProfile is a collection of enterprise Java APIs that should feel familiar to
Java EE developers. MicroProfile includes existing APIs such as JAX-RS, JSON-P and
CDI, and adds additional APIs in areas such as configuration, metrics, fault
tolerance and more.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_getting_started_with_helidon_microprofile">Getting Started with Helidon MicroProfile</h2>
<div class="section">
<p>Helidon MP 2.0.0-M3 supports
MicroProfile 3.2. You can find the exact version of APIs supported on the
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/wiki/Supported-APIs">Helidon Supported APIs</a>
wiki page.</p>

<p>Helidon provides a MicroProfile server implementation (<code>io.helidon.microprofile.server</code>) that
encapsulates the Helidon WebServer. You can either instantiate the server directly
as is done in the
<router-link to="#guides/03_quickstart-mp.adoc" @click.native="this.scrollFix('#guides/03_quickstart-mp.adoc')">Helidon MP Quickstart example</router-link>
or use its built-in <code>main</code> as shown below.</p>

<p>Complete these tasks to get started with your MicroProfile application.</p>


<h3 id="_maven_coordinates">Maven Coordinates</h3>
<div class="section">
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes
how you should declare dependency management for Helidon applications.
Then declare the following dependency in your project:</p>

<markup
lang="xml"
title="Maven Dependency for full MicroProfile"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile.bundles&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>The above dependency adds all the features available in MicroProfile. If you
want to start with a smaller core set of features then you can use the
<code>core</code> bundle instead. This bundle includes the base feature in MicroProfile
(such as JAX-RS, CDI, JSON-P/B, and Config) and leaves out some of the
additional features such as Metrics and Tracing. You can add those dependencies
individually if you choose.</p>

<markup
lang="xml"
title="Maven Dependency for MicroProfile core features only"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile.bundles&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-core&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 id="_project_files">Project files</h3>
<div class="section">
<p>Create a JAX-RS Resource class with at least one resource method.</p>

<markup
lang="java"
title="Sample JAX-RS Resource Class"
>@Path("/")
@RequestScoped
public class HelloWorldResource {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String message() {
        return "Hello World";
    }
}</markup>

<p>And create a JAX-RS application.</p>

<markup
lang="java"
title="Sample JAX-RS Application"
>@ApplicationScoped
@ApplicationPath("/")
public class HelloWorldApplication extends Application {
    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        return Set.of(
                HelloWorldResource.class
        );
    }
}</markup>

<p>Add <code>beans.xml</code> in <code>src/main/resources/META-INF</code> so
the CDI implementation can pick up your classes.</p>

<markup
lang="xml"
title="beans.xml"
>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans/&gt;</markup>

<p>As a last step, add a main method to your application (or a dedicated Main class)
 to start everything up.</p>

<markup
lang="java"
title="Sample JAX-RS Application"
>public static void main(String[] args) {
    io.helidon.microprofile.server.Main.main(args);
}</markup>

<p>Run the main class. The server will start on port 7001 and serve your
 resources.</p>

</div>

<h3 id="_adding_jandex">Adding Jandex</h3>
<div class="section">
<p>Jandex is an indexing tool for Weld (the CDI implementation used by Helidon) that helps speed up
the boot time of an application.</p>

<p>To use Jandex, configure a Maven plugin that adds the index to your
 JAR file and a dependency on Jandex.</p>

<markup
lang="xml"
title="jandex dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;org.jboss&lt;/groupId&gt;
    &lt;artifactId&gt;jandex&lt;/artifactId&gt;
    &lt;version&gt;2.0.4.Final&lt;/version&gt;
&lt;/dependency&gt;</markup>

<markup
lang="xml"
title="jandex plugin configuration"
>&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.jboss.jandex&lt;/groupId&gt;
            &lt;artifactId&gt;jandex-maven-plugin&lt;/artifactId&gt;
            &lt;version&gt;1.0.5&lt;/version&gt;
            &lt;executions&gt;
                &lt;execution&gt;
                    &lt;id&gt;make-index&lt;/id&gt;
                    &lt;goals&gt;
                        &lt;goal&gt;jandex&lt;/goal&gt;
                    &lt;/goals&gt;
                    &lt;phase&gt;process-classes&lt;/phase&gt;
                &lt;/execution&gt;
            &lt;/executions&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;</markup>

</div>
</div>
</doc-view>