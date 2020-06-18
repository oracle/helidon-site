<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>WebSocket Introduction</dt>
<dd slot="desc"><p>Helidon integrates with Tyrus [1] to provide support for the Jakarta WebSocket API [2].
The WebSocket API enables Java applications to participate in WebSocket interactions
as both servers and clients. The server API supports two flavors: annotated and
programmatic endpoints.</p>

<p>Annotated endpoints, as suggested by their name, use Java annotations to provide
the necessary meta-data to define WebSocket handlers; programmatic endpoints
implement API interfaces and are annotation free. Annotated endpoints tend to be
more flexible since they allow different method signatures depending on the
application needs, whereas programmatic endpoints must implement an interface
and are, therefore, bounded to its definition.</p>

<p>Helidon SE support is based on the <code>TyrusSupport</code> class which is
akin to <code>JerseySupport</code>, and enables Helidon application to
defined both annotated and programmatic WebSocket endpoints.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_helidon_se_example">Helidon SE Example</h2>
<div class="section">
<p>This section describes the implementation of a simple application
that uses a REST resource to push messages into a shared queue and a
programmatic WebSocket endpoint to download messages from the queue,
one at a time, over a connection.
The example will show how REST and WebSocket connections can
be seamlessly combined into a Helidon application.</p>

<p>The complete Helidon SE example is available here [3]. Let us start by
looking at <code>MessageQueueService</code>:</p>

<markup
lang="java"

>public class MessageQueueService implements Service {

    private final MessageQueue messageQueue = MessageQueue.instance();

    @Override
    public void update(Routing.Rules routingRules) {
        routingRules.post("/board", this::handlePost);
    }

    private void handlePost(ServerRequest request, ServerResponse response) {
        request.content().as(String.class).thenAccept(messageQueue::push);
        response.status(204).send();
    }
}</markup>

<p>This class exposes a REST resource where messages can be posted. Upon
receiving a message, it simply pushes it into a shared queue and
returns 204 (No Content).</p>

<p>Messages pushed into the queue can be obtained by opening a WebSocket
connection served by <code>MessageBoardEndpoint</code>:</p>

<markup
lang="java"

>public class MessageBoardEndpoint extends Endpoint {

    private final MessageQueue messageQueue = MessageQueue.instance();

    @Override
    public void onOpen(Session session, EndpointConfig endpointConfig) {
        session.addMessageHandler(new MessageHandler.Whole&lt;String&gt;() {
            @Override
            public void onMessage(String message) {
                try {
                    if (message.equals("SEND")) {
                        while (!messageQueue.isEmpty()) {
                            session.getBasicRemote().sendObject(messageQueue.pop());
                        }
                    }
                } catch (Exception e) {
                    // ...
                }
            }
        });
    }
}</markup>

<p>This is an example of a programmatic endpoint that extends <code>Endpoint</code>. The method
<code>onOpen</code> will be invoked for every new connection. In this example, the application
registers a message handler for strings, and when the special <code>SEND</code> message
is received, it empties the shared queue sending messages one at a time over
the WebSocket connection.</p>

<p>In Helidon SE, REST and WebSocket classes need to be manually registered into
the web server. This is accomplished via a <code>Routing</code> builder:</p>

<markup
lang="java"

>    List&lt;Class&lt;? extends Encoder&gt;&gt; encoders =
           Collections.singletonList(UppercaseEncoder.class);

    Routing.builder()
           .register("/rest", new MessageQueueService())
           .register("/websocket",
                TyrusSupport.builder().register(
                        ServerEndpointConfig.Builder.create(
                                MessageBoardEndpoint.class, "/board").encoders(
                                        encoders).build()).build())
                .build();
[source,java]</markup>

<p>This code snippet uses multiple builders for <code>Routing</code>, <code>TyrusSupport</code> and <code>ServerEndpointConfig</code>.
In particular, it registers <code>MessageBoardEndpoint.class</code> at <code>"/websocket/board"</code> and associates
with it a <em>message encoder</em>. For more information on message encoders and decoders the
reader is referred to [2]; in this example, <code>UppercaseEncoder.class</code> simply uppercases every
message sent from the server [3].</p>

<p>Endpoint methods in Helidon SE are executed in Netty&#8217;s worker thread pool. Threads in this
pool are intended to be <em>non-blocking</em>, thus it is recommended for any blocking or
long-running operation triggered by an endpoint method to be executed using a separate
thread pool. See the documentation for <code>io.helidon.common.configurable.ThreadPoolSupplier</code>.</p>

<ul class="ulist">
<li>
<p>[1] <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.tyrus">https://projects.eclipse.org/projects/ee4j.tyrus</a></p>

</li>
<li>
<p>[2] <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.websocket">https://projects.eclipse.org/projects/ee4j.websocket</a></p>

</li>
<li>
<p>[3] <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/webserver/websocket">https://github.com/oracle/helidon/tree/master/examples/webserver/websocket</a></p>

</li>
</ul>
</div>
</doc-view>