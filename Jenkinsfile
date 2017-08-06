pipeline {
  agent any
  options {
    skipDefaultCheckout()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh "sudo /srv/deployment/stopTeylerBot.sh"
        sh "cp -R ./* /srv/deployment/teyler-bot"
        sh "sudo /srv/deployment/startTeylerBot.sh"
      }
    }
  }
}