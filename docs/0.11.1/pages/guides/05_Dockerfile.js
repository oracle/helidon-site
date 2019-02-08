<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Creating Docker Images</dt>
<dd slot="desc"><p>Building Docker images for Helidon applications.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_will_learn">What You Will Learn</h2>
<div class="section">
<p>You&#8217;ll learn how to package your Helidon application and its runtime dependencies into a Docker
image that also contains the Java runtime. We&#8217;ll look at three different ways to do this:</p>

<ol style="margin-left: 15px;">
<li>
Using a Java 8 JRE base image

</li>
<li>
Using Java 11 <code>jlink</code> to create a custom JRE

</li>
<li>
Using the <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib">Jib</a> Maven plugin

</li>
</ol>
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
<td><router-link to="/getting-started/01_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
<tr>
<td>You&#8217;ll also need Java 11 if you want to create custom JRE&#8217;s using <code>jlink</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_create_your_application_using_the_helidon_quickstart">Create Your Application Using The Helidon Quickstart</h2>
<div class="section">
<p>Follow the instructions on the <router-link to="/getting-started/02_base-example">Quickstart page</router-link>
to create a Helidon SE project. Once you&#8217;ve run the archetype to create
the project come back here.</p>

</div>

<h2 id="_handling_runtime_dependencies">Handling Runtime Dependencies</h2>
<div class="section">
<p>Build the example:</p>

<markup
lang="bash"

>mvn clean package</markup>

<p>When you run the maven build, you&#8217;ll notice lines like the following:</p>

<div class="listing">
<pre>[INFO] Scanning for projects...
...
[INFO]
[INFO] --- maven-dependency-plugin:2.9:copy-dependencies (copy-dependencies) @ quickstart-se ---
[INFO] Copying netty-transport-4.1.22.Final.jar to /tmp/quickstart-se/target/libs/netty-transport-4.1.22.Final.jar</pre>
</div>

<p>The project uses the <code>maven-dependency-plugin</code> to copy the runtime dependencies to
<code>target/libs/</code>. Additionally the <code>maven-jar-plugin</code> adds a <code>Class-Path</code> entry to the
application&#8217;s jar file so it can find those dependencies at runtime. You can
see that by running:</p>

<markup
lang="bash"

>unzip -p target/quickstart-se.jar META-INF/MANIFEST.MF</markup>

<div class="listing">
<pre>Class-Path: libs/helidon-bundles-webserver-0.10.4.jar libs/helidon-webser
 ver-0.10.4.jar libs/helidon-common-reactive-0.10.4.jar libs/helidon-com
 mon-http-0.10.4.jar libs/helidon-common-key-util-0.10.4.jar libs/helido</pre>
</div>

<p>This means you can easily run the application jar:</p>

<markup
lang="bash"

>java -jar target/quickstart-se.jar</markup>

<p>Now try the application with <code>curl</code>:</p>

<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>

<div class="listing">
<pre>{"message":"Hello World!"}</pre>
</div>

</div>

<h2 id="_creating_a_docker_image_using_a_java_8_base_image">Creating a Docker Image Using a Java 8 Base Image</h2>
<div class="section">
<p>Since the <code>target</code> directory has the application&#8217;s runtime dependencies, the
Dockerfile for our application is pretty simple. You can
find the Dockerfile in the generated project at <code>src/main/docker/Dockerfile</code>.
It should look like this:</p>

<markup
lang="yaml"
title="src/main/docker/Dockerfile"
>FROM openjdk:8-jre-slim

RUN mkdir /app
COPY libs /app/libs
COPY ${project.artifactId}.jar /app

CMD ["java", "-jar", "/app/${project.artifactId}.jar"]</markup>

<ul class="ulist">
<li>
<p>We use a Java 8 JRE image provided by the OpenJDK project.</p>

</li>
<li>
<p>We then create a directory to hold our application and copy the <code>libs</code> directory
into it followed by the application jar. The command to start the application is
just like the one we used when running natively on our desktop.</p>

</li>
</ul>
<p>What is <code>${project.artifactId}</code>? It&#8217;s a Maven property. The project uses
the <code>maven-resources-plugin</code> to filter the Dockerfile while copying it to the
target directory. So this property gets expanded to the project artifactId
(<code>quickstart-se</code> for example).</p>

<p>Since the quickstart project already contains the Dockerfile you can go ahead and try it:</p>

<markup
lang="bash"

>docker build -t quickstart-se target</markup>

<div class="listing">
<pre>Sending build context to Docker daemon  5.641MB
Step 1/5 : FROM openjdk:8-jre-slim
 ---&gt; 3e85180d5f58
Step 2/5 : RUN mkdir /app
 ---&gt; Using cache
 ---&gt; d24e2f320e6b
Step 3/5 : COPY libs /app/libs
 ---&gt; Using cache <span class="conum" data-value="1" />
 ---&gt; 9772d4c5d4a0
Step 4/5 : COPY quickstart-se.jar /app
 ---&gt; f156df1d0338
Step 5/5 : CMD ["java", "-jar", "/app/quickstart-se.jar"]
 ---&gt; Running in 29838194f452
Removing intermediate container 29838194f452
 ---&gt; 6a634dbe3ecf
Successfully built 6a634dbe3ecf
Successfully tagged quickstart-se:latest</pre>
</div>

<ul class="colist">
<li data-value="1">The first time you run <code>docker build</code> you won&#8217;t see <code>Using cache</code> for this
layer, but on subsequent builds you should. This is good. It
means that the image layer that contains our runtime dependencies is
not modified every time we build our application. Only the layer containing
the application jar is. That means if we&#8217;re pushing our Docker image to a
remote registry then the layer with our runtime dependencies does not
need to be pushed every time we rebuild.</li>
</ul>
<p>You can now run the docker container:</p>

<markup
lang="bash"

>docker run --rm -p 8080:8080 quickstart-se:latest</markup>

<markup
lang="bash"

>curl -X GET http://localhost:8080/greet</markup>


<h3 id="_why_no_fat_jar">Why no Fat Jar?</h3>
<div class="section">
<p>Fat Jars are jar files that contain the application and all runtime
dependencies. This is handy because it&#8217;s one file that contains all
you need to run your application.</p>

<p>One problem with fat jars is that they are not optimal when used in
a Docker image. That&#8217;s because the image layer that contains your
application also contains all of its runtime dependencies, and that
means more data to push to a docker registry every time you rebuild
your application.</p>

<p>But Fat Jars can be convenient if you&#8217;re not running in Docker
containers. There is nothing that prevents you from building a
fat jar for your Helidon application. You just need to know what
you are doing and, for example, make sure you aggregate
<code>META-INF/services/</code> from all the individual jar files.</p>

</div>
</div>

<h2 id="_creating_a_docker_image_with_a_custom_jre_using_jlink">Creating a Docker Image with a Custom JRE Using <code>jlink</code></h2>
<div class="section">
<p>In the previous Dockerfile example we used Java 8 and got the
JRE directly from the base OpenJDK Docker image. In this section
we&#8217;ll build our own custom Java 11 JRE using <code>jlink</code>. Here
is what that Dockerfile looks like. Go ahead and replace the
<code>src/main/docker/Dockerfile</code> in your example project with
this one:</p>

<markup
lang="yaml"
title="src/main/docker/Dockerfile"
># Multistage Docker build.
# Stage 1: Build custom Java 11 JRE and put it in /var/tmp/myjre <span class="conum" data-value="1" />
FROM openjdk:11-slim AS myjre
RUN ["jlink", "--compress=2", "--strip-debug", "--no-header-files", \
     "--add-modules", "java.base,java.logging,java.sql,java.desktop,java.management", \
     "--output", "/var/tmp/myjre"]

# Work around for https://github.com/docker-library/openjdk/issues/217 <span class="conum" data-value="2" />
RUN [ "apt", "update"]
RUN [ "apt-get", "install", "-y", "binutils"]
RUN ["strip", "-p", "--strip-unneeded", "/var/tmp/myjre/lib/server/libjvm.so"]
# End work-around

# Stage 2: Build application image using JRE from Stage 1 <span class="conum" data-value="3" />
FROM debian:sid-slim
COPY --from=myjre /var/tmp/myjre /opt/jre
ENV PATH=$PATH:/opt/jre/bin

RUN mkdir /app
COPY libs /app/libs
COPY ${project.artifactId}.jar /app

CMD ["java", "-jar", "/app/${project.artifactId}.jar"]</markup>

<p>This is a little bit more complicated than our first Dockerfile, in part
because of a work-around for an OpenJDK issue. The first thing to notice
is that this is a multi-stage Docker build. That means we&#8217;re going to
build multiple Docker images&#8201;&#8212;&#8201;with later images using content from
earlier images.</p>

<ul class="colist">
<li data-value="1">For the first stage of the build we use a Java 11 base image and we name the image
we are building <code>myjre</code>. We then run <code>jlink</code> to create a JRE with only the modules
we need. We generate that JRE in the Docker image at <code>/var/tmp/myjre</code>.
The modules listed in this example are for Helidon SE.
See below for Helidon MP.</li>
<li data-value="2">Ack! We need to work-around an issue in the openjdk base image&#8201;&#8212;&#8201;basically run
<code>strip</code> on <code>libjvm.so</code>. Why? Go see <a id="" title="" target="_blank" href="https://github.com/docker-library/openjdk/issues/217">https://github.com/docker-library/openjdk/issues/217</a>.
After doing that we have a nice shiny new JRE to use.</li>
<li data-value="3">Now we build the image for our application. We use <code>debian:sid-slim</code> because
that matches the base image used by <code>openjdk:11-slim</code>, so we can be confident
we won&#8217;t have any runtime compatibility issues with the JRE we created.
We copy the JRE from the first image (<code>myjre</code>) into our second image, and
set our <code>PATH</code> so we can find the new JRE. The rest of the file is the same
as before.</li>
</ul>
<p>That&#8217;s it! You&#8217;re Docker image will now run with a custom JRE. Let&#8217;s try it:</p>

<markup
lang="bash"
title="Rebuild project to process Dockerfile and copy to target directory"
>mvn package</markup>

<markup
lang="bash"

>docker build -t java11-quickstart-se target</markup>

<markup
lang="bash"

>docker run --rm -p 8080:8080 java11-quickstart-se:latest</markup>

<p>The first time you run <code>docker build</code> with this Dockerfile it will take a while
as it downloads stuff and installs <code>binutils</code> for the workaround. But subsequent
runs will be much faster, because all those layers will be cached except for
the little layer that contains your application jar.</p>


<h3 id="_what_about_helidon_mp">What about Helidon MP?</h3>
<div class="section">
<p>The only difference for Helidon MP is that you need to add a couple more
modules to the <code>jlink</code> command:</p>

<markup
lang="yaml"

>RUN ["jlink", "--compress=2", "--strip-debug", "--no-header-files" \
     "--add-modules", \
     "java.base,java.logging,java.sql,java.desktop,java.management,java.naming,jdk.unsupported", \
     "--output", "/var/tmp/myjre"]</markup>

</div>
</div>

<h2 id="_creating_a_docker_image_using_jib">Creating a Docker Image Using Jib</h2>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib">Jib</a> is a collection of build tools for
constructing Docker images for Java applications. Jib allows you to build images
straight from a Maven (or Gradle) plugin without the need for the <code>docker</code>
command. It also uses a
<a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/distroless">distroless</a> base image that
can result in a smaller final image.</p>

<p>We&#8217;ll be using the <code>jib-maven-plugin</code> in this example. With
<code>jib-maven-plugin</code>, you don&#8217;t need a Dockerfile
and it creates a final Docker image that follows a set
of best-practices for packaging Java applications in a container.</p>

<p>The <code>docker</code> command is only required if you are going to install the image locally.
It is <strong>not</strong> required to build and <em>push the image</em> to a Docker Registry,
 such as Docker Hub. This can be accomplished via <code>mvn jib:build</code> after
<a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration">configuring which
Registry to connect to</a>.
This fits well in an environment where administrative permissions
 are unavailable on developer machines to install or run Docker.</p>

<p>To add Jib to this example, add the following plugin to the <code>pom.xml</code>.
This adds a goal to the Maven <code>package</code> phase that containerizes
the application using a locally available Docker daemon.</p>

<markup
lang="xml"
title="pom.xml"
>&lt;project&gt;
  ...
  &lt;properties&gt;
    &lt;jib-maven-plugin.version&gt;0.10.1&lt;/jib-maven-plugin.version&gt;
  &lt;/properties&gt;
  ...
  &lt;build&gt;
    &lt;plugins&gt;
      ...
      &lt;plugin&gt;
          &lt;groupId&gt;com.google.cloud.tools&lt;/groupId&gt;
          &lt;artifactId&gt;jib-maven-plugin&lt;/artifactId&gt;
          &lt;version&gt;${jib-maven-plugin.version}&lt;/version&gt;
          &lt;configuration&gt;
              &lt;to&gt;
                  &lt;image&gt;jib-${project.artifactId}&lt;/image&gt;
                  &lt;tags&gt;
                      &lt;tag&gt;${project.version}&lt;/tag&gt;
                      &lt;tag&gt;latest&lt;/tag&gt;
                  &lt;/tags&gt;
              &lt;/to&gt;
              &lt;container&gt;
                  &lt;!-- good defaults intended for containers --&gt;
                  &lt;jvmFlags&gt;
                      &lt;jmxFlag&gt;-server&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-Djava.awt.headless=true&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-XX:+UnlockExperimentalVMOptions&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-XX:+UseCGroupMemoryLimitForHeap&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-XX:InitialRAMFraction=2&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-XX:MinRAMFraction=2&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-XX:MaxRAMFraction=2&lt;/jmxFlag&gt;
                      &lt;jmxFlag&gt;-XX:+UseG1GC&lt;/jmxFlag&gt;
                  &lt;/jvmFlags&gt;

                  &lt;mainClass&gt;${mainClass}&lt;/mainClass&gt;

                  &lt;ports&gt;
                      &lt;port&gt;8080&lt;/port&gt;
                  &lt;/ports&gt;

              &lt;/container&gt;
          &lt;/configuration&gt;
          &lt;executions&gt;
              &lt;execution&gt;
                  &lt;id&gt;dockerBuild&lt;/id&gt;
                  &lt;goals&gt;
                      &lt;goal&gt;dockerBuild&lt;/goal&gt;
                  &lt;/goals&gt;
                  &lt;phase&gt;package&lt;/phase&gt;
              &lt;/execution&gt;
          &lt;/executions&gt;
      &lt;/plugin&gt;
      ...
    &lt;/plugins&gt;
  &lt;/build&gt;
  ...
&lt;/project&gt;</markup>

<p>When running <code>mvn clean package</code> again, we notice the following output.</p>

<div class="listing">
<pre>---
[INFO] --- jib-maven-plugin:0.10.1:dockerBuild (dockerBuild) @ quickstart-se ---
[INFO]
[INFO] Containerizing application to Docker daemon as quickstart-se, quickstart-se:1.0-SNAPSHOT, quickstart-se...
[WARNING] Base image 'gcr.io/distroless/java' does not use a specific image digest - build may not be reproducible
[INFO] Getting base image gcr.io/distroless/java...  <span class="conum" data-value="1" />
[INFO] Building dependencies layer...
[INFO] Building resources layer...
[INFO] Building classes layer...
[INFO] Finalizing...
[INFO]
[INFO] Container entrypoint set to [java, -server, -Djava.awt.headless=true, -XX:+UnlockExperimentalVMOptions,-XX:+UseCGroupMemoryLimitForHeap, -XX:InitialRAMFraction=2, -XX:MinRAMFraction=2, -XX:MaxRAMFraction=2, -XX:+UseG1GC,-XX:MaxGCPauseMillis=100, -XX:+UseStringDeduplication, -cp, /app/resources:/app/classes:/app/libs/*,io.helidon.examples.quickstart.se.Main]
[INFO] Loading to Docker daemon...
[INFO]
[INFO] Built image to Docker daemon as jib-quickstart-se, jib-quickstart-se:1.0-SNAPSHOT, jib-quickstart-se <span class="conum" data-value="2" />
---</pre>
</div>

<ul class="colist">
<li data-value="1">By default, Jib uses <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/distroless/tree/master/java"><code>distroless/java</code></a>
as the base image. This can be overwritten by updating the POM,
or simply adding
<code>-Djib.from.image=openjdk:8-jre-slim</code> in the <code>mvn</code> command invocation, for example.</li>
<li data-value="2">What would a Dockerfile for a Jib-built project look like?
See the <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib/blob/master/docs/faq.md#what-would-a-dockerfile-for-a-jib-built-image-look-like">Jib FAQ</a>.</li>
</ul>
<p><a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#quickstart">See here</a>
for more configuration parameters using <code>jib-maven-plugin</code>.</p>

<p>Now you can run the image:</p>

<markup
lang="bash"

>docker run --rm -p 8080:8080 jib-quickstart-se</markup>

</div>

<h2 id="_how_big_is_this_stuff">How Big is This Stuff?</h2>
<div class="section">
<p>Let&#8217;s take a look.</p>

<markup
lang="bash"
title="Helidon SE Quickstart Application and Runtime Dependencies"
>du -sh target/quickstart-se.jar target/libs</markup>

<div class="listing">
<pre> 12K	target/quickstart-se.jar
5.4M	target/libs</pre>
</div>

<markup
lang="bash"
title="Java 11 JRE for Helidon SE"
>docker run -it --rm java11-quickstart-se:latest  du -sh /opt/jre</markup>

<div class="listing">
<pre>62M	/opt/jre</pre>
</div>

<markup
lang="bash"
title="Java 11 Docker Image for Helidon SE Quickstart Example"
>docker images java11-quickstart-se:latest</markup>

<div class="listing">
<pre>REPOSITORY             TAG        IMAGE ID         CREATED             SIZE
java11-quickstart-se   latest     f07a7b8bda78     About a minute ago  136MB</pre>
</div>

<p>So the application plus Java runtime is less than 70MB which is not
too bad. And the complete Docker image is less than 140MB which is
smaller than the pre-built OpenJDK slim JRE images. Note that your
results might differ a bit depending on your platform.</p>

<markup
lang="bash"
title="Jib Docker Image for Helidon SE Quickstart Example"
>docker images jib-quickstart-se:latest</markup>

<div class="listing">
<pre>REPOSITORY          TAG           IMAGE ID      CREATED        SIZE
jib-quickstart-se   latest        384aebda5594  48 years ago   124MB <span class="conum" data-value="1" /></pre>
</div>

<ul class="colist">
<li data-value="1">Ignore the fact that it says the image was created 48 years ago. Refer to
<a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib/blob/master/docs/faq.md#why-is-my-image-created-48-years-ago">Jib FAQ</a> explaining why this is,
and how to change it.</li>
</ul>
<p>The Jib image is smaller still, because of the use of a distroless base image.</p>

</div>
</doc-view>