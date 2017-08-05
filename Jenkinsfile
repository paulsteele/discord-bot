pipeline {
  agent any

  stages {
    node('node') {
      stage('Checkout') {
        checkout scm
      }
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
          sh 'npm run build'
        }
      }
      stage('Deploy') {
        steps {
          echo "On Branch ${env.BUILD_ID}"
        }
      }
    }
  }
}