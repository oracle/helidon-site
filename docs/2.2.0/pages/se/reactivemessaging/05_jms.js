<doc-view>

<h2 id="_reactive_jms_connector">Reactive JMS Connector</h2>
<div class="section">
<p>Connecting streams to JMS with Reactive Messaging couldn&#8217;t be easier.</p>

<markup
lang="xml"
title="Dependencies needed:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging.jms&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging-jms&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>


<h3 id="_explicit_config_with_config_builder">Explicit config with config builder</h3>
<div class="section">
<markup
lang="java"
title="Example of consuming from JMS:"
>Channel&lt;String&gt; fromJms = Channel.&lt;String&gt;builder()<span class="conum" data-value="1" /><span class="conum" data-value="2" />
        .name("from-jms")
        .publisherConfig(JmsConnector.configBuilder()
                .jndiInitialFactory(ActiveMQInitialContextFactory.class)
                .jndiProviderUrl("tcp://127.0.0.1:61616")
                .type(JmsConfigBuilder.Type.QUEUE)
                .destination("se-example-queue-1")
                .build()
        )
        .build();

JmsConnector jmsConnector = JmsConnector.create();<span class="conum" data-value="3" />

Messaging messaging = Messaging.builder()
        .connector(jmsConnector)
        .listener(fromJms, payload -&gt; {
            System.out.println("Jms says: " + payload);
        })
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare a channel for connecting jms connector with specific publisher configuration &#8594; listener</li>
<li data-value="2">Channel &#8594; connector mapping is automatic when using JmsConnector.configBuilder()</li>
<li data-value="3">Prepare JMS connector, can be used by any channel</li>
</ul>
<markup
lang="java"
title="Example of producing to JMS:"
>Channel&lt;String&gt; toJms = Channel.&lt;String&gt;builder()<span class="conum" data-value="1" /><span class="conum" data-value="2" />
        .subscriberConfig(JmsConnector.configBuilder()
                .jndiInitialFactory(ActiveMQInitialContextFactory.class)
                .jndiProviderUrl("tcp://127.0.0.1:61616")
                .type(JmsConfigBuilder.Type.QUEUE)
                .destination("se-example-queue-1")
                .build()
        ).build();

JmsConnector jmsConnector = JmsConnector.create();<span class="conum" data-value="3" />

messaging = Messaging.builder()
        .publisher(toJms, Multi.just("test1", "test2").map(Message::of))
        .connector(jmsConnector)
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare a channel for connecting jms connector with specific publisher configuration &#8594; listener</li>
<li data-value="2">Channel &#8594; connector mapping is automatic when using JmsConnector.configBuilder()</li>
<li data-value="3">Prepare JMS connector, can be used by any channel</li>
</ul>
</div>

<h3 id="_implicit_helidon_config">Implicit Helidon Config</h3>
<div class="section">
<markup
lang="yaml"
title="Example of connector config:"
>mp.messaging:

  incoming.from-jms:
    connector: helidon-jms
    destination: se-example-queue-1
    session-group-id: session-group-1
    type: queue

  outgoing.to-jms:
    connector: helidon-jms
      destination: se-example-queue-1
      type: queue

  connector:
    helidon-jms:
      jndi:
        jms-factory: ConnectionFactory
        env-properties:
          java.naming.factory.initial: org.apache.activemq.jndi.ActiveMQInitialContextFactory
          java.naming.provider.url: tcp://127.0.0.1:61616</markup>

<markup
lang="java"
title="Example of consuming from JMS:"
>Channel&lt;String&gt; fromJms = Channel.create("from-jms");

JmsConnector jmsConnector = JmsConnector.create();<span class="conum" data-value="1" />

Messaging messaging = Messaging.builder()
        .connector(jmsConnector)
        .listener(fromJms, payload -&gt; {
            System.out.println("Jms says: " + payload);
        })
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare JMS connector, can be used by any channel</li>
</ul>
<markup
lang="java"
title="Example of producing to JMS:"
>Channel&lt;String&gt; toJms = Channel.create("to-jms");

JmsConnector jmsConnector = JmsConnector.create();<span class="conum" data-value="1" />

messaging = Messaging.builder()
        .publisher(toJms, Multi.just("test1", "test2").map(Message::of))
        .connector(jmsConnector)
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare JMS connector, can be used by any channel</li>
</ul>
<p>Don&#8217;t forget to check out the examples with pre-configured ActiveMQ docker image, for easy testing:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/messaging">https://github.com/oracle/helidon/tree/master/examples/messaging</a></p>

</li>
</ul>
</div>
</div>
</doc-view>