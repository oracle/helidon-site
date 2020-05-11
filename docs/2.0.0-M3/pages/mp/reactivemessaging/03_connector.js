<doc-view>

<h2 id="_connector_bean">Connector Bean</h2>
<div class="section">
<p>Messaging connector is just an application scoped bean which implements
<code>IncomingConnectorFactory</code>, <code>OutgoingConnectorFactory</code> or both.</p>

<markup
lang="java"
title="Example connector <code>example-connector</code>:"
>@ApplicationScoped
@Connector("example-connector")
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
>@Outgoing("to-connector-channel")
public Publisher&lt;String&gt; produce() {
   return Flowable.just("fee", "fie");
}

&gt; Connector says: fee
&gt; Connector says: fie</markup>

<markup
lang="java"
title="Example consuming from connector:"
>@Incoming("from-connector-channel")
public void consume(String value) {
   System.out.println("Consuming: " + value);
}

&gt; Consuming: foo
&gt; Consuming: bar</markup>


<h3 id="_configuration">Configuration</h3>
<div class="section">
<markup
lang="java"
title="Example connector accessing configuration:"
>@ApplicationScoped
@Connector("example-connector")
public class ExampleConnector implements IncomingConnectorFactory {

    @Override
    public PublisherBuilder&lt;? extends Message&lt;?&gt;&gt; getPublisherBuilder(final Config config) {

        // Config context is merged from channel and connector contexts
        String firstPropValue = config.getValue("first-test-prop", String.class);
        String secondPropValue = config.getValue("second-test-prop", String.class);

        return ReactiveStreams.of(firstPropValue, secondPropValue)
                .map(Message::of);
    }
}</markup>

<markup
lang="yaml"
title="Example of channel to connector mapping config with custom properties:"
># Channel -&gt; Connector mapping
mp.messaging.incoming.from-connector-channel.connector: example-connector
# Channel configuration properties
mp.messaging.incoming.from-connector-channel.first-test-prop: foo
# Connector configuration properties
mp.messaging.connector.example-connector.second-test-prop: bar</markup>

<markup
lang="java"
title="Example consuming from connector:"
>@Incoming("from-connector-channel")
public void consume(String value) {
   System.out.println("Consuming: " + value);
}

&gt; Consuming: foo
&gt; Consuming: bar</markup>

</div>
</div>
</doc-view>