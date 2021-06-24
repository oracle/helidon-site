<doc-view>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable Jackson Support
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.media&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-media-jackson&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_jackson_support">Jackson Support</h2>
<div class="section">
<p>The WebServer supports
<a id="" title="" target="_blank" href="https://github.com/FasterXML/jackson#jackson-project-home-github">Jackson</a>.
When this support is enabled, Java objects will be serialized to and
deserialized from JSON automatically using Jackson.</p>


<h3 id="_usage">Usage</h3>
<div class="section">
<p>To enable Jackson support, first create and register a
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/media/jackson/JacksonSupport.html"><code>JacksonSupport</code></a>
instance with a
<a id="" title="" target="_blank" href="https://helidon.io/docs/latest/apidocs/io/helidon/webserver/WebServer.Builder.html"><code>WebServer.Builder</code></a>.</p>

<markup
lang="java"
title="Registration of the <code>JacksonSupport</code> via <code>WebServer</code>"
>JacksonSupport jacksonSupport = JacksonSupport.create(); <span class="conum" data-value="1" />
WebServer webServer = WebServer.builder()
    .addMediaSupport(jacksonSupport) <span class="conum" data-value="2" />
    .build();</markup>

<ul class="colist">
<li data-value="1">Create a <code>JacksonSupport</code> instance.  This instance may be
reused freely.</li>
<li data-value="2">Register that <code>JacksonSupport</code> instance to enable automatic
deserialization of Java objects from and serialization of Java objects
to JSON.</li>
</ul>
<p>Now that automatic JSON serialization and deserialization facilities
have been set up, you can register a <code>Handler</code> that works with Java
objects instead of raw JSON.  Deserialization from and serialization
to JSON will be handled by
<a id="" title="" target="_blank" href="https://github.com/FasterXML/jackson#jackson-project-home-github">Jackson</a>.</p>

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