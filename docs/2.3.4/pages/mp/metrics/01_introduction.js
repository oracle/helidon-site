<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable MicroProfile Metrics
either add a dependency on the <router-link to="/mp/introduction/02_microprofile">helidon-microprofile bundle</router-link> or
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.microprofile.metrics&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile-metrics&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

</div>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>Helidon provides three types of metrics: base, vendor, and application.  Helidon automatically provides built-in base and vendor metrics.
Applications can use these metrics without additional configuration or code changes.</p>

</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Learn more about <a id="" title="" target="_blank" href="https://github.com/eclipse/microprofile-metrics/releases/tag/2.0">MicroProfile Metrics specification</a>.</p>

<p>Create a sample MicroProfile (MP) project that can be used to run some basic examples using both built-in and custom metrics with Helidon MP. <router-link to="/mp/guides/05_metrics">Helidon MP Metrics Guide</router-link>.</p>

</div>
</doc-view>