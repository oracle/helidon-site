<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Routing</dt>
<dd slot="desc"><p>Routing lets you use request matching criteria to bind requests to a <code>handler</code> that implements
your custom business logic. Matching criteria include one or more <strong>HTTP Method(s)</strong> and, optionally,
a request <strong>path matcher</strong>. Use the <code>RequestPredicate</code> class to specify more routing
criteria.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_basics">Basics</h2>
<div class="section">
<p>Routing also supports <em>Error Routing</em> which binds Java <code>Throwable</code> to the
 handling logic.</p>

<p>Configure HTTP request routing using <code>Routing.Builder</code>.</p>

<markup
lang="java"
title="Using Routing.Builder to specify how HTTP requests are handled"
>Routing routing = Routing.builder()
                         .get("/hello", (req, res) -&gt; res.send("Hello World!")) <span class="conum" data-value="1" />
                         .build();

WebServer webServer = WebServer.create(routing); <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">Handle all GETs to <code>/hello</code> path. Send the <code>Hello World!</code> string.</li>
<li data-value="2">Add the <code>routing</code> to the WebServer.</li>
</ul>
</div>

<h2 id="_http_method_routing">HTTP Method Routing</h2>
<div class="section">
<p><code>Routing.Builder</code> lets you specify how to handle each HTTP method. For example:</p>


<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 16.667%;">
<col style="width: 83.333%;">
</colgroup>
<thead>
<tr>
<th>HTTP Method</th>
<th>Routing.Builder example</th>
</tr>
</thead>
<tbody>
<tr>
<td class=""><strong>GET</strong></td>
<td class=""><code>.get((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><strong>PUT</strong></td>
<td class=""><code>.put((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><strong>POST</strong></td>
<td class=""><code>.post((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><strong>HEAD</strong></td>
<td class=""><code>.head((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><strong>DELETE</strong></td>
<td class=""><code>.delete((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><strong>TRACE</strong></td>
<td class=""><code>.trace((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><strong>OPTIONS</strong></td>
<td class=""><code>.options((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><em>any method</em></td>
<td class=""><code>.any((req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><em>multiple methods</em></td>
<td class=""><code>.anyOf(List.of(Http.Method.GET, Http.Method.POST), (req, res) -&gt; { /* handler */ })</code></td>
</tr>
<tr>
<td class=""><em>custom method</em></td>
<td class=""><code>.anyOf(Set.of(Http.RequestMethod.create("CUSTOM")), (req, res) -&gt; { /* handler */ })</code></td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_path_matcher_routing">Path Matcher Routing</h2>
<div class="section">
<p>You can combine HTTP method routing with request path matching.</p>

<markup
lang="java"

>Routing.builder()
       .post("/some/path", (req, res) -&gt; { /* handler */ })</markup>

<p>You can use <strong>path pattern</strong> instead of <em>path</em> with the following syntax:</p>

<ul class="ulist">
<li>
<p><code>/foo/bar/baz</code> - Exact path match against resolved path even with non-usual characters</p>

</li>
<li>
<p><code>/foo/{}/baz</code> - <code>{}</code> Unnamed regular expression segment <code>([^/]+)</code></p>

</li>
<li>
<p><code>/foo/{var}/baz</code> - Named regular expression segment <code>([^/]+)</code></p>

</li>
<li>
<p><code>/foo/{var:\d+}</code> - Named regular expression segment with a specified expression</p>

</li>
<li>
<p><code>/foo/{:\d+}</code> - Unnamed regular expression segment with a specified expression</p>

</li>
<li>
<p><code>/foo/{+var}</code> - Convenience shortcut for {var:.+}. A matcher is not a true URI template (as defined by RFC) but this convenience is in sync with the Apiary templates</p>

</li>
<li>
<p><code>/foo/{+}</code> - Convenience shortcut for unnamed segment with regular expression {:.+}</p>

</li>
<li>
<p><code>/foo[/bar]</code> - An optional block, which translates to the <code>/foo(/bar)?</code> regular expression</p>

</li>
</ul>
<div class="admonition important">
<p class="admonition-inline">Path (matcher) routing is <strong>exact</strong>. For example, a <code>/foo/bar</code> request is <strong>not</strong> routed to <code>.post('/foo', &#8230;&#8203;)</code>.</p>
</div>
<div class="admonition tip">
<p class="admonition-inline">Always start <em>path</em> and <em>path patterns</em> with the <code>/</code> character.</p>
</div>
</div>

<h2 id="anchor-requestpredicate">Request Predicate</h2>
<div class="section">
<p>Use the <code>RequestPredicate</code> utility class to identify more
 criteria. You can construct (build) a predicate based on typical request criteria such as
content type, or the existence of a header
or cookie. You can also construct a handler that only processes
requests accepted by the predicate. All other requests are <em>nexted</em>, meaning that they are routed to the next valid handler.</p>

<markup
lang="java"

>.post("/foo",
      RequestPredicate.create()
                      .containsHeader("my-gr8-header")
                      .accepts(MediaType.TEXT_PLAIN)
                      .and(this::isUserAuthenticated)
                      .thenApply((req, resp) -&gt; {
                           // Some logic
                      })
                      .otherwise((req, resp) -&gt; { /* Otherwise logic */ }); // Optional. Default logic is req.next()</markup>

</div>

<h2 id="_organizing_code_into_services">Organizing Code into Services</h2>
<div class="section">
<p>By implementing the <code>Service</code> interface you can organize your code into one
or more services, each with its own path prefix and set of handlers.</p>

<markup
lang="java"
title="Use <code>Routing.Builder.register</code> to register your service"
>.register("/hello", new HelloService())</markup>

<markup
lang="java"
title="Service implementation"
>public class HelloService implements Service {
    @Override
    public void update(Routing.Rules rules) {
        rules.get("/subpath", this::getHandler);
    }

    private void getHandler(ServerRequest request,
                            ServerResponse response) {
        // Some logic
    }
}</markup>

<p>In this example, the <code>GET</code> handler matches requests to <code>/hello/subpath</code>.</p>

</div>
</doc-view>