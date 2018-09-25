<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>管理依赖</dt>
<dd slot="desc"><p>Helidon提供了"`Bill Of Materials`" (BOM)来管理依赖。
这是一个提供了管理依赖的的特殊maven的pom文件。</p>

<p>使用Helidon BOM允许我们通过Helison的版本信息来使用Helidon的组件们。</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Helidon的BOM和POM</h2>
<div class="section">
<p>将以下代码段添加到pom.xml文件中, 以此来导入Helidon BOM。</p>

<markup
lang="xml"
title="导入Helidon BOM"
>&lt;dependencyManagement&gt;
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-bom&lt;/artifactId&gt;
            &lt;version&gt;0.10.1-SNAPSHOT&lt;/version&gt;
            &lt;type&gt;pom&lt;/type&gt;
            &lt;scope&gt;import&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/dependencyManagement&gt;</markup>

</div>

<h2 >使用Helidon组件依赖项</h2>
<div class="section">
<p>导入BOM后，可以在不指定版本的情况下声明Helidon组件的依赖关系。</p>

<markup
lang="xml"
title="组件依赖"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</doc-view>
