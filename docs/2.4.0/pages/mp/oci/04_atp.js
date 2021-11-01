<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>OCI Autonomous Transaction Processing</dt>
<dd slot="desc"><p>The Helidon MP OCI Autonomous Transaction Processing integration provides easy access to ATP database in Oracle cloud.</p>
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

<p>REST endpoint to work with OCI Autonomous Transaction Processing:</p>

<markup
lang="java"

>@Path("/atp")
public class AtpResource {
    private final OciAutonomousDb autonomousDb;
    private final PoolDataSource atpDataSource;
    private final String atpServiceName;

    @Inject
    AtpResource(OciAutonomousDb autonomousDb, <span class="conum" data-value="1" />
                @Named("atp") PoolDataSource atpDataSource,
                @ConfigProperty(name = "oracle.ucp.jdbc.PoolDataSource.atp.serviceName") String atpServiceName) { <span class="conum" data-value="2" />
        this.autonomousDb = autonomousDb;
        this.atpDataSource = Objects.requireNonNull(atpDataSource);
        this.atpServiceName = atpServiceName;
    }</markup>

<ul class="colist">
<li data-value="1"><code>OciAutonomousDb</code> is configured and injected automatically</li>
<li data-value="2">ATP ServiceName is read from the properties</li>
</ul>
<p>Additionally, in <code>microprofile-config.properties</code> OCI properties should be specified:</p>

<markup
lang="properties"

>oci.atp.ocid: "&lt;ocid of your ATP database&gt;"
oci.atp.walletPassword: "&lt;password to encrypt the keys inside the wallet&gt;"</markup>

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

>    @GET
    @Path("/wallet")
    public Response generateWallet() {
        ApiOptionalResponse&lt;GenerateAutonomousDatabaseWallet.Response&gt; ociResponse = autonomousDb.generateWallet(GenerateAutonomousDatabaseWallet.Request.builder()); <span class="conum" data-value="1" />
        Optional&lt;GenerateAutonomousDatabaseWallet.Response&gt; entity = ociResponse.entity();

        if (entity.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        GenerateAutonomousDatabaseWallet.Response response = entity.get();
        GenerateAutonomousDatabaseWallet.WalletArchive walletArchive = response.walletArchive(); <span class="conum" data-value="2" />
        String returnEntity = null;
        try {
            this.atpDataSource.setSSLContext(walletArchive.getSSLContext()); <span class="conum" data-value="3" />
            this.atpDataSource.setURL(walletArchive.getJdbcUrl(this.atpServiceName)); <span class="conum" data-value="3" />
            try(
                Connection connection = this.atpDataSource.getConnection();
                PreparedStatement ps = connection.prepareStatement("SELECT 'Hello world!!' FROM DUAL");
                ResultSet rs = ps.executeQuery()
            ){
                rs.next();
                returnEntity = rs.getString(1); <span class="conum" data-value="4" />
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error setting up DataSource", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.status(Response.Status.OK).entity(returnEntity).build();
    }</markup>

<ul class="colist">
<li data-value="1">Create the <code>Request</code> using <code>GenerateAutonomousDatabaseWallet.Request.builder()</code></li>
<li data-value="2">Retrieve 'walletArchive' from the response.</li>
<li data-value="3">Setup DataSource using info from 'walletArchive'</li>
<li data-value="4">Read the first column from first row of result.</li>
</ul>
<p>For complete code, about how to setup datasource using wallet info, please see <a id="" title="" target="_blank" href="https://github.com/oracle/helidon/tree/master/examples/integrations/oci/atp-cdi">ATP MP Example</a></p>

</div>
</div>
</doc-view>