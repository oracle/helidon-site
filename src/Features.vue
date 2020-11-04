<!--
  ~ Copyright (c) 2018, 2020 Oracle and/or its affiliates. All rights reserved.
-->
<template>
<!--  Desktop & tablet version-->
  <v-container v-bind:id="id" text-md-center fluid fill-height light new-features-slide>
    <v-layout column justify-center class="hidden-xs-only" >
      <v-flex xs12>
        <v-carousel light delimiter-icon="stop">
          <v-carousel-item>
            <v-layout column justify-center>
              <v-flex xs4 style="text-align: center">
                <div class="graalvm-img"/>
                <p class="graalvm-description">GraalVM native-image support in both Helidon SE and Helidon MP</p>
              </v-flex>
            </v-layout>
          </v-carousel-item>
          <v-carousel-item>
            <v-layout column justify-center>
              <v-flex xs6 class="cli-flex">
                <h2 class="cli-description">Helidon Command Line Utility</h2>
                <div class="cli-img"/>
                <div style="text-align: center">
                  <v-btn box color="info" dark class="info-button" href="./docs/v2/#/about/05_cli">Read more</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-carousel-item>
          <v-carousel-item>
            <v-layout column justify-center>
              <v-flex sm8>
                <v-layout row wrap justify-center>
                  <v-flex md2/>
                  <v-flex md4 justify-center class="features-flex">
                    <h3 class="features-header"><v-icon>import_contacts</v-icon>Simple and fast</h3>
                    <p class="features-text">Helidon is designed to be simple to  use, with tooling and examples to get you going quickly. Since Helidon
                      is just a collection of libraries running on a fast Netty core, there is no extra overhead or bloat.</p>
                  </v-flex>
                  <v-flex md4 class="hidden-sm-and-down">
                    <div class="graphics simple-and-fast-graphic"></div>
                  </v-flex>
                  <v-flex md2/>
                  <v-flex md2/>
                  <v-flex md4 class="hidden-sm-and-down">
                    <div class="graphics microprofile-support-graphic"></div>
                  </v-flex>
                  <v-flex md4 class="features-flex">
                    <h3 class="features-header"><v-icon>border_clear</v-icon>MicroProfile Support</h3>
                    <p class="features-text">Helidon supports MicroProfile and provides familiar APIs like JAX-RS, CDI and JSON-P/B. Our
                      MicroProfile implementation runs on our fast Helidon Reactive WebServer</p>
                  </v-flex>
                  <v-flex md2/>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-carousel-item>
          <v-carousel-item>
            <v-layout column justify-center>
              <v-flex sm8>
                <v-layout row wrap justify-center>
                  <v-flex md2/>
                  <v-flex md4 justify-center class="features-flex">
                    <h3 class="features-header"><v-icon>storage</v-icon>Reactive WebServer</h3>
                    <p class="features-text">Helidon Reactive WebServer provides a modern functional programming model and runs on top of Netty.
                      Lightweight, flexible and reactive, the Helidon WebServer provides a simple to use and fast foundation for
                      your microservices.</p>
                  </v-flex>
                  <v-flex md4 class="hidden-sm-and-down">
                    <div class="graphics reactive-web-server-graphic"></div>
                  </v-flex>
                  <v-flex md2/>
                  <v-flex md2/>
                  <v-flex md4 class="hidden-sm-and-down">
                    <div class="graphics observable-and-resilient-graphic"></div>
                  </v-flex>
                  <v-flex md4 class="features-flex">
                    <h3 class="features-header"><v-icon>repeat</v-icon>Observable and Resilient</h3>
                    <p class="features-text">With support for health checks, metrics, tracing and fault tolerance, Helidon has what you need to
                      write cloud ready applications that integrate with Prometheus, Jaeger/Zipkin and Kubernetes.</p>
                  </v-flex>
                  <v-flex md2/>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-carousel-item>
          <v-carousel-item>
            <v-layout column justify-center>
              <v-flex xs6 class="fifth-slide">
                <h2 class="dbclient-header">Helidon SE DBClient</h2>
                <div class="ul-style">
                  <ul>
                    <li>Reactive non-blocking database client</li>
                    <li>Supports existing blocking JDBC drivers</li>
                    <li>Relational and non-relational databases</li>
                    <li>Metrics, tracing, health checks</li>
                    <li>Portability</li>
                    <li>Extensibility</li>
                  </ul>
                </div>
                <div class ="button-fifth">
                  <v-btn box color="info" darkclass="info-button" href="./docs/v2/#/se/dbclient/01_introduction">Read more</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <!--Mobile screen version-->
    <div class="hidden-sm-and-up" style="width: 100vw">
      <h1 style="font-size: 3rem; margin-bottom: 30px; color: #f8f8f8; font-weight: normal">Features</h1>
      <v-container jumbo>
        <v-layout justify-center>
          <v-flex text-xs-center xs12>
            <div class="jumbo1-img"/>
            <p style="color: #797979; font-size: 1.25rem">GraalVM native-image support in both Helidon SE and Helidon MP</p>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container jumbo>
        <v-layout justify-center>
          <v-flex text-xs-center xs12>
            <p style="font-size: 2.3rem; color: #41a8ff; margin-top: 60px">Helidon Command Line Utility</p>
            <div style="text-align: center; margin-top: 30px">
              <v-btn box color="info" dark class="info-button" href="./docs/v2/#/about/05_cli">Read more</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container jumbo>
        <v-layout justify-center>
          <v-flex text-xs-center xs12>
            <h3 class="features-header"><v-icon>import_contacts</v-icon>Simple and fast</h3>
            <p class="features-text">Helidon is designed to be simple to  use, with tooling and examples to get you going quickly. Since Helidon
              is just a collection of libraries running on a fast Netty core, there is no extra overhead or bloat.</p>
            <h3 class="features-header"><v-icon>border_clear</v-icon>MicroProfile Support</h3>
            <p class="features-text">Helidon supports MicroProfile and provides familiar APIs like JAX-RS, CDI and JSON-P/B. Our
              MicroProfile implementation runs on our fast Helidon Reactive WebServer</p>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container jumbo>
        <v-layout justify-center>
          <v-flex text-xs-center xs12>
            <h3 class="features-header"><v-icon>storage</v-icon>Reactive WebServer</h3>
            <p class="features-text">Helidon Reactive WebServer provides a modern functional programming model and runs on top of Netty.
              Lightweight, flexible and reactive, the Helidon WebServer provides a simple to use and fast foundation for
              your microservices.</p>
            <h3 class="features-header"><v-icon>repeat</v-icon>Observable and Resilient</h3>
            <p class="features-text">With support for health checks, metrics, tracing and fault tolerance, Helidon has what you need to
              write cloud ready applications that integrate with Prometheus, Jaeger/Zipkin and Kubernetes.</p>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container jumbo>
        <v-layout justify-center>
          <v-flex text-xs-center xs12>
            <h2 style="color: #3ea5fd; font-size: 2rem">Helidon SE DBClient</h2>
            <div class="ul-style">
              <ul>
                <li>Reactive non-blocking database client</li>
                <li>Supports existing blocking JDBC drivers</li>
                <li>Relational and non-relational databases</li>
                <li>Metrics, tracing, health checks</li>
                <li>Portability</li>
                <li>Extensibility</li>
              </ul>
            </div>
            <div style =" padding-top: 20px">
              <v-btn box color="info" darkclass="info-button" href="./docs/v2/#/se/dbclient/01_introduction">Read more</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
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

<style lang = "sass">
  .new-features-slide
    :min-height 700px
    :min-width 300px
    :text-align center
    :width 100vw
    :height calc(100vh - 58px)
    :background-color #41a8ff
    @media screen and (max-width: 600px)
      :height auto
    .carousel
      :background-color #f8f8f8
      :width 100%
      :height 100%
      :box-shadow none
      @media screen and (max-width: 600px)
        max-height: 600px
      .carousel-item
      .graalvm-img
        :height 210px
        :max-width 470px
        :margin 0 auto
        :background-image url('../static/img/graalvm_logo.svg')
        :background-position center center
        :background-size contain
        @media screen and (max-width: 600px)
          :height 200px
          :max-width 300px
      .graalvm-description
        :text-align center
        :vertical-align middle
        :padding-left 10vw
        :padding-right 10vw
        :font-size 6vmin
        :color #797979
      .cli-flex
        :text-align center
        :padding-left 10vw
        :padding-right 10vw
      .cli-img
        :background-image url('../static/img/cli.png')
        :background-position center
        :background-size contain
        :height 40vh
      .cli-description
        :color #3ea5fd
        :text-align center
        :vertical-align top
        :font-size 5vmax
      .features-flex
        :text-align left
        :padding-top 15px
        :padding-right 20px
        @media screen and (max-width: 960px)
          :padding-top 5px
          :padding-right 20%
          :padding-left 20%
        @media screen and (max-width: 600px)
          :justify-content center
          :padding-left 0
          :padding-right 0
      .graphics
        :height 85%
        :background-position 0 50%
        :background-size contain
        :margin-top 10px
      .features-header
        :font-weight bolder
        :font-size 1.8em
        :margin-bottom 20px
        :margin-left 5px
        :padding-left 5px
        :color #3ea5fd
        @media screen and (max-width: 600px)
          :font-size 1.5em
          :margin-bottom 10px
        > i
          :margin-right 10px
          :color #3ea5fd !important
      .features-text
        :color #3ea5fd
        :font-size 1.25em
        :margin-left 10px
        @media screen and (max-width: 600px)
          :font-size 1.3em
    .carousel__controls
      :background transparent !important
    .dbclient-header
      :font-weight bolder
      :font-size 4vmax
      :margin-bottom 2%
      :color #3ea5fd
      :text-align center
      :vertical-align top
      @media screen and (max-width: 600px)
        :margin-bottom 1%
    .fifth-slide
      :text-align center
      .ul-style
        :background-color #3ea5fd
        :background-image url('../static/img/helidon_logo_light.png')
        :background-position 97%
        :background-size 15%
        :width 60%
        :margin 0 auto
        :position center
        :border-style solid
        :border-color #3ea5fd
        :border-width 3vh
        @media screen and (max-width: 960px)
          :background-image none
          :width 90%
        ul
          :text-align left
          :margin-left 5%
          :margin-right 5%
          :max-width 80%
          @media screen and (max-width: 600px)
            :width 90%
            :margin-left 5%
            :margin-right 5%
          li
            :font-size 1.5rem
            :color #f8f8f8
            :font-family monospace
            @media screen and (max-width: 600px)
              :font-size 1.1rem
      .button-fifth
        :text-align center
        :margin-top 30px
      @media screen and (max-width: 600px)
        :margin-top 10px
    .simple-and-fast-graphic
      :background-image url('../static/img/helidon_feature_simple_and_fast.png')
    .microprofile-support-graphic
      :background-image url('../static/img/helidon_feature_microprofile_support.png')
    .reactive-web-server-graphic
      :background-image url('../static/img/helidon_feature_reactive_web_server.png')
    .observable-and-resilient-graphic
      :background-image url('../static/img/helidon_feature_observable_and_resilient.png')
  .jumbo
    :min-height 300px
    :min-width 300px
    :background-color #f8f8f8
    :margin-bottom 30px
    :justify-content center
    :align-content center
    .features-header
      :font-weight bolder
      :font-size 1.4em
      :margin-bottom 10px
      :color #3ea5fd
      :text-align left
      > i
        :margin-right 10px
        :color #3ea5fd !important
    .features-text
      :color #3ea5fd
      :font-size 1.2em
      :text-align left
    p
      :position center
      :margin-top 20px
    .jumbo1-img
      :margin-top 30px
      :background-image url('../static/img/graalvm_logo.svg')
      :background-position center
      :background-size contain
      :min-width 100px
      :min-height 100px
    .ul-style
      :background-color #3ea5fd
      :position center
      :border-style solid
      :border-color #3ea5fd
      :border-width 30px
      li
        :font-size 1.2rem
        :color #f8f8f8
        :font-family monospace
        :margin-bottom 10px
        :text-align left
      .button-fifth
        :text-align center
        :margin-top 30px
      @media screen and (max-width: 600px)
        :margin-top 10px
</style>
