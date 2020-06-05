<!--
  ~ Copyright (c) 2018, 2020 Oracle and/or its affiliates. All rights reserved.
-->
<template>
    <v-footer v-bind:style="footerStyle()">
      <div>Copyright &copy; 2018, Oracle and/or its affiliates. All rights reserved. Oracle and Java are registered
     trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.</div>
    </v-footer>
</template>
<script>
  export default {
    methods: {
      footerStyle () {
        let style = {}
        if (this.$store.state.isMobile) {
          style.paddingBottom = '100px'
        }
        return style
      }
    }
  }
</script>
<style lang="sass">
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
     :font-size 0.9em
</style>
