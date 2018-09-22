<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>前置条件</dt>
<dd slot="desc"><p>此处列出了使用想要开始使用Helidon所需的一切。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >先决条件</h2>
<div class="section">
<p>Helidon需要Java 8（或更高版本）和Maven。如果要构建和部署Docker容器，你则需要学习一些Docker的知识。
如果要将服务部署到Kubernetes，则需要`kubectl`和Kubernetes集群(您可以<router-link to="/getting-started/04_kubernetes">在你电脑桌面上安装一个</router-link>)。</p>

<p>以下列表显示了最低版本要求：</p>


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
<td><a id=""
title=""
target="_blank"
href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;8</a> or <a id=""
title=""
target="_blank"
href="http://jdk.java.net">Open&#160;JDK&#160;8</a></td>
<td>&#160;</td>
</tr>
<tr>
<td><a id=""
title=""
target="_blank"
href="https://maven.apache.org/download.cgi">Maven 3.5</a></td>
<td>&#160;</td>
</tr>
<tr>
<td><a id=""
title=""
target="_blank"
href="https://docs.docker.com/install/">Docker 18.02</a></td>
<td>使用Edge通道在桌面上运行Kubernetes</td>
</tr>
<tr>
<td><a id=""
title=""
target="_blank"
href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.7.4</a></td>
<td>&#160;</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="bash"
title="检查环境配置"
>java --version
mvn --version
docker --version
kubectl version --short</markup>

</div>

<h2 >配置 JAVA_HOME</h2>
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

<h2 >开始尝试快速开始示例</h2>
<div class="section">
<p>现在您已准备好基础环境并可以进行尝试<router-link :to="{path: '/getting-started/02_base-example', hash: '#Prerequisites'}">快速入门示例</router-link>。</p>

</div>
</doc-view>
