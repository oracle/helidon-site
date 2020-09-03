<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE Migration Guide</dt>
<dd slot="desc"><p>In Helidon 2 we have made some changes to APIs and runtime behavior. This guide
will help you migrate a Helidon SE 1.x application to 2.x.</p>
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

<h2 id="_getters">Getters</h2>
<div class="section">
<p>Some methods that act as getters of type <code>T</code> have been modified to return <code>Optional&lt;T&gt;</code>. You will
need to change your code to handle the <code>Optional</code> return type. For example <code>ServerRequest.spanContext()</code>
in 1.x had a return type of <code>SpanContext</code>. In 2.x it has a return type of <code>Optional&lt;SpanContext&gt;</code>.
So if you had code like:</p>

<markup
lang="java"
title="Helidon 1.x Code"
>Span myNewSpan = GlobalTracer.get()
        .buildSpan(“my-operation”)
        .asChildOf(serverRequest.spanContext())
        .start();</markup>

<p>you will need to change it to something like:</p>

<markup
lang="java"
title="Helidon 2.x Code"
>Tracer.SpanBuilder spanBuilder = serverRequest.tracer()
        .buildSpan("my-operation");
serverRequest.spanContext().ifPresent(spanBuilder::asChildOf);
Span myNewSpan = spanBuilder.start();</markup>

<p>Note the use of <code>ifPresent()</code> on the returned <code>Optional&lt;SpanContext&gt;</code>.</p>

</div>

<h2 id="_configuration">Configuration</h2>
<div class="section">
<ol style="margin-left: 15px;">
<li>
File watching is now done through a <code>ChangeWatcher</code> - use of <code>PollingStrategies.watch()</code> needs to be refactored to
<code>FileSystemWatcher.create()</code> and the method to configure it on config source builder has changed to
<code>changeWatcher(ChangeWatcher)</code>.

</li>
<li>
Methods on <code>ConfigSources</code> now return specific builders (they used to return <code>AbstractParsableConfigSource.Builder</code>
with a complex type declaration). If you store such a builder in a variable, either change it to the correct type,
or use <code>var</code>

</li>
<li>
Some APIs were cleaned up to be aligned with the development guidelines of Helidon. When using Git config source,
or etcd config source, the factory methods moved to the config source itself, and the builder now accepts all
configuration options through methods

</li>
<li>
The API of config source builders has been cleaned, so now only methods that are relevant to a specific config
source type can be invoked on such a builder. Previously you could configure a polling strategy on a source that
did not support polling

</li>
<li>
There is a small change in behavior of Helidon Config vs. MicroProfile Config:
The MP TCK require that system properties are fully mutable (e.g. as soon as the property is changed, it
must be used), so MP Config methods work in this manner (with a certain performance overhead).
Helidon Config treats System properties as a mutable config source, with a (optional) time based polling strategy. So
the change is reflected as well, though not immediately (this is only relevant if you use change notifications).

</li>
<li>
<code>CompositeConfigSource</code> has been removed from <code>Config</code>. If you need to configure <code>MerginStrategy</code>, you can do it now on
<code>Config</code> <code>Builder</code>

</li>
</ol>
<p>Example of advanced configuration of config:</p>

<markup
lang="java"

>Config.builder()
       // system properties with a polling strategy of 10 seconds
       .addSource(ConfigSources.systemProperties()
            .pollingStrategy(PollingStrategies.regular(Duration.ofSeconds(10))))
       // environment variables
       .addSource(ConfigSources.environmentVariables())
       // optional file config source with change watcher
       .addSource(ConfigSources.file(Paths.get("/conf/app.yaml"))
                          .optional()
                          .changeWatcher(FileSystemWatcher.create()))
       // classpath config source
       .addSource(ConfigSources.classpath("application.yaml"))
       // map config source (also supports polling strategy)
       .addSource(ConfigSources.create(Map.of("key", "value")))
       .build();</markup>

</div>

<h2 id="_resource_class_when_loaded_from_config">Resource class when loaded from Config</h2>
<div class="section">
<p>The configuration approach to <code>Resource</code> class was using prefixes which was not aligned with our approach to configuration.
All usages were refactored as follows:</p>

<ol style="margin-left: 15px;">
<li>
The <code>Resource</code> class expects a config node <code>resource</code> that will be used to read it

</li>
<li>
The feature set remains unchanged - we support path, classpath, url, content as plain text, and content as base64

</li>
<li>
Classes using resources are changed as well, such as <code>KeyConfig</code> - see details below

</li>
</ol>
</div>

<h2 id="_media_support">Media Support</h2>
<div class="section">
<p>In Helidon 1.x support for JSON and other media types was configured when constructing
<code>webserver.Routing</code> using the <code>register</code> method. In Helidon 2 Media Support has been
refactored so that it can be shared between the Helidon <code>WebServer</code> and <code>WebClient</code>.
You now specify media support as part of the WebServer build:</p>

<markup
lang="java"

>WebServer.builder()
    .addMediaSupport(JsonpSupport.create()) //registers reader and writer for Json-P
    .build()</markup>

<p>This replaces <code>Routing.builder().register(JsonSupport.create())&#8230;&#8203;</code></p>

<p>The new JSON MediaSupport classes are:</p>

<ul class="ulist">
<li>
<p><code>io.helidon.media.jsonp.JsonpSupport</code> in module <code>io.helidon.media:helidon-media-jsonp</code></p>

</li>
<li>
<p><code>io.helidon.media.jsonb.JsonbSupport</code> in module <code>io.helidon.media:helidon-media-jsonb</code></p>

</li>
<li>
<p><code>io.helidon.media.jackson.JacksonSupport</code> in module <code>io.helidon.media:helidon-media-jackson</code></p>

</li>
</ul>
</div>

<h2 id="_reactive">Reactive</h2>
<div class="section">

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
<td class=""><code>io.helidon.common.reactive.ReactiveStreamsAdapter</code></td>
<td class=""><code>org.reactivestreams.FlowAdapters</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_security_oidcconfig">Security: OidcConfig</h2>
<div class="section">
<p>Configuration has been updated to use the new <code>Resource</code> approach:</p>

<ol style="margin-left: 15px;">
<li>
<code>oidc-metadata.resource</code> is the new key for loading <code>oidc-metadata</code> from local resource

</li>
<li>
<code>sign-jwk.resource</code> is the new key for loading signing JWK resource

</li>
</ol>
</div>

<h2 id="_security_jwtprovider_and_jwtauthprovider">Security: JwtProvider and JwtAuthProvider</h2>
<div class="section">
<p>Configuration has been updated to use the new <code>Resource</code> approach:</p>

<ol style="margin-left: 15px;">
<li>
<code>jwk.resource</code> is the new key for loading JWK for verifying signatures

</li>
<li>
<code>jwt.resource</code> is also used for outbound as key for loading JWK for signing tokens

</li>
</ol>
</div>

<h2 id="_pki_key_configuration">PKI Key Configuration</h2>
<div class="section">
<p>The configuration has been updated to have a nicer tree structure:</p>

<p>Example of a public key from keystore:</p>

<markup
lang="yaml"

>keystore:
   cert.alias: "service_cert"
   resource.path: "/conf/keystore.p12"
   type: "PKCS12"
   passphrase: "password"</markup>

<p>Example of a private key from keystore:</p>

<markup
lang="yaml"

>keystore:
  key:
    alias: "myPrivateKey"
    passphrase: "password"
  resource.resource-path: "keystore/keystore.p12"
  passphrase: "password"</markup>

<p>Example of a pem resource with private key and certificate chain:</p>

<markup
lang="yaml"

>pem:
  key:
    passphrase: "password"
    resource.resource-path: "keystore/id_rsa.p8"
  cert-chain:
    resource.resource-path: "keystore/public_key_cert.pem"</markup>

</div>

<h2 id="_grpctlsdescriptor">GrpcTlsDescriptor</h2>
<div class="section">
<p>Configuration has been updated to use the new <code>Resource</code> approach:</p>

<ol style="margin-left: 15px;">
<li>
<code>tls-cert.resource</code> is the new key for certificate

</li>
<li>
<code>tls-key.resource</code> is the new key for private key

</li>
<li>
<code>tl-ca-cert</code> is the the new key for certificate

</li>
</ol>
</div>

<h2 id="_webserver_configuration">WebServer Configuration</h2>
<div class="section">

<h3 id="_ssltls">SSL/TLS</h3>
<div class="section">
<p>There is a new class <code>io.helidon.webserver.WebServerTls</code> that can be used
to configure TLS for a WebServer socket.
Class <code>io.helidon.webserver.SSLContextBuilder</code> has been deprecated and will
be removed.</p>

<p>The class uses a <code>Builder</code> pattern:</p>

<markup
lang="java"

>WebServerTls.builder()
   .privateKey(KeyConfig.keystoreBuilder()
   .keystore(Resource.create("certificate.p12"))
   .keystorePassphrase("helidon")</markup>

<p>The builder or built instance can be registered with a socket configuration builder
including the <code>WebServer.Builder</code> itself:</p>

<markup
lang="java"

>WebServer.builder(routing())
                .tls(webServerTls)
                .build();</markup>

</div>

<h3 id="_additional_sockets">Additional Sockets</h3>
<div class="section">
<p>Additional socket configuration has changed both in config
and in API.</p>

<p>The configuration now accepts following structure:</p>

<markup
lang="yaml"

>server:
   port: 8000
   sockets:
     - name: "admin"
       port: 8001
     - name: "static"
       port: 8002
       enabled: false</markup>

<p>Socket name is now a value of a property, allowing more freedom in naming.
The default socket name is implicit (and set to <code>@default</code>).</p>

<p>We have added the <code>enabled</code> flag to support disabling sockets through configuration.</p>

<p>To add socket using a builder, you can use:</p>

<markup
lang="java"

>WebServer.builder()
   .addSocket(SocketConfigurationBuidler.builder()
      .port(8001)
      .name("admin")));</markup>

<p>There is also a specialized method to add a socket and routing
together, to remove mapping through a name.</p>

</div>

<h3 id="_deprecation_of_serverconfiguration">Deprecation of ServerConfiguration</h3>
<div class="section">
<p><code>io.helidon.webserver.ServerConfiguration.Builder</code> is no longer used
to configure <code>WebServer</code>.</p>

<p>Most methods from this class have been moved to <code>WebServer.Builder</code> or deprecated.</p>

<p>Example of a simple WebServer setup:</p>

<markup
lang="java"

>WebServer.builder()
   .port(8001)
   .host("localhost")
   .routing(createRouting())
   .build();</markup>

</div>

<h3 id="_other_significant_webserver_deprecations">Other significant WebServer deprecations</h3>
<div class="section">
<ul class="ulist">
<li>
<p><code>io.helidon.webserver.WebServer.Builder</code> - all methods that accept <code>ServerConfiguration</code> or its builder are deprecated, please use
methods on <code>WebServer.Builder</code> instead</p>

</li>
<li>
<p><code>io.helidon.webserver.WebServer.Builder</code> - all methods for socket configuration that accept a name
and socket are deprecated, socket name is now part of socket configuration itself</p>

</li>
<li>
<p><code>io.helidon.webserver.ResponseHeaders.whenSend()</code> - please use <code>whenSent()</code></p>

</li>
<li>
<p><code>io.helidon.webserver.Routing.createServer(ServerConfiguration)</code> - please use <code>WebServer.builder()</code></p>

</li>
<li>
<p><code>io.helidon.webserver.Routing.createServer()</code> - please use <code>WebServer.builder()</code></p>

</li>
<li>
<p><code>io.helidon.webserver.SocketConfiguration.DEFAULT</code> - use a builder to create a named configuration</p>

</li>
<li>
<p><code>io.helidon.webserver.SocketConfiguration.Builder.ssl(SSLContext) - use `WebServerTls</code> instead</p>

</li>
<li>
<p><code>io.helidon.webserver.SocketConfiguration.Builder.enabledSSlProtocols(String&#8230;&#8203;) - use `WebServerTls</code> instead</p>

</li>
</ul>
</div>
</div>
</doc-view>