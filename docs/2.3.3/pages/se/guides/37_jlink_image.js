<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Custom Runtime Images with `jlink`</dt>
<dd slot="desc"><p>This guide describes how to build a custom runtime image for your Helidon application
using Helidon&#8217;s support for the JDK&#8217;s <code>jlink</code> tool.</p>
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
<p>JDK 9 introduced the <a id="" title="" target="_blank" href="https://docs.oracle.com/en/java/javase/11/tools/jlink.html"><code>jlink</code></a>
command that supports assembling a set of modules and their dependencies into a custom
runtime image. The <code>helidon-maven-plugin</code> has support for easily creating a custom runtime image for your
Helidon application resulting in a smaller, better performing runtime.</p>

<p>In this guide you will learn how to build a custom runtime image locally on your machine,
as well as how to build it in a Docker image.</p>

</div>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">

<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">About 10 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_verify_jdk">Verify JDK</h2>
<div class="section">
<p>JDK 11 or newer is required.</p>

<markup
lang="bash"

>$JAVA_HOME/bin/java --version</markup>

<p>Creating a custom runtime image requires that the JDK modules are present as <code>*.jmod</code> files, and some distributions
do not provide them by default. Check the <code>jmods</code> directory to ensure they are present:</p>

<markup
lang="bash"

>ls $JAVA_HOME/jmods</markup>

<div class="admonition tip">
<p class="admonition-textlabel">OpenJDK on Linux</p>
<p ><a id="" title="" target="_blank" href="https://en.wikipedia.org/wiki/List_of_Linux_distributions#RPM-based">RPM based</a> distributions provide <code>*.jmod</code> files in separate
<code>java-*-openjdk-jmods</code> packages.
<a id="" title="" target="_blank" href="https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based">Debian based</a> distributions provide <code>*.jmod</code> files only
in the <code>openjdk-*-jdk-headless</code> packages.</p>
</div>
</div>

<h2 id="_generate_the_project">Generate The Project</h2>
<div class="section">
<p>Generate the project using the Helidon SE Quickstart Maven archetype.</p>

<markup
lang="bash"

>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=2.3.3 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

<p>The archetype generates a Maven project in your current directory
(for example, <code>helidon-quickstart-se</code>). Change into this directory and build.</p>

<markup
lang="bash"

>cd helidon-quickstart-se
mvn package</markup>

<p>At this point you can run the application using the JVM:</p>

<markup
lang="bash"

>java -jar target/helidon-quickstart-se.jar</markup>

<p>In another shell test an endpoint:</p>

<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>

<p>The application should respond with <code>{"message":"Hello World!"}</code></p>

<p>Now stop the running application (by pressing Ctrl+C).</p>

<p>For more information about the Quickstart application and other enpoints it supports see the
<router-link to="/se/guides/02_quickstart">Helidon SE quickstart Guide</router-link>.</p>

</div>

<h2 id="_building_a_custom_runtime_image">Building a Custom Runtime Image</h2>
<div class="section">
<p>You can build a custom runtime image in 2 different ways:</p>

<ul class="ulist">
<li>
<p>Locally, on your desktop</p>

</li>
<li>
<p>Using Docker</p>

</li>
</ul>

<h3 id="_local_build">Local build</h3>
<div class="section">
<p>Build the custom runtime image using the jlink image profile:</p>

<markup
lang="bash"

>mvn package -Pjlink-image</markup>

<div class="admonition tip">
<p class="admonition-textlabel">Tip</p>
<p >This uses the <code>helidon-maven-plugin</code> to perform the custom image generation.</p>
</div>
<p>After the build completes it will report some statistics about the build including
the reduction in image size.</p>

<p>The <code>target/helidon-quickstart-se-jri</code> directory is a self contained
custom image of your application. It contains your application, its runtime
dependencies and the JDK modules it depends on. You can start your application
using the provide
<code>start</code> script:</p>

<markup
lang="bash"

>./target/helidon-quickstart-se-jri/bin/start</markup>

</div>

<h3 id="_class_data_sharing_cds_archive">Class Data Sharing (CDS) Archive</h3>
<div class="section">
<p>Also included in the custom image is a Class Data Sharing (CDS) archive that
improves your application&#8217;s startup performance and in-memory footprint.
You can learn more about Class Data Sharing in the
<a id="" title="" target="_blank" href="https://docs.oracle.com/en/java/javase/11/vm/class-data-sharing.html">JDK documentation</a>.</p>

<p>The CDS archive increases your image size to get these performance optimizations.
It can be of significant size (tens of MB). The size of the CDS archive is
reported at the end of the build output.</p>

<p>If you&#8217;d rather have a smaller image size (with a slightly increased startup time) you
can skip the creation of the CDS archive by executing your build like this:</p>

<markup
lang="bash"

>mvn package -Pjlink-image -Djlink.image.addClassDataSharingArchive=false</markup>

<p>For more information on available configuration options see the
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon-build-tools/tree/master/helidon-maven-plugin"><code>helidon-maven-plugin</code> documentation</a>.</p>

</div>

<h3 id="_multi_stage_docker_build">Multi-stage Docker build</h3>
<div class="section">
<p>To build a Docker image with a custom Java runtime image use the jlink
Dockerfile included with the quickstart.</p>

<markup
lang="bash"

>docker build -t helidon-quickstart-se-jri -f Dockerfile.jlink .</markup>

<div class="admonition tip">
<p class="admonition-textlabel">Tip</p>
<p >This does a full build inside the Docker container. The first
time you run it, it will take a while because it is downloading all
of the Maven dependencies and caching them in a Docker layer.
Subsequent builds will be much faster as long as you don&#8217;t change
the <code>pom.xml</code> file. If the pom is modified then the dependencies
will be re-downloaded.</p>
</div>
<p>Start the application:</p>

<markup
lang="bash"

>docker run --rm -p 8080:8080 helidon-quickstart-se-jri:latest</markup>

<p>You can exercise the application&#8217;s endpoints as before.</p>

</div>
</div>

<h2 id="_when_should_you_use_a_custom_runtime_image">When should you use a Custom Runtime Image?</h2>
<div class="section">
<p>Custom runtime images are ideal for use when you want all of the runtime performance of
the JDK JVM in a reasonably compact form.</p>

<p>For cases where absolute minimal startup time and image size are required, then
consider using <router-link to="/se/guides/36_graalnative">GraalVM Native Images</router-link>.</p>

</div>
</doc-view>