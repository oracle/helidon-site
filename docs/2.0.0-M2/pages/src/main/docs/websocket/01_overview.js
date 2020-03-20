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
as servers as well as clients. The server API supports two flavors: annotated and
programmatic endpoints.</p>

<p>Annotated endpoints, as suggested by their name, use Java annotations to provide
the necessary meta-data to define WebSocket handlers; programmatic endpoints
implement API interfaces and are annotation free. Annotated endpoints tend to be
more flexible since they allow different method signatures depending on the
application needs, whereas programmatic endpoints must implement an interface
and are, therefore, bounded to its definition. This will become more clear as
we dive into some examples in the next few sections.</p>

<p>Helidon has support for WebSockets both in SE and in MP. Helidon SE support
is based on the <code>TyrusSupport</code> class which is akin to <code>JerseySupport</code>.
Helidon MP support is centered around annotations and bean discovery using
CDI.</p>

<p>As stated above, the Jakarta WebSocket API supports both annotated and
programmatic endpoints. Even though most Helidon MP applications rely
on the use of annotations, and conversely Helidon SE applications do
not, it is worth mentioning that annotated and programmatic endpoints
are supported in both SE and MP.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_running_example">Running Example</h2>
<div class="section">
<p>In the next few sections we shall show the implementation of a simple application
that uses a REST resource to push messages into a shared queue and a
WebSocket endpoint to download all messages, one at a time, over a connection.
This example will show how REST and WebSocket connections can
be seamlessly combined into a Helidon application.</p>

</div>

<h2 id="_helidon_se">Helidon SE</h2>
<div class="section">
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
receiving a message, it simply pushes it onto a shared queue and
returns 204 (No Content).</p>

<p>Messages pushed onto the queue can be obtained by opening a WebSocket
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

</div>

<h2 id="_helidon_mp">Helidon MP</h2>
<div class="section">
<p>The equivalent Helidon MP application shown here takes full advantage of
CDI and class scanning and does not require startup code to initialize
the routes given that the necessary information is available from the
code annotations.</p>

<p>The REST endpoint is implemented as a JAX-RS resource, and the shared
queue (in application scope) is directly injected:</p>

<markup
lang="java"

>@Path("rest")
public class MessageQueueResource {

    @Inject
    private MessageQueue messageQueue;

    @POST
    @Path("board")
    @Consumes("text/plain")
    public void push(String s) {
        messageQueue.push(s);
    }
}</markup>

<p>In this case, we opt for the use of an annotated WebSocket endpoint decorated
by <code>@ServerEndpoint</code> that provides all the meta-data which in the SE example
was part of <code>ServerEndpointConfig</code>.</p>

<markup
lang="java"

>@ServerEndpoint(
        value = "/board",
        encoders = { UppercaseEncoder.class })
public class MessageBoardEndpoint {

    @Inject
    private MessageQueue messageQueue;

    @OnMessage
    public void onMessage(Session session, String message) {
        if (message.equals("SEND")) {
            while (!messageQueue.isEmpty()) {
                session.getBasicRemote().sendObject(messageQueue.pop());
            }
        }
    }
}</markup>

<p>Since <code>MessageBoardEndpoint</code> is just a POJO, it uses additional
annotations for event handlers such as <code>@OnMessage</code>. One advantage of
this approach, much like in the JAX-RS API, is that method
signatures are not fixed. In the snipped above, the parameters
(which could be specified in any order!) include the WebSocket
session and the message received that triggered the call.</p>

<p>So what else is needed to run this Helidon MP app? Nothing else
other than the supporting classes <code>MessageQueue</code> and <code>UppercaseEncoder</code>.
Helidon MP declares both <code>@Path</code> and <code>@ServerEndpoint</code> as
bean defining annotation, so all that is needed is for CDI
discovery to be enabled.</p>

<p>By default, all JAX-RS resources will be placed under the
application path <code>"/"</code> and all WebSocket endpoints under
<code>"/websocket"</code> for separation. These values can be overridden
by providing subclasses/implementations for <code>jakarta.ws.rs.Application</code>
and <code>jakarta.websocket.server.ServerApplicationConfig</code>, respectively.
JAX-RS uses <code>@ApplicationPath</code> on application subclasses to provide
this root path, but since there is no equivalent in the WebSocket
API, Helidon MP uses its own annotation <code>@RoutingPath</code>
on <code>jakarta.websocket.server.ServerApplicationConfig</code> implementations.</p>

<p>For instance, if in our example we include the following class:</p>

<markup
lang="java"

>@ApplicationScoped
@RoutingPath("/web")
public class MessageBoardApplication implements ServerApplicationConfig {
    @Override
    public Set&lt;ServerEndpointConfig&gt; getEndpointConfigs(
            Set&lt;Class&lt;? extends Endpoint&gt;&gt; endpoints) {
        assert endpoints.isEmpty();
        return Collections.emptySet();      // No programmatic endpoints
    }

    @Override
    public Set&lt;Class&lt;?&gt;&gt; getAnnotatedEndpointClasses(Set&lt;Class&lt;?&gt;&gt; endpoints) {
        return endpoints;       // Returned scanned endpoints
    }
}</markup>

<p>the root path for WebSocket endpoints will be  <code>"/web"</code> instead of the default
<code>"/websocket"</code>. Note that <code>@RoutingPath</code> is <em>not</em> a bean defining annotation,
thus the use of <code>@ApplicationScoped</code> --which, as before, requires CDI
bean discovery mode to be <code>annotated</code>. In addition to <code>@RoutingPath</code>, these
classes can be annotated with <code>@RoutingName</code> to associate an endpoint
with a Helidon named socket. Please refer to the Javadoc for that annotation
for additional information.</p>

<p>Unlike Helidon SE, all endpoint methods in Helidon MP are executed in
a separate thread pool, independently of Netty. Therefore, there is no
need to create additional threads for blocking or long-running operations
as these will not affect Netty&#8217;s ability to process networking data.</p>

<p>For more information on the MP version of this example, the reader is
referred to [4].</p>

<ul class="ulist">
<li>
<p>[1] <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.tyrus">https://projects.eclipse.org/projects/ee4j.tyrus</a></p>

</li>
<li>
<p>[2] <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.websocket">https://projects.eclipse.org/projects/ee4j.websocket</a></p>

</li>
<li>
<p>[3] <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/websockets20/examples/webserver/websocket">https://github.com/oracle/helidon/tree/websockets20/examples/webserver/websocket</a></p>

</li>
<li>
<p>[4] <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/websockets20/examples/microprofile/websocket">https://github.com/oracle/helidon/tree/websockets20/examples/microprofile/websocket</a></p>

</li>
</ul>
</div>
</doc-view>