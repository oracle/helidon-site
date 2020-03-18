<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>GraalVM Native Images</dt>
<dd slot="desc"><p>This guide describes how to build a GraalVM native image for a Helidon SE application.</p>
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
<p><a id="" title="" target="_blank" href="https://www.graalvm.org/docs/reference-manual/aot-compilation/">Native images</a> are ahead-of-time compiled Java code that result in a self
contained native executable. When used appropriately native images have dramatically faster
startup and lower runtime memory overhead compared to a Java VM.</p>

<p>In this guide you will learn how to build a native image locally on your machine, as well as using Docker.</p>

</div>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">

<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>About 10 minutes</td>
</tr>
<tr>
<td><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
<tr>
<td>GraalVM CE <a id="" title="" target="_blank" href="https://www.graalvm.org/downloads">19.2+ or 19.3+</a></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_install_graalvm_and_the_native_image_command">Install GraalVM and the Native Image Command</h2>
<div class="section">
<p>After <a id="" title="" target="_blank" href="https://github.com/oracle/graal/releases">downloading and installing</a> GraalVM,
set the <code>GRAALVM_HOME</code> environment variable to point at your GraalVM installation.</p>

<markup
lang="bash"

># Your path might be different
export GRAALVM_HOME=/usr/local/graalvm-ce-19.2.0/Contents/Home/</markup>

<p>Then install the optional <code>native-image</code> command:</p>

<markup
lang="bash"

>$GRAALVM_HOME/bin/gu install native-image</markup>

<p>And verify:</p>

<markup
lang="bash"

>$GRAALVM_HOME/bin/java -version
$GRAALVM_HOME/bin/native-image --version</markup>

</div>

<h2 id="_generate_the_project">Generate The Project</h2>
<div class="section">
<p>Generate the project using the Helidon SE Quickstart Maven archetype.</p>

<markup
lang="bash"

>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=1.4.3 \
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
<router-link to="/guides/02_quickstart-se">Helidon SE Quickstart Guide</router-link>.</p>

</div>

<h2 id="_building_a_native_image">Building a Native Image</h2>
<div class="section">
<p>You can build a native executable in 2 different ways:</p>

<ul class="ulist">
<li>
<p>With a local installation of GraalVM</p>

</li>
<li>
<p>Using Docker</p>

</li>
</ul>

<h3 id="_local_build">Local build</h3>
<div class="section">
<p>Make sure you have GraalVM locally installed:</p>

<markup
lang="bash"

>$GRAALVM_HOME/bin/native-image --version</markup>

<p>Build the native image using the native image profile:</p>

<markup
lang="bash"

>mvn package -Pnative-image</markup>

<div class="admonition tip">
<p class="admonition-textlabel">Tip</p>
<p >This uses the <code>helidon-maven-plugin</code> to perform the native compilation using your installed
copy of GraalVM. It might take a little while to complete.</p>
</div>
<p>Once it completes start the application using the native executable (no JVM!):</p>

<markup
lang="bash"

>./target/helidon-quickstart-se</markup>

<p>Yep, it starts fast. You can exercise the application&#8217;s endpoints as before.</p>

</div>

<h3 id="_multi_stage_docker_build">Multi-stage Docker build</h3>
<div class="section">
<p>Build the "native" Docker Image</p>

<markup
lang="bash"

>docker build -t helidon-quickstart-se-native -f Dockerfile.native .</markup>

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

>docker run --rm -p 8080:8080 helidon-quickstart-se-native:latest</markup>

<p>Again, it starts fast. You can exercise the application&#8217;s endpoints as before.</p>

</div>
</div>

<h2 id="_how_small_and_fast_is_this">How small and fast is this?</h2>
<div class="section">
<p>First let&#8217;s take a look at the Docker image size:</p>

<markup
lang="bash"

>docker images helidon-quickstart-se-native:latest</markup>

<div class="listing">
<pre>REPOSITORY             TAG       IMAGE ID       CREATED        SIZE
quickstart-se-native   latest    1227ac82d199   5 days ago     21.4MB</pre>
</div>

<p>That&#8217;s much smaller than a Docker image with the application code plus
the JRE and operating system files needed to run it.</p>

<p>Startup times are quite impressive. These are just some informal numbers
to show the magnitude of speed-up. Your mileage may vary:</p>


<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>Helidon SE Quickstart Java VM</td>
<td>0.921 seconds</td>
</tr>
<tr>
<td>Helidon SE Quickstart Native</td>
<td>0.026 seconds</td>
</tr>
</tbody>
</table>
</div>
<p>The startup time for Helidon SE with the normal Java VM is quite good
at under a second. But the native executable is an order of magnitude
faster. Memory footprint is similarly improved.</p>

</div>

<h2 id="_when_should_i_use_native_images">When should I use Native Images?</h2>
<div class="section">
<p>Native images are ideal for applications with high horizontal scalability requirements where
the ability to rapidly scale out to numerous instances is important.</p>

<p>That said, native images do have some <a id="" title="" target="_blank" href="https://github.com/oracle/graal/blob/master/substratevm/LIMITATIONS.md">limitations</a>,
and for long running applications where startup and footprint are less of a priority, the Java SE
HotSpot VM might be more appropriate.</p>

</div>

<h2 id="_what_about_helidon_mp">What about Helidon MP?</h2>
<div class="section">
<p>Currently GraalVM native image support is only available for Helidon SE.</p>

</div>
</doc-view>