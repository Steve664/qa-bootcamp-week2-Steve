## Project Overview

This project contains automated UI tests for the Practice Software Testing Toolshop application using Playwright and TypeScript.

## Technologies Used

- Playwright
- TypeScript
- Node.js
- Git and GitHub

## Prerequisites

Before running the tests, make sure you have:

- Node.js installed.
- npm installed.
- Git installed.
- A code editor such as Visual Studio Code.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Steve664/qa-bootcamp-week2-Steve.git
```

2. Navigate into the project directory:

```bash
cd qa-bootcamp-week2-Steve
```

3. Install project dependencies:

```bash
npm install
```

4. Install Playwright browsers:

```bash
npx playwright install
```

## Running the Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/Search-ui.spec.ts
```

Run a specific test with trace:

```bash
npx playwright test tests/Search-ui.spec.ts --trace on
```

## Viewing Test Reports

After running the tests, generate and open the HTML report:

```bash
npx playwright show-report
```

The report provides information about passed and failed tests.

## Project Structure


- **pages/** – Contains Page Object Model classes and reusable page methods.
- **tests/** – Contains Playwright test files.
- **playwright.config.ts** – Contains Playwright test configuration.
- **package.json** – Contains project dependencies and scripts.
- **README.md** – Provides project setup and execution instructions.


