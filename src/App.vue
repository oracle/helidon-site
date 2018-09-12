<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <v-app>

    <parallaxWrapper id="parallax_wrapper" v-bind:scrollOffset=600 >

      <!-- NAVIGATION MENU -->
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

      <!-- PARALLAX LAYERS -->
      <parallaxLayer img="parallax_layer_sky.png"
                     id="top"
                     v-bind:height="1066"
                     v-bind:top="0"
                     v-bind:zIndex="0"
                     v-bind:depth="5" >

        <!-- TEXT TOP OF PARALLAX -->
        <div class="hero_title">
          <h1>Project Helidon</h1>
          <p>Lightweight. Fast. Crafted for Microservices.</p>
        </div>
      </parallaxlayer>

      <parallaxLayer img="parallax_layer_sun.png"
                     v-bind:height="236"
                     v-bind:top="500"
                     v-bind:zIndex="10"
                     v-bind:depth="5" />

      <parallaxLayer img="parallax_layer_mountains_1.png"
                     v-bind:height="238"
                     v-bind:top="600"
                     v-bind:zIndex="10"
                     v-bind:depth="4.75" />

      <parallaxLayer img="parallax_layer_mountains_2.png"
                     v-bind:height="260"
                     v-bind:top="650"
                     v-bind:zIndex="20"
                     v-bind:depth="3.75" />

      <parallaxLayer img="parallax_layer_mountains_3.png"
                     v-bind:height="300"
                     v-bind:top="716"
                     v-bind:zIndex="30"
                     v-bind:depth="3" />

      <parallaxLayer img="parallax_layer_frank.png"
                     v-bind:height="146"
                     v-bind:top="450"
                     v-bind:zIndex="30"
                     v-bind:depth="3" />

      <parallaxLayer img="parallax_layer_city.png"
                     v-bind:height="684"
                     v-bind:top="812"
                     v-bind:zIndex="40"
                     v-bind:depth="1.7" />

      <parallaxLayer img="parallax_layer_hills.png"
                     v-bind:height="860"
                     v-bind:top="780"
                     v-bind:zIndex="50"
                     v-bind:depth="1" />

      <parallaxCover v-bind:top=1640
                     v-bind:zIndex=80
                     backgroundColor="#f6f6f6">

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
      //:border 1px solid blue
      .toolbar-logo
        // Toolbar logo text, hidden on super small display
        @media screen and (min-width: 376px)
          .btn__content
            &:after
              :text-transform none
              :padding-left 65px
              :font-weight 500
              :content "helidon.io"
      &.theme--dark
        &.toolbar-top
          // Set the toolbar background to transparent when not scrolling
          :background-color transparent!important
          .toolbar-logo
            :background-size 35px 35px
            :background-image url('../static/img/helidon_logo_white_outline_35x35.svg')
            :background-position 16px 11.5px
      &.toolbar-scroll
        // Set the toolbar background to white when scrolling
        .toolbar-logo
          // Change the toolbar to black when scrolling
          :background-size 35px 35px
          :background-image url('../static/img/helidon_logo_black_outline_35x35.svg')
          :background-position 16px 11.5px
      .toolbar__items
        // Force toolbar button text to be capitalized instead of all caps
        .btn
          :text-transform none
          :font-size 16px
          :font-weight 400
        // Remove transition on icons when scrolling
        i
          :-webkit-transition unset!important
          :transition unset!important

  .hero_title
    :position absolute
    :left 0
    :top 0
    :z-index 40
    :text-align center
    :margin-top 300px
    :width 100%
    h1
      :color white
      :font-size 56px
      :font-weight 300
    p
      :color rgba(255,255,255,.5)
      :font-size 22px
      :font-weight 400

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
