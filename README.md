# Playwright E2E Training

This project is a Playwright end-to-end testing setup for browser automation, with support for local execution, Jenkins CI, and Allure reporting.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- Node.js 18+ or 20+
- npm
- Git
- A browser engine for Playwright (installed automatically in the project setup step)

## 1) Clone the project

```bash
git clone https://github.com/mamejica20/playwright-e2e-training.git
cd playwright-e2e-training
```

## 2) Install dependencies

From the project root, run:

```bash
npm install
```

If you want to install the exact dependencies defined in the project lock file:

```bash
npm ci
```

## 3) Install Playwright browsers

This project requires Playwright browser binaries.

```bash
npx playwright install --with-deps
```

If you are using a CI or server environment, this step is important before running tests.

## 4) Project structure

```text
playwright-e2e-training/
├── .github/
│   └── workflows/
├── config/
│   └── local.playwright.config.ts
├── tests/
│   ├── demo/
│   ├── api/
│   ├── e2e/
│   └── helpers/
├── allure-results/
├── playwright-report/
├── package.json
├── playwright.config.ts
├── Jenkinsfile
├── README.md
└── tsconfig.json
```

## 5) Run a test locally

### Run a specific test file

```bash
npx playwright test tests/demo/mytest.spec.ts
```

### Run the demo script from package.json

```bash
npm run demo
```

This script is defined in package.json and executes the configured Playwright test.

## 6) Run tests in headed mode

For visual execution in a browser window:

```bash
npx playwright test tests/demo/youtubetest.spec.ts --headed
```

## 7) Open the Playwright HTML report

After running the tests, you can view the HTML report:

```bash
npx playwright show-report
```

The report is usually generated under the `playwright-report/` folder.

## 8) Allure setup

This project already includes the Allure Playwright reporter.

### Generate Allure results

When tests run, the results are generated in the `allure-results/` folder.

### Generate HTML report from Allure results

```bash
npx allure generate allure-results --clean -o allure-report
```

### Open Allure report locally

```bash
npx allure open allure-report
```

Or if using the installed commandline tool:

```bash
allure open allure-report
```

## 9) Creating a new test case

Create a new file under the `tests/` folder, for example:

```bash
tests/demo/login.spec.ts
```

Example:

```ts
import { test, expect } from "@playwright/test";

test("should open the homepage", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

Then run it:

```bash
npx playwright test tests/demo/login.spec.ts
```

## 10) Configuration files

The project uses:

- `playwright.config.ts` for the base Playwright setup
- `config/local.playwright.config.ts` for local test configuration

The local config sets values like the app URL and test environment.

## 11) Jenkins integration

The project includes a `Jenkinsfile` for CI automation.

### Jenkins pipeline steps

1. Install Node.js tool in Jenkins
2. Install Allure plugin in Jenkins
3. Add the NodeJS tool name: `node24`
4. Add the Allure tool name: `allure`
5. Commit the Jenkinsfile to the repository
6. Create a pipeline job in Jenkins and point it to the repo
7. Run the job

### Jenkins pipeline does the following:

- installs dependencies with `npm ci`
- installs Playwright browsers
- runs tests with `npm run demo`
- generates Allure results
- publishes the Allure report
- sends email notifications if configured

## 12) Email notifications in Jenkins

The Jenkins pipeline can send email notifications using Gmail SMTP or another SMTP provider.

Common Gmail setup:

- SMTP server: `smtp.gmail.com`
- Port: `587`
- Use TLS: enabled
- Use a Gmail App Password, not your normal password

## 13) Useful commands

```bash
npm install
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright test --headed
npx playwright show-report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## 14) Troubleshooting

### Error: two different versions of Playwright

This happens when one dependency installs a second Playwright package. Use only the project dependency from `package.json` and avoid separate `npm install playwright` commands.

### Error: no tests found

Check that the file path is correct and the file matches the `.spec.ts` pattern.

### Email fails in Jenkins

Check:

- Jenkins SMTP configuration
- Gmail App Password
- correct SMTP port
- plugin installation
- Jenkins server connectivity to the SMTP host

## 15) Notes

This project is intended for learning and practice with Playwright automation, UI testing, CI/CD integration, and reporting.

## 16) Next steps

You can expand this project by adding:

- login tests
- API tests
- reusable page objects
- CI pipelines with GitHub Actions or Jenkins
- test data management
- screenshot and trace capture on failure

## Support

If you are running into setup issues, check the project log, Playwright output, and Jenkins console output for the exact failing step.
