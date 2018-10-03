<doc-view>

<h2 >Tools</h2>
<div class="section">

<h3 >Secure configuration</h3>
<div class="section">
<p>Support for encrypting secrets in configuration files.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.security&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-security-tools-config&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 >Key and certificate configuration</h3>
<div class="section">
<p>Configuration support for accessing private keys, public keys, certificates and
 certificate chains including runtime access to instances of such.</p>

<markup
lang="xml"
title="Maven Dependency"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.common&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-common-key-util&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</div>

<h2 >Developer&#8217;s Guide</h2>
<div class="section">
<p>This guide guides you through extension possibilities for Security component.</p>

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
</ul>
</div>

<h2 >Security providers</h2>
<div class="section">
<p>You can build a custom provider for each type of security concept supported.
By default, each provider is asynchronous. To simplify simple cases, a class
exists in "spi" package to help in implementing a synchronous approach:
 "SynchronousProvider".</p>

<p>You have two options:
1. Implement a provider interface and reference it in configuration (or from
 builder) by class
2. Implement a provider interface and provide a java service implementing
 "io.helidon.security.spi.SecurityProviderService"</p>

<p>The second option allows for easier configuration, as the configuration key can be
 used without a class definition and creates a default name of a provider.</p>


<h3 >Authentication provider</h3>
<div class="section">
<p>To create a custom authentication provider, create a class that implements
"io.helidon.security.spi.AuthenticationProvider".
Implementation is responsible for taking a request and assuming a subject
based on that request.
In case the protocol is multi-request (e.g. challenge for basic authentication),
 you have the possibility to return specific headers and a response code. The
 default semantics of these is HTTP, though providers may exist that are not
 HTTP specific.</p>

</div>

<h3 >Authorization provider</h3>
<div class="section">
<p>To create a custom authorization provider, create a class that implements
"io.helidon.security.spi.AuthorizationProvider".
Implementation is responsible for taking a request and checking whether the
 request can continue processing (e.g. if the current user and/or service subject
 has a right to execute it).</p>

<p>If authentication is configured, the Security component guarantees it resolved
 before authorization.</p>

</div>

<h3 >Outbound security provider</h3>
<div class="section">
<p>To create a custom outbound security provider, create a class that implements
"io.helidon.security.spi.OutboundSecurityProvider".
Implementation can update outgoing message headers to handle
security for an outgoing request (e.g. identity propagation, mapping etc.).</p>

</div>

<h3 >Audit provider</h3>
<div class="section">
<p>To create a custom audit provider, create a class that implements
"io.helidon.security.spi.AuditProvider".
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

<h2 >Provider selection policy</h2>
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

<h2 >Framework integration</h2>
<div class="section">
<p>To integrate a new framework, you should create a single Security
instance shared for a scope (e.g. one application). Security instance
has a method to create a SecurityContext (request scope).
Use tools of the framework integrated to add annotations support (if feasible).</p>

<p>There are two annotations that should be supported:</p>

<ol style="margin-left: 15px;">
<li>
@Secured - to configure security, e.g. authentication, authorization

</li>
<li>
@Audited - to configure auditing

</li>
</ol>
<p>In addition you should implement integration of entity processing through Request
 builder - see integration for Jersey, class "SecurityFilter"</p>

</div>
</doc-view>