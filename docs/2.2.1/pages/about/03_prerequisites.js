<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Get Started</dt>
<dd slot="desc"><p>Everything you need to get started with Helidon is listed here.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Helidon requires Java 11 (or newer) and Maven. You need Docker if you
want to build and deploy Docker containers. If you want to
deploy to Kubernetes, you need <code>kubectl</code> and a Kubernetes cluster (you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>).</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;11</a> (<a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;11</a>) or newer</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.6.1+</a></td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://docs.docker.com/install/">Docker 18.09+</a></td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.16.5+</a></td>
</tr>
</tbody>
</table>
</div>
<markup
lang="bash"
title="Verify Prerequisites"
>java -version
mvn --version
docker --version
kubectl version --short</markup>

</div>

<h2 id="_setting_java_home">Setting JAVA_HOME</h2>
<div class="section">
<markup
lang="bash"
title="Setting JAVA_HOME"
># On Mac
export JAVA_HOME=`/usr/libexec/java_home -v 11`

# On Linux
# Use the appropriate path to your JDK
export JAVA_HOME=/usr/lib/jvm/jdk-11</markup>

</div>

<h2 id="_try_the_quickstart_examples">Try the Quickstart Examples</h2>
<div class="section">
<p>Now you are ready to try the Quickstart Examples:</p>

<ol style="margin-left: 15px;">
<li>
<router-link to="/mp/guides/02_quickstart">Helidon MP Quickstart Example</router-link>

</li>
<li>
<router-link to="/se/guides/02_quickstart">Helidon SE Quickstart Example</router-link>

</li>
</ol>
<div class="admonition tip">
<p class="admonition-inline">See <router-link to="/about/02_introduction">About Helidon</router-link>
for more information on the differences between Helidon MP and SE.</p>
</div>
</div>
</doc-view>