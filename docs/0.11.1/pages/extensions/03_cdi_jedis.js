<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>CDI extension for Jedis</dt>
<dd slot="desc"><p>This <a id="" title="" target="_blank" href="https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#spi">CDI portable extension</a> provides support for
 injecting <a id="" title="" target="_blank" href="https://github.com/xetorthio/jedis">Jedis clients</a> in your Helidon
 MicroProfile applications.</p>
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
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>    &lt;dependency&gt;
        &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
        &lt;artifactId&gt;helidon-integrations-cdi-jedis&lt;/artifactId&gt;
    &lt;/dependency&gt;</markup>

</div>

<h2 id="_injecting_a_jedis_client">Injecting a Jedis client</h2>
<div class="section">
<p>The following examples show how to create and inject a Jedis pool named <code>orders</code>
 in your application code.</p>

<markup
lang="java"
title="Field-injection example"
> @Inject
 @Named("orders")
 private JedisPool ordersPool;</markup>

<markup
lang="java"
title="Constructor-injection example"
> private final JedisPool ordersPool;
 @Inject
 public YourConstructor(@Named("orders") JedisPool pool) {
   super();
   this.ordersPool = pool;
 }</markup>

<p>The extension implements this injection point by creating an
 <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPool.html">JedisPool</a> object in the
 <a id="" title="" target="_blank" href="http://docs.jboss.org/cdi/api/2.0/javax/enterprise/context/ApplicationScoped.html">application scope</a>.</p>

<p>You can configure the object using
 <router-link to="/microprofile/02_server-configuration">MicroProfile config</router-link>. For example
 the data source created above can be configured as follow:</p>

<markup
lang="properties"
title="META-INF/microprofile-config.properties"
>redis.clients.jedis.JedisPool.orders.port=6379</markup>

<p>Property names that start with <code>redis.clients.jedis.JedisPool.dataSourceName.</code> are
 parsed, and the remaining portion of each name is treated as a Java been property
 of <code>JedisPool</code>.</p>

</div>
</doc-view>