<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Using the Helidon MP CORS API</dt>
<dd slot="desc"><p>To enable CORS behavior for a resource in your Helidon MP application, you simply add the Helidon MP <code>@CrossOrigin</code>
annotation to a particular method in your resource class.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_understanding_the_crossorigin_annotation">Understanding the <code>@CrossOrigin</code> Annotation</h2>
<div class="section">
<p>You set up CORS in Helidon MP using the <a id="" title="" target="_blank" href="./apidocs/io.helidon.microprofile.cors/io/helidon/microprofile/cors/CrossOrigin.html"><code>@CrossOrigin</code></a> annotation.</p>

<p>The following example of the <code>@CrossOrigin</code> annotation allows the resource associated with it to be shared with the origins <code>http://foo.bar</code> and <code>http://bar.foo</code>
using <code>DELETE</code> or <code>PUT</code>, and permits requests to include the non-standard headers <code>X-foo</code> and <code>X-bar</code>.</p>

<markup
lang="java"

>@CrossOrigin(value = {"http://foo.bar", "http://bar.foo"},
             allowHeaders = {"X-foo", "X-bar"},
             allowMethods = {HttpMethod.DELETE, HttpMethod.PUT})</markup>

</div>

<h2 id="_getting_started">Getting Started</h2>
<div class="section">
<p>To add CORS support to your Helidon MP application:</p>

<ol style="margin-left: 15px;">
<li>
Determine the type of cross-origin resource sharing you want to allow
for each endpoint in your application.

</li>
<li>

<div><p>Add a dependency on the Helidon MP CORS artifact to your Maven <code>pom.xml</code> file.</p>

<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you
should declare dependency management for Helidon applications.
For CORS support in Helidon MP, you must include
the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-cors&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>
</div>

</li>
<li>
Edit each JAX-RS resource class in your application to add the desired CORS behavior as described in the following sections.

</li>
</ol>
</div>

<h2 id="_adding_cors_support_to_your_helidon_mp_application">Adding CORS Support to Your Helidon MP Application</h2>
<div class="section">
<p>Adding CORS behavior to your Helidon MP application involves two simple changes to your application code:</p>

<ol style="margin-left: 15px;">
<li>
For each resource and subresource in each resource class, make sure you have a Java method annotated with
<code>@OPTIONS</code> and with the correct <code>@Path</code>. Create these methods for each resource if you do not already have them.

</li>
<li>
To each of those methods, add a <code>@CrossOrigin</code> annotation that describes the cross-origin sharing you want
for that resource.

</li>
</ol>
<p>The Helidon MP CORS implementation automatically uses the <code>@CrossOrigin</code> annotation you add to each <code>@OPTIONS</code> method to
enforce cross-origin sharing behavior for the resource identified by that method&#8217;s <code>@Path</code> annotation.</p>

<p>For an informal look at the reasons for applying the <code>@CrossOrigin</code> annotation to the <code>@OPTIONS</code> method, instead of another
method, see <router-link to="/mp/cors/hide_why-options">Why <code>@OPTIONS</code>?</router-link>.</p>

</div>

<h2 id="_sample_application_using_the_crossorigin_annotation">Sample Application Using the <code>@CrossOrigin</code> Annotation</h2>
<div class="section">
<p>In the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.2.2/examples/quickstarts/helidon-quickstart-mp">Helidon MP Quickstart application</a> you can change the greeting by sending a <code>PUT</code>
request to the <code>/greet/greeting</code> resource.
The example below extends the Helidon MP QuickStart application (the greeting app) to:</p>

<ul class="ulist">
<li>
<p>Permit unrestricted sharing of the resource that returns greetings, and</p>

</li>
<li>
<p>Restrict sharing of the resource that
updates the greeting so that only the origins <code>http://foo.com</code> and <code>http://there.com</code> can change the greeting.</p>

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
<p>Use MicroProfile configuration to override the CORS behavior set in
the application code. <router-link to="/mp/cors/03_configuration-with-cors-mp">Learn more.</router-link></p>

</li>
<li>
<p>See the Helidon CORS support in action by building and running the <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/2.2.2/examples/microprofile/cors">CORS example</a>.</p>

</li>
</ul>
</div>
</doc-view>