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
}
