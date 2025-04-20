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
npm run test
```
Only run API tests:

```bash
npx vitest run
```

## Running UI

Run all Playwright UI tests:

```bash
npx playwright test
```

Open Playwright Test Runner UI:

```bash
npx playwright test --ui
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

A basic CI/CD pipeline can be configured using GitHub Actions or another CI system.
