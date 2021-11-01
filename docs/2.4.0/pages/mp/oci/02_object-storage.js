<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OCI Object Storage</dt>
<dd slot="desc"><p>The Helidon MP OCI Object Storage integration provides easy access files stored in Oracle cloud.</p>
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

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-oci-objectstorage&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_setting_up_the_object_storage">Setting up the Object Storage</h2>
<div class="section">
<p>In order to use the OCI Object Storage integration, the following setup should be made:</p>

<p>Current configuration requires <code>~/.oci/config</code> to be available in the home folder. This configuration file can be downloaded from OCI.</p>

<p>REST endpoint to work with OCI Object Storage:</p>

<markup
lang="java"

>@Path("/files")
public class ObjectStorageResource {
    private final OciObjectStorage objectStorage;
    private final String bucketName;

    @Inject
    ObjectStorageResource(OciObjectStorage objectStorage, <span class="conum" data-value="1" />
                          @ConfigProperty(name = "oci.objectstorage.bucket")
                                  String bucketName) { <span class="conum" data-value="2" />
        this.objectStorage = objectStorage;
        this.bucketName = bucketName;
    }
}</markup>

<ul class="colist">
<li data-value="1"><code>OciObjectStorage</code> is configured and injected automatically</li>
<li data-value="2">Bucket name is read from the properties</li>
</ul>
<p>Additionally, in <code>microprofile-config.properties</code> OCI properties should be specified:</p>

<markup
lang="properties"

>oci.properties.compartment-ocid: "ocid1.tenancy.oc1..&lt;..&gt;"
oci.properties.objectstorage-namespace: "&lt;..&gt;"
oci.properties.objectstorage-bucket: "demobucket"</markup>

<p>The exact values are available in OCI object storage and bucket properties.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/oci/ocibucket.png" alt="OCI Bucket" />
</v-card-text>
</v-card>

</div>

<h2 id="_using_object_storage">Using Object Storage</h2>
<div class="section">

<h3 id="_upload_file">Upload file</h3>
<div class="section">
<p>To upload a file to OCI Object Storage using the <code>PUT</code> method:</p>

<markup
lang="java"

>@POST
@Path("/file/{fileName}")
public Response upload(@PathParam("fileName") String fileName,
                     @HeaderParam("Content-Length") long contentLength,
                     @HeaderParam("Content-Type") @DefaultValue("application/octet-stream") String type,
                     InputStream entity) {
    PutObject.Response response = objectStorage.putObject(PutObject.Request.builder() <span class="conum" data-value="1" />
                                                                  .contentLength(contentLength)
                                                                  .bucket(bucketName)
                                                                  .requestMediaType(io.helidon.common.http.MediaType
                                                                                            .parse(type))
                                                                  .objectName(fileName),
                                                          Channels.newChannel(entity));

    return Response.status(response.status().code()) <span class="conum" data-value="2" />
            .header("opc-request-id", response.headers().first("opc-request-id").orElse(""))
            .header("request-id", response.requestId())
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Use <code>objectStorage.putObject</code> method with`PutObject.Request.builder()` to submit data</li>
<li data-value="2">Put the result in the <code>Response</code></li>
</ul>
</div>

<h3 id="_download_file">Download file</h3>
<div class="section">
<p>To download a file from OCI Object Storage using the <code>GET</code> method:</p>

<markup
lang="java"

>@GET
@Path("/file/{file-name}")
public Response download(@PathParam("file-name") String fileName) {
    ApiOptionalResponse&lt;GetObject.Response&gt; ociResponse = objectStorage.getObject(GetObject.Request.builder() <span class="conum" data-value="1" />
                                                                                                  .bucket(bucketName)
                                                                                                  .objectName(fileName));
    Optional&lt;GetObject.Response&gt; entity = ociResponse.entity(); <span class="conum" data-value="2" />

    if (entity.isEmpty()) {
        return Response.status(Response.Status.NOT_FOUND).build(); <span class="conum" data-value="3" />
    }

    GetObject.Response response = entity.get();

    StreamingOutput stream = output -&gt; response.writeTo(Channels.newChannel(output));

    Response.ResponseBuilder ok = Response.ok(stream, MediaType.APPLICATION_OCTET_STREAM_TYPE) <span class="conum" data-value="4" />
            .header(Http.Header.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
            .header("opc-request-id", ociResponse.headers().first("opc-request-id").orElse(""))
            .header("request-id", ociResponse.requestId());

    ociResponse.headers()
            .first(Http.Header.CONTENT_TYPE)
            .ifPresent(ok::type);

    ociResponse.headers()
            .first(Http.Header.CONTENT_LENGTH)
            .ifPresent(it -&gt; ok.header(Http.Header.CONTENT_LENGTH, it));

    return ok.build();
}</markup>

<ul class="colist">
<li data-value="1">Use <code>getObject</code> function to make asynchronous request to OCI Object Storage</li>
<li data-value="2">The result is of type <code>Optional</code></li>
<li data-value="3">Whenever the result is empty, return status <code>404</code></li>
<li data-value="4">Get the response, set headers and return the result</li>
</ul>
</div>

<h3 id="_delete_file">Delete file</h3>
<div class="section">
<p>Finally, to delete a file, <code>DELETE</code> request should be used:</p>

<markup
lang="java"

>@DELETE
@Path("/file/{file-name}")
public Response delete(@PathParam("file-name") String fileName) {
    DeleteObject.Response response = objectStorage.deleteObject(DeleteObject.Request.builder() <span class="conum" data-value="1" />
                                                                        .bucket(bucketName)
                                                                        .objectName(fileName));

    return Response.status(response.status().code()) <span class="conum" data-value="2" />
            .header("opc-request-id", response.headers().first("opc-request-id").orElse(""))
            .header("request-id", response.requestId())
            .build();
}</markup>

<ul class="colist">
<li data-value="1">Use <code>deleteObject</code> function and configure a <code>DeleteObject.Request.builder()</code> to submit the delete request</li>
<li data-value="2">Return the result</li>
</ul>
</div>
</div>

<h2 id="_object_storage_health_checks">Object Storage Health Checks</h2>
<div class="section">
<p>If your Helidon application depends on Object Storage accessibility, you may consider setting
up a health check to verify connectivity with one ore more OCI buckets in a namespace.
To do so, first add the following dependency to your pom file:</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-oci-objectstorage-health&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

<p>By adding this dependency to your application, you get a (built-in) health check automatically
registered for you. This health check is controlled by the Config properties <code>oci.objectstorage.namespace</code>
and <code>oci.objectstorage.healthchecks</code>, in addition to the user-specific configuration under <code>~/.oci/config</code>.</p>

<p>The value of <code>oci.objectstorage.healthchecks</code> must denote a list of bucket names to check. For example:</p>

<markup
lang="yaml"

>oci:
  objectstorage:
    namespace: "mynamespace"
    healthchecks: [ "myfirstbucket", "mysecondbucket" ]</markup>

<p>When executed, this health check will <em>ping</em> the buckets <code>myfirstbucket</code> and <code>mysecondbucket</code> in
<code>mynamespace</code> to make sure they are accessible in your environment. The <code>data</code> object in a
health check JSON response shall include a status code (e.g., 200) for each bucket in your
list, as well as an <code>UP</code> status for the health check itself if and only if all buckets are
successfully pinged.</p>

<p>Note that OCI operations such as these may incur some significant latency.
For more information about health checks see <router-link to="/mp/health/01_introduction">MicroProfile Health</router-link>.</p>

</div>
</doc-view>