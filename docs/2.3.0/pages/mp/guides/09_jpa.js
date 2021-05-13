<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Helidon MP JPA Guide</dt>
<dd slot="desc"><p>This guide shows how to configure and use the
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/">Java Persistence
API (JPA)</a> from within a Helidon MP application.</p>
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

<div class="table__overflow elevation-1  ">
<table class="datatable table">
<colgroup>
<col style="width: 100%;">
</colgroup>
<thead>
</thead>
<tbody>
<tr>
<td class="">About 30 minutes</td>
</tr>
<tr>
<td class=""><router-link to="/about/03_prerequisites">Helidon Prerequisites</router-link></td>
</tr>
<tr>
<td class=""><router-link to="/mp/guides/07_datasource">An understanding of named data source support in Helidon MP</router-link></td>
</tr>
<tr>
<td class=""><router-link to="/mp/guides/08_jta">An understanding of transaction support in Helidon MP</router-link></td>
</tr>
<tr>
<td class="">An understanding of JPA itself</td>
</tr>
</tbody>
</table>
</div>
</div>

<h2 id="_what_youll_do">What You&#8217;ll Do</h2>
<div class="section">
<p>By following this guide, you’ll enhance a bare-bones Helidon MP
application to use JPA, with automatic transaction support, backed by
<a id="" title="" target="_blank" href="https://www.eclipse.org/eclipselink/#jpa">EclipseLink</a>, to access an
in-memory <a id="" title="" target="_blank" href="https://www.h2database.com/html/main.html">H2
database</a>. You’ll see how to install the relevant dependencies and add
JPA-related code to your application.</p>

</div>

<h2 id="_use_the_maven_archetype_to_generate_a_helidon_mp_application">Use the Maven Archetype to Generate a Helidon MP Application</h2>
<div class="section">
<p>In a shell, <code>cd</code> into an empty directory and run this:</p>

<markup
lang="bash"

>mvn -U archetype:generate \
    -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-bare-mp \
    -DarchetypeVersion=2.3.0 \
    -DgroupId=io.helidon.example \
    -DartifactId=helidon-jpa \
    -Dpackage=io.helidon.example.jpa</markup>

<p>Now <code>cd</code> into <code>helidon-jpa</code>.  The rest of this guide will assume all
relative paths are relative to this directory.</p>

</div>

<h2 id="_add_the_h2_database_driver_to_the_runtime_classpath">Add the H2 Database Driver to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;com.h2database&lt;/groupId&gt;
    &lt;artifactId&gt;h2&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

<p>In a production application, you may use a different database, so in
that case you may add a different database driver dependency here
instead.</p>

</div>

<h2 id="_add_the_hikari_connection_pool_extension_to_the_runtime_classpath">Add the Hikari Connection Pool Extension to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-datasource-hikaricp&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_add_the_jta_extension_to_the_runtime_classpath">Add the JTA Extension to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-jta-weld&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_add_the_provider_independent_helidon_jpa_extension_to_the_runtime_classpath">Add the Provider-Independent Helidon JPA Extension to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-jpa&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_add_the_eclipselink_jpa_extension_to_the_runtime_classpath">Add the EclipseLink JPA Extension to the Runtime Classpath</h2>
<div class="section">
<p>Add the following dependency in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;io.helidon.integrations.cdi&lt;/groupId&gt;
    &lt;artifactId&gt;helidon-integrations-cdi-eclipselink&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_add_the_jta_and_jpa_dependencies_to_the_provided_classpath">Add the JTA and JPA Dependencies to the Provided Classpath</h2>
<div class="section">
<p>Add the following dependencies in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;dependency&gt;
    &lt;groupId&gt;jakarta.persistence&lt;/groupId&gt;
    &lt;artifactId&gt;jakarta.persistence-api&lt;/artifactId&gt;
    &lt;scope&gt;provided&lt;/scope&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;jakarta.transaction&lt;/groupId&gt;
    &lt;artifactId&gt;jakarta.transaction-api&lt;/artifactId&gt;
    &lt;scope&gt;provided&lt;/scope&gt;
&lt;/dependency&gt;</markup>

</div>

<h2 id="_add_ddl_to_create_the_relevant_database_tables">Add DDL to Create the Relevant Database Tables</h2>
<div class="section">
<p>Add the following file under <code>src/main/resources</code>:</p>

<markup
lang="sql"
title="<code>src/main/resources/greeting.ddl</code>"
>CREATE TABLE IF NOT EXISTS GREETING (
    SALUTATION VARCHAR(64) NOT NULL PRIMARY KEY,
    RESPONSE VARCHAR(64) NOT NULL
);

MERGE INTO GREETING (SALUTATION, RESPONSE) VALUES ('Marco', 'Polo');</markup>

</div>

<h2 id="_add_an_application_yaml_file_with_database_connectivity_information">Add an <code>application.yaml</code> File With Database Connectivity Information</h2>
<div class="section">
<p>Replace the contents of the following file under <code>src/main/resources</code>:</p>

<markup
lang="yaml"
title="<code>src/main/resources/application.yaml</code>"
>server:
    port: 8080
javax:
    sql:
        DataSource:
            greetingDataSource:
                dataSourceClassName: org.h2.jdbcx.JdbcDataSource
                dataSource:
                    url: jdbc:h2:mem:greeting;INIT=RUNSCRIPT FROM 'classpath:greeting.ddl' <span class="conum" data-value="1" />
                    user: sa
                    password: ""</markup>

<ul class="colist">
<li data-value="1">The
<a id="" title="" target="_blank" href="http://www.h2database.com/html/features.html#execute_sql_on_connection">H2
<code>INIT</code> property</a> tells H2 what command to run upon starting up.  In
this case, it is going to
<a id="" title="" target="_blank" href="http://www.h2database.com/html/commands.html#runscript">load and run</a>
the DDL mentioned above.</li>
</ul>
</div>

<h2 id="_add_a_java_class_to_represent_a_greeting_jpa_entity">Add a Java Class to Represent a Greeting JPA Entity</h2>
<div class="section">
<p>Add the following Java class under <code>src/main/java/io/helidon/example/jpa</code>:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/jpa/Greeting.java</code>"
>package io.helidon.example.jpa;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Access(value = AccessType.FIELD) <span class="conum" data-value="1" />
@Entity(name = "Greeting") <span class="conum" data-value="2" />
@Table(name = "GREETING") <span class="conum" data-value="3" />
public class Greeting implements Serializable { <span class="conum" data-value="4" />

    @Column(
        insertable = true,
        name = "SALUTATION", <span class="conum" data-value="5" />
        nullable = false,
        updatable = false
    )
    @Id <span class="conum" data-value="6" />
    private String salutation;

    @Basic(optional = false) <span class="conum" data-value="7" />
    @Column(
        insertable = true,
        name = "RESPONSE",
        nullable = false,
        updatable = true
    )
    private String response;

    @Deprecated
    protected Greeting() { <span class="conum" data-value="8" />
        super();
    }

    public Greeting(String salutation, String response) { <span class="conum" data-value="9" />
        super();
        this.salutation = Objects.requireNonNull(salutation);
        this.setResponse(response);
    }

    public String getSalutation() {
        return this.salutation;
    }

    public String getResponse() {
        return this.response;
    }

    public void setResponse(String response) {
        this.response = Objects.requireNonNull(response);
    }

    @Override
    public String toString() {
        return this.getSalutation() + " " + this.getResponse();
    }

}</markup>

<ul class="colist">
<li data-value="1">(Some of the annotations in this example, like this one, have
sensible defaults, but the example specifies them explicitly for
clarity.)  This
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/access"><code>Access</code>
annotation</a> says that JPA will access this class' fields directly,
rather than via getter and setter methods.</li>
<li data-value="2">The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/entity"><code>Entity</code>
annotation</a> identifies this class as a JPA entity.  The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/entity#name()"><code>name</code>
element</a> value can be used in JPQL queries.</li>
<li data-value="3">The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/table"><code>Table</code>
annotation</a> identifies the database table to which this class will be
mapped.</li>
<li data-value="4">JPA entities should be
<a id="" title="" target="_blank" href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/io/Serializable.html"><code>Serializable</code></a>.</li>
<li data-value="5">The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/column"><code>Column</code>
annotation</a> specifies what column in the database the annotated field
maps to.  The elements of the <code>Column</code> annotation further describe the
column.</li>
<li data-value="6">The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/id"><code>Id</code>
annotation</a> indicates this field will be mapped to the primary key of
the database table.</li>
<li data-value="7">The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/basic"><code>Basic</code>
annotation</a> indicates this field will be mapped to an ordinary
("basic") column.</li>
<li data-value="8">All JPA entities need a zero-argument constructor, but it doesn&#8217;t
have to be <code>public</code>.  This constructor satisfies this requirement.  It
is marked
<a id="" title="" target="_blank" href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Deprecated.html"><code>Deprecated</code></a>
and is non-<code>public</code> so that normal users have to supply data for the
<code>salutation</code> and <code>response</code> fields via the other constructor.</li>
<li data-value="9">This is the constructor normal users will use.</li>
</ul>
</div>

<h2 id="_add_a_meta_infpersistence_xml_descriptor">Add a <code>META-INF/persistence.xml</code> Descriptor</h2>
<div class="section">
<p>Add the following file under <code>src/main/resources/META-INF</code>:</p>

<markup
lang="xml"
title="<code>src/main/resources/META-INF/persistence.xml</code>"
>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;persistence version="2.2" <span class="conum" data-value="1" />
             xmlns="http://xmlns.jcp.org/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence
                                 http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd"&gt;
    &lt;persistence-unit name="greeting" transaction-type="JTA"&gt; <span class="conum" data-value="2" />
        &lt;description&gt;A persistence unit for the greeting example.&lt;/description&gt;
        &lt;jta-data-source&gt;greetingDataSource&lt;/jta-data-source&gt; <span class="conum" data-value="3" />
        &lt;class&gt;io.helidon.example.jpa.Greeting&lt;/class&gt; <span class="conum" data-value="4" />
        &lt;properties&gt; <span class="conum" data-value="5" />
            &lt;property name="eclipselink.deploy-on-startup" value="true"/&gt;
            &lt;property name="eclipselink.jdbc.native-sql" value="true"/&gt;
            &lt;property name="eclipselink.logging.logger" value="JavaLogger"/&gt;
            &lt;property name="eclipselink.logging.parameters" value="true"/&gt;
            &lt;property name="eclipselink.target-database" value="org.eclipse.persistence.platform.database.H2Platform"/&gt; <span class="conum" data-value="6" />
            &lt;property name="eclipselink.target-server" value="io.helidon.integrations.cdi.eclipselink.CDISEPlatform"/&gt; <span class="conum" data-value="7" />
            &lt;property name="eclipselink.weaving" value="false"/&gt; <span class="conum" data-value="8" />
        &lt;/properties&gt;
    &lt;/persistence-unit&gt;
&lt;/persistence&gt;</markup>

<ul class="colist">
<li data-value="1">Helidon MP&#8217;s JPA extension supports JPA 2.2.</li>
<li data-value="2">Note that <code>JTA</code> is the transaction type.  JTA transactions are
fully supported.</li>
<li data-value="3">Note that the name of the data source is the one configured in the
<code>application.yaml</code> file described earlier.</li>
<li data-value="4">The <code>Greeting</code> class you created is listed here.</li>
<li data-value="5">The properties listed here are in general
<a id="" title="" target="_blank" href="https://www.eclipse.org/eclipselink/documentation/2.7/jpa/extensions/persistenceproperties_ref.htm">EclipseLink
properties</a>.  Many are optional, but a few (detailed below) are required.</li>
<li data-value="6"><a id="" title="" target="_blank" href="https://www.eclipse.org/eclipselink/documentation/2.7/jpa/extensions/persistenceproperties_ref.htm#target-database">This
property</a> is required when EclipseLink is the JPA provider.  It is set
to <code>org.eclipse.persistence.platform.database.H2Platform</code> because this
example uses the H2 database.</li>
<li data-value="7"><a id="" title="" target="_blank" href="https://www.eclipse.org/eclipselink/documentation/2.7/jpa/extensions/persistenceproperties_ref.htm#target-server">This
property</a> is required, and when EclipseLink is the JPA provider must
have the value
<code>io.helidon.integrations.cdi.eclipselink.CDISEPlatform</code>.</li>
<li data-value="8"><a id="" title="" target="_blank" href="https://www.eclipse.org/eclipselink/documentation/2.7/jpa/extensions/persistenceproperties_ref.htm#weaving">This
property</a> is required when EclipseLink is the JPA provider and must be
set to <code>false</code>.</li>
</ul>
</div>

<h2 id="_modify_the_pom_xml_file_to_support_static_weaving">Modify the <code>pom.xml</code> File To Support Static Weaving</h2>
<div class="section">
<p><em>Weaving</em> is the term that describes the bytecode manipulation that
JPA providers perform upon your simple Java entity classes (like the
<code>Greeting</code> class you created above).  In Helidon MicroProfile&#8217;s JPA
extension, weaving must be performed statically (at build time).  Here
we modify the <code>pom.xml</code> to make that happen.</p>

<p>Add the following plugin configuration in your <code>pom.xml</code>:</p>

<markup
lang="xml"
title="<code>pom.xml</code>"
>&lt;plugin&gt;
    &lt;groupId&gt;com.ethlo.persistence.tools&lt;/groupId&gt;
    &lt;artifactId&gt;eclipselink-maven-plugin&lt;/artifactId&gt;
    &lt;executions&gt;
        &lt;execution&gt;
            &lt;id&gt;weave&lt;/id&gt;
            &lt;phase&gt;process-classes&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;weave&lt;/goal&gt; <span class="conum" data-value="1" />
            &lt;/goals&gt;
        &lt;/execution&gt;
        &lt;execution&gt;
            &lt;id&gt;modelgen&lt;/id&gt;
            &lt;phase&gt;generate-sources&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;modelgen&lt;/goal&gt; <span class="conum" data-value="2" />
            &lt;/goals&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;</markup>

<ul class="colist">
<li data-value="1">Static weaving is performed on compiled classes in place.</li>
<li data-value="2">The
<a id="" title="" target="_blank" href="https://javaee.github.io/tutorial/persistence-criteria002.html#GJIUP">JPA
static metamodel</a> is generated by this goal.</li>
</ul>
</div>

<h2 id="_inject_a_container_managed_entitymanager">Inject a Container-Managed <code>EntityManager</code></h2>
<div class="section">
<p>In the <code>src/main/java/io/helidon/example/jpa/GreetResource.java</code> file, add the following
imports:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/jpa/GreetResource.java</code>"
>import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;</markup>

<p>Annotate the resource class declaration with <code>@Dependent</code>:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/jpa/GreetResource.java</code>"
>@Dependent <span class="conum" data-value="1" />
public class GreetResource {</markup>

<ul class="colist">
<li data-value="1">This ensures that <code>io.helidon.example.jpa.GreetResource</code> is a
discoverable CDI bean, because it is an example of a
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/cdi/2.0/cdi-spec-2.0.html#bean_defining_annotations">bean-defining
annotation</a>.</li>
</ul>
<p>Then add the following annotated field declaration:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/jpa/GreetResource.java</code>"
>@PersistenceContext <span class="conum" data-value="1" />
private EntityManager em;</markup>

<ul class="colist">
<li data-value="1">The
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/persistencecontext"><code>@PersistenceContext</code>
annotation</a> indicates that you want an
<a id="" title="" target="_blank" href="https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/entitymanager"><code>EntityManager</code></a>
injected here.</li>
</ul>
</div>

<h2 id="_use_the_injected_entitymanager">Use the Injected <code>EntityManager</code></h2>
<div class="section">
<p>In the <code>src/main/java/io/helidon/example/jpa/GreetResource.java</code>
file, add the following import:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/jpa/GreetResource.java</code>"
>import javax.transaction.Transactional;
import javax.ws.rs.PathParam;</markup>

<p>Add the following resource method to the <code>GreetResource</code> class:</p>

<markup
lang="java"
title="<code>src/main/java/io/helidon/example/jpa/GreetResource.java</code>"
>@GET
@Path("response/{salutation}")
@Produces("text/plain")
@Transactional <span class="conum" data-value="1" />
public String getResponse(@PathParam("salutation") String salutation) {
    final Greeting greeting = this.em.find(Greeting.class, salutation);
    final String returnValue;
    if (greeting == null) {
        returnValue = null;
    } else {
        returnValue = greeting.getResponse();
    }
    return returnValue;
}</markup>

<ul class="colist">
<li data-value="1">A JTA transaction will be automatically started at the beginning
of this method when it is invoked as a result of an incoming HTTP
request, and committed or rolled back when the method terminates
normally or exceptionally.  The injected <code>EntityManager</code> will join the
transaction automatically.</li>
</ul>
</div>

<h2 id="_add_logging">Add Logging</h2>
<div class="section">
<p>Add the following content to the <code>logging.properties</code> file under
<code>src/main/resources</code>:</p>

<markup
lang="properties"
title="<code>src/main/resources/logging.properties</code>"
>com.zaxxer.hikari.level=INFO
h2database.level=WARNING
io.netty.level=INFO
org.eclipse.persistence.level=FINE
org.glassfish.jersey.server.level=CONFIG</markup>

</div>

<h2 id="_build_the_application">Build the Application</h2>
<div class="section">
<p>Execute the following from the root directory of your application:</p>

<markup
lang="bash"

>mvn package</markup>

</div>

<h2 id="_run_the_application">Run the Application</h2>
<div class="section">
<p>Execute the following from the root directory of your application:</p>

<markup
lang="bash"

>java -jar target/helidon-jpa.jar</markup>

</div>

<h2 id="_test_the_application">Test the Application</h2>
<div class="section">
<p>Execute the following:</p>

<markup
lang="bash"

>curl http://localhost:8080/greet/response/Marco</markup>

<p>Observe that <code>Polo</code> is returned.</p>

</div>
</doc-view>