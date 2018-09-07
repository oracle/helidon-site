<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Security Introduction</dt>
<dd slot="desc"><p>Cloud Security provides the following features</p>

<ol style="margin-left: 15px;">
<li>
Authentication - support for authenticating incoming requests, creating a
security Subject with Principal and Grants. Principal represents current user/service.
Grant may represent a Role, Scope etc.
Responsibility to create Principals and Grants lies with with AuthenticationProvider
SPI. The following Principals are expected and supported out of the box:
<ol style="margin-left: 15px;">
<li>
UserPrincipal - the party is an end-user (e.g. a person) - there can be zero to
one user principals in a subject

</li>
<li>
ServicePrincipal - the party is a service (e.g. a computer program) - there can
be zero to one service principals in a subject

</li>
</ol>
</li>
<li>
Authorization - support for authorizing incoming requests. Out-of-the-box the
security module supports ABAC and RBAC (Attribute based access control and Role based
access control). RBAC is handled through RolesAllowed annotation (for integrations that
support injection).

</li>
<li>
Outbound security - support for propagating identity or (in general) securing
outbound requests. Modification of a request to include outbound security is
responsibility of OutboundSecurityProvider SPI

</li>
<li>
Audit - security module audits most important events through its own API
(e.g. Authentication events, Authorization events, outbound security events).
A default AuditProvider is provided as well, logging to Java util logging (JUL)
logger called "AUDIT" (may be overridden through configuration). AuditProvider
SPI may be implemented to support other auditing options.

</li>
</ol>
<p>Security module is quite HTTP centric (as most common use cases are related to
 HTTP REST), though it is not HTTP specific (the security module may be used to
 secure even other transports, such as JMS, Kafka messages etc. if an appropriate
 integration module is developed, as all APIs can be mapped to a non-HTTP
 protocol). Nevertheless there may be security providers that only make sense with
 HTTP (such as HTTP digest authentication).</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >How to use</h2>
<div class="section">
<p>To integrate with a container, or to use Security standalone, we must
 create an instance of security.
In general, Security supports three approaches</p>

<ul class="ulist">
<li>
<p>a fluent-API builder pattern - you configure everything "by hand"</p>

</li>
<li>
<p>a configuration based pattern - you configure everything in a configuration file</p>

</li>
<li>
<p>hybrid - you load a builder from configuration and update it in a program</p>

</li>
</ul>
<p>Once a security instance is built, it can be used to initialize an
 <router-link to="#_cloud_security_container_integrations" @click.native="this.scrollFix('#_cloud_security_container_integrations')">integration with a container</router-link>, or to
 use security from a program directly:</p>

<markup
lang="java"
title="Security direct usage"
>// create a security context
SecurityContext context = security.contextBuilder(UUID.randomUUID().toString())
                .env(SecurityEnvironment.builder()
                             .method("get")
                             .path("/test")
                             .transport("http")
                             .header("Authorization", "Bearer abcdefgh")
                             .build())
                .build();

// use the context to authenticate a request
context.atnClientBuilder()
                .submit()
                .whenComplete((response, exception) -&gt; {
                    // this is to show the features, not a real-world production code...
                    if (null == exception) {
                        if (response.getStatus().isSuccess()) {
                            System.out.println(response.getUser());
                            System.out.println(response.getService());
                        } else {
                            System.out.println("Authentication failed: " + response.getDescription());
                        }
                    } else {
                        exception.printStackTrace();
                    }
                });</markup>


<h3 >Builder pattern</h3>
<div class="section">
<markup
lang="java"
title="Security through a builder"
>Security security = Security.builder()
        // create a provider instance based on the provider documentation
        .addProvider(...)
        .build();</markup>

</div>

<h3 >Configuration pattern</h3>
<div class="section">
<p>See <router-link to="#_tools" @click.native="this.scrollFix('#_tools')">Secure config</router-link> for details about encrypting passwords in
 configuration files.</p>

<markup
lang="java"
title="Security from configuration"
>// uses io.helidon.Config
Security security = Security.fromConfig(config);</markup>

<markup
lang="conf"
title="Security from configuration - configuration"
># Uses secure config tool to encryp passwords
security.providers: [
    {
        http-basic-auth {
            realm = "helidon"

            user-store {
                users: [
                    {
                        login = "aUser"
                        password = "${CLEAR=somePassword}"
                        roles = ["theRole"]

                    },
                    {
                        login = "noRoles"
                        password = "${CLEAR=somePassword}"
                        roles = []
                    }
                ]
            }
        }
    }
]</markup>

</div>

<h3 >Hybrid pattern (Builder &amp; Configuration)</h3>
<div class="section">
<markup
lang="java"
title="Security from configuration and builder"
>// uses io.helidon.Config
Security security = Security.builderFromConfig(config)
                .addProvider(...)
                .build();

// or reverse order:
Security security = Security.builder()
                .addProvider()
                .config(config)
                .build();</markup>

</div>
</div>

<h2 >Maven Coordinates</h2>
<div class="section">
<p>You need to declare the following dependency in your project:</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</doc-view>