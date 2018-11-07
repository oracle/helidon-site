<doc-view>

<h2 id="_error_routing">Error Routing</h2>
<div class="section">
<p>You may register an error handler for a specific <code>Throwable</code> in the
 <code>Routing.Builder</code> method.</p>

<markup
lang="java"

>Routing routing = Routing.builder()
                        .error(MyException.class, (req, res, ex) -&gt; { <span class="conum" data-value="1" />
                            // handle the error, set the HTTP status code
                            res.send(errorDescriptionObject); <span class="conum" data-value="2" />
                        })
                        .build</markup>

<ul class="colist">
<li data-value="1">Registers an error handler that handles <code>MyException</code> that are thrown from the
upstream handlers</li>
<li data-value="2">Finishes the request handling by sending a response</li>
</ul>
<p>Error handlers are called when</p>

<ul class="ulist">
<li>
<p>an exception is thrown from a handler</p>

</li>
<li>
<p><code>req.next(ex)</code> is called, where <code>ex</code> is an instance of <code>Throwable</code></p>

</li>
</ul>
<p>As with the standard handlers, the error handler must either</p>

<ul class="ulist">
<li>
<p>send a response</p>
<markup
lang="java"

>.error(MyException.class, (req, res, ex) -&gt; {
    res.status(Http.Status.BAD_REQUEST_400);
    res.send("Unable to parse request. Message: " + ex.getMessage());
})</markup>

</li>
<li>
<p>or, forward the error handling to the downstream error handlers</p>
<markup
lang="java"

>.error(Throwable.class, (req, res, ex) -&gt; {
    // some logic
    req.next(ex);
})</markup>

</li>
</ul>
<p>Error handling can&#8217;t be forwarded to the standard
 handlers. In fact, invoking <code>req.next(ex)</code> or <code>req.next()</code> in an error handler
 are equivalent.</p>

<markup
lang="java"

>.error(Throwable.class, (req, res, ex) -&gt; {
    if (condition) {
        req.next(ex); <span class="conum" data-value="1" />
    } else {
        req.next(); <span class="conum" data-value="2" />
    }
})</markup>

<ul class="colist">
<li data-value="1">Call a downstream error handler with the <code>Throwable</code> instance.</li>
<li data-value="2">Here, <code>req.next()</code> is the same as <code>req.next(ex)</code>. In both cases, the downstream error handler is called.</li>
</ul>

<h3 id="_default_error_handling">Default error handling</h3>
<div class="section">
<p>If no user-defined error handler is matched, or if the last error handler of the
exception called <code>req.next()</code>, then the exception is translated to an HTTP response as follows:</p>

<ul class="ulist">
<li>
<p>Subtypes of <code>HttpException</code> are translated to their associated HTTP error codes.</p>
<markup
lang="java"
title="Reply with the <code>406</code> HTTP error code by throwing an exception"
>(req, res) -&gt; throw new HttpException("Amount of money must be greater than 0.", Http.Status.NOT_ACCEPTABLE_406) <span class="conum" data-value="1" /></markup>

</li>
<li>
<p>Otherwise, the exceptions are translated to an Internal Server Error HTTP
error code <code>500</code>.</p>

</li>
</ul>
</div>
</div>

<h2 id="_registering_an_application_organizing_code_into_services">Registering an application - Organizing code into services</h2>
<div class="section">
<p>You can also register an application that has its own handlers at a path prefix or context root.</p>

<markup
lang="java"
title="Registering routing logic for a context root"
>.register("/context-root", new MyComplexApplication())</markup>

<markup
lang="java"
title="Routing logic implementation"
>public class MyComplexApplication implements Consumer&lt;Routing.Config&gt; {
    @Override
    public void accept(Routing.Config config) {
        config.get("/subpath", (req, res) -&gt; {/* handler */});
    }
}</markup>

<p>In this example, the <code>GET</code> handler matches requests to <code>/context-root/subpath</code>.</p>

</div>
</doc-view>