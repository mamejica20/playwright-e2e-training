pipeline{
    agent any
    tools{
        nodejs "node24"
        allure "allure"
    }
    options{
        timeout(time: 30, unit: 'MINUTES')
    }
    stages{
        stage('Install Dependencies'){
            steps{
                script{
                    sh '''
                        set -eu
                        npm ci
                        npx playwright install --with-deps
                    '''
                }
            }
        }
        stage('Run Tests'){
            steps{
                script{
                    sh 'npm run demo'
                }
            }
            post{
                always{
                    script{
                        allure([
                            includeProperties: false,
                            jdk: '',
                            properties: [],
                            reportBuildPolicy: 'ALWAYS',
                            results: [[path: 'allure-results']]
                        ])
                    }
                }
            }
        }
    }
}