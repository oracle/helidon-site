<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Testing with JUnit 5 Guide</dt>
<dd slot="desc"><p>This guide describes how to write and execute tests for your MicroProfile applications in a JUnit 5 environment using optimized customizations.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">
<p>For this 20 minute tutorial, you will need the following:</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">A Helidon MP Application</td>
<td class="">You can use your own application or use the <a id="" title="" target="_blank" href="https://helidon.io/docs/v2/#/mp/guides/02_quickstart">Helidon MP Quickstart</a> to create a sample application.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;11</a> (<a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;11</a>)</td>
<td class="">Helidon requires Java 11+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.6.1+</a></td>
<td class="">Helidon requires Maven 3.6.1+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://docs.docker.com/install/">Docker 18.09+</a></td>
<td class="">You need Docker if you
want to build and deploy Docker containers.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.16.5+</a></td>
<td class="">If you want to
deploy to Kubernetes, you need <code>kubectl</code> and a Kubernetes cluster (you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>).</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="bash"
title="Verify Prerequisites"
>java -version
mvn --version
docker --version
kubectl version --short</markup>

<markup
lang="bash"
title="Setting JAVA_HOME"
># On Mac
export JAVA_HOME=`/usr/libexec/java_home -v 11`

# On Linux
# Use the appropriate path to your JDK
export JAVA_HOME=/usr/lib/jvm/jdk-11</markup>

</div>

<h2 id="_dependencies">Dependencies</h2>
<div class="section">
<p>To start using this feature, add the following dependencies to the testing module:</p>

<markup
lang="xml"
title="Maven dependencies"
>&lt;dependencies&gt;
   &lt;dependency&gt;
      &lt;groupId&gt;io.helidon.microprofile.tests&lt;/groupId&gt;
      &lt;artifactId&gt;helidon-microprofile-tests-junit5&lt;/artifactId&gt;
      &lt;scope&gt;test&lt;/scope&gt;
   &lt;/dependency&gt;
   &lt;dependency&gt;
      &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;
      &lt;artifactId&gt;junit-jupiter-engine&lt;/artifactId&gt;
   &lt;/dependency&gt;
&lt;/dependencies&gt;</markup>

</div>

<h2 id="_create_a_sample_helidon_mp_project">Create a Sample Helidon MP Project</h2>
<div class="section">
<p>In this guide we will use the <a id="" title="" target="_blank" href="https://helidon.io/docs/v2/#/mp/guides/02_quickstart">Helidon MP Quick Start</a> project in our examples.</p>

<p>This application provides an endpoint <code>/greet</code>, and we want to make sure this endpoint is available and returns expected value.</p>


<h3 id="_create_a_test_class">Create a Test Class</h3>
<div class="section">
<p>First you&#8217;ll need to create a test class with an empty test method, and annotate it with <code>@HelidonTest</code>:</p>

<markup
lang="java"
title="Test Class"
>import io.helidon.microprofile.tests.junit5.HelidonTest;

import org.junit.jupiter.api.Test;

@HelidonTest
class GreetTest {
    @Test
    void testDefaultGreeting() {
    }
}</markup>

<p>The <code>@HelidonTest</code> annotation will cause the test extension to start a Helidon MicroProfile server so that you do not need to manage the server lifecycle in your test. The container is initialized once before the test class is instantiated, and shut down after the last test runs.</p>

<p>You can see this in the test output:</p>


<div class="admonition note">
<p class="admonition-inline">The <code>@HelidonTest</code> annotation uses a random port regardless of the port configured in the application.yaml.</p>
</div>
</div>

<h3 id="_inject_a_webtarget">Inject a WebTarget</h3>
<div class="section">
<p>The test is only useful if it invokes the server and verifies the result. To support testing, you can inject a <code>WebTarget</code> that is configured for the currently running server (it can also be a parameter to a test method). We can use the target to invoke our endpoint and validate the result.</p>

<markup
lang="java"
title="Updated Class with webTarget"
>import static org.junit.jupiter.api.Assertions.assertEquals;

@HelidonTest
class GreetTest {
    @Inject
    WebTarget webTarget;

    @Test
    void testDefaultGreeting() {
        JsonObject jsonObject = webTarget.path("/greet")
                .request()
                .get(JsonObject.class);

        String expected = "Hello World!";
        String actual = jsonObject.getString("message");
        assertEquals(expected, actual, "Message in JSON");
    }
}</markup>

<p>The test is now complete and verifies the message.</p>

</div>

<h3 id="_customize_the_testing_extension">Customize the Testing Extension</h3>
<div class="section">
<p>The testing extension supports a few additional annotations that allow for finer control of the test execution.</p>

<div class="block-title"><span>Optional Extension Annotations</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Annotation</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>@HelidonTest(resetPerTest = true)</code></td>
<td class="">Resets the container for each method.</td><td class="">This is useful when we want to modify configuration or beans between executions. In such a case, injection into fields is not possible, as we would need a different instance for each test.</td>
</tr>
<tr>
<td class=""><code>@AddConfig(key = "app.greeting", value = "Unite")</code></td>
<td class="">Defines a new configuration (either on class level, or method level) by adding a single configuration key/value.</td>
</tr>
<tr>
<td class=""><code>@Configuration(configSources = "test-config.properties")</code></td>
<td class="">Adds a whole config source from classpath.</td>
</tr>
</tbody>
</table>
</div>
<p>Here&#8217;s an example showing how these approaches are used to execute the same endpoint with different configuration:</p>

<markup
lang="java"

>@HelidonTest(resetPerTest = true)
class GreetTest {
    @Test
    void testDefaultGreeting(WebTarget webTarget) {
        validate(webTarget, "/greet", "Hello World!");
    }

    @Test
    @AddConfig(key = "app.greeting", value = "Unite")
    void testConfiguredGreeting(WebTarget webTarget) {
        validate(webTarget, "/greet", "Unite World!");
    }

    private void validate(WebTarget webTarget,
                          String path,
                          String expected) {

        JsonObject jsonObject = webTarget.path(path)
                .request()
                .get(JsonObject.class);

        String actual = jsonObject.getString("message");
        assertEquals(expected, actual, "Message in JSON");
    }
}</markup>

</div>

<h3 id="_use_beans_for_testing">Use Beans for Testing</h3>
<div class="section">
<p>If you prefer to use only beans for testing, and want to add a different bean for each test, then you must use the <code>@AddBean</code> annotation. This cannot be achieved by CDI discovery because if we place <code>META-INF/beans.xml</code> on the classpath, then all of our beans would be added.</p>

<markup
lang="java"

>@AddBean(TestBean.class)</markup>

<p>By default the bean is added to the container with scope set to <code>ApplicationScoped</code>. You can customize scope either by annotating the bean class with another scope or through the annotation:</p>

<markup
lang="java"

>@AddBean(value = TestBean.class, scope = Dependent.class)</markup>

<div class="admonition note">
<p class="admonition-inline">This annotation can also be placed on a method when running in <code>resetPerTest</code> mode.</p>
</div>
</div>

<h3 id="_add_test_extension">Add Test Extension</h3>
<div class="section">
<p>When a custom bean is not enough, you may want to extend the CDI with a test-only <code>Extension</code>. Once again, if we use the standard way of doing this, we would need to create a <code>META-INF/services</code> record that would be picked up by every test class.</p>

<p>For this purpose, we provide the following annotation which adds the extension to the container and allows you to modify its behavior as a usual CDI Portable Extension:</p>

<markup
lang="java"

>@AddExtension(TestExtension.class)</markup>

</div>

<h3 id="_disable_discovery">Disable Discovery</h3>
<div class="section">
<p>If you want to disable discovery and only add custom extensions and beans, then use the following annotation:</p>

<markup
lang="java"

>@DisableDiscovery</markup>

<div class="admonition note">
<p class="admonition-inline">This annotation is typically used in conjunction with <code>@AddBeans</code> and/or <code>@AddExtension</code>. As you have seen in standard test output, by default Helidon starts with the dependencies defined in pom.xml.</p>
</div>
</div>
</div>

<h2 id="_write_a_basic_test">Write a Basic Test</h2>
<div class="section">
<p>If you want just the basic test features enabled, then you only have to add a few required extensions and classes to your test. The following example uses only those extensions and classes required to run a bean that injects configuration value:</p>

<markup
lang="java"

>import javax.inject.Inject;

import io.helidon.microprofile.config.ConfigCdiExtension;
import io.helidon.microprofile.tests.junit5.AddBean;
import io.helidon.microprofile.tests.junit5.AddConfig;
import io.helidon.microprofile.tests.junit5.AddExtension;
import io.helidon.microprofile.tests.junit5.DisableDiscovery;
import io.helidon.microprofile.tests.junit5.HelidonTest;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@HelidonTest
@DisableDiscovery
@AddExtension(ConfigCdiExtension.class)
@AddBean(GreetTest.ConfiguredBean.class)
@AddConfig(key = "test.message", value = "Hello Guide!")
class GreetTest {
    @Inject
    ConfiguredBean bean;

    @Test
    void testBean() {
        assertEquals("Hello Guide!", bean.message());
    }

    public static class ConfiguredBean {
        @Inject
        @ConfigProperty(name = "test.message")
        private String message;

        String message() {
            return message;
        }
    }
}</markup>

</div>

<h2 id="_summary">Summary</h2>
<div class="section">
<p>This guide demonstrated how to create tests for MicroProfile applications in a JUnit 5 environment. It described some useful customizations that can be added to your testing extension and allow you to configure test outcomes for your Helidon MP applications.</p>

<p>Refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://junit.org/junit5/docs/current/user-guide/">JUnit 5 User Guide</a></p>

</li>
<li>
<p><router-link to="/mp/testing/01_testing">Testing with JUnit 5</router-link></p>

</li>
</ul>
</div>
</doc-view>