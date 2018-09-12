<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div v-bind:id="id" class="parallax_layer" v-bind:style="layerStyle()">
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
      zIndex: {
        type: Number,
        required: false
      },
      depth: {
        type: Number,
        default: 1
      }
    },
    methods: {
      layerStyle () {
        let style = {}
        style.backgroundImage = 'url( ./static/img/' + this.img + ')'
        style.height = this.height + 'px'
        style.top = (this.top * this.depth) + 'px'
        if (this.zIndex !== undefined) {
          style.zIndex = this.zIndex
        }
        let translateZ = ((this.depth - 1) * 100)
        style.transform = 'translateZ(-' + translateZ + 'px) scale(' + this.depth + ')'
        return style
      }
    }
  }
</script>
<style lang="sass">
  .parallax_layer
    :position absolute
    :top 0
    :right 0
    :bottom 0
    :left 0
    :width 101%
    :transform-origin 0% 0%
    :background-position-x center
    :background-position-y top
</style>
