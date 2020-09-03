<doc-view>

<h2 id="_configuring_rest_client_with_helidon_mp">Configuring Rest Client with Helidon MP</h2>
<div class="section">
<p>MicroProfile Rest Client adds the capability to invoke remote microservices using a JAX-RS like interface to declare the
operations.</p>

<p>To use the rest client in your project, declare the following dependency:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.rest-client&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-rest-client&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_creating_a_new_client_using_a_builder">Creating a new client using a builder</h2>
<div class="section">
<p>MicroProfile Rest Client can be created using a builder obtained from <code>RestClientBuilder.newBuilder()</code>.
The builder provides methods to configure details for the client and to define the desired rest client interface.</p>

<p>Example:</p>

<markup
lang="java"

>SomeResource someResource = RestClientBuilder.newBuilder()
                                 .baseUri(URI.create("http://localhost:8080/baseUri"))
                                 .build(SomeResource.class);

someResource.someMethod(apiModel);</markup>

</div>

<h2 id="_creating_new_client_cdi">Creating new client - CDI</h2>
<div class="section">
<p>A rest client interface can be annotated with <code>@RegisterRestClient</code> to automatically register it with CDI.
The <code>RegisterRestClient</code> annotation has a property <code>baseUri</code> that can be used to define the base endpoint of this client.
This value can be overridden using configuration.</p>

<p>Example:</p>

<markup
lang="java"

>@RegisterRestClient(baseUri="http://localhost:8080/baseUri")
public interface SomeResource {

// ...

}</markup>

<p>Once a rest client interface is annotated, it can be injected into any CDI bean.</p>

<p>Example:</p>

<markup
lang="java"

>@Inject
@RestClient
SomeResource client;

// ...

client.sampleMethod();</markup>

</div>

<h2 id="_rest_client_configuration">Rest client configuration</h2>
<div class="section">
<p>Rest client implementation allows you to configure its parameters by builder,
annotations, and configuration.</p>

<p>You can configure new providers, base URI/URL and other options of the client.
See specification for full details:
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-rest-client-1.2.1/microprofile-rest-client-1.2.1.html">https://download.eclipse.org/microprofile/microprofile-rest-client-1.2.1/microprofile-rest-client-1.2.1.html</a></p>

</div>

<h2 id="_quickstart_example">Quickstart example</h2>
<div class="section">
<p>To be able to run and test this example, please head to the Helidon examples/quickstarts
and start the helidon-quickstart-mp. Then create project with
the dependency on the Helidon rest client implementation and create the following rest client
interface:</p>

<p>Rest client interface</p>

<markup
lang="java"

>@Path("/greet")
interface GreetRestClient {

     @GET
     JsonObject getDefaultMessage();

     @Path("/{name}")
     @GET
     JsonObject getMessage(@PathParam("name") String name);

}</markup>

<p>Then create runnable method the same way as it is described in
<code>Creating new client - Interface</code>,but with baseUri <code><a id="" title="" target="_blank" href="http://localhost:8080/greet">http://localhost:8080/greet</a></code>
and the above interface.</p>

<p>By calling <code>GreetRestClient.getDefaultMessage()</code> you reach the endpoint of Helidon quickstart.</p>

</div>
</doc-view>