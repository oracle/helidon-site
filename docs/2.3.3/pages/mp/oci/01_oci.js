<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Oracle Cloud Infrastructure Integration</dt>
<dd slot="desc"><p>Helidon MP OCI Integration provides easy access to Oracle Cloud Infrastructure.</p>
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
<p>To enable OCI Integration
add the following dependency to your project&#8217;s <code>pom.xml</code> (see <router-link to="/about/04_managing-dependencies">Managing Dependencies</router-link>).</p>

<markup
lang="xml"

>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.oci&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-oci-cdi&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_general_configuration">General Configuration</h2>
<div class="section">
<div class="admonition note">
<p class="admonition-inline">If you follow these instructions on how to
<a id="" title="" target="_blank" href="https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#two">Generate an API Signing Key</a>,
be advised that Helidon does not currently support passphrase-protected private keys in PKCS#1 format.
If generating a private key using those instructions, use the <em>no passphrase</em> option.</p>
</div>

<h3 id="_using_helidon_mp_properties_configuration">Using Helidon MP Properties Configuration</h3>
<div class="section">
<p>The first option to configure connection to OCI is to directly specify properties in <code>microprofile-config.properties</code> file:</p>

<markup
lang="properties"

>oci.config.oci-profile.user=ocid1.user....
oci.config.oci-profile.fingerprint=1c:6c:....
oci.config.oci-profile.tenancy=ocid1.tenancy.oc1..
oci.config.oci-profile.region=us-...
oci.config.oci-profile.key-pem=&lt;pem content&gt;</markup>

</div>

<h3 id="_using_oci_configuration">Using OCI Configuration</h3>
<div class="section">
<p>The second option is via OCI configuration file. For authentication in OCI a special configuration file should be set up. The file is usually located at <code>~/.oci/config</code></p>

<markup
lang="properties"

>[DEFAULT]
user=ocid1.user....
fingerprint=1c:6c:....
tenancy=ocid1.tenancy.oc1..
region=us-...
key_file=&lt;path to key file&gt;</markup>

<p>For more information on setting up basic configuration information, see <a id="" title="" target="_blank" href="https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm#SDK_and_CLI_Configuration_File">SDK and CLI Configuration File</a> in OCI Developer Resources.</p>

</div>
</div>
</doc-view>