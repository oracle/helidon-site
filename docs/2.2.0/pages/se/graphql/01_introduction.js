<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>GraphQL Server Introduction</dt>
<dd slot="desc"><p>Helidon GraphQL Server provides a framework for creating <a id="" title="" target="_blank" href="https://github.com/graphql-java/graphql-java">GraphQL</a> applications.</p>
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

<h2 id="_quick_start">Quick Start</h2>
<div class="section">
<p>Here is the code for a minimalist GraphQL application that exposes 2 queries.</p>

<markup
lang="java"

>    public static void main(String[] args) {
        WebServer server = WebServer.builder()
                .routing(Routing.builder()
                                 .register(GraphQlSupport.create(buildSchema()))  <span class="conum" data-value="1" />
                                 .build())
                .build();

        server.start()  <span class="conum" data-value="2" />
               .thenApply(webServer -&gt; {
                   String endpoint = "http://localhost:" + webServer.port();
                   System.out.println("GraphQL started on " + endpoint + "/graphql");
                   System.out.println("GraphQL schema availanle on " + endpoint + "/graphql/schema.graphql");
                   return null;
               });
    }

    private static GraphQLSchema buildSchema() {
        String schema = "type Query{\n"    <span class="conum" data-value="3" />
                + "hello: String \n"
                + "helloInDifferentLanguages: [String] \n"
                + "\n}";

        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeDefinitionRegistry = schemaParser.parse(schema);

        // DataFetcher to return various hello's in difference languages  <span class="conum" data-value="4" />
        DataFetcher&lt;List&lt;String&gt;&gt; hellosDataFetcher = (DataFetcher&lt;List&lt;String&gt;&gt;) environment -&gt;
                List.of("Bonjour", "Hola", "Zdravstvuyte", "Nǐn hǎo", "Salve", "Gudday", "Konnichiwa", "Guten Tag");

        RuntimeWiring runtimeWiring = RuntimeWiring.newRuntimeWiring()  <span class="conum" data-value="5" />
                .type("Query", builder -&gt; builder.dataFetcher("hello", new StaticDataFetcher("world")))
                .type("Query", builder -&gt; builder.dataFetcher("helloInDifferentLanguages", hellosDataFetcher))
                .build();

        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);  <span class="conum" data-value="6" />
    }</markup>

<ul class="colist">
<li data-value="1">Register GraphQL support.</li>
<li data-value="2">Start the server.</li>
<li data-value="3">Define the GraphQL schema.</li>
<li data-value="4">Create a DataFetcher to return a List of Hellos in different languages.</li>
<li data-value="5">Wire up the DataFetchers.</li>
<li data-value="6">Generate the GraphQL schema.</li>
</ul>
<p>The example above deploys a very simple service exposing the <code>/graphql</code> endpoint.</p>

<p>You can then probe the endpoints:</p>

<ol style="margin-left: 15px;">
<li>
Hello word endpoint
<markup
lang="bash"

>curl -X POST http://127.0.0.1:PORT/graphql -d '{"query":"query { hello }"}'

"data":{"hello":"world"}}</markup>

</li>
<li>
Hello in different languages
<markup
lang="bash"

>curl -X POST http://127.0.0.1:PORT/graphql -d '{"query":"query { helloInDifferentLanguages }"}'

{"data":{"helloInDifferentLanguages":["Bonjour","Hola","Zdravstvuyte","Nǐn hǎo","Salve","Gudday","Konnichiwa","Guten Tag"]}}</markup>

</li>
</ol>
</div>

<h2 id="_maven_coordinates">Maven Coordinates</h2>
<div class="section">
<p>The <router-link to="/about/04_managing-dependencies">Getting Started</router-link> page describes how you
should declare dependency management for Helidon applications. Then declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.graphql&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-graphql-server&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</doc-view>