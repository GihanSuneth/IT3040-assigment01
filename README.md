IT3040 Assignment 01 Playwright

Project Overview

This project focuses on **functional and UI testing** of the *Singlish to Sinhala Translator* web application.

The testing is conducted under **Option 1**, intended for students familiar with the Sinhala language. The goal is to evaluate:

Accuracy of Singlish → Sinhala conversion
Stability of the user interface
Usability under different valid and invalid input conditions

Objective

The main objectives of this testing project are:

To verify the correctness of Sinhala output generated from Singlish input
To identify functional issues using **positive and negative test cases**
To validate UI behavior and user interaction flow
To ensure consistent behavior across different test scenarios

-- ▶ How to Run the Tests

-- 1. Install Dependencies
npm init playwright@latest

-- 2. Run All Tests
npx playwright test

-- 3️. View HTML Report
npx playwright show-report

-- 📊 Test Reporting

Playwright generates an **HTML report** after execution
Reports are stored in the `playwright-report` folder
Screenshots and execution logs are captured automatically on failures

Test Scope

Included

Functional testing (text conversion accuracy)
UI testing (input, output, and interface behavior)
Positive and negative test scenarios

Tools & Technologies Used

Playwright – Test automation framework
JavaScript (Node.js) – Test scripting
VS Code – Development environment
Playwright Test Runner & HTML Reports

Project Structure


IT3040_ASSIGNMENT_PLAYWRIGHTx/
│
├── node_modules/               Project dependencies
├── playwright-report/          HTML test execution report
│   ├── data/
│   └── index.html
│
├── test-results/               Raw test execution results
│
├── tests/
│   └── singlish-to-sinhala.spec.js    All automated test cases
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js        Playwright configuration
└── README.md                   Project documentation


-- 🧾 Test Case Summary

| Test Type      | Count  |
| -- |  |
| Positive Tests | 24     |
| Negative Tests | 10     |
| UI Tests       | 2      |
| Total     | 36 |

 Invalid or random text

-- 🔹 UI Test Cases

Verify input and output fields are visible and usable
Validate output generation after user interaction


-- Automation Strategy
Tests are organized based on input size and complexity
Each test validates:
    - User input
    - Converted Sinhala output
    - UI stability

Assertions compare expected Sinhala Unicode output with actual output -- Limitations Identified
Some complex Singlish spellings are not consistently converted
No suggestion or error message for invalid inputs
Conversion accuracy depends heavily on predefined mappings -- Conclusion This project successfully demonstrates UI automation testing for a Sinhala language–based system using Playwright. The test cases validate both correct behavior and error handling, providing a structured evaluation of system accuracy and usability.
