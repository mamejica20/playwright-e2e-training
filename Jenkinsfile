pipeline {
    agent any

    environment {
        MAIL_TO = 'markanthonymejica.20@gmail.com'
    }

    tools {
        nodejs "node24"
        allure "allure"
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        set -eu
                        npm ci
                        npx playwright install --with-deps
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm run demo'
                }
            }

            post {
                always {
                    script {
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

    post {
        always {
            script {
                if (env.MAIL_TO?.trim()) {
                    emailext(
                        subject: "QA Test Report - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
                            <h2>Test Execution Completed</h2>

                            <p><b>Job:</b> ${env.JOB_NAME}</p>
                            <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                            <p><b>Status:</b> ${currentBuild.currentResult}</p>

                            <p>
                                <a href="${env.BUILD_URL}allure/">
                                    Open Allure Report
                                </a>
                            </p>

                            <p>
                                <a href="${env.BUILD_URL}">
                                    Open Jenkins Build
                                </a>
                            </p>
                        """,
                        to: env.MAIL_TO,
                        mimeType: 'text/html'
                    )
                } else {
                    echo 'No recipient configured. Skipping email notification.'
                }
            }
        }
    }
}