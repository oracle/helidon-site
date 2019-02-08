<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Prerequisites</dt>
<dd slot="desc"><p>Everything you need to use Helidon is listed here.</p>
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
<p>Helidon requires Java 8 (or greater) and Maven. You need Docker if you
want to build and deploy Docker containers. If you want to
deploy to Kubernetes, you need <code>kubectl</code> and a Kubernetes cluster (you can
<router-link to="/getting-started/04_kubernetes">install one on your desktop</router-link>).</p>

<p>The following list shows the minimum versions.</p>


<div class="table__overflow elevation-1 flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;8</a> or <a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;8</a></td>
<td>&#160;</td>
</tr>
<tr>
<td><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.5</a></td>
<td>&#160;</td>
</tr>
<tr>
<td><a id="" title="" target="_blank" href="https://docs.docker.com/install/">Docker 18.02</a></td>
<td>Use the Edge channel to run Kubernetes on your desktop</td>
</tr>
<tr>
<td><a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.7.4</a></td>
<td>&#160;</td>
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
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`

# On Linux
# Use the appropriate path to your JDK
export JAVA_HOME=/usr/lib/jvm/jdk-8</markup>

</div>

<h2 id="_try_the_quickstart_examples">Try the Quickstart Examples</h2>
<div class="section">
<p>Now you are ready to try the
<router-link :to="{path: '/getting-started/02_base-example', hash: '#Prerequisites'}">Quickstart Examples</router-link>.</p>

</div>
</doc-view>