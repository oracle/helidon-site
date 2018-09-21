<doc-view>

<h2 >介绍</h2>
<div class="section">
<p>Helidon是用于开发微服务的一个Java库集合。
没有唯一的工具或部署模型。你的微服务只是一个简单的Java SE 应用程序。</p>

<p>Helidon的基础由三部分组成：</p>

<v-layout row wrap class="mb-5">
<v-flex xs12>
<v-container fluid grid-list-md class="pa-0">
<v-layout row wrap class="pillars">
<v-flex xs12 sm4 lg3>
<v-card>
<v-layout align-center justify-center class="pa-5">
<v-avatar size="150px">
<v-icon class="xxx-large">settings_ethernet</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">WebServer</span>
</v-card-title>
<v-card-text class="caption">
由Netty提供支持并具有响应式功能的编程HTTP API。
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<v-layout align-center justify-center class="pa-5">
<v-avatar size="150px">
<v-icon class="xxx-large">settings</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Config</span>
</v-card-title>
<v-card-text class="caption">
灵活的配置框架，支持多种源和格式。
</v-card-text>
</v-card>
</v-flex>
<v-flex xs12 sm4 lg3>
<v-card>
<v-layout align-center justify-center class="pa-5">
<v-avatar size="150px">
<v-icon class="xxx-large">security</v-icon>
</v-avatar>
</v-layout>
<div class="px-3">
<v-divider class="indigo lighten-4"/>
</div>
<v-card-title primary class="headline layout justify-center">
<span style="text-align:center">Security</span>
</v-card-title>
<v-card-text class="caption">
用于处理身份验证，授权和上下文传播的工具链。
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>
</v-flex>
</v-layout>
</div>

<h2 >MicroProfile</h2>
<div class="section">
<p>在此基础之上，Helidon支持MicroProfile系列API，包括JAX-RS和CDI。这意味着您可以从以下两种编程模型中选择一种：</p>

<ul class="ulist">
<li>
<p>Helidon SE: 一种函数式编程风格，直接使用Helidon WebServer，Config和Security API。这种方式将控制权全权交给你自己。</p>

</li>
<li>
<p>Helidon MP: 这是一种对Java EE程序员来说很熟悉的一种方式，此方式支持https://microprofile.io[MicroProfile] API等一系列更具说明性的模型。这对Java EE开发人员来说很熟悉。</p>

</li>
</ul>
<p>我们的<router-link to="/getting-started/02_base-example">快速入门示例</router-link>可让您开始使用这些编程模型中的任何一种。</p>


<h3 >支持Docker和Kubernetes</h3>
<div class="section">
<p><router-link to="/getting-started/02_base-example">Helidon 快速入门示例</router-link>包含对Docker和Kubernetes的支持。只需按照示例操作，您就可以在几分钟内完成并运行简单的服务。</p>

</div>
</div>
</doc-view>
