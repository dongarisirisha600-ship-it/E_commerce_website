import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { writeStoredValue } from '../utils/storage';

const pageTitles = {
  '/': 'Home',
  '/products': 'Products',
  '/about': 'About',
  '/contact': 'Contact',
  '/register': 'Register',
  '/login': 'Login',
  '/dashboard': 'Dashboard'
};

function Layout({ user, onLogout }) {
  const location = useLocation();
  const mainLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Register', to: '/register' }
  ];

  const sidebarLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Register', to: '/register' }
  ];

  useEffect(() => {
    const key = location.pathname.startsWith('/dashboard') ? '/dashboard' : location.pathname;
    const pageName = pageTitles[key] || 'Page Not Found';
    document.title = `MegaMart | ${pageName}`;
  }, [location.pathname]);

  useEffect(() => {
    writeStoredValue('lastVisitedPage', location.pathname);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar brand="MegaMart" links={mainLinks} user={user} onLogout={onLogout} />
      <main className="layout">
        <Sidebar links={sidebarLinks} />
        <section className="content-area">
          <Outlet />
        </section>
      </main>
      <Footer copyright="© 2026 MegaMart. Built with React and Vite." />
    </div>
  );
}

export default Layout;
