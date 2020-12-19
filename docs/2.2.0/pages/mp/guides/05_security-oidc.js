<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP OIDC Security Provider</dt>
<dd slot="desc"><p>This guide describes how to set up Keycloak and Helidon
to secure an application with OIDC security provider.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_what_you_need">What you need</h2>
<div class="section">

<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">About 20 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
</tbody>
</table>
</div>
<ul class="ulist">
<li>
<p><router-link to="#_keycloak_installation" @click.native="this.scrollFix('#_keycloak_installation')">Keycloak Installation</router-link></p>

</li>
<li>
<p><router-link to="#_set_up_keycloak" @click.native="this.scrollFix('#_set_up_keycloak')">Set up Keycloak</router-link></p>

</li>
<li>
<p><router-link to="#_set_up_helidon" @click.native="this.scrollFix('#_set_up_helidon')">Set up Helidon</router-link></p>

</li>
<li>
<p><router-link to="#_restrict_access_to_a_specific_role" @click.native="this.scrollFix('#_restrict_access_to_a_specific_role')">Restrict access to a specific role</router-link></p>

</li>
</ul>

<h3 id="_keycloak_installation">Keycloak Installation</h3>
<div class="section">

<h4 id="_on_docker">On Docker</h4>
<div class="section">
<p>To install Keycloak with Docker, open a terminal and make sure the port 8080 is free.</p>

<markup
lang="bash"
title="Enter the following command"
>docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:11.0.2</markup>

<p>This will start Keycloak on local port 8080. It will create the admin user with username <code>admin</code> and password <code>admin</code>
Feel free to modify 11.0.2 by any keycloak version of your wish.
If you are running docker behind a proxy server, make sure it is either configured into docker or
disabled. Otherwise, you might face a connection timeout because docker cannot download the required data.</p>

<p>To verify that Keycloak is running correctly, go to the admin console : <a id="" title="" target="_blank" href="http://localhost:8080/auth/admin">http://localhost:8080/auth/admin</a>
Log in using the username and password mentioned above: <code>admin</code>.</p>

<p>You should be logged in successfully, and it prompts the admin console.</p>

</div>

<h4 id="_on_jdk">On JDK</h4>
<div class="section">
<p>Download the last version of Keycloak from Keycloak website : <a id="" title="" target="_blank" href="https://www.keycloak.org/downloads">https://www.keycloak.org/downloads</a>
In the table Server choose Standalone server distribution. ZIP or Tar format are available, click on either
to download Keycloak.</p>

<p>After extracting the archive file, you should have a directory named keycloak followed by the version. For example,
if you chose version 11.0.2, the folder must be named keycloak-11.0.2.</p>

<p>Open keycloak folder to make it your current directory.</p>

<markup
lang="bash"
title="Run this command from command prompt to open the directory:"
>cd keycloak-11.0.2</markup>


<h5 id="_start_keycloak">Start Keycloak</h5>
<div class="section">
<p>To start keycloak and have it ready for further steps, run the following command.</p>

<markup
lang="bash"
title="On Linux run:"
>bin/standalone.sh</markup>

<markup
lang="bash"
title="On Windows run:"
>bin/standalone.bat</markup>

<p>Keycloak runs on localhost:8080 by default.</p>

</div>

<h5 id="_create_an_admin_user">Create an admin user</h5>
<div class="section">
<p>You need to create an admin user because it does not come by default when installing Keycloak.
To do this, open  <a id="" title="" target="_blank" href="http://localhost:8080/auth">http://localhost:8080/auth</a> in your favorite browser.</p>

<p>A window <code>Welcome to Keycloak</code> should be prompted. If not, check if any error appear in the terminal.</p>

<p>Fill the form by adding Username and Password. Click on <code>Create</code> to create the admin user.</p>

<p>Above Administration Console should be printed "User created" in a green rectangle.</p>

<p>To check that the admin user was created correctly, click on Administration user which should redirect you
to a Login form. Enter the Username and Password created earlier to log in.</p>

<p>After successfully logged in, the admin console is prompted.</p>

</div>
</div>
</div>

<h3 id="_set_up_keycloak">Set up Keycloak</h3>
<div class="section">
<p>To set up Keycloak properly, go to the admin console: <a id="" title="" target="_blank" href="http://localhost:8080/auth/admin">http://localhost:8080/auth/admin</a></p>

<p>If you are using Docker, use Username <code>admin</code> and password <code>admin</code> as it is the default admin user.
Otherwise, use the username and password you used to create the admin user.</p>


<h4 id="_create_a_realm">Create a realm</h4>
<div class="section">
<p>A realm is the place where groups of applications, and their environment, can be created. It gathers :</p>

<ul class="ulist">
<li>
<p>One or several applications</p>

</li>
<li>
<p>One or several users</p>

</li>
<li>
<p>Sessions</p>

</li>
<li>
<p>Events</p>

</li>
<li>
<p>Clients and their scopes</p>

</li>
</ul>
<p>By default, there is a realm called <code>Master</code>. It is used to manage Keycloak. It is not recommended to associate your
application with this realm as it could disturb Keycloak functioning.</p>

<p>To create a new realm to manage your application:</p>

<ol style="margin-left: 15px;">
<li>
Open Keycloak admin console <a id="" title="" target="_blank" href="http://localhost:8080/auth/admin">http://localhost:8080/auth/admin</a>.

</li>
<li>
Hover the mouse over the dropdown in the top-left corner where it says <code>Master</code>, and press <code>Add realm</code>.

</li>
<li>
Fill the form by adding the realm name, <code>myRealm</code> for example.

</li>
<li>
Click on <code>Create</code> to create the new realm.

</li>
</ol>
<p>To verify that your realm is created, on the top-left corner where it said <code>Master</code> previously
should be now your realm name or <code>myRealm</code> is you followed the example.</p>

<p>To switch from a realm to another, hover the realm name, and the other realm created appear in the dropdown.
Click on any realm name to change the current realm. Make sure all configuration or modification are saved before changing
the current realm or be subject to lose your configuration.</p>

</div>

<h4 id="_create_a_user">Create a user</h4>
<div class="section">
<p>Initially there are no users in a new realm. An unlimited number of user can be created per realm.
A realm contains resources such as client which can be accessed by users.</p>

<p>To create a new user:</p>

<ol style="margin-left: 15px;">
<li>
Open the Keycloak admin console: <a id="" title="" target="_blank" href="http://localhost:8080/auth/admin">http://localhost:8080/auth/admin</a>

</li>
<li>
Click on <code>Users</code> in the left menu

</li>
<li>
Press <code>Add user</code>

</li>
<li>
Fill the form (Username is the only mandatory field) with this value Username: <code>myUser</code>

</li>
<li>
Click <code>Save</code>

</li>
</ol>
<p>A new user is just created but it needs a password to be able to login. To initialize it, do this:</p>

<ol style="margin-left: 15px;">
<li>
Click on <code>Credentials</code> at the top of the page, under <code>Myuser</code>.

</li>
<li>
Fill <code>Password</code> and <code>Password confirmation</code> with the user password of your choice.

</li>
<li>
If the <code>Temporary</code> field is set to <code>ON</code>, the user has to  update password on next login. Click <code>ON</code>
to make it <code>OFF</code> and prevent it.

</li>
<li>
Press <code>Set Password</code>.

</li>
<li>
A pop-up window is popping off. Click on <code>Set Password</code> to confirm the new password.

</li>
</ol>
<p>To verify that the new user is created correctly:</p>

<ol style="margin-left: 15px;">
<li>
Open the Keycloak account console: <a id="" title="" target="_blank" href="http://localhost:8080/auth/realms/myRealm/account">http://localhost:8080/auth/realms/myRealm/account</a>.

</li>
<li>
Login with <code>myUser</code> and password chosen earlier.

</li>
</ol>
<p>You should now be logged-in to the account console where users can manage their accounts.</p>

</div>

<h4 id="_create_a_client">Create a Client</h4>
<div class="section">
<p>To create your first client:</p>

<ol style="margin-left: 15px;">
<li>
Open the Keycloak admin console: <a id="" title="" target="_blank" href="http://localhost:8080/auth/admin">http://localhost:8080/auth/admin</a>.

</li>
<li>
Make sure the current realm is <code>myRealm</code> and not <code>Master</code>.

</li>
<li>
Navigate to the left menu, into configure section, click on <code>Clients</code>. This window displays a table with every client
from the realm.

</li>
<li>
Click on <code>Create</code>.

</li>
<li>
Fill the following:
<ol style="margin-left: 15px;">
<li>
<code>Client ID</code> : <code>myClientID</code>

</li>
<li>
<code>Client Protocol</code> : <code>openid-connect</code>

</li>
</ol>
</li>
<li>
Press <code>Save</code>
<ol style="margin-left: 15px;">
<li>
Modify <code>Access type</code> : <code>confidential</code>

</li>
<li>
Update <code>Valid Redirect URIs</code> : <a id="" title="" target="_blank" href="http://localhost:7987/*">http://localhost:7987/*</a>

</li>
<li>
Click on <code>+</code> to add the new URI.

</li>
</ol>
</li>
<li>
Click on <code>Save</code>.

</li>
</ol>
<p>A new tab named <code>Credentials</code> is created. Click on it to access this new tab.</p>

<ul class="ulist">
<li>
<p>Select <code>Client Authenticator</code> : <code>Client ID and Secret</code></p>

</li>
<li>
<p>Click on <code>generate secret</code> to generate client secret.</p>

</li>
</ul>
<p>Keycloak is now configured and ready. Keep keycloak running on your terminal and open a new tab to
set up Helidon.</p>

</div>
</div>

<h3 id="_set_up_helidon">Set up Helidon</h3>
<div class="section">
<p>Use the Helidon MP Maven archetype to create a simple project. It will be used as an example
to show how to set up Helidon. Replace <code>2.2.0</code> by the latest helidon version.
It will download the quickstart project into the current directory.</p>

<markup
lang="bash"
title="Run the Maven archetype"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.2.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<markup
lang="bash"
title="The project will be built and run from the helidon-quickstart-mp directory:"
>cd helidon-quickstart-mp</markup>


<h4 id="_update_project_dependencies">Update project dependencies</h4>
<div class="section">
<p>Update the pom.xml file and add the following Helidon dependency to the <code>&lt;dependencies&gt;</code> section.</p>

<markup
lang="xml"
title="Add the following dependency to <code>pom.xml</code>:"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.microprofile&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-microprofile-oidc&lt;/artifactId&gt;
&lt;/dependency&gt;</markup>

</div>

<h4 id="_add_oidc_security_properties">Add OIDC security properties</h4>
<div class="section">
<p>The OIDC security provider configuration can be joined to helidon configuration file.
This file is located here: <code>src/main/resources/application.yaml</code>. It can be easily used to configure the web server
without modifying application code.</p>

<markup
lang="yaml"
title="Create application.yaml file and add the following line"
>security:
  providers:
    - abac:
      # Adds ABAC Provider - it does not require any configuration
    - oidc:
        redirect-uri: "/oidc/redirect/*"
        audience: "account"
        client-id: "myClientID"   <span class="conum" data-value="1" />
        client-secret: "Client secret generated into Keycloak client credential"  <span class="conum" data-value="2" />
        identity-uri: "http://localhost:8080/auth/realms/myRealm"   <span class="conum" data-value="3" />
        frontend-uri: "http://localhost:7987"   <span class="conum" data-value="4" /></markup>

<ul class="colist">
<li data-value="1"><code>client-id</code> must be the same as the one configure in keycloak.</li>
<li data-value="2">The client secret generate by Keycloak during <code>Create a client</code> section.</li>
<li data-value="3"><code>identity-uri</code> is used to redirect the user to keycloak.</li>
<li data-value="4"><code>frontend-uri</code> will direct you back to the application.</li>
</ul>
<p>The client secret is the one generate into Keycloak Client Credentials. It must be copy past into <code>client-id</code> variable
from application.yaml.</p>

<p>Make sure keycloak and the application are not running on the same port.
The application port value can be changed into microprofile-config.properties.</p>

<markup
lang="properties"
title="Change these properties to configure the server host and port"
>server.port=7987
server.host=localhost</markup>

<p>If the port 7987 is already used, check what port is free on your machine.</p>

<markup
lang="properties"
title="Replace the old port into microprofile-config.properties"
>server.port="{Your-new-port}"</markup>

<markup
lang="yaml"
title="Replace the old port into application.yaml"
>frontend-uri: "http://localhost:{Your-new-port}"</markup>

</div>

<h4 id="_secure_your_application">Secure your application</h4>
<div class="section">
<p>The <code>GreetResource</code> class is a JAX-RS resource available at the endpoint <code>/greet</code>. Use <code>@Authenticated</code> annotation to protect
any method or endpoint.
Modify the <code>getDefaultMessage</code> method with the <code>@Authenticated</code> to limit its access.</p>

<markup
lang="java"
title="Import <code>Authenticated</code> annotation:"
>import io.helidon.security.annotations.Authenticated;</markup>

<markup
lang="java"
title="Add <code>@Authenticated</code> to secure <code>getDefaultMessage</code>"
>    @Authenticated
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getDefaultMessage() {
        return createResponse("World");
    }</markup>

<p>When a client will send an HTTP GET request at the endpoint <code><a id="" title="" target="_blank" href="http://localhost:7987/greet">http://localhost:7987/greet</a></code>, he will be redirected to keycloak.
Keycloak will check if the client has the required authorisation to access this endpoint. If the client can log in successfully,
keycloak redirect it to the wished endpoint. If the client cannot log in, or the required access data are incomplete,
Keycloak refuses the access.</p>

</div>

<h4 id="_try_it">Try it !</h4>
<div class="section">
<p>Now, Helidon and Keycloak are correctly configured, and your application is safe.</p>

<markup
lang="bash"
title="Build the application, skipping unit tests, then run it:"
>mvn package -DskipTests=true
java -jar target/helidon-quickstart-mp.jar</markup>

<p>The tests must be skipped, otherwise it produces test failure. As the <code>/greet</code> endpoint for GET request is
now protected, its access is limited, and the tests are not built to take oidc security in account.</p>

<ol style="margin-left: 15px;">
<li>
Open your favourite browser and try to access <code><a id="" title="" target="_blank" href="http://localhost:7987/greet/Michael">http://localhost:7987/greet/Michael</a></code>.

</li>
<li>
You should not be redirected and receive greeting from the application.

</li>
<li>
Enter the following into URL : <code><a id="" title="" target="_blank" href="http://localhost:7987/greet">http://localhost:7987/greet</a></code>.

</li>
<li>
Keycloak redirect you to its login page.

</li>
<li>
Enter the username and associated password:
<ol style="margin-left: 15px;">
<li>
<code>Username</code> : <code>myUser</code>

</li>
<li>
<code>Password</code>: <code>password</code>

</li>
</ol>
</li>
<li>
After successful log in, keycloak redirect you to the <code><a id="" title="" target="_blank" href="http://localhost:7987/greet">http://localhost:7987/greet</a></code> endpoint and print Hello word.

</li>
<li>
Press <code>Ctrl+C</code> to stop the application.

</li>
</ol>
<p>From the actual settings, the user needs to log in only once, then Keycloak saves all the connection data.</p>

</div>

<h4 id="_update_tests_to_the_secure_environment">Update tests to the secure environment</h4>
<div class="section">
<p>At this stage of the application, tests cannot pass because of OIDC security. The only way to authenticate a user is
through the front end of that server which can be accessed with the browser for example.</p>

<p>In order to keep security and test the application locally, a new security provider must be provided. By adding specific
configuration to the test, it is possible to override the application configuration.</p>

<p>The following explains how to set a basic authentication instead of oidc security provider only for the tests. Which means,
at the end of this guide, the application will be secured by oidc and the tests will use basic authentication.</p>

<p>In the test folder <code>helidon-quickstart-mp/src/test</code>:</p>

<markup
lang="bash"
title="Create a new directory and another one inside"
>mkdir resources
cd resources
touch application.yaml</markup>

<p>Open the application.yaml file you just created.</p>

<markup
lang="yaml"
title="Copy these properties into the new application.yaml"
>app:
  greeting: "Hello"

server:
  port: 7987
  host: localhost

security:
  providers:
    - abac:
    - http-basic-auth:
        users:
          - login: "jack"
            password: "jackIsGreat"</markup>

<p>By adding this new application.yaml, it will append the properties to the application.yaml located into <code>java/resources</code>.
The oidc properties are not overridden, and the server cannot decide which security provider to choose.</p>

<p>Excluding oidc dependency during the test leaves only basic authentication security available for the tests.</p>

<markup
lang="xml"
title="Add this plugin to the build"
>&lt;plugin&gt;
    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;maven-surefire-plugin&lt;/artifactId&gt;
    &lt;configuration&gt;
        &lt;classpathDependencyExcludes&gt;
            &lt;classpathDependencyExclude&gt;io.helidon.microprofile:helidon-microprofile-oidc&lt;/classpathDependencyExclude&gt;
        &lt;/classpathDependencyExcludes&gt;
    &lt;/configuration&gt;
&lt;/plugin&gt;</markup>

<p>In the <code>MainTest.java</code> file, tests need to be modified to check the application security when accessing <code>/greet</code> path with a
<code>GET</code> method.</p>

<p>First step is to configure the server with the new application.yaml.</p>

<markup
lang="java"
title="Import the Config class"
>import io.helidon.config.Config;</markup>

<markup
lang="java"
title="Replace the startTheServer method by this one:"
>@BeforeAll
    public static void startTheServer() {
        server = Server.builder()
                .config(Config.create())
                .build()
                .start();
        serverUrl = "http://localhost:" + server.port();
    }</markup>

<p>The server has now one security provider, basic authentication configured.
Next step is to modify the test to check that the application is correctly protected.</p>

<markup
lang="java"
title="Replace the JsonObject declaration into testHelloWorld method by this code:"
>JsonObject jsonObject;
Response response = client
        .target(serverUrl)
        .path("/greet")
        .request()
        .get(Response.class);

Assertions.assertEquals(401, response.getStatus());</markup>

<p>This piece of code uses the webclient to access the application on <code>/greet</code> path with a <code>GET</code> method. The http basic
authentication security provider protects this path, so the client should receive an HTTP 401 code for unauthorized.</p>

<p>Only <code>jack</code> user has access to this part of the application.</p>

<markup
lang="java"
title="Add new check to the testHelloWorld method:"
>String encoding = Base64.getEncoder().encodeToString("jack:jackIsGreat".getBytes());

jsonObject = client
        .target(serverUrl)
        .path("/greet")
        .request()
        .header(Http.Header.AUTHORIZATION, "Basic " + encoding)
        .get(JsonObject.class);

Assertions.assertEquals("Hello World!", jsonObject.getString("message"),
                "default message");</markup>

<p>The username and password are encoded and placed inside the header in order to authenticate as jack to access the application.
If the authentication is successful, the application send the <code>Hello World</code> back as a <code>JsonObject</code>.</p>

<p>Now, the project can be build without skiping test.</p>

<markup
lang="bash"
title="Build the project"
>mvn clean install</markup>

</div>

<h4 id="_restrict_access_to_a_specific_role">Restrict access to a specific role</h4>
<div class="section">
<p>To give less access to a specific endpoint, it is possible to configure user role. So the application will grant access
only the user with the required role.</p>

<p>Navigate to the GreetResource and find the <code>getDefaultMessage</code> with @Authenticate annotation.</p>

<markup
lang="java"
title="Import the RolesAllowed annotation"
>import javax.annotation.security.RolesAllowed;</markup>

<markup
lang="java"
title="Add the @RolesAllowed annotation under the @Authenticate annotation:"
>@RolesAllowed("admin")</markup>

<p>The annotation parameter is the role with access to the method. In this case, only user with admin role can
have access.</p>

<p>Then, add a user and roles to the <code>helidon-quickstart-mp/src/test/resources/application.yaml</code> file.</p>

<markup
lang="yaml"
title="Add jack roles and create a new user named john:"
>- http-basic-auth:
        users:
          - login: "jack"
            password: "jackIsGreat"
            roles: [ "admin", "user" ]
          - login: "john"
            password: "johnPassword"
            roles: [ "user" ]</markup>

<p>Now, only Jack has access to secure endpoint as he has an <code>admin</code> role. Jhon, as a simple user, can not access it.
Once it is done, go to the tests to check the application behavior.
The test from previous section is still passing because jack has access.</p>

<p>The user <code>john</code> has only the <code>user</code> role so when accessing protected endpoint, a 403 (Forbidden) http code is returned.</p>

<markup
lang="java"
title="Check that jhon does not have access"
>encoding = Base64.getEncoder().encodeToString("john:johnPassword".getBytes());

response = client
        .target(serverUrl)
        .path("/greet")
        .request()
        .header(Http.Header.AUTHORIZATION, "Basic " + encoding)
        .get(Response.class);

Assertions.assertEquals(403, response.getStatus());</markup>

<markup
lang="bash"
title="Build the project"
>mvn clean install</markup>

<p>The tests pass, and your application is secured with specific roles in addition to user IDs.</p>

</div>
</div>
</div>
</doc-view>