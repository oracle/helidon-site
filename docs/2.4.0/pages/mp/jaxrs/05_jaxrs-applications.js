<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>JAX-RS Applications</dt>
<dd slot="desc"><div class="admonition note">
<p class="admonition-inline">In this section we shall distinguish the notion of a JAX-RS <code>Application</code> subclass
from a Helidon application. As we shall learn shortly, the latter may include zero or more
of the former.</p>
</div>
<p>The JAX-RS specification defines the notion of an <code>Application</code> subclass whose methods return
resource and provider classes, singletons and properties. This is the mechanism developers
can use to define what comprises a JAX-RS application. Unless otherwise stated by the runtime
environment in which the JAX-RS application runs, every JAX-RS application must include
exactly one <code>Application</code> subclass.</p>

<p>Helidon provides an extension to JAX-RS in which 0 or more <code>Application</code> subclasses are allowed.
If no <code>Application</code> subclasses are provided, then a so-called <em>synthetic</em> subclass will be
created automatically. This <em>synthetic</em> subclass shall include all resource and provider
classes discovered by Helidon. Most Helidon applications should simply rely on this mechanism
in accordance to convention over configuration practices.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_discovery_of_jax_rs_beans">Discovery of JAX-RS Beans</h2>
<div class="section">
<p>CDI scanning is controlled by the <code>bean-discovery-mode</code> attribute in <code>beans.xml</code> files &mdash;
the default value for this attribute is <code>annotated</code>. In the default mode, CDI scans for beans
decorated by bean-defining annotations such as <code>@ApplicationScoped</code>, <code>@RequestScoped</code>, etc.</p>

<p>With the help of CDI, Helidon looks for JAX-RS <code>Application</code> subclasses in your
Helidon application. If none are found, a synthetic application will be created by gathering all
resources and providers found during the discovery phase. Note that if your <code>Application</code>
subclass has no bean-defining annotations, and bean discovery is set to the default <code>annotated</code>
value, it will be ignored.</p>

<p>The discovery phase is carried out as follows (in no particular order):</p>

<ol style="margin-left: 15px;">
<li>
Collect all beans that extend <code>Application</code>

</li>
<li>
Collect all beans annotated with <code>@Path</code>

</li>
<li>
Collect all beans annotated with <code>@Provider</code>

</li>
</ol>
<p>If no <code>Application</code> subclasses are found, create a <em>synthetic</em> <code>Application</code> subclass that includes
all beans gathered in steps (2) and (3) and set the application path to be "/" &mdash;this is the path
normally defined using the <code>@ApplicationPath</code> annotation. If one or more
<code>Application</code> subclasses are found, use those subclasses (and their application paths) and discard
the collections in steps (2) and (3), in favor of calling the corresponding methods provided by
the subclasses.</p>

<div class="admonition note">
<p class="admonition-inline">Helidon treats <code>@Path</code> and <code>@Provided</code> as bean-definining annotations but, as stated above,
<code>Application</code> subclasses may require additional annotations depending on the discovery mode.</p>
</div>
</div>

<h2 id="_access_to_application_instances">Access to Application Instances</h2>
<div class="section">
<p>JAX-RS provides access to the <code>Application</code> subclass instance via injection using <code>@Context</code>. This form
of access is still supported in Helidon but is insufficient if two or more subclasses are present.
Given that support for two or more <code>Application</code> subclasses is a Helidon extension, a new mechanism
is provided via the <code>ServerRequest</code> 's context object as shown next.</p>

<markup
lang="java"

>import io.helidon.webserver.ServerRequest;

@Path("myresource")
public class MyResource {

    @GET
    public void get(@Context ServerRequest serverRequest) {
        Application app = serverRequest.context().get(Application.class).get();
        // ...
    }
}</markup>

<p>This approach effectively moves the scope of <code>Application</code> subclass instances to
request scope in order to access the correct subclass for the resource method being
executed.</p>

</div>
</doc-view>