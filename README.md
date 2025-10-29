# PlaywrightWithTSFramework

A robust end-to-end (E2E) and API automation testing framework built with Playwright + TypeScript.
This framework provides a modular, scalable, and maintainable structure for both web UI and API testing — featuring reusable page objects, config management, secure environment handling, and advanced reporting

**Features :**

🚀 Unified Framework — One project for both UI and API automation testing
🧠 Playwright + TypeScript — Modern, fast, and type-safe test framework
🏗️ Page Object Model (POM) — Clean, reusable, and scalable test architecture
🌍 Environment-Based Configurations — Switch easily between demo, staging, and production
📡 API Testing Module — Integrated API test layer using Playwright’s request context
🔐 Secure Secrets Management — All credentials stored safely via .env and dotenv
🧩 Custom Fixtures & Hooks — Centralized setup/teardown logic for tests
⚡ Parallel Test Execution — Speed up execution with multi-threaded runs
🧭 Cross-Browser Testing — Run on Chromium, Firefox, and WebKit
📊 Rich Reporting — Beautiful HTML and Allure Reports with screenshots & traces
🧱 CI/CD Ready — Seamless integration with GitHub Actions, Jenkins, and Azure Pipelines
🛡️ Error Handling & Assertions — Robust validation and retries for flaky tests
📦 Reusable Data Layers — Organized test data for UI & API modules
💡 Open Source Friendly — Easy to extend, maintain, and collaborate


**📂 Project Structure**

PlaywrightWithTSFramework/
├── tests/
│   ├── ui-test/                 # UI Test Specs
│   ├── api-test/                # API Test Specs (Restful Booker module, etc.)
│
├── test-data/
│   ├── ui-data/                 # UI-related test data
│   ├── api-data/                # API paths, payloads, constants
│
├── pages/                       # Page Object Model files
├── fixtures/                    # Common setup & custom fixtures
├── utils/                       # Helpers (API utilities, encryption, etc.)
├── env-files/                   # Environment .env configs
├── playwright-report/            # HTML reports
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # Project documentation


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

**Environment Configuration**:

Use the .env files for environment-specific data:
Example .env.demo:

BASE_URL=https://opensource-demo.orangehrmlive.com
USER_NAME=U2FsdGVkX1/Gf2fMvqctHQc6BH1B0G1vD9dL4vz2pCU=
PASSWORD=U2FsdGVkX197Xi1pbY7o9oK9BetqFFSVeiPdL6T9xOk=

API_BASE_URL=https://restful-booker.herokuapp.com
API_USER_NAME=U2FsdGVkX1+zt2vw0OXur60huP1X5KiQDWsxm2nsfKk=
API_PASSWORD=U2FsdGVkX1+sO81pYPYWdNzQCeOoXLUKIoRPBYZOeqo=


🧰 Useful npm Scripts

Command	Description
npm test	Run all Playwright tests
npm run test:headed	Run tests in headed mode
npm run test:report	Run tests and generate Allure report
npm run lint	Check code style using ESLint

🧩 Technologies Used:

🧠 Playwright — UI & API Automation

🟦 TypeScript — Strong typing and clean code

🌐 Node.js — Runtime environment

🔐 dotenv — Secure environment variable handling

🧪 HTML Reporting

⚙️ GitHub Actions / CI Pipelines


🔐 Best Practices

Keep credentials and sensitive data out of the repo (.env, CI secrets).

Follow Page Object Model for clean UI structure.

Maintain separate test data layers for UI & API.

Use fixtures for consistent setup/teardown.

Integrate with CI/CD for continuous testing.

👨‍💻 Author

Eslam Abdallah
Quality Control Automation Engineer @ Kashier
📧 eslamseaf1@gmail.com

🔗 Linkedin : https://www.linkedin.com/in/eslam-mohamed-48711914b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app 
