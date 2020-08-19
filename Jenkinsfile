pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'yarn'
        sh 'yarn build'
      }
    }

    stage('Deploy') {
      when{
        branch 'master'
      }
      steps([$class: 'BapSshPromotionPublisherPlugin']) {
            sshPublisher(
                continueOnError: false, failOnError: true,
                publishers: [
                    sshPublisherDesc(
                        configName: "web-0",
                        verbose: true,
                        transfers: [
                            sshTransfer(execCommand: "sudo /bin/rm -rf /var/www/*"),
                            sshTransfer(sourceFiles: "dist/**/*"),
                            sshTransfer(execCommand: "mv /var/www/dist/* /var/www/"),
                            sshTransfer(execCommand: "rm -r /var/www/dist"),
                            sshTransfer(execCommand: "sudo chmod -R 0755 /var/www"),
                            sshTransfer(execCommand: "sudo chcon -R -t httpd_sys_content_t /var/www/")
                        ],
                    )
                ]
            )
        }
    }
  }
  environment {
    API_V3 = 'https://api.lavinia.no/api/v3.0.0/'
    SWAGGERUI = 'https://api.lavinia.no/'
    WIKI = 'https://project-lavinia.github.io/'
  }
}