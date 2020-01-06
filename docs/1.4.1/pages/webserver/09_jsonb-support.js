<doc-view>

<h2 id="_json_b_support">JSON-B Support</h2>
<div class="section">
<p>The WebServer supports the <a id="" title="" target="_blank" href="http://json-b.net/">JSON-B
specification</a>. When this support is enabled, Java objects will be
serialized to and deserialized from JSON automatically using
<a id="" title="" target="_blank" href="https://github.com/eclipse-ee4j/yasson">Yasson</a>, an implementation of
the <a id="" title="" target="_blank" href="https://jcp.org/en/jsr/detail?id=367">JSON-B specification</a>.</p>


<h3 id="_maven_coordinates">Maven Coordinates</h3>
<div class="section">
<p>Declare the following dependency in your project:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.media.jsonb&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-media-jsonb-server&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h3 id="_usage">Usage</h3>
<div class="section">
<p>To enable JSON-B support, first create and
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/webserver/Routing.Builder.html#register-io.helidon.webserver.Service&#8230;&#8203;-">register</a>
a
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/media/jsonb/server/JsonBindingSupport.html"><code>JsonBindingSupport</code></a>
instance with a
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/webserver/Routing.Builder.html"><code>Routing.Builder</code></a>.
<code>JsonBindingSupport</code> is a <code>Service</code>, so it will install its own
<code>Handler</code> that will provide serialization and deserialization services
using <a id="" title="" target="_blank" href="https://github.com/eclipse-ee4j/yasson">Yasson</a>, an
implementation of the <a id="" title="" target="_blank" href="http://json-b.net/">JSON-B specification</a>.</p>

<markup
lang="java"
title="Create and register <code>JsonBindingSupport</code> first"
>final JsonBindingSupport jsonBindingSupport = JsonBindingSupport.create(); <span class="conum" data-value="1" />
final Routing.Builder routingBuilder = Routing.builder();
routingBuilder.register(jsonBindingSupport); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Create a <code>JsonBindingSupport</code> instance.  This instance may be
reused freely.</li>
<li data-value="2">Register that <code>JsonBindingSupport</code> instance to enable automatic
deserialization of Java objects from and serialization of Java objects
to JSON.</li>
</ul>
<p>Now that automatic JSON serialization and deserialization facilities
have been set up, you can register a <code>Handler</code> that works with Java
objects instead of raw JSON.  Deserialization from and serialization
to JSON will be handled according to the
<a id="" title="" target="_blank" href="https://jcp.org/en/jsr/detail?id=367">JSON-B specification</a>.</p>

<p>Suppose you have a <code>Person</code> class that looks like this:</p>

<markup
lang="java"
title="Hypothetical <code>Person</code> class"
>public class Person {

    private String name;

    public Person() {
        super();
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }
}</markup>

<p>Then you can set up a <code>Handler</code> like this:</p>

<markup
lang="java"
title="A <code>Handler</code> that works with Java objects instead of raw JSON"
>final Routing routing =
    routingBuilder.post("/echo", <span class="conum" data-value="1" />
                        Handler.create(Person.class, <span class="conum" data-value="2" />
                                       (req, res, person) -&gt; res.send(person)))) <span class="conum" data-value="3" />
    .build();</markup>

<ul class="colist">
<li data-value="1">Set up a route for <code>POST</code> requests using the
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/webserver/Routing.Builder.html#post-java.lang.String-io.helidon.webserver.Handler&#8230;&#8203;-"><code>Routing.Builder#post(String, Handler&#8230;&#8203;)</code> method</a></li>
<li data-value="2">Use the
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/webserver/Handler.html#create-java.lang.Class-io.helidon.webserver.Handler.EntityHandler-"><code>Handler#create(Class, Handler.EntityHandler)</code> method</a>
to install a <code>Handler.EntityHandler</code> that works with <code>Person</code> instances.</li>
<li data-value="3">This <code>Handler.EntityHandler</code> consumes a <code>Person</code> instance
(<code>person</code>) and simply echoes it back.  Note that there is no working
with raw JSON here.</li>
</ul>
<markup
lang="bash"
title="Example of posting JSON to the <code>/echo</code> endpoint"
>curl --noproxy '*' -X POST -H "Content-Type: application/json" \
    http://localhost:8080/echo -d '{"name":"Joe"}'
{"name":"Joe"}</markup>

</div>
</div>
</doc-view>