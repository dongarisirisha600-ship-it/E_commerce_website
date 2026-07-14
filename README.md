# Customer Portal

This project is a React and Vite frontend that demonstrates the core concepts taught in class by building an initial customer-focused UI. It includes a navbar, sidebar, home page, registration form, login page, and a dynamic customer records dashboard.

## Features Implemented
- Header and navigation bar
- Sidebar with quick links
- Home page with reusable cards
- Registration form with validation and feedback
- Login page with validation, loading state, and success/error messages
- Dynamic customer records table with search and sorting
- Reusable components such as Navbar, Sidebar, Footer, Button, Card, FormField, PasswordField, SectionTitle, and StatBadge

## React Concepts Used
- Introduction to React and Vite
- JSX syntax and its advantages
- Functional components
- Props and their read-only nature
- Default and named module exports
- State and controlled inputs
- Conditional rendering
- List rendering using map()
- Component-based architecture and reusability

## Class vs Functional Components
- Class components use ES6 class syntax and lifecycle methods.
- Functional components are simpler and use hooks such as useState.
- Functional components are preferred in modern React development.

## Props and main.jsx
- Props allow parent components to pass read-only data into child components.
- main.jsx is the entry point that renders the App component into the DOM.

## Styling Approach
- Inline styles for component-level styling
- Global CSS in src/index.css for reset and page-level styling
- CSS modules were not required for this initial version

## Screenshots
- Application overview: [docs/screenshots/customer-portal.svg](docs/screenshots/customer-portal.svg)

## Run Locally
1. npm install
2. npm run dev
3. npm test
4. npm run build

## Project Structure
- src/App.jsx: main app layout
- src/main.jsx: ReactDOM entry point
- src/components/: reusable UI components
- src/pages/: home and dashboard pages
- src/registrationValidation.js and src/loginValidation.js: validation logic

