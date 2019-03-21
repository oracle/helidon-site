<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Creating Docker Images</dt>
<dd slot="desc"><p>This guide describes how to create a Docker image for your Helidon
 application, using a Java 8 base image or a custom Java 11 JRE built with
 <code>jlink</code>.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

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
<td>You&#8217;ll also need Java 11 if you want to create custom JRE&#8217;s using <code>jlink</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_java_packaging">Java Packaging</h2>
<div class="section">
<p>The Helidon team recommends setting-up the class-path inside the
 <code>META-INF/MANIFEST.MF</code> file with the <code>Class-Path</code> entry pointing to dependency
 jar files in a co-located <code>lib</code> directory. See the Maven and Gradle
 <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/1.0.2/examples/quickstarts/helidon-quickstart-se">examples</a> for more details on how to package your
 Helidon application.</p>

<p>This approach is a good fit for Docker images:</p>

<ul class="ulist">
<li>
<p>the application code and dependencies can be separate image layers.</p>

</li>
<li>
<p>the image layer containing your dependencies is re-built only when
dependencies are updated.</p>

</li>
<li>
<p>the deployment environment(s) pull the images layer containing your
dependencies only when changed.</p>

</li>
</ul>
<div class="admonition note">
<p class="admonition-textlabel">Why no fat jars?</p>
<p ><p>Fat Jars are jar files that contain the application and its dependencies ; they
 are not optimal for Docker images as it results in a single image layer.</p>
</p>
</div>
</div>

<h2 id="_creating_a_java_8_based_docker_image">Creating a Java 8 Based Docker Image</h2>
<div class="section">
<p>This section describes the Dockerfile provided by the
 <router-link to="#getting-started/02_base-example.adoc" @click.native="this.scrollFix('#getting-started/02_base-example.adoc')">quickstarts</router-link>.</p>

<p>The Dockerfile is located at <code>src/main/docker/Dockerfile</code> and contains the
 following:</p>

<markup
lang="yaml"

>FROM openjdk:8-jre-slim <span class="conum" data-value="1" />

RUN mkdir /app
COPY libs /app/libs <span class="conum" data-value="2" />
COPY ${project.artifactId}.jar /app <span class="conum" data-value="3" />

CMD ["java", "-jar", "/app/${project.artifactId}.jar"] <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">The base image is the Java 8 JRE image provided by the OpenJDK project.</li>
<li data-value="2">First, the application dependencies are copied to <code>/app</code>.</li>
<li data-value="3">Then, the application jar file is copied to <code>/app</code>.</li>
<li data-value="4">The command to start the application.</li>
</ul>
<div class="admonition important">
<p class="admonition-textlabel">Incremental build</p>
<p ><p>When rebuilding an image Docker rebuilds from the first layer that is
 effectively changed. Copying the application jar file after the libraries
 ensures that Docker does not rebuild the prior layers.</p>
</p>
</div>
<div class="admonition note">
<p class="admonition-textlabel">What is ${project.artifactId}?</p>
<p ><p>It&#8217;s a Maven property. The file above is processed during the Maven build, a new
 file is created under the target directory and the property value is expanded.</p>
</p>
</div>
<markup
lang="bash"
title="Build the project"
>mvn package</markup>

<markup
lang="bash"
title="Build the Docker image"
>docker build -t quickstart-se target</markup>

<markup
lang="bash"
title="Run the docker container"
>docker run --rm -p 8080:8080 quickstart-se:latest</markup>

<markup
lang="bash"
title="Ping the application"
>curl -X GET http://localhost:8080/greet</markup>

</div>

<h2 id="_creating_a_docker_image_with_a_custom_jre">Creating a Docker Image with a Custom JRE</h2>
<div class="section">
<p>This section describes how to build an image with a custom Java 11 JRE using
 <code>jlink</code>.</p>

<p>Replace <code>src/main/docker/Dockerfile</code> with the following:</p>

<markup
lang="yaml"

># Multistage Docker build. <span class="conum" data-value="1" />
# Stage 1: Build custom Java 11 JRE and put it in /var/tmp/myjre <span class="conum" data-value="2" />
FROM openjdk:11-slim AS myjre
RUN ["jlink", "--compress=2", "--strip-debug", "--no-header-files", \
     "--add-modules", "java.base,java.logging,java.sql,java.desktop,java.management", \
     "--output", "/var/tmp/myjre"] <span class="conum" data-value="3" />

# Work around for https://github.com/docker-library/openjdk/issues/217 <span class="conum" data-value="4" />
RUN [ "apt", "update"]
RUN [ "apt-get", "install", "-y", "binutils"]
RUN ["strip", "-p", "--strip-unneeded", "/var/tmp/myjre/lib/server/libjvm.so"]
# End work-around

# Stage 2: Build application image using JRE from Stage 1 <span class="conum" data-value="5" />
FROM debian:sid-slim <span class="conum" data-value="6" />
COPY --from=myjre /var/tmp/myjre /opt/jre <span class="conum" data-value="7" />
ENV PATH=$PATH:/opt/jre/bin

RUN mkdir /app
COPY libs /app/libs
COPY ${project.artifactId}.jar /app

CMD ["java", "-jar", "/app/${project.artifactId}.jar"]</markup>

<ul class="colist">
<li data-value="1">This is a multi-stage Docker build. See more info
<a id="" title="" target="_blank" href="https://docs.docker.com/develop/develop-images/multistage-build/">here</a></li>
<li data-value="2">The first stage that creates our custom JRE.</li>
<li data-value="3">The modules listed in this example are for Helidon SE. See below for
Helidon MP.</li>
<li data-value="4">This is a work-around for <a id="" title="" target="_blank" href="https://github.com/docker-library/openjdk/issues/217">https://github.com/docker-library/openjdk/issues/217</a>.</li>
<li data-value="5">The final stage that creates the image for our application.</li>
<li data-value="6">Use <code>debian:sid-slim</code> to match the base image of <code>openjdk:11-slim</code></li>
<li data-value="7">Copy the JRE from the image of the first stage <code>myjre</code></li>
</ul>
<markup
lang="bash"
title="Process the new Dockerfile"
>mvn process-resources</markup>

<markup
lang="bash"
title="Build the Docker image"
>docker build -t java11-quickstart-se target</markup>

<markup
lang="bash"
title="Run the docker container"
>docker run --rm -p 8080:8080 java11-quickstart-se:latest</markup>

<markup
lang="bash"
title="Ping the application"
>curl -X GET http://localhost:8080/greet</markup>

<markup
lang="bash"
title="Take a look at the image size"
>docker images java11-quickstart-se:latest</markup>

<markup
lang="bash"

>REPOSITORY             TAG        IMAGE ID         CREATED             SIZE
java11-quickstart-se   latest     f07a7b8bda78     About a minute ago  136MB</markup>

<div class="admonition note">
<p class="admonition-inline">~140MB is less than the pre-built OpenJDK slim JRE images. Results might
 differ a bit depending on your platform.</p>
</div>

<h3 id="_what_about_helidon_mp">What about Helidon MP?</h3>
<div class="section">
<p>For Helidon MP you need to add a couple more modules to the <code>jlink</code> command:</p>

<markup
lang="yaml"

>RUN ["jlink", "--compress=2", "--strip-debug", "--no-header-files", \
     "--add-modules", \
     "java.base,java.logging,java.sql,java.desktop,java.management,java.naming,jdk.unsupported", \
     "--output", "/var/tmp/myjre"]</markup>

</div>
</div>
</doc-view>