<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <v-container v-bind:id="id" fluid light class="slide_features">
    <h2>Features</h2>
    <v-layout row wrap class="feature">
      <v-flex md2 class="hidden-sm-and-down"/>
      <v-flex md4 xs12 >
        <div class="section">
          <div>
            <h3><v-icon>import_contacts</v-icon>Simple and fast</h3>
            <p>Helidon is designed to be simple to  use, with tooling and examples to get you going quickly. Since Helidon
            is just a collection of libraries running on a fast Netty core, there is no extra overhead or bloat.</p>
          </div>
        </div>
      </v-flex>
      <v-flex md4 xs12 class="feature-graphic simple-and-fast-graphic "/>
      <v-flex md2 class="hidden-sm-and-down"/>
    </v-layout>
    <v-layout row wrap class="feature">
      <v-flex md12 class="hidden-sm-and-down vertical-spacer"/>
      <v-flex md2 class="hidden-sm-and-down"/>
      <v-flex md4 xs12 class="feature-graphic microprofile-support-graphic hidden-sm-and-down"/>
      <v-flex md4 xs12 >
        <div class="section">
          <div>
            <h3><v-icon>border_clear</v-icon>MicroProfile Support</h3>
            <p>Helidon supports MicroProfile and provides familiar APIs like JAX-RS, CDI and JSON-P/B. Our
             MicroProfile implementation runs on our fast Helidon Reactive WebServer</p>
          </div>
        </div>
      </v-flex>
      <v-flex md2 class="hidden-sm-and-down"/>
      <v-flex md4 xs12 class="feature-graphic microprofile-support-graphic hidden-md-and-up"/>
    </v-layout>
    <v-layout row wrap class="feature">
      <v-flex md12 class="hidden-sm-and-down vertical-spacer"/>
      <v-flex md2 class="hidden-sm-and-down"/>
      <v-flex md4 xs12 >
        <div class="section">
          <div>
            <h3><v-icon>storage</v-icon>Reactive WebServer</h3>
            <p>Helidon Reactive WebServer provides a modern functional programming model and runs on top of Netty.
            Lightweight, flexible and reactive, the Helidon WebServer provides a simple to use and fast foundation for
            your microservices.</p>
          </div>
        </div>
      </v-flex>
      <v-flex md4 xs12 class="feature-graphic reactive-web-server-graphic"/>
      <v-flex md2 class="hidden-sm-and-down"/>
    </v-layout>
    <v-layout row wrap class="feature">
      <v-flex md12 class="hidden-sm-and-down vertical-spacer"/>
      <v-flex md2 class="hidden-sm-and-down"/>
      <v-flex md4 xs12 class="feature-graphic observable-and-resilient-graphic hidden-sm-and-down"/>
      <v-flex md4 xs12 >
        <div class="section">
          <div>
            <h3><v-icon>repeat</v-icon>Observable and Resilient</h3>
            <p>With support for health checks, metrics, tracing and fault tolerance, Helidon has what you need to
             write cloud ready applications that integrate with Prometheus, Zipkin and Kubernetes.</p>
          </div>
        </div>
      </v-flex>
      <v-flex md4 xs12 class="feature-graphic observable-and-resilient-graphic hidden-md-and-up"/>
      <v-flex md2 class="hidden-sm-and-down"/>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="sass">
  .slide_features
    :background-color #f8f8f8
    :padding-top 100px
    .vertical-spacer
      :height 50px
    .section
      :margin-left auto
      :margin-right auto
      :min-height 200px
      :display table
      div
        :margin-left auto
        :margin-right auto
        :max-width 400px
        :display table-cell
        :vertical-align middle
      h3
        >i
          :margin-right 10px
          :color #3ea5fd
    .feature
      :margin-bottom 100px
    h2
      :color #3ea5fd
      :text-align center
      :font-weight 400
      :font-size 3em
      :margin-bottom 100px
    h3
      :font-weight 400
      :font-size 1.8em
      :margin-bottom 20px
      :color #3ea5fd
      :margin-left 8px
      > i
        :margin-right 10px
        :color #3ea5fd !important
    p
      :color #3ea5fd
      :font-size 1.25em
      :margin-left 10px
    .feature-graphic
      :margin-top auto;
      :margin-bottom auto
      :background-position: 50% 50%
      :background-size: contain
      :height: 200px
    .simple-and-fast-graphic
      :background-image url('../static/img/helidon_feature_simple_and_fast.png')
    .microprofile-support-graphic
      :background-image url('../static/img/helidon_feature_microprofile_support.png')
    .reactive-web-server-graphic
      :background-image: url('../static/img/helidon_feature_reactive_web_server.png')
    .observable-and-resilient-graphic
      :background-image url('../static/img/helidon_feature_observable_and_resilient.png')
</style>
