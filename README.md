# FOP Help Automated Testing Project

## Project Description

This project implements automated testing for the [FOP Help](https://new.fophelp.pro) platform.
The tests cover:
- API testing via Vitest
- E2E UI testing via Playwright
- Generation of Allure testing reports
- Running tests via CI/CD (GitHub Actions)

## Technologies Used

- TypeScript
- Playwright
- Vitest
- Allure Reports
- Eslint + Prettier
- GitHub Actions 

## Installation

1. Clone the repository:

```bash
git clone git@github.com:OlhaVacik/TypeScriptForHelpFinalProject.git
```

2. Navigate to the project directory:

```bash
cd automation-fop-help
```

3. Install project dependencies:

```bash
npm install
```

4. Install playwright:

```bash
npx playwright install
```

## Authentication

The login method is implemented inside srс/api-world.ts
It is designed to work for both API and UI tests.
Example usage:

await api.uiLogin();

## Running API

Run API tests and lint checks:

```bash
npm run test:api
```
Only run API tests:

```bash
npx vitest run
```

## Running UI

Only run UI tests:

```bash
npm run test:ui
```

Open Playwright Test Runner UI:

```bash
npx playwright test --ui
```
Run all tests (API + UI)

```bash
npm run test:all
```

## Generating Allure Reports

### For API Tests (Vitest+Allure)

1. Run API tests:
```bash
npm run test
```

2. Generate and open Allure report:
```bash
allure serve allure-results
```
### For UI Tests (Playwright + Allure)

1. Run Playwright UI tests:
```bash
npx playwright test
```

2. Generate and open Allure report:
```bash
allure serve allure-results
```

## Code Quality

Code is formatted and checked automatically using:
- ESlint
- Prettier

Run lint check:
```bash
npm run lint
```
Auto-fix lint issues:
```bash
npm run lint:fix
```

## CI/CD Integration

The project is integrated with **GitHub Actions** to automatically run tests on every push and pull request to the main and final-project branches.

Every time you run tests, the following is automatically done:

Dependencies are installed,

Playwright browsers are installed,

UI and API tests are run,

**Allure report** for tests is built.

All test results are saved as build artifacts for further analysis.

**Allure HTML Report** can be downloaded via GitHub Actions artifacts after the workflow is completed.

*Note*: Some errors in API tests are related to the instability of the public server https://new.fophelp.pro, and not to errors in the test architecture.
