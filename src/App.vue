<!--
  ~ Copyright (c) 2018, 2020 Oracle and/or its affiliates. All rights reserved.
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
               v-bind:style="toolbarStyle()"
               v-bind:class="toolbarClass()">
      <v-toolbar-items>
        <v-btn flat
               v-on:click="scrollTo('#top')"
               class="toolbar-logo"
               rel="noopener"/>
        <v-btn flat
               v-on:click="scrollTo('#features')"
               class="hidden-sm-and-down"
               rel="noopener">Features</v-btn>
        <v-btn flat
               v-on:click="scrollTo('#getting-started')"
               class="hidden-sm-and-down"
               rel="noopener">Getting Started</v-btn>
        <v-btn flat
               v-on:click="scrollTo('#community')"
               class="hidden-sm-and-down"
               rel="noopener">Community</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat
               href="https://medium.com/helidon"
               target="_blank"
               class="hidden-xs-only"
               rel="noopener">Blog</v-btn>
        <v-menu offset-y
                bottom
                transition="slide-y-transition">
          <v-btn slot="activator"flat>
            Documentation
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, index) in docs" :key="index" :href="item.url" target="_blank">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat
               href="./docs/latest"
               target="_blank"
               class="hidden-sm-and-up"
               rel="noopener"><v-icon>import_contacts</v-icon></v-btn>
        <v-btn flat
               href="https://github.com/oracle/helidon"
               target="_blank"
               rel="noopener"><i class="icon fab fa-github"></i></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <parallaxFallback v-if="!this.doParallax"
                      id="parallax_fallback"
                      v-bind:scrollOffset="50" >

      <mobileCover id="top">
        <heroText/>
      </mobileCover>
      <features id="features" />
      <gettingStarted id="getting-started"/>
      <technologies id="technologies"/>
      <community id="community"/>
      <zFooter/>

    </parallaxfallback>

    <!-- DESKTOP (> 960px) -->
    <parallaxWrapper v-else
                     id="parallax_wrapper"
                     v-bind:scrollOffset="400" >

      <!-- PARALLAX LAYERS -->
      <parallaxLayer img="parallax_layer_sky.png"
                     id="top"
                     v-bind:height="1066"
                     v-bind:top="0"
                     v-bind:zIndex="0"
                     v-bind:depth="5" />

      <parallaxLayer img="parallax_layer_mountains_1.png"
                     v-bind:height="421"
                     v-bind:top="450"
                     v-bind:zIndex="10"
                     v-bind:depth="4.75" />

      <parallaxLayer img="parallax_layer_mountains_2.png"
                     v-bind:height="328"
                     v-bind:top="650"
                     v-bind:zIndex="20"
                     v-bind:depth="3.75" />

      <parallaxLayer img="parallax_layer_mountains_3.png"
                     v-bind:height="435"
                     v-bind:top="716"
                     v-bind:zIndex="30"
                     v-bind:depth="3" />

      <parallaxLayer img="parallax_layer_city.png"
                     v-bind:height="1100"
                     v-bind:top="810"
                     v-bind:zIndex="40"
                     v-bind:depth="1.7" />

      <parallaxLayer img="parallax_layer_hills.png"
                     v-bind:height="1186"
                     v-bind:top="810"
                     v-bind:zIndex="50"
                     v-bind:depth="1" />

      <parallaxCover v-bind:top=1640
                     v-bind:zIndex=80
                     backgroundColor="#f8f8f8">

        <heroText backgroundColor="#f8f8f8"
                  color="#3ea5fd"
                  v-bind:paddingBottom=100 />
        <features id="features" />
        <gettingStarted id="getting-started"/>
        <technologies id="technologies"/>
        <community id="community"/>
        <zFooter/>

      </parallaxCover>

    </parallaxWrapper>
  </v-app>
</template>
<script>
  // import the parallax image for webpack to bundle them
  import '../static/img/parallax_layer_sky.png'
  import '../static/img/parallax_layer_mountains_1.png'
  import '../static/img/parallax_layer_mountains_2.png'
  import '../static/img/parallax_layer_mountains_3.png'
  import '../static/img/parallax_layer_city.png'
  import '../static/img/parallax_layer_hills.png'

  import '../static/img/logo-docker-500x500.png'
  import '../static/img/logo-eclipselink-500x500.png'
  import '../static/img/logo-graalvm-500x500.png'
  import '../static/img/logo-jaeger-500x500.png'
  import '../static/img/logo-jersey-500x500.png'
  import '../static/img/logo-kubernetes-500x500.png'
  import '../static/img/logo-microprofile-500x500.png'
  import '../static/img/logo-netty-500x500.png'
  import '../static/img/logo-openapi-500x500.png'
  import '../static/img/logo-opentracing-500x500.png'
  import '../static/img/logo-prometheus-500x500.png'
  import '../static/img/logo-zipkin-500x500.png'
  import '../static/img/unfurl_logo.png'
  import '../static/img/graalvm_logo.svg'
  import '../static/img/cli.png'

  import parallaxWrapper from './ParallaxWrapper'
  import parallaxLayer from './ParallaxLayer'
  import parallaxCover from './ParallaxCover'
  import parallaxFallback from './ParallaxFallback'
  import mobileCover from './MobileCover'
  import heroText from './HeroText'
  import features from './Features'
  import gettingStarted from './GettingStarted'
  import technologies from './Technologies'
  import community from './Community'
  import zFooter from './ZFooter'
  import VueScrollTo from 'vue-scrollto'
  
  export default {
    components: {
      parallaxWrapper,
      parallaxLayer,
      parallaxCover,
      parallaxFallback,
      mobileCover,
      heroText,
      features,
      technologies,
      gettingStarted,
      community,
      zFooter
    },
    data () {
      return {
        doParallax: false,
        docs: [
          {
            title: 'Helidon 1',
            url: 'docs/v1'
          },
          {
            title: 'Helidon 2',
            url: 'docs/v2'
          }
        ]
      }
    },
    created () {
      document.body.addEventListener('touchmove', this.onTouch, { passive: false })
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      this.$store.commit('ISMOBILE', isMobile)
      if (!isMobile) {
        window.addEventListener('resize', this.onResize)
        this.onResize()
      }
    },
    mounted () {
      if (this.doParallax) {
        // on firefox do a scroll to force rendering of parallax layers
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
        if (isFirefox) {
          document.getElementById('parallax_wrapper').scrollTop = 1
        }
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.onResize)
      document.body.removeEventListener('touchmove', this.onTouch)
    },
    methods: {
      onTouch (e) {
        e.preventDefault()
      },
      onResize () {
        const previousDoParallax = this.doParallax
        const currentDoParallax = window.innerWidth > 960
        if (previousDoParallax !== currentDoParallax) {
          this.doParallax = currentDoParallax
          this.$forceUpdate()
        }
      },
      toolbarStyle () {
        let style = {}
        if (!this.isMobile) {
          style.position = 'sticky !important'
        }
        return style
      },
      toolbarClass () {
        return [!this.$store.state.isScrolling ? 'toolbar-top' : 'toolbar-scroll']
      },
      isScrolling () {
        return this.$store.state.isScrolling
      },
      scrollTo (elt) {
        var options = {
          ease: 'ease',
          offset: -58
        }
        if (this.doParallax) {
          options.container = '#parallax_wrapper'
        } else {
          options.container = '#parallax_fallback'
        }
        VueScrollTo.scrollTo(elt, 500, options)
      }
    }
  }
</script>
<style lang="sass">

  html,body, #app
    :width 100%
    :height 100%
    :overflow hidden
    :position fixed

  *
   :box-sizing border-box

  nav
    &.landing-page-toolbar
      :z-index 200
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
</style>
