<doc-view>

<h2 id="_static_content_support">Static Content Support</h2>
<div class="section">
<p>Use the <code>StaticContentSupport</code> class to serve files and classpath resources.
<code>StaticContentSupport</code> can be created for any readable directory or classpath
 context root and registered on a path in <code>Routing</code>.</p>

<p>You can combine dynamic handlers with <code>StaticContentSupport</code> objects: if no file matches the request path, then the request is forwarded to
 the next handler.</p>

<markup
lang="java"

>Routing.builder()
       .register("/pictures", StaticContentSupport.create(Paths.get("/some/WEB/pics"))) <span class="conum" data-value="1" />
       .register("/", StaticContentSupport.builder("/static-content") <span class="conum" data-value="2" />
                                   .welcomeFileName("index.html") <span class="conum" data-value="3" />
                                   .build());</markup>

<ul class="colist">
<li data-value="1">Create a new <code>StaticContentSupport</code> object to serve data from the file system,
and associate it with the <code>"/pictures"</code> context path.</li>
<li data-value="2">Create a <code>StaticContentSupport</code> object to serve resources from the contextual
<code>ClassLoader</code>. The specific classloader can be also
   defined. A builder lets you provide more configuration values.</li>
<li data-value="3"><code>index.html</code> is the file that is returned if a directory is requested.</li>
</ul>
<p>A <code>StaticContentSupport</code> object can be created using <code>create(&#8230;&#8203;)</code> factory methods or a
 <code>builder</code>. The <code>builder</code> lets you provide more configuration values, including <em>welcome file-name</em>
 and mappings of filename extensions to media types.</p>

</div>
</doc-view>