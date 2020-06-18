<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebClient Introduction</dt>
<dd slot="desc"><p>WebClient is an HTTP client for Helidon SE 2.0. It handles the responses to the HTTP requests in a reactive way.</p>

<p>Helidon WebClient provides the following features:</p>

<ul class="ulist">
<li>
<p><strong>Reactive approach</strong><br>
Allows you to execute HTTP requests and handle the responses without having to wait for the server response. When the response is received, the client requests only the amount of data that it can handle at that time. So, there is no overflow of memory.</p>

</li>
<li>
<p><strong>Builder-like setup and execution</strong><br>
Creates every client and request as a builder pattern. This improves readability and code maintenance.</p>

</li>
<li>
<p><strong>Redirect chain</strong><br>
Follows the redirect chain and perform requests on the correct endpoint by itself.</p>

</li>
<li>
<p><strong>Tracing, metrics and security propagation</strong><br>
Automatically propagates the configured tracing, metrics and security settings of the Helidon WebServer to the WebClient and uses them during request and response.</p>

</li>
</ul></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_the_webclient">Configuring the WebClient</h2>
<div class="section">
<p>The WebClient default configuration may be suitable in most use cases. However, you can configure it to suit your specific requirements.</p>


<h3 id="_example_of_a_webclient_configuration">Example of a WebClient Configuration</h3>
<div class="section">
<markup
lang="java"

>Config config = Config.create();
WebClient client = WebClient.builder()
        .baseUri("http://localhost")
        .config(config.get("client"))
        .build();</markup>

</div>

<h3 id="_example_of_yaml_webclient_configuration">Example of Yaml WebClient Configuration</h3>
<div class="section">
<markup
lang="java"

>client:
  connect-timeout-millis: 2000
  read-timeout-millis: 2000
  follow-redirects: true <span class="conum" data-value="1" />
  max-redirects: 5
  cookies:
    automatic-store-enabled: true
    default-cookies:
      - name: "env"
        value: "dev"
  headers:
    - name: "Accept"
      value: ["application/json","text/plain"] <span class="conum" data-value="2" />
  services:
    config:
      metrics:
        - methods: ["PUT", "POST", "DELETE"]
        - type: METER
          name-format: "client.meter.overall"
        - type: TIMER
          # meter per method
          name-format: "client.meter.%1$s"
        - methods: ["GET"]
          type: COUNTER
          errors: false
          name-format: "client.counter.%1$s.success"
          description: "Counter of successful GET requests"
        - methods: ["PUT", "POST", "DELETE"]
          type: COUNTER
          success: false
          name-format: "wc.counter.%1$s.error"
          description: "Counter of failed PUT, POST and DELETE requests"
        - methods: ["GET"]
          type: GAUGE_IN_PROGRESS
          name-format: "client.inprogress.%2$s"
          description: "In progress requests to host"
      tracing:
  proxy:
    use-system-selector: false
    host: "hostName"
    port: 80
    no-proxy: ["localhost:8080", ".helidon.io", "192.168.1.1"] <span class="conum" data-value="3" />
  tls:
    server:
      disable-hostname-verification: false
      trust-all: false
      truststore:
        keystore-resource-path: "path to the keystore"
        keystore-type: "JKS"
        keystore-passphrase: "password"
        trust-store: true <span class="conum" data-value="4" />
    client:
      keystore:
        keystore-resource-path: "path to client keystore"
        keystore-passphrase: "password"
        trust-store: true <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">Client functional settings</li>
<li data-value="2">Default client headers and cookies</li>
<li data-value="3">Proxy configuration</li>
<li data-value="4">SSL configuration</li>
<li data-value="5">Client service configuration</li>
</ul>
</div>
</div>

<h2 id="_creating_the_webclient">Creating the WebClient</h2>
<div class="section">
<p>You can create WebClient by executing <code>WebClient.create()</code> method. This will create an instance of client with default settings and without a base uri set.</p>

<p>To change the default settings and register
additional services, you can use simple builder that allows you to customize the client behavior.</p>


<h3 id="_example">Example</h3>
<div class="section">
<markup
lang="java"
title="Create a WebClient with simple builder:"
>WebClient client = WebClient.builder()
        .baseUri("http://localhost")
        .build();</markup>

</div>
</div>

<h2 id="_creating_and_executing_the_webclient_request">Creating and Executing the WebClient Request</h2>
<div class="section">
<p>WebClient executes requests to the target endpoints and returns specific response type.</p>

<p>It offers the following methods to specify the type of request you want to execute:</p>

<ul class="ulist">
<li>
<p><code>put()</code></p>

</li>
<li>
<p><code>get()</code></p>

</li>
<li>
<p><code>method(String methodName)</code></p>

</li>
</ul>
<p>These methods set specific request type based on their name or parameter to the new instance of <code>WebClientRequesBuilder</code> and return this instance based on configurations for specific request type.</p>

<p>You can set configuration for every request type before it is sent as described in <router-link to="#_request_configuration" @click.native="this.scrollFix('#_request_configuration')"></router-link>.</p>

<p>For the final execution, use the following methods with variations and different parameters:</p>

<ul class="ulist">
<li>
<p><code>CompletionStage&lt;T&gt; submit(Object entity, Class&lt;T&gt; responseType)</code></p>

</li>
<li>
<p><code>CompletionStage&lt;T&gt; request(Class&lt;T&gt; responseType)</code></p>

</li>
</ul>

<h3 id="_example_2">Example</h3>
<div class="section">
<markup
lang="java"
title="Execute a simple GET request to endpoint:"
>CompletionStage&lt;String&gt; response = client.get()
        .path("/endpoint")
        .request(String.class);</markup>

</div>

<h3 id="_request_configuration">Request Configuration</h3>
<div class="section">
<p>The request settings are based on the following optional parameters, and change when a specific request is executed.</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><code>uri("http://example.com")</code></td>
<td class="">Overrides baseUri from WebClient</td>
</tr>
<tr>
<td class=""><code>path("/path")</code></td>
<td class="">Adds path to the uri</td>
</tr>
<tr>
<td class=""><code>queryParam("query", "parameter")</code></td>
<td class="">Adds query parameter to the request</td>
</tr>
<tr>
<td class=""><code>fragment("someFragment")</code></td>
<td class="">Adds fragment to the request</td>
</tr>
<tr>
<td class=""><code>headers(headers &#8594; headers.addAccept(MediaType.APPLICATION_JSON))</code></td>
<td class="">Adds header to the request</td>
</tr>
</tbody>
</table>
</div>
<p><code>WebClientRequestBuilder</code> class also provides specific header methods that help the user to set a particular header. The methods are:</p>

<ul class="ulist">
<li>
<p><code>contentType</code> (MediaType contentType)</p>

</li>
<li>
<p><code>accept</code> (MediaType&#8230;&#8203; mediaTypes)</p>

</li>
</ul>
<p>For more details, see the <a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/webserver/RequestHeaders.html">Request Headers</a> API.</p>

</div>
</div>

<h2 id="_adding_json_processing_media_support_to_the_webclient">Adding JSON Processing Media Support to the WebClient</h2>
<div class="section">
<p>JSON Processing (JSON-P) media support is not present in the WebClient by default. So, in this case, you must first register it before making a request.
This example shows how to register <code>JsonpSupport</code> using the following two methods.</p>


<h3 id="_example_3">Example</h3>
<div class="section">
<markup
lang="java"
title="Register JSON-P support to the WebClient."
>WebClient.builder()
        .baseUri("http://localhost")
        .addReader(JsonpSupport.reader()) <span class="conum" data-value="1" />
        .addWriter(JsonpSupport.writer()) <span class="conum" data-value="2" />
        .addMediaService(JsonpSupport.create()) <span class="conum" data-value="3" />
        .build();</markup>

<ul class="colist">
<li data-value="1">Adds JSON-P reader to all client requests.</li>
<li data-value="2">Adds JSON-P writer to all client requests.</li>
<li data-value="3">Adds JSON-P writer and reader to all client requests.</li>
</ul>
<markup
lang="java"
title="Register JSON-P support only to the specific request."
>WebClient webClient = WebClient.create();

WebClientRequestBuilder requestBuilder = webClient.get();
requestBuilder.writerContext().registerWriter(JsonSupport.writer()); <span class="conum" data-value="1" />
requestBuilder.readerContext().registerReader(JsonSupport.reader()); <span class="conum" data-value="2" />

requestBuilder.request(JsonObject.class)</markup>

<ul class="colist">
<li data-value="1">Adds JSON-P writer only to this request.</li>
<li data-value="2">Adds JSON-P reader only to this request.</li>
</ul>
</div>
</div>

<h2 id="_maven_coordinates">Maven Coordinates</h2>
<div class="section">
<p>The <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link> page describes how you should declare dependency management for Helidon applications. You must declare the following dependency in your project&#8217;s pom.xml:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webclient&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webclient&lt;/artifactId&gt;
    <span class="conum" data-value="1" />
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">Dependency on WebClient.</li>
</ul>
</div>
</doc-view>