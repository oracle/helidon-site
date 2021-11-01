<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OCI Autonomous Transaction Processing</dt>
<dd slot="desc"><p>The Helidon SE OCI Autonomous Transaction Processing integration provides a reactive API to ATP database in Oracle cloud.</p>
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
<p>To enable OCI Autonomous Transaction Processing
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>        &lt;dependency&gt;
            &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
            &lt;artifactId&gt;helidon-integrations-oci-atp&lt;/artifactId&gt;
        &lt;/dependency&gt;</markup>

</div>

<h2 id="_setting_up_the_autonomous_transaction_processing">Setting up the Autonomous Transaction Processing</h2>
<div class="section">
<p>In order to use the OCI Autonomous Transaction Processing integration, the following setup should be made:</p>

<markup
lang="java"

>Config ociConfig = config.get("oci");

OciAutonomousDbRx ociAutonomousDb = OciAutonomousDbRx.create(ociConfig);</markup>

<p>Current configuration requires <code>~/.oci/config</code> to be available in the home folder. This configuration file can be downloaded from OCI.</p>

<p><code>Routing</code> should be added to the <code>WebServer</code>, in our case pointing to <code>/atp</code>:</p>

<markup
lang="java"

>        WebServer.builder()
                .config(config.get("server"))
                .routing(Routing.builder()
                                .register("/atp", new AtpService(autonomousDbRx, config)))
                .build();</markup>

<p>Additionally, in <code>application.yaml</code> OCI properties should be specified:</p>

<markup
lang="yaml"

>oci:
  atp:
    ocid: "&lt;ocid of your ATP database&gt;"
    walletPassword: "&lt;password to encrypt the keys inside the wallet&gt;"</markup>

<p>The exact values are available from OCI console.</p>



<v-card>
<v-card-text class="overflow-y-hidden" style="text-align:center">
<img src="./images/oci/atpocid.png" alt="OCI ATP" />
</v-card-text>
</v-card>

</div>

<h2 id="_using_the_autonomous_transaction_processing">Using the Autonomous Transaction Processing</h2>
<div class="section">
<p>In the Service we must specify the mapping for operations with the database and their handlers:</p>

<markup
lang="java"

>@Override
public void update(Routing.Rules rules) {
    rules.get("/wallet", this::generateWallet);
}</markup>


<h3 id="_generate_wallet">Generate Wallet</h3>
<div class="section">
<p>To generate wallet file for OCI Autonomous Transaction Processing:</p>

<markup
lang="java"

>    private void generateWallet(ServerRequest req, ServerResponse res) {
        autonomousDbRx.generateWallet(GenerateAutonomousDatabaseWallet.Request.builder()) <span class="conum" data-value="1" />
                .flatMapOptional(ApiOptionalResponse::entity)
                .map(GenerateAutonomousDatabaseWallet.Response::walletArchive) <span class="conum" data-value="2" />
                .ifEmpty(() -&gt; LOGGER.severe("Unable to obtain wallet!"))
                .flatMapSingle(this::createDbClient) <span class="conum" data-value="3" />
                .flatMap(dbClient -&gt; dbClient.execute(exec -&gt; exec.query("SELECT 'Hello world!!' FROM DUAL")))
                .first()
                .map(dbRow -&gt; dbRow.column(1).as(String.class)) <span class="conum" data-value="4" />
                .ifEmpty(() -&gt; res.status(404).send())
                .onError(res::send)
                .forSingle(res::send);
    }</markup>

<ul class="colist">
<li data-value="1">Create the <code>Request</code> using <code>GenerateAutonomousDatabaseWallet.Request.builder()</code></li>
<li data-value="2">Retrieve 'walletArchive' from the response.</li>
<li data-value="3">Create DBClient using info from 'walletArchive'</li>
<li data-value="4">Read the first column from first row of result.</li>
</ul>
<p>For complete code, about how to create DBClient using wallet info, please see <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/integrations/oci/atp-reactive">ATP Reactive Example</a></p>

</div>
</div>
</doc-view>