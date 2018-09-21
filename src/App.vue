<!--

    Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
  <v-app v-scroll="onScroll">
      <v-toolbar app
        :dark="!toolbar"
        :flat="!toolbar"
        :class="[!toolbar ? 'toolbar-top' : 'toolbar-scroll']"
        height="58px"
        class="landing-page-toolbar">
        <v-toolbar-items>
          <v-btn flat v-scroll-to="'#top'" class="toolbar-logo"></v-btn>
          <v-btn flat v-scroll-to="'#features'" class="hidden-sm-and-down">特性</v-btn>
          <v-btn flat v-scroll-to="'#getting-started'" class="hidden-sm-and-down">开始了解</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat
                 :href="docsUri"
                 target="_blank"
                 rel="noopener"><v-icon>import_contacts</v-icon></v-btn>
          <v-btn flat
                 href="https://github.com/oracle/helidon"
                 target="_blank"
                 rel="noopener"><i class="icon fab fa-github"></i></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container id="top" fluid light class="screen-1">
          <v-layout align-center>
            <v-flex class="screen-wrapper">
              <div class="bgd"/>
              <div class="sections">
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex md12 sm12 class="jumbotron">
                      <h1>Helidon项目</h1>
                      <p>轻巧，快速。专为微服务而精心打造。</p>
                    </v-flex>
                  </v-layout>
                  <v-flex md12 sm12 class="jumbotron-logo hidden-xs-only"/>
                  <v-layout row wrap class="section">
                    <div>
                      <p>Helidon是一个用于编写微服务的Java库集合，这些微服务运行在由Netty提供支持的快速Web核心上。</p>
                    </div>
                  </v-layout>
                </v-container>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container id="features" fluid light class="screen-2">
          <h2>特性</h2>
          <v-layout row wrap>
            <v-flex md2 class="hidden-sm-and-down"/>
            <v-flex md4 sm12 >
              <div class="section">
                <div>
                  <h3><v-icon>import_contacts</v-icon>简单快捷</h3>
                  <p>Helidon设计简单易用，配有工具和示例，可帮助您快速上手。由于Helidon只是在快速的Netty的核心上运行的库集合，因此没有额外的开销或臃肿。</p>
                </div>
              </div>
            </v-flex>
            <v-flex md4 sm12 class="simple-and-fast-graphic hidden-sm-and-down"/>
            <v-flex md2 class="hidden-sm-and-down"/>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12 class="hidden-sm-and-down vertical-spacer"/>
            <v-flex md2 class="hidden-sm-and-down"/>
            <v-flex md4 sm12 class="microprofile-support-graphic hidden-sm-and-down"/>
            <v-flex md4 sm12 >
              <div class="section">
                <div>
                  <h3><v-icon>border_clear</v-icon>支持Microprofile</h3>
                  <p>Helidon支持MicroProfile并提供熟悉的API，如JAX-RS、CDI和JSON-P/B。我们的MicroProfile实现在我们的快速的Helidon响应式Web服务器上面运行。</p>
                </div>
              </div>
            </v-flex>
            <v-flex md2 class="hidden-sm-and-down"/>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12 class="hidden-sm-and-down vertical-spacer"/>
            <v-flex md2 class="hidden-sm-and-down"/>
            <v-flex md4 sm12 >
              <div class="section">
                <div>
                  <h3><v-icon>storage</v-icon>响应式Web服务</h3>
                  <p>Helidon响应式Web服务提供了运行在Netty之上的现代功能编程模型。Helidon的Web服务轻巧、灵活、反应灵敏，为您的微服务提供简单易用的基础设施。</p>
                </div>
              </div>
            </v-flex>
            <v-flex md4 sm12 class="reactive-web-server-graphic hidden-sm-and-down"/>
            <v-flex md2 class="hidden-sm-and-down"/>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12 class="hidden-sm-and-down vertical-spacer"/>
            <v-flex md2 class="hidden-sm-and-down"/>
            <v-flex md4 sm12 class="observable-and-resilient-graphic hidden-sm-and-down"/>
            <v-flex md4 sm12 >
              <div class="section">
                <div>
                  <h3><v-icon>repeat</v-icon>可观察和弹性</h3>
                  <p>通过支持运行状况检查，指标，跟踪和容错，Helidon拥有编写与Prometheus、Zipkin和Kubernetes集成的云应用程序所需的功能。</p>
                </div>
              </div>
            </v-flex>
            <v-flex md2 class="hidden-sm-and-down"/>
          </v-layout>
        </v-container>
        <v-container id="getting-started" fluid light class="screen-3">
          <h2>开始了解</h2>
          <v-layout row wrap>
            <v-flex md1 lg2 class="hidden-sm-and-down"/>
            <v-flex md10 lg8 xs12 sm12>
                <v-layout row wrap>
                    <v-layout row wrap class="step1">
                        <v-flex xs12>
                            <h4>选择您的编程模型</h4>
                        </v-flex>
                        <v-flex md6 xs12 sm12 class="code-snippet microframework">
                            <h5>MicroFramework</h5>
                            <pre><code>WebServer.create(
  Routing.builder()
    .get("/greet", (req, res)
       -> res.send("Hello World!"))
    .build())
  .start();</code></pre>
                        </v-flex>
                        <v-flex md6 xs12 sm12 class="code-snippet microprofile">
                            <h5>MicroProfile</h5>
                            <pre><code>public class GreetService {
  @GET
  @Path("/greet")
  public String getMsg() {
    return "Hello World!";
  }
}</code></pre>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 class="step2">
                        <h4>构建，运行，测试</h4>
                        <h5>构建</h5>
                        <pre><code>$ mvn package</code></pre>
                        <h5>运行</h5>
                        <pre><code>$ java -jar target/myapp.jar</code></pre>
                        <h5>测试</h5>
                        <pre><code>$ curl -X GET http://localhost:8080/greet
Hello World!</code></pre>
                    </v-flex>
                    <v-flex xs12 class="step3">
                        <h4>开始吧！</h4>
                        <v-btn light large
                               :href="gettingStartedUri"
                               target="_blank"
                               rel="noopener">查看文档（开撸）</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md1 lg2 class="hidden-sm-and-down"/>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer>
        <div>Copyright &copy; 2018, Oracle and/or its affiliates. All rights reserved. Oracle and Java are registered
         trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.</div>
          <div>Copyright &copy; 2018, Helidon-中文社区。All rights reserved by
              <a target="_blank" href="https://daocloud.io/">DaoCloud</a>,
              <a target="_blank" href="https://github.com/JaredTan95">Jian.Tan</a>
          </div>
      </v-footer>
   </v-app>
</template>
<script>
  module.exports = {
    data: function () {
      return {
        toolbar: false,
        docsUri: './docs/' + process.env.DOCS_VERSION,
        gettingStartedUri: './docs/' + process.env.DOCS_VERSION + '/#/getting-started/02_base-example'
      }
    },
    methods: {
      onScroll () {
        this.toolbar = window.scrollY > 58
      }
    }
  }
</script>

<style>
  /*
   Set the toolbar background to transparent when not scrolling
  */
  nav.landing-page-toolbar.theme--dark.toolbar-top {
    background-color:transparent!important;
  }

  /*
   Set the toolbar background to white when scrolling
  */
  nav.landing-page-toolbar.theme--light.toolbar-scroll {
    background-color:white!important;
  }

  /*
   Change the toolbar to black when scrolling
  */
  nav.landing-page-toolbar.toolbar-scroll .toolbar-logo {
    background-size: 35px 35px;
    background-image: url('./assets/helidon_logo_black_outline_35x35.svg');
    background-position: 16px 11.5px;
  }

  /*
   Toolbar logo
  */
  nav.landing-page-toolbar .toolbar-logo {
    background-size: 35px 35px;
    background-image: url('./assets/helidon_logo_white_outline_35x35.svg');
    background-position: 16px 11.5px;
  }

  /*
   Toolbar logo text, hidden on super small display
  */
  @media screen and (min-width: 376px) {
    nav.landing-page-toolbar .toolbar-logo .btn__content:after {
      text-transform: none;
      padding-left:65px;
      font-weight: 500;
      content: "helidon.io";
    }
  }

  /*
   Force toolbar button text to be capitalized instead of all caps
  */
  nav.landing-page-toolbar .toolbar__items .btn {
    text-transform: none;
    font-size: 16px;
    font-weight: 400;
  }

  /*
   Remove transition on icons when scrolling
  */
  nav.landing-page-toolbar .toolbar__items i {
     -webkit-transition: unset!important;
     transition: unset!important;
  }

  /*
    Force the content wrap to go over the toolbar space
    This allows to have a transparent background on the toolbar
  */
  .content--wrap {
    margin-top: -58px;
  }

  /*
   1st screen
  */
  .screen-1 {
    padding:0px !important;
  }
  .screen-1 .screen-wrapper {
    position:relative;
  }
  .screen-1 .bgd {
    height: 100%;
    position: absolute;
    width: 100%;
    top: 0;
    transform: rotate(-180deg);
    background-image: linear-gradient(19deg, #4174d8, #4accf8);
  }
  .screen-1 .sections {
    position:relative;
    padding-bottom: 75px;
  }
  .screen-1 .jumbotron {
    margin-top: 150px;
    margin-bottom: 50px;
    text-align:center;
  }
  .screen-1 .jumbotron h1 {
    color: white;
    font-size:56px;
    font-weight:300;
  }
  .screen-1 .jumbotron p {
    color: rgba(255,255,255,.5);
    font-size: 22px;
    font-weight: 400;
  }
  .screen-1 .section {
    margin-left:10%;
    margin-right:10%;
  }
  .screen-1 .jumbotron-logo {
    margin-top:50px;
    margin-bottom:50px;
    min-height: 200px;
    background-image: url("./assets/helidon_logo_light.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 200px 200px;
   }
  .screen-1 .section > div {
    max-width:600px;
    margin-left:auto;
    margin-right:auto;
    margin-top: 50px;
  }
  .screen-1 .section > div > p {
    color: white;
    font-size: 25px;
    font-weight: 400;
    text-align: center;
  }

  /*
   2nd screen
  */
  .screen-2 {
    background-color: #fafafa;
    padding-top: 50px !important;
    padding-bottom: 75px !important;
  }
  /*
    Used to fill space in the grid.
  */
  .screen-2 .vertical-spacer {
      height:50px;
  }
  .screen-2 .section {
    margin-left:auto;
    margin-right:auto;
    min-height:200px;
    display:table;
  }
  .screen-2 .section > div {
    margin-left:auto;
    margin-right:auto;
    max-width:400px;
    display:table-cell;
    vertical-align:middle;
  }
  .screen-2 .section h3 > i {
    margin-right:10px;
    color: #3ea5fd;
  }
  .screen-2 .simple-and-fast-graphic {
    background-image: url('./assets/helidon_feature_simple_and_fast.svg');
    background-position: 50% 50%;
  }
  .screen-2 .microprofile-support-graphic {
    background-image: url('./assets/helidon_feature_microprofile_support.svg');
    background-position: 50% 50%;
  }
  .screen-2 .reactive-web-server-graphic {
    background-image: url('./assets/helidon_feature_reactive_web_server.svg');
    background-position: 50% 50%;
  }
  .screen-2 .observable-and-resilient-graphic {
    background-image: url('./assets/helidon_feature_observable_and_resilient.svg');
    background-position: 50% 50%;
  }
  .screen-2 h2 {
    color: #3ea5fd;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    margin-bottom: 80px;
  }
  .screen-2 h3 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-left: 8px;
    color: #3ea5fd;
  }
  .screen-2 p {
    color: #3ea5fd;
    margin-left: 8px;
  }

  /*
   3rd screen
  */
  .screen-3 {
    background-color: #41a8ff;
    padding-top: 50px !important;
    padding-bottom: 75px !important;
  }
  .screen-3 h2 {
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    color: white;
    margin-bottom: 80px;
  }
  .screen-3 h4 {
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    color: white;
    margin-top: 15px;
  }
  /*
   Hide the steps lines on small display
  */
  @media screen and (min-width: 460px) {
    .screen-3 .step1 {
      padding-bottom:50px;
      padding-left:65px;
      background-image: url('./assets/helidon_getting_started_step1.svg');
    }
    .screen-3 .step2 {
      padding-bottom:50px;
      padding-left:65px;
      background-image: url('./assets/helidon_getting_started_step2.svg');
    }
    .screen-3 .step3 {
      padding-bottom:50px;
      padding-left:65px;
      min-height:350px;
      background-image: url('./assets/helidon_getting_started_step3.svg');
    }
  }
  .screen-3 h5 {
    color: white;
    margin-top: 15px;
  }
  .screen-3 code {
    font-size:80%;
    font-weight: normal;
    background-color: #258bf5;
    width:100%;
    color: white;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding-left:10px;
    padding-right:10px;
    padding-top:10px;
    padding-bottom:10px;
  }

  /*
   Increase padding on non very small display
  */
  @media screen and (min-width: 376px) {
    .screen-3 code {
      font-size:100%;
      padding-left:20px;
      padding-right:20px;
    }
  }

  .screen-3 code:after, code:before {
    content: none!important;
  }
  /*
   Add a padding between the code blocks on medium and more display
  */
  @media screen and (min-width: 961px) {
    .screen-3 .code-snippet.microframework {
      padding-right:10px;
    }
    .screen-3 .code-snippet.microprofile {
      padding-left:10px;
    }
    .screen-3 .code-snippet code {
      min-height:170px;
    }
  }
  .screen-3 .step3 .btn {
    margin-top:15px;
    margin-left: -1.2px;
  }
  .screen-3 .step3 .btn__content {
    color: #3ea5fd;
  }

  /*
   Footer
  */
  .footer {
    height:auto!important;
    padding-bottom: 30px;
    padding-top: 30px;
    padding-left: 50px;
    padding-right: 50px;
    background-color: #258bf5 !important;
  }
  .footer>div{
     color: white;
     width: 100%;
     text-align: center;
     padding-top: 10px;
     padding-bottom: 0px;
     padding-left: 10%;
     padding-right: 10%;
     border-top: 1px solid white;
     font-size: 0.9em;
  }
</style>
