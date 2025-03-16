pipeline {
    agent {
      docker{
        image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        args '--network qatw-primeira-edicao_skynet'
      }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm i -D'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
