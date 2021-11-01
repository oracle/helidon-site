<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Metrics-Capable Modules</dt>
<dd slot="desc"><p>This document explains Helidon SE metrics-capable components and applications and describes how to create and control them.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>Think of Helidon metrics in three related but different parts:</p>

<ul class="ulist">
<li>
<p>The Helidon metrics API allows your code to register, look-up, remove, and update metrics using
the <code>RegistryFactory</code>, <code>MetricRegistry</code>, and individual metrics interfaces.</p>

</li>
<li>
<p>Helidon provides two implementations of the Helidon metrics API and selects which one to use at runtime,
based on what components are present on the runtime path and whether metrics is configured to be enabled or disabled.</p>

</li>
<li>
<p>The built-in Helidon metrics web service supports the <code>/metrics</code> endpoints by which clients can retrieve metadata and
values of the registered metrics.
Your Helidon SE app provides this feature (if at all) by explicitly using the <code>MetricsSupport</code> interface.</p>
<p>Most Helidon applications are web-based and their developers choose to expose the built-in metrics web service.
But by separating the parts of metrics this way,
Helidon allows non-web apps to work with metrics as well, just without the web service support.</p>

</li>
</ul>
<p>As you plan and write Helidon components and applications,
you make some choices about exactly how your code will use metrics.
This guide gives some background information,
describes the choices you face, explains their ramifications, and provides some code examples.</p>

</div>

<h2 id="_categorizing_metrics_usage">Categorizing Metrics Usage</h2>
<div class="section">
<p>We can place each Helidon component and Helidon application into one of three categories based on how it relies on metrics.
The type of module dictates the compile-time dependency you declare in the project <code>pom.xml</code>.</p>

<div class="block-title"><span>Types of Metrics Usage</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 12.5%;">
<col style="width: 12.5%;">
<col style="width: 75%;">
</colgroup>
<thead>
<tr>
<th>Registers, updates, removes metrics?</th>
<th>Refers to metrics values?</th>
<th>Category</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><v-icon>times</v-icon>
</td>
<td class=""><v-icon>times</v-icon>
</td>
<td class="">metrics-independent</td>
</tr>
<tr>
<td class=""><v-icon>check</v-icon>
</td>
<td class=""><v-icon>times</v-icon>
</td>
<td class="">metrics-capable</td>
</tr>
<tr>
<td class=""><v-icon>check</v-icon>
</td>
<td class=""><v-icon>check</v-icon>
</td>
<td class="">metrics-dependent</td>
</tr>
</tbody>
</table>
</div>
<p>Whenever possible, if your component or app uses metrics write it as metrics-capable code.</p>

</div>

<h2 id="_understanding_the_two_metrics_implementations">Understanding the Two Metrics Implementations</h2>
<div class="section">
<p>Helidon provides two metrics implementations.</p>

<ul class="ulist">
<li>
<p><em>Full-featured</em> metrics allows registering, removing, and updating metrics and observing metrics' changing values.
The <code>helidon-metrics</code> component contains full-featured metrics.</p>

</li>
<li>
<p><em>Minimal</em> metrics supports registering, removing, and updating metrics.
The metrics objects provided by the minimal implementation are no-ops: their values never change.
The minimal implementation is part of the <code>helidon-metrics-api</code> component.</p>

</li>
</ul>
<p>Any code compiled with <code>helidon-metrics-api</code> can assume that the runtime path will include the minimal implementation.</p>

<p>Both implementations support all the operations of the <code>RegistryFactory</code> and the <code>MetricRegistry</code>.
The full implementation provides fully-functional metrics instances (counters, timers, etc.).
In the minimal implementations, metrics do not update their values.</p>

<p>For Helidon to use the full implementation, two conditions must hold:</p>

<ul class="ulist">
<li>
<p>The <code>helidon-metrics</code> component must be on the runtime path.</p>

</li>
<li>
<p>Metrics must be enabled, using either a builder or configuration. (Enabled is the default.)</p>

</li>
</ul>
<p>Otherwise, provided that the runtime path includes <code>helidon-metrics-api</code>, Helidon activates the minimal implementation.</p>

</div>

<h2 id="_understanding_the_two_metrics_service_implementations">Understanding the Two Metrics Service Implementations</h2>
<div class="section">
<p>Helidon includes two implementations of support for the metrics web service endpoint <code>/metrics</code>
(or whatever context value is configured).</p>

<p>The full-service implementation sends responses which describe the metadata and current values for the metrics registered in
metric registries. The <code>helidon-metrics</code> component contains this implementation.</p>

<p>The <code>helidon-metrics-service-api</code> component contains the API for the metrics web service support (the <code>MetricsSupport</code> interface) and also
a minimal implementation. This implementation simply responds with <code>404</code> and an explanatory message that metrics are disabled.</p>

<p>Any code compiled with <code>helidon-metrics-service-api</code> can assume that the runtime path will contain the minimal implementation.</p>

<p>Helidon activates the full implementation if the runtime path includes the full implementation <em>and</em> metrics is configured as enabled;
Helidon uses the minimal implementation otherwise.</p>

</div>

<h2 id="_enabling_and_disabling_metrics">Enabling and Disabling Metrics</h2>
<div class="section">
<p>Using
either builder-style settings or
configuration, your component
or Helidon SE application
can let end users control
at runtime whether Helidon should use full-featured metrics.
If an end user sets <code>metrics.enabled</code> to <code>false</code>, then Helidon activates the minimal metrics and metrics service implementations
provided they are in the runtime path.</p>

<p>Further, users can set <code>component-name.metrics.enabled</code> to <code>false</code> which disables metrics for just that component
so long as the component was written to check that setting and act on it accordingly.</p>

</div>

<h2 id="_designing_and_writing_metrics_capable_applications_and_components">Designing and Writing Metrics-capable Applications and Components</h2>
<div class="section">
<p>Whoever packages and deploys your application or component can control what code will be on the runtime path and whether metrics
is enabled or not.
As a result, wherever possible, construct your modules which use metrics so that they do not make decisions based on the values of metrics;
that is, design them to be metrics-capable, <em>not</em> metrics-dependent.
Doing so allows your code to operate regardless of whether the full-featured metrics implementation is active at runtime.</p>


<h3 id="_declaring_dependencies">Declaring Dependencies</h3>
<div class="section">
<ol style="margin-left: 15px;">
<li>
Include this dependency:
<markup
lang="xml"
title="Dependency for Helidon metrics API"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-metrics-api&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>This module defines the metrics API: <code>RegistryFactory</code>, <code>MetricRegistry</code>, and the various metrics themselves.</p>

</li>
<li>
To permit the use of the built-in metrics web service support for the <code>/metrics</code> endpoint, add this dependency:
<markup
lang="xml"
title="Dependency for metrics web service support"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-metrics-service-api&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>This module defines the metrics web service API: <code>MetricsSupport</code>.</p>

<p>Use the <code>MetricsSupport</code> interface from <code>helidon-metrics-service-api</code> in your SE app initialization code to create a service you can register with the web server. (See the example <router-link to="#writing_SE" @click.native="this.scrollFix('#writing_SE')">below</router-link>.)</p>

</li>
<li>
Declare an explicit runtime dependency on the full-featured metrics
implementation:
<markup
lang="xml"
title="Dependency for full metrics and metrics service implementations"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.metrics&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-metrics&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</li>
</ol>
</div>

<h3 id="_writing_the_metrics_capable_code">Writing the Metrics-capable Code</h3>
<div class="section">
<p>The way you write a metrics-capable module depends on whether it is a <em>component</em>
(that is, <em>not</em> an application) or an <em>application</em>.</p>


<h4 id="_writing_a_non_application_component">Writing a <em>Non-application Component</em></h4>
<div class="section">
<p>Write your <em>non-application</em> component to accept component-specific configuration that includes an optional <code>metrics</code> section
which can include an optional <code>enabled</code> setting. Helidon defaults the value to <code>true</code>.
The following example shows one way to accomplish this:</p>

<markup
lang="java"
title="Example code to support disabling metrics usage in a component"
>import io.helidon.config.Config;
import io.helidon.metrics.api.ComponentMetricsSettings;
import io.helidon.metrics.api.MetricsSettings;
import io.helidon.metrics.api.RegistryFactory;

import org.eclipse.microprofile.metrics.MetricRegistry;

public class UtilComponent {

    private final MetricRegistry metricRegistry; <span class="conum" data-value="1" />

    public static class Builder implements io.helidon.common.Builder&lt;UtilComponent&gt; { <span class="conum" data-value="2" />
        private ComponentMetricsSettings.Builder componentMetricsSettingsBuilder = ComponentMetricsSettings.builder();

        public Builder componentMetricsSettings(ComponentMetricsSettings.Builder componentMetricsSettingsBuilder) { <span class="conum" data-value="3" />
            this.componentMetricsSettingsBuilder = componentMetricsSettingsBuilder;
            return this;
        }

        public Builder config(Config componentConfig) { <span class="conum" data-value="4" />
            componentConfig
                .get(ComponentMetricsSettings.Builder.METRICS_CONFIG_KEY)
                .as(ComponentMetricsSettings::create)
                .ifPresent(this::componentMetricsSettings);
            return this;
        }

        public UtilComponent build() {
            return new UtilComponent(this);
        }

        ...
    }

    private UtilComponent(Builder builder) {
        ...
        metricRegistry = RegistryFactory
                .getInstance(builder.componentMetricsSettingsBuilder.build())
                .getRegistry(MetricRegistry.Type.VENDOR); <span class="conum" data-value="5" />
    }

    MetricRegistry metricRegistry() { <span class="conum" data-value="6" />
        return metricRegistry;
    }
}</markup>

<ul class="colist">
<li data-value="1">Other code in the component uses this metric registry for registering, looking up, and removing metrics.</li>
<li data-value="2">Applications which use instances of <code>MyComponent</code> use this <code>Builder</code> to set up and create those instances.</li>
<li data-value="3">Applications which layer on your component invoke this method to set up the component-level metrics behavior they want your component to use.</li>
<li data-value="4">If an application supports configuration, it passes the util config to this method.</li>
<li data-value="5">The constructor for your component obtains the <code>MetricRegistry</code> which the rest of your component will use.</li>
<li data-value="6">Provides easy access to the <code>MetricRegistry</code> which the component&#8217;s metrics code should use.</li>
</ul>
<p>Helidon returns either a full-featured <code>RegistryFactory</code> or a minimal one, depending on:</p>

<ul class="ulist">
<li>
<p>whether the full-featured metrics implementation is on the runtime path,</p>

</li>
<li>
<p>whether metrics overall is enabled or disabled, and</p>

</li>
<li>
<p>whether the component metrics settings requests enabled or disabled metrics.</p>

</li>
</ul>
</div>

<h4 id="writing_SE">Writing and Packaging a Metrics-capable <em>Helidon SE Application</em></h4>
<div class="section">
<p>Write your <em>SE application</em> similarly, but do not use the <code>ComponentMetricsSettings</code>.
Instead, build a <code>MetricsSettings</code> object from the configuration.</p>

<markup
lang="java"
title="Example code to support disabling metrics usage in a component"
>import io.helidon.config.Config;
import io.helidon.metrics.api.MetricsSettings;
import io.helidon.metrics.api.RegistryFactory;
import io.helidon.webserver.WebServer;


import org.eclipse.microprofile.metrics.MetricRegistry;

public class MyApp {

    private static MetricsSettings metricsSettings;
    static MetricRegistry metricRegistry;

    public static void main(final String[] args) {
        startServer();
    }

    static Single&lt;WebServer&gt; startServer() {
        ...
        Config config = Config.create();

        metricsSettings = MetricsSettings.builder() <span class="conum" data-value="1" />
                .config(config)
                .build();

        metricRegistry = RegistryFactory.getInstance(metricsSettings) <span class="conum" data-value="2" />
                .getRegistry(MetricRegistry.Type.APPLICATION);

        WebServer server = WebServer.builder(createRouting(config)) <span class="conum" data-value="3" />
                .config(config.get("server"))
                .addMediaSupport(JsonpSupport.create())
                .build();

        ...
    }

    private static Routing createRouting(Config config) {

        RestServiceSettings restServiceSettings = RestServiceSettings.create(config); <span class="conum" data-value="4" />

        MetricsSupport metricsSupport = MetricsSupport.create(metricsSettings, restServiceSettings); <span class="conum" data-value="5" />
        GreetService greetService = new GreetService(config);

        return Routing.builder()
                .register(metricsSupport)                  <span class="conum" data-value="6" />
                .register("/greet", greetService)
                .build();
    }

}</markup>

<ul class="colist">
<li data-value="1">Create and save <code>MetricsSettings</code> from config.</li>
<li data-value="2">Use <code>MetricsSettings</code> to get a suitable <code>RegistryFactory</code>, and use that to get the application registry.</li>
<li data-value="3">Pass <code>config</code> to <code>createRouting</code> which returns the <code>Routing</code> to initialize the web server.</li>
<li data-value="4">Use the <code>config</code> to create <code>RestServiceSettings</code> which controls the routing name, web context, and CORS set-up for the
metrics endpoint.</li>
<li data-value="5">Create the <code>MetricsSupport</code> instance using the metrics and REST service settings.</li>
<li data-value="6">Add the properly initialized <code>MetricsSupport</code> instance as a service to the routing, along with the app&#8217;s own service.</li>
</ul>
<p>Helidon uses the <code>enabled</code> value from <code>MetricsSettings</code> in providing the correct implementations of both the <code>RegistryFactory</code> and the <code>MetricsSupport</code>.</p>

</div>

<h4 id="_an_example_docker_images">An Example: Docker Images</h4>
<div class="section">
<p>Here is an example showing how useful metrics-capable code can be.</p>

<p>You (or others) could assemble a Docker image with your metrics-capable app as its top layer or your metrics-capable component in a middle layer, built on a lower  layer containing several Helidon modules including the full metrics implementation.
When that Docker image runs, your app will run with full-featured metrics support.</p>

<p>Separately, someone could build a similar Docker image which <em>does not</em> include the Helidon metrics implementation.
In this Docker image, your app or component will run successfully but will not incur the overhead of actually updating the metrics it uses.</p>

<p>Users can create different Docker images, some with full metrics support and some without,
which all use a single version of your metrics-capable app or component which runs properly in either environment without change.</p>

</div>
</div>
</div>

<h2 id="_advantages_of_writing_metrics_capable_modules">Advantages of Writing Metrics-capable Modules</h2>
<div class="section">
<p>By writing a metrics-capable app or component, you give packagers and deployers of your code the flexibility to include or exclude
the full metrics implementation at runtime as they see fit.</p>

<p>Because your one module works correctly in either environment:</p>

<ul class="ulist">
<li>
<p>The consumers of your app benefit by not needing to understand and choose between two different implementations of your module, or having to add both your main module and an  optional add-on which adds metrics support to your module.</p>

</li>
<li>
<p>You benefit by writing and maintaining a single module, not two: one that is metrics-independent and one that is metrics-dependent.</p>

</li>
</ul>
</div>
</doc-view>