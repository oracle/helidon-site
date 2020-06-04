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
mechanism that allows a Helidon MP application to control how another web application can access its resources,
even if that web application is served from a different domain.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>The CORS protocol helps developers control if and how REST resources served by their applications can be shared across origins.
Helidon MP includes an implementation of CORS that you can use to add CORS behavior
to the services you develop. You can define your application&#8217;s CORS behavior programmatically using the Helidon CORS API alone, or
together with configuration. Helidon also provides three built-in services that add their
own endpoints to your application - health, metrics, and OpenAPI - that have integrated CORS support.
By adding very little code to your application, you control how all the resources in
your application&#8201;&#8212;&#8201;the ones you write and the ones provided by the Helidon built-in services&#8201;&#8212;&#8201;can be shared across origins.</p>

</div>

<h2 id="_before_you_begin">Before You Begin</h2>
<div class="section">
<p>Before you revise your application to add CORS support, you need to decide what type of cross-origin sharing you want
to allow for each resource your application exposes.
For example, suppose for a given resource you want to allow unrestricted sharing for GET, HEAD, and POST requests
(what CORS refers to as "simple" requests), but permit other types of requests only from the two
origins <code>foo.com</code> and <code>there.com</code>.
Your application would implement two types of CORS sharing: more relaxed for the
simple requests and stricter for others.</p>

<p>Once you know the type of sharing you want to allow for each of your resources&#8201;&#8212;&#8201;including any from built-in
services&#8201;&#8212;&#8201;you can change your application accordingly.</p>

</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>To introduce CORS into your Helidon MP application, do any or all of the following:</p>

<ul class="ulist">
<li>
<p>Modify your code using the Helidon MP CORS API. <router-link to="/mp/cors/02_using-cors">Learn more.</router-link></p>

</li>
<li>
<p>Use configuration to allow users to override the CORS settings established in your application code. <router-link to="/mp/cors/03_configuration-with-cors-mp">Learn more.</router-link></p>

</li>
<li>
<p>Update your application to include any of the built-in Helidon services that automatically
support CORS. <router-link to="/mp/cors/04_support-in-builtin-services">Learn more.</router-link></p>

</li>
</ul>
</div>
</doc-view>