<doc-view>

<h2 id="_message">Message</h2>
<div class="section">
<p>The Reactive Messaging
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_message">Message</a>
class can be used to wrap or unwrap data items between methods and connectors.
The message wrapping and unwrapping can be performed explicitly by using
<code>org.eclipse.microprofile.reactive.messaging.Message#of(T)</code> or implicitly through the messaging core.</p>

<markup
lang="java"
title="Example of explicit and implicit wrapping and unwrapping"
>@Outgoing("publisher-payload")
public PublisherBuilder&lt;Integer&gt; streamOfMessages() {
    return ReactiveStreams.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
}

@Incoming("publisher-payload")
@Outgoing("wrapped-message")
public Message&lt;String&gt; rewrapMessageManually(Message&lt;Integer&gt; message) {
    return Message.of(Integer.toString(message.getPayload()));
}

@Incoming("wrapped-message")
public void consumeImplicitlyUnwrappedMessage(String value) {
    System.out.println("Consuming message: " + value);
}</markup>


<h3 id="_acknowledgement">Acknowledgement</h3>
<div class="section">
<p>Message carries a callback for reception acknowledgement, acknowledgement in messaging methods is possible manually by
<code>org.eclipse.microprofile.reactive.messaging.Message#ack</code> or automatically according explicit
or implicit acknowledgement strategy by messaging core. Explicit strategy configuration is possible
with <code>@Acknowledgment</code> annotation which has one required attribute <code>value</code> that expects the strategy type from enum
<code>org.eclipse.microprofile.reactive.messaging.Acknowledgment.Strategy</code>. More information about supported signatures
and implicit automatic acknowledgement can be found in specification
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_message_acknowledgement">Message acknowledgement</a>.</p>

<div class="block-title"><span>Acknowledgement strategies</span></div>
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
<td class=""><code>@Acknowledgment(Acknowledgment.Strategy.NONE)</code></td>
<td class="">No acknowledgment</td>
</tr>
<tr>
<td class=""><code>@Acknowledgment(Acknowledgment.Strategy.MANUAL)</code></td>
<td class="">No automatic acknowledgment</td>
</tr>
<tr>
<td class=""><code>@Acknowledgment(Acknowledgment.Strategy.PRE_PROCESSING)</code></td>
<td class="">Ack automatically before method invocation or processing</td>
</tr>
<tr>
<td class=""><code>@Acknowledgment(Acknowledgment.Strategy.POST_PROCESSING)</code></td>
<td class="">Ack automatically after method invocation or processing</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="java"
title="Example of manual acknowledgment"
>@Outgoing("consume-and-ack")
public PublisherBuilder&lt;Integer&gt; streamOfMessages() {
    return ReactiveStreams.of(Message.of("This is Payload", () -&gt; {
            System.out.println("This articular message was acked!");
            return CompletableFuture.completedFuture(null);
        })).buildRs();
}

@Incoming("consume-and-ack")
@Acknowledgment(Acknowledgment.Strategy.MANUAL)
public void receiveAndAckMessage(Message&lt;String&gt; msg) {
    // Calling ack() will print "This articular message was acked!" to System.out
    msg.ack();
}</markup>

<markup
lang="java"
title="Example of manual acknowledgment"
>@Outgoing("consume-and-ack")
public PublisherBuilder&lt;Integer&gt; streamOfMessages() {
    return ReactiveStreams.of(Message.of("This is Payload", () -&gt; {
            System.out.println("This articular message was acked!");
            return CompletableFuture.completedFuture(null);
        })).buildRs();
}

@Incoming("consume-and-ack")
@Acknowledgment(Acknowledgment.Strategy.MANUAL)
public void receiveAndAckMessage(Message&lt;String&gt; msg) {
    // Calling ack() will print "This articular message was acked!" to System.out
    msg.ack();
}</markup>

<markup
lang="java"
title="Example of explicit pre-process acknowledgment"
>@Outgoing("consume-and-ack")
public PublisherBuilder&lt;Integer&gt; streamOfMessages() {
    return ReactiveStreams.of(Message.of("This is Payload", () -&gt; {
            System.out.println("This articular message was acked!");
            return CompletableFuture.completedFuture(null);
        })).buildRs();
}

/**
* Prints to the console:
* &gt; This articular message was acked!
* &gt; Method invocation!
*/
@Incoming("consume-and-ack")
@Acknowledgment(Acknowledgment.Strategy.PRE_PROCESSING)
public void receiveAndAckMessage(Message&lt;String&gt; msg) {
    System.out.println("Method invocation!");
}</markup>

<markup
lang="java"
title="Example of explicit post-rocess acknowledgment"
>@Outgoing("consume-and-ack")
public PublisherBuilder&lt;Integer&gt; streamOfMessages() {
    return ReactiveStreams.of(Message.of("This is Payload", () -&gt; {
            System.out.println("This articular message was acked!");
            return CompletableFuture.completedFuture(null);
        })).buildRs();
}

/**
* Prints to the console:
* &gt; Method invocation!
* &gt; This articular message was acked!
*/
@Incoming("consume-and-ack")
@Acknowledgment(Acknowledgment.Strategy.POST_PROCESSING)
public void receiveAndAckMessage(Message&lt;String&gt; msg) {
    System.out.println("Method invocation!");
}</markup>

</div>
</div>
</doc-view>