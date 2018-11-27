<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div class="parallax_fallback" ref="parallaxFallback"
       v-bind:id="id"
       v-bind:style="fallbackStyle()"
       v-on:scroll.passive="onScroll">

    <div v-bind:style="fallbackImgStyle()" />
    <slot/>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        type: String,
        required: false
      },
      img: {
        type: String,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      top: {
        type: Number,
        default: 0
      },
      scrollOffset: {
        type: Number,
        default: 0
      }
    },
    created () {
      window.addEventListener('scroll', this.onScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      fallbackStyle () {
        let style = {}
        style.top = (this.top * this.depth) + 'px'
        return style
      },
      fallbackImgStyle () {
        let style = {}
        style.backgroundImage = 'url( ./static/img/' + this.img + ')'
        style.height = this.height + 'px'
        return style
      },
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
    :width 100%
    :height 100vh
    :width 100vw
    :overflow-y auto
    :overflow-x hidden
    :position absolute
    :top 0
    :right 0
    :bottom 0
</style>

