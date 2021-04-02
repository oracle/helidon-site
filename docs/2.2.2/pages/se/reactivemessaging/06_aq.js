<doc-view>

<h2 id="_reactive_oracle_aq_connector">Reactive Oracle AQ Connector</h2>
<div class="section">
<p>Connecting streams to Oracle Advanced Queueing with Reactive Messaging needs nothing more than one dependency.</p>

<markup
lang="xml"
title="Dependencies needed:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging.aq&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging-aq&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h3 id="_sending_and_receiving">Sending and receiving</h3>
<div class="section">
<markup
lang="java"
title="Example of producing to and consuming from Oracle AQ:"
>PoolDataSource pds = PoolDataSourceFactory.getPoolDataSource();<span class="conum" data-value="1" />
pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
pds.setURL("jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=192.168.0.123)(Port=1521))(CONNECT_DATA=(SID=XE)))");
pds.setUser("frank");
pds.setPassword("frank");

AqConnector seConn = AqConnector.builder()<span class="conum" data-value="2" />
    .dataSource("test-ds", pds)
    .build();

Channel&lt;String&gt; toAq = Channel.&lt;String&gt;builder()<span class="conum" data-value="3" />
    .name("toAq")
    .subscriberConfig(AqConnector.configBuilder()
        .queue("example_queue_1")
        .dataSource("test-ds")
        .build())
    .build();

Channel&lt;String&gt; fromAq = Channel.&lt;String&gt;builder()<span class="conum" data-value="4" />
    .name("fromAq")
    .publisherConfig(AqConnector.configBuilder()
        .queue("example_queue_1")
        .dataSource("test-ds")
        .build())
    .build();

Messaging.builder()<span class="conum" data-value="5" />
    .connector(seConn)
    .publisher(toAq, Multi.just("Hello", "world", "from", "Oracle", "DB!").map(Message::of))<span class="conum" data-value="6" />
    .listener(fromAq, s -&gt; System.out.pritln("Message received: "+s))<span class="conum" data-value="7" />
    .build()
    .start();</markup>

<ul class="colist">
<li data-value="1">Prepare Oracle UCP</li>
<li data-value="2">Setup AQ connector and provide datasource with an identifier <code>test-ds</code></li>
<li data-value="3">Setup channel for sending messages to queue <code>example_queue_1</code> with datasource <code>test-ds</code></li>
<li data-value="4">Setup channel for receiving messages from queue <code>example_queue_1</code> with datasource <code>test-ds</code></li>
<li data-value="5">Register connector and channels</li>
<li data-value="6">Add a publisher for several test messages to publish them to <code>example_queue_1</code> immediately</li>
<li data-value="7">Subscribe callback for any message coming from <code>example_queue_1</code></li>
</ul>
</div>
</div>
</doc-view>