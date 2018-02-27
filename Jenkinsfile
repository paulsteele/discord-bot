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
        sh 'npm run lint'
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
        sh "docker build -t teyler-bot ."
        sh "cp docker-compose.yml /teyler-bot/docker-compose.yml"
        sh "docker-compose -f /teyler-bot/docker-compose.yml down"
        sh "docker-compose -f /teyler-bot/docker-compose.yml up -d"
      }
    }
  }
}