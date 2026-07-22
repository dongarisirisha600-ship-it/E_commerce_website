# MegaMart

MegaMart is a simple React + Vite frontend project created to demonstrate core React concepts such as components, props, reusable UI, JSX, and component-based architecture.

## Features Implemented

- Header/Navbar with route-based navigation and active link highlighting
- Sidebar navigation with shared layout across pages
- Home page with hero section and featured product cards
- Products page with product listing and dynamic detail links
- About and Contact pages
- Registration page with comprehensive form validation
- Login page with credential validation and protected routing
- Dashboard with nested overview, profile, and settings routes
- 404 page with a friendly return-home experience
- Reusable components such as Navbar, Sidebar, Footer, Button, Card, and StatBadge
- External CSS styling and component-specific CSS files
- Responsive design for mobile and desktop

## React Concepts Used

- Introduction to React and Functional Components
- Vite project setup and configuration
- JSX syntax and component structure
- Functional components with React hooks
- Props (read-only data flow between components)
- State management with `useState()` hook
- Event handling with `onChange`, `onSubmit`, and `onClick`
- Controlled components and two-way data binding
- Form validation and error handling
- Component-based architecture
- Reusable UI component development
- Styling with external CSS and component-specific CSS files
- React Router DOM for client-side navigation with BrowserRouter, Routes, Route, Link, NavLink, and nested routing
- Dynamic routing with URL params using useParams()
- Programmatic navigation with useNavigate()
- Shared layout components and 404 handling
- Conditional rendering and component composition

## Difference Between Class and Functional Components

- **Class Components**: Use ES6 class syntax, implement lifecycle methods (componentDidMount, componentDidUpdate, etc.), have more boilerplate code
- **Functional Components**: Use JavaScript functions, simpler and more concise, use hooks like `useState`, `useEffect`, and `useContext`
- Functional components are the modern standard and are preferred for new React projects

## Explanation of Props and main.jsx

- **Props**: Read-only inputs passed from parent components to child components, enabling data flow and component reusability across the application
- **main.jsx**: The entry point of the React application. It imports the root App component and renders it into the DOM using `ReactDOM.createRoot()`, mounting the entire React tree to the #root element in index.html

## Styling Approach

- Global styling with App.css for layout and typography
- Component-specific CSS files for isolated styling
- Responsive design with media queries for mobile-first approach
- CSS Grid and Flexbox for modern layouts
- Consistent color scheme and typography system
- CSS variables for maintainability

## Project Structure

```
E_commerce_website/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── StatBadge.jsx
│   │   ├── FormField.jsx
│   │   └── PasswordField.jsx
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Products/
│   │   │   ├── Products.jsx
│   │   │   └── Products.css
│   │   ├── ProductDetails/
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ProductDetails.css
│   │   ├── Cart/
│   │   │   ├── Cart.jsx
│   │   │   └── Cart.css
│   │   ├── Checkout/
│   │   │   ├── Checkout.jsx
│   │   │   └── Checkout.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── Register/
│   │   │   ├── Register.jsx
│   │   │   └── Register.css
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   ├── Presentation.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── loginValidation.js
│   ├── registrationValidation.js
│   ├── storage.js
│   └── *.test.js
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How to Run

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/dongarisirisha600-ship-it/E_commerce_website.git
   cd E_commerce_website
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the app at `http://localhost:5173`

### Backend

1. Move into the backend folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the Express server:
   ```bash
   npm start
   ```

4. Test the API at `http://localhost:5000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Testing

The project includes automated tests for:
- Login form validation
- Registration form validation
- Storage utilities (LocalStorage and SessionStorage)
- Presentation data structure

Run tests with:
```bash
npm test
```

## Key Features Implemented

### Authentication & Login
- User login with email/username and password
- Credential validation (admin@example.com / Admin@123!)
- Error handling and user feedback
- Session persistence with LocalStorage
- Conditional routing based on authentication state
- Logout functionality

### Registration & Form Validation
- Fully controlled form components
- Real-time validation feedback
- Email format validation
- Password strength validation
- Confirm password matching
- Mobile number validation
- Terms acceptance checkbox
- Form reset after successful submission
- Display of submitted user details

### Component Architecture
- Reusable UI components (Button, Card, StatBadge)
- Props-based data passing between components
- Clear separation of concerns
- Responsive component design
- CSS modules for component styling

### State Management
- Local component state with `useState()` hook
- Global state with Context API
- LocalStorage for persistent authentication
- SessionStorage for session-specific data
- Cart state management
- Theme preference persistence

## Technologies Used

- React 18.3.1 - UI library
- Vite 5.4.21 - Build tool and dev server
- React Router DOM 6.18.1 - Client-side routing
- Modern JavaScript (ES6+)
- CSS3 with Flexbox and Grid
- LocalStorage and SessionStorage APIs

## GitHub Repository

Repository: https://github.com/dongarisirisha600-ship-it/E_commerce_website

## Contributors

- [@dongarisirisha600-ship-it](https://github.com/dongarisirisha600-ship-it) - Sirisha

## License

This project is open source and available for educational purposes.

