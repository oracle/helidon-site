<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon SE Config Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample Helidon SE project that can be used to run some
basic examples using both default and custom configuration.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What you need</h2>
<div class="section">

<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">About 30 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_getting_started_with_configuration">Getting started with configuration</h2>
<div class="section">
<p>Helidon provides a very flexible and comprehensive configuration system, offering you many application configuration choices.
You can include configuration data from a variety of sources using different formats, like JSON and YAML.
Furthermore, you can customize the precedence of sources and make them optional or mandatory.
This guide introduces Helidon SE configuration and demonstrates the fundamental concepts using several examples.
Refer to <router-link to="#config/01_introduction.adoc" @click.native="this.scrollFix('#config/01_introduction.adoc')">Helidon Config</router-link> for the full configuration concepts documentation.</p>


<h3 id="_create_a_sample_helidon_se_project">Create a sample Helidon SE project</h3>
<div class="section">
<p>Use the Helidon SE Maven archetype to create a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype:"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=2.3.3 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se</markup>

<markup
lang="bash"
title="The project will be built and run from the <code>helidon-quickstart-se</code> directory:"
>cd helidon-quickstart-se</markup>

</div>

<h3 id="_configuration_formats">Configuration Formats</h3>
<div class="section">
<p>Helidon configuration sources can use different formats for the configuration data. You can specify the
format on a per-source bases, mixing and matching formats as required.  Here are the supported formats,
each with the extension name you should use. By default, Helidon will determine the media type based on the extension name.</p>

<ul class="ulist">
<li>
<p>Java Property (.properties)</p>

</li>
<li>
<p>JSON (.json)</p>

</li>
<li>
<p>YAML (.yaml)</p>

</li>
<li>
<p>HOCON (.conf)</p>

</li>
</ul>
<p>The remainder of this document will use these formats in examples and show you how to configure Helidon to parse them.</p>

</div>

<h3 id="_default_configuration">Default configuration</h3>
<div class="section">
<p>Helidon has an internal configuration, so you are not required to provide any configuration data for your application,
though in practice you most likely would.  By default, that configuration can be overridden from three sources:
system properties, environment variables, and  the contents of <code>application.yaml</code> in the classpath.
For example, if you specify a custom server port in <code>application.yaml</code> then your server will listen on that port.</p>

<p>In your application code, Helidon uses the default configuration when you create a default <code>Config</code> object.
See the following code from the project you created.</p>

<markup
lang="Java"
title="View <code>Main.startServer</code>:"
>    static WebServer startServer() throws IOException {
...
        Config config = Config.create(); <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">The <code>Config</code> object is created with default settings.</li>
</ul>
</div>

<h3 id="_source_precedence_for_default_configuration">Source precedence for default configuration</h3>
<div class="section">
<p>In order to properly configure your application using configuration sources, you need to understand
the precedence rules that Helidon uses to merge your configuration data.  By default,
Helidon will use the following sources in precedence order:</p>

<ol style="margin-left: 15px;">
<li>
Environment variables

</li>
<li>
Java system properties

</li>
<li>
Configuration specified in <code>application.yaml</code>

</li>
</ol>
<p>If any of the Helidon required properties are not specified in one of these source, like <code>server.port</code>, then Helidon will use a default value.</p>

<div class="admonition note">
<p class="admonition-inline">Because environment variable names are restricted to alphanumeric characters and underscore,
Helidon adds aliases to the environment configuration source, allowing entries with dotted and/or
hyphenated keys to be overriden.  For example, this mapping allows an environment variable named "APP_GREETING" to override
an entry key named "app.greeting".  In the same way, an environment variable named "APP_dash_GREETING" will map to
"app-greeting".  See <router-link to="#config/06_advanced-configuration.adoc" @click.native="this.scrollFix('#config/06_advanced-configuration.adoc')">Advanced Config</router-link> for more information.</p>
</div>
<p>The following examples will demonstrate the default precedence order.</p>


<h4 id="_default_configuration_resource">Default configuration resource</h4>
<div class="section">
<p>Change a configuration parameter in the default configuration resource file, <code>application.yaml</code>.
There are no environment variable or system property overrides defined.</p>

<markup
lang="bash"
title="Change <code>app.greeting</code> in <code>resources/application.yaml</code> as follows:"
>app:
  greeting: HelloFrom-application.yaml</markup>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-se.jar</markup>

<markup
lang="bash"
title="Run the curl command in a new terminal window and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-application.yaml World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The new <code>app.greeting</code> value in <code>application.yaml</code> is used.</li>
</ul>

<h5 id="_system_property_override">System property override</h5>
<div class="section">
<p>A system property has a higher precedence than <code>application.yaml</code>.</p>

<markup
lang="bash"
title="Restart the application with a system property.  The <code>app.greeting</code> environment variable is still set:"
>java -Dapp.greeting="HelloFromSystemProperty"  -jar target/helidon-quickstart-se.jar</markup>

<markup
lang="bash"
title="Invoke the endpoint below and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromSystemProperty World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The system property took precedence over <code>application.yaml</code>.</li>
</ul>
</div>

<h5 id="_environment_variable_override">Environment variable override</h5>
<div class="section">
<p>An environment variable has a higher precedence than the system property.</p>

<markup
lang="bash"
title="Set the environment variable and restart the application:"
>export APP_GREETING=HelloFromEnvironment
java -Dapp.greeting="HelloFromSystemProperty"  -jar target/helidon-quickstart-se.jar</markup>

<markup
lang="bash"
title="Invoke the endpoint below and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromEnvironment World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The environment variable <code>APP_GREETING</code> took precedence over the system property and the value in <code>application.yaml</code>.</li>
</ul>
</div>
</div>
</div>
</div>

<h2 id="_custom_configuration_sources">Custom configuration sources</h2>
<div class="section">
<p>To use custom configuration sources, your application needs to specify the sources when it creates <code>Config</code> object. By doing this,
you are in full control of all configuration sources and precedence. By default, the environment variable and system property
sources are enabled, but you can disable them using the <code>disableEnvironmentVariablesSource</code> and <code>disableSystemPropertiesSource</code>
methods.</p>

<p>This section will show you how to use a custom configuration with various sources, formats, and precedence rules.</p>


<h3 id="_full_list_of_configuration_sources">Full list of configuration sources</h3>
<div class="section">
<p>Here is the full list of external config sources that you can use programmatically.</p>

<ol style="margin-left: 15px;">
<li>
Environment variables - the property is a name/value pair.

</li>
<li>
Java system properties - the property is a name/value pair.

</li>
<li>
Resources in the classpath - the contents of the resource is parsed according to its inferred format.

</li>
<li>
File - the contents of the file is parsed according to its inferred format.

</li>
<li>
Directory - each non-directory file in the directory becomes a config entry: the file name is the key.
and the contents of that file are used as the corresponding config String value.

</li>
<li>
A URL resource - contents is parsed according to its inferred format.

</li>
</ol>
<p>You can also define custom sources, such as Git, and use them in your Helidon application.
See <router-link to="#config/06_advanced-configuration.adoc" @click.native="this.scrollFix('#config/06_advanced-configuration.adoc')">Advanced Config</router-link> for more information.</p>

</div>

<h3 id="_classpath_sources">Classpath sources</h3>
<div class="section">
<p>The first custom resource example demonstrates how to add a second internal configuration resource that is discovered in the <code>classpath</code>.
The code needs to build a <code>Config</code> object, which in turn is used to build the <code>Server</code> object.  The <code>Config</code> object can be built
using a <code>Config.Builder</code>, which lets you inject any number of sources into the builder.  Furthermore, you can set precedence for the sources.
The first source has highest precedence, then the next has second highest, and so forth.</p>

<markup
lang="text"
title="Add a resource file, named <code>config.properties</code> to the <code>resources</code> directory with the following contents:"
>app.greeting=HelloFrom-config.properties</markup>

<markup
lang="java"
title="Update the <code>Main</code> class; 1) Add new imports, 2) Replace the <code>Config.create()</code> call with <code>buildConfig()</code>, and 3) Add <code>buildConfig</code> method:"
>import static io.helidon.config.ConfigSources.classpath; <span class="conum" data-value="1" />
...

    static WebServer startServer() throws IOException {
...
        Config config =  buildConfig(); <span class="conum" data-value="2" />


  private static Config buildConfig() {
    return Config.builder()
        .disableEnvironmentVariablesSource() <span class="conum" data-value="3" />
        .sources(
            classpath("config.properties"), <span class="conum" data-value="4" />
            classpath("application.yaml")) <span class="conum" data-value="5" />
        .build();
  }</markup>

<ul class="colist">
<li data-value="1">Add new import statement.</li>
<li data-value="2">Call the new <code>buildConfig</code> method to build a <code>Config</code> object.</li>
<li data-value="3">Disable the environment variables as a source.</li>
<li data-value="4">Specify the new config.properties resource that is in the <code>classpath</code>.</li>
<li data-value="5">You must specify the existing <code>application.yaml</code> or Helidon will not use it as a configuration source
even though it is considered a default source.</li>
</ul>
<markup
lang="bash"
title="Build and run the application (without the system property).  Invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-config.properties World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The greeting was picked up from <code>config.properties</code>, overriding the value in <code>application.yaml</code>.</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">It is important to remember that configuration from all sources is merged internally.  If you have the same
configuration property in multiple sources, then only the one with highest precedence will be used at runtime.
This is true even the same property comes from sources with different formats.</p>
</div>
<p>Swap the source order and run the test again.</p>

<markup
lang="java"
title="Update the <code>Main</code> class and replace the <code>buildConfig</code> method:"
>  private static Config buildConfig() {
      return Config.builder()
          .disableEnvironmentVariablesSource()
          .sources(
              classpath("application.yaml"), <span class="conum" data-value="1" />
              classpath("config.properties"))
          .build();
  }</markup>

<ul class="colist">
<li data-value="1">Swap the source order, putting <code>application.yaml</code> first.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-application.yaml World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The file <code>application.yaml</code> was used to get the greeting since it now has precedence over <code>config.properties</code>.</li>
</ul>
</div>

<h3 id="_external_file_sources">External file sources</h3>
<div class="section">
<p>You can move all or part of your configuration to external files, making them optional or mandatory.  The obvious advantage to this
approach is that you do not need to rebuild your application to change configuration.  In the following
example, the <code>app.greeting</code> configuration property will be added to <code>config-file.properties</code>.</p>

<markup
lang="bash"
title="Unset the environment variable so that <code>disableEnvironmentVariablesSource</code> doesn&#8217;t need to be called:"
>unset APP_GREETING</markup>

<markup
lang="bash"
title="Create a file named <code>config-file.properties</code> in the <code>helidon-quickstart-se</code> directory with the following contents:"
>app.greeting=HelloFrom-config-file.properties</markup>

<markup
lang="java"
title="Update the <code>Main</code> class; 1) Add new import and 2) Replace the <code>buildConfig</code> method:"
>import static io.helidon.config.ConfigSources.file;
...

  private static Config buildConfig() {
      return Config.builder()
          .sources(
              file("config-file.properties"), <span class="conum" data-value="1" />
              classpath("application.yaml"))
          .build();
  }</markup>

<ul class="colist">
<li data-value="1">Add a mandatory configuration file.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-config-file.properties World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The configuration property from the file <code>config-file.properties</code> takes precedence.</li>
</ul>
<div class="admonition note">
<p class="admonition-inline">If you want the configuration file to be optional, you must use the <code>optional</code> method with <code>sources</code>,
otherwise Helidon will generate an error during startup as shown below.  This is true for both <code>file</code> and
<code>classpath</code> sources.  By default, these sources are mandatory.</p>
</div>
<markup
lang="java"
title="Update the <code>Main</code> class and replace the <code>buildConfig</code> method:"
>  private static Config buildConfig() {
      return Config.builder()
          .sources(
              file("missing-file"), <span class="conum" data-value="1" />
              classpath("application.yaml"))
          .build();
  }</markup>

<ul class="colist">
<li data-value="1">Specify a file that doesn&#8217;t exist.</li>
</ul>
<markup
lang="bash"
title="Build then start the application and you will see the following output:"
>Exception in thread "main" io.helidon.config.ConfigException: Cannot load data from mandatory source FileConfig[missing-file]. File `missing-file` not found.</markup>

<p>To fix this, use the <code>optional</code> method as shown below, then rerun the test.</p>

<div class="listing">
<pre>...
    file("missing-file").optional(), <span class="conum" data-value="1" /></pre>
</div>

<ul class="colist">
<li data-value="1">The <code>missing-file</code> configuration file is now optional.</li>
</ul>
</div>

<h3 id="_directory_source">Directory source</h3>
<div class="section">
<p>A directory source treats every file in the directory as a key, and the file contents as the value.  The
following example includes a directory source as highest precedence.</p>

<markup
lang="bash"
title="Create a new directory <code>helidon-quickstart-se/conf</code> then create a file named <code>app.greeting</code> in that directory with the following contents:"
>HelloFromFileInDirectoryConf</markup>

<markup
lang="java"
title="Update the <code>Main</code> class; 1) Add new import and 2) Replace the <code>buildConfig</code> method:"
>import static io.helidon.config.ConfigSources.directory;
...

  private static Config buildConfig() {
      return Config.builder()
          .sources(
              directory("conf"), <span class="conum" data-value="1" />
              classpath("config.properties").optional(),
              classpath("application.yaml"))
          .build();
  }</markup>

<ul class="colist">
<li data-value="1">Add a mandatory configuration directory.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromFileInDirectoryConf World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The greeting was fetched from the file named <code>app.greeting</code>.</li>
</ul>

<h4 id="_exceeding_three_sources">Exceeding three sources</h4>
<div class="section">
<p>If you have more than three sources, you can use the <code>addSource</code> method as shown below.</p>

<markup
lang="java"
title="Update the <code>Main</code> class and replace the <code>buildConfig</code> method:"
>  private static Config buildConfig() {

    return Config.builder()
                .addSource(directory("conf"))  <span class="conum" data-value="1" />
                .addSource(file("config-file.properties"))
                .addSource(classpath("config.properties").optional())
                .addSource(classpath("application.yaml"))
                .build();
  }</markup>

<ul class="colist">
<li data-value="1">Add each config source using the <code>addSource</code> method.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...

{
  "message": "HelloFromFileInDirectoryConf World!"
}</markup>

</div>
</div>

<h3 id="_meta_configuration">Meta-configuration</h3>
<div class="section">
<p>Instead of directly specifying the configuration sources in your code, you can use meta-configuration in a file that declares
the configuration sources and their attributes. This requires using the <code>Config.loadSourcesFrom</code> method rather than a <code>Config.Buider</code>
object. The contents of the meta-configuration file needs to be in JSON, YAML, or HOCON format. YAML is used in the following example.</p>

<markup
lang="bash"
title="Create a file named <code>meta-config.yaml</code> in the <code>helidon-quickstart-se</code> directory with the following contents:"
>sources:
  - type: "classpath" <span class="conum" data-value="1" />
    properties:
      resource: "application.yaml" <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">The source type.</li>
<li data-value="2">The name of the mandatory configuration resource.</li>
</ul>
<markup
lang="java"
title="Update the <code>Main</code> class and replace the <code>buildConfig</code> method:"
>  private static Config buildConfig() {
      return Config.create(); <span class="conum" data-value="1" />
  }</markup>

<ul class="colist">
<li data-value="1">Will use <code>meta-config.yaml</code> by default</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-application.yaml World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The <code>application.yaml</code> resource file was used to get the greeting.</li>
</ul>
<p>The source precedence order in a meta-configuration file is the order of appearance in the file.
This is demonstrated below where the <code>config-file.properties</code> has highest precedence.</p>

<markup
lang="bash"
title="Replace the contents of the <code>meta-config.yaml</code> file:"
>sources:
  - type: "file" <span class="conum" data-value="1" />
    properties:
      path: "./config-file.properties" <span class="conum" data-value="2" />
  - type: "classpath"
    properties:
      resource: "application.yaml"
  - type: "file"
    properties:
      path: "optional-config-file"
      optional: true  <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">The source type specifies a file.</li>
<li data-value="2">The name of the mandatory configuration file.</li>
<li data-value="3">Specify that the <code>optional-config-file</code> file is optional.</li>
</ul>
<markup
lang="bash"
title="Restart the application, then invoke the endpoint below and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-config-file.properties World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The <code>config-file.properties</code> source now takes precedence.</li>
</ul>
<p>When using a meta-config file, you need to explicitly include both environment variables and system properties as
a source if you want to use them.</p>

<markup
lang="bash"
title="Replace the contents of the <code>meta-config.yaml</code> file:"
>sources:
  - type: "environment-variables" <span class="conum" data-value="1" />
  - type: "system-properties" <span class="conum" data-value="2" />
  - type: "classpath"
    properties:
      resource: "application.yaml"
  - type: "file"
    properties:
      path: "./config-file.properties"</markup>

<ul class="colist">
<li data-value="1">Environment variables are now used as a source.</li>
<li data-value="2">System properties are now used as a source.</li>
</ul>
<p>You can re-run the previous tests that exercised environment variables and system properties.  Swap the two types to see
the precedence change.  Be sure to unset APP_GREETING after you finish testing.</p>

</div>
</div>

<h2 id="_accessing_config_within_an_application">Accessing Config within an application</h2>
<div class="section">
<p>You have used Helidon to customize configuration behavior from your code using the <code>Config</code> and
<code>Config.Builder</code> classes.  As discussed previously, Helidon reads configuration from a config source, which uses a config parser
to translate the source into an in-memory tree which represents the configuration’s structure and values.  Helidon offers a variety
of methods to access in-memory configuration.  These can be categorized as <em>key access</em> or <em>tree navigation</em>.
You have been using <em>key access</em> for all of the examples to this point.  For example <code>app.greeting</code> is accessing
the <code>greeting</code> child node of the <code>app</code> parent node.  There are many options for access this data using navigation
methods as described in <router-link to="#config/03_hierarchical-features.adoc" @click.native="this.scrollFix('#config/03_hierarchical-features.adoc')">Hierarchical Config</router-link> and <router-link to="#config/06_advanced-configuration.adoc" @click.native="this.scrollFix('#config/06_advanced-configuration.adoc')">Advanced Config</router-link>.</p>


<h3 id="_accessing_config_using_keys_or_navigation">Accessing config using keys or navigation</h3>
<div class="section">
<p>The simplest way to access configuration data is using a key, as shown below in the <code>GreetService</code> class.  The
key can be composite as shown below:</p>

<markup
lang="java"
title="View the <code>GreetService</code> constructor:"
>    GreetService(Config config) {
        greeting.set(config.get("app.greeting").asString().orElse("Ciao")); <span class="conum" data-value="1" />
    }</markup>

<ul class="colist">
<li data-value="1">Get the <code>app.greeting</code> node using a composite key.</li>
</ul>
<p>You can also access the same greeting by navigating the nodes.</p>

<markup
lang="java"
title="Replace the <code>GreetService</code> constructor with the following code:"
>    GreetService(Config config) {
        greeting.set(config.get("app").get("greeting").asString().orElse("Ciao")); <span class="conum" data-value="1" />
    }</markup>

<ul class="colist">
<li data-value="1">Get the <code>app</code> node, then get the child node, <code>greeting</code>.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-application.yaml World!"
}</markup>

</div>

<h3 id="_using_filters_and_collections">Using filters and collections</h3>
<div class="section">
<p>The Helidon <code>Config</code> class provides several methods that allow you to filter and customize the traversal of the
configuration tree.  The example below shows how to get the <code>greeting</code> node when you only know it is somewhere in
the <code>app</code> subtree.</p>

<markup
lang="bash"
title="Replace the contents of the <code>meta-config.yaml</code> file:"
>sources:
  - type: "classpath"
    properties:
      resource: "application.yaml"</markup>

<markup
lang="bash"
title="Replace the app section of the <code>application.yaml</code> resource file:"
>app:
  child1: child1-node
  child2:
     child2a:
        greeting: HelloFrom-application.yaml under child2a
  child3: child3-node</markup>

<markup
lang="java"
title="Update the <code>GreetService.java</code> file; 1) Add new imports and 2) Replace the <code>GreetService</code> constructor with the following:"
><span class="conum" data-value="1" />
import java.util.List;
import java.util.stream.Collectors;

    GreetService(Config config) {
        List&lt;Config&gt; appGreetings =  config.get("app")
            .traverse()  <span class="conum" data-value="2" />
            .filter(node -&gt; node.name().equals("greeting")) <span class="conum" data-value="3" />
            .collect(Collectors.toList()); <span class="conum" data-value="4" />

        greeting.set(appGreetings.get(0).asString().get());
    }</markup>

<ul class="colist">
<li data-value="1">Add new imports.</li>
<li data-value="2">Traverse the entire subtree of the <code>app</code> node.</li>
<li data-value="3">Include only nodes that have the name <code>greeting</code>.</li>
<li data-value="4">Add the <code>greeting</code> node to the collection.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFrom-application.yaml under child2a World!"
}</markup>

</div>

<h3 id="_reacting_to_configuration_updates">Reacting to configuration updates</h3>
<div class="section">
<p>Even though in-memory config trees are immutable, the config system internally records configuration source metadata that
allows it to watch sources for changes. Your application listens for updates to the underlying config sources and
reacts to the changes.
See <router-link to="#config/05_mutability-support.adoc" @click.native="this.scrollFix('#config/05_mutability-support.adoc')">Config Mutability Support</router-link> for a full discussion on this topic.
The following example demonstrates how to listen and react to configuration changes.</p>

<markup
lang="bash"
title="Replace the contents of the <code>meta-config.yaml</code> file:"
>sources:
  - type: "file"
    properties:
      path: "./config-file.properties"
      polling-strategy:
        type: "watch"
  - type: "classpath"
    properties:
      resource: "application.yaml"</markup>

<markup
lang="java"
title="Update the <code>GreetService</code> class; 1) Add new import and 2) Replace the <code>GreetService</code> constructor:"
>import java.util.function.Consumer;
...

    GreetService(Config config) {
        Config greetingConfig = config.get("app.greeting"); <span class="conum" data-value="1" />
        greeting.set(greetingConfig.asString().orElse("Ciao"));
        greetingConfig.onChange((Consumer&lt;Config&gt;) cfg -&gt; greeting.set(cfg.asString().orElse("Ciao"))); <span class="conum" data-value="2" />
    }</markup>

<ul class="colist">
<li data-value="1">Get the greeting <code>Config</code> node.</li>
<li data-value="2">Register a listener that will get called by Helidon when the configuration changes.  The listener will
update the greeting with the new value.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...

{
  "message": "HelloFrom-config-file.properties World!"
}</markup>

<markup
lang="bash"
title="Update <code>config-file.properties</code> with the following contents:"
>app.greeting=Updated HelloFrom-config-file.properties</markup>

<markup
lang="bash"
title="After a few seconds, check the response:"
>curl http://localhost:8080/greet
...

{
  "message": "Updated HelloFrom-config-file.properties World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The application reacted to the change and updated the greeting.</li>
</ul>
</div>
</div>

<h2 id="_integration_with_kubernetes">Integration with Kubernetes</h2>
<div class="section">
<p>The following example uses a Kubernetes ConfigMap to pass the configuration data to your Helidon application deployed to Kubernetes.
When the pod is created, Kubernetes will automatically create a local file within the container that has the contents of the
configuration file used for the ConfigMap.  This example will create the file at <code>/etc/config/config-file.properties</code>.</p>

<markup
lang="bash"
title="Replace the app section of the <code>application.yaml</code> resource file:"
>app:
  greeting: "Hello"</markup>

<markup
lang="java"
title="Update the <code>Main</code> class and replace the <code>buildConfig</code> method:"
>  private static Config buildConfig() {
      return Config.builder()
          .sources(
              file("/etc/config/config-file.properties").optional(), <span class="conum" data-value="1" />
              classpath("application.yaml")) <span class="conum" data-value="2" />
          .build();
  }</markup>

<ul class="colist">
<li data-value="1">The <code>app.greeting</code> value will be fetched from <code>/etc/config/config-file.properties</code> within the container.</li>
<li data-value="2">The server port is specified in <code>application.yaml</code> within the <code>helidon-quickstart-se.jar</code>.</li>
</ul>
<markup
lang="java"
title="Replace the <code>GreetService</code> constructor with the following code:"
>    GreetService(Config config) {
        greeting.set(config.get("app.greeting").asString().orElse("Ciao"));
    }</markup>

<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "Hello World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The greeting came from <code>application.yaml</code> since <code>/etc/config/config-file.properties</code> doesn&#8217;t exist.</li>
</ul>
<markup
lang="bash"
title="Stop the application and build the docker image:"
>docker build -t helidon-config-se .</markup>

<markup
lang="bash"
title="Generate a ConfigMap from <code>config-file.properties</code>:"
>kubectl create configmap helidon-configmap --from-file config-file.properties</markup>

<markup
lang="bash"
title="View the contents of the ConfigMap:"
>kubectl get configmap helidon-configmap -o yaml
...
apiVersion: v1
data:
  config-file.properties: |   <span class="conum" data-value="1" />
    app.greeting=Updated HelloFrom-config-file.properties   <span class="conum" data-value="2" />
kind: ConfigMap
...</markup>

<ul class="colist">
<li data-value="1">The file <code>config-file.properties</code> will be created within the Kubernetes container.</li>
<li data-value="2">The <code>config-file.properties</code> file will have this single property defined.</li>
</ul>
<markup
lang="yaml"
title="Create the Kubernetes YAML specification, named <code>k8s-config.yaml</code>, with the following contents:"
>kind: Service
apiVersion: v1
metadata:
  name: helidon-config <span class="conum" data-value="1" />
  labels:
    app: helidon-config
spec:
  type: NodePort
  selector:
    app: helidon-config
  ports:
    - port: 8080
      targetPort: 8080
      name: http
---
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: helidon-config
spec:
  replicas: 1 <span class="conum" data-value="2" />
  template:
    metadata:
      labels:
        app: helidon-config
        version: v1
    spec:
      containers:
        - name: helidon-config
          image: helidon-config-se
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config <span class="conum" data-value="3" />
      volumes:
        - name: config-volume
          configMap:
            # Provide the name of the ConfigMap containing the files you want
            # to add to the container
            name:  helidon-configmap <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>8080</code>.</li>
<li data-value="2">A deployment with one replica of a pod.</li>
<li data-value="3">Mount the ConfigMap as a volume at <code>/etc/config</code>.  This is where Kubernetes will create <code>config-file.properties</code>.</li>
<li data-value="4">Specify the ConfigMap which contains the configuration data.</li>
</ul>
<markup
lang="bash"
title="Create and deploy the application into Kubernetes:"
>kubectl apply -f ./k8s-config.yaml</markup>

<markup
lang="bash"
title="Get the service information:"
>kubectl get service/helidon-config</markup>

<markup
lang="bash"

>NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
helidon-config   NodePort   10.99.159.2   &lt;none&gt;        8080:31143/TCP   8s <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">A service of type <code>NodePort</code> that serves the default routes on port <code>31143</code>.</li>
</ul>
<markup
lang="bash"
title="Verify the configuration endpoint using port <code>31143</code>, your port will likely be different:"
>curl http://localhost:31143/greet
...
{
  "message": "Updated HelloFrom-config-file.properties World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The greeting value from <code>/etc/config/config-file.properties</code> within the container was used.</li>
</ul>
<p>You can now delete the Kubernetes resources that were just created during this example.</p>

<markup
lang="bash"
title="Delete the Kubernetes resources:"
>kubectl delete -f ./k8s-config.yaml
kubectl delete configmap  helidon-configmap</markup>

</div>

<h2 id="_summary">Summary</h2>
<div class="section">
<p>This guide has demonstrated how to use basic Helidon configuration features. The full configuration documentation, starting with the
introduction section at <router-link to="#config/01_introduction.adoc" @click.native="this.scrollFix('#config/01_introduction.adoc')">Helidon Config</router-link> has much more information including
the following:</p>

<ul class="ulist">
<li>
<p>Architecture</p>

</li>
<li>
<p>Parsers</p>

</li>
<li>
<p>Extensions</p>

</li>
<li>
<p>Filters</p>

</li>
<li>
<p>Hierarchical Access</p>

</li>
<li>
<p>Property Mapping</p>

</li>
<li>
<p>Mutability Support</p>

</li>
<li>
<p>and more&#8230;&#8203;</p>

</li>
</ul>
<p>Refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</doc-view>