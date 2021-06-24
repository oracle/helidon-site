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

<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">About 10 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
<tr>
<td class=""><router-link to="/mp/guides/02_quickstart">A Helidon MP application, such as Helidon MP Quickstart</router-link></td>
</tr>
</tbody>
</table>
</div>
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