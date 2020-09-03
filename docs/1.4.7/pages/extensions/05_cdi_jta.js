<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>CDI extension for JTA</dt>
<dd slot="desc"><p>This <a id="" title="" target="_blank" href="https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#spi">CDI
portable extension</a> provides support for JTA (Java Transaction API)
transactions in your Helidon MicroProfile applications.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_prerequsites">Prerequsites</h2>
<div class="section">
<p>Declare the following dependency fragment in your project&#8217;s <code>pom.xml</code>:</p>

<markup
lang="xml"

>&lt;dependency&gt;
  &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
  &lt;artifactId&gt;helidon-integrations-cdi-jta-weld&lt;/artifactId&gt;
  &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
  &lt;groupId&gt;javax.transaction&lt;/groupId&gt;
  &lt;artifactId&gt;javax.transaction-api&lt;/artifactId&gt;
  &lt;scope&gt;provided&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_declaring_a_method_to_be_transactional">Declaring a method to be transactional</h2>
<div class="section">
<p>The following example shows how to declare a transactional method.</p>

<markup
lang="java"
title="Transactional method declaration"
>@Transactional(Transactional.TxType.REQUIRED)
public void doSomethingTransactionally() {

}</markup>

<p>The extension ensures that a transaction is started before and
committed after the method executes.  If the method throws an
exception, the transaction will be rolled back.</p>

<p>You can further specify the transactional behavior of the extension by
using different instances of the <code>Transactional</code> annotation.  For more
information, see the
<a id="" title="" target="_blank" href="https://static.javadoc.io/javax.transaction/javax.transaction-api/1.2/javax/transaction/Transactional.html"><code>Transactional</code>
annotation documentation</a>.</p>

<p>Transactional method support is implemented by CDI interception
facilities.  Among other things, this means that the method to which
you apply the <code>Transactional</code> annotation must not be <code>private</code> and
must in all other ways be a <em>business method</em>.  See the
<a id="" title="" target="_blank" href="https://jcp.org/aboutJava/communityprocess/mrel/jsr318/index3.html">Java
Interceptors specification</a> for more details.</p>

<p>During a transactional method invocation, the extension makes the
following objects available for injection via the <code>Inject</code> annotation:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://static.javadoc.io/javax.transaction/javax.transaction-api/1.2/javax/transaction/UserTransaction.html"><code>UserTransaction</code></a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://static.javadoc.io/javax.transaction/javax.transaction-api/1.2/javax/transaction/Transaction.html"><code>Transaction</code></a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://static.javadoc.io/javax.transaction/javax.transaction-api/1.2/javax/transaction/UserTransactionManager.html"><code>TransactionManager</code></a></p>

</li>
<li>
<p><a id="" title="" target="_blank" href="https://static.javadoc.io/javax.transaction/javax.transaction-api/1.2/javax/transaction/UserTransactionSynchronizationRegistry.html"><code>TransactionSynchronizationRegistry</code></a></p>

</li>
</ul>
</div>
</doc-view>