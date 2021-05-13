<doc-view>

<h2 id="_messaging_connector">Messaging Connector</h2>
<div class="section">
<p>Connector for Reactive Messaging is a factory producing Publishers and Subscribers for
Channels in Reactive Messaging. Messaging connector is just an implementation of
<code>IncomingConnectorFactory</code>, <code>OutgoingConnectorFactory</code> or both.</p>

<markup
lang="java"
title="Example connector <code>example-connector</code>:"
>@Connector("example-connector")
public class ExampleConnector implements IncomingConnectorFactory, OutgoingConnectorFactory {

   @Override
   public PublisherBuilder&lt;? extends Message&lt;?&gt;&gt; getPublisherBuilder(Config config) {
       return ReactiveStreams.of("foo", "bar")
               .map(Message::of);
   }

   @Override
   public SubscriberBuilder&lt;? extends Message&lt;?&gt;, Void&gt; getSubscriberBuilder(Config config) {
       return ReactiveStreams.&lt;Message&lt;?&gt;&gt;builder()
               .map(Message::getPayload)
               .forEach(o -&gt; System.out.println("Connector says: " + o));
   }
}</markup>

<markup
lang="yaml"
title="Example of channel to connector mapping config:"
>mp.messaging.outgoing.to-connector-channel.connector: example-connector
mp.messaging.incoming.from-connector-channel.connector: example-connector</markup>

<markup
lang="java"
title="Example producing to connector:"
>Messaging.builder()
         .connector(new ExampleConnector())
         .publisher(Channel.create("to-connector-channel"),
                ReactiveStreams.of("fee", "fie")
                    .map(Message::of)
         )
         .build()
         .start();

&gt; Connector says: fee
&gt; Connector says: fie</markup>

<markup
lang="java"
title="Example consuming from connector:"
>Messaging.builder()
        .connector(new ExampleConnector())
        .subscriber(Channel.create("from-connector-channel"),
                ReactiveStreams.&lt;Message&lt;String&gt;&gt;builder()
                    .peek(Message::ack)
                    .map(Message::getPayload)
                    .forEach(s -&gt; System.out.println("Consuming: " + s))
        )
        .build()
        .start();

&gt; Consuming: foo
&gt; Consuming: bar</markup>


<h3 id="_configuration">Configuration</h3>
<div class="section">
<p>Messaging connector in Helidon SE can be configured explicitly by API or implicitly
by config following notation of <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_configuration">MicroProfile Reactive Messaging</a>.</p>

<p>Configuration is being supplied to connector by Messaging implementation,
two mandatory attributes are always present:</p>

<ul class="ulist">
<li>
<p><code>channel-name</code> name of the channel which has this connector configured as Publisher or Subscriber, <code>Channel.create('name-of-channel')</code> in case of explicit configuration or <code>mp.messaging.incoming.name-of-channel.connector: connector-name</code> in case of implicit config</p>

</li>
<li>
<p><code>connector</code> name of the connector <code>@Connector("connector-name")</code></p>

</li>
</ul>
<markup
lang="java"
title="Example connector accessing configuration:"
>@Connector("example-connector")
public class ExampleConnector implements IncomingConnectorFactory {

    @Override
    public PublisherBuilder&lt;? extends Message&lt;?&gt;&gt; getPublisherBuilder(final Config config) {

        String firstPropValue = config.getValue("first-test-prop", String.class);<span class="conum" data-value="1" />
        String secondPropValue = config.getValue("second-test-prop", String.class);

        return ReactiveStreams.of(firstPropValue, secondPropValue)
                .map(Message::of);
    }
}</markup>

<ul class="colist">
<li data-value="1">Config context is merged from channel and connector contexts</li>
</ul>

<h4 id="_explicit_config">Explicit Config</h4>
<div class="section">
<p>An explicit config for channel&#8217;s publisher is possible with <code>Channel.Builder#publisherConfig(Config config)</code>
and for subscriber with <code>Channel.Builder#subscriberConfig(Config config)</code>.
Supplied <router-link to="/se/config/01_introduction">Helidon Config</router-link> is merged with
mandatory attributes and any implicit config found. Resulting config is served to Connector.</p>

<markup
lang="java"
title="Example consuming from Kafka connector with explicit config:"
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
<li data-value="1">Prepare channel for connecting kafka connector with specific publisher configuration &#8594; listener,</li>
<li data-value="2">Channel &#8594; connector mapping is automatic when using <code>KafkaConnector.configBuilder()</code></li>
<li data-value="3">Prepare Kafka connector, can be used by any channel</li>
</ul>
</div>

<h4 id="_implicit_config">Implicit Config</h4>
<div class="section">
<p>Implicit config without any hard-coding is possible with <router-link to="/se/config/01_introduction">Helidon Config</router-link>  following notation of <a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_configuration">MicroProfile Reactive Messaging</a>.</p>

<markup
lang="yaml"
title="Example of channel to connector mapping config with custom properties:"
>mp.messaging.incoming.from-connector-channel.connector: example-connector<span class="conum" data-value="1" />
mp.messaging.incoming.from-connector-channel.first-test-prop: foo<span class="conum" data-value="2" />
mp.messaging.connector.example-connector.second-test-prop: bar<span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">Channel &#8594; Connector mapping</li>
<li data-value="2">Channel configuration properties</li>
<li data-value="3">Connector configuration properties</li>
</ul>
<markup
lang="java"
title="Example consuming from connector:"
>Messaging.builder()
        .connector(new ExampleConnector())
        .listener(Channel.create("from-connector-channel"),
                    s -&gt; System.out.println("Consuming: " + s))
        .build()
        .start();

&gt; Consuming: foo
&gt; Consuming: bar</markup>

</div>
</div>

<h3 id="_reusability_in_mp_messaging">Reusability in MP Messaging</h3>
<div class="section">
<p>As the API is the same for <router-link to="/mp/reactivemessaging/01_introduction">MicroProfile Reactive Messaging</router-link>
connectors, all that is needed to make connector work in both ways is annotating it with
<code>@ApplicationScoped</code>. Such connector is treated as a bean in Helidon MP.</p>

<p>For specific informations about creating messaging connectors for Helidon MP visit
<router-link to="/mp/reactivemessaging/03_connector">Messaging Connector Bean</router-link>.</p>

</div>
</div>
</doc-view>