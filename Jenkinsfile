pipeline {
    agent {
      docker{
        // image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        image 'papitodev/playwright-nj-v1.50.1-noble:latest'
        // image 'mcr.microsoft.com/playwright/java:v1.50.0-noble'
        args '--network qatw-primeira-edicao_skynet'
      }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
