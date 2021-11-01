<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OCI Object Storage</dt>
<dd slot="desc"><p>The Helidon SE OCI Object Storage integration provides a reactive API to files stored in Oracle cloud.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_experimental">Experimental</h2>
<div class="section">
<div class="admonition warning">
<p class="admonition-inline">Helidon integration with Oracle Cloud Infrastructure is still experimental and not intended for production use. APIs and features have not yet been fully tested and are subject to change.</p>
</div>
</div>

<h2 id="maven-coordinates">Maven Coordinates</h2>
<div class="section">
<p>To enable OCI Object Storage
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-integrations-oci-objectstorage&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

</div>

<h2 id="_setting_up_the_object_storage">Setting up the Object Storage</h2>
<div class="section">
<p>In order to use the OCI Object Storage integration, the following setup should be made:</p>

<markup
lang="java"

>Config ociConfig = config.get("oci");

OciObjectStorageRx ociObjectStorage = OciObjectStorageRx.create(ociConfig);</markup>

<p>Current configuration requires <code>~/.oci/config</code> to be available in the home folder. This configuration file can be downloaded from OCI.</p>

<p><code>Routing</code> should be added to the <code>WebServer</code>, in our case pointing to <code>/file</code>:</p>

<markup
lang="java"

>String bucketName = ociConfig.get("objectstorage").get("bucket").asString().get();

        WebServer.builder()
                .config(config.get("server"))
                .routing(Routing.builder()
                                 .register("/files", new ObjectStorageService(ociObjectStorage, bucketName)))
                .build()
                .start()
                .await()</markup>

<p>Additionally, in <code>application.yaml</code> OCI properties should be specified:</p>

<markup
lang="yaml"

>oci:
    properties:
      compartment-ocid: "ocid&lt;1&gt;tenancy.oc&lt;1&gt;.&lt;..&gt;"
      objectstorage-namespace: "&lt;...&gt;"
      objectstorage-bucket: "&lt;...&gt;"</markup>

<p>The exact values are available in OCI object storage and bucket properties.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/oci/ocibucket.png" alt="OCI Bucket" />
</v-card-text>
</v-card>

</div>

<h2 id="_using_the_object_storage">Using the Object Storage</h2>
<div class="section">
<p>In the Service we must specify the mapping for CRUD operations with the files and their handlers:</p>

<markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/file/{file-name}", this::download)
            .post("/file/{file-name}", this::upload)
            .delete("/file/{file-name}", this::delete)
            .get("/rename/{old-name}/{new-name}", this::rename);
}</markup>


<h3 id="_upload_file">Upload file</h3>
<div class="section">
<p>To upload a file to OCI Object Storage using the <code>PUT</code> method:</p>

<markup
lang="java"

>private void upload(ServerRequest req, ServerResponse res) {
    OptionalLong contentLength = req.headers().contentLength();
    if (contentLength.isEmpty()) {
        req.content().forEach(DataChunk::release);
        res.status(Http.Status.BAD_REQUEST_400).send("Content length must be defined");
        return;
    }

    String objectName = req.path().param("file-name");

    PutObject.Request request = PutObject.Request.builder() <span class="conum" data-value="1" />
            .objectName(objectName)
            .bucket(bucketName)
            .contentLength(contentLength.getAsLong());

    req.headers().contentType().ifPresent(request::requestMediaType); <span class="conum" data-value="2" />

    objectStorage.putObject(request,
                            req.content())
            .forSingle(response -&gt; res.send(response.requestId())) <span class="conum" data-value="3" />
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Create the <code>Request</code> using <code>PutObject.Request.builder()</code></li>
<li data-value="2">Define <code>MediaType</code></li>
<li data-value="3">Execute the request to OCI in asynchronous way and put the result in <code>response</code> object</li>
</ul>
</div>

<h3 id="_download_file">Download file</h3>
<div class="section">
<p>To download a file from OCI Object Storage using the <code>GET</code> method:</p>

<markup
lang="java"

>private void download(ServerRequest req, ServerResponse res) {
    String objectName = req.path().param("file-name");

    objectStorage.getObject(GetObject.Request.builder()
                                    .bucket(bucketName)
                                    .objectName(objectName)) <span class="conum" data-value="1" />
            .forSingle(apiResponse -&gt; {
                Optional&lt;GetObjectRx.Response&gt; entity = apiResponse.entity(); <span class="conum" data-value="2" />
                if (entity.isEmpty()) {
                    res.status(Http.Status.NOT_FOUND_404).send(); <span class="conum" data-value="3" />
                } else {
                    GetObjectRx.Response response = entity.get();
                    // copy the content length header to response
                    apiResponse.headers()
                            .first(Http.Header.CONTENT_LENGTH)
                            .ifPresent(res.headers()::add);
                    res.send(response.publisher()); <span class="conum" data-value="4" />
                }
            })
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Use <code>getObject</code> function to make asynchronous request to OCI Object Storage</li>
<li data-value="2">The result is of type <code>Optional</code></li>
<li data-value="3">Whenever the result is empty, return status <code>404</code></li>
<li data-value="4">Get the response, set headers and return the result as a <code>Publisher</code></li>
</ul>
</div>

<h3 id="_rename_file">Rename file</h3>
<div class="section">
<p>To rename an existing file in the OCI bucket, submit a <code>GET</code> method with two parameters:</p>

<markup
lang="java"

>private void rename(ServerRequest req, ServerResponse res) {
    String oldName = req.path().param("old-name");
    String newName = req.path().param("new-name");

    objectStorage.renameObject(RenameObject.Request.builder()
                                       .bucket(bucketName)
                                       .objectName(oldName)
                                       .newObjectName(newName)) <span class="conum" data-value="1" />
            .forSingle(it -&gt; res.send("Renamed to " + newName)) <span class="conum" data-value="2" />
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Use <code>renameObject</code> function and configure a <code>RenameObject.Request.builder()</code> to submit the rename request</li>
<li data-value="2">The request is made in asynchronous way; a <code>Single</code> is returned</li>
</ul>
</div>

<h3 id="_delete_file">Delete file</h3>
<div class="section">
<p>Finally, to delete a file, <code>DELETE</code> request should be used:</p>

<markup
lang="java"

>private void delete(ServerRequest req, ServerResponse res) {
    String objectName = req.path().param("file-name");

    objectStorage.deleteObject(DeleteObject.Request.builder()
                                       .bucket(bucketName)
                                       .objectName(objectName)) <span class="conum" data-value="1" />
            .forSingle(response -&gt; res.status(response.status()).send())
            .exceptionally(res::send);
}</markup>

<ul class="colist">
<li data-value="1">Use <code>deleteObject</code> function and configure a <code>DeleteObject.Request.builder()</code> to submit the delete request</li>
<li data-value="2">The request is made in asynchronous way; a <code>Single</code> is returned</li>
</ul>
</div>
</div>

<h2 id="_object_storage_health_check">Object Storage Health Check</h2>
<div class="section">
<p>If your Helidon application depends on Object Storage accessibility, you may consider setting
up a health check to verify connectivity with an OCI bucket. To do so, first add the following
dependency in your pom file:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-oci-objectstorage-health&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>In order to register the new health check in Helidon SE, create an instance of <code>HealthSupport</code>
and configure it as shown next:</p>

<markup
lang="java"

>HealthSupport health = HealthSupport.builder()
    .addLiveness(OciObjectStorageHealthCheck.builder()
                                            .ociObjectStorage(ociObjectStorage)
                                            .bucket(bucketName)
                                            .namespace(namespace)
                                            .build())
    .build();</markup>

<p>where <code>ociObjectStorage</code>, <code>bucketName</code> and <code>namespace</code> are as required for any other
Object Storage access. Finally, include your newly created <code>HealthSupport</code> object
as part of your application&#8217;s routing:</p>

<markup
lang="java"

>Routing routing = Routing.builder()
                         .register(health)
                         // other routes here
                         .build();</markup>

<p>When executed, this health check will <em>ping</em> the bucket to make sure it is accessible in your
environment. For more information about health checks see <router-link to="/se/health/01_health">Health Checks</router-link>.</p>

</div>
</doc-view>