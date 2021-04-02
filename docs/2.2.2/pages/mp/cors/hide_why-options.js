<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Why `@OPTIONS`?</dt>
<dd slot="desc"><p>There are some good reasons why it is <code>@OPTIONS</code> methods that you decorate with the Helidon MP
<code>@CrossOrigin</code> annotation. Take an informal look at the rationale for this choice.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_the_resource">The Resource</h2>
<div class="section">
<p>At the heart of cross-origin resource sharing is the <em>resource</em> itself.
CORS lets you control how a given resource should be shared among various origins.
All the attributes of CORS&#8201;&#8212;&#8201;whether authentication should be used, what headers can be passed through on
CORS-controlled requests, and so on&#8201;&#8212;&#8201;pertain to a given resource.</p>

<p>In Helidon MP, the parameters defined on the <code>@CrossOrigin</code> annotation map directly to those
CORS sharing attributes.
It would be natural, then, to use <code>@CrossOrigin</code> to annotate the single Java element in the application that represents
a resource.</p>

</div>

<h2 id="_methods_resources_and_subresources_in_jax_rs_resource_classes">Methods, Resources, and Subresources in JAX-RS Resource Classes</h2>
<div class="section">
<p>Unfortunately, there is no single Java element that is sure to correspond one-to-one with a JAX-RS resource,
for two reasons.</p>

<ol style="margin-left: 15px;">
<li>
JAX-RS allows a resource class to define one or more subresources, denoted by the <code>@Path</code> annotation
on methods. So a resource class does not necessarily represent only a single resource.

</li>
<li>
A JAX-RS resource class can contain multiple endpoints for the same resource.
A common example is two methods, annotated with <code>@GET</code> and <code>@PUT</code> respectively, that have the same path.

</li>
</ol>
<p>Although no single endpoint method by itself fully represents the resource, at
least each endpoint method maps to exactly one resource.
So we could annotate any one of those endpoint methods with <code>@CrossOrigin</code> and unambiguously link
the CORS behavior that the annotation defines to the resource.</p>

<p>But which endpoint method, and why?</p>

</div>

<h2 id="_options_in_cors_options_in_jax_rs_and_technical_reality"><code>OPTIONS</code> in CORS, <code>@OPTIONS</code> in JAX-RS, and Technical Reality</h2>
<div class="section">
<p>The <code>OPTIONS</code> HTTP method plays an important role in CORS.
While the CORS protocol <em>applies</em> to all HTTP methods, it <em>relies on</em> <code>OPTIONS</code>&#8201;&#8212;&#8201;with suitable headers&#8201;&#8212;&#8201;to represent CORS pre-flight requests.
From that point of view, the <code>OPTIONS</code> HTTP method has a more prominent place in CORS than the other methods.</p>

<p>In a JAX-RS resource class, the <code>@OPTIONS</code> annotation denotes which endpoint method should receive incoming <code>OPTIONS</code>
HTTP requests for a resource.
Therefore, we could view a Java method annotated with <code>@OPTIONS</code> as somewhat distinguished in the same way that
we think of the <code>OPTIONS</code> HTTP method as distinguished within the CORS protocol.</p>

<p>Furthermore, there is this technical detail:
Helidon MP uses a JAX-RS filter internally to gather information about each <code>@CrossOrigin</code> annotation.
Some JAX-RS implementations do not provide the filter with what it needs to find and introspect the <code>@CrossOrigin</code>
annotation unless the application itself implements the <code>@OPTIONS</code> endpoint for the resource.</p>

</div>

<h2 id="_the_bottom_line">The Bottom Line</h2>
<div class="section">
<p>If you want a resource to participate in CORS, Helidon MP needs you to implement the <code>@OPTIONS</code> endpoint method for the
resource, even if the method does nothing.
Given that you have to write that method, and given that any endpoint method uniquely identifies its resource,
the <code>@OPTIONS</code> method is a reasonable place to ask you to annotate with <code>@CrossOrigin</code>.</p>

</div>
</doc-view>