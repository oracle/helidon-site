<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Reusing Helidon SE services</dt>
<dd slot="desc"><p>This guide shows how reuse Helidon SE Service in your Helidon MP application.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What You Need</h2>
<div class="section">
<p>For this 10 minute tutorial, you will need the following:</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">A Helidon MP Application</td>
<td class="">You can use your own application or use the <a id="" title="" target="_blank" href="https://helidon.io/docs/v2/#/mp/guides/02_quickstart">Helidon MP Quickstart</a> to create a sample application.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;11</a> (<a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;11</a>)</td>
<td class="">Helidon requires Java 11+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.6.1+</a></td>
<td class="">Helidon requires Maven 3.6.1+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://docs.docker.com/install/">Docker 18.09+</a></td>
<td class="">You need Docker if you
want to build and deploy Docker containers.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.16.5+</a></td>
<td class="">If you want to
deploy to Kubernetes, you need <code>kubectl</code> and a Kubernetes cluster (you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>).</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="bash"
title="Verify Prerequisites"
>java -version
mvn --version
docker --version
kubectl version --short</markup>

<markup
lang="bash"
title="Setting JAVA_HOME"
># On Mac
export JAVA_HOME=`/usr/libexec/java_home -v 11`

# On Linux
# Use the appropriate path to your JDK
export JAVA_HOME=/usr/lib/jvm/jdk-11</markup>

<p>Helidon MP supports <router-link to="/mp/jaxrs/10_reactive-routing">Reactive routing</router-link> which brings possibility for reusing
<code>io.helidon.webserver.Service</code> implementations in Helidon MP. Such feature can be quite useful for common
solutions for filtering, auditing, logging or augmenting REST endpoints in hybrid Helidon SE/MP environment.</p>

<p>Let&#8217;s define simple Helidon SE Service for adding special header to every REST response:</p>

<markup
lang="java"

>public class CoolingService implements Service, Handler {

    public static final String COOL_HEADER_NAME = "Cool-Header";
    public static final String COOLING_VALUE = "This is way cooler response than ";

    @Override
    public void update(Routing.Rules rules) {
        rules.any(this);
    }

    @Override
    public void accept(ServerRequest req, ServerResponse res) {
        res.headers().add(COOL_HEADER_NAME, COOLING_VALUE);
        req.next();
    }
}</markup>

<p>Its easy to use it with Helidon SE:</p>

<markup
lang="java"

>WebServer.builder(Routing.builder()
                    // register service with routing path
                    .register("/cool", new CoolingService())
                    .build())
                .config(config)
                .addMediaSupport(JsonpSupport.create())
                .build()
                .start();</markup>

<p>And not much harder to use it with Helidon MP:</p>

<markup
lang="java"

>@ApplicationScoped
public class MyBean {

    @Produces
    @ApplicationScoped
    @RoutingPath("/cool")
    public Service coolService() {
        return new CoolingService();
    }

}</markup>

<p>You can leverage annotations:</p>

<ul class="ulist">
<li>
<p>@RoutingPath - path of the WebServer service</p>

</li>
<li>
<p>@RoutingName - select routing when <router-link :to="{path: '/mp/jaxrs/02_server-configuration', hash: '#conf-additional-ports'}">serving requests on multiple ports</router-link></p>

</li>
</ul>
</div>
</doc-view>