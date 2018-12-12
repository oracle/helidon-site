<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div v-bind:id="id" class="mobile_cover_container">
    <div class="mobile_cover_bgd"/>
    <div class="mobile_cover_content">
      <div class="mobile_cover_logo"/>
      <slot/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        type: String,
        required: false
      }
    }
  }
</script>
<style lang="sass">
  .mobile_cover_container
    :position relative
  .mobile_cover_bgd
    :width 100%
    :height 100%
    :position absolute
    :top 0
    :transform rotate(-180deg)
    :background-image linear-gradient(19deg, #4174d8, #4accf8)
  .mobile_cover_content
      :position relative
      :padding-top 100px
      :padding-bottom 100px
  .mobile_cover_logo
      :min-height 200px
      :margin-bottom 50px
      :margin-top 50px
      :background-image url('../static/img/helidon_logo_light.png')
      :background-repeat no-repeat
      :background-position 50% 50%
      :background-size 200px 200px
</style>
