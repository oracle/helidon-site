<doc-view>

<h2 >Tracing Support</h2>
<div class="section">
<p>The WebServer includes Zipkin support for OpenTracing. When enabled, the WebServer
 sends its tracing events to Zipkin.</p>


<h3 >Maven Coordinates</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"
title="WebServer Zipkin Support Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.webserver&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-webserver-zipkin&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 >Configuring Tracing Support</h3>
<div class="section">
<p>To enable Zipkin integration, configure <code>Tracer</code> on the
 <code>ServerConfiguration.Builder</code>.</p>

<markup
lang="java"
title="Configuring OpenTracing <code>Tracer</code>"
>ServerConfiguration.builder()
                   .tracer(new ZipkinTracerBuilder.forService("my-application") <span class="conum" data-value="1" />
                                 .zipkin("http://10.0.0.18:9411")  <span class="conum" data-value="2" />
                                 .build())
                   .build()</markup>

<ul class="colist">
<li data-value="1">The name of the application to associate with the tracing events</li>
<li data-value="2">Zipkin endpoint for the tracing events</li>
</ul>


<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/webserver/zipkin.png" alt="Zipkin example" />
</v-card-text>
</v-card>

</div>
</div>
</doc-view>