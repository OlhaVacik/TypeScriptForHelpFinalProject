# FOP Help Automated Testing Project

> Comprehensive automated testing for FOP Help platform, including API testing, UI end-to-end testing, CI/CD integration, and Allure reporting.

## Project Description

This project implements automated testing for the [FOP Help](https://new.fophelp.pro) platform.
The tests cover:
- API testing via Vitest
- E2E UI testing via Playwright
- Generation of Allure testing reports
- Running tests via CI/CD (GitHub Actions)

## Technologies Used

| Technology | Purpose |
|:-----------|:--------|
| **TypeScript** | Strong typing and safer JavaScript development |
| **Playwright** | End-to-end UI automation testing |
| **Vitest** | Fast unit and API testing framework |
| **Allure Reports** | Test reports for both UI and API tests |
| **Eslint + Prettier** | Code quality, style, and formatting enforcement |
| **GitHub Actions** | CI/CD automation: run tests on each push and pull request |
| **Node.js** | JavaScript runtime environment to run tests |

## Configuration Files

- `playwright.config.ts` — Playwright configuration for UI end-to-end tests.
  - Manages browser settings (browser type, viewport, timeouts).
  - Configures reporters (e.g., HTML, Allure).
  - Defines global test settings for UI automation.

- `vitest.config.api.ts` — Vitest configuration for isolated API tests.
  - Includes API-specific test files.
  - Sets up reporters (verbose, allure) for API test results.
  - Manages environment settings (`node` environment for API).

- `vitest.config.api-integration.ts` — Vitest configuration for API integration tests.
  - Includes integration API test files separately.
  - Allows running integration tests independently without mixing them with other suites.
  - Uses similar reporters and settings as for API tests.

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
npm run test:api:ci
```

## Running Integration API

Run Integration API tests and lint checks:

```bash
npm run test:api-integration
```

Only run Integration API tests:

```bash
npm run test:api-integration:ci
```

## Running UI

Only run UI tests:

```bash
npm run test:ui
```

Open Playwright Test Runner UI:

```bash
npm run test:ui:ci
```
Run all tests (API + UI)

```bash
npm run test:all:ci
```

## Generating Allure Reports

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

 ## Project Status

This project is a functional and production-ready test automation framework.
It is well-suited for further test coverage expansion, scales in line with the application's growth, and features a flexible architecture that easily adapts to both system changes and the addition of new functionality.