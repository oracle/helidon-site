<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Testing with JUnit5</dt>
<dd slot="desc"><p>Helidon provides built-in test support for CDI testing in JUnit5.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_dependency">Dependency</h2>
<div class="section">
<markup
lang="xml"
title="Maven dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.tests&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-tests-junit5&lt;/artifactId&gt;
    &lt;scope&gt;test&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_usage_default">Usage - default</h2>
<div class="section">
<p>A test can be annotated with <code>io.helidon.microprofile.tests.junit5.HelidonTest</code> annotation to mark it as a
CDI test. This annotation will start the CDI container before any test method is invoked, and stop it after
the last method is invoked. This annotation also enables injection into the test class itself.</p>

<p>The annotations described in this section are inherited (for the non-repeatable ones), and additive (for repeatable).
So if you declare <code>@DisableDiscovery</code> on abstract class, all implementations will have discovery disabled, unless you
annotate the implementation class with <code>@DisableDiscovery(false)</code>.
If you declare <code>@AddBean</code> on both abstract class and implementation class, both beans will be added.</p>

<p>In addition to this simplification, the following annotations are supported:</p>

<ul class="ulist">
<li>
<p><code>io.helidon.microprofile.tests.junit5.AddBean</code> - to add one or more beans to the container
(if not part of a bean archive, or when discovery is disabled)</p>

</li>
<li>
<p><code>io.helidon.microprofile.tests.junit5.AddExtension</code> - to add one or more CDI extensions to the container
(if not added through service loader, or when discovery is disabled)</p>

</li>
<li>
<p><code>io.helidon.microprofile.tests.junit5.AddConfig</code> - to add one or more configuration properties to MicroProfile config
without the need of creating a <code>microprofile-config.properties</code> file</p>

</li>
<li>
<p><code>io.helidon.microprofile.tests.junit5.DisableDiscovery</code> - to disable automated discovery of beans and extensions</p>

</li>
</ul>
<markup
lang="java"
title="Code sample"
>@HelidonTest
@DisableDiscovery
@AddBean(MyBean.class)
@AddExtension(ConfigCdiExtension.class)
@AddConfig(key = "app.greeting", value = "TestHello")
class TestNoDiscovery {
    @Inject
    private MyBean myBean;

    @Test
    void testGreeting() {
        assertThat(myBean, notNullValue());
        assertThat(myBean.greeting(), is("TestHello"));
    }
}</markup>

</div>

<h2 id="_usage_per_method_cdi_container">Usage - per method CDI container</h2>
<div class="section">
<p>A test can be annotated as follows:</p>

<p><code>@HelidonTest(resetPerTest = true)</code></p>

<p>This will change the behavior as follows:</p>

<ul class="ulist">
<li>
<p>A new CDI container is created for each test method invocation</p>

</li>
<li>
<p>annotations to add config, beans and extension can be added for each method in addition to the class</p>

</li>
<li>
<p>you cannot inject fields or constructor parameters of the test class itself (as a single instance is shared by more containers)</p>

</li>
<li>
<p>you can add <code>SeContainer</code> as a method parameter of any test method and you will get the current container</p>

</li>
</ul>
</div>

<h2 id="_usage_configuration">Usage - configuration</h2>
<div class="section">
<p>In addition to the <code>@AddConfig</code> annotation, you can also use
 <code>@Configuration</code> to configure additional classpath properties config sources using <code>configSources</code>, and to
mark that a custom configuration is desired.
You can set up config in <code>@BeforeAll</code> method and register it with <code>ConfigProviderResolver</code> using MP Config APIs, and declare
<code>@Configuration(useExisting=true)</code>.
Note that this is not compatible with repeatable tests that use method sources that access CDI, as we must delay the CDI
startup to the test class instantiation (which is too late, as the method sources are already invoked by this time).</p>

<p><strong>If you want to use method sources that use CDI with repeatable tests, please do not use <code>@Configuration(useExisting=true)</code></strong></p>

</div>

<h2 id="_usage_added_parameters_and_injection_types">Usage - added parameters and injection types</h2>
<div class="section">
<p>The following types are available for injection (when a single CDI container is used per test class):</p>

<ul class="ulist">
<li>
<p><code>WebTarget</code> - a JAX-RS client&#8217;s target configured for the current hostname and port when <code>helidon-micorprofile-server</code> is on
the classpath</p>

</li>
</ul>
<p>The following types are available as method parameters (in any type of Helidon tests):</p>

<ul class="ulist">
<li>
<p><code>WebTarget</code> - a JAX-RS client&#8217;s target configured for the current hostname and port when <code>helidon-micorprofile-server</code> is on
the classpath</p>

</li>
<li>
<p><code>SeContainer</code> - the current container instance</p>

</li>
</ul>
</div>
</doc-view>