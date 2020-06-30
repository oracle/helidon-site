<doc-view>

<h2 id="_reactive_messaging">Reactive Messaging</h2>
<div class="section">
<p><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html">MicroProfile Reactive Messaging</a>
uses CDI beans to produce, consume or process messages over Reactive Streams.
Such messaging bean is expected to be either in <code>ApplicationScoped</code> or <code>Dependent</code> scope.
Messages are managed by methods annotated by <code>@Incoming</code> and <code>@Outgoing</code>
and the invocation is always driven by message core - either at assembly time, or for every message coming from the stream.</p>

<div class="admonition warning">
<p class="admonition-inline">Messaging methods are not meant to be invoked directly!</p>
</div>
<div class="block-title"><span>Terms definition</span></div>
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
<td class=""><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_supported_method_signatures">messaging method</a></td>
<td class="">bean method invoked by messaging Specification</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_connector">connector</a></td>
<td class="">Reactive Messaging connector</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_channel">channel</a></td>
<td class="">named pair of producer and consumer, both sides can be either messaging method or connector</td>
</tr>
</tbody>
</table>
</div>
<p>The bean can have methods annotated by
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_message_consumption_with_incoming"><code>@Incoming</code></a>,
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_message_production_with_outgoing"><code>@Outgoing</code></a> or both.</p>


<h3 id="_consuming_methods_with_incoming_annotation">Consuming methods with <code>@Incoming</code> annotation</h3>
<div class="section">
<p>The annotation has one required attribute <code>value</code> that defines the channel name.</p>

<p>Such annotated <router-link to="#terms" @click.native="this.scrollFix('#terms')">messaging method</router-link> can function in two ways:</p>

<ul class="ulist">
<li>
<p>consume every message coming from the stream connected to the <router-link to="#terms" @click.native="this.scrollFix('#terms')">channel</router-link></p>

</li>
<li>
<p>prepare reactive stream&#8217;s subscriber and connect it to the channel</p>

</li>
</ul>
<markup
lang="java"
title="Example consuming every message from channel <code>example-channel-2</code>:"
>@Incoming("example-channel-2")
public void printMessage(String msg) {
    System.out.println("Just received message: " + msg);
}</markup>

<markup
lang="java"
title="Example preparing reactive stream subscriber for channel <code>example-channel-1</code>:"
>@Incoming("example-channel-2")
public Subscriber&lt;String&gt; printMessage() {
    return ReactiveStreams.&lt;String&gt;builder()
                .forEach(msg -&gt; System.out.println("Just received message: " + msg))
                .build();
}</markup>

</div>

<h3 id="_producing_methods_with_outgoing_annotation">Producing methods with <code>@Outgoing</code> annotation</h3>
<div class="section">
<p>The annotation has one required attribute <code>value</code> that defines the
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_channel">channel</a>
name.</p>

<p>Such annotated <router-link to="#terms" @click.native="this.scrollFix('#terms')">messaging method</router-link> can function in two ways:</p>

<ul class="ulist">
<li>
<p>produce exactly one message to the stream connected to the
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_channel">channel</a></p>

</li>
<li>
<p>prepare reactive stream&#8217;s publisher and connect it to the
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_channel">channel</a></p>

</li>
</ul>
<markup
lang="java"
title="Example producing exactly one message to channel <code>example-channel-1</code>:"
>@Outgoing("example-channel-1")
public String produceMessage() {
    return "foo";
}</markup>

<markup
lang="java"
title="Example preparing reactive stream publisher publishing three messages to the channel <code>example-channel-1</code>:"
>@Outgoing("example-channel-1")
public Publisher&lt;String&gt; printMessage() {
    return ReactiveStreams.of("foo", "bar", "baz").buildRs();
}</markup>

</div>

<h3 id="_processing_methods_with_incoming_and_outgoing_annotation">Processing methods with <code>@Incoming</code> and <code>@Outgoing</code> annotation</h3>
<div class="section">
<p>Such
<a id="" title="" target="_blank" href="https://download.eclipse.org/microprofile/microprofile-reactive-messaging-1.0/microprofile-reactive-messaging-spec.html#_method_consuming_and_producing">methods</a>
acts as processors, consuming messages from one channel and producing to another.</p>

<p>Such annotated <router-link to="#terms" @click.native="this.scrollFix('#terms')">messaging method</router-link> can function in multiple ways:</p>

<ul class="ulist">
<li>
<p>process every message</p>

</li>
<li>
<p>prepare reactive stream&#8217;s processor and connect it between the channels</p>

</li>
<li>
<p>on every message prepare new publisher(equivalent to <code>flatMap</code> operator)</p>

</li>
</ul>
<markup
lang="java"
title="Example processing every message from channel <code>example-channel-1</code> to channel <code>example-channel-2</code>:"
>@Incoming("example-channel-1")
@Outgoing("example-channel-2")
public String processMessage(String msg) {
    return msg.toUpperCase();
}</markup>

<markup
lang="java"
title="Example preparing processor stream to be connected between channels <code>example-channel-1</code> and <code>example-channel-2</code>:"
>@Incoming("example-channel-1")
@Outgoing("example-channel-2")
public Processor&lt;String, String&gt; processMessage() {
    return ReactiveStreams.&lt;String&gt;builder()
                .map(String::toUpperCase)
                .buildRs();
}</markup>

<markup
lang="java"
title="Example processing every message from channel <code>example-channel-1`as stream to be flattened to channel `example-channel-2</code>:"
>@Incoming("example-channel-1")
@Outgoing("example-channel-2")
public String processMessage(String msg) {
    return ReactiveStreams.of(msg.toUpperCase(), msg.toLowerCase()).buildRs();
}</markup>

</div>

<h3 id="_dependency">Dependency</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
   &lt;groupId&gt;io.helidon.microprofile.messaging&lt;/groupId&gt;
   &lt;artifactId&gt;helidon-microprofile-messaging&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>
</div>
</doc-view>