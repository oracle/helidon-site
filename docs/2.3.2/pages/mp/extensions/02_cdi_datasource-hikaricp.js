<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>CDI extension for HikariCP</dt>
<dd slot="desc"><p>This <a id="" title="" target="_blank" href="https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#spi">CDI portable extension</a> provides support for
injecting <a id="" title="" target="_blank" href="http://brettwooldridge.github.io/HikariCP/">HikariCP data sources</a> in your Helidon
MicroProfile applications.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable HikariCP Support
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-datasource-hikaricp&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_injecting_a_hikaricp_data_source">Injecting a HikariCP data source</h2>
<div class="section">
<p>The following examples show how to create a <code>DataSource</code> named <code>orders</code> in your
application.</p>

<markup
lang="java"
title="Field-injection example"
> @Inject
 @Named("orders")
 private DataSource ordersDataSource;</markup>

<markup
lang="java"
title="Constructor-injection example"
> private final DataSource ds;
 @Inject
 public YourConstructor(@Named("orders") DataSource ds) {
   super();
   this.ds = ds;
 }</markup>

<p>The extension implements this injection point by creating a
<a id="" title="" target="_blank" href="https://static.javadoc.io/com.zaxxer/HikariCP/2.7.8/com/zaxxer/hikari/HikariDataSource.html">HikariDataSource</a> object in the
<a id="" title="" target="_blank" href="http://docs.jboss.org/cdi/api/2.0/javax/enterprise/context/ApplicationScoped.html">application scope</a>.</p>

<p>You can configure the object using
<router-link to="#microprofile/02_server-configuration.adoc" @click.native="this.scrollFix('#microprofile/02_server-configuration.adoc')">MicroProfile config</router-link>. For example,
the data source created above can be configured as follows:</p>

<markup
lang="properties"
title="META-INF/microprofile-config.properties"
>javax.sql.DataSource.orders.dataSourceClassName=oracle.jdbc.pool.OracleDataSource
javax.sql.DataSource.orders.dataSource.url = jdbc:oracle:thin:@localhost:1521:ORCL
javax.sql.DataSource.orders.dataSource.user = sys as sysoper
javax.sql.DataSource.orders.dataSource.password = Oracle</markup>

<p>Property names that start with <code>javax.sql.DataSource.dataSourceName.</code> are parsed,
and the remaining portion of each name is treated as a
<a id="" title="" target="_blank" href="https://github.com/brettwooldridge/HikariCP/blob/dev/README.md#configuration-knobs-baby">Hikari connection pool property</a>.</p>

</div>
</doc-view>