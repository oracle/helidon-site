<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Bean Validation Introduction</dt>
<dd slot="desc"><p>Helidon supports Bean Validation via its integration with JAX-RS/Jersey. The
<a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.bean-validation">Jakarta Bean
Validation specification</a> defines an API to validate Java beans.
Bean Validation is supported in REST resource classes as well as in
regular application beans.</p>
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
<p>To enable Bean Validation
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
  &lt;groupId&gt;org.glassfish.jersey.ext&lt;/groupId&gt;
  &lt;artifactId&gt;jersey-bean-validation&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_validation_example_in_helidon_mp">Validation Example in Helidon MP</h2>
<div class="section">
<p>The following example shows a simple resource method annotated with <code>@POST</code> whose
parameter must be <em>not null</em> and <em>valid</em>. Validating a parameter in this case implies
making sure that any constraint annotations in the <code>Greeting</code> class are satisfied.
The resource method shall never be called if the validation fails, with a 400
(Bad Request) status code returned instead.</p>

<markup
lang="java"

>@Path("helloworld")
public class HelloWorld {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void post(@NotNull @Valid Greeting greeting) {
        // ...
    }
}</markup>

</div>
</doc-view>