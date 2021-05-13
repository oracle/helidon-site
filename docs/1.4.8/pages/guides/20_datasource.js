<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Setting Up Data Sources</dt>
<dd slot="desc"><p>This guide shows how to configure and use named
<a id="" title="" target="_blank" href="https://docs.oracle.com/javase/8/docs/api/javax/sql/DataSource.html"><code>DataSource</code></a>s
in your Helidon MP application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">

<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>About 20 minutes</td>
</tr>
<tr>
<td><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
<tr>
<td><code>curl</code> (for testing)</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_what_youll_do">What You&#8217;ll Do</h2>
<div class="section">
<p>By following this guide, you&#8217;ll enhance a bare-bones Helidon MP
application to access an in-memory
<a id="" title="" target="_blank" href="https://www.h2database.com/html/main.html">H2 database</a> database.
You&#8217;ll see how to install the relevant dependencies, set up and
configure the datasource, and add datasource-related code to your
application.</p>

</div>

<h2 id="_use_the_maven_archetype_to_generate_a_helidon_mp_application">Use the Maven Archetype to Generate a Helidon MP Application</h2>
<div class="section">
<p>In a shell, <code>cd</code> into an empty directory and run this:</p>

<markup
lang="bash"

>mvn archetype:generate \
    -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-mp \
    -DarchetypeVersion=1.4.8 \
    -DgroupId=io.helidon.example \
    -DartifactId=helidon-ds \
    -Dpackage=io.helidon.example.ds \
    -DrestResourceName=ExampleResource \
    -DapplicationName=ExampleApplication</markup>

<p>Now <code>cd</code> into <code>helidon-ds</code>.  The rest of this guide will assume all
relative paths are relative to this directory.</p>

</div>

<h2 id="_add_the_h2_database_driver_to_the_runtime_classpath">Add the H2 Database Driver to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;com.h2database&lt;/groupId&gt;
    &lt;artifactId&gt;h2&lt;/artifactId&gt;
    &lt;version&gt;1.4.199&lt;/version&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<p>In a production application, you may use a different database, so in
that case you may add a different database driver dependency here
instead.</p>

</div>

<h2 id="_add_the_hikari_connection_pool_extension_to_the_runtime_classpath">Add the Hikari Connection Pool Extension to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-datasource-hikaricp&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_add_an_application_yaml_file_with_database_connectivity_information">Add an <code>application.yaml</code> File With Database Connectivity Information</h2>
<div class="section">
<p>Replace the contents of the following file under <code>src/main/resources</code>:</p>

<markup
lang="yaml"
title="<code>src/main/resources/application.yaml</code>"
>server:
    port: 8080
javax:
    sql:
        DataSource: <span class="conum" data-value="1" />
            test: <span class="conum" data-value="2" />
                dataSourceClassName: org.h2.jdbcx.JdbcDataSource <span class="conum" data-value="3" />
                dataSource: <span class="conum" data-value="4" />
                    url: jdbc:h2:mem:test <span class="conum" data-value="5" />
                    user: sa
                    password: ""</markup>

<ul class="colist">
<li data-value="1">This <code>javax:</code>/<code>sql:</code>/<code>DataSource:</code> preamble is required.</li>
<li data-value="2"><code>test</code> is the name of the <code>DataSource</code> being configured here.</li>
<li data-value="3"><code>dataSourceClassName</code> is an
<a id="" title="" target="_blank" href="https://github.com/brettwooldridge/HikariCP/blob/dev/README.md#configuration-knobs-baby">essential
Hikari connection pool property</a>.</li>
<li data-value="4"><code>dataSource</code> is a
<a id="" title="" target="_blank" href="https://github.com/brettwooldridge/HikariCP/blob/dev/README.md#initialization">Hikari
connection pool keyword</a>.</li>
<li data-value="5">These are some of the Java Beans-compliant properties exposed by,
in this case, the
<a id="" title="" target="_blank" href="https://www.h2database.com/javadoc/org/h2/jdbcx/JdbcDataSource.html"><code>org.h2.jdbcx.JdbcDataSource</code>
class</a>.</li>
</ul>
</div>

<h2 id="_inject_a_datasource_in_your_application_code">Inject a <a id="" title="" target="_blank" href="https://docs.oracle.com/javase/8/docs/api/javax/sql/DataSource.html"><code>DataSource</code></a> in Your Application Code</h2>
<div class="section">
<p>In the <code>src/main/java/io/helidon/example/ds/ExampleResource.java</code> file, add the following
imports:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/ds/ExampleResource.java</code>"
>import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;</markup>

<p>Annotate the resource class declaration with <code>@Dependent</code>:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/ds/ExampleResource.java</code>"
>@Dependent <span class="conum" data-value="1" />
public class ExampleResource {</markup>

<ul class="colist">
<li data-value="1">This ensures that <code>io.helidon.example.jpa.ExampleResource</code> is a
discoverable CDI bean.</li>
</ul>
<p>Then add the following annotated field declaration:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/ds/ExampleResource.java</code>"
>@Inject <span class="conum" data-value="1" />
@Named("test") <span class="conum" data-value="2" />
private DataSource testDataSource;</markup>

<ul class="colist">
<li data-value="1">The
<a id="" title="" target="_blank" href="http://javax-inject.github.io/javax-inject/api/javax/inject/Inject.html"><code>@Inject</code>
annotation</a> is used to indicate that the CDI container should set the
annotated field automatically.</li>
<li data-value="2">The
<a id="" title="" target="_blank" href="http://javax-inject.github.io/javax-inject/api/javax/inject/Named.html"><code>@Named</code>
annotation</a> is used to select which data source should be injected.
Here, the <code>test</code> data source is requested.</li>
</ul>
</div>

<h2 id="_use_the_injected_datasource">Use The Injected <code>DataSource</code></h2>
<div class="section">
<p>Now that you have a <code>DataSource</code>, you&#8217;ll use it to connect to the database.</p>

<p>First, ensure the <code>io.heldion.example.ds.ExampleResource</code> resource
class imports various <code>java.sql</code> classes:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/ds/ExampleResource.java</code>"
>import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;</markup>

<p>Add the following resource method to the <code>ExampleResource</code> class:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/ds/ExampleResource.java</code>"
>@GET
@Path("tables")
@Produces("text/plain")
public String getTableNames() throws SQLException { <span class="conum" data-value="1" />
    StringBuilder sb = new StringBuilder();
    try (Connection connection = this.testDataSource.getConnection(); <span class="conum" data-value="2" />
         PreparedStatement ps =
           connection.prepareStatement(" SELECT TABLE_NAME" <span class="conum" data-value="3" />
                                       + " FROM INFORMATION_SCHEMA.TABLES "
                                       + "ORDER BY TABLE_NAME ASC");
         ResultSet rs = ps.executeQuery()) {
      while (rs.next()) {
        sb.append(rs.getString(1)).append("\n");
      }
    }
    return sb.toString();
}</markup>

<ul class="colist">
<li data-value="1">Database interactions can throw <code>SQLException</code>.</li>
<li data-value="2">We acquire a <code>Connection</code>, a <code>PreparedStatement</code> and a <code>ResultSet</code>
in a try-with-resources block.</li>
<li data-value="3">This SQL statement returns a list of all table names in the database.</li>
</ul>
</div>

<h2 id="_build_the_application">Build the Application</h2>
<div class="section">
<p>Execute the following from the root directory of your application:</p>

<markup
lang="bash"

>mvn clean package</markup>

</div>

<h2 id="_run_the_application">Run the Application</h2>
<div class="section">
<p>Execute the following from the root directory of your application:</p>

<markup
lang="bash"

>java -jar target/helidon-ds.jar</markup>

</div>

<h2 id="_test_the_application">Test the Application</h2>
<div class="section">
<p>Execute the following:</p>

<markup
lang="bash"

>curl http://localhost:8080/example/tables</markup>

<p>Observe that the result will be a list of database table names.</p>

</div>

<h2 id="_related_examples">Related Examples</h2>
<div class="section">
<p>Helidon features a few examples of projects that use data sources.</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/1.4.8/examples/integrations/cdi/datasource-hikaricp-h2">An
example showing a Hikari connection pool data source connected to an
H2 database</a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/1.4.8/examples/integrations/cdi/datasource-hikaricp-mysql">An
example showing a Hikari connection pool data source connected to a
MySQL database</a></p>

</li>
</ul>
<p>Some examples' configurations can be found in their
<code>META-INF/microprofile-config.properties</code> resources instead of in an
<code>application.yaml</code> file as described above.  Though the syntax is
different, the same principles as those described above still apply.</p>

</div>
</doc-view>