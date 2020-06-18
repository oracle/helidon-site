<doc-view>

<h2 id="_overview">Overview</h2>
<div class="section">
<p>Helidon MP supports JPA in much the same way that Java EE application
servers do, but with much less weight.  If you come from a Java EE
background, you&#8217;ll feel right at home: you work with JPA in Helidon MP
in all the ways that you&#8217;re familiar with.</p>

<p>For example, in Helidon MP&#8217;s JPA integration, you can work with a
fully managed <code>EntityManager</code> by injecting it in the same way you
would in a Java EE application server:</p>

<v-card flat color="grey lighten-3"  class="card__example">
<v-card-text><p>@PersistenceContext
private EntityManager em;</p>
</v-card-text>
</v-card>


<p>The Jakarta Persistence API is a specification that governs how Java
objects map to relational databases, and has existed since 2006.
Hibernate and Eclipselink, two of the most popular JPA
implementations, are supported by Helidon MP JPA.</p>

</div>

<h2 id="_next_steps">Next Steps</h2>
<div class="section">
<p>Learn more about the
<a id="" title="" target="_blank" href="https://jcp.org/en/jsr/detail?id=338">Java Persistence API (JPA)</a></p>

<p>Configure and use the Java Persistence API (JPA) from
within a Helidon MP application. <router-link to="/mp/guides/09_jpa">Helidon MP JPA Guide</router-link>.</p>

</div>
</doc-view>