import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Overview from './pages/Overview';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { readStoredValue, writeStoredValue } from './storage';

function App() {
  const [auth, setAuth] = useState(() => readStoredValue('auth', { isLoggedIn: false, user: null }));
  const [theme, setTheme] = useState(() => readStoredValue('theme', 'light'));

  useEffect(() => {
    if (auth.isLoggedIn) {
      writeStoredValue('auth', auth);
    } else if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth');
    }
  }, [auth]);

  useEffect(() => {
    writeStoredValue('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleLogin = (user) => {
    setAuth({ isLoggedIn: true, user });
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth');
      window.sessionStorage.clear();
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout auth={auth} theme={theme} onToggleTheme={toggleTheme} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={auth.isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={auth.isLoggedIn ? <Dashboard currentUser={auth.user} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
