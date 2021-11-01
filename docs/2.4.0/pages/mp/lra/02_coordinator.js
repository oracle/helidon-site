<doc-view>

<h2 id="_coordinator">Coordinator</h2>
<div class="section">
<p>Coordinator is a service that tracks all LRA transactions and calls the compensate REST endpoints of
the participants when the LRA transaction gets cancelled or completes (in case it gets closed).
In addition, participant also keeps track of timeouts, retries participant calls, and assigns LRA ids.</p>

<ul class="ulist">
<li>
<p>Helidon LRA coordinator</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://narayana.io/lra">Narayana coordinator</a>.</p>

</li>
</ul>

<h3 id="_helidon_lra_coordinator">Helidon LRA coordinator</h3>
<div class="section">
<div class="admonition caution">
<p class="admonition-inline">Experimental tool, usage in production is not advised.</p>
</div>
<markup
lang="bash"
title="Build and run Helidon LRA coordinator"
>docker build -t helidon/lra-coordinator https://github.com/oracle/helidon.git#:lra/coordinator/server
docker run -dp 8070:8070 --name lra-coordinator --network="host" helidon/lra-coordinator</markup>

<p>Helidon LRA coordinator is compatible with Narayana clients, you need to add an additional dependency for Narayana client:</p>

<markup
lang="xml"
title="Dependency needed for using Helidon LRA with Narayana compatible coordinator"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.lra&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-lra-coordinator-narayana-client&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 id="_narayana">Narayana</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://narayana.io">Narayana</a> is a transaction manager supporting LRA.
To use Narayana LRA coordinator with Helidon LRA client you need to add an additional dependency for Narayana client:</p>

<markup
lang="xml"
title="Dependency needed for using Helidon LRA with Narayana coordinator"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.lra&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-lra-coordinator-narayana-client&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>The simplest way to run Narayana LRA coordinator locally:</p>

<markup
lang="bash"
title="Downloading and running Narayana LRA coordinator"
>wget https://search.maven.org/remotecontent?filepath=org/jboss/narayana/rts/lra-coordinator-quarkus/5.11.1.Final/lra-coordinator-quarkus-5.11.1.Final-runner.jar \
-O narayana-coordinator.jar \
&amp;&amp; java -Dquarkus.http.port=8070 -jar narayana-coordinator.jar</markup>

<p>Narayana LRA coordinator is running by default under <code>lra-coordinator</code> context,
with port <code>8070</code> defined in the snippet above you need to configure your Helidon LRA app as follows:
<code>mp.lra.coordinator.url=http://localhost:8070/lra-coordinator</code></p>

</div>
</div>
</doc-view>