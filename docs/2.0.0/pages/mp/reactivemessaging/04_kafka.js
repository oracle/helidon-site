<doc-view>

<h2 id="_reactive_kafka_connector">Reactive Kafka Connector</h2>
<div class="section">
<p>Connecting streams to Kafka with Reactive Messaging couldn&#8217;t be easier.</p>

<markup
lang="xml"
title="Dependencies needed:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile.messaging&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-messaging&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging.kafka&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging-kafka&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

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
>@Incoming("from-kafka")
public void consumeKafka(String msg) {
    System.out.println("Kafka says: " + msg);
}</markup>

<markup
lang="java"
title="Example of producing to Kafka:"
>@Outgoing("to-kafka")
public PublisherBuilder&lt;String&gt; produceToKafka() {
    return ReactiveStreams.of("test1", "test2");
}</markup>

<p>Don&#8217;t forget to check out the examples with pre-configured Kafka docker image, for easy testing:</p>

<ul class="ulist">
<li>
<p><a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/messaging">https://github.com/oracle/helidon/tree/master/examples/messaging</a></p>

</li>
</ul>
</div>
</doc-view>