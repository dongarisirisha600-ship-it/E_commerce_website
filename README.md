# Student Registration Portal

This project now delivers a polished registration experience built with React and Vite. The UI collects student profile details, validates each field, and provides a success state with submitted details after a successful submission.

## Features
- Controlled form fields powered by React state
- Form validation for name, email, mobile, password, confirm password, and terms acceptance
- Password strength meter and show/hide password toggles
- Resume upload field with UI-only handling
- Reset button and success confirmation state

## Concepts Covered
- useState for controlled components
- onChange, onSubmit, and onClick event handling
- Client-side validation and error messaging
- Conditional rendering for success and submission details

## Screenshots
- Registration form overview: [docs/screenshots/registration-page.svg](docs/screenshots/registration-page.svg)

## Run locally
1. Install dependencies: npm install
2. Start the development server: npm run dev
3. Run validation tests: npm test
4. Build the project: npm run build

## Project Structure
- src/main.jsx: main registration page component
- src/registrationValidation.js: validation logic
- src/registrationValidation.test.js: regression tests

