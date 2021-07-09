<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Build Container Images with Jib</dt>
<dd slot="desc"><p>This guide describes how to build container images for Helidon applications
 using Jib and Maven.</p>
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
</tbody>
</table>
</div>
</div>

<h2 id="_creating_a_docker_image_using_jib">Creating a Docker Image Using Jib</h2>
<div class="section">
<p><a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib">Jib</a> is a java tool chain for building Docker images for Java
 applications. It is integrated with Maven and Gradle and uses a
 <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/distroless">distroless</a> base image to produce small images.</p>

<p>Jib does not require the <code>docker</code> command or the Docker daemon, there is no need
 to solve the Docker-in-Docker problem in order to build Docker images as part
 of your continuous integration.</p>

<div class="admonition note">
<p class="admonition-inline">The <code>docker</code> command is only required for local usage when registering
 images in your local Docker registry.</p>
</div>
<p>The example below shows how to build an image and register it in the local
 registry using the <code>jib-maven-plugin</code>.</p>

<p>Add the following plugin declaration to your pom.xml:</p>

<markup
lang="xml"

>&lt;plugin&gt;
    &lt;groupId&gt;com.google.cloud.tools&lt;/groupId&gt;
    &lt;artifactId&gt;jib-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;0.10.1&lt;/version&gt;
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
            &lt;goals&gt;
                &lt;goal&gt;dockerBuild&lt;/goal&gt;
            &lt;/goals&gt;
            &lt;phase&gt;package&lt;/phase&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;</markup>

<div class="admonition note">
<p class="admonition-inline">By default, Jib uses <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/distroless/tree/master/java/">distroless/java</a> as the
 base image. You can override the default with configuration see the
 <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#extended-usage">documentation</a></p>
</div>
<markup
lang="bash"
title="Package the updated application"
>mvn package</markup>

<markup
lang="bash"
title="Run the image"
>docker run --rm -p 8080:8080 jib-helidon-quickstart-se</markup>

<markup
lang="bash"
title="Ping the application"
>curl -X GET http://localhost:8080/greet</markup>

<markup
lang="bash"
title="Take a look at the image size"
>docker images jib-quickstart-se:latest</markup>

<markup
lang="bash"

>REPOSITORY          TAG           IMAGE ID      CREATED        SIZE
jib-quickstart-se   latest        384aebda5594  48 years ago   124MB <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">Ignore the fact that it says the image was created 48 years ago. Refer to
the <a id="" title="" target="_blank" href="https://github.com/GoogleContainerTools/jib/blob/master/docs/faq.md#why-is-my-image-created-48-years-ago">Jib
FAQ</a> for explanations.</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">the Jib image is smaller because of the use of a distroless base image.</p>
</div>
</div>
</doc-view>