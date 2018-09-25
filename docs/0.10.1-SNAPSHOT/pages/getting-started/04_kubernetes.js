<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Kubernetes开发环境</dt>
<dd slot="desc"><p>对于开发人员来将，通常会在个人电脑上面运行Kubernetes环境，两种流行的方法是在Docker for Desktop中使用 <a id=""
title=""
target="_blank"
href="https://kubernetes.io/docs/getting-started-guides/minikube/">Kubernetes Minikube</a> 或 <a id=""
title=""
target="_blank"
href="https://docs.docker.com/docker-for-mac/kubernetes/">Kubernetes Docker桌面版支持</a>。</p>

<p>在本指南中，我们将使用 <a id=""
title=""
target="_blank"
href="https://docs.docker.com/docker-for-mac/kubernetes/">Kubernetes Docker桌面版支持</a>.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >安装</h2>
<div class="section">
<p>安装适用于 <a id=""
title=""
target="_blank"
href="https://docs.docker.com/docker-for-mac/install/">Mac的Docker</a> 或适用于 <a id=""
title=""
target="_blank"
href="https://docs.docker.com/docker-for-windows/install/">Windows的Docker</a>。</p>

<p>要使用Kubernetes支持，您需要获得Edge Channel安装程序。</p>

</div>

<h2 >启用Kubernetes支持</h2>
<div class="section">
<p>启用
<a id=""
title=""
target="_blank"
href="https://docs.docker.com/docker-for-mac/#kubernetes">Kubernetes Support for Mac</a>
或者
<a id=""
title=""
target="_blank"
href="https://docs.docker.com/docker-for-windows/#kubernetes">Kubernetes Support for Windows</a>.</p>

<p>Kubernetes安装完成后，请确保正确设置上下文以使用docker-for-desktop。</p>

<markup
lang="bash"
title="确保将K8s上下文设置为docker-for-desktop"
>kubectl config get-contexts
kubectl config use-context docker-for-desktop
kubectl cluster-info
kubectl version --short
kubectl get nodes</markup>

</div>

<h2 >继续 <router-link :to="{path: '/getting-started/02_base-example', hash: '#deploy-to-k8s'}">快速入门示例</router-link></h2>
<div class="section">

</div>
</doc-view>
