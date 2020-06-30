<doc-view>

<h2 id="_reactive_messaging">Reactive Messaging</h2>
<div class="section">
<p>Asynchronous messaging is a commonly used form of communication in the world of microservices.
While its possible to start building your reactive streams directly by combining operators and
connecting them to reactive APIs, with Helidon SE Reactive Messaging, you can now use prepared
tools for repetitive use case scenarios .</p>

<p>For example connecting your streams to external services usually requires a lot of boiler-plate
code for configuration handling, backpressure propagation, acknowledgement and more.</p>

<p>For such tasks there is a system of connectors, emitters and means to orchestrate them in Helidon,
called <strong>Reactive Messaging</strong>. It&#8217;s basically an API for connecting and configuring
Connectors and Emitters with your reactive streams thru so called <router-link to="#_channel" @click.native="this.scrollFix('#_channel')">Channels</router-link>.</p>

<p>You may wonder how <strong>Reactive Messaging</strong> relates to
<router-link to="/mp/reactivemessaging/01_introduction">MicroProfile Reactive Messaging</router-link>.
As the making of connectors or even configuring them can be repetitive task leading to
the same results, Helidon SE Reactive Messaging supports very same configuration format
for connectors as its MicroProfile counterpart does. Also, MP Connectors are reusable in
Helidon SE Messaging with some limitation(there is no CDI in Helidon SE).
All Messaging connectors in Helidon are made to be universally usable by Helidon MP and SE.</p>


<h3 id="_channel">Channel</h3>
<div class="section">
<p>Channel is a named pair of <code>Publisher</code> and <code>Subscriber</code>. Channels can be connected together by
<router-link to="#_processor" @click.native="this.scrollFix('#_processor')">processors</router-link>. Registering of <code>Publisher</code> or <code>Subscriber</code> for a channel can be done
by Messaging API, or configured implicitly for using registered <router-link to="/se/reactivemessaging/03_connector">connector</router-link>
for generating such <code>Publisher</code> or <code>Subscriber</code>.</p>

<markup
lang="java"
title="Example of simple channel:"
>Channel&lt;String&gt; channel1 = Channel.create("channel1");

Messaging.builder()
        .publisher(channel1, Multi.just("message 1", "message 2")
                                  .map(Message::of))
        .listener(channel1, s -&gt; System.out.println("Intecepted message " + s))
        .build()
        .start();</markup>

</div>

<h3 id="_processor">Processor</h3>
<div class="section">
<p>Processor is a typical reactive processor acting as a <code>Subscriber</code> to upstream and as a <code>Publisher</code>
to downstream. In terms of reactive messaging it is able to connect two <router-link to="#_channel" @click.native="this.scrollFix('#_channel')">channels</router-link> to one
reactive stream.</p>

<markup
lang="java"
title="Example of processor usage:"
>Channel&lt;String&gt; firstChannel = Channel.create("first-channel");
Channel&lt;String&gt; secondChannel = Channel.create("second-channel");

Messaging.builder()
        .publisher(secondChannel, ReactiveStreams.of("test1", "test2", "test3")
                .map(Message::of))
        .processor(secondChannel, firstChannel, ReactiveStreams.&lt;Message&lt;String&gt;&gt;builder()
                .map(Message::getPayload)
                .map(String::toUpperCase)
                .map(Message::of)
        )
        .subscriber(firstChannel, ReactiveStreams.&lt;Message&lt;String&gt;&gt;builder()
                .peek(Message::ack)
                .map(Message::getPayload)
                .forEach(s -&gt; System.out.println("Consuming message " + s)))
        .build()
        .start();

&gt;Consuming message TEST1
&gt;Consuming message TEST2
&gt;Consuming message TEST3</markup>

</div>

<h3 id="_message">Message</h3>
<div class="section">
<p>Reactive Messaging in Helidon SE uses the same concept of
<router-link to="/mp/reactivemessaging/02_message">message wrapping</router-link> as MicroProfile messaging.
The only notable difference is that SE Messaging does almost no implicit or automatic
acknowledgement due to <em>no magic</em> philosophy of Helidon SE.</p>

<p>Only exception to this are variants of methods <code>Messaging.Builder#listener</code> and
<code>Messaging.Builder#processor</code> with consumer or function params,  conveniently unwrapping payload
for you. After such implicit unwrapping is not possible to do a manual acknowledgement, therefore
implicit ack before callback is executed is necessary.</p>

</div>

<h3 id="_connector">Connector</h3>
<div class="section">
<p>Connector concept is a way for connecting <router-link to="#_channel" @click.native="this.scrollFix('#_channel')">channels</router-link> to external sources.
To make <router-link to="/se/reactivemessaging/03_connector">creation and usage of connectors</router-link>
as easy and versatile as possible, Helidon SE Messaging uses same API for connectors
like <router-link to="/mp/reactivemessaging/01_introduction">MicroProfile Reactive Messaging</router-link> does.
This allows connectors to be usable in both flavors of Helidon with one limitation which is
that connector has to be able to work without CDI.</p>

<p>Example of such a versatile connector is Helidon&#8217;s own:</p>

<ul class="ulist">
<li>
<p><router-link to="/se/reactivemessaging/04_kafka">Kafka connector</router-link></p>

</li>
</ul>
</div>

<h3 id="_dependency">Dependency</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.messaging&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-messaging&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</div>
</doc-view>