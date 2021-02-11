<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Upgrade Guide</dt>
<dd slot="desc"><p>In Helidon 2 we have made some changes to APIs and runtime behavior. This guide
will help you migrate a Helidon MP 1.x application to 2.x.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_java_8_runtime">Java 8 Runtime</h2>
<div class="section">
<p>Java 8 is no longer supported. Java 11 or newer is required.</p>

</div>

<h2 id="_common_utilities">Common Utilities</h2>
<div class="section">
<p>Since Helidon 2.x now requires Java 11 the helper classes that were provided for Java 8
support have been removed. These have been replaced by the standard JDK classes:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Removed</th>
<th>Replacement</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>io.helidon.reactive.Flow</code></td>
<td class=""><code>java.util.concurrent.Flow</code></td>
</tr>
<tr>
<td class=""><code>io.helidon.common.CollectionsHelper</code></td>
<td class="">Factory methods of <code>Set</code>, <code>Map</code> and <code>List</code></td>
</tr>
<tr>
<td class=""><code>io.helidon.common.OptionalHelper</code></td>
<td class="">Methods of <code>java.util.Optional</code></td>
</tr>
<tr>
<td class=""><code>io.helidon.common.StackWalker</code></td>
<td class=""><code>java.lang.StackWalker</code></td>
</tr>
<tr>
<td class=""><code>io.helidon.common.InputStreamHelper</code></td>
<td class="">Methods of <code>java.io.InputStream</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_tracing">Tracing</h2>
<div class="section">
<p>We have upgraded to OpenTracing version 0.33.0 that is not backward compatible. OpenTracing
introduced the following breaking changes:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Removed</th>
<th>Replacement</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>ScopeManager.active()</code></td>
<td class=""><code>Tracer.activeSpan()</code></td>
</tr>
<tr>
<td class=""><code>ScopeManager.activate(Span, boolean)</code></td>
<td class=""><code>ScopeManager.activate(Span)</code> - second parameter is now always <code>false</code></td>
</tr>
<tr>
<td class=""><code>SpanBuilder.startActive()</code></td>
<td class=""><code>Tracer.activateSpan(Span)</code></td>
</tr>
<tr>
<td class=""><code>TextMapExtractAdapter</code> and <code>TextMapInjectAdapter</code></td>
<td class=""><code>TextMapAdapter</code></td>
</tr>
<tr>
<td class="">Module name changed <code>opentracing.api</code></td>
<td class=""><code>io.opentracing.api</code> (same for <code>noop</code> and <code>util</code>)</td>
</tr>
</tbody>
</table>
</div>
<p>If you use the <code>TracerBuilder</code> abstraction in Helidon and have no custom Spans, there is no
change required</p>

</div>

<h2 id="_security_oidc">Security: OIDC</h2>
<div class="section">
<p>When the OIDC provider is configured to use cookie (default configuration) to carry authentication information,
the cookie <code>Same-Site</code> is now set to <code>Lax</code> (used to be <code>Strict</code>). This is to prevent infinite redirects, as
browsers would refuse to set the cookie on redirected requests (due to this setting).
Only in the case of the frontend host and identity host match, we leave <code>Strict</code> as the default</p>

</div>

<h2 id="_microprofile_bundles">MicroProfile Bundles</h2>
<div class="section">
<p>We have removed the versioned MicroProfile bundles (i.e. <code>helidon-microprofile-x.x</code>), and introduced
unversioned core and full bundles:</p>

<ul class="ulist">
<li>
<p><code>io.helidon.microprofile.bundles:helidon-microprofile-core</code> - contains only MP Server
and Config. Allows you to add only the specifications needed by your application.</p>

</li>
<li>
<p><code>io.helidon.microprofile.bundles:helidon-microprofile</code> - contains the latest full
MicroProfile version implemented by Helidon</p>

</li>
</ul>
</div>

<h2 id="_application_main_and_startup">Application Main and Startup</h2>
<div class="section">
<ul class="ulist">
<li>
<p><code>io.helidon.microprofile.server.Main</code> has been deprecated. Use <code>io.helidon.microprofile.cdi.Main</code> instead.</p>

</li>
<li>
<p><code>io.helidon.microprofile.server.Server</code> is still available, although the features are much reduced.</p>

</li>
<li>
<p>You no longer need to initialize Java Util Logging explicitly. Put <code>logging.properties</code> on the classpath
or in the current directory to be automatically picked up to configure Java Util Logging.</p>

</li>
</ul>
</div>

<h2 id="_jax_rs_applications">JAX-RS Applications</h2>
<div class="section">
<p>Helidon 1.x usually required that you have an <code>Application</code> subclass that returned
the Application classes to scan. For common cases this is no longer necessary, and you
might be able to remove your <code>Application</code> class.</p>

<p>JAX-RS applications now work similarly to how they work in application servers:</p>

<ul class="ulist">
<li>
<p>if there is an <code>Application</code> subclass that returns anything from <code>getClasses</code> or <code>getSingletons</code>, it is used as is</p>

</li>
<li>
<p>if there is an <code>Application</code> subclass that returns empty sets from these methods, all available resource classes will be part of such an application</p>

</li>
<li>
<p>if there is no <code>Application</code> subclass, a synthetic application will be created with all available resource classes</p>

</li>
<li>
<p><code>Application</code> subclasses MUST be annotated with <code>@ApplicationScoped</code>, otherwise they are ignored</p>

</li>
</ul>
</div>

<h2 id="_microprofile_jwt_auth">MicroProfile JWT-Auth</h2>
<div class="section">
<p>If a JAX-RS application exists that is annotated with <code>@LoginConfig</code> with value MP-JWT,
the correct authentication provider is added to security. The startup would fail if the provider is required yet not configured.</p>

</div>

<h2 id="_security_in_helidon_mp">Security in Helidon MP</h2>
<div class="section">
<ul class="ulist">
<li>
<p>If there is no authentication provider configured, authentication will now fail.</p>

</li>
<li>
<p>If there is no authorization provider configured, the ABAC provider will be configured.</p>

</li>
</ul>
<p>In Helidon 1.x these were configured if there was no provider configured overall.</p>

</div>

<h2 id="_cdi_and_microprofile_server">CDI and MicroProfile Server</h2>
<div class="section">
<p>In order to support GraalVM <code>native-image</code> we have had to re-implement how CDI is initialized
and started. This has resulted in some changes in APIs and behavior:</p>

<ul class="ulist">
<li>
<p>You can no longer start the CDI container yourself.</p>

</li>
<li>
<p>You can only run a single instance of Server in a JVM.</p>

</li>
<li>
<p>If you use <code>SeContainerInitializer</code> you will get an exception.</p>
<ul class="ulist">
<li>
<p>This can be worked around by configuration property <code>mp.initializer.allow=true</code>, and warning can
be removed using <code>mp.initializer.no-warn=true</code></p>

</li>
<li>
<p>Once <code>SeContainerInitializer</code> is used you can no longer use MP with <code>native-image</code></p>

</li>
</ul>
</li>
<li>
<p>You can no longer provide a <code>Context</code> instance. The root context is now built-in.</p>

</li>
<li>
<p><code>MpService</code> and <code>MpServiceContext</code> have been removed.</p>
<ul class="ulist">
<li>
<p>Methods from context have been moved to <code>JaxRsCdiExtension</code> and <code>ServerCdiExtension</code>.
These can be accessed from CDI extension through <code>BeanManager.getExtension</code>.</p>

</li>
<li>
<p>Methods <code>register</code> can be used on current <code>io.helidon.context.Context</code></p>

</li>
<li>
<p><code>MpService</code> equivalent is a CDI extension. All Helidon services were refactored to
CDI extension (you can use these for reference).</p>

</li>
</ul>
</li>
<li>
<p><code>Server.cdiContainer</code> is removed, use <code>CDI.current()</code> instead.</p>

</li>
</ul>
</div>

<h2 id="_metrics">Metrics</h2>
<div class="section">
<p>Helidon now supports only MicroProfile Metrics 2.x. Support for Metrics 1.x has been removed,
and modules for 2.x have been renamed from <code>metrics2</code> to <code>metrics</code>.</p>

</div>

<h2 id="_java_ee_dependencies">Java EE dependencies</h2>
<div class="section">
<p>We have moved from dependencies in groupId <code>javax</code> (Java EE modules) to dependencies
in groupId <code>jakarta</code> (Jakarta EE modules).</p>

<p>In case you declared a dependency on a javax module, you should change it to a jakarta one.</p>

<p>Example:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;javax.activation&lt;/groupId&gt;
    &lt;artifactId&gt;javax.activation-api&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>should be changed to</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;jakarta.activation&lt;/groupId&gt;
    &lt;artifactId&gt;jakarta.activation-api&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>As the <code>javax</code> module is no longer in dependency management of Helidon parent pom files.</p>

</div>
</doc-view>