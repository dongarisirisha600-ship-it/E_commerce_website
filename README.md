# MegaMart

This project is a React and Vite frontend for the MegaMart shopping portal. It now demonstrates dynamic routing, API-driven content, loading/error states, and local storage persistence while keeping the reusable component structure from the earlier assignment.

## New Features
- Dynamic routing with route parameters and reusable details pages
- Live product data fetched from the Fake Store API
- Search functionality on the home page
- View links that navigate to dedicated product details pages
- Loading and error states for API calls
- Local storage support for favorites and recently viewed items
- Custom 404 page for unknown routes

## APIs Used
- Fake Store API: https://fakestoreapi.com/products

## React Concepts Implemented
- Dynamic Routing
- Route Parameters
- useParams()
- Dynamic URL Navigation
- View Button Functionality
- useEffect()
- Component Lifecycle
- Dependency Array
- API Calls
- Side Effects
- Loading State Management
- Error Handling
- Local Storage Persistence
- 404 Page and Wildcard Route

## Screenshots
- Application overview: [docs/screenshots/customer-portal.svg](docs/screenshots/customer-portal.svg)

## Run Locally
1. npm install
2. npm run dev
3. npm test
4. npm run build

## Project Structure
- src/App.jsx: main route configuration
- src/pages/Home.jsx: API-driven landing page with search and favorites
- src/pages/Dashboard.jsx: dashboard summary and featured products
- src/pages/Details.jsx: dynamic details page for each product
- src/storage.js: local storage helpers for persistence
- src/components/: reusable UI components
- src/registrationValidation.js and src/loginValidation.js: validation logic

