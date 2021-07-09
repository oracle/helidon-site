<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable AQ Connector
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging.aq&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging-aq&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_reactive_oracle_advanced_queueing_connector">Reactive Oracle Advanced Queueing Connector</h2>
<div class="section">
<p>Connecting streams to Oracle AQ with Reactive Messaging couldn&#8217;t be easier.
This connector extends Helidon&#8217;s JMS connector with Oracle AQ&#8217;s specific API.</p>


<h3 id="_config">Config</h3>
<div class="section">
<p>Connector name: <code>helidon-aq</code></p>

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
<td class=""><code>datasource</code></td>
<td class="">name of the datasource bean used to connect Oracle DB with AQ</td>
</tr>
<tr>
<td class=""><code>url</code></td>
<td class="">jdbc connection string used to connect Oracle DB with AQ (forbidden when <code>datasource</code> is specified)</td>
</tr>
<tr>
<td class=""><code>username</code></td>
<td class="">User name used to connect Oracle DB with AQ (forbidden when <code>datasource</code> is specified)</td>
</tr>
<tr>
<td class=""><code>password</code></td>
<td class="">Password to connect Oracle DB with AQ (forbidden when <code>datasource</code> is specified)</td>
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
<td class="">Possible values are: <code>AUTO_ACKNOWLEDGE</code>- session automatically acknowledges a client’s receipt of a message,
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
</tbody>
</table>
</div>
</div>

<h3 id="_configured_jms_factory">Configured JMS factory</h3>
<div class="section">
<p>The simplest possible usage is leaving construction of AQjmsConnectionFactory to the connector.</p>

<markup
lang="yaml"
title="Example of connector config:"
>mp:
  messaging:

    connector:
      helidon-aq:
        transacted: false
        acknowledge-mode: CLIENT_ACKNOWLEDGE
        url: jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=192.168.0.123)(Port=1521))(CONNECT_DATA=(SID=TESTSID)))
        user: gandalf
        password: mellon

    outgoing.to-aq:
      connector: helidon-aq
      destination: TESTQUEUE
      type: queue

    incoming.from-aq:
      connector: helidon-aq
      destination: TESTQUEUE
      type: queue</markup>

<p>Its also possible and preferable to refer to <router-link to="/mp/guides/07_datasource">configured datasource</router-link>,
in our example <router-link to="/mp/extensions/02_cdi_datasource-ucp">Oracle UCP datasource</router-link>:</p>

<markup
lang="yaml"
title="Example of connector config with Oracle UCP datasource:"
>javax:
  sql:
    DataSource:
      aq-test-ds:
        connectionFactoryClassName: oracle.jdbc.pool.OracleDataSource
        URL: jdbc:oracle:thin:@exampledb_high?TNS_ADMIN=/home/gandalf/wallets/Wallet_EXAMPLEDB
        user: gandalf
        password: SuperSecretPassword1234

mp:
  messaging:
    connector:
      helidon-aq:
        transacted: false
        acknowledge-mode: CLIENT_ACKNOWLEDGE
        data-source: aq-test-ds
    outgoing.toJms:
      connector: helidon-aq
      destination: TESTQUEUE
      type: queue
    incoming.fromJms:
      connector: helidon-aq
      destination: TESTQUEUE
      type: queue</markup>

</div>

<h3 id="_injected_jms_factory">Injected JMS factory</h3>
<div class="section">
<p>In case you need more advanced setup, connector can work with injected AQjmsConnectionFactory</p>

<markup
lang="java"
title="Inject:"
>    @Produces
    @ApplicationScoped
    @Named("aq-orderdb-factory")
    public AQjmsConnectionFactory connectionFactory() throws JMSException {
        AQjmsQueueConnectionFactory fact = new AQjmsQueueConnectionFactory();
        fact.setJdbcURL(config.get("jdbc.url").asString().get());
        fact.setUsername(config.get("jdbc.user").asString().get());
        fact.setPassword(config.get("jdbc.pass").asString().get());
        return fact;
    }</markup>

<markup
lang="yaml"
title="Config:"
>jdbc:
  url: jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=192.168.0.123)(Port=1521))(CONNECT_DATA=(SID=TESTSID)))
  user: gandalf
  pass: mellon

mp:
  messaging:
    connector:
      helidon-aq:
        named-factory: aq-orderdb-factory

    outgoing.to-aq:
      connector: helidon-aq
      session-group-id: order-connection-1
      destination: TESTQUEUE
      type: queue

    incoming.from-aq:
      connector: helidon-aq
      session-group-id: order-connection-1
      destination: TESTQUEUE
      type: queue</markup>

</div>

<h3 id="_consuming">Consuming</h3>
<div class="section">
<markup
lang="java"
title="Consuming one by one unwrapped value:"
>@Incoming("from-aq")
public void consumeAq(String msg) {
    System.out.println("Oracle AQ says: " + msg);
}</markup>

<markup
lang="java"
title="Consuming one by one, manual ack:"
>@Incoming("from-aq")
@Acknowledgment(Acknowledgment.Strategy.MANUAL)
public CompletionStage&lt;?&gt; consumeAq(AqMessage&lt;String&gt; msg) {
    // direct commit
    //msg.getDbConnection().commit();
    System.out.println("Oracle AQ says: " + msg.getPayload());
    // ack commits only in non-transacted mode
    return msg.ack();
}</markup>

</div>

<h3 id="_producing">Producing</h3>
<div class="section">
<markup
lang="java"
title="Producing to AQ:"
>@Outgoing("to-aq")
public PublisherBuilder&lt;String&gt; produceToAq() {
    return ReactiveStreams.of("test1", "test2");
}</markup>

</div>
</div>
</doc-view>