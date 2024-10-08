pipeline {
    agent any
    
    tools {nodejs "node_18_19"}
    
    stages {
        stage('Clone sources') {
            steps {
                git branch: 'main', url: 'https://github.com/Antonate-96/Angular-docker.git'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'sonar-scan-tools';
            }  
            steps {
                withSonarQubeEnv(credentialsId: 'b721510e-14cd-4e93-8e0f-d3ba86a527c3',installationName: 'sonarserver' ) {
                      sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
    }
}