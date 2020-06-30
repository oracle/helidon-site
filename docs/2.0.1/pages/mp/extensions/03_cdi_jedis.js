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

>&lt;dependency&gt;
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

<p>The extension implements this injection point by creating a
 <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPool.html">JedisPool</a> object in the
 <a id="" title="" target="_blank" href="http://docs.jboss.org/cdi/api/2.0/javax/enterprise/context/ApplicationScoped.html">application scope</a>.</p>

<p>You can configure the object using
 <router-link to="#microprofile/02_server-configuration.adoc" @click.native="this.scrollFix('#microprofile/02_server-configuration.adoc')">MicroProfile config</router-link>. For example,
 the Jedis pool created above can be configured as follows:</p>

<markup
lang="properties"
title="META-INF/microprofile-config.properties"
>redis.clients.jedis.JedisPool.orders.port=6379</markup>

<p>Property names that start with
<code>redis.clients.jedis.JedisPoolConfig.instanceName.</code> are parsed, and
the remaining portion of each name is treated as a Java Bean property
of <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPoolConfig.html"><code>JedisPoolConfig</code></a>.  Because
the <code>JedisPoolConfig</code> class inherits from
<a id="" title="" target="_blank" href="https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/GenericObjectPoolConfig.html">Apache
commons-pool&#8217;s <code>GenericObjectPoolConfig</code></a> class and from
<a id="" title="" target="_blank" href="https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/BaseObjectPoolConfig.html">Apache commons-pool&#8217;s
<code>BaseObjectPoolConfig</code></a> class, those writable Java Bean properties are
available as well.</p>

<p>Accordingly, the <code>JedisPoolConfig</code> Java Bean properties that can be
set are as follows, where <code>instanceName</code> should be replaced with the
actual name used in application code:</p>


<div class="table__overflow elevation-1  flex md7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.blockWhenExhausted</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.evictionPolicyClassName</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.fairness</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.jmxEnabled</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.jmxNameBase</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.jmxNamePrefix</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.lifo</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.maxIdle</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.maxTotal</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.maxWaitMillis</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.minEvictableTimeMillis</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.minIdle</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.numTestsPerEvictionRun</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.softMinEvictableIdleTimeMillis</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.testOnBorrow</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.testOnCreate</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.testOnReturn</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.testWhileIdle</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPoolConfig.instanceName.timeBetweenEvictionRunsMillis</code></td>
</tr>
</tbody>
</table>
</div>
<p>Any documentation for these properties that exists may be found in the
javadocs for the
<a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPoolConfig.html"><code>JedisPoolConfig</code></a>,
<a id="" title="" target="_blank" href="https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/GenericObjectPoolConfig.html"><code>GenericObjectPoolConfig</code></a>
and
<a id="" title="" target="_blank" href="https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/BaseObjectPoolConfig.html"><code>BaseObjectPoolConfig</code></a>
classes.</p>

<p>Property names that start with
 <code>redis.clients.jedis.JedisPool.instanceName.</code> are parsed, and the
 remaining portion of each name is treated as a Java Bean property of
 <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPool.html"><code>JedisPool</code></a>, or as a primitive value
 accepted by <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPool.html#JedisPool-org.apache.commons.pool2.impl.GenericObjectPoolConfig-java.lang.String-int-int-java.lang.String-int-boolean-javax.net.ssl.SSLSocketFactory-javax.net.ssl.SSLParameters-javax.net.ssl.HostnameVerifier-">its
constructor</a>.  Because the <code>JedisPool</code> class inherits from the
 <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/util/Pool.html"><code>Pool</code></a> class, its writable Java Bean
 properties are available as well.</p>

<p>Accordingly, the <code>JedisPool</code> properties that can be set are as
follows, where <code>instanceName</code> should be replaced with the actual named
used in application code:</p>


<div class="table__overflow elevation-1  flex md7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.clientName</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.connectionTimeout</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.database</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.host</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.password</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.port</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.socketTimeout</code></td>
</tr>
<tr>
<td class=""><code>redis.clients.jedis.JedisPool.instanceName.ssl</code></td>
</tr>
</tbody>
</table>
</div>
<p>Any documentation for these properties that exists may be found in the
javadocs for the <a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/jedis/JedisPool.html"><code>JedisPool</code></a> and
<a id="" title="" target="_blank" href="https://static.javadoc.io/redis.clients/jedis/2.9.0/redis/clients/util/Pool.html"><code>Pool</code></a> classes.</p>

<p>Injection without a <code>@Named</code> annotation is also possible:</p>

<markup
lang="java"

> @Inject
 private JedisPool ordersPool;</markup>

<p>In this case, the properties for JedisPoolConfig and JedisPool that can be set will start wih <code>redis.clients.jedis.JedisPoolConfig.default</code> and <code>redis.clients.jedis.JedisPool.default</code> respectively.</p>

</div>
</doc-view>