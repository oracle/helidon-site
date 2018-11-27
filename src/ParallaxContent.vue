<!--
  ~ Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <div>
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
  </div>
</template>
<script>
  import features from './Features'
  import gettingStarted from './GettingStarted'
  export default {
    components: {
      features,
      gettingStarted
    }
  }
</script>
<style lang="sass">
  .hero_text
    :left 0
    :background-color #f8f8f8
    :padding-top 0px
    :padding-bottom 100px
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