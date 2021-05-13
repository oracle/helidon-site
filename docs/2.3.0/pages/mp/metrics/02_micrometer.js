<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Micrometer Metrics</dt>
<dd slot="desc"><p>Helidon MP simplifies how you can use Micrometer for application-specific metrics:</p>

<ul class="ulist">
<li>
<p>The endpoint <code>/micrometer</code>: A configurable endpoint that exposes metrics according to which Micrometer meter registry
responds to the HTTP request.</p>

</li>
<li>
<p>The Micrometer annotations <code>@Timed</code> and <code>@Counted</code>.</p>

</li>
<li>
<p>Configuration to tailor the Prometheus and other Micrometer meter registries.</p>

</li>
</ul>
<p>In Helidon 2.3.0, Micrometer support is separate from the Helidon MP metrics API and the built-in Helidon metrics.</p>
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
    &lt;artifactId&gt;helidon-integrations-micrometer-cdi&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>Micrometer supports different types of meter registries which have different output styles and formats.
Helidon provides built-in support for the Prometheus meter registry.
To use other meter registry types, you will need to add dependencies for them to your <code>pom.xml</code> and, optionally, add
configuration to set them up as you wish.</p>

</div>

<h2 id="_using_micrometer_in_your_application">Using Micrometer in Your Application</h2>
<div class="section">
<p>Add the Micrometer <code>@Timed</code> and <code>@Counted</code> annotations to methods in your application.</p>

<p>The examples below enhance the Helidon MP QuickStart application to track (by time and invocation count) all <code>GET</code> methods and to count all requests for a personalized greeting.</p>


<h3 id="_add_micrometer_annotations">Add Micrometer annotations</h3>
<div class="section">
<markup
lang="java"
title="Adding Micrometer annotations to JAX-RS resource <code>GET</code> methods"
>import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;
    <span class="conum" data-value="1" />
    private static final String PERSONALIZED_GETS_COUNTER_NAME = "personalizedGets";
    private static final String PERSONALIZED_GETS_COUNTER_DESCRIPTION = "Counts personalized GET operations";
    private static final String GETS_TIMER_NAME = "allGets";
    private static final String GETS_TIMER_DESCRIPTION = "Tracks all GET operations";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Timed(value = GETS_TIMER_NAME, description = GETS_TIMER_DESCRIPTION, histogram = true) <span class="conum" data-value="2" />
    public JsonObject getDefaultMessage() {
        return createResponse("World");
    }

    @Path("/{name}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Counted(value = PERSONALIZED_GETS_COUNTER_NAME, description = PERSONALIZED_GETS_COUNTER_DESCRIPTION) <span class="conum" data-value="3" />
    @Timed(value = GETS_TIMER_NAME, description = GETS_TIMER_DESCRIPTION, histogram = true) <span class="conum" data-value="2" />
    public JsonObject getMessage(@PathParam("name") String name) {
        return createResponse(name);
    }</markup>

<ul class="colist">
<li data-value="1">Declare constants used in annotating multiple methods.</li>
<li data-value="2">Use <code>@Timed</code> to time and count both <code>GET</code> methods.</li>
<li data-value="3">Use <code>@Counted</code> to count the accesses to the <code>GET</code> method that returns a personalized greeting.</li>
</ul>
</div>

<h3 id="_using_the_helidon_provided_micrometer_meterregistry_from_code">Using the Helidon-provided Micrometer <code>MeterRegistry</code> from Code</h3>
<div class="section">
<p>In addition to annotating your methods, you can create, look up, and update metrics explicitly in your code.</p>

<p>Add the following injection to a bean:</p>

<markup
lang="java"
title="Inject the <code>MeterRegistry</code>"
>@Inject
private MeterRegistry registry;</markup>

<p>Helidon automatically injects a reference to the <code>MeterRegistry</code> it manages into your code. Your code can use the normal Micrometer API with this registry to create, find, update, and even delete meters.</p>

</div>

<h3 id="_overriding_defaults_for_built_in_meter_registry_types">Overriding Defaults for Built-in Meter Registry Types</h3>
<div class="section">
<p>Unless you specify otherwise, Helidon uses defaults for any built-in Micrometer meter registry.
For example, Helidon configures the built-in Prometheus registry using <code>PrometheusConfig.DEFAULT</code>.</p>

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

<h2 id="_accessing_the_helidon_micrometer_endpoint">Accessing the Helidon Micrometer Endpoint</h2>
<div class="section">
<p>By default, Helidon Micrometer integration exposes the <code>/micrometer</code> endpoint. You can override this
using
the <code>micrometer.web-context</code> configuration key.</p>

<p>Within Helidon, each type of meter registry is paired with code that examines the incoming HTTP request and decides whether the request matches up with the associated meter registry. The first pairing that accepts the request returns the response.</p>

</div>
</doc-view>