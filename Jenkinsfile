pipeline {
    agent {
      docker{
        image '20191405/playwright_node_java:arm64'
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
