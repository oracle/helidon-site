pipeline {
  agent {
    label "linux"
  }
  stages {
    stage('default') {
      parallel {
        stage('build'){
          when {
            not {
              branch '**/release-*'
            }
          }
          steps {
            sh './etc/scripts/build.sh'
            archiveArtifacts artifacts: "target/site/**"
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
            archiveArtifacts artifacts: "target/site/**"
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