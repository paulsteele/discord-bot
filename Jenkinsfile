def label = "discord-bot-ci"

podTemplate(label: label, serviceAccount: 'ci-jenkins', containers: [
  containerTemplate(name: 'docker', image: 'docker:dind', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  // hostPathVolume(mountPath: '/var/lib/docker/overlay2', hostPath: '/var/lib/docker/overlay2'),
]) {
  node(label) {
    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)

    stage('Build') {
      container('docker') {
        sh "docker build . -t teyler-bot:latest"
      }
    }

    // stage('Push to Registry') {
    //   container('docker') {
    //     withDockerRegistry([credentialsId: 'docker-registry', url: "https://registry.paul-steele.com/"]) {
    //       sh "docker push registry.paul-steele.com/teyler-bot:latest"
    //     }
    //   }
    // }

    stage('Deploy') {
      container('kubectl') {
        sh "kubectl apply -f ./deployment/k8s.yaml"
      }
    }
  }
}