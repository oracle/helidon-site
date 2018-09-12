<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div class="parallax_cover" v-bind:style="coverStyle()">
    <slot/>
  </div>
</template>
<script>
  export default {
    props: {
      top: {
        type: Number,
        required: true
      },
      backgroundColor: {
        type: String,
        required: true
      },
      zIndex: {
        type: Number,
        default: 80
      }
    },
    methods: {
      coverStyle () {
        return {
          top: this.top + 'px',
          backgroundColor: this.backgroundColor,
          zIndex: this.zIndex
        }
      }
    }
  }
</script>
<style lang="sass">
  .parallax_cover
    :display block
    :position absolute
    :transform translateZ(0px) translateY(0px) translateX(0px) scale(1);
    :left 0
    :width 100%
</style>
