<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>About CORS in Helidon MP</dt>
<dd slot="desc"><p><a id="" title="" target="_blank" href="https://www.w3.org/TR/cors/">Cross-origin resource sharing</a> (CORS) support in Helidon MP provides a flexible
mechanism that allows a Helidon MP application to control how other web applications can access its resources, even if that web application is not served from the same domain.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">
<p>You add CORS support to your application by modifying your JAX-RS resource classes.</p>

<ol style="margin-left: 15px;">
<li>
Decide what type of resource sharing each endpoint in your application should allow.<br>

</li>
<li>
Add a dependency on the Helidon MP CORS component.<br>
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications. For CORS support, you must include
the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-cors&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</li>
<li>
Edit each resource class in your application.<br>
For each subpath in the resource that should support CORS:
<ol style="margin-left: 15px;">
<li>
If you do not already have an <code>@OPTIONS</code> method for the subpath, create one.

</li>
<li>
To each <code>@OPTIONS</code> method add a <code>@CrossOrigin</code> annotation which specifies the CORS behavior
you want for that path.

</li>
</ol>
</li>
</ol>
</div>

<h2 id="_understanding_the_crossorigin_annotation">Understanding the <code>@CrossOrigin</code> Annotation</h2>
<div class="section">
<p>Using the <a id="" title="" target="_blank" href="./apidocs/io.helidon.microprofile.cors/io/helidon/microprofile/cors/CrossOrigin.html"><code>@CrossOrigin</code></a> annotation is the preferred way to configure CORS in Helidon MP.
The following is an example of this annotation:</p>

<markup
lang="java"

>@CrossOrigin(value = {"http://foo.bar", "http://bar.foo"},
             allowHeaders = {"X-foo", "X-bar"},
             allowMethods = {HttpMethod.DELETE, HttpMethod.PUT})</markup>

<p>This annotation allows the resource associated with it to be shared with the origins <code><a id="" title="" target="_blank" href="http://foo.bar">http://foo.bar</a></code> and <code><a id="" title="" target="_blank" href="http://bar.foo">http://bar.foo</a></code>
using <code>DELETE</code> or <code>PUT</code> and that requests can include the non-standard headers <code>X-foo</code> and <code>X-bar</code>.</p>

</div>

<h2 id="_revising_your_application">Revising Your Application</h2>
<div class="section">
<p>In the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0-M3/examples/quickstarts/helidon-quickstart-mp">Helidon MP Quickstart application</a> you can change the greeting by sending a PUT
request to the <code>/greet/greeting</code> resource.
The example below extends the Helidon MP QuickStart application (the greeting app) to:</p>

<ul class="ulist">
<li>
<p>Permit unrestricted sharing of the resource that returns greetings, and</p>

</li>
<li>
<p>Restrict sharing of the resource that
updates the greeting so that only the origins <code><a id="" title="" target="_blank" href="http://foo.com">http://foo.com</a></code> and <code><a id="" title="" target="_blank" href="http://there.com">http://there.com</a></code> can change the greeting.</p>

</li>
</ul>
<markup
lang="java"

>@OPTIONS
@CrossOrigin() <span class="conum" data-value="1" />
public void options() {}

@OPTIONS
@Path("/greeting")
@CrossOrigin(allowMethods = {"PUT"}, allowOrigins = {"http://foo.com", "http://there.com"}) <span class="conum" data-value="2" />
public void optionsForGreeting() {}</markup>

<ul class="colist">
<li data-value="1">Uses the default cross-origin sharing, which permits sharing via all HTTP methods to all origins.</li>
<li data-value="2">Specifies sharing only via the <code>PUT</code> HTTP method and only to the two listed origins.</li>
</ul>
</div>

<h2 id="_next_steps">Next steps</h2>
<div class="section">
<ul class="ulist">
<li>
<p>Learn how to use configuration. You and your users can use MicroProfile configuration to override the CORS behavior set in
the application code.</p>

</li>
<li>
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.0.0-M3/examples/microprofile/cors">CORS example</a>.</p>

</li>
</ul>
</div>
</doc-view>