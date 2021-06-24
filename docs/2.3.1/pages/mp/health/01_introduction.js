<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable MicroProfile Health
either add a dependency on the <router-link to="/mp/introduction/02_microprofile">helidon-microprofile bundle</router-link> or
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.microprofile.health&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-microprofile-health&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

<p>To enable built-in health checks add the following dependency
(or use the <router-link to="/mp/introduction/02_microprofile">helidon-microprofile bundle</router-link> )</p>

<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.health&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-health-checks&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

</div>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>Microservices expose their health status primarily so external tools (for example, an orchestrator such as Kubernetes)
can monitor each service and take action, such as restarting a service instance if it has failed
or temporarily shunting traffic away from the instance if the service is unable to process
incoming requests normally.</p>

</div>

<h2 id="_about_the_microprofile_health_specification">About the MicroProfile Health Specification</h2>
<div class="section">
<p>Helidon MP implements the MicroProfile Health
<a id="" title="" target="_blank" href="http://download.eclipse.org/microprofile/microprofile-health-{version.lib.microprofile-health}/microprofile-health-spec.html">spec</a>.
The spec prescribes how external tools probe a service&#8217;s health checks and how you
implement health checks as part of your microservice that are specific to your service&#8217;s needs.</p>

</div>

<h2 id="_concepts">Concepts</h2>
<div class="section">

<h3 id="_liveness_and_readiness_checks">Liveness and Readiness Checks</h3>
<div class="section">
<p>MicroProfile Health supports two types of health checks:</p>

<p><em>Liveness</em> checks report whether the runtime environment in which the service is running
is sufficient to support the work the service performs.
The environment is beyond the control of
the service itself and typically cannot improve without outside intervention.
If a microservice instance reports a <code>DOWN</code>
liveness check, it should never report <code>UP</code> later.
It will need to be stopped and a replacement instance created.</p>

<p><em>Readiness</em> checks report whether the service is <em>currently</em> capable of performing its work.
A service that reports <code>DOWN</code> for its readiness cannot <em>at the moment</em> do its job, but at
some future point it might become able to do so without requiring a restart.</p>

<p>The following table describes more about these two types of health checks, including how an orchestrator
such as Kubernetes might react.</p>

</div>

<h3 id="_known_health_check_endpoints">Known Health Check Endpoints</h3>
<div class="section">
<p>A MicroProfile-compliant service reports its health via known REST endpoints. Helidon MP
provides these endpoints automatically as part of every MP microservice.</p>

<p>External management tools (or <code>curl</code> or browsers) retrieve liveness via <code>/health/live</code> and
readiness via <code>/health/ready</code>.</p>

<p>The following table summarizes the two types of health checks in MicroProfile Health.</p>

<div class="block-title"><span>Types of Health Checks</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
<col style="width: 25%;">
</colgroup>
<thead>
<tr>
<th>Type</th>
<th>Meaning</th>
<th>REST endpoint</th>
<th>Kubernetes response on failure</th>
</tr>
</thead>
<tbody>
<tr>
<td class="">liveness</td>
<td class="">whether the runtime environment is suitable</td>
<td class=""><code>/health/live</code></td>
<td class="">Restarts container.</td>
</tr>
<tr>
<td class="">readiness</td>
<td class="">whether the microservice is currently capable of doing its work</td>
<td class=""><code>/health/ready</code></td>
<td class="">Diverts requests away from the instance; periodically rechecks readiness and resumes traffic once the
microservice reports itself as ready.</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 id="_built_in_and_custom_health_checks">Built-in and Custom Health Checks</h3>
<div class="section">

<h4 id="_built_in_health_checks">Built-in Health Checks</h4>
<div class="section">
<p>Helidon provides built-in, default checks for each endpoint.
The built-in liveness checks include various environmental values, such as whether the JVM has detected deadlocks
or whether there is sufficient heap space. The built-in readiness check always reports <code>UP</code>.</p>

<p>You can see all the defaults by accessing any Helidon MP microservice&#8217;s <code>/health/live</code> endpoint
and viewing the response.</p>

</div>

<h4 id="_custom_health_checks">Custom Health Checks</h4>
<div class="section">
<p>Add your own liveness or readiness checks by adding a Java class for each check.
Each custom check must implement the <code>HealthCheck</code> interface, and you add either the <code>@Liveness</code> or
the <code>@Readiness</code> annotation to the class.</p>

</div>
</div>

<h3 id="_next_steps">Next Steps</h3>
<div class="section">
<p>Add custom health checks to your own microservices.</p>

<p>The
<router-link to="/mp/guides/04_health">Helidon MP Health Check Guide</router-link> shows how to create a
sample project and add custom liveness and readiness health checks.</p>

</div>
</div>
</doc-view>