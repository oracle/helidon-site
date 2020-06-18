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

<p>Helidon MP support is centered around annotations and bean discovery using
CDI. Developers can choose between annotated and programmatic endpoints or use
any combination of them. Using annotated endpoints is recommended in MP as
they usually result in more succinct and easier-to-read code.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_helidon_mp_example">Helidon MP Example</h2>
<div class="section">
<p>This section describes the implementation of a simple application
that uses a REST resource to push messages into a shared queue and a
WebSocket endpoint to download messages from the queue, one at a time,
over a connection.
The example will show how REST and WebSocket connections can
be seamlessly combined into a Helidon application.</p>

<p>The Helidon MP application shown here takes full advantage of
CDI and class scanning and does not require any additional code
given that the necessary information is available from the
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
    @Consumes("text/plain")
    public void push(String s) {
        messageQueue.push(s);
    }
}</markup>

<p>Here we opt for the use of an annotated WebSocket endpoint decorated
by <code>@ServerEndpoint</code> that provides all the meta-data necessary
for Helidon to create the endpoint.</p>

<markup
lang="java"

>@ServerEndpoint(
        value = "/websocket",
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
discovery to be enabled --typically in your <code>beans.xml</code> file.</p>

<p>By default, both JAX-RS resources and WebSocket endpoints will
be available under the <em>root path</em> <code>"/"</code>. This default value can be
overridden by providing subclasses/implementations for <code>jakarta.ws.rs.Application</code>
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
<code>"/"</code>. Note that <code>@RoutingPath</code> is <em>not</em> a bean defining annotation,
thus the need to use <code>@ApplicationScoped</code> --which, as before, requires CDI
bean discovery mode to be <code>annotated</code>. In addition to <code>@RoutingPath</code>, these
classes can be annotated with <code>@RoutingName</code> to associate an endpoint
with a Helidon named socket. Please refer to the Javadoc of that annotation
for additional information.</p>

<p>All endpoint methods in Helidon MP are executed in a separate thread pool,
independently of Netty. Therefore, there is no need to create additional threads
for blocking or long-running operations as these will not affect Netty&#8217;s ability
to process networking data.</p>

<p>For more information about this example, the reader is referred to [3].</p>

<ul class="ulist">
<li>
<p>[1] <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.tyrus">https://projects.eclipse.org/projects/ee4j.tyrus</a></p>

</li>
<li>
<p>[2] <a id="" title="" target="_blank" href="https://projects.eclipse.org/projects/ee4j.websocket">https://projects.eclipse.org/projects/ee4j.websocket</a></p>

</li>
<li>
<p>[3] <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/microprofile/websocket">https://github.com/oracle/helidon/tree/master/examples/microprofile/websocket</a></p>

</li>
</ul>
</div>
</doc-view>