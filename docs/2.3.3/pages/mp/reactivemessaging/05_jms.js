<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable JMS Connector
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging.jms&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging-jms&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_reactive_jms_connector">Reactive JMS Connector</h2>
<div class="section">
<p>Connecting streams to JMS with Reactive Messaging couldn&#8217;t be easier.</p>


<h3 id="_config">Config</h3>
<div class="section">
<p>Connector name: <code>helidon-jms</code></p>

<div class="block-title"><span>Attributes</span></div>
<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class=""><code>username</code></td>
<td class="">User name used to connect JMS session</td>
</tr>
<tr>
<td class=""><code>password</code></td>
<td class="">Password to connect JMS session</td>
</tr>
<tr>
<td class=""><code>type</code></td>
<td class="">Possible values are: <code>queue</code>, <code>topic</code></td>
</tr>
<tr>
<td class=""><code>destination</code></td>
<td class="">Queue or topic name</td>
</tr>
<tr>
<td class=""><code>acknowledge-mode</code></td>
<td class="">Possible values are: <code>AUTO_ACKNOWLEDGE</code>- session automatically acknowledges a client&#8217;s receipt of a message,
<code>CLIENT_ACKNOWLEDGE</code> - receipt of a message is acknowledged only when <code>Message.ack()</code> is called manually,
<code>DUPS_OK_ACKNOWLEDGE</code> - session lazily acknowledges the delivery of messages. Default value: <code>AUTO_ACKNOWLEDGE</code></td>
</tr>
<tr>
<td class=""><code>transacted</code></td>
<td class="">Indicates whether the session will use a local transaction. Default value: <code>false</code></td>
</tr>
<tr>
<td class=""><code>message-selector</code></td>
<td class="">JMS API message selector expression based on a subset of the SQL92.
Expression can only access headers and properties, not the payload.</td>
</tr>
<tr>
<td class=""><code>client-id</code></td>
<td class="">Client identifier for JMS connection.</td>
</tr>
<tr>
<td class=""><code>durable</code></td>
<td class="">True for creating durable consumer (only for topic). Default value: <code>false</code></td>
</tr>
<tr>
<td class=""><code>subscriber-name</code></td>
<td class="">Subscriber name for durable consumer used to identify subscription.</td>
</tr>
<tr>
<td class=""><code>non-local</code></td>
<td class="">If true then any messages published to the topic using this session&#8217;s connection,
 or any other connection with the same client identifier,
 will not be added to the durable subscription. Default value: <code>false</code></td>
</tr>
<tr>
<td class=""><code>named-factory</code></td>
<td class="">Select in case factory is injected as a named bean or configured with name.</td>
</tr>
<tr>
<td class=""><code>poll-timeout</code></td>
<td class="">Timeout for polling for next message in every poll cycle in millis. Default value: <code>50</code></td>
</tr>
<tr>
<td class=""><code>period-executions</code></td>
<td class="">Period for executing poll cycles in millis. Default value: <code>100</code></td>
</tr>
<tr>
<td class=""><code>session-group-id</code></td>
<td class="">When multiple channels share same <code>session-group-id</code>,
they share same JMS session and same JDBC connection as well.</td>
</tr>
<tr>
<td class=""><code>jndi.jms-factory</code></td>
<td class="">JNDI name of JMS factory.</td>
</tr>
<tr>
<td class=""><code>jndi.env-properties</code></td>
<td class="">Environment properties used for creating initial context <code>java.naming.factory.initial</code>, <code>java.naming.provider.url</code> &#8230;&#8203;</td>
</tr>
</tbody>
</table>
</div>
</div>

<h3 id="_configured_jms_factory">Configured JMS factory</h3>
<div class="section">
<p>The simplest possible usage is looking up JMS ConnectionFactory in the naming context.</p>

<markup
lang="yaml"
title="Example of connector config:"
>mp.messaging:

  incoming.from-jms:
    connector: helidon-jms
    destination: messaging-test-queue-1
    type: queue

  outgoing.to-jms:
    connector: helidon-jms
    destination: messaging-test-queue-1
    type: queue

  connector:
    helidon-jms:
      user: Gandalf
      password: mellon
      jndi:
        jms-factory: ConnectionFactory
        env-properties:
          java.naming:
            factory.initial: org.apache.activemq.jndi.ActiveMQInitialContextFactory
            provider.url: tcp://localhost:61616</markup>

</div>

<h3 id="_injected_jms_factory">Injected JMS factory</h3>
<div class="section">
<p>In case you need more advanced setup, connector can work with injected factory instance.</p>

<markup
lang="java"
title="Inject:"
>    @Produces
    @ApplicationScoped
    @Named("active-mq-factory")
    public ConnectionFactory connectionFactory() {
        return new ActiveMQConnectionFactory(config.get("jms.url").asString().get());
    }</markup>

<markup
lang="yaml"
title="Config:"
>jms:
  url: tcp://127.0.0.1:61616

mp:
  messaging:
    connector:
      helidon-jms:
        named-factory: active-mq-factory

    outgoing.to-jms:
      connector: helidon-jms
      session-group-id: order-connection-1
      destination: TESTQUEUE
      type: queue

    incoming.from-jms:
      connector: helidon-jms
      session-group-id: order-connection-1
      destination: TESTQUEUE
      type: queue</markup>

</div>

<h3 id="_consuming">Consuming</h3>
<div class="section">
<markup
lang="java"
title="Consuming one by one unwrapped value:"
>@Incoming("from-jms")
public void consumeJms(String msg) {
    System.out.println("JMS says: " + msg);
}</markup>

<markup
lang="java"
title="Consuming one by one, manual ack:"
>@Incoming("from-jms")
@Acknowledgment(Acknowledgment.Strategy.MANUAL)
public CompletionStage&lt;?&gt; consumeJms(JmsMessage&lt;String&gt; msg) {
    System.out.println("JMS says: " + msg.getPayload());
    return msg.ack();
}</markup>

</div>

<h3 id="_producing">Producing</h3>
<div class="section">
<markup
lang="java"
title="Example of producing to JMS:"
>@Outgoing("to-jms")
public PublisherBuilder&lt;String&gt; produceToJms() {
    return ReactiveStreams.of("test1", "test2");
}</markup>

<markup
lang="java"
title="Example of more advanced producing to JMS:"
>@Outgoing("to-jms")
public PublisherBuilder&lt;String&gt; produceToJms() {
    return ReactiveStreams.of("test1", "test2")
                .map(s -&gt; JmsMessage.builder(s)
                              .correlationId(UUID.randomUUID().toString())
                              .property("stringProp", "cool property")
                              .property("byteProp", 4)
                              .property("intProp", 5)
                              .onAck(() -&gt; System.out.println("Acked!"))
                              .build());
}</markup>

<markup
lang="java"
title="Example of even more advanced producing to JMS with custom mapper:"
>@Outgoing("to-jms")
public PublisherBuilder&lt;String&gt; produceToJms() {
    return ReactiveStreams.of("test1", "test2")
                .map(s -&gt; JmsMessage.builder(s)
                            .customMapper((p, session) -&gt; {
                                TextMessage textMessage = session.createTextMessage(p);
                                textMessage.setStringProperty("custom-mapped-property", "XXX" + p);
                                return textMessage;
                            })
                            .build()
                    );
}</markup>

</div>
</div>
</doc-view>