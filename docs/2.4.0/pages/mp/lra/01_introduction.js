<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Long Running Actions
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile.lra&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-lra-client&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;!-- Support for Narayana coordinator --&gt;
&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile.lra&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-lra-client-narayana-adapter&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_long_running_actions_lra">Long Running Actions (LRA)</h2>
<div class="section">
<p>Distributed transactions for microservices are known as SAGA design patterns and are defined by the <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/microprofile-lra-spec-1.0-RC3.html">Micro Profile Long Running Actions specification</a>.
Unlike well known XA protocol, LRA is asynchronous and therefore much more scalable. Every LRA JAX-RS resource (<router-link to="/mp/lra/03_participant">participant</router-link>) defines endpoints to be invoked when transaction needs to be <router-link :to="{path: '/mp/lra/03_participant', hash: '#complete-participant-method'}">completed</router-link> or <router-link :to="{path: '/mp/lra/03_participant', hash: '#compensate-participant-method'}">compensated</router-link>.</p>

<p>LRA transactions need to be coordinated over REST API by the LRA coordinator. <router-link to="/mp/lra/02_coordinator">Coordinator</router-link>
keeps track of all transactions and calls the @Compensate or @Complete endpoints for all participants involved in the particular
transaction. LRA transaction is first started, then joined by <router-link to="/mp/lra/03_participant">participant</router-link>.
Participant reports the successful finish of transaction by calling complete. Coordinator then calls the JAX-RS
<router-link :to="{path: '/mp/lra/03_participant', hash: '#complete-participant-method'}">complete</router-link> endpoint that was registered during the join of each
<router-link to="/mp/lra/03_participant">participant</router-link>. As the completed or compensated participants don&#8217;t have to be on same instance,
the whole architecture is highly scalable.</p>



<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/lra/lra-complete-lb.svg" alt="Complete" />
</v-card-text>
</v-card>

<p>In case of error during the LRA transaction, participant reports cancel of LRA to coordinator.
<router-link to="/mp/lra/02_coordinator">Coordinator</router-link> calls compensate on all the joined participants.</p>



<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/lra/lra-compensate-lb-error.svg" alt="Cancel" />
</v-card-text>
</v-card>

<p>When participant joins the LRA with timeout defined <code>@LRA(value = LRA.Type.REQUIRES_NEW, timeLimit = 5, timeUnit = ChronoUnit.MINUTES)</code>, coordinator compensate if timeout occurs before close is reported by participants.</p>



<v-card>
<v-card-text class="overflow-y-hidden" >
<img src="./images/lra/lra-compensate-lb-timeout.svg" alt="Timeout" />
</v-card-text>
</v-card>


<h3 id="_example">Example</h3>
<div class="section">
<p>The following example shows how a simple LRA participant starts and joins a transaction after calling the '/start-example' resource.
When startExample method finishes successfully, close is reported to <router-link to="/mp/lra/02_coordinator">coordinator</router-link>
and <code>/complete-example</code> endpoint is called by coordinator to confirm successful closure of the LRA.</p>

<p>If an exception occurs during startExample method execution, coordinator receives cancel call and <code>/compensate-example</code>
is called by coordinator to compensate for cancelled LRA transaction.</p>

<markup
lang="java"
title="Example of simple LRA participant"
>@PUT
@LRA(LRA.Type.REQUIRES_NEW) <span class="conum" data-value="1" />
@Path("start-example")
public Response startExample(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId, <span class="conum" data-value="2" />
                             String data) {
    if (data.contains("BOOM")) {
        throw new RuntimeException("BOOM 💥"); <span class="conum" data-value="3" />
    }

    LOGGER.info("Data " + data + " processed 🏭");
    return Response.ok().build(); <span class="conum" data-value="4" />
}

@PUT
@Complete <span class="conum" data-value="5" />
@Path("complete-example")
public Response completeExample(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId) {
    LOGGER.log(Level.INFO, "LRA id: {0} completed 🎉", lraId);
    return LRAResponse.completed();
}

@PUT
@Compensate <span class="conum" data-value="6" />
@Path("compensate-example")
public Response compensateExample(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId) {
    LOGGER.log(Level.SEVERE, "LRA id: {0} compensated 🦺", lraId);
    return LRAResponse.compensated();
}</markup>

<ul class="colist">
<li data-value="1">This JAX-RS PUT method will start new LRA transactions and join it before method body gets executed</li>
<li data-value="2">LRA id assigned by coordinator to this LRA transaction</li>
<li data-value="3">When method execution finishes exceptionally, cancel signal for this particular LRA is sent to coordinator</li>
<li data-value="4">When method execution finishes successfully, complete signal for this particular LRA is sent to coordinator</li>
<li data-value="5">Method which will be called by coordinator when LRA is completed</li>
<li data-value="6">Method which will be called by coordinator when LRA is canceled</li>
</ul>
</div>

<h3 id="_configuration">Configuration</h3>
<div class="section">
<markup
lang="yaml"
title="Example of lra configuration"
>mp.lra:
  coordinator.url: http://localhost:8070/lra-coordinator <span class="conum" data-value="1" />
  propagation.active: true <span class="conum" data-value="2" />
  participant.url: http://coordinator.visibe.host:80/awsomeapp <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Url of coordinator</li>
<li data-value="2">Propagate LRA headers LRA_HTTP_CONTEXT_HEADER and LRA_HTTP_PARENT_CONTEXT_HEADER through non-LRA endpoints</li>
<li data-value="3">Url of the LRA enabled service overrides standard base uri,
so coordinator can call load-balancer instead of the service</li>
</ul>
<p>For more information continue to <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/microprofile-lra-spec-1.0-RC3.html">Micro Profile Long Running Actions specification</a>.</p>

</div>
</div>
</doc-view>