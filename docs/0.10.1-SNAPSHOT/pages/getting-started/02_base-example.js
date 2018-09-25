<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>快速入门示例</dt>
<dd slot="desc"><p>有两个快速入门示例，一个用于Helidon SE，另一个用于Helidon MP（MicroProfile）。
使用Maven模版生成示例。生成的Maven项目中包含对Docker和Kubernetes的支持。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >前置条件</h2>
<div class="section">
<p>如果您还没有准备好环境配置等条件，请确保您已满足<router-link to="/getting-started/01_prerequisites">系统前置条件</router-link></p>

</div>

<h2 >生成工程</h2>
<div class="section">
<p>使用Helidon Maven模版中的一个（或两个）生成项目源码。这两个示例都产生了支持相同REST API的REST服务，但它们以不同方式实现：</p>

<ol style="margin-left: 15px;">
<li>
Helidon SE示例直接使用Helidon WebServer组件实现REST服务。它展示了配置WebServer和实现基本路由规则的基础知识。

</li>
<li>
Helidon MP示例使用Helidon MicroProfile服务器提供的JAX-RS支持实现REST服务。

</li>
</ol>
<markup
lang="bash"
title="Helidon SE 样例"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=0.10.1-SNAPSHOT \
    -DgroupId=io.helidon.examples \
    -DartifactId=quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

<markup
lang="bash"
title="Helidon MP 样例"
>mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=0.10.1-SNAPSHOT \
    -DgroupId=io.helidon.examples \
    -DartifactId=quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<p>模版在当前目录中生成Maven项目（比如，quickstart-mp）。切换到此目录：</p>

<markup
lang="bash"

>cd quickstart-*</markup>

<div class="admonition tip">
<p class="admonition-inline">如果要将生成的项目用作自己应用程序的启动器，那么你可以用适合你的应用程序的值替换groupId，artifactId和package。</p>
</div>
</div>

<h2 >构建此应用程序</h2>
<div class="section">
<p>比如：</p>

<markup
lang="bash"

>mvn package</markup>

</div>

<h2 >运行此应用程序</h2>
<div class="section">
<p>该项目为该示例构建了一个应用程序jar，并将所有运行时依赖项保存在`target/libs`目录中。
这意味着您可以通过运行应用程序生成的jar文件轻松启动应用程序：</p>

<markup
lang="bash"
title="Helidon SE 样例"
>java -jar target/quickstart-se.jar</markup>

<markup
lang="bash"
title="Helidon MP 样例"
>java -jar target/quickstart-mp.jar</markup>

</div>

<h2 >试试运行的应用程序</h2>
<div class="section">
<p>这两个示例都支持相同的REST接口，因此您以相同的方式尝试这两个示例。</p>

<p>该示例是一个非常简单的“Hello World”问候语服务。它支持生成问候消息的GET请求，以及更改问候语本身的PUT请求。
请求响应使用JSON格式进行编码。例如：</p>

<markup


>curl -X GET http://localhost:8080/greet
{"message":"Hello World!"}

curl -X GET http://localhost:8080/greet/Joe
{"message":"Hello Joe!"}

curl -X PUT http://localhost:8080/greet/greeting/Hola
{"greeting":"Hola"}

curl -X GET http://localhost:8080/greet/Jose
{"message":"Hola Jose!"}</markup>

</div>

<h2 >构建Docker镜像</h2>
<div class="section">
<p>该项目还包含一个Dockerfile，因此您可以轻松地构建和运行docker镜像。
因为示例的运行时依赖性已经在`target/libs`中，所以Dockerfile非常简单（参考`target/Dockerfile`）。
要构建Docker镜像，您需要在系统上安装并确保Docker处于运行状态。</p>

<markup
lang="bash"
title="Helidon SE 样例"
>docker build -t quickstart-se target</markup>

<markup
lang="bash"
title="Helidon MP 样例"
>docker build -t quickstart-mp target</markup>

</div>

<h2 >运行Docker镜像</h2>
<div class="section">
<markup
lang="bash"
title="Helidon SE 样例"
>docker run --rm -p 8080:8080 quickstart-se:latest</markup>

<markup
lang="bash"
title="Helidon MP 样例"
>docker run --rm -p 8080:8080 quickstart-mp:latest</markup>

<p>然后您可以像以前一样尝试应用程序。</p>

</div>

<h2  id="deploy-to-k8s">将此应用程序发布至Kubernetes</h2>
<div class="section">
<p>如果您无权访问Kubernetes群集，则可以<router-link to="/getting-started/04_kubernetes">在本地电脑桌面上安装一个群集</router-link>。
然后发布这个样例程序：</p>

<markup
lang="bash"
title="验证与群集的连接"
>kubectl cluster-info
kubectl get nodes</markup>

<markup
lang="bash"
title="将应用程序部署到Kubernetes"
>kubectl create -f target/app.yaml
kubectl get pods                    # 等待启动pod运行</markup>

</div>

<h2 >在Kubernetes上运用应用程序</h2>
<div class="section">
<p>启动Kubernetes代理服务器，以便您可以通过localhost连接到您的服务：</p>

<markup
lang="bash"
title="启动kubctl代理"
>kubectl proxy</markup>

<p>接下来获取服务的信息。</p>

<markup
lang="bash"
title="Helidon SE 样例"
>kubectl get service quickstart-se</markup>

<markup
lang="bash"
title="Helidon MP 样例"
>kubectl get service quickstart-mp</markup>

<p>注意端口号。您现在可以像以前一样使用应用程序，但这里是使用第二个端口号（NodePort）而不是8080.例如：</p>

<markup


>curl -X GET http://localhost:31431/greet</markup>

<p>当你完成练习后，记得清理。</p>

<markup
lang="bash"
title="从Kubernetes中删除该应用程序"
>kubectl delete -f target/app.yaml</markup>

</div>
</doc-view>
