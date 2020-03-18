<doc-view>

<h2 id="_helidon_mp">Helidon MP</h2>
<div class="section">
<p>Helidon is a collection of Java libraries for writing microservices. Helidon
offers two programming models: <router-link to="/about/02_se-about">Helidon SE</router-link>
and Helidon MP.</p>

<p>Helidon MP is an implementation of the
<a id="" title="" target="_blank" href="https://microprofile.io">MicroProfile</a>
<a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile/releases">specification</a>.
Helidon 1.4.3 supports MicroProfile 3.2. Since
MicroProfile has its roots in Java EE, you&#8217;ll find that the MicroProfile
APIs follow a familiar, declarative approach with heavy use of annotations.
This makes it a good choice for Java EE developers.</p>

</div>

<h2 id="_microprofile_apis">MicroProfile APIs</h2>
<div class="section">
<p>MicroProfile starts with a core of Java EE APIs, then defines a number
of new APIs to add capabilities you need for writing modern cloud native
applications:</p>

<ul class="ulist">
<li>
<p>JAX-RS</p>

</li>
<li>
<p>JSON-P</p>

</li>
<li>
<p>JSON-B</p>

</li>
<li>
<p>CDI</p>

</li>
<li>
<p>MicroProfile Config</p>

</li>
<li>
<p>MicroProfile Fault Tolerance</p>

</li>
<li>
<p>MicroProfile Health</p>

</li>
<li>
<p>MicroProfile JWT Authentication</p>

</li>
<li>
<p>MicroProfile Metrics</p>

</li>
<li>
<p>MicroProfile OpenAPI</p>

</li>
<li>
<p>MicroProfile OpenTracing</p>

</li>
<li>
<p>MicroProfile Rest Client</p>

</li>
</ul>
<p>For more information see the Helidon MicroProfile <router-link to="#microprofile/01_introduction" @click.native="this.scrollFix('#microprofile/01_introduction')">documentation</router-link>
and <router-link to="/guides/01_overview">guides</router-link>.</p>

</div>

<h2 id="_helidon_mp_cdi_extensions">Helidon MP CDI Extensions</h2>
<div class="section">
<p>In addition to MicroProfile support, Helidon MP provides
<router-link to="/extensions/01_overview">CDI extensions</router-link> to address areas not
covered by MicroProfile. Examples include:</p>

<ul class="ulist">
<li>
<p>DataSource for Oracle UCP and HikariCP</p>

</li>
<li>
<p>JPA</p>

</li>
<li>
<p>JTA</p>

</li>
</ul>
</div>

<h2 id="_no_application_server">No Application Server</h2>
<div class="section">
<p>Helidon is a collection of libraries that runs on top of Netty. It is not
derived from a Java EE application server. That means your cloud native
application is compact
and efficient without unnecessary overhead or bloat.</p>

</div>

<h2 id="_try_it_now">Try it now</h2>
<div class="section">
<p>Try the <router-link to="/guides/03_quickstart-mp">Helidon MP quickstart</router-link> to get your
first Helidon MP application up and running in minutes.</p>

</div>
</doc-view>