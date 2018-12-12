<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
    <div class="hero_text">
      <div class="container fluid light hero_text_content" v-bind:style="heroStyle()">
        <p>Helidon is a collection of Java libraries for writing
          microservices that run on a fast web core powered by Netty.</p>
      </div>
    </div>
</template>
<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: 'transparent'
      },
      color: {
        type: String,
        default: 'white'
      },
      paddingTop: {
        type: Number,
        default: 0
      },
      paddingBottom: {
        type: Number,
        default: 0
      }
    },
    methods: {
      heroStyle () {
        return {
          backgroundColor: this.backgroundColor,
          color: this.color,
          paddingTop: this.paddingTop + 'px',
          paddingBottom: this.paddingBottom + 'px'
        }
      }
    }
  }
</script>
<style lang="sass">
  .hero_text
    :left 0
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
        :font-size 25px
        :font-weight 400
        :text-align center
</style>
