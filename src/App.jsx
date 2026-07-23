import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Clothing from './pages/Clothing';
import Fashion from './pages/Fashion';
import Material from './pages/Material';
import StyleGuide from './pages/StyleGuide';
import Wardrobe from './pages/Wardrobe';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardOverview from './pages/DashboardOverview';
import DashboardProfile from './pages/DashboardProfile';
import DashboardSettings from './pages/DashboardSettings';
import Details from './pages/Details';
import EditProduct from './pages/EditProduct';
import NotFound from './pages/NotFound';
import { readStoredValue, writeStoredValue } from './utils/storage';
import './App.css';

function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function App() {
  const [user, setUser] = useState(() => readStoredValue('authUser', null));

  useEffect(() => {
    if (user) {
      writeStoredValue('authUser', user);
    } else {
      writeStoredValue('authUser', null);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    writeStoredValue('authUser', null);
    writeStoredValue('lastVisitedPage', '/');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/material" element={<Material />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={Boolean(user)}>
                <Dashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<DashboardOverview user={user} />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
