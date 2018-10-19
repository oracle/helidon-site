<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Creating a ReSTful Web Service using Helidon SE</dt>
<dd slot="desc"><p>This guide takes you through creating, building, and running a simple ReSTful web service using Helidon SE.</p>

<p><img src="./images/guides/baseline-schedule-24px.svg" alt="Duration" />
 15 minutes</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >What You&#8217;ll Learn</h2>
<div class="section">
<p>You will learn how to write a simple ReSTful web service using Helidon SE and its
reactive web server and how to build and run it using Maven.</p>

</div>

<h2 >What You&#8217;ll Need</h2>
<div class="section">
<ul class="ulist">
<li>
<p>A text editor or an IDE</p>

</li>
<li>
<p>JDK 1.8 or later</p>

</li>
<li>
<p>Maven 3.5 or later</p>

</li>
</ul>
</div>

<h2 >Creating the Application</h2>
<div class="section">
<p>You have two choices:</p>

<ul class="ulist">
<li>
<p><router-link to="#do-it-yourself" @click.native="this.scrollFix('#do-it-yourself')">Do-it-yourself</router-link> - Create a new maven project and add the code to it yourself.</p>

</li>
<li>
<p><router-link to="#outsource-it" @click.native="this.scrollFix('#outsource-it')">Outsource it</router-link> - Clone a github repository or download a zip containing the finished example.</p>

</li>
</ul>
<p>Either way you&#8217;ll follow the same steps to build and run the application.</p>


<h3 >Do-it-yourself</h3>
<div class="section">
<markup
lang="java"

>include::https://github.com/oracle/helidon/blob/master/examples/helidon-quickstart-se/src/main/java/io/helidon/examples/quickstart/se/Main.java</markup>

</div>

<h3 >Outsource It</h3>
<div class="section">

</div>
</div>

<h2 >Building the Project</h2>
<div class="section">

</div>

<h2 >Running the Application</h2>
<div class="section">

</div>
</doc-view>