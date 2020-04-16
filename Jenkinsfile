/*
 * Copyright (c) 2020 Oracle and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

pipeline {
  agent {
    label "linux"
  }
  environment {
    NPM_CONFIG_REGISTRY = credentials('npm-registry')
  }
  stages {
    stage('default') {
      parallel {
        stage('build'){
          when {
            not {
              branch 'master'
            }
          }
          steps {
            sh './etc/scripts/build.sh'
            archiveArtifacts artifacts: "target/site.tar.gz"
          }
        }
        stage('publish') {
          when {
            branch 'master'
          }
          environment {
              GITHUB_SSH_KEY = credentials('helidonrobot-github-ssh-private-key')
          }
          steps {
            sh './etc/scripts/build.sh --publish'
            archiveArtifacts artifacts: "target/site.tar.gz"
          }
        }
        stage('copyright'){
          steps {
            sh './etc/scripts/copyright.sh'
          }
        }
      }
    }
  }
}