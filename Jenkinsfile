def label = "discord-bot-ci"

podTemplate(label: label, containers: [
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'node', image: 'node', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
  node(label) {
    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)

    stage('Install Dependencies') {
      container('node') {
        sh "npm install"
      }
    }

    stage('Lint') {
      container('node') {
        sh "npm run lint"
      }
    }

    stage('Test') {
      container('node') {
        sh "npm test"
      }
    }

    stage('Kubectl test') {
      container('kubectl') {
        sh "kubectl get pods"
      }
    }
  }
}