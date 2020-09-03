<doc-view>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>Applications implement health checks to expose health status that is collected
 at regular intervals by external tooling, such as orchestrators like
 Kubernetes. The orchestrator may then take action, such as restarting your
 application if the health check fails.</p>

<p>A typical health check combines the statuses of all the dependencies that
 affect availability and the ability to perform correctly:</p>

<ul class="ulist">
<li>
<p>network latency</p>

</li>
<li>
<p>storage</p>

</li>
<li>
<p>database</p>

</li>
<li>
<p>other services used by your application</p>

</li>
</ul>
</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Create a sample MicroProfile (MP) project
that can be used to run some basic examples using both built-in and custom health-checks with Helidon MP.  <router-link to="/mp/guides/04_health">Helidon MP Health Check Guide</router-link>.</p>

</div>
</doc-view>