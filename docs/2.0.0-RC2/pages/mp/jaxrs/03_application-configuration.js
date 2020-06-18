<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Configuring the Application</dt>
<dd slot="desc"><p>Your application can use the MicroProfile Config or
 Helidon Config (or both). MicroProfile Config offers portability to other
 MicroProfile servers. Helidon Config supports a full tree structure, including repeating
 elements.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_the_application">Configuring the Application</h2>
<div class="section">
<p>You can inject values that the application can access from both MicroProfile Config and from
Helidon Config.</p>

<markup
lang="java"
title="JAX-RS - inject a single config property"
>@Inject
public MyResource(@ConfigProperty(name="app.name") String appName) {
    this.applicationName = appName;
}</markup>

<p>You can also inject the whole configuration instance,
either <code>io.helidon.config.Config</code> or
 <code>org.eclipse.microprofile.config.Config</code>.</p>

<markup
lang="java"
title="JAX-RS - inject config"
>@Inject
public MyResource(Config config) {
    this.config = config;
}</markup>

</div>
</doc-view>