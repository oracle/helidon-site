<!--
  ~ Copyright (c) 2018, 2019 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <v-container v-bind:id="id" fluid light slide_community>
    <h2>Community</h2>
    <v-layout row wrap>
      <!-- The break to single column is at sm -->
      <v-flex sm2 md1 lg2 xl2 hidden-xs-only />
      <v-flex xs12 sm8 md10 lg8 xl8>
          <v-layout row wrap>
            <!-- The break to single column is at sm -->
            <v-flex xs12 sm12 md8 lg7 xl6 community_panel_left>
              <h3>Get Answers</h3>
                <ul>
                <li><i class="icon fab fa-stack-overflow"></i><a href="https://stackoverflow.com/tags/helidon" target="_blank">https://stackoverflow.com/tags/helidon</a></li>
                <li><i class="icon fab fa-slack"></i><a href="https://join.slack.com/t/helidon/shared_invite/enQtNDM1NjU3MjkyNDg2LWNiNGIzOGFhZDdjNzAyM2Y2MzlmMDI4NWY4YjE1OWQ2OTdkYTZkN2FlNDcxNmUyZmZmMTZhZmZhNWI2ZTI1NGI" target="_blank">https://helidon.slack.com</a></li>
                <li><v-icon>help</v-icon><a href="https://github.com/oracle/helidon/wiki/FAQ" target="_blank">Helidon FAQ</a></li>
                </ul>
              <h3>Contribute</h3>
                <ul>
                <li><i class="icon fab fa-github"></i><a href="https://github.com/oracle/helidon" target="_blank">https://github.com/oracle/helidon</a></li>
                </ul>
              <h3>Stay Informed</h3>
                <ul>
                <li><i class="icon fab fa-medium"></i><a href="https://medium.com/helidon" target="_blank">https://medium.com/helidon</a></li>
                <li><i class="icon fab fa-twitter"></i><a href="https://twitter.com/helidon_project" target="_blank">@helidon_project</a></li>
                </ul>
            </v-flex>
            <v-flex hidden-sm-and-down xs12 sm12 md4 lg5 xl6 community_panel_right/>
          </v-layout>
      </v-flex>
      <v-flex sm2 md1 lg2 xl2 hidden-xs-only />
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="sass">
  .slide_community
    :background-color #41a8ff
    :padding-top 100px
    :padding-bottom 100px
    .community_panel_left
      :width 100%
      :margin-top -25px
      ul
        :margin 0px
        li
          :list-style-type none
          :font-weight 400
          :font-size 0.9em
          :line-height 25px
          :color white
          :margin-bottom 5px
          i
            :margin-right 15px
            :width 25px
            :color #bcddff
    .community_panel_right
      :background-position: 50% 50%
      :background-size contain
      :height 200px
      :background-image url('../static/img/Profile_pic_1x.png')
      :margin auto
    img
      :width 100%
    a
      :color #FFFFFF
      :text-decoration-line none
      &:hover
        :color #bcddff
    h2
      :color white
      :text-align center
      :font-weight 400
      :font-size 3em
      :margin-bottom 100px
    h3
      :font-weight 400
      :color white
      :font-size 2.0em
      :margin-top 25px
    @media screen and (min-width: 376px)
      .community_panel_left
        ul
          li
            :margin-left 20px
    @media screen and (min-width: 600px)
      .community_panel_left
        ul
          li
            :font-size 1.3em
    @media screen and (min-width: 960px)
      .community_panel_left
        ul
          li
            :font-size 1.5em
</style>
