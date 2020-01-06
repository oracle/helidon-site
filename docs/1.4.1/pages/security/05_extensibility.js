<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Extending Security</dt>
<dd slot="desc"><p>This guide describes how you can extend the Security component.</p>

<p>The component has the following extension points:</p>

<ul class="ulist">
<li>
<p>Security providers</p>

</li>
<li>
<p>Provider selection policy</p>

</li>
<li>
<p>Integration with a framework</p>

</li>
</ul></dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_security_providers">Security providers</h2>
<div class="section">
<p>You can build a custom provider for each type of security concept supported.
By default, each provider is asynchronous. For simple cases, a class
exists in "spi" package to help implement a synchronous approach:
 <code>SynchronousProvider</code>.</p>

<p>You have two options:</p>

<ol style="margin-left: 15px;">
<li>
Implement a provider interface and reference it in configuration (or from
builder) by class

</li>
<li>
Implement a provider interface and provide a Java <code>ServiceLoader</code> service implementing
<code>io.helidon.security.spi.SecurityProviderService</code>

</li>
</ol>
<p>The second option allows for easier configuration, as the configuration key can be
 used without a class definition and creates a default name of a provider.</p>


<h3 id="_authentication_provider">Authentication provider</h3>
<div class="section">
<p>To create a custom authentication provider, create a class that implements
<code>io.helidon.security.spi.AuthenticationProvider</code>.
Implementation is responsible for taking a request and asserting a subject
based on that request.
In case the protocol is multi-request (e.g. challenge for basic authentication),
 you have the possibility to return specific headers and a response code. The
 default semantics of these is HTTP, though providers may exist that are not
 HTTP specific.</p>

</div>

<h3 id="_authorization_provider">Authorization provider</h3>
<div class="section">
<p>To create a custom authorization provider, create a class that implements
<code>io.helidon.security.spi.AuthorizationProvider</code>.
Implementation is responsible for taking a request and checking whether the
 request can continue processing (e.g. if the current user and/or service subject
 has a right to execute it).</p>

<p>If authentication is configured, the Security component guarantees it resolved
 before authorization.</p>

</div>

<h3 id="_outbound_security_provider">Outbound security provider</h3>
<div class="section">
<p>To create a custom outbound security provider, create a class that implements
<code>io.helidon.security.spi.OutboundSecurityProvider</code>.
Implementation can update outgoing message headers to handle
security for an outgoing request (e.g. identity propagation, mapping etc.).</p>

</div>

<h3 id="_audit_provider">Audit provider</h3>
<div class="section">
<p>To create a custom audit provider, create a class that implements
<code>io.helidon.security.spi.AuditProvider</code>.
Security component feeds each audit provider all messages from all components
that invoke audit method on "Security" class, including internal audit events
pre-configured in the component itself (e.g. authentication, authorization
 events).</p>

<p>Implementation may do whatever desired with these messages, e.g.:</p>

<ul class="ulist">
<li>
<p>filter them</p>

</li>
<li>
<p>log them</p>

</li>
<li>
<p>store them to a database</p>

</li>
<li>
<p>forward them to an audit component</p>

</li>
<li>
<p>discard them</p>

</li>
</ul>
</div>
</div>

<h2 id="_provider_selection_policy">Provider selection policy</h2>
<div class="section">
<p>Each request is processed by a single authentication and/or authorization
 provider. The selection policy provides the security component information about
 which provider to use. Out of the box, there are three policies:</p>

<ol style="margin-left: 15px;">
<li>
"First" policy - first configured provider (or explicitly defined default
provider) is used by default, if a named provider is requested, it would be used

</li>
<li>
"Composite" policy - this policy allows for a sequence of providers to be
executed (e.g. one request may have more than one provider) - used for example to
resolve service and user authentication

</li>
<li>
"Class" policy - this allows usage of a custom policy defined by fully
qualified class name

</li>
</ol>
<p>To create a custom provider selection policy, create a class that implements
"io.helidon.security.spi.ProviderSelectionPolicy".</p>

</div>

<h2 id="_framework_integration">Framework integration</h2>
<div class="section">
<p>The Security component supports integration with Helidon WebServer (<code>helidon-security-integration-webserver</code>)
 and with Jersey (<code>helidon-security-integration-jersey</code>).</p>

<p>Existing integrations (WebServer and Jersey) use Helidon Security APIs that are available to integrate any
framework/application (for example we could integrate security with messaging, such as JMS).</p>

<p>To create a new integration, an instance of <code>Security</code> class is needed, as it handles
all configured providers. Usually a single <code>Security</code> instance is used for an application.</p>

<p><code>Security</code> is then used to create an instance of <code>SecurityContext</code>, which is used
for interaction with a single user. A single <code>SecurityContext</code> is created for each HTTP
request in Jersey and WebServer integration.</p>

<p><code>SecurityContext</code> is used to invoke authentication, authorization, and outbound security requests.</p>

<p>Helidon Security also defines a set of annotations:</p>

<ul class="ulist">
<li>
<p><code>@Authenticated</code> - access to resources must follow authentication rules defined by the annotation</p>

</li>
<li>
<p><code>@Authorized</code> - access to resources must follow authorization rules defined by the annotation</p>

</li>
<li>
<p><code>@Audited</code> - to configure auditing</p>

</li>
</ul>
<p>If the protected resources (in Helidon MP, these are JAX-RS resource classes and methods) can
be annotated, the integration component must use these annotations when deciding how to secure
the endpoint. For example, the Jersey integration checks whether the @Authenticated annotation exists. If it does, then
the integration component attempts to authenticate the request.</p>

<p>Because other components of Helidon Security (such as ABAC validators) query the request for annotations,
the integration component should also collect all annotations from the resource and correctly configure
them when creating the security request.</p>

</div>
</doc-view>