<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Setting Up Transaction Support</dt>
<dd slot="desc"><p>This guide shows how to configure and use
<a id="" title="" target="_blank" href="https://www.jcp.org/en/jsr/detail?id=907">Java Transaction API
(JTA)</a>-compliant transactions in your Helidon MP application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">

<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>About 10 minutes</td>
</tr>
<tr>
<td><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_add_the_helidon_jta_integration_to_your_helidon_mp_applications_runtime_classpath">Add The Helidon JTA Integration to Your Helidon MP Application&#8217;s Runtime Classpath</h2>
<div class="section">
<p>To bring JTA transactions to your Helidon MP application, you&#8217;ll need
to add the relevant extension.  Specifically, you&#8217;ll need to add an
appropriate <code>&lt;dependency&gt;</code> element as a child element of the
<code>&lt;dependencies&gt;</code> element in your <code>pom.xml</code>, referencing the Helidon
JTA extension:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-jta-weld&lt;/artifactId&gt;
    &lt;version&gt;{helidon-version}&lt;/version&gt;
    &lt;scope&gt;runtime&lt;/scope&gt; <span class="conum" data-value="1" />
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">Note the scope is <code>runtime</code>.</li>
</ul>
</div>

<h2 id="_add_jta_to_your_helidon_mp_applications_compilation_classpath">Add JTA to Your Helidon MP Application&#8217;s Compilation Classpath</h2>
<div class="section">
<p>To actually use the Java Transaction API in your code, you&#8217;ll need to
ensure a library defining the classes and interfaces mandated by the
specification is present on your compilation classpath.  (Note that
this library is separate from any given vendor&#8217;s actual implementation
of the specification by way of these classes and interfaces.)</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;javax.transaction&lt;/groupId&gt;
    &lt;artifactId&gt;javax.transaction-api&lt;/artifactId&gt;
    &lt;version&gt;1.2&lt;/version&gt;
    &lt;scope&gt;provided&lt;/scope&gt; <span class="conum" data-value="1" />
&lt;/dependency&gt;</markup>

<ul class="colist">
<li data-value="1">The scope is <code>provided</code> to allow the JTA implementation runtime to
provide its own implementation of the API jar if necessary.</li>
</ul>
</div>

<h2 id="_annotate_a_method_with_transactional">Annotate a Method With <a id="" title="" target="_blank" href="https://javaee.github.io/javaee-spec/javadocs/javax/transaction/Transactional.html"><code>@Transactional</code></a></h2>
<div class="section">
<p>Choose a method that you wish to have a certain kind of transactional
behavior, and annotate it with the
<a id="" title="" target="_blank" href="https://javaee.github.io/javaee-spec/javadocs/javax/transaction/Transactional.html"><code>@Transactional</code></a>
annotation.</p>

<p>The method in question will need to be a business method of some kind:
a method that is invoked by the Helidon MP server machinery, not
directly by the user.  This is because normally the behavior that
<code>@Transactional</code> requests is provided by interceptor functionality.
More concretely, in Helidon MP you can annotate a
<a id="" title="" target="_blank" href="https://javaee.github.io/tutorial/jaxrs002.html#GILQB">JAX-RS resource
method</a>, or a method on a CDI bean that itself is injected in your
application somewhere.</p>

<p>For example, a method on a hypothetical <code>PersonDAO</code> class that saves a
hypothetical <code>Person</code> object to a database, starting a new JTA
transaction if necessary, might look like this:</p>

<markup
lang="java"
title="<code>PersonDAO.java</code>"
>import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

@Transactional(TxType.REQUIRED) <span class="conum" data-value="1" />
public void savePerson(Person person) {
    // Use JPA or another JTA-aware framework to save the Person object <span class="conum" data-value="2" />
}</markup>

<ul class="colist">
<li data-value="1">The <code>Transactional</code> annotation indicates the kind of transactional
behavior you would like this method to have.  In this example, we
explicitly set the kind of behavior to be
<a id="" title="" target="_blank" href="https://javaee.github.io/javaee-spec/javadocs/javax/transaction/Transactional.TxType.html#REQUIRED"><code>REQUIRED</code></a>
(which also happens to be the default if you do not specify an
explicit
<a id="" title="" target="_blank" href="https://javaee.github.io/javaee-spec/javadocs/javax/transaction/Transactional.TxType.html"><code>TxType</code></a>).</li>
<li data-value="2">Annotating a method with <code>@Transactional</code> demarcates a JTA
transaction, but it is up to individual JTA-aware frameworks and
libraries to actually do something when the transaction is implicitly
started.  JPA is an example of a framework that is JTA aware.</li>
</ul>
</div>
</doc-view>