<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OpenAPI</dt>
<dd slot="desc"><p>Easily allow your Helidon MP application to serve an OpenAPI document
that describes your application&#8217;s endpoints.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_openapi_support_in_helidon_mp">OpenAPI support in Helidon MP</h2>
<div class="section">
<p>You can very simply add support for OpenAPI to your Helidon MP application. This
document shows what changes you need to make to your application and how to access
the OpenAPI document for your application at runtime.</p>

</div>

<h2 id="_changing_your_application">Changing your application</h2>
<div class="section">
<p>Helidon MP conforms to the <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/spec/src/main/asciidoc/microprofile-openapi-spec.adoc">MicroProfile OpenAPI specification</a>,
which was inspired by the <a id="" title="" target="_blank" href="https://github.com/OAI/OpenAPI-Specification">OpenAPI spec</a> itself.</p>

<p>Helidon MP includes a <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/1.4.7/examples/microprofile/openapi-basic">complete OpenAPI example</a>
based on the MP quick-start sample app.</p>

<p>To use OpenAPI from your Helidon MP app:</p>

<ol style="margin-left: 15px;">
<li>
Edit your <code>pom.xml</code>.

</li>
<li>
Furnish OpenAPI information about your application&#8217;s endpoints.

</li>
<li>
Update your application&#8217;s configuration (optional).

</li>
</ol>

<h3 id="_edit_your_pom_xml">Edit your <code>pom.xml</code></h3>
<div class="section">

<h4 id="_building_the_jandex_index">Building the Jandex index</h4>
<div class="section">
<p>A Jandex index stores information about the classes and methods in your app and
what annotations they have. It allows CDI to process annotations faster during your
application&#8217;s start-up.</p>

<p>Add the <a id="" title="" target="_blank" href="https://github.com/wildfly/jandex-maven-plugin">Jandex maven plug-in</a> to the <code>&lt;build&gt;&lt;plugins&gt;</code>
section of your <code>pom.xml</code>:</p>

<markup
lang="xml"

>&lt;plugin&gt;
    &lt;groupId&gt;org.jboss.jandex&lt;/groupId&gt;
    &lt;artifactId&gt;jandex-maven-plugin&lt;/artifactId&gt;
    &lt;version&gt;1.0.6&lt;/version&gt;
    &lt;executions&gt;
      &lt;execution&gt;
        &lt;id&gt;make-index&lt;/id&gt;
        &lt;goals&gt;
          &lt;goal&gt;jandex&lt;/goal&gt;
        &lt;/goals&gt;
      &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;</markup>

<p>When you build your app <code>maven</code> should include the index <code>META-INF/jandex.idx</code> in
the JAR.</p>

<div class="admonition note">
<p class="admonition-textlabel">Note</p>
<p ><p>If you <em>do not</em> modify your build to create
the index then the Helidon MP OpenAPI runtime automatically creates one in memory during
app start-up. This slows down your app start-up and, depending on how CDI is
configured, might inadvertently miss information.</p>

<p>We <em>strongly recommend</em> using the Jandex plug-in to build the index into your app.</p>
</p>
</div>
</div>

<h4 id="_adding_helidon_mp_openapi_support_to_your_app">Adding Helidon MP OpenAPI support to your app</h4>
<div class="section">
<p>Add these two sections to the <code>&lt;dependencies&gt;</code> portion of your <code>pom.xml</code>:</p>

<markup
lang="xml"

>&lt;dependency&gt; <span class="conum" data-value="1" />
    &lt;groupId&gt;org.eclipse.microprofile.openapi&lt;/groupId&gt;
    &lt;artifactId&gt;microprofile-openapi-api&lt;/artifactId&gt;
    &lt;version&gt;1.1.2&lt;/version&gt;
&lt;/dependency&gt;

&lt;dependency&gt; <span class="conum" data-value="2" />
    &lt;groupId&gt;io.helidon.microprofile.openapi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-openapi&lt;/artifactId&gt;
    &lt;version&gt;1.4.7&lt;/version&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">Defines the MicroProfile OpenAPI annotations so you can use them in your code.</li>
<li data-value="2">Adds the Helidon MP OpenAPI runtime support.</li>
</ul>
</div>
</div>

<h3 id="_furnish_openapi_information_about_your_endpoints">Furnish OpenAPI information about your endpoints</h3>
<div class="section">
<p>Helidon MP OpenAPI combines information from all of the following sources as it
builds its in-memory model of your application&#8217;s API. It constructs the OpenAPI
document from this internal model. Your application can use one or more of these
techniques.</p>


<h4 id="_annotate_the_endpoints_in_your_app">Annotate the endpoints in your app</h4>
<div class="section">
<p>You can add MicroProfile OpenAPI annotations to the endpoints in your source code.
These annotations allow the Helidon MP OpenAPI runtime to discover the endpoints
and information about them via CDI at app start-up.</p>

<p>Here is one of the endpoints, annotated for OpenAPI, from the example mentioned earlier:</p>

<markup
lang="java"

>@GET
@Operation(summary = "Returns a generic greeting", <span class="conum" data-value="1" />
        description = "Greets the user generically")
@APIResponse(description = "Simple JSON containing the greeting", <span class="conum" data-value="2" />
        content = @Content(mediaType = "application/json",
                           schema = @Schema(implementation = GreetingMessage.class)))
@Produces(MediaType.APPLICATION_JSON)
public JsonObject getDefaultMessage() {...}</markup>

<ul class="colist">
<li data-value="1"><code>@Operation</code> gives information about this endpoint.</li>
<li data-value="2"><code>@APIResponse</code> describes the HTTP response and declares its media type and contents.</li>
</ul>
<p>You can also define any request parameters the endpoint expects, although this
endpoint uses none.</p>

<p>This excerpt shows only a few annotations for illustration. The
<a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/1.4.7/examples/microprofile/openapi-basic">Helidon MP OpenAPI example</a> illustrates more,
and the <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/spec/src/main/asciidoc/microprofile-openapi-spec.adoc">MicroProfile OpenAPI spec</a> describes them all.</p>

</div>

<h4 id="_provide_a_static_openapi_file">Provide a static OpenAPI file</h4>
<div class="section">
<p>Add a static file at <code>META-INF/openapi.yml</code>, <code>META-INF/openapi.yaml</code>,
or <code>META-INF/openapi.json</code>. Tools such as Swagger let you describe your app&#8217;s API
and they then generate an OpenAPI document file which you can include in your application
so OpenAPI can use it.</p>

</div>

<h4 id="_write_and_configure_a_model_reader_class">Write and configure a model reader class</h4>
<div class="section">
<p>Write a Java class that implements the OpenAPI
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/api/src/main/java/org/eclipse/microprofile/openapi/OASModelReader.java"><code>org.eclipse.microprofile.openapi.OASModelReader</code></a> interface. Your
model reader code programmatically adds elements to the internal model that OpenAPI
builds.</p>

<p>Change your application&#8217;s MP configuration to set <code>mp.openapi.model.reader</code> as the
fully-qualified class name of your class.</p>

</div>

<h4 id="_write_and_configure_a_filter_class">Write and configure a filter class</h4>
<div class="section">
<p>Write a Java class that implements the OpenAPI
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/api/src/main/java/org/eclipse/microprofile/openapi/OASFilter.java"><code>org.eclipse.microprofile.openapi.OASFilter</code></a> interface.
As OpenAPI composes its internal model, it invokes your filter with each
model element <em>before</em> adding the element to the model. Your filter can
accept the element as-is, modify it, or suppress it.</p>

<p>Change your application&#8217;s configuration to set <code>mp.openapi.filter</code> as the full-qualified
class name of your class.</p>

</div>
</div>

<h3 id="_update_your_application_configuration">Update your application configuration</h3>
<div class="section">
<p>Beyond the two config properties that denote the model reader and filter, Helidon
MP OpenAPI supports a number of others. These are described in the
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/spec/src/main/asciidoc/microprofile-openapi-spec.adoc#configuration">configuration section</a> of the MicroProfile
OpenAPI spec.</p>

</div>
</div>

<h2 id="_accessing_the_openapi_document">Accessing the OpenAPI document</h2>
<div class="section">
<p>Now your Helidon MP application will automatially respond to an additional endpoint&#8201;&#8212;&#8201; <code>/openapi</code>&#8201;&#8212;&#8201;and it will return the OpenAPI document describing the endpoints
in your application.</p>

<p>By default, per the MicroProfile OpenAPI spec, the default format of the OpenAPI document is YAML.
There is not yet an adopted IANA YAML media type, but a proposed one specifically
for OpenAPI documents that has some support is <code>application/vnd.oai.openapi</code>.
That is what Helidon returns, by default.</p>

<p>A client can specify <code>Accept:</code> as either <code>application/vnd.oai.openapi+json</code> or <code>application/json</code>
to request JSON.</p>

</div>
</doc-view>