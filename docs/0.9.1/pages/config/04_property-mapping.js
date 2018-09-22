<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Property Mapping</dt>
<dd slot="desc"><p>Although config values are originally text, you can use the config system&#8217;s
built-in conversions or add your own to translate text
into Java primitive types and simple objects (such as <code>Double</code>) and to
express parts of the config tree as complex types (<code>List</code>, <code>Map</code>, and
custom types specific to your application). This section introduces how to
use the built-in mappings and your own custom ones to convert to simple and
complext types.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Converting Configuration to Simple Types</h2>
<div class="section">
<p>The <a id=""
title=""
target="_blank"
href="{java-base-url-api}/Config.html"><code>Config</code></a> class itself provides many
conversions to Java types. See the JavaDoc for the complete list.</p>

<p>The methods which support Java primitive types and their related classes follow a
common pattern. The examples in the table below deal with conversion to a boolean
 but the same pattern applies to many data types listed in the JavaDoc.</p>

<p>Assume a local variable has been assigned something like</p>

<markup
lang="java"

>Config config = Config.get("someKey");</markup>

<div class="block-title"><span>Built-in Conversions to Simple Types (e.g., boolean)</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Java type</th>
<th>Example usage <sup>1</sup></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>boolean</code></td>
<td>
<code>boolean defaultedB = config.asBoolean(true);</code> <sup>3</sup></td>
</tr>
<tr>
<td><code>Supplier&lt;Boolean&gt;</code></td>
<td><code>Boolean b = config.asBooleanSupplier().get();</code></td>
</tr>
<tr>
<td><code>Optional&lt;Boolean&gt;</code></td>
<td><code>Boolean b = config.asOptionalBoolean().orElse(Boolean.TRUE);</code> <sup>4</sup></td>
</tr>
<tr>
<td><code>Supplier&lt;Optional&lt;Boolean&gt;&gt;</code></td>
<td><code>Boolean b = config.asOptionalBooleanSupplier().get().orElse(Boolean.TRUE);</code></td>
</tr>
</tbody>
</table>
</div>
<p>Notes on Built-in Conversions to Simple Types</p>

<v-card flat color="grey lighten-3"  class="card__example">
<v-card-text><p><sup>1</sup> All conversions can throw <code>MissingValueException</code> (if no value exists at the
requested key) and <code>ConfigMappingException</code> (if some error occurred performing
the data mapping).</p>

<p><sup>2</sup> The <code>Config.asXXX</code> methods internally use the Java-provided <code>XXX.parseXXX</code> methods, so here
a missing or unparseable string gives <code>false</code> because that is how <code>Boolean.parseBoolean</code>
behaves.</p>

<p><sup>3</sup> User code defaults the value to <code>true</code>.</p>

<p><sup>4</sup> User code defaults the value to <code>Boolean.TRUE</code> if absent; otherwise parses
the value using <code>Boolean.parseBoolean</code>.</p>
</v-card-text>
</v-card>


<p>The numerous conversions defined on the <code>Config</code> class for other types (integers,
doubles, etc.) will satisfy
many of your application&#8217;s needs. The <a id=""
title=""
target="_blank"
href="{java-base-url-api}/ConfigMappers.html"><code>ConfigMappers</code></a> class
includes other related mappings from <code>String</code> (rather than from <code>Config</code>) to
Java types (described in the JavaDoc).</p>

<p>For additional simple type mapping, you can use these methods defined on <code>Config</code>:</p>

<markup
lang="java"

>T as(Class&lt;? extends T&gt; type);
T as(Class&lt;? extends T&gt; type, T defaultValue);</markup>

<p>which maps a single <code>String</code> config value to a type.</p>

<p>The next example, and later
ones below showing complex type mapping, use the example
<a id=""
title=""
target="_blank"
href="01_introduction.html#app-properties"><code>application.properties</code></a> configuration
from the config introduction. Part of that example includes this line:</p>

<markup


>bl.initial-id = 10000000000</markup>

<p>Your application can use <code>Config.as</code> to interpret the value as a <code>BigDecimal</code>:</p>

<markup
lang="java"

>BigDecimal initialId = config.get("bl.initial-id").as(BigDecimal.class);</markup>

</div>

<h2 >Converting Configuration to Complex Types</h2>
<div class="section">
<p>The <a id=""
title=""
target="_blank"
href="03_hierarchical-features.html">hierarchical features</a> section describes
the tree structure used to represent config data. The config system can map subtrees
of a config tree to complex Java types.</p>


<h3 >Built-in Conversions to <code>List</code> and <code>Map</code></h3>
<div class="section">
<p>The <code>Config</code> class exposes several methods for mapping a structured config node
to a Java <code>List</code> or <code>Map</code>. The <a id=""
title=""
target="_blank"
href="{java-base-url-api}/Config.html">JavaDoc</a>
contains complete details, but briefly your application can convert a structured <code>Config</code> node into:</p>

<ul class="ulist">
<li>
<p>a <code>List&lt;T&gt;</code> of a given type, with or without default values,</p>

</li>
<li>
<p>an <code>Optional&lt;List&lt;T&gt;&gt;</code>,</p>

</li>
<li>
<p>a <code>Map&lt;String, String&gt;</code> in which each key is the fully-qualified key <code>String</code> for a
config entry and the value is its <code>String</code> value, or</p>

</li>
<li>
<p>an <code>Optional&lt;Map&lt;String, String&gt;&gt;</code>.</p>

</li>
</ul>
</div>

<h3 >Custom Conversions</h3>
<div class="section">
<p>Often your code will be simpler if you can treat parts of the configuration as
custom, application-specific Java objects, rather than as a group of <code>String</code> keys and
values. You will need customized conversions to do so.</p>

<p>The config system provides many ways to accomplish this, described in
the <a id=""
title=""
target="_blank"
href="{java-base-url-api}/package-summary.html#conversions"><code>io.helidon.config</code>
package JavaDoc</a>.</p>

<p>Some of those approaches require that the target class&#8201;&#8212;&#8201;the class to which
you want to convert the configuration data&#8201;&#8212;&#8201;have certain characteristics
 or that you add a method to the class to help do the mapping.
You might want to avoid changing the target class or you
might not even be able to if you do not control its source.</p>

<p>Here are two approaches that will always work without requiring changes
to the target class. For both you write your own
custom <a id=""
title=""
target="_blank"
href="{java-base-url-api}/ConfigMapper.html"><code>ConfigMapper</code></a> class.
The difference is in how your application triggers the use of that mapper.</p>


<h4 >Use Custom Mapper Explicitly: <code>Config.map</code> method</h4>
<div class="section">
<p>Any time your application has a <code>Config</code> instance to map to the target class
it invokes <code>Config.map</code> passing an instance of the corresponding <code>ConfigMapper</code>
implementation:</p>

<markup
lang="java"

>Config config = Config.get("web");
WebConfig web = config.map(new WebConfigMapper());</markup>

<p>You do not necessarily need a new instance of the mapper every time you want to use
it.</p>

<p>In this approach, everywhere your application needs to perform this conversion it specifies the
mapper to use. If you decided to change which mapper to use you would need
to update each of those places in your application.</p>

</div>

<h4 >Register Custom Mapper Once, Use Implicitly: <code>Config.as</code> method</h4>
<div class="section">
<p>In this approach, your application:</p>

<ol style="margin-left: 15px;">
<li>
Tells each <code>Config.Builder</code>
that needs to know about the custom mapper by either:
<ol style="margin-left: 15px;">
<li>
registering an instance of your mapper by invoking <code>Config.Builder.addMapper</code>, or

</li>
<li>
implementing
<a id=""
title=""
target="_blank"
href="{java-base-url-api}/spi/ConfigMapperProvider.html"><code>ConfigMapperProvider</code></a>
so it returns an instance of your mapper (see the JavaDoc for complete information)
and creating or editing the file <code>io.helidon.config.spi.ConfigMapperProvider</code>
so it contains
a line with the fully-qualified class name of your <code>ConfigMapperProvider</code>. The
config system will use the Java service loader to find and invoke all
<code>ConfigMapperProvider</code> classes listed and add the mappers they provide to each
<code>Config.Builder</code> automatically.

</li>
</ol>
</li>
<li>
Converts using the mapper by invoking the
<code>Config.as</code> method which accepts the target type to convert to, <em>not</em> the
mapper itself that does the conversion.

</li>
</ol>
<p>If your application converts to the same
target type in several places in the code, this approach allows you to change which mapper it uses by
changing only the <em>registration</em> of the mapper, not each use of it.</p>

</div>

<h4 >Continuing the <code>Web</code> Example</h4>
<div class="section">
<p>The following examples build on the example configuration from the
<a id=""
title=""
target="_blank"
href="01_introduction.html#create-simple-config-props"><code>application.properties</code></a>
example file in the introduction.</p>

<markup
lang="java"
title="Java POJO to Hold <code>web</code> Properties Config"
>public class WebConfig {
    private boolean debug;
    private int pageSize;
    private double ratio;

    public WebConfig(boolean debug, int pageSize, double ratio) {
        this.debug = debug;
        this.pageSize = pageSize;
        this.ratio = ratio;
    }

    public boolean isDebug() {
        return debug;
    }

    public int getPageSize() {
        return pageSize;
    }

    public double getRatio() {
        return ratio;
    }
}</markup>

<markup
lang="java"
title="Custom Mapper Class"
>public class WebConfigMapper implements ConfigMapper&lt;WebConfig&gt; {

        @Override
        public WebConfig apply(Config config) throws ConfigMappingException, MissingValueException {
            WebConfig web = new WebConfig(
                config.get("debug").asBoolean(false),
                config.get("page-size").asInt(10),
                config.get("ratio").asDouble(1.0)
            );

            return web;
        }
    }</markup>

<markup
lang="java"
title="Explicitly Using the Mapper"
>...
    Config config = Config.withSources(classpath("application.properties"))
        .build();

    WebConfig web = config.get("web")
        .map(new WebConfigMapper());</markup>

<markup
lang="java"
title="Registering and Implicitly Using the Mapper"
>...
    Config config = Config.withSources(classpath("application.properties"))
        .addMapper(WebConfig.class, new WebConfigMapper())
        .build();

    WebConfig web = config.get("web")
        .as(WebConfig.class);</markup>

<p>Either of the two approaches just described will <em>always</em> work without requiring you to change
the POJO class.</p>

</div>
</div>
</div>

<h2 >Advanced Conversions using Explicit Mapping Logic</h2>
<div class="section">
<p>If the target Java class you want to use meets certain conditions&#8201;&#8212;&#8201;or if you can change
it to meet one of those conditions&#8201;&#8212;&#8201;you might not need to write a separate mapper
class. Instead, you add the mapping logic to the POJO itself in one of
several ways and the config system
uses Java reflection to search for those ways to perform the mapping.</p>

<p>Your application facilitates this implicit mapping either by adding to the
POJO class or by providing a builder class for it.</p>


<h3 >Adding the Mapping to the POJO</h3>
<div class="section">
<p>If you can change the target class you can add any one of the following methods or
constructors to the POJO class which the config system will find and use for mapping.</p>

<div class="block-title"><span>Methods Supporting Auto-mapping</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td><code>static WebConfig from(Config);</code></td>
</tr>
<tr>
<td><code>static WebConfig from(String);</code></td>
</tr>
<tr>
<td><code>static WebConfig valueOf(Config);</code></td>
</tr>
<tr>
<td><code>static WebConfig valueOf(String);</code></td>
</tr>
<tr>
<td><code>static WebConfig fromConfig(Config);</code></td>
</tr>
<tr>
<td><code>static WebConfig fromString(String);</code></td>
</tr>
</tbody>
</table>
</div>
<div class="block-title"><span>Constructors Supporting Auto-mapping</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td><code>WebConfig(Config);</code></td>
</tr>
<tr>
<td><code>WebConfig(String);</code></td>
</tr>
</tbody>
</table>
</div>
<p>If the config system finds any of these methods or constructors when the
application invokes</p>

<markup
lang="java"

>WebConfig wc = config.as(WebConfig.class);</markup>

<p>it will invoke the one it found to
map the config data to a new instance of the target class. You do not need to
write a separate class to do the mapping or register it with the <code>Config.Builder</code>
for the config instance.</p>

</div>

<h3 >Writing a Builder Method and Class for the POJO</h3>
<div class="section">
<p>You can limit the changes to the POJO class by adding a single
<code>builder</code> method to the POJO which returns a builder class for the POJO:</p>

<markup
lang="java"

>public class WebConfig {
...
    static WebConfigBuilder builder() {
        return new WebConfigBuilder();
    }
...
}</markup>

<p>The builder class <code>WebConfigBuilder</code> is expected to be a Java Bean with</p>

<ol style="margin-left: 15px;">
<li>
bean properties named for the config properties of interest, and

</li>
<li>
a method <code>WebConfig build()</code> which creates the mapped instance
from the builder&#8217;s own bean properties.

</li>
</ol>
<p>When your application invokes <code>config.as(WebConfig.class)</code> the config system</p>

<ol style="margin-left: 15px;">
<li>
finds and invokes the <code>WebConfig.builder()</code> method,

</li>
<li>
assigns the bean properties on the returned builder from the config subtree
rooted at <code>config</code>, and

</li>
<li>
invokes the builder&#8217;s <code>build()</code> method yielding the resulting <code>WebConfig</code> instance.

</li>
</ol>
</div>
</div>

<h2 >Conversions using JavaBean Deserialization</h2>
<div class="section">
<p>The config system can also interpret your classes as JavaBeans and use
the normal bean naming conventions to map configuration data to your POJO classes,
using one of these patterns:</p>

<ol style="margin-left: 15px;">
<li>
<router-link to="#pojoAsJavaBean" @click.native="this.scrollFix('#pojoAsJavaBean')">POJO as JavaBean</router-link> - The config system treats the target class itself as
a JavaBean, assigning values from the config to the bean properties of the POJO
class.

</li>
<li>
<router-link to="#builderAsJavaBean" @click.native="this.scrollFix('#builderAsJavaBean')">builder as JavaBean</router-link> - The config system invokes the POJO&#8217;s <code>builder()</code>
method to obtain a builder for that POJO type and treats the <em>builder</em>
class as a JavaBean, assigning values from the config to the builder&#8217;s
bean properties and then invoking the builder&#8217;s <code>build</code> method to create
an instance of the target POJO class.

</li>
<li>
<router-link to="#pojoWithFactoryMethodOrConstructor" @click.native="this.scrollFix('#pojoWithFactoryMethodOrConstructor')">POJO with factory method or decorated constructor</router-link> - The
config system finds a <code>from</code> method or a constructor on
the POJO class itself which accepts annotated arguments, then invokes that method
or constructor
passing the specified arguments based on the config. The <code>from</code> method returns
an instance of the POJO class initialized with the values passed as arguments.

</li>
</ol>
<p>The following sections describe these patterns in more detail.</p>


<h3 >POJO as JavaBean</h3>
<div class="section">
<p>If your POJO target class is already a JavaBean&#8201;&#8212;&#8201;or you can modify it
to become one&#8201;&#8212;&#8201;you might be able to avoid writing any explicit
mapping code yourself.</p>

<p>The config system invokes the no-args constructor on the target class to create
a new instance. It treats each public setter method and each public non-final field
as a JavaBean property. The config system processes any non-primitive property
recursively as a JavaBean. In this way the config system builds up the target
object from the config data.</p>

<p>By default, the system matches potential JavaBean property names with
config keys in the configuration.</p>

<p>Use the <a id=""
title=""
target="_blank"
href="{java-base-url-api}/Config.Value.html"><code>Config.Value</code></a> annnotation to control some of the JavaBean processing for a
given property.</p>

<div class="block-title"><span><code>Config.Value</code> Annotation</span></div>
<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Attribute</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>key</code></td>
<td>Indicates which config key should match this JavaBean property</td>
</tr>
<tr>
<td><code>withDefault</code></td>
<td><code>String</code> used for the bean property default value if none is set in the config</td>
</tr>
<tr>
<td><code>withDefaultSupplier</code></td>
<td><code>Supplier</code> of the default bean property value if nont is set in the config</td>
</tr>
</tbody>
</table>
</div>
<p>To exclude a bean property from the config system bean processing annotate it with
<a id=""
title=""
target="_blank"
href="{java-base-url-api}/Config.Transient.html"><code>Config.Transient</code></a>.</p>

<p>Here is an example using the <code>app</code> portion of the example configuration from the
introduction.</p>

<markup
lang="java"
title="Java bean to load <code>app</code> propeties into via setters"
>public class AppConfig {
    private Instant timestamp;
    private String greeting;
    private int pageSize;
    private List&lt;Integer&gt; basicRange;

    public AppConfig() {                                          <span class="conum" data-value="1" />
    }

    public void setGreeting(String greeting) {                    <span class="conum" data-value="2" />
        this.greeting = greeting;
    }
    public String getGreeting() {
        return greeting;
    }

    @Config.Value(key = "page-size",                              <span class="conum" data-value="3" />
                  withDefault = "10")                             <span class="conum" data-value="4" />
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public int getPageSize() {
        return pageSize;
    }

    @Config.Value(key = "basic-range",                            <span class="conum" data-value="5" />
                  withDefaultSupplier = BasicRangeSupplier.class) <span class="conum" data-value="6" />
    public void setBasicRange(List&lt;Integer&gt; basicRange) {
        this.basicRange = basicRange;
    }
    public List&lt;Integer&gt; getBasicRange() {
        return basicRange;
    }

    @Config.Transient                                             <span class="conum" data-value="7" />
    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
    public Instant getTimestamp() {
        return timestamp;
    }

    public static class BasicRangeSupplier
            implements Supplier&lt;List&lt;Integer&gt;&gt; {                  <span class="conum" data-value="8" />
        @Override
        public List&lt;Integer&gt; get() {
            return List.of(-10, 10);
        }
    }
}</markup>

<ul class="colist">
<li data-value="1">Public no-parameter constructor.</li>
<li data-value="2">Property <code>greeting</code> is not customized and will be set from the config node with
the key <code>greeting</code>, if present in the config.</li>
<li data-value="3">Property <code>pageSize</code> is matched to the config key <code>page-size</code>.</li>
<li data-value="4">If the <code>page-size</code> config node does not exist, the <code>pageSize</code> bean property defaults to <code>10</code>.</li>
<li data-value="5">Property <code>basicRange</code> is matched to the config key <code>basic-range</code>.</li>
<li data-value="6">If the <code>basic-range</code> config node does not exist, a <code>BasicRangeSupplier</code> instance will provide
the default value.</li>
<li data-value="7">The <code>timestamp</code> bean property is never set, even if the config contains a node
with the key <code>timestamp</code>.</li>
<li data-value="8"><code>BasicRangeSupplier</code> is used to supply the <code>List&lt;Integer&gt;</code> default value.</li>
</ul>
<p>Here is an example of code loading config and mapping part of it to the <code>AppConfig</code>
bean above.</p>

<markup
lang="java"
title="Map <code>app</code> config node into <code>AppConfig</code> class"
>Config config = Config.from(classpath("application.conf"));

AppConfig app = config.get("app")
        .as(AppConfig.class);                               <span class="conum" data-value="1" />

//assert that all values are loaded from file
assert app.getGreeting().equals("Hello");
assert app.getPageSize() == 20;
assert app.getBasicRange().size() == 2
        &amp;&amp; app.getBasicRange().get(0) == -20
        &amp;&amp; app.getBasicRange().get(1) == 20;

//assert that Transient property is not set
assert app.getTimestamp() == null;                          <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The config system finds no registered <code>ConfigMapper</code> for <code>AppConfig</code> and so
applies the JavaBean pattern to convert the config to an <code>AppConfig</code> instance.</li>
<li data-value="2">Because the bean property <code>timestamp</code> was marked as transient, the
config system did not set it.</li>
</ul>
</div>

<h3 >Builder as JavaBean</h3>
<div class="section">
<p>If the target class includes the public static method <code>builder()</code> that returns any object,
then the config system will make sure that the return type has a method <code>build()</code>
which returns an instance of the target class. If so, the config system treats
the <em>builder</em> as a JavaBean and</p>

<ol style="margin-left: 15px;">
<li>
invokes the <code>builder()</code> method to instantiate the builder class,

</li>
<li>
treats the <em>builder</em> as a JavaBean and maps the <code>Config</code> subtree to it,

</li>
<li>
invokes the builder&#8217;s <code>build()</code> method to create the new instance of the target
class.

</li>
</ol>
<p>There are two ways to use this feature:
1. <router-link to="#addBuilderToTargetClass" @click.native="this.scrollFix('#addBuilderToTargetClass')">Augment the target class with the public static <code>builder()</code> method.</router-link>
2. <router-link to="#writeSeparateBuilder" @click.native="this.scrollFix('#writeSeparateBuilder')">Write a separate builder class and tell the <code>Config.Builder</code> to associate the
target class and the builder class.</router-link></p>


<h4 >Add <code>builder()</code> to Target Class</h4>
<div class="section">
<p>Here is one way to use this feature:</p>

<markup
lang="java"
title="JavaBean for <code>app</code> properties, via a <code>Builder</code>"
>public class AppConfig {
    private String greeting;
    private int pageSize;
    private List&lt;Integer&gt; basicRange;

    private AppConfig(String greeting, int pageSize, List&lt;Integer&gt; basicRange) { <span class="conum" data-value="1" />
        this.greeting = greeting;
        this.pageSize = pageSize;
        this.basicRange = basicRange;
    }

    public String getGreeting() {
        return greeting;
    }

    public int getPageSize() {
        return pageSize;
    }

    public List&lt;Integer&gt; getBasicRange() {
        return basicRange;
    }

    public static Builder builder() {                                            <span class="conum" data-value="2" />
        return new Builder();
    }

    public static class Builder {                                                <span class="conum" data-value="3" />
        private String greeting;
        private int pageSize;
        private List&lt;Integer&gt; basicRange;

        private Builder() {
        }

        public void setGreeting(String greeting) {                               <span class="conum" data-value="4" />
            this.greeting = greeting;
        }

        @Config.Value(key = "page-size",
                      withDefault = "10")
        public void setPageSize(int pageSize) {                                  <span class="conum" data-value="5" />
            this.pageSize = pageSize;
        }

        @Config.Value(key = "basic-range",
                      withDefaultSupplier = BasicRangeSupplier.class)
        public void setBasicRange(List&lt;Integer&gt; basicRange) {                    <span class="conum" data-value="6" />
            this.basicRange = basicRange;
        }

        public AppConfig build() {                                               <span class="conum" data-value="7" />
            return new AppConfig(greeting, pageSize, basicRange);
        }
    }
}</markup>

<ul class="colist">
<li data-value="1">The target class&#8217;s constructor can be <code>private</code> in this case because new instances are created
from the inner class <code>Builder</code> which has access to `AppConfig&#8217;s private members.</li>
<li data-value="2">The target class contains <code>public static</code> method <code>builder()</code> which returns
an object that itself exposes the method <code>AppConfig build()</code>, so the config system
recognizes it.</li>
<li data-value="3">The config system treats the <code>AppConfig.Builder</code> (not the enclosing
target class) as a JavaBean.</li>
<li data-value="4">The builder&#8217;s property <code>greeting</code> is not customized and is set from config node with
<code>greeting</code> key, if one exists.</li>
<li data-value="5">The builder&#8217;s property <code>pageSize</code> maps to the config key <code>page-size</code> and
defaults to <code>10</code> if absent.</li>
<li data-value="6">The builder&#8217;s property <code>basicRange</code> maps to the config key <code>basic-range</code>
and uses a <code>BasicRangeSupplier</code> instance to get a default value if needed.</li>
<li data-value="7">Finally, the config system invokes the builder&#8217;s public method <code>build()</code>,
creating the new instance of <code>AppConfig</code> for use by the application.</li>
</ul>
</div>

<h4 >Write a Builder Separate from the Target Class</h4>
<div class="section">
<p>If you cannot or do not want to add the <code>builder()</code> method to the target class,
you can instead associate a separate builder to be processed as a JavaBean with
the target class.</p>

<p>This example shows the target type as a Java interface instead of a class. Either
will work.</p>

<markup
lang="java"
title="Target Type <code>IAppConfig</code>"
>public interface IAppConfig {
    String getGreeting();
    int getPageSize();
    List&lt;Integer&gt; getBasicRange();
}</markup>

<markup
lang="java"
title="Separate <code>BuilderImpl</code> with an implementation <code>AppConfigImpl</code> of IAppConfig"
>public class BuilderImpl {                                        <span class="conum" data-value="1" />
    private String greeting;
    private int pageSize;
    private List&lt;Integer&gt; basicRange;

    public BuilderImpl() {                                        <span class="conum" data-value="1" />
    }

    @Config.Value(key = "greeting")
    public BuilderImpl greeting(String greeting) {                <span class="conum" data-value="2" />
        this.greeting = greeting;
        return this;
    }

    @Config.Value(key = "page-size", withDefault = "10")
    public BuilderImpl pageSize(int pageSize) {                   <span class="conum" data-value="2" />
        this.pageSize = pageSize;
        return this;
    }

    @Config.Value(key = "basic-range",
                  withDefaultSupplier = BasicRangeSupplier.class)
    public BuilderImpl basicRange(List&lt;Integer&gt; basicRange) {     <span class="conum" data-value="2" />
        this.basicRange = basicRange;
        return this;
    }

    public IAppConfig build() {                                   <span class="conum" data-value="3" />
        return new AppConfigImpl(greeting, pageSize, basicRange);
    }

    /**
     * Private implementation provided by {@link BuilderImpl}.
     */
    private static class AppConfigImpl implements IAppConfig {    <span class="conum" data-value="4" />
        private String greeting;
        private int pageSize;
        private List&lt;Integer&gt; basicRange;

        private AppConfigImpl(String greeting,
                              int pageSize,
                              List&lt;Integer&gt; basicRange) {
            this.greeting = greeting;
            this.pageSize = pageSize;
            this.basicRange = basicRange;
        }
        @Override
        public String getGreeting() {
            return greeting;
        }
        @Override
        public int getPageSize() {
            return pageSize;
        }
        @Override
        public List&lt;Integer&gt; getBasicRange() {
            return basicRange;
        }
    }
}</markup>

<ul class="colist">
<li data-value="1">Class <code>BuilderImpl</code> must be public including, its public no-args
constructor, because the config system instantiates it.</li>
<li data-value="2">The builder can use the <em>builder</em> pattern (the methods return the builder
itself so the caller can chain calls together) instead of the usual JavaBean setter
method pattern. In that case, decorate each builder method (e.g, <code>greeting</code>) using
 <code>@Config.Value</code> to associate it with the correct config key.</li>
<li data-value="3">The builder&#8217;s <code>build()</code> is declared to return <code>IAppConfig</code> and in fact returns
an instance of <code>AppConfigImpl</code> which implements <code>IAppConfig</code>.</li>
<li data-value="4">The <code>AppConfigImpl</code> class can be private to the builder because the builder
itself instantiates it and all other code will use the <code>IAppConfig</code> interface
to access the mapped config data.</li>
</ul>
<p>Because the config system cannot infer a link between the target class and the
separate builder, the application makes that link explicit to the <code>Config.Builder</code>:</p>

<markup
lang="java"
title="Register <code>BuilderImpl</code> as <code>IAppConfig</code> mapper"
>Config config = Config.withSources(classpath("application.conf"))
        .addMapper(IAppConfig.class,                                        <span class="conum" data-value="1" />
                   ConfigMappers.from(IAppConfig.class, BuilderImpl.class)) <span class="conum" data-value="2" />
        .build();

IAppConfig app = config.get("app")
        .as(IAppConfig.class);                                              <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Programmatically registers the mapper for the <code>IAppConfig</code> interface.</li>
<li data-value="2">Creates a config mapper for <code>IAppConfig</code> that uses <code>BuilderImpl</code> by invoking
the convenience method <code>ConfigMappers.from(type, builder)</code>.</li>
<li data-value="3">Config system uses <code>BuilderImpl</code> to map the config subtree to <code>IAppConfig</code>.</li>
</ul>
</div>
</div>

<h3 >Target Class with Annotated Factory Method or Constructor</h3>
<div class="section">
<p>Another option is to annotate the parameters to a <em>factory method</em> or to a constructor
on the target class. You can add a <em>factory method</em> to the target class, a <code>public static</code>
method <code>from</code> with parameters annotated to link them to the corresponding config
keys. Or you can add or modify a constructor with parameters, similarly annotated
to form the link from each parameter to the corresponding config key.</p>

<div class="admonition warning">
<p class="admonition-textlabel">Warning</p>
<p ><p>Be sure to annotate each parameter of the <code>from</code> method or constructor with <code>@Value</code>
and specify the key to use for the mapping. The parameter names in the Java code
are not always available at runtime to map to config keys. (They might be <code>arg0</code>,
 <code>arg1</code>, etc.)</p>
</p>
</div>
<markup
lang="java"
title="Target Class with Factory Method <code>from</code>"
>public class AppConfig {
    private final String greeting;
    private final int pageSize;
    private final List&lt;Integer&gt; basicRange;

    private AppConfig(String greeting, int pageSize, List&lt;Integer&gt; basicRange) { <span class="conum" data-value="1" />
        this.greeting = greeting;
        this.pageSize = pageSize;
        this.basicRange = basicRange;
    }

    public String getGreeting() {
        return greeting;
    }

    public int getPageSize() {
        return pageSize;
    }

    public List&lt;Integer&gt; getBasicRange() {
        return basicRange;
    }

    public static AppConfig from(                                                <span class="conum" data-value="2" />
            @Config.Value(key = "greeting")
                    String greeting,                                             <span class="conum" data-value="3" />
            @Config.Value(key = "page-size",
                          withDefault = "10")
                    int pageSize,
            @Config.Value(key = "basic-range",
                          withDefaultSupplier = BasicRangeSupplier.class)
                    List&lt;Integer&gt; basicRange) {
        return new AppConfig(greeting, pageSize, basicRange);
    }
}</markup>

<ul class="colist">
<li data-value="1">The target class constructor can be <code>private</code> because the factory method on
the same class has access to it.</li>
<li data-value="2">The config system invokes the factory method <code>from(&#8230;&#8203;)</code>, passing
arguments it has fetched from the correspondingly-named config subtrees.
The factory method returns the new initialized <code>AppConfig</code> instance.
Note the consistent use of <code>@Config.Value(key = "&#8230;&#8203;")</code> on each parameter.</li>
<li data-value="3">Because the property <code>greeting</code> does not specify a default value
the property is <strong>mandatory</strong> and must appear in the configuration source.
Otherwise the config system throws a <code>ConfigMappingException</code>.</li>
</ul>
<p>Alternatively, you can use an annotated constructor instead of a static factory
method. Revising the example above, make the constructor public, annotate its
parameters, and remove the now-unneeded <code>from</code> factory method.</p>

<markup
lang="java"
title="Target Class with Annotated Public Constructor"
>public class AppConfig {
    ...
    public AppConfig( <span class="conum" data-value="1" />
        @Config.Value(key = "greeting") <span class="conum" data-value="2" />
                String greeting,
        @Config.Value(key = "page-size",
                          withDefault = "10")
                int pageSize,
        @Config.Value(key = "basic-range",
                          withDefaultSupplier = BasicRangeSupplier.class)
                List&lt;Integer&gt; basicRange) {
        this.greeting = greeting;
        this.pageSize = pageSize;
        this.basicRange = basicRange;
    }</markup>

<ul class="colist">
<li data-value="1">Constructor is <code>public</code>.</li>
<li data-value="2">Each parameter has the <code>ConfigValue</code> annotation to at least specify the
config key name.</li>
</ul>
<p>When the application invokes <code>config.as(AppConfig.class)</code>, the config system locates
the public annotated constructor and invokes it, passing as arguments the data it fetches
from the configuration matching the annotation <code>key</code> names with the configuration
keys.</p>

</div>
</div>
</doc-view>
