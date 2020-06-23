<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OpenAPI in SE</dt>
<dd slot="desc"><p>Easily allow your Helidon SE application to serve an OpenAPI document
that describes your application&#8217;s endpoints.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_openapi_support_in_helidon_se">OpenAPI support in Helidon SE</h2>
<div class="section">
<p>You can very simply add support for OpenAPI to your Helidon SE application. This
document shows what changes you need to make to your application and how to access
the OpenAPI document for your application at runtime.</p>

</div>

<h2 id="_changing_your_application">Changing your application</h2>
<div class="section">
<p>OpenAPI support in Helidon SE largely follows the
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/spec/src/main/asciidoc/microprofile-openapi-spec.adoc">MicroProfile OpenAPI spec</a>.
But Helidon SE does not process annotations, which is one way to convey OpenAPI
information about the endpoints in your app. You can still use OpenAPI with your
Helidon SE app by providing OpenAPI information about the endpoints without
using annotations.</p>

<p>Helidon SE includes a <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0/examples/openapi">complete OpenAPI example</a>
based on the SE quick-start sample app.</p>

<p>To use OpenAPI from your Helidon SE app:</p>

<ol style="margin-left: 15px;">
<li>
Edit your <code>pom.xml</code>.

</li>
<li>
Update your Java code to register <code>OpenAPISupport</code>.

</li>
<li>
Furnish OpenAPI information about your application&#8217;s endpoints.

</li>
<li>
Update your application&#8217;s Helidon configuration (optional).

</li>
</ol>

<h3 id="_edit_your_pom_xml">Edit your <code>pom.xml</code></h3>
<div class="section">
<p>Add a dependency for Helidon SE OpenAPI runtime support:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.openapi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-openapi&lt;/artifactId&gt;
    &lt;version&gt;2.0.0&lt;/version&gt;
&lt;/dependency&gt;</markup>

<p>This is a compile-time dependency, because your code must register
<code>OpenAPISupport</code> (a class in that artifact) like this:</p>

</div>

<h3 id="_register_openapisupport_in_your_java_code">Register <code>OpenAPISupport</code> in your Java code</h3>
<div class="section">
<markup
lang="java"

>Config config = Config.create();
...
return Routing.builder()
        .register(JsonSupport.create())
        .register(OpenAPISupport.create(config)) <span class="conum" data-value="1" />
        .register(health)                   // Health at "/health"
        .register(metrics)                  // Metrics at "/metrics"
        .register("/greet", greetService)
        .build();</markup>

<ul class="colist">
<li data-value="1">Adds the <code>OpenAPISupport</code> service to your server.</li>
</ul>
</div>

<h3 id="_furnish_openapi_information_about_your_endpoints">Furnish OpenAPI information about your endpoints</h3>
<div class="section">
<p>Helidon SE OpenAPI combines information from all of the following sources as it
builds its in-memory model of your application&#8217;s API. It constructs the OpenAPI
document from this internal model. Your application can use one or more of
these techniques.</p>


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

<p>Change your application&#8217;s configuration to set <code>openapi.model.reader</code> as the
fully-qualified class name of your class. Also see
<router-link to="#_add_openapi_dependency" @click.native="this.scrollFix('#_add_openapi_dependency')">Add OpenAPI dependency</router-link> below.</p>

</div>

<h4 id="_write_and_configure_a_filter_class">Write and configure a filter class</h4>
<div class="section">
<p>Write a Java class that implements the OpenAPI
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-open-api/blob/master/api/src/main/java/org/eclipse/microprofile/openapi/OASFilter.java"><code>org.eclipse.microprofile.openapi.OASFilter</code></a> interface.
As OpenAPI composes its internal model, it invokes your filter with each
model element <em>before</em> adding the element to the model. Your filter can
accept the element as-is, modify it, or suppress it.</p>

<p>Change your application&#8217;s configuration to set <code>openapi.filter</code> as the full-qualified
class name of your class. Also see
<router-link to="#_add_openapi_dependency" @click.native="this.scrollFix('#_add_openapi_dependency')">Add OpenAPI dependency</router-link> below.</p>

</div>

<h4 id="_add_openapi_dependency">Add OpenAPI dependency</h4>
<div class="section">
<p>If you implement either a model reader or a filter, add this dependency to your
<code>pom.xml</code>:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;org.eclipse.microprofile.openapi&lt;/groupId&gt;
    &lt;artifactId&gt;microprofile-openapi-api&lt;/artifactId&gt;
    &lt;version&gt;1.1.2&lt;/version&gt;
&lt;/dependency&gt;</markup>

</div>
</div>

<h3 id="_update_application_configuration">Update application configuration</h3>
<div class="section">
<p>Helidon SE support for OpenAPI supports a handful of config properties patterned after
those described in the MicroProfile OpenAPI spec, two of which were mentioned above.</p>

<div class="block-title"><span>Helidon SE OpenAPI Config Properties</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>openapi.model.reader</code></td>
<td class="">Fully-qualified class name for the model reader</td>
</tr>
<tr>
<td class=""><code>openapi.filter</code></td>
<td class="">Fully-qualified class name for the filter</td>
</tr>
<tr>
<td class=""><code>openapi.servers</code></td>
<td class="">Lists servers that provide connectivity information</td>
</tr>
<tr>
<td class=""><code>openapi.servers.path</code></td>
<td class="">Prefix for config properties specifying alternative
servers for given paths</td>
</tr>
<tr>
<td class=""><code>openapi.servers.operation</code></td>
<td class="">Prefix for config properties specifying alternative
servers for given operations</td>
</tr>
</tbody>
</table>
</div>
<p>For more information on what these settings do consult the MicroProfile OpenAPI spec.</p>

<p>Helidon SE also supports additional properties.</p>

<div class="block-title"><span>Helidon SE-specific OpenAPI Config Properties</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Property</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>openapi.web-context</code></td>
<td class="">Path which serves the OpenAPI document (defaults to <code>/openapi</code>)</td>
</tr>
<tr>
<td class=""><code>openapi.static-file</code></td>
<td class="">Full path to the static OpenAPI file (defaults to
 <code>META-INF/openapi.yml</code>,
 <code>META-INF/openapi.yaml</code>, or
 <code>META-INF/openapi.json</code>)</td>
</tr>
</tbody>
</table>
</div>
<p>Set these config properties in one of the config sources your app uses so the
Helidon config system will load them. Often developers use <code>application.yaml</code> at the
top level of the application JAR.</p>

</div>
</div>

<h2 id="_accessing_the_openapi_document">Accessing the OpenAPI document</h2>
<div class="section">
<p>Now your Helidon SE application will automatically respond to an additional endpoint&#8201;&#8212;&#8201; <code>/openapi</code>&#8201;&#8212;&#8201;and it will return the OpenAPI document describing the endpoints
in your application.</p>

<p>By default, Helidon OpenAPI returns the OpenAPI document in YAML.
There is not yet an adopted IANA YAML media type, but a proposed one specifically
for OpenAPI documents that has some support is <code>application/vnd.oai.openapi</code>.
That is what Helidon returns, by default.</p>

<p>In addition a client can specify <code>Accept:</code> as either <code>application/vnd.oai.openapi+json</code> or <code>application/json</code>
to request JSON.</p>

</div>
</doc-view>