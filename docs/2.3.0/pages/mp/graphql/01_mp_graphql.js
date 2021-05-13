<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>MicroProfile GraphQL</dt>
<dd slot="desc"><p>The Microprofile GraphQL APIs are an extension to <router-link to="#microprofile/01_introduction.adoc" @click.native="this.scrollFix('#microprofile/01_introduction.adoc')">Helidon MP</router-link>
to allow building of applications that can expose a GraphQL endpoint.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_experimental">Experimental</h2>
<div class="section">
<div class="admonition warning">
<p class="admonition-inline">The Helidon GraphQL feature is currently experimental and the APIs are
 subject to changes until GraphQL support is stabilized.</p>
</div>
</div>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable MicroProfile GraphQL
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.graphql&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-graphql-server&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_about_the_microprofile_graphql_specification">About the MicroProfile GraphQL Specification</h2>
<div class="section">
<p>Helidon MP implements the MicroProfile GraphQL
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-graphql">spec</a> version 1.0.3.
The spec prescribes how applications can be built to expose an endpoint for GraphQL.
GraphQL is an open-source data query and manipulation language for APIs,
and a runtime for fulfilling queries with existing data.
It provides an alternative to, though not necessarily a replacement for, REST.</p>

<p>For more information on GraphQL see <a id="" title="" target="_blank" href="https://graphql.org/">https://graphql.org/</a>.</p>

</div>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">

<h3 id="_defining_your_api">Defining your API</h3>
<div class="section">
<p>The MicroProfile GraphQL specification defines a number of key annotations to be used when writing a GraphQL endpoint:</p>

<ul class="ulist">
<li>
<p><code>@GraphQLApi</code> - identifies a CDI Bean as a GraphQL Endpoint</p>

</li>
<li>
<p><code>@Query</code> - identifies a method as returning specified fields for an object or collection of entities</p>

</li>
<li>
<p><code>@Mutation</code> - identifies a method which creates, deletes or updates entities</p>

</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">Please see the <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-graphql">Microprofile GraphQL spec</a> for the full list of available annotations.</p>
</div>
<p>For example, the following defines a GraphQL endpoint with a number of queries and mutations that work
against a fictional <code>CustomerService</code> service and <code>Customer</code> class.</p>

<markup
lang="java"
title="Simple ContactGraphQLApi"
>@ApplicationScoped
@org.eclipse.microprofile.graphql.GraphQLApi
public class ContactGraphQLApi {

    @Inject
    private CustomerService customerService;

    @org.eclipse.microprofile.graphql.Query
    public Collection&lt;Customer&gt; findAllCustomers() {  <span class="conum" data-value="1" />
        return customerService.getAllCustomers();
    }

    @org.eclipse.microprofile.graphql.Query
    public Customer findCustomer(@Name("customerId") int id) {  <span class="conum" data-value="2" />
        return customerService.getCustomer(id);
    }

    @org.eclipse.microprofile.graphql.Query
    public Collection&lt;Customer&gt; findCustomersByName(@Name("name") String name) {  <span class="conum" data-value="3" />
        return customerService.getAllCustomers(name);
    }

    @org.eclipse.microprofile.graphql.Mutation
    public Contact createCustomer(@Name("customerId") int id,  <span class="conum" data-value="4" />
                                  @Name("name") String name,
                                  @Name("balance") float balance) {
        return customerService.createCustomer(id, name, balance);
    }
}

public class customer {
    private int id;
    @NonNull
    private String name;
    private float balance;

    // getters and setters omitted for brevity
}</markup>

<ul class="colist">
<li data-value="1">a query with no-arguments that will return all Customers</li>
<li data-value="2">a query that takes an argument to return a specific Customer</li>
<li data-value="3">a query that optionally takes a name and returns a collection of Customers</li>
<li data-value="4">a mutation that creates a Customer and returns the newly created Customer</li>
</ul>
<p>The above would generate a GraphQL schema as shown below:</p>

<markup
lang="graphql"
title="Sample GraphQL Schema"
>type Query {
   findAllCustomers: [Customer]
   findCustomer(customerId: Int!): Customer
   findCustomersByName(name: String): [Customers]
}

type Mutation {
   createCustomer(customerId: Int!, name: String!, balance: Float!): Customer
}

type Customer {
   id: Int!
   name: String!
   balance: Float
}</markup>

<p>After application startup, a GraphQL schema will be generated from your annotated API classes
and POJO&#8217;s and you will be able to access these via the URL&#8217;s described below.</p>

</div>

<h3 id="_creating_your_entry_point">Creating your entry-point</h3>
<div class="section">
<p>As per the instructions <router-link to="/mp/introduction/02_microprofile">here</router-link> ensure you have added a
<code>src/main/resources/META-INF/beans.xml</code> file, so the CDI implementation can pick up your classes.</p>

<p>A <code>Main</code> class is not needed, you can configure <code>io.helidon.microprofile.cdi.Main</code> as the entry point.</p>

<p>Optionally, you can configure a custom entry point (such as when you need custom configuration setup).</p>

<markup
lang="java"
title="Sample Entry-point"
>public class MyMain {
    public static void main(String[] args) {
        io.helidon.microprofile.cdi.Main.main(args);
    }
}</markup>

</div>

<h3 id="_building_your_application">Building your application</h3>
<div class="section">
<p>As part of building your application, you must create a Jandex index
using the <code>jandex-maven-plugin</code> for all API and POJO classes that are used.</p>

<markup
lang="xml"
title="Generate Jandex index"
>&lt;plugin&gt;
&lt;groupId&gt;org.jboss.jandex&lt;/groupId&gt;
&lt;artifactId&gt;jandex-maven-plugin&lt;/artifactId&gt;
&lt;executions&gt;
  &lt;execution&gt;
    &lt;id&gt;make-index&lt;/id&gt;
  &lt;/execution&gt;
&lt;/executions&gt;
&lt;/plugin&gt;</markup>

</div>
</div>

<h2 id="_accessing_the_graphql_end_points">Accessing the GraphQL end-points</h2>
<div class="section">
<p>After starting your application you should see a message similar to the following indicating the GraphQL support is available:</p>

<markup
lang="bash"
title="Sample Startup output"
>2020.11.16 12:29:58 INFO io.helidon.common.HelidonFeatures Thread[features-thread,5,main]: Helidon MP 2.1.1-SNAPSHOT features: [CDI, Config, Fault Tolerance, GraphQL, Health, JAX-RS, Metrics, Open API, Security, Server, Tracing]
2020.11.16 12:29:58 INFO io.helidon.common.HelidonFeatures.experimental Thread[features-thread,5,main]: You are using experimental features. These APIs may change, please follow changelog!
2020.11.16 12:29:58 INFO io.helidon.common.HelidonFeatures.experimental Thread[features-thread,5,main]: 	Experimental feature: GraphQL (GraphQL)</markup>

<p>You can then use your GraphQL client via the default endpoint <code><a id="" title="" target="_blank" href="http://host:port/graphql">http://host:port/graphql</a></code>.</p>

<p>The GraphQL Schema is available via <code><a id="" title="" target="_blank" href="http://host:port/graphql/schema.graphql">http://host:port/graphql/schema.graphql</a></code>.</p>

<div class="admonition note">
<p class="admonition-inline">If you wish to use the GraphiQL UI (<a id="" title="" target="_blank" href="https://github.com/graphql/graphiql">https://github.com/graphql/graphiql</a>) then please see the Helidon Microprofile GraphQL
example at the following URL:
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/microprofile/graphql">https://github.com/oracle/helidon/tree/master/examples/microprofile/graphql</a></p>
</div>
</div>

<h2 id="_configuration_options">Configuration Options</h2>
<div class="section">

<h3 id="_microprofile_graphql">MicroProfile GraphQL</h3>
<div class="section">
<p>The specification defines the following configuration options:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>mp.graphql.defaultErrorMessage</code></td>
<td class=""><code>Server Error</code></td>
<td class="">Error message to send to caller in case of error</td>
</tr>
<tr>
<td class=""><code>mp.graphql.exceptionsBlackList</code></td>
<td class="">&#160;</td>
<td class="">Array of checked exception classes that should return default error message</td>
</tr>
<tr>
<td class=""><code>mp.graphql.exceptionsWhiteList</code></td>
<td class="">&#160;</td>
<td class="">Array of unchecked exception classes that should return message to caller (instead of default error message)</td>
</tr>
</tbody>
</table>
</div>
<p>These configuration options are more significant that the configuration options
 that can be used to configure GraphQL invocation (see below).</p>

</div>

<h3 id="_helidon_graphql">Helidon GraphQL</h3>
<div class="section">
<p>In addition, we provide the following configuration options:</p>

<p>The following configuration keys can be used to set up integration with WebServer:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>graphql.web-context</code></td>
<td class=""><code>/graphql</code></td>
<td class="">Context that serves the GraphQL endpoint.</td>
</tr>
<tr>
<td class=""><code>graphql.schema-uri</code></td>
<td class=""><code>/schema.graphql</code></td>
<td class="">URI that serves the schema (under web context)</td>
</tr>
<tr>
<td class=""><code>graphql.cors</code></td>
<td class="">&#160;</td>
<td class="">CORS configuration for this service</td>
</tr>
<tr>
<td class=""><code>graphql.executor-service</code></td>
<td class="">&#160;</td>
<td class="">Configuration of <code>ServerThreadPoolSupplier</code> used to set up executor service</td>
</tr>
</tbody>
</table>
</div>
<p>The following configuration keys can be used to set up GraphQL invocation:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 22.222%;">
<col style="width: 22.222%;">
<col style="width: 55.556%;">
</colgroup>
<thead>
<tr>
<th>key</th>
<th>default value</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>graphql.default-error-message</code></td>
<td class=""><code>Server Error</code></td>
<td class="">Error message to send to caller in case of error</td>
</tr>
<tr>
<td class=""><code>graphql.exception-white-list</code></td>
<td class="">&#160;</td>
<td class="">Array of checked exception classes that should return default error message</td>
</tr>
<tr>
<td class=""><code>graphql.exception-black-list</code></td>
<td class="">&#160;</td>
<td class="">Array of unchecked exception classes that should return message to caller (instead of default error message)</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</doc-view>