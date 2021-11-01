<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP Config Guide</dt>
<dd slot="desc"><p>This guide describes how to create a sample MicroProfile (MP) project
that can be used to run some basic examples using both default and custom configuration with Helidon MP.</p>
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

<h2 id="_getting_started_with_configuration">Getting Started with Configuration</h2>
<div class="section">
<p>Helidon provides a very flexible and comprehensive configuration system, offering you many application configuration choices.
You can include configuration data from a variety of sources using different formats, like JSON and YAML.
Furthermore, you can customize the precedence of sources and make them optional or mandatory.
This guide introduces Helidon MP configuration and demonstrates the fundamental concepts using several examples.
Refer to <router-link to="/se/config/01_introduction">Helidon Config</router-link> for the full configuration concepts documentation.</p>


<h3 id="_create_a_sample_helidon_mp_project">Create a Sample Helidon MP Project</h3>
<div class="section">
<p>Use the Helidon MP Maven archetype to create a simple project that can be used for the examples in this guide.</p>

<markup
lang="bash"
title="Run the Maven archetype:"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.4.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<markup
lang="bash"
title="The project will be built and run from the <code>helidon-quickstart-mp</code> directory:"
>cd helidon-quickstart-mp</markup>

</div>

<h3 id="_default_configuration">Default Configuration</h3>
<div class="section">
<p>Helidon has an internal configuration, so you are not required to provide any configuration data for your application,
though in practice you most likely would.  By default, that configuration can be overridden from three sources:
system properties, environment variables, and  the contents of <code>META-INF/microprofile-config.properties</code>.
For example, if you specify a custom server port in <code>META-INF/microprofile-config.properties</code>
then your server will listen on that port.</p>

<p>A main class is also required to start up the server and run the
application. By default the Quickstart sample project uses the built-in
Helidon main class. In this guide you want to use your own main class so you have
more control over the server initialization. First define your own <code>Main</code>:</p>

<markup
lang="java"
title="src/main/java/io/helidon/examples/quickstart/mp/Main.java"
>package io.helidon.examples.quickstart.mp;

import io.helidon.microprofile.server.Server;
import java.io.IOException;

public final class Main {

    private Main() { } <span class="conum" data-value="1" />

    public static void main(final String[] args) throws IOException {
        Server server = startServer();
        System.out.println("http://localhost:" + server.port() + "/greet");
    }

    static Server startServer() {
        return Server.create().start(); <span class="conum" data-value="2" />
    }

}</markup>

<p>In this class, a <code>main</code> method is defined which starts the Helidon MP
server and prints out a message with the listen address.</p>

<ul class="colist">
<li data-value="1">Notice that
this class has an empty no-args constructor to make sure this class
cannot be instantiated.</li>
<li data-value="2">The MicroProfile server is started with the default configuration.</li>
</ul>
<p>Next change the project&#8217;s <code>pom.xml</code> to use your main class:</p>

<markup
lang="xml"
title="pom.xml"
>    &lt;properties&gt;
        &lt;mainClass&gt;io.helidon.examples.quickstart.mp.Main&lt;/mainClass&gt;
    &lt;/properties&gt;</markup>

<p>This property will be used to set the <code>Main-Class</code> attribute in the application jar&#8217;s MANIFEST.</p>

<p>In your application code, Helidon uses the default configuration when you create a <code>Server</code> object without a custom <code>Config</code> object.
See the following code from the project you created.</p>

<markup
lang="Java"
title="View <code>Main.startServer</code>:"
>    static Server startServer() {
        return Server.create().start(); <span class="conum" data-value="1" />
    }</markup>

<ul class="colist">
<li data-value="1">There is no <code>Config</code> object being used during server creation, so the default configuration is used.</li>
</ul>
</div>

<h3 id="_source_precedence_for_default_configuration">Source Precedence for Default Configuration</h3>
<div class="section">
<p>In order to properly configure your application using configuration sources, you need to understand
the precedence rules that Helidon uses to merge your configuration data.  By default,
Helidon will use the following sources in precedence order:</p>

<ol style="margin-left: 15px;">
<li>
Java system properties

</li>
<li>
Environment variables

</li>
<li>
Properties specified in <code>META-INF/microprofile-config.properties</code>

</li>
</ol>
<p>Each of these sources specify configuration properties in Java Property format (key/value), like <code>color=red</code>. If any of the Helidon
required properties are not specified in one of these source, like <code>server.port</code>, then Helidon will use a default value.</p>

<div class="admonition note">
<p class="admonition-inline">Because environment variable names are restricted to alphanumeric characters and underscores,
Helidon adds aliases to the environment configuration source, allowing entries with dotted and/or
hyphenated keys to be overriden.  For example, this mapping allows an environment variable named "APP_GREETING" to override
an entry key named "app.greeting".  In the same way, an environment variable named "APP_dash_GREETING" will map to
"app-greeting".  See <router-link to="/se/config/06_advanced-configuration">Advanced Configuration</router-link> for more information.</p>
</div>
<p>The following examples will demonstrate the default precedence order.</p>


<h4 id="_default_configuration_resource">Default Configuration Resource</h4>
<div class="section">
<p>Change a configuration parameter in the default configuration resource file, <code>META-INF/microprofile-config.properties</code>.
There are no environment variable or system property overrides defined.</p>

<markup
lang="bash"
title="Change <code>app.greeting</code> in the <code>META-INF/microprofile-config.properties</code> from <code>Hello</code> to <code>HelloFromMPConfig</code>:"
>app.greeting=HelloFromMPConfig</markup>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-mp.jar</markup>

<markup
lang="bash"
title="Run the curl command in a new terminal window and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromMPConfig World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The new <code>app.greeting</code> value in <code>META-INF/microprofile-config.properties</code> is used.</li>
</ul>

<h5 id="_environment_variable_override">Environment Variable Override</h5>
<div class="section">
<p>An environment variable has a higher precedence than the configuration properties file.</p>

<markup
lang="bash"
title="Set the environment variable and restart the application:"
>export APP_GREETING=HelloFromEnvironment
java -jar target/helidon-quickstart-mp.jar</markup>

<markup
lang="bash"
title="Invoke the endpoint below and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromEnvironment World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The environment variable took precedence over the value in <code>META-INF/microprofile-config.properties</code>.</li>
</ul>
</div>

<h5 id="_system_property_override">System Property Override</h5>
<div class="section">
<p>A system property has a higher precedence than environment variables.</p>

<markup
lang="bash"
title="Restart the application with a system property.  The <code>app.greeting</code> environment variable is still set:"
>java -Dapp.greeting="HelloFromSystemProperty"  -jar target/helidon-quickstart-mp.jar</markup>

<markup
lang="bash"
title="Invoke the endpoint below and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromSystemProperty World!" <span class="conum" data-value="1" />
}</markup>

<ul class="colist">
<li data-value="1">The system property took precedence over both the environment variable and <code>META-INF/microprofile-config.properties</code>.</li>
</ul>
</div>
</div>
</div>
</div>

<h2 id="_accessing_config_within_an_application">Accessing Config within an Application</h2>
<div class="section">
<p>You have used Helidon to customize configuration behavior from your code using the <code>Config</code> and
<code>Config.Builder</code> classes.  The examples in this section will demonstrate how to access that config data
at runtime.  As discussed previously, Helidon reads configuration from a config source, which uses a config parser
to translate the source into an immutable in-memory tree representing the configuration’s structure and values.
Your application uses the <code>Config</code> object to access the in-memory tree, retrieving config data.</p>

<p>The generated project already accesses configuration data in the <code>GreetingProvider</code> class  as  follows:</p>

<markup
lang="java"
title="View the following code from <code>GreetingProvider.java</code>:"
>@ApplicationScoped <span class="conum" data-value="1" />
public class GreetingProvider {
    private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;(); <span class="conum" data-value="2" />

    @Inject
    public GreetingProvider(@ConfigProperty(name = "app.greeting") String message) {   <span class="conum" data-value="3" />
        this.message.set(message);
    }

    String getMessage() {
        return message.get();
    }

    void setMessage(String message) {
        this.message.set(message);
    }
}</markup>

<ul class="colist">
<li data-value="1">This class is application scoped so a single instance of <code>GreetingProvider</code> will be shared across the entire application.</li>
<li data-value="2">Define a thread-safe reference that will refer to the message member variable.</li>
<li data-value="3">The value of the configuration property <code>app.greeting</code> is injected into the <code>GreetingProvider</code>.
constructor as a <code>String</code> parameter named <code>message</code>.</li>
</ul>

<h3 id="_injecting_at_field_level">Injecting at Field Level</h3>
<div class="section">
<p>You can inject configuration at the field level as shown below.  Use the <code>volatile</code> keyword
since you cannot use <code>AtomicReference</code> with field level injection.</p>

<markup
lang="yaml"
title="Update the  <code>meta-config.yaml</code> with the following contents:"
>sources:
  - type: "classpath"
    properties:
      resource: "META-INF/microprofile-config.properties"  <span class="conum" data-value="1" /></markup>

<ul class="colist">
<li data-value="1">This example only uses the default classpath source.</li>
</ul>
<markup
lang="java"
title="Update the following code from <code>GreetingProvider.java</code>:"
>@ApplicationScoped
public class GreetingProvider {

    @Inject
    @ConfigProperty(name = "app.greeting") <span class="conum" data-value="1" />
    private volatile String message; <span class="conum" data-value="2" />

    String getMessage() {
        return message;
    }

    void setMessage(String message) {
        this.message = message;
    }
}</markup>

<ul class="colist">
<li data-value="1">Inject the value of <code>app.greeting</code> into the <code>GreetingProvider</code> object.</li>
<li data-value="2">Define a class member variable to hold the greeting.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromMPConfig World!"
}</markup>

</div>

<h3 id="_injecting_the_config_object">Injecting the Config Object</h3>
<div class="section">
<p>You can inject the <code>Config</code> object into the class and access it directly as shown below.</p>

<markup
lang="java"
title="Update the <code>GreetingProvider.java</code> file; 1) Add new imports and 2) Replace the <code>GreetingProvider</code> class:"
> <span class="conum" data-value="1" />
import io.helidon.config.Config;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
...

@ApplicationScoped
public class GreetingProvider {
    private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;();

    @Inject <span class="conum" data-value="2" />
    public GreetingProvider(Config config) {
        String message = config.get("app.greeting").asString().get(); <span class="conum" data-value="3" />
        this.message.set(message);
    }

    String getMessage() {
        return message.get();
    }

    void setMessage(String message) {
        this.message.set(message);
    }
}</markup>

<ul class="colist">
<li data-value="1">Add three new imports.</li>
<li data-value="2">Inject the <code>Config</code> object into the <code>GreetingProvider</code> object.</li>
<li data-value="3">Get the <code>app.greeting</code> value from the <code>Config</code> object and set the member variable.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromMPConfig World!"
}</markup>

</div>

<h3 id="_navigating_the_config_tree">Navigating the Config Tree</h3>
<div class="section">
<p>Helidon offers a variety of methods to access in-memory configuration.  These can be categorized as <em>key access</em> or <em>tree navigation</em>.
You have been using <em>key access</em> for all of the examples to this point.  For example <code>app.greeting</code> is accessing
the <code>greeting</code> child node of the <code>app</code> parent node.  There are many options for access this data using navigation
methods as described in <router-link to="/se/config/03_hierarchical-features">Hierarchical Configuration</router-link> and <router-link to="/se/config/06_advanced-configuration">Advanced Configuration</router-link>.
This simple example below demonstrates how to access a child node as a detached configuration sub-tree.</p>

<markup
lang="yaml"
title="Create a file <code>config-file.yaml</code> in the <code>helidon-quickstart-mp</code> directory and add the following contents:"
>app:
  greeting:
    sender: Joe
    message: Hello-from-config-file.yaml</markup>

<markup
lang="yaml"
title="Update the  <code>meta-config.yaml</code> with the following contents:"
>sources:
  - type: "classpath"
    properties:
      resource: "META-INF/microprofile-config.properties"
  - type: "file"
    properties:
      path: "./config-file.yaml"</markup>

<markup
lang="java"
title="Replace <code>GreetingProvider</code> class with the following code:"
>@ApplicationScoped
public class GreetingProvider {
    private final AtomicReference&lt;String&gt; message = new AtomicReference&lt;&gt;();
    private final AtomicReference&lt;String&gt; sender = new AtomicReference&lt;&gt;();

    @Inject
    Config config;

    public void onStartUp(@Observes @Initialized(ApplicationScoped.class) Object init) {
        Config appNode = config.get("app.greeting"); <span class="conum" data-value="1" />
        message.set(appNode.get("message").asString().get());  <span class="conum" data-value="2" />
        sender.set(appNode.get("sender").asString().get());   <span class="conum" data-value="3" />
    }

    String getMessage() {
        return sender.get() + " says " + message.get();
    }

    void setMessage(String message) {
        this.message.set(message);
    }
}</markup>

<ul class="colist">
<li data-value="1">Get the configuration subtree where the <code>app.greeting</code> node is the root.</li>
<li data-value="2">Get the value from the <code>message</code> <code>Config</code> node.</li>
<li data-value="3">Get the value from the <code>sender</code> <code>Config</code> node.</li>
</ul>
<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "Joe says Hello-from-config-file.yaml World!"
}</markup>

</div>
</div>

<h2 id="_integration_with_kubernetes">Integration with Kubernetes</h2>
<div class="section">
<p>The following example uses a Kubernetes ConfigMap to pass the configuration data to your Helidon application deployed to Kubernetes.
When the pod is created, Kubernetes will automatically create a local file within the container that has the contents of the
configuration file used for the ConfigMap.  This example will create the file at <code>/etc/config/config-file.properties</code>.</p>

<markup
lang="java"
title="Update the <code>Main</code> class and replace the <code>buildConfig</code> method:"
>  private static Config buildConfig() {
      return Config.builder()
          .sources(
              file("/etc/config/config-file.properties").optional(), <span class="conum" data-value="1" />
              classpath("META-INF/microprofile-config.properties")) <span class="conum" data-value="2" />
          .build();
  }</markup>

<ul class="colist">
<li data-value="1">The <code>app.greeting</code> value will be fetched from <code>/etc/config/config-file.properties</code> within the container.</li>
<li data-value="2">The server port is specified in <code>META-INF/microprofile-config.properties</code> within the <code>helidon-quickstart-mp.jar</code>.</li>
</ul>
<markup
lang="java"
title="Update the following code from <code>GreetingProvider.java</code>:"
>@ApplicationScoped
public class GreetingProvider {

    @Inject
    @ConfigProperty(name = "app.greeting") <span class="conum" data-value="1" />
    private volatile String message; <span class="conum" data-value="2" />

    String getMessage() {
        return message;
    }

    void setMessage(String message) {
        this.message = message;
    }
}</markup>

<markup
lang="bash"
title="Build and run the application, then invoke the endpoint and check the response:"
>curl http://localhost:8080/greet
...
{
  "message": "HelloFromConfigFile World!"
}</markup>

<markup
lang="bash"
title="Stop the application and build the docker image:"
>docker build -t helidon-config-mp .</markup>

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
    app.greeting=HelloFromConfigFile   <span class="conum" data-value="2" />
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
          image: helidon-config-mp
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
  "message": "HelloFromConfigFile World!" <span class="conum" data-value="1" />
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
<p>This guide has demonstrated how to use basic Helidon configuration features. For more information about using the advanced Helidon configuration features, including mutability support and extensions, see <router-link to="/se/config/01_introduction">Helidon Configuration</router-link>.</p>

<p>Refer to the following references for additional information:</p>

<ul class="ulist">
<li>
<p>MicroProfile Config specification at <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-config/releases/tag/1.3">https://github.com/eclipse/microprofile-config/releases/tag/1.3</a></p>

</li>
<li>
<p>MicroProfile Config Javadoc at <a id="" title="" target="_blank" href="https://javadoc.io/doc/org.eclipse.microprofile.config/microprofile-config-api/1.3">https://javadoc.io/doc/org.eclipse.microprofile.config/microprofile-config-api/1.3</a></p>

</li>
<li>
<p>Helidon Javadoc at <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html">https://helidon.io/docs/latest/apidocs/index.html?overview-summary.html</a></p>

</li>
</ul>
</div>
</doc-view>