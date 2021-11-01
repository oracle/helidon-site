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

<h2 id="_what_you_need">What You Need</h2>
<div class="section">
<p>For this 20 minute tutorial, you will need the following:</p>


<div class="table__overflow elevation-1  flex sm7
">
<table class="datatable table">
<colgroup>
<col style="width: 50%;">
<col style="width: 50%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">A Helidon MP Application</td>
<td class="">You can use your own application or use the <a id="" title="" target="_blank" href="https://helidon.io/docs/v2/#/mp/guides/02_quickstart">Helidon MP Quickstart</a> to create a sample application.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads">Java&#160;SE&#160;11</a> (<a id="" title="" target="_blank" href="http://jdk.java.net">Open&#160;JDK&#160;11</a>)</td>
<td class="">Helidon requires Java 11+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://maven.apache.org/download.cgi">Maven 3.6.1+</a></td>
<td class="">Helidon requires Maven 3.6.1+.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://docs.docker.com/install/">Docker 18.09+</a></td>
<td class="">You need Docker if you
want to build and deploy Docker containers.</td>
</tr>
<tr>
<td class=""><a id="" title="" target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubectl 1.16.5+</a></td>
<td class="">If you want to
deploy to Kubernetes, you need <code>kubectl</code> and a Kubernetes cluster (you can
<router-link to="/about/05_kubernetes">install one on your desktop</router-link>).</td>
</tr>
</tbody>
</table>
</div>
<markup
lang="bash"
title="Verify Prerequisites"
>java -version
mvn --version
docker --version
kubectl version --short</markup>

<markup
lang="bash"
title="Setting JAVA_HOME"
># On Mac
export JAVA_HOME=`/usr/libexec/java_home -v 11`

# On Linux
# Use the appropriate path to your JDK
export JAVA_HOME=/usr/lib/jvm/jdk-11</markup>

</div>

<h2 id="_introduction">Introduction</h2>
<div class="section">
<p>This guide describes the steps required to protect your whole application or a specific area with Open ID Connect
(OIDC) security. OIDC is a secure mechanism for an application to contact an identity service.
Its built on top of OAuth 2.0 and provides full-fledged authentication and authorization protocols.</p>

</div>

<h2 id="_install_keycloak">Install Keycloak</h2>
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

</div>

<h3 id="_start_keycloak">Start Keycloak</h3>
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

<h3 id="_create_an_admin_user">Create an Admin User</h3>
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

<h2 id="_set_up_keycloak">Set up Keycloak</h2>
<div class="section">
<p>To set up Keycloak properly, go to the admin console: <a id="" title="" target="_blank" href="http://localhost:8080/auth/admin">http://localhost:8080/auth/admin</a></p>

<p>If you are using Docker, use Username <code>admin</code> and password <code>admin</code> as it is the default admin user.
Otherwise, use the username and password you used to create the admin user.</p>


<h3 id="_create_a_realm">Create a Realm</h3>
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

<h3 id="_create_a_user">Create a User</h3>
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

<h3 id="_create_a_client">Create a Client</h3>
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

<h2 id="_set_up_helidon">Set up Helidon</h2>
<div class="section">
<p>Use the Helidon MP Maven archetype to create a simple project. It will be used as an example
to show how to set up Helidon. Replace <code>2.4.0</code> by the latest helidon version.
It will download the quickstart project into the current directory.</p>

<markup
lang="bash"
title="Run the Maven archetype"
>mvn -U archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-mp \
    -DarchetypeVersion=2.4.0 \
    -DgroupId=io.helidon.examples \
    -DartifactId=helidon-quickstart-mp \
    -Dpackage=io.helidon.examples.quickstart.mp</markup>

<markup
lang="bash"
title="The project will be built and run from the helidon-quickstart-mp directory:"
>cd helidon-quickstart-mp</markup>


<h3 id="_update_project_dependencies">Update Project Dependencies</h3>
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

<h3 id="_add_oidc_security_properties">Add OIDC Security Properties</h3>
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
        redirect-uri: "/oidc/redirect"
        audience: "account"
        client-id: "myClientID"   <span class="conum" data-value="1" />
        header-use: true
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

<h3 id="_secure_your_application">Secure Your Application</h3>
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
</div>

<h2 id="_try_it">Try it!</h2>
<div class="section">
<p>Helidon and Keycloak are now correctly configured and your application is safe.</p>

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


<h3 id="_update_tests_to_the_secure_environment">Update Tests to the Secure Environment</h3>
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

<h3 id="_test_keycloak_process_with_postman">Test Keycloak process with Postman</h3>
<div class="section">
<p>Keycloak supports many authentication and authorization flows, but only two of them will be shown. This section
describes another way you can get an access token or refresh a token or identity token. The identity token contains
information about the user. The access token contains access information that the application can use to determine what
resources the user is allowed to access. Once expired, the refresh token allows the application to obtain a new access
token. As these tokens contain sensitive information, they are valid for a very short period. It is possible to make them
last longer in order to let you manipulate them with Postman. To do so:</p>

<ol style="margin-left: 15px;">
<li>
Open the Postman Console.

</li>
<li>
Click on the <code>Realm Setting</code> in the left menu.

</li>
<li>
Navigate to the <code>Tokens</code> tab.
You can increase the access token lifespan.

</li>
</ol>

<h4 id="_authorization_code_flow">Authorization Code Flow</h4>
<div class="section">
<p>The Authorization Code flow is suitable for browser-based applications. It is composed of three main steps:</p>

<ol style="margin-left: 15px;">
<li>
The browser visits the application. The user is not logged in, so it redirects the browser to Keycloak which requires
username and password for authentication.

</li>
<li>
Keycloak authenticates the user and returns a temporary authorization code as a query parameter in the URL.

</li>
<li>
The authorization code is used to get access and refresh token from Keycloak token endpoint.

</li>
</ol>
<p>For the first step, paste the following URL into your browser:
<code><a id="" title="" target="_blank" href="http://localhost:8080/auth/realms/myRealm/protocol/openid-connect/auth?client_id=myClientID&amp;response_type=code">http://localhost:8080/auth/realms/myRealm/protocol/openid-connect/auth?client_id=myClientID&amp;response_type=code</a></code>.
The first part of the url <code>http:/../auth</code> is the Keycloak endpoint to request an authorization code. Two query
parameters are provided, the client id and the response type.
Press enter and Keycloak responds with different URL containing a query parameter <code>code</code>. You successfully received
the authorization code.</p>

<p>In order to achieve the third step, we can use Postman to exchange the authorization code for tokens. In Postman,
select the Http POST method. Keycloak endpoint to get token is the following:
<code><a id="" title="" target="_blank" href="http://localhost:8080/auth/realms/myRealm/protocol/openid-connect/token">http://localhost:8080/auth/realms/myRealm/protocol/openid-connect/token</a></code>.
In the body of the request, select <code>x-www-form-urlencoded</code> type. Add the following data:</p>

<markup
lang="json"
title="Enter the key:value"
>[{"key":"grant_type","value":"authorization_code"},
{"key":"client_id","value":"myClientID"},
{"key":"client_secret","value":"client secret"},
{"key":"code","value":"authorization code"}]</markup>

<p>Do not forget to replace the <code>client secret</code> by its value (generated during Create a Client), and <code>authorization code</code>
by the code value in the query parameter. Send the request by pressing <code>Send</code>. Keycloak returns an access token and
a refresh token.</p>

</div>

<h4 id="_resource_owner_password_credentials_grant_direct_access_grants">Resource Owner Password Credentials Grant (Direct Access Grants)</h4>
<div class="section">
<p>The Direct Access Grants flow is used by REST clients that want to request tokens on behalf of a user.
To use Postman to make this request on behalf of <code>myuser</code>, select the GET method and enter this URL:
<code><a id="" title="" target="_blank" href="http://localhost:7987/greet/">http://localhost:7987/greet/</a></code>. Under <code>Authorization</code> tab, select authorization type`OAuth 2.0`. Under it, complete the
sentence  <code>Add authorization data to</code> with <code>Request Headers</code>, and complete the required fields.</p>

<markup
lang="json"
title="Enter the following information:"
>[{"key":"Header Prefix","value":"bearer"},
{"key":"Grant type","value":"Password  Credentials"},
{"key":"Access Token URL","value":"http://localhost:8080/auth/realms/myRealm/protocol/openid-connect/token"},
{"key":"Client ID","value":"myClientID"},
{"key":"Client Secret","value":"client secret"},
{"key":"Username","value":"myuser"},
{"key":"Password","value":"password"},
{"key":"Scope","value":"openid"},
{"key":"Client Authentication","value":"Send as Basic Auth Header"}]</markup>

<p>Again, make sure to replace <code>client secret</code> by the actual client secret. Click on <code>Get New Access Token</code>. A popup
window appears with Authentication complete, click on proceed to display access, refresh and identity token.
Copy and paste the access token to <code>Access Token</code> field and press <code>Send</code>. Helidon greeting application sends back
<code>Hello World !</code>.</p>

</div>
</div>

<h3 id="_restrict_access_to_a_specific_role">Restrict Access to a Specific Role</h3>
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
</doc-view>