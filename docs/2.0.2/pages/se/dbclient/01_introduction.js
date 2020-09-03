<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>About Helidon DB Client</dt>
<dd slot="desc"><p>The Helidon SE DB Client provides a unified, reactive API for working with databases in non-blocking way.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_helidon_db_client_features_overview">Helidon DB Client Features Overview</h2>
<div class="section">
<p>The DB Client simplifies how you work with databases by abstracting the type of the database.
The API can be used both for relational and non-relational databases.</p>

<p>The API provides:</p>

<ul class="ulist">
<li>
<p>Database configuration abstraction</p>
<p>Using Helidon configuration allows database implementation specific configuration options
without the need to use database implementation specific APIs. This allows for seamless switching between databases
based on configuration.</p>

</li>
<li>
<p>Statement configuration abstraction</p>
<p>Using Helidon configuration allows use of database specific statements. This allows usage of
different databases on different environments without changing code.</p>

</li>
<li>
<p>Unified API for data access and query</p>
<p>Thanks to the statement configuration abstraction, we can invoke a statement against a relational
or non-relations databases (such as MySQL and MongoDB) withough modifying source code</p>

</li>
<li>
<p>Reactive database access with backpressure</p>
<p>Current we support natively reactive driver for MongoDB, and an executor service wrapped
support for any JDBC driver.
This allows for seamless use of JDBC drivers in a reactive non-blocking environment, including support
for backpressure (result set is processed as requested by the query subscriber)</p>

</li>
<li>
<p>Observability<br></p>
<p>The API offers support for health checks, metrics and tracing.</p>

</li>
</ul>
</div>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">
<p>Before you begin you must add the DB Client dependencies and configure the client.</p>

<ol style="margin-left: 15px;">
<li>
Add the DB Client dependencies to the Maven <code>pom.xml</code> file.
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications.</p>

</li>
</ol>
<p>For the DB Client using JDBC implementation and H2 database, you must include the following dependencies in your project:</p>

<markup
lang="java"

>&lt;dependencies&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;io.helidon.dbclient&lt;/groupId&gt; <span class="conum" data-value="1" />
         &lt;artifactId&gt;helidon-dbclient&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;io.helidon.dbclient&lt;/groupId&gt; <span class="conum" data-value="2" />
         &lt;artifactId&gt;helidon-dbclient-jdbc&lt;/artifactId&gt;
     &lt;/dependency&gt;
     &lt;dependency&gt;
         &lt;groupId&gt;com.h2.database&lt;/groupId&gt; <span class="conum" data-value="3" />
         &lt;artifactId&gt;h2&lt;/artifactId&gt;
         &lt;version&gt;1.4.200&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

<ul class="colist">
<li data-value="1">Add the Helidon DB Client</li>
<li data-value="2">Specify JDBC or MongoDB</li>
<li data-value="3">Add the database JDBC driver (only for JDBC)</li>
</ul>
<p>The DB Client must be configured before you begin. In the example below we&#8217;ll use Helidon Config to set up JDBC-based client:</p>

<markup
lang="yaml"

>db:
  source: "jdbc" <span class="conum" data-value="1" />
  connection:
    url: "jdbc:mysql://127.0.0.1:3306/pokemon?useSSL=false" <span class="conum" data-value="2" />
    username: "user"
    password: "password"
  statements: <span class="conum" data-value="3" />
    ping: "DO 0" <span class="conum" data-value="4" />
    select-all-pokemons: "SELECT id, name FROM Pokemons"</markup>

<ul class="colist">
<li data-value="1">Source: <code>jdbc</code> or <code>mongoDb</code></li>
<li data-value="2">Connection: database connection parameters</li>
<li data-value="3">Statements: named statements to be used in application</li>
<li data-value="4">A ping statement used by health check</li>
</ul>
</div>

<h2 id="_using_db_client_api_methods">Using DB Client API Methods</h2>
<div class="section">
<p>The Helidon DB Client API contains many methods to run various statements with parameters and to retrieve statement execution
results. The following sections describe the options you can use to build and execute your statements.</p>


<h3 id="_executor_selection">Executor Selection</h3>
<div class="section">
<p><code>DBClient</code> class has two methods to select whether statements will be executed in transaction or not:</p>

<ul class="ulist">
<li>
<p><code>execute(Function&lt;DbExecute, T&gt; executor)</code></p>

</li>
<li>
<p><code>inTransaction(Function&lt;DbTransaction, T&gt; executor)</code></p>

</li>
</ul>
<p>Both methods provide an executor (either <code>DbExecute</code> or <code>DbTransaction</code>) and expect either <code>Single</code> or a <code>Multi</code> result,
usually returned by one of their methods.</p>

</div>

<h3 id="_statement_building_and_execution">Statement Building and Execution</h3>
<div class="section">
<p>DbExecute class offers many methods for various statements builders:</p>

<ul class="ulist">
<li>
<p>DML statements: <code>createDmlStatement</code>, <code>createNamedDmlStatement</code></p>

</li>
<li>
<p>insert statements: <code>createInsert</code>, <code>createNamedInsert</code></p>

</li>
<li>
<p>update statements: <code>createUpdate</code>, <code>createNamedUpdate</code></p>

</li>
<li>
<p>delete statements: <code>createDelete</code>, <code>createNamedDelete</code></p>

</li>
<li>
<p>query statements: <code>createQuery</code>, <code>createNamedQuery</code></p>

</li>
<li>
<p>get statements: <code>createGet</code>, <code>createNamedGet</code></p>

</li>
</ul>
<p>Methods with "Named" in their name (<code>create<strong>Named</strong>DmlStatement</code>) expect statement name from statements section of Config,
or a named statement configured when the <code>DbClient</code> was created using a <code>Builder</code>.</p>

<p>All statement builders offer methods to set statement parameters. Those parameters can be ordered parameters or named parameters.
Ordered and named parameters can’t be mixed in a single statement.</p>

<p>Note that <code>get</code> statements are query statements that allow zero to one results.</p>

</div>

<h3 id="_ordered_parameters">Ordered Parameters</h3>
<div class="section">
<p>Ordered parameters are written down as <code>?</code> in the statement text:</p>

<markup
lang="sql"

>SELECT name FROM Pokemons WHERE id = ?</markup>

<p>The ordered parameters are equivalent to JDBC <code>PreparedStatement</code> parameters.</p>

<p>Methods to set ordered parameters are:</p>

<ul class="ulist">
<li>
<p><code>params(List&lt;?&gt; parameters)</code> with all parameters as List</p>

</li>
<li>
<p><code>params(Object… parameters)</code> with all parameters as array</p>

</li>
<li>
<p><code>indexedParam(Object parameters)</code> POJO used with registered mapper</p>

</li>
<li>
<p><code>addParam(Object parameter)</code> with single parameter, can be called repeatedly</p>

</li>
</ul>
</div>

<h3 id="_named_parameters">Named Parameters</h3>
<div class="section">
<p>Named parameters are written down as <code>:&lt;name&gt;</code> in the JDBC statements</p>

<markup
lang="sql"

>SELECT name FROM Pokemons WHERE id = :id</markup>

<p>or as <code>$&lt;name&gt;</code> in the MongoDB statement:</p>

<markup
lang="json"

>{
    "collection": "pokemons",
    "operation": "update",
    "value":{ $set: { "name": $name } },
    "query": { id: $id }
}</markup>

<p>Methods to set named parameters are:</p>

<ul class="ulist">
<li>
<p><code>params(Map&lt;String, ?&gt; parameters)</code> with all parameters as Map</p>

</li>
<li>
<p><code>namedParam(Object parameters)</code> POJO used with registered mapper</p>

</li>
<li>
<p><code>addParam(String name, Object parameter)</code> with single parameter, can be called repeatedly</p>

</li>
</ul>
</div>

<h3 id="_statement_execution">Statement Execution</h3>
<div class="section">
<p>Statements are executed by calling execute() method after statement parameters are set.
This method returns either a <code>Single</code> or <code>Multi</code> depending on statement type. The type returned also depends on statement
type.</p>

<p>JDBC query with ordered parameters and query that does not run in the transaction:</p>

<markup
lang="java"

>dbClient.execute(exec -&gt; exec
    .createQuery("SELECT name FROM Pokemons WHERE id = ?")
    .params(1)
    .execute()
);</markup>

<p>JDBC query with named parameters and the query runs in transaction:</p>

<markup
lang="java"

>dbClient.inTransaction(tx -&gt; tx
    .createQuery("SELECT name FROM Pokemons WHERE id = :id")
    .addParam("id", 1)
    .execute()
);</markup>

<p>Both examples will return <code>Multi&lt;DbRow&gt;</code> with rows returned by the query.</p>

<p>This example shows a MongoDB update statement with named parameters and the query does not run in transaction:</p>

<markup
lang="java"

>dbClient.execute(exec -&gt; exec
    .createUpdate("{\"collection\": \"pokemons\","
        + "\"value\":{$set:{\"name\":$name}},"
        + "\"query\":{id:$id}}")
    .addParam("id", 1)
    .addParam("name", "Pikachu")
    .execute()
);</markup>

<p>This update statement will return <code>Single&lt;Long&gt;</code> with the number of modified records in the database.</p>


<h4 id="_dml_statement_result">DML Statement Result</h4>
<div class="section">
<p>Execution of DML statements will always return <code>Single&lt;Long&gt;</code> with the number of modified records in the database.</p>

<p>In following example, the number of modified records is printed to standard output:</p>

<markup
lang="java"

>dbClient.execute(exec -&gt; exec
    .insert("INSERT INTO Pokemons (id, name) VALUES(?, ?)",
        1, "Pikachu"))
    .thenAccept(count -&gt;
        System.out.printf("Inserted %d records\n", count));</markup>

</div>

<h4 id="_query_statement_result">Query Statement Result</h4>
<div class="section">
<p>Execution of a query statement will always return <code>Multi&lt;DbRow&gt;&gt;</code>. <code>Multi</code> has several useful properties:</p>

<ul class="ulist">
<li>
<p>It is an implementation of <code>Flow.Publisher</code> to process individual result rows using <code>Flow.Subscriber&lt;DbRow&gt;</code></p>

</li>
<li>
<p><code>Single&lt;List&lt;DbRow&gt;&gt; collectList()</code> to collect all rows and return them as a promise of <code>List&lt;DbRow&gt;</code></p>

</li>
<li>
<p><code>&lt;U&gt; Multi&lt;U&gt; map(…)</code> to map returned result using provided mapper</p>

</li>
</ul>
</div>
</div>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Now that you understand how to build and execute statements, try it for yourself.
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/dbclient">DB Client Examples</a>.</p>

</div>
</doc-view>