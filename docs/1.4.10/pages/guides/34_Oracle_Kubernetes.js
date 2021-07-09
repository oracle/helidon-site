<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Deploying to OKE</dt>
<dd slot="desc"><p>Push a Docker image of your Helidon application to Oracle Cloud Infrastructure
 Registry (OCIR), and deploy the image from the registry to Oracle Cloud
 Infrastructure Container Engine for Kubernetes (OKE).</p>
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

<div class="table__overflow elevation-1 ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td>About 10 minutes</td>
</tr>
<tr>
<td><router-link to="/about/03_prerequisites">Helidon prerequisites</router-link></td>
</tr>
<tr>
<td>An OKE cluster. See the <a id="" title="" target="_blank" href="http://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html">OKE documentation</a>.</td>
</tr>
<tr>
<td>A Helidon project created from the quickstart Maven archetype. See
 <router-link to="/guides/02_quickstart-se">quickstart Maven archetype</router-link>.</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_push_your_image_to_ocir">Push Your Image to OCIR</h2>
<div class="section">
<p>Your account must be in the <code>Administrators</code> group or another group that has
 the <code>REPOSITORY_CREATE</code> permission.</p>

<p>Sign in to the Oracle Cloud Infrastructure (OCI) web console and generate an
 authentication token. See <a id="" title="" target="_blank" href="https://docs.cloud.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm">Getting an Auth Token</a>.</p>

<div class="admonition note">
<p class="admonition-inline">Remember to copy the generated token. You won&#8217;t be able to access it
 again.</p>
</div>
<markup
lang="bash"
title="Log in to the OCIR Docker registry:"
>docker login \
       -u &lt;username&gt; \ <span class="conum" data-value="1" />
       -p &lt;password&gt; \ <span class="conum" data-value="2" />
       &lt;region-code&gt;.ocir.io <span class="conum" data-value="3" /></markup>

<ul class="colist">
<li data-value="1">The user name in the format <code>&lt;tenancy_name&gt;/&lt;username&gt;</code>.</li>
<li data-value="2">The password is the generated token.</li>
<li data-value="3"><code>&lt;region-code&gt;</code> is the code for the OCI region that you&#8217;re using. For
example, the region code for Phoenix is <code>phx</code>. See
<a id="" title="" target="_blank" href="https://docs.cloud.oracle.com/iaas/Content/General/Concepts/regions.htm">Regions and Availability Domains</a>.</li>
</ul>
<markup
lang="bash"
title="Tag the image that you want to push to the registry:"
>docker tag \
       helidon-quickstart-se:latest \ <span class="conum" data-value="1" />
       &lt;region-code&gt;.ocir.io/&lt;tenancy-name&gt;/&lt;repo-name&gt;/&lt;image-name&gt;:&lt;tag&gt; <span class="conum" data-value="2" /></markup>

<ul class="colist">
<li data-value="1">the local image to tag</li>
<li data-value="2"><code>&lt;repo-name&gt;</code> is optional. It is the name of a repository to which you want
to push the image (for example, <code>project01</code>).</li>
</ul>
<markup
lang="bash"
title="Push the image to the Registry:"
>docker push \
    &lt;region-code&gt;.ocir.io/&lt;tenancy-name&gt;/&lt;repo-name&gt;/&lt;image-name&gt;:&lt;tag&gt;</markup>

<p>You can pull your image with the image path used above, for example:
 <code>phx.ocir.io/helidon/example/helidon-quickstart-se:latest</code></p>

</div>

<h2 id="_setup_your_k8s_cluster">Setup your K8s Cluster</h2>
<div class="section">
<p>Create a namespace (for example, <code>helidon</code>) for the project:</p>

<markup
lang="bash"

>kubectl create namespace helidon</markup>

<p>The repository that you created is private. To allow Kubernetes to
 authenticate with the container registry and pull the private image, you must
 create and use an image-pull secret.</p>

<markup
lang="bash"
title="Create an image-pull secret:"
>kubectl create secret docker-registry \
    ocirsecret \ <span class="conum" data-value="1" />
    --docker-server=&lt;region-code&gt;.ocir.io \ <span class="conum" data-value="2" />
    --docker-username='&lt;tenancy-name&gt;/&lt;oci-username&gt;' \ <span class="conum" data-value="3" />
    --docker-password='&lt;oci-auth-token&gt;' \ <span class="conum" data-value="4" />
    --docker-email='&lt;email-address&gt;' \
    --namespace helidon <span class="conum" data-value="5" /></markup>

<ul class="colist">
<li data-value="1">The name of the config secret</li>
<li data-value="2">The docker registry (see docker tag step above)</li>
<li data-value="3">The user name (see docker login step above)</li>
<li data-value="4">The password (see docker login step above)</li>
<li data-value="5">The namespace created in the previous step</li>
</ul>

<h3 id="_deploy_the_image_to_kubernetes">Deploy the Image to Kubernetes</h3>
<div class="section">
<p>First, change to the <code>helidon-quickstart-se</code> directory.</p>

<p>Then edit <code>app.yaml</code> and add the following under <code>spec</code> in the <code>deployment</code>
 section:</p>

<markup
lang="yaml"

>spec:
  imagePullSecrets:
  - name: ocirsecret <span class="conum" data-value="1" />
  containers:
  - name: helidon-quickstart-se
    image: phx.ocir.io/helidon/example/helidon-quickstart-se:latest <span class="conum" data-value="2" />
    imagePullPolicy: Always
    ports:
    - containerPort: 8080</markup>

<ul class="colist">
<li data-value="1">The config secret name</li>
<li data-value="2">The image path</li>
</ul>
<markup
lang="bash"
title="Deploy the application:"
>kubectl create -f app.yaml -n helidon</markup>

<markup
lang="bash"
title="Get the <code>NodePort</code> number for your new pod:"
>kubectl get svc -n helidon</markup>

<markup
lang="bash"
title="Get the IP address for your cluster nodes:"
>kubectl get nodes</markup>

<p>You can now access the application at <code>http://&lt;NodeIpAddress&gt;:&lt;NodePort&gt;/greet</code>.</p>

</div>
</div>
</doc-view>