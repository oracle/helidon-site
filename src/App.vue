<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <v-app>

    <!-- NAVIGATION MENU -->
    <!--
      Firefox workaround: put the toolbar outside the wrapper to fix some bug
      with position sticky. The trade-off is that the toolbar takes the full width
      of the window overlaps the scroll bar. Scrolling functions normally.
    -->
    <v-toolbar app
               fixed
               height="58px"
               v-bind:dark="!isScrolling()"
               v-bind:flat="!isScrolling()"
               class="landing-page-toolbar"
               v-bind:class="toolbarClass()">
      <v-toolbar-items>
        <v-btn flat
               v-scroll-to="'#top'"
               class="toolbar-logo"
               rel="noopener"/>
        <v-btn flat
               v-scroll-to="'#features'"
               class="hidden-sm-and-down"
               rel="noopener">Features</v-btn>
        <v-btn flat
               v-scroll-to="'#getting-started'"
               class="hidden-sm-and-down"
               rel="noopener">Getting Started</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat
               href="./docs/latest"
               target="_blank"
               rel="noopener"><v-icon>import_contacts</v-icon></v-btn>
        <v-btn flat
               href="https://github.com/oracle/helidon"
               target="_blank"
               rel="noopener"><i class="icon fab fa-github"></i></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <parallaxWrapper id="parallax_wrapper" v-bind:scrollOffset=400 >

      <!-- PARALLAX LAYERS -->
      <parallaxLayer img="parallax_layer_sky.png"
                     id="top"
                     v-bind:height="1066"
                     v-bind:top="0"
                     v-bind:zIndex="0"
                     v-bind:depth="5" />

      <parallaxLayer img="parallax_layer_sun.png"
                     v-bind:height="314"
                     v-bind:top="500"
                     v-bind:zIndex="10"
                     v-bind:depth="5" />

      <parallaxLayer img="parallax_layer_mountains_1.png"
                     v-bind:height="317"
                     v-bind:top="600"
                     v-bind:zIndex="10"
                     v-bind:depth="4.75" />

      <parallaxLayer img="parallax_layer_mountains_2.png"
                     v-bind:height="346"
                     v-bind:top="650"
                     v-bind:zIndex="20"
                     v-bind:depth="3.75" />

      <parallaxLayer img="parallax_layer_mountains_3.png"
                     v-bind:height="400"
                     v-bind:top="716"
                     v-bind:zIndex="30"
                     v-bind:depth="3" />

      <parallaxLayer img="parallax_layer_frank.png"
                     v-bind:height="194"
                     v-bind:top="450"
                     v-bind:zIndex="30"
                     v-bind:depth="3" />

      <parallaxLayer img="parallax_layer_city.png"
                     v-bind:height="910"
                     v-bind:top="810"
                     v-bind:zIndex="40"
                     v-bind:depth="1.7" />

      <parallaxLayer img="parallax_layer_hills.png"
                     v-bind:height="1145"
                     v-bind:top="780"
                     v-bind:zIndex="50"
                     v-bind:depth="1" />

      <parallaxCover v-bind:top=1640
                     v-bind:zIndex=80
                     backgroundColor="#f8f8f8">

        <!-- TEXT BELOW PARALLAX -->
        <div class="hero_text">
          <div class="container fluid light hero_text_content">
            <p>Helidon is a collection of Java libraries for writing
              microservices that run on a fast web core powered by Netty.</p>
          </div>
        </div>

        <!-- SLIDES -->
        <features id="features" />
        <gettingStarted id="getting-started"/>

        <!-- FOOTER -->
        <v-footer>
          <div>Copyright &copy; 2018, Oracle and/or its affiliates. All rights reserved. Oracle and Java are registered
         trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.</div>
        </v-footer>
      </parallaxCover>

    </parallaxWrapper>
  </v-app>
</template>
<script>
  import parallaxWrapper from './ParallaxWrapper'
  import parallaxLayer from './ParallaxLayer'
  import parallaxCover from './ParallaxCover'
  import features from './Features'
  import gettingStarted from './GettingStarted'
  export default {
    components: {
      parallaxWrapper,
      parallaxLayer,
      parallaxCover,
      features,
      gettingStarted
    },
    methods: {
      toolbarClass () {
        return [!this.$store.state.isScrolling ? 'toolbar-top' : 'toolbar-scroll']
      },
      isScrolling () {
        return this.$store.state.isScrolling
      }
    }
  }
</script>
<style lang="sass">

  html
    :overflow-y auto!important

  *
   :box-sizing border-box

  nav
    &.landing-page-toolbar
      :z-index 200
      :position sticky !important
      .toolbar-logo
        :width 140px
        :background-size 110px 25px
        :background-position 16px 19px
      &.theme--dark
        &.toolbar-top
          :background-color transparent!important
          .toolbar-logo
            :background-image url('../static/img/helidon_logo_white_outline.png')
      &.toolbar-scroll
        .toolbar-logo
          :background-image url('../static/img/helidon_logo_black_outline.png')
      .toolbar__items
        .btn
          :text-transform none
          :font-size 16px
          :font-weight 400
        i
          :-webkit-transition unset!important
          :transition unset!important

  .hero_text
    :left 0
    :margin-top -100px
    :margin-bottom 150px
    .hero_text_content
      @media (min-width: 600px)
        :margin-left 20%
        :margin-right 20%
        :width 60%
      @media (min-width: 1000px)
        :margin-left 25%
        :margin-right 25%
        :width 50%
      @media (min-width: 1300px)
        :margin-left 33%
        :margin-right 33%
        :width 33%
      p
        :color #3ea5fd
        :font-size 25px
        :font-weight 400
        :text-align center

  .footer
    :height auto!important
    :padding-bottom 30px
    :padding-top 30px
    :padding-left 50px
    :padding-right 50px
    :background-color #258bf5 !important
    > div
     :color white
     :width 100%
     :text-align center
     :padding-top 10px
     :padding-bottom 0px
     :padding-left 10%
     :padding-right 10%
     :border-top 1px solid white
     :font-size 0.9em
</style>
