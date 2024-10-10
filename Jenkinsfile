def notifyLINE(status) {
    def token = "uWN2uQ9eoLCaz4Eb9nwLsGPdvwqXjS41e7fgbY9J15k"
    def jobName = env.JOB_NAME +' '+env.BRANCH_NAME
    def buildNo = env.BUILD_NUMBER
      
    def url = 'https://notify-api.line.me/api/notify'
    def message = "${jobName} Build #${buildNo} ${status} \r\n"
    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${message}'"
}

pipeline {
    agent any

    tools {nodejs "node_18_19"}

    stages {
       stage('GIT PULL') {
            steps {
             git branch: 'main', 
                url: 'https://github.com/Antonate-96/jenkins.git'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'sonar-scan-tools';
            }  
            steps {
                withSonarQubeEnv(credentialsId: 'angular-project',installationName: 'sonarserver' ) {
                      sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
        stage('docker build') {
            steps {
                sh "docker compose up -d --build"
            }
        }
    }
    post{
    success{
        notifyLINE("succeed")
    }
    failure{
        notifyLINE("failed")
    }
  }
}
