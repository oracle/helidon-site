<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div class="parallax_fallback" ref="parallaxFallback"
       v-bind:id="id"
       v-on:scroll.passive="onScroll">
    <slot/>
  </div>
</template>
<script>
  import PerfectScrollbar from 'perfect-scrollbar'
  import '../node_modules/perfect-scrollbar/css/perfect-scrollbar.css'
  export default {
    props: {
      id: {
        type: String,
        required: false
      },
      scrollOffset: {
        type: Number,
        default: 0
      }
    },
    mounted () {
      /* eslint-disable no-new */
      new PerfectScrollbar(this.$refs.parallaxFallback, {
        suppressScrollX: true
      })
    },
    methods: {
      onScroll () {
        const previousIsScrolling = this.$store.state.isScrolling
        const currentIsScrolling = this.$refs.parallaxFallback.scrollTop > this.scrollOffset
        if (previousIsScrolling !== currentIsScrolling) {
          this.$store.commit('ISSCROLLING', currentIsScrolling)
        }
      }
    }
  }
</script>
<style lang="sass">
  .parallax_fallback
    :display block
    :height 100vh
    :width 100vw
    :overflow-y auto
    :overflow-x hidden
    :position absolute
    :top 0
    :right 0
    :bottom 0
    :-webkit-overflow-scrolling touch
    .ps__thumb-y
      :background-color: #655c5c
</style>
