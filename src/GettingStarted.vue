<!--
  ~ Copyright (c) 2018, 2019 Oracle and/or its affiliates. All rights reserved.
-->
<template>
  <v-container v-bind:id="id" fluid light class="slide_getting_started">
    <h2>Getting started</h2>
    <v-layout row wrap>
      <v-flex md1 lg2 class="hidden-sm-and-down"/>
      <v-flex md10 lg8 xs12 sm12>
        <v-layout row wrap>
          <v-layout row wrap class="step step1">
            <v-flex xs12>
                <h4>Choose your programming model</h4>
            </v-flex>
            <v-flex xs12 class="code-snippet">
                <h5>Helidon SE: MicroFramework</h5>
                <pre><code>WebServer.create(
  Routing.builder()
    .get("/greet", (req, res)
       -> res.send("Hello World!"))
    .build())
  .start();</code></pre>
            </v-flex>
            <v-flex xs12 class="code-snippet">
              <h5>Helidon MP: MicroProfile</h5>
              <pre><code>public class GreetService {
  @GET
  @Path("/greet")
  public String getMsg() {
    return "Hello World!";
  }
}</code></pre>
            </v-flex>
          </v-layout>
          <v-flex xs12 class="step step2">
            <h4>Build, run, test</h4>
            <h5>Build</h5>
            <pre><code>$ mvn package</code></pre>
            <h5>Run</h5>
            <pre><code>$ java -jar target/myapp.jar</code></pre>
            <h5>Test</h5>
            <pre><code>$ curl -X GET http://localhost:8080/greet
Hello World!</code></pre>
          </v-flex>
          <v-flex xs12 class="step step3">
            <h4>Get started!</h4>
            <v-btn light
                   large
                   href="./docs/latest/#/getting-started/02_base-example"
                   target="_blank"
                   rel="noopener">Try it now</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md1 lg2 class="hidden-sm-and-down"/>
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
  .slide_getting_started
    :background-color #41a8ff
    :padding-top 100px
    :padding-bottom 100px
    h2
      :color white
      :text-align center
      :font-weight 400
      :font-size 3em
      :margin-bottom 100px
    h4
      :text-align left
      :font-weight 400
      :color white
      :font-size 1.5em
      :margin-top 15px
      :margin-bottom 25px
    h5
      :color white
      :font-size: 1.1em
      :margin-top 25px
    code
      :font-size 1.25em
      :font-weight normal
      :background-color #258bf5
      :width 100%
      :color  white
      :-webkit-box-shadow none
      :box-shadow none
      :padding-left 10px
      :padding-right 10px
      :padding-top 10px
      :padding-bottom 10px
    // Increase padding on non very small display
    @media screen and (min-width: 376px)
      code
        :padding-left 20px
        :padding-right 20px
      code:after, code:before
        :content none!important
    .step
      :margin-bottom 0px
      :padding-bottom 60px
      .btn
        :margin-top 15px
        :margin-left -1.2px
      .btn__content
        :color #3ea5fd
    @media screen and (min-width: 460px)
      .step1
        :padding-left 65px
        :background-image url('../static/img/helidon_getting_started_step1.png')
      .step2
        :padding-left 65px
        :background-image url('../static/img/helidon_getting_started_step2.png')
      .step3
        :padding-left 65px
        :min-height 350px
        :background-image url('../static/img/helidon_getting_started_step3.png')
</style>
