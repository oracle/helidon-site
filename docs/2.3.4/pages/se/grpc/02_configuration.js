<doc-view>

<v-layout row wrap>
<v-flex xs12 sm10 lg10>
<v-card class="section-def" v-bind:color="$store.state.currentColor">
<v-card-text class="pa-3">
<v-card class="section-def__card">
<v-card-text>
<dl>
<dt slot=title>gRPC Server Configuration</dt>
<dd slot="desc"><p>Configure the gRPC Server using the Helidon configuration framework, either programmatically
or via a configuration file.</p>
</dd>
</dl>
</v-card-text>
</v-card>
</v-card-text>
</v-card>
</v-flex>
</v-layout>

<h2 id="_configuring_the_grpc_server_in_your_code">Configuring the gRPC Server in your code</h2>
<div class="section">
<p>The easiest way to configure the gRPC Server is in your application code.</p>

<markup
lang="java"

>GrpcServerConfiguration configuration = GrpcServerConfiguration.builder()
                                                       .port(8080)
                                                       .build();
GrpcServer grpcServer = GrpcServer.create(configuration, routing);</markup>

</div>

<h2 id="_configuring_the_grpc_server_in_a_configuration_file">Configuring the gRPC Server in a configuration file</h2>
<div class="section">
<p>You can also define the configuration in a file.</p>

<markup
lang="hocon"
title="GrpcServer configuration file <code>application.yaml</code>"
>grpcserver:
  port: 3333</markup>

<p>Then, in your application code, load the configuration from that file.</p>

<markup
lang="java"
title="GrpcServer initialization using the <code>application.conf</code> file located on the classpath"
>GrpcServerConfiguration configuration = GrpcServerConfiguration.create(
        Config.builder()
              .sources(classpath("application.conf"))
              .build());

GrpcServer grpcServer = GrpcServer.create(configuration, routing);</markup>

</div>

<h2 id="_configuration_options">Configuration options</h2>
<div class="section">
<p>See all configuration options
 <a id="" title="" target="_blank" href="./apidocs/io.helidon.grpc.server/io/helidon/grpc/server/GrpcServerConfiguration.html">here</a>.</p>

</div>
</doc-view>