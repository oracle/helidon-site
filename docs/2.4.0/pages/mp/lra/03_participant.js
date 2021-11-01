<doc-view>

<h2 id="_participant">Participant</h2>
<div class="section">
<p>The Participant, or Compensator, is an LRA resource with at least one of the JAX-RS(or non-JAX-RS) methods annotated with
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/Compensate.html">@Compensate</a> or <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/AfterLRA.html">@AfterLRA</a>.</p>


<h3 id="lra-method">@LRA</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html"><sub>javadoc</sub></a></p>

<p>Marks JAX-RS method which should run in LRA context and needs to be accompanied by at least minimal set of mandatory
participant methods(<router-link to="#compensate-participant-method" @click.native="this.scrollFix('#compensate-participant-method')">Compensate</router-link> or <router-link to="#after-participant-method" @click.native="this.scrollFix('#after-participant-method')">AfterLRA</router-link>).</p>

<p>LRA options:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#value--">value</a></p>
<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#REQUIRED">REQUIRED</a> join incoming LRA or create and join new</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#REQUIRES_NEW">REQUIRES_NEW</a> create and join new LRA</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#MANDATORY">MANDATORY</a> join incoming LRA or fail</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#SUPPORTS">SUPPORTS</a> join incoming LRA or continue outside LRA context</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#NOT_SUPPORTED">NOT_SUPPORTED</a> always continue outside LRA context</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#NEVER">NEVER</a> Fail with 412 if executed in LRA context</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.Type.html#NESTED">NESTED</a> create and join new LRA nested in the incoming LRA context</p>

</li>
</ul>
</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#timeLimit--">timeLimit</a> max time limit before LRA gets cancelled automatically by <router-link to="/mp/lra/02_coordinator">coordinator</router-link></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#timeUnit--">timeUnit</a> time unit if the timeLimit value</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#end--">end</a> when false LRA is not closed after successful method execution</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#cancelOn--">cancelOn</a> which HTTP response codes of the method causes LRA to cancel</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#cancelOnFamily--">cancelOnFamily</a> which family of HTTP response codes causes LRA to cancel</p>

</li>
</ul>
<p>Method parameters:</p>

<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a> - id of the LRA transaction</p>

</li>
</ul>
<markup
lang="java"

>@PUT
@LRA(LRA.Type.REQUIRES_NEW, timeLimit = 500, timeUnit = ChronoUnit.MILLIS)
@Path("start-example")
public Response startLra(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId, String data)</markup>

</div>

<h3 id="compensate-participant-method">@Compensate</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/Compensate.html"><sub>javadoc</sub></a></p>

<div class="admonition warning">
<p class="admonition-inline">Expected to be called by LRA <router-link to="/mp/lra/02_coordinator">coordinator</router-link> only!</p>
</div>
<p>Compensate method is called by <router-link to="/mp/lra/02_coordinator">coordinator</router-link> when <router-link to="/mp/lra/01_introduction">LRA</router-link> is cancelled,
usually by error during execution of method body of <router-link to="#lra-method" @click.native="this.scrollFix('#lra-method')">@LRA annotated method</router-link>.
If the method responds with 500 or 202, coordinator will eventually try the call again.
If participant has <router-link to="#status-participant-method" @click.native="this.scrollFix('#status-participant-method')">@Status annotated method</router-link>, <router-link to="/mp/lra/02_coordinator">coordinator</router-link>
retrieves the status to find out if retry should be done.</p>


<h4 id="_jax_rs_variant_with_supported_lra_context_values">JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a> - id of the LRA transaction</p>

</li>
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_PARENT_CONTEXT_HEADER">LRA_HTTP_PARENT_CONTEXT_HEADER</a> - parent LRA id in case of nested LRA</p>

</li>
</ul>
<markup
lang="java"

>@PUT
@Path("/compensate")
@Compensate
public Response compensateWork(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId,
                               @HeaderParam(LRA_HTTP_PARENT_CONTEXT_HEADER) URI parent){
    return LRAResponse.compensated();
}</markup>

</div>

<h4 id="_non_jax_rs_variant_with_supported_lra_context_values">Non JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>URI with LRA id</p>

</li>
</ul>
<markup
lang="java"

>@Compensate
public void compensate(URI lraId)</markup>

</div>
</div>

<h3 id="complete-participant-method">@Complete</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/Complete.html"><sub>javadoc</sub></a></p>

<div class="admonition warning">
<p class="admonition-inline">Expected to be called by LRA <router-link to="/mp/lra/02_coordinator">coordinator</router-link> only!</p>
</div>
<p>Complete method is called by <router-link to="/mp/lra/02_coordinator">coordinator</router-link> when LRA is successfully closed.
If the method responds with 500 or 202, coordinator will eventually try the call again.
If participant has <router-link to="#status-participant-method" @click.native="this.scrollFix('#status-participant-method')">@Status annotated method</router-link>, <router-link to="/mp/lra/02_coordinator">coordinator</router-link> retrieves the status to find out if retry should be done.</p>


<h4 id="_jax_rs_variant_with_supported_lra_context_values_2">JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a> - id of the LRA transaction</p>

</li>
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_PARENT_CONTEXT_HEADER">LRA_HTTP_PARENT_CONTEXT_HEADER</a> - parent LRA id in case of nested LRA</p>

</li>
</ul>
<markup
lang="java"

>@PUT
@Path("/complete")
@Complete
public Response complete(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId,
                         @HeaderParam(LRA_HTTP_PARENT_CONTEXT_HEADER) URI parentLraId)</markup>

</div>

<h4 id="_non_jax_rs_variant_with_supported_lra_context_values_2">Non JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>URI with LRA id</p>

</li>
</ul>
<markup
lang="java"

>@Complete
public void complete(URI lraId)</markup>

</div>
</div>

<h3 id="_forget">@Forget</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/Forget.html"><sub>javadoc</sub></a></p>

<div class="admonition warning">
<p class="admonition-inline">Expected to be called by LRA <router-link to="/mp/lra/02_coordinator">coordinator</router-link> only!</p>
</div>
<p><router-link to="#complete-participant-method" @click.native="this.scrollFix('#complete-participant-method')">Complete</router-link> and <router-link to="#complete-participant-method" @click.native="this.scrollFix('#complete-participant-method')">compensate</router-link>
methods can fail(500) or report that compensation/completion is in progress(202).
In such case participant needs to be prepared to report its status over <router-link to="#status-participant-method" @click.native="this.scrollFix('#status-participant-method')">@Status annotated method</router-link>
to <router-link to="/mp/lra/02_coordinator">coordinator</router-link>.
When <router-link to="/mp/lra/02_coordinator">coordinator</router-link> decides all the participants have finished, method annotated with @Forget is called.</p>


<h4 id="_jax_rs_variant_with_supported_lra_context_values_3">JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a> - id of the LRA transaction</p>

</li>
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_PARENT_CONTEXT_HEADER">LRA_HTTP_PARENT_CONTEXT_HEADER</a> - parent LRA id in case of nested LRA</p>

</li>
</ul>
<markup
lang="java"

>@DELETE
@Path("/forget")
@Forget
public Response forget(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId,
                       @HeaderParam(LRA_HTTP_PARENT_CONTEXT_HEADER) URI parent)</markup>

</div>

<h4 id="_non_jax_rs_variant_with_supported_lra_context_values_3">Non JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>URI with LRA id</p>

</li>
</ul>
<markup
lang="java"

>@Forget
public void forget(URI lraId)
}</markup>

</div>
</div>

<h3 id="_leave">@Leave</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/Leave.html"><sub>javadoc</sub></a></p>

<p>Method annotated with @Leave called with LRA context(with header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a>) informs <router-link to="/mp/lra/02_coordinator">coordinator</router-link> that current participant is leaving the LRA.
Method body is executed after leave signal is sent.
As a result, participant methods complete and compensate won&#8217;t be called when the particular LRA ends.</p>

<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a> - id of the LRA transaction</p>

</li>
</ul>
<markup
lang="java"

>@PUT
@Path("/leave")
@Leave
public Response leaveLRA(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraIdtoLeave)</markup>

</div>

<h3 id="status-participant-method">@Status</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/Status.html"><sub>javadoc</sub></a></p>

<div class="admonition warning">
<p class="admonition-inline">Expected to be called by LRA <router-link to="/mp/lra/02_coordinator">coordinator</router-link> only!</p>
</div>
<p>If the coordinator&#8217;s call to the particpant&#8217;s method fails, then it will retry the call.
If the participant is not idempotent, then it may need to report its state to coordinator by declaring method
annotated with @Status for reporting if previous call did change participant status.
<router-link to="/mp/lra/02_coordinator">Coordinator</router-link> can call it and decide if compensate or complete retry is needed.</p>


<h4 id="_jax_rs_variant_with_supported_lra_context_values_4">JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_CONTEXT_HEADER">LRA_HTTP_CONTEXT_HEADER</a> - id of the LRA transaction</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ParticipantStatus.html">ParticipantStatus</a> - Status of the participant reported to <router-link to="/mp/lra/02_coordinator">coordinator</router-link></p>

</li>
</ul>
<markup
lang="java"

>@GET
@Path("/status")
@Status
public Response reportStatus(@HeaderParam(LRA_HTTP_CONTEXT_HEADER) URI lraId) {
    return Response.status(ParticipantStatus.FailedToCompensate).build();
}</markup>

</div>

<h4 id="_non_jax_rs_variant_with_supported_lra_context_values_4">Non JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>URI with LRA id</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ParticipantStatus.html">ParticipantStatus</a> - Status of the participant reported to <router-link to="/mp/lra/02_coordinator">coordinator</router-link></p>

</li>
</ul>
<markup
lang="java"

>@Status
public Response reportStatus(URI lraId){
    return Response.ok(ParticipantStatus.FailedToCompensate).build();
}</markup>

</div>
</div>

<h3 id="after-participant-method">@AfterLRA</h3>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/AfterLRA.html"><sub>javadoc</sub></a></p>

<div class="admonition warning">
<p class="admonition-inline">Expected to be called by LRA <router-link to="/mp/lra/02_coordinator">coordinator</router-link> only!</p>
</div>
<p>Method annotated with <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/AfterLRA.html">@AfterLRA</a> in the same class as the one with @LRA annotation gets invoked after particular LRA finishes.</p>


<h4 id="_jax_rs_variant_with_supported_lra_context_values_5">JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_ENDED_CONTEXT_HEADER">LRA_HTTP_ENDED_CONTEXT_HEADER</a> - id of the finished LRA transaction</p>

</li>
<li>
<p>Header <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/ws/rs/LRA.html#LRA_HTTP_PARENT_CONTEXT_HEADER">LRA_HTTP_PARENT_CONTEXT_HEADER</a> - parent LRA id in case of nested LRA</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html">LRAStatus</a> - Final status of the LRA (<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#Cancelled">Cancelled</a>, <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#Closed">Closed</a>, <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#FailedToCancel">FailedToCancel</a>, <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#FailedToClose">FailedToClose</a>)</p>

</li>
</ul>
<markup
lang="java"

>@PUT
@Path("/finished")
@AfterLRA
public Response whenLRAFinishes(@HeaderParam(LRA_HTTP_ENDED_CONTEXT_HEADER) URI lraId,
                                @HeaderParam(LRA_HTTP_PARENT_CONTEXT_HEADER) URI parentLraId,
                                LRAStatus status)</markup>

</div>

<h4 id="_non_jax_rs_variant_with_supported_lra_context_values_5">Non JAX-RS variant with supported LRA context values:</h4>
<div class="section">
<ul class="ulist">
<li>
<p>URI with finished LRA id</p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html">LRAStatus</a> - Final status of the LRA (<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#Cancelled">Cancelled</a>, <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#Closed">Closed</a>, <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#FailedToCancel">FailedToCancel</a>, <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-RC3/apidocs/org/eclipse/microprofile/lra/annotation/LRAStatus.html#FailedToClose">FailedToClose</a>)</p>

</li>
</ul>
<markup
lang="java"

>public void whenLRAFinishes(URI lraId, LRAStatus status)</markup>

</div>
</div>
</div>
</doc-view>