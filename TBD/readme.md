# Introduction

This is the  end to end test for [TideBit-Defi](https://tidebit-defi.com/). To see the detail of the testcases, please refer to [TBD Testcases](https://github.com/CAFECA-IO/Documents/tree/main/TBD/testcases).

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or higher)

### Dependencies

- Playwright
- Browser
- i18next

### Installation

1. Clone this repository

    ```bash
    git clone https://github.com/CAFECA-IO/Playwright.git
    ```

2. Checkout to the develop branch

    ```bash
    git checkout develop
    ```


3. Change directory to the repository

    ```bash
    cd Playwright/TBD
    ```

4. Install dependencies

    ```node.js
    npm install
    ```

5. Install Playwright Browsers

    ```node.js
    npx playwright install --with-deps
    ```

6. Run Playwright tests to run all the test in tests folder

    ```node.js
    npx playwright test
    ```
