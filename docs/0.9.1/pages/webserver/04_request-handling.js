<doc-view>

<h2 >Request Handling</h2>
<div class="section">
<p>Implement the logic to handle requests to WebServer in a <code>Handler</code>, which is a <code>FunctionalInterface</code>.
 Handlers:</p>

<ul class="ulist">
<li>
<p>Process the request and <router-link to="#anchor-sending-response" @click.native="this.scrollFix('#anchor-sending-response')">send</router-link> a response.</p>

</li>
<li>
<p>Act as a filter and forward requests to downstream handlers using the <code>request.next()</code>
method.</p>

</li>
<li>
<p>Throw an exception or call <code>request.next(exception)</code> to begin
<router-link to="/webserver/05_error-handling">error handling</router-link>.</p>

</li>
</ul>

<h3 >Process Request and Produce Response</h3>
<div class="section">
<p>Each <code>Handler</code> has two parameters. <code>ServerRequest</code> and <code>ServerResponse</code>.</p>

<ul class="ulist">
<li>
<p>Request provides access to the request method, URI, path, query parameters,
headers and entity.</p>

</li>
<li>
<p>Response provides an ability to set response code, headers, and entity.</p>

</li>
</ul>
</div>

<h3  id="anchor-filtering">Handler as a Filter</h3>
<div class="section">
<p>The handler forwards the request to the downstream handlers by
 <em>nexting</em>. There are two options:</p>

<ul class="ulist">
<li>
<p>call <code>req.next()</code></p>
<markup
lang="java"

>.any("/hello", (req, res) -&gt; { <span class="conum" data-value="1" />
    // filtering logic  <span class="conum" data-value="2" />
    req.next(); <span class="conum" data-value="3" />
})</markup>

<ul class="colist">
<li data-value="1">handler for any HTTP method using the <code>/hello</code> path</li>
<li data-value="2">business logic implementation</li>
<li data-value="3">forward the current request to the downstream handler</li>
</ul>
</li>
<li>
<p>call <code>req.next(throwable)</code> to forward the handling to the
<router-link to="/webserver/05_error-handling">error handlers</router-link></p>
<markup
lang="java"

>.any("/hello", (req, res) -&gt; { <span class="conum" data-value="1" />
    // filtering logic (e.g., validating parameters) <span class="conum" data-value="2" />
    if (userParametersOk()) {
        req.next(); <span class="conum" data-value="3" />
    } else {
        req.next(new IllegalArgumentException("Invalid parameters."); <span class="conum" data-value="4" />
    }
})</markup>

<ul class="colist">
<li data-value="1">handler for any HTTP method using the <code>/hello</code> path</li>
<li data-value="2">custom logic</li>
<li data-value="3">forward the current request to the downstream handler</li>
<li data-value="4">forward the request to the error handler</li>
</ul>
</li>
</ul>
<p>The handling logic can explicitly forward the execution to a different thread.
This is the reason why returning from the handler can&#8217;t automatically
 trigger calling the next handler.</p>

</div>

<h3  id="anchor-sending-response">Sending a response</h3>
<div class="section">
<p>To complete the request handling, you must send a response by calling the <code>res.send()</code> method.</p>

<markup
lang="java"

>.get("/hello", (req, res) -&gt; { <span class="conum" data-value="1" />
    // terminating logic
    res.status(Http.Status.ACCEPTED_201);
    res.send("Saved!"); <span class="conum" data-value="2" />
})</markup>

<ul class="colist">
<li data-value="1">handler that terminates the request handling for any HTTP method using the <code>/hello</code> path</li>
<li data-value="2">send the response</li>
</ul>
</div>
</div>
</doc-view>
