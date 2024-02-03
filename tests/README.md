# Tests for beliana-web: Cypress

> We write the tests in JavaScript End-to-End Testing Framework - [cypress.io](https://www.cypress.io/)

---

## Table of Contents

- [Directory structure](#directory-structure)
- [How run tests](#how-run-tests)
- [Links and Resources for cypress](#links-and-resources-for-cypress) 

---

## Directory structure

```
/tests
├── cypress.config.ts      // Configuration file for Cypress
├── package.json           // Package information and dependencies
├── package-lock.json      // Exact dependency versions file for the package
├── README.md              // Project documentation
└── tsconfig.json          // TypeScript configuration file
```

```
/tests/cypress
├── downloads              // Stored downloaded files during tests (created during testing)
├── e2e                    // End-to-end tests
│   └── exampleTest.cy.ts // Example test file
├── screenshots            // Screenshots of failed tests (created during testing)
├── fixtures               // Static data (e.g., test data in JSON format)
│   └── example.json       // Example static data file
├── support                // Helper functions and configurations
│   ├── commands           // Custom commands for tests
│   │   ├── exampleCustomCommand.ts // Example custom command file
│   │   └── customCommands.ts       // Imports for custom commands for tests
│   └── e2e.ts             // Configuration file (e.g., global hooks)
└── videos                 // Videos of failed tests (created during testing)
```

---

## How run tests

- `--headed` - open browser in run mode
- `--browser (-b)` - edge, chrome, firefox, electron
- `--config baseUrl` - url for env
- `--spec` - relative path to cy file or dir

---

Install all dependencies
> `$ cd tests` <br>
> `$ npm install` 

### scripts

Run all tests
> `npm run cypress:run` <br>
>> `$ npx cypress run -b chrome --config baseUrl=https://dw.beliana.sav.sk`

Open cypress for development
> `npm run cypress:open` <br>
>> `$ cypress open -b chrome --config baseUrl=https://dw.beliana.sav.sk`

Run specific test
> `npm run cypress:run:specificTest` <br>
>> `$ npx cypress run --spec '' -b chrome --config baseUrl=` <br>
>>> example - `$ npx cypress run --spec 'cypress/e2e/exampleTest.cy.ts' -b chrome --config baseUrl=https://dw.beliana.sav.sk`

---

## Links and Resources for cypress

> Here you can find useful links and resources for cypress:

- Documentation: https://docs.cypress.io/api/table-of-contents
- Official Website: https://docs.cypress.io
- GitHub Repository: https://github.com/cypress-io/cypress-documentation
- Changelog: https://docs.cypress.io/guides/references/changelog
- Additional Resources: https://docs.cypress.io/guides/references/best-practices or https://cypress.tips/search