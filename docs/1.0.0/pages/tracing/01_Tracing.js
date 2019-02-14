<doc-view>

<h2 id="_tracing_support">Tracing Support</h2>
<div class="section">
<p>Helidon includes support for tracing through the <code><a id="" title="" target="_blank" href="https://opentracing.io/">OpenTracing</a></code> APIs.
Tracing is integrated with WebServer and Security.</p>

<p>Support for specific tracers is abstracted. Your application can depend on
the abstraction layer and provide a specific tracer implementation as a Java
<code>ServiceLoader</code> service.</p>


<h3 id="_maven_coordinates">Maven Coordinates</h3>
<div class="section">
<p>Declare the following dependency in your project to use the tracer abstraction:</p>

<markup
lang="xml"
title="Tracer Abstraction"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.tracing&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-tracing&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 id="_configuring_tracing">Configuring Tracing</h3>
<div class="section">
<p>To configure tracer with WebServer:</p>

<markup
lang="java"
title="Configuring OpenTracing <code>Tracer</code>"
>ServerConfiguration.builder()
                   .tracer(TracerBuilder.create("my-application")                    <span class="conum" data-value="1" />
                                 .collectorUri(URI.create("http://10.0.0.18:9411"))  <span class="conum" data-value="2" />
                                 .build())
                   .build()</markup>

<ul class="colist">
<li data-value="1">The name of the application (service) to associate with the tracing events</li>
<li data-value="2">The endpoint for tracing events, specific to the tracer used, usually loaded from Config</li>
</ul>
</div>
</div>
</doc-view>