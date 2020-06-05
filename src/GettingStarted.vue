<!--
  ~ Copyright (c) 2018, 2020 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <v-container v-bind:id="id" fluid fill-height light slide_getting_started>
    <v-layout column justify-center>
      <v-flex xs12>
        <h2>Getting started</h2>
        <v-layout row wrap>
          <!-- The break to single column is at sm -->
          <v-flex sm2 md1 lg2 xl2 hidden-xs-only />
          <v-flex sm8 md10 lg8 xl8>
              <v-layout row wrap>
                <!-- The break to single column is at sm -->
                <v-flex xs12 sm12 md6 lg6 xl6 getting_started_panel getting_started_panel_left>
                    <div class="helidon-logo helidon-se-logo"/>
                    <v-carousel hide-controls delimiter-icon="stop">
                      <v-carousel-item>
                        <div class="carousel-item-container">
                          <ul>
                            <li><v-icon dark>checked</v-icon>Reactive Microframework</li>
                            <li><v-icon dark>checked</v-icon>Tiny Footprint</li>
                            <li><v-icon dark>checked</v-icon>Functional Style</li>
                            <li><v-icon dark>checked</v-icon>Simple and Transparent</li>
                            <li><v-icon dark>checked</v-icon>GraalVM Native Image</li>
                          </ul>
                        </div>
                      </v-carousel-item>
                      <v-carousel-item>
                        <div class="carousel-item-container">
                          <pre><code>WebServer.create(
      Routing.builder()
        .get("/greet", (req, res)
           -> res.send("Hello World!"))
        .build())
      .start();</code></pre>
                        </div>
                      </v-carousel-item>
                    </v-carousel>
                    <v-layout row wrap>
                      <v-flex xs6 btn-container>
                        <v-btn light
                               large
                               class="ma-0"
                               href="./docs/latest/#/guides/02_quickstart-se"
                               target="_blank"
                               rel="noopener">Get Started</v-btn>
                      </v-flex>
                      <v-flex xs6 btn-container>
                        <v-btn light
                               large
                               class="ma-0"
                               href="./docs/latest/#/about/02_introduction"
                               target="_blank"
                               rel="noopener">Learn More</v-btn>
                      </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 hidden-md-and-up vertical-spacer />
                <v-flex xs12 sm12 md6 lg6 xl6 getting_started_panel getting_started_panel_right>
                  <div class="helidon-logo helidon-mp-logo"/>
                  <v-carousel hide-controls delimiter-icon="stop">
                      <v-carousel-item>
                        <div class="carousel-item-container">
                          <ul>
                            <li><v-icon dark>checked</v-icon>MicroProfile</li>
                            <li><v-icon dark>checked</v-icon>Small Footprint</li>
                            <li><v-icon dark>checked</v-icon>Declarative Style</li>
                            <li><v-icon dark>checked</v-icon>Dependency Injection</li>
                            <li><v-icon dark>checked</v-icon>CDI, JAX-RS, JSON-P/B </li>
                          </ul>
                        </div>
                      </v-carousel-item>
                      <v-carousel-item>
                        <div class="carousel-item-container">
                          <pre><code>public class GreetService {
      @GET
      @Path("/greet")
      public String getMsg() {
        return "Hello World!";
      }
    }</code></pre>
                        </div>
                      </v-carousel-item>
                  </v-carousel>
                  <v-layout row wrap>
                    <v-flex xs6 btn-container>
                      <v-btn light
                             large
                             class="ma-0"
                             href="./docs/latest/#/guides/03_quickstart-mp"
                             target="_blank"
                             rel="noopener">Get Started</v-btn>
                    </v-flex>
                    <v-flex xs6 btn-container>
                      <v-btn light
                             large
                             class="ma-0"
                             href="./docs/latest/#/about/02_introduction"
                             target="_blank"
                             rel="noopener">Learn More</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              </v-flex>
          <v-flex sm2 md1 lg2 xl2 hidden-xs-only />
        </v-layout>
      </v-flex>
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
  .vertical-spacer
    :height 100px

  .slide_getting_started
    :background-color #41a8ff
    :padding-top 100px
    :padding-bottom 100px
    :height calc(100vh - 58px)
    :min-height 800px
    @media screen and (max-width: 960px)
      height: auto
    .getting_started_panel
      .btn-container
        :padding-left 1px
        :padding-right 1px
        .btn
          :width 100%
    .getting_started_panel_left
      :width 100%
    .getting_started_panel_right
      :width 100%
    img
      :width 100%
    h2
      :color white
      :text-align center
      :font-weight 400
      :font-size 3em
      :padding-bottom 5%
    h3
      :text-align center
      :font-weight 400
      :color white
      :font-size 2.0em
      :margin-bottom 25px
    h4
      :text-align center
      :font-weight 400
      :color white
      :font-size 1.5em
      :margin-top 0px
      :margin-bottom 15px
    h5
      :text-align center
      :color white
      :font-size 1.1em
      :margin-top 25px
    .helidon-logo
      :background-position 50% 50%
      :background-size contain
      :height 150px
    .helidon-se-logo
      :background-image url('../static/img/Helidon_SE_white.png')
    .helidon-mp-logo
      :background-image url('../static/img/Helidon_MP_white.png')
    code
      :width 100%
      :font-size 1em
      :font-weight normal
      :background-color transparent
      :height 13em
      :color  white
      :-webkit-box-shadow none
      :box-shadow none
    .carousel
      :margin-top 20px
      :box-shadow none
      :height 200px
      :background-color #258bf5
      .carousel__controls
        :background-color transparent
    .carousel-item-container
      :padding-left 10px
      :padding-right 10px
      :padding-top 10px
      :padding-bottom 10px
      ul
        :list-style none
        :padding 0
        :color white
        :font-family monospace
        :font-size 1em
        :font-weight normal
        li
          i
            :margin-right -25px

    // Set padding-right and padding-left for the panels
    // in order to create an in-between spacing
    @media screen and (min-width: 960px)
      .getting_started_panel_left
        :padding-right 10px
      .getting_started_panel_right
        :padding-left 10px
    // Non very small display
    @media screen and (min-width: 376px)
      .carousel-item-container
        :padding-left 20px
        :padding-right 20px
        ul
          :font-size 1.25em
          li
            i
              :margin-right 0px
        code
          :font-size 1.25em
      .carousel
        :height 250px
      code:after, code:before
        :content none!important
</style>
