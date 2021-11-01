<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Kafka Connector
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging.kafka&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging-kafka&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_reactive_kafka_connector">Reactive Kafka Connector</h2>
<div class="section">
<p>Connecting streams to Kafka with Reactive Messaging couldn&#8217;t be easier.</p>


<h3 id="_explicit_config_with_config_builder">Explicit config with config builder</h3>
<div class="section">
<markup
lang="java"
title="Example of consuming from Kafka:"
>String kafkaServer = config.get("app.kafka.bootstrap.servers").asString().get();
String topic = config.get("app.kafka.topic").asString().get();

Channel&lt;String&gt; fromKafka = Channel.&lt;String&gt;builder()<span class="conum" data-value="1" /><span class="conum" data-value="2" />
        .name("from-kafka")
        .publisherConfig(KafkaConnector.configBuilder()
                .bootstrapServers(kafkaServer)
                .groupId("example-group-" + session.getId())
                .topic(topic)
                .autoOffsetReset(KafkaConfigBuilder.AutoOffsetReset.LATEST)
                .enableAutoCommit(true)
                .keyDeserializer(StringDeserializer.class)
                .valueDeserializer(StringDeserializer.class)
                .build()
        )
        .build();

KafkaConnector kafkaConnector = KafkaConnector.create();<span class="conum" data-value="3" />

Messaging messaging = Messaging.builder()
        .connector(kafkaConnector)
        .listener(fromKafka, payload -&gt; {
            System.out.println("Kafka says: " + payload);
        })
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare a channel for connecting kafka connector with specific publisher configuration &#8594; listener</li>
<li data-value="2">Channel &#8594; connector mapping is automatic when using KafkaConnector.configBuilder()</li>
<li data-value="3">Prepare Kafka connector, can be used by any channel</li>
</ul>
<markup
lang="java"
title="Example of producing to Kafka:"
>String kafkaServer = config.get("app.kafka.bootstrap.servers").asString().get();
String topic = config.get("app.kafka.topic").asString().get();

Channel&lt;String&gt; toKafka = Channel.&lt;String&gt;builder()<span class="conum" data-value="1" /><span class="conum" data-value="2" />
        .subscriberConfig(KafkaConnector.configBuilder()
                .bootstrapServers(kafkaServer)
                .topic(topic)
                .keySerializer(StringSerializer.class)
                .valueSerializer(StringSerializer.class)
                .build()
        ).build();

KafkaConnector kafkaConnector = KafkaConnector.create();<span class="conum" data-value="3" />

messaging = Messaging.builder()
        .publisher(toKafka, Multi.just("test1", "test2").map(Message::of))
        .connector(kafkaConnector)
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare a channel for connecting kafka connector with specific publisher configuration &#8594; listener</li>
<li data-value="2">Channel &#8594; connector mapping is automatic when using KafkaConnector.configBuilder()</li>
<li data-value="3">Prepare Kafka connector, can be used by any channel</li>
</ul>
</div>

<h3 id="_implicit_helidon_config">Implicit Helidon Config</h3>
<div class="section">
<markup
lang="yaml"
title="Example of connector config:"
>mp.messaging:

  incoming.from-kafka:
    connector: helidon-kafka
    topic: messaging-test-topic-1
    auto.offset.reset: latest
    enable.auto.commit: true
    group.id: example-group-id

  outgoing.to-kafka:
    connector: helidon-kafka
    topic: messaging-test-topic-1

  connector:
    helidon-kafka:
      bootstrap.servers: localhost:9092
      key.serializer: org.apache.kafka.common.serialization.StringSerializer
      value.serializer: org.apache.kafka.common.serialization.StringSerializer
      key.deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value.deserializer: org.apache.kafka.common.serialization.StringDeserializer</markup>

<markup
lang="java"
title="Example of consuming from Kafka:"
>Config config = Config.create();

Channel&lt;String&gt; fromKafka = Channel.create("from-kafka");

KafkaConnector kafkaConnector = KafkaConnector.create();<span class="conum" data-value="1" />

Messaging messaging = Messaging.builder()
        .config(config)
        .connector(kafkaConnector)
        .listener(fromKafka, payload -&gt; {
            System.out.println("Kafka says: " + payload);
        })
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare Kafka connector, can be used by any channel</li>
</ul>
<markup
lang="java"
title="Example of producing to Kafka:"
>Config config = Config.create();

Channel&lt;String&gt; toKafka = Channel.create("to-kafka");

KafkaConnector kafkaConnector = KafkaConnector.create();<span class="conum" data-value="1" />

messaging = Messaging.builder()
        .config(config)
        .publisher(toKafka, Multi.just("test1", "test2").map(Message::of))
        .connector(kafkaConnector)
        .build()
        .start();</markup>

<ul class="colist">
<li data-value="1">Prepare Kafka connector, can be used by any channel</li>
</ul>
<p>Don&#8217;t forget to check out the examples with pre-configured Kafka docker image, for easy testing:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/messaging">https://github.com/oracle/helidon/tree/master/examples/messaging</a></p>

</li>
</ul>
</div>
</div>
</doc-view>