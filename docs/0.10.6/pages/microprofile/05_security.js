<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Adding Security</dt>
<dd slot="desc"><p>To add security, such as protecting
resource methods with authentication, to a MicroProfile application, add the Helidon
 security integration dependency to your project.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_maven_coordinates">Maven Coordinates</h2>
<div class="section">
<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-microprofile-security&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h3 id="_securing_a_web_resource">Securing a Web Resource</h3>
<div class="section">
<p>For web server static content, see
<router-link to="/microprofile/06_configuration">Configuration Secrets.</router-link></p>

<p>For JAX-RS resources, declare security by adding annotations to a resource class or
 method.</p>

<markup
lang="java"
title="Protected resource method"
>@GET
@io.helidon.security.annot.Authenticated
@io.helidon.security.annot.Authorized
// you can also use io.helidon.security.abac.role.RoleValidator.Roles
@RolesAllowed("admin")
public String adminResource(@Context io.helidon.security.SecurityContext securityContext) {
  return "you are " + securityContext.getUser();
}</markup>

</div>
</div>
</doc-view>