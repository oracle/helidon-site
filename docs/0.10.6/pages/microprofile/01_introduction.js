<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Microprofile Introduction</dt>
<dd slot="desc"><p>MicroProfile is a platform definition that is familiar to Java EE developers. If you have experience with JAX-RS, JSON-P, and CDI, you
may prefer to use this model.</p>

<p>To extend the functionality of your MicroProfile application, you might also decide to use the Helidon core APIs, especially for
configuration and security.</p>
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
<p>Complete these tasks to get started with your MicroProfile application.</p>


<h3 id="_maven_coordinates">Maven Coordinates</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile.bundles&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-1.1&lt;/artifactId&gt;
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
<p>Jandex is an indexing tool for Weld (CDI implementation) that helps speed up
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