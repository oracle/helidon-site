<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>Serving Static Content</dt>
<dd slot="desc"><p>You can serve static content from a location in a file system
 or from the classpath.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 >Serving Static Content</h2>
<div class="section">
<markup
lang="properties"
title="META-INF/microprofile-config.properties - File system static content"
># Location of content on file system
server.static.path.location=/var/www/html
# default is index.html
server.static.classpath.welcome=resource.html
# static content path - default is "/"
# server.static.classpath.context=/static-file</markup>

<markup
lang="properties"
title="META-INF/microprofile-config.properties - Classpath static content"
># src/main/resources/WEB in your source tree
server.static.classpath.location=/WEB
# default is index.html
server.static.classpath.welcome=resource.html
# static content path - default is "/"
# server.static.classpath.context=/static-cp</markup>

</div>
</doc-view>
