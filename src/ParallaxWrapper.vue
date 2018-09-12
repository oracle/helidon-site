<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div v-bind:id="id" class="parallax_wrapper" ref="parallaxWrapper" v-on:scroll.passive="onScroll">
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
      scrollOffset: {
        type: Number,
        default: 0
      }
    },
    methods: {
      onScroll () {
        const previousIsScrolling = this.$store.state.isScrolling
        const currentIsScrolling = this.$refs.parallaxWrapper.scrollTop > this.scrollOffset
        if (previousIsScrolling !== currentIsScrolling) {
          this.$store.commit('ISSCROLLING', currentIsScrolling)
        }
      }
    }
  }
</script>
<style lang="sass">
  .parallax_wrapper
    :perspective 100px
    :perspective-origin 0% 0%
    :height 100vh
    :width 100vw
    :overflow-y auto
    :overflow-x hidden
    :position absolute
    :top 0
    :right 0
    :bottom 0
</style>

