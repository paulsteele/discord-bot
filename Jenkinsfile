pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        sh 'npm build'
      }
    }
    stage('Deploy') {
      echo "On Branch ${env.BRANCH_NAME}"
    }
  }
}