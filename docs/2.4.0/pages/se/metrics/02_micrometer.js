<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Micrometer Metrics</dt>
<dd slot="desc"><p>Helidon SE simplifies how you can use Micrometer for application-specific metrics:</p>

<ul class="ulist">
<li>
<p>The endpoint <code>/micrometer</code>: A configurable endpoint that exposes metrics according to which Micrometer meter registry
responds to the HTTP request.</p>

</li>
<li>
<p>The <code>MicrometerSupport</code> class: A convenience class for enrolling Micrometer meter registries your application
creates explicitly or for selecting which built-in Micrometer meter registries
to use.</p>

</li>
<li>
<p>Configuration to tailor the Prometheus and other Micrometer meter registries.</p>

</li>
</ul>
<p>In Helidon 2.4.0, Micrometer support is separate from the Helidon SE metrics API and the built-in Helidon metrics.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_prerequisites">Prerequisites</h2>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.micrometer&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-micrometer&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>Micrometer supports different types of meter registries which have different output styles and formats.
Helidon provides built-in support for the Prometheus meter registry.
To use other meter registry types, you will need to add dependencies for them to your <code>pom.xml</code> and, optionally, add
code to your application or add
configuration to set them up as you wish.</p>

</div>

<h2 id="_using_micrometer_in_your_application">Using Micrometer in Your Application</h2>
<div class="section">
<p>You need to make two types of changes to your application to use Helidon SE integration with Micrometer:</p>

<ol style="margin-left: 15px;">
<li>
Register an instance of <a id="" title="" target="_blank" href="./apidocs/io.helidon.integrations.micrometer/io/helidon/integrations/micrometer/MicrometerSupport.html"><code>MicrometerSupport</code></a> with the web server.

</li>
<li>
Create  meters using the meter registry which <code>MicrometerSupport</code> manages and update those meters.

</li>
</ol>

<h3 id="_register_an_instance_of_micrometersupport_with_the_web_server">Register an Instance of <code>MicrometerSupport</code> with the Web Server</h3>
<div class="section">
<markup
lang="java"
title="Initialize Micrometer support"
>import io.helidon.integrations.micrometer.MicrometerSupport;
//...
MicrometerSupport micrometerSupport = MicrometerSupport.create(); <span class="conum" data-value="1" />

Routing.builder()
                .register(micrometerSupport) <span class="conum" data-value="2" />
                .register("/myapp", new MyService(micrometerSupport.registry())) <span class="conum" data-value="3" />
                .build();</markup>

<ul class="colist">
<li data-value="1">Create the <code>MicrometerSupport</code> instance, using the default built-in Prometheus meter registry.</li>
<li data-value="2">Register the support instance as a service; by default, <code>MicrometerSupport</code> exposes the endpoint as <code>/micrometer</code>.</li>
<li data-value="3">Pass the <code>MicrometerSupport</code> object&#8217;s meter registry to your service for use in creating and updating meters.</li>
</ul>
</div>

<h3 id="_create_and_update_meters_in_your_application_service">Create and Update Meters in your Application Service</h3>
<div class="section">
<markup
lang="java"
title="Define and use a <code>Counter</code>"
>import io.micrometer.core.instrument.Counter;

public class MyService implements Service {

    private final Counter requestCounter;

    public MyService(MicrometerMeterRegistry registry) {
        requestCounter = registry.counter("allRequests"); <span class="conum" data-value="1" />
        // ...
    }

    @Override
    public void update(Routing.Rules rules) {
        rules
            .any(this::countRequests) <span class="conum" data-value="2" />
            .get("/", this::myGet);
    }

    private void countRequests(ServerRequest request, ServerResponse response) {
        requestCounter.increment(); <span class="conum" data-value="3" />
        request.next();
    }
}</markup>

<ul class="colist">
<li data-value="1">Use the Micrometer meter registry to create the request counter.</li>
<li data-value="2">Add routing for any request to invoke the method which counts requests by updating the counter.</li>
<li data-value="3">Update the counter and delegate the rest of the request processing to the next handler in the chain.</li>
</ul>
<p>The example above enrolls the built-in Prometheus meter registry with the default Prometheus registry configuration.
You can change the default setup for built-in registries, and you can enroll other meter registries your application
creates itself.</p>

</div>

<h3 id="_overriding_defaults_for_built_in_meter_registry_types">Overriding Defaults for Built-in Meter Registry Types</h3>
<div class="section">
<p>Unless you specify otherwise, Helidon uses defaults for any built-in Micrometer meter registry.
For example, Helidon configures the built-in Prometheus registry using <code>PrometheusConfig.DEFAULT</code>.</p>

<p>You can override these defaults in either of two ways:</p>

<ul class="ulist">
<li>
<p>Using the <a id="" title="" target="_blank" href="./apidocs/io.helidon.integrations.micrometer/io/helidon/integrations/micrometer/MicrometerSupport.Builder.html"><code>MicrometerSupport.Builder</code></a> class</p>

</li>
<li>
<p>Using configuration</p>

</li>
</ul>

<h4 id="_using_micrometersupport_builder">Using <code>MicrometerSupport.Builder</code></h4>
<div class="section">
<p>Use the <code>MicrometerSupport.Builder</code> class to set up Micrometer support however your application needs.</p>

<p>The builder lets you:</p>

<ul class="ulist">
<li>
<p>Provide your own Micrometer meter registry configuration that <code>MicrometerSupport</code> uses to create a built-in meter
registry, or</p>

</li>
<li>
<p>Instantiate a Micrometer meter registry yourself, configured however you want, and add it to the <code>MicrometerSupport</code>
object&#8217;s collection of meter registries</p>

</li>
</ul>
<markup
lang="java"
title="Overriding defaults for built-in meter registries using <code>MicrometerSupport.Builder</code>"
>PrometheusConfig myPrometheusConfig = ...; <span class="conum" data-value="1" />
MicrometerSupport support = MicrometerSupport.builder()
                .enrollBuiltInRegistry( <span class="conum" data-value="2" />
                        MicrometerSupport.BuiltInRegistryType.PROMETHEUS,
                        myPrometheusConfig)
                .build();</markup>

<ul class="colist">
<li data-value="1">Create the meter registry configuration however you need.</li>
<li data-value="2">Enroll the <code>PROMETHEUS</code> built-in registry type with your custom configuration.</li>
</ul>
</div>

<h4 id="_using_configuration">Using Configuration</h4>
<div class="section">
<p>To use configuration to control the selection and behavior of Helidon&#8217;s built-in Micrometer meter registries,
include in your configuration (such as <code>application.yaml</code>) a <code>micrometer.builtin-registries</code> section.</p>

<markup
lang="yaml"
title="Enroll Prometheus built-in meter registry using default configuration"
>micrometer:
  builtin-registries:
    - type: prometheus</markup>

<markup
lang="yaml"
title="Enroll Prometheus built-in meter registry with non-default configuration"
>micrometer:
  builtin-registries:
    - type: prometheus
      prefix: myPrefix</markup>

<p>Note that the first config example is equivalent to the default Helidon Micrometer behavior; Helidon by default supports the Prometheus meter registry.</p>

<p>The configuration keys that are valid for the <code>builtin-registries</code> child entries depend on the type of Micrometer meter
registry.
For example, the Prometheus meter registry supports the <code>prefix</code> configuration setting but other meter registries might not and might support other settings.
Refer to the documentation for the meter registry you want to configure to find out what items apply to that registry
type.</p>

<p>Helidon does not validate the configuration keys you specify for
meter registries.</p>

</div>
</div>

<h3 id="_enrolling_other_micrometer_meter_registries">Enrolling other Micrometer meter registries</h3>
<div class="section">
<p>To create additional types of registries and enroll them with <code>MicrometerSupport</code>, you need to:</p>

<ol style="margin-left: 15px;">
<li>
Write a <code>Handler</code><br>
<p>Each meter registry has its own way of producing output.
Write your handler so that it has a reference to the meter registry it should use and so that
its <code>accept</code> method sets the payload in the HTTP response using the registry&#8217;s mechanism for creating output.</p>

</li>
<li>
Write a <code>Function</code> which accepts a <code>ServerRequest</code> and returns an <code>Optional&lt;Handler&gt;</code><br>
<p>In general, your function looks at the request&#8212;&#8203;the <code>Content-Type</code>, query parameters, etc.--to
decide whether your handler should respond to the request.
If so, your function should instantiate your <code>Handler</code> and return an <code>Optional.of(theHandlerInstance)</code>;
otherwise, your function should return <code>Optional.empty()</code>.<br></p>

<p>When <code>MicrometerSupport</code> receives a request, it invokes the functions of all the enrolled registries,
stopping as soon as one function provides a handler.
<code>MicrometerSupport</code> then delegates to that handler to create and send the response.</p>

</li>
<li>
Pass the <code>Handler</code> and <code>Function</code> to the <code>MicrometerSupport.enrollRegistry</code> method to enroll them<br>
<markup
lang="java"
title="Creating and enrolling your own Micrometer meter registry"
>MeterRegistry myRegistry = new PrometheusMeterRegistry(myPrometheusConfig); <span class="conum" data-value="1" />
MicrometerSupport support = MicrometerSupport.builder()
                .enrollRegistry(myRegistry,
                               request -&gt; request <span class="conum" data-value="2" />
                                    .headers()
                                    .bestAccepted(MediaType.TEXT_PLAIN).isPresent()
                                    ? Optional.of((req, resp) -&gt;
                                            resp.send(myRegistry.scrape())) <span class="conum" data-value="3" />
                                    : Optional.empty())
                .build();</markup>

<ul class="colist">
<li data-value="1">Create the meter registry. This example uses a Prometheus registry but it can be any extension of <code>MeterRegistry</code>.</li>
<li data-value="2">Provide the function that checks if the <a id="" title="" target="_blank" href="{javadoc-base-url-webserver}/ServerRequest.html"><code>ServerRequest</code></a>
accepts content that your meter registry can produce (e.g., either <code>text/plain</code> or unspecified is normally an indication for Prometheus-style output)
and returns the appropriate <code>Optional&lt;<a id="" title="" target="_blank" href="{:javadoc-base-url-webserver}/Handler.html"><code>Handler</code></a>&gt;</code>.</li>
<li data-value="3">A very simple in-line <code>Handler</code> that sets the response entity from the Prometheus registry&#8217;s <code>scrape()</code> method.</li>
</ul>
</li>
</ol>
</div>
</div>

<h2 id="_accessing_the_helidon_micrometer_endpoint">Accessing the Helidon Micrometer Endpoint</h2>
<div class="section">
<p>By default, Helidon Micrometer integration exposes the <code>/micrometer</code> endpoint. You can override this
using
the <code>Builder</code> or
the <code>micrometer.web-context</code> configuration key.</p>

<p>When <code>MicrometerSupport</code> receives a request at the endpoint, it looks for the first enrolled meter registry for which
the corresponding <code>Function&lt;ServerRequest, Optional&lt;Handler&gt;&gt;</code> returns a non-empty <code>Handler</code>.
Helidon invokes that <code>Handler</code> which must retrieve the metrics output from its meter registry and set
and send the response.
Note that the <code>Handler</code> which your function returns typically has a reference to the meter registry it will use
in preparing the response.</p>

</div>
</doc-view>