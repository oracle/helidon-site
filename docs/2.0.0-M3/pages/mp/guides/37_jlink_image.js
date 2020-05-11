<doc-view>

<h1 id="_custom_runtime_images_with_jlink">Custom Runtime Images with <code>jlink</code></h1>
<div class="section">
<p>This guide describes how to build a custom runtime image for your Helidon application
using Helidon&#8217;s support for the JDK&#8217;s <code>jlink</code> tool.</p>


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

<h2 id="_verify_java_11_or_newer">Verify Java 11 or Newer</h2>
<div class="section">
<markup
lang="bash"

>$JAVA_HOME/bin/java --version</markup>

</div>

<h2 id="_generate_the_project">Generate The Project</h2>
<div class="section">
<p>Generate the project using the Helidon MP Quickstart Maven archetype.</p>

<markup
lang="bash"

>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.0.0-M3 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<p>The archetype generates a Maven project in your current directory
(for example, <code>helidon-quickstart-mp</code>). Change into this directory and build.</p>

<markup
lang="bash"

>cd helidon-quickstart-mp
mvn package</markup>

<p>At this point you can run the application using the JVM:</p>

<markup
lang="bash"

>java -jar target/helidon-quickstart-mp.jar</markup>

<p>In another shell test an endpoint:</p>

<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>

<p>The application should respond with <code>{"message":"Hello World!"}</code></p>

<p>Now stop the running application (by pressing Ctrl+C).</p>

<p>For more information about the Quickstart application and other enpoints it supports see the
<router-link to="/mp/guides/02_quickstart">Helidon MP quickstart Guide</router-link>.</p>

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

<p>The <code>target/helidon-quickstart-mp</code> directory is a self contained
custom image of your application. It contains your application, its runtime
dependencies and the JDK modules it depends on. You can start your application
using the provide
<code>start</code> script:</p>

<markup
lang="bash"

>./target/helidon-quickstart-mp/bin/start</markup>

</div>

<h3 id="_class_data_sharing_cds_archive">Class Data Sharing (CDS) Archive</h3>
<div class="section">
<p>Aslo included in the custom image is a Class Data Sharing (CDS) archive that
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

>docker build -t helidon-quickstart-mp-jlink -f Dockerfile.jlink .</markup>

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

>docker run --rm -p 8080:8080 helidon-quickstart-mp-jlink:latest</markup>

<p>You can exercise the application&#8217;s endpoints as before.</p>

</div>
</div>

<h2 id="_when_should_you_use_a_custom_runtime_image">When should you use a Custom Runtime Image?</h2>
<div class="section">
<p>Custom runtime images are ideal for use when you want all of the runtime performance of
the JDK JVM in a reasonably compact form.</p>

<p>For cases where absolute minimal startup time and image size are required, then
consider using <router-link to="/mp/guides/36_graalnative">GraalVM Native Images</router-link>.</p>

</div>
</div>
</doc-view>