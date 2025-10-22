# PlaywrightWithTSFramework

A robust end-to-end (E2E) automation testing framework built with Playwright + TypeScript.
This framework provides a modular, scalable, and maintainable structure for web application testing — featuring reusable page objects, configuration management, and advanced reporting integration.

**Features :**

⚙️ Playwright + TypeScript for fast, reliable browser automation

🧩 Page Object Model (POM) architecture for cleaner and reusable test logic

🌐 Multi-environment support (staging, production, etc.) via config files

🧵 Parallel test execution for faster runtime

🔒 Environment variables and secrets handling through .env 

🧱 Fixtures & Hooks for modular setup/teardown

🔍 Cross-browser testing (Chromium, Firefox, WebKit)

🔄 CI/CD ready (GitHub Actions, Jenkins, or Azure Pipelines)


**Project Structure :**

PlaywrightWithTSFramework/
├── tests/                    # Test files (.spec.ts)
├── pages/                    # Page Object Model files
├── fixtures/                 # Common setup & custom fixtures
├── utils/                    # Reusable utilities (helpers, data, constants)
├── config/                   # Environment configurations
├── reports/                  # Allure or HTML reports
├── playwright.config.ts      # Playwright configuration file
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation


**📂 Project Structure**

PlaywrightWithTSFramework/
├── tests/                    # Test files (.spec.ts)
├── pages/                    # Page Object Model files
├── fixtures/                 # Common setup & custom fixtures
├── utils/                    # Reusable utilities (helpers, data, constants)
├── config/                   # Environment configurations
├── reports/                  # Allure or HTML reports
├── playwright.config.ts      # Playwright configuration file
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation

**⚡️ Getting Started**

1️⃣ Prerequisites

Node.js
 (v18+ recommended)

npm or yarn package manager

2️⃣ Clone the repository
git clone https://github.com/Eslam-M-Abdallah/PlaywrightWithTSFramework.git
cd PlaywrightWithTSFramework

3️⃣ Install dependencies
npm install

4️⃣ Run tests
npx playwright test

5️⃣ Run tests in headed mode (with browser UI)
npx playwright test --headed

🧮 Run Specific Test File
npx playwright test tests/example.spec.ts

🧱 Environment Configuration

Set environment variables in a .env file (example below):

BASE_URL='https://opensource-demo.orangehrmlive.com'
USER_NAME = 'U2FsdGVkX1/Gf2fMvqctHQc6BH1B0G1vD9dL4vz2pCU='
PASSWORD = 'U2FsdGVkX197Xi1pbY7o9oK9BetqFFSVeiPdL6T9xOk='

🧰 Useful npm Scripts

Command	Description
npm test	Run all Playwright tests
npm run test:headed	Run tests in headed mode
npm run test:report	Run tests and generate Allure report
npm run lint	Check code style using ESLint

🧩 Technologies Used

Playwright

TypeScript

Node.js

dotenv


🔐 Best Practices

Keep test data and credentials outside the repo (use .env or CI secrets).

Follow the Page Object Model (POM) for clean test design.

Use fixtures for common setup and teardown logic.

Integrate the framework with your CI/CD pipeline for continuous testing.

👨‍💻 Author

Eslam Abdallah
Quality Control Automation Engineer @ Kashier
📧 eslamseaf@gmail.com

Linkedin : https://www.linkedin.com/in/eslam-mohamed-48711914b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app 
