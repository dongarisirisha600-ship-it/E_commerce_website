import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import { sidebarLinks } from './data/catalog';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'products':
        return <Products />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="app-shell">
      <Navbar
        brand="MegaMart"
        links={['Home', 'Products', 'About', 'Contact']}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <main className="layout">
        <Sidebar links={sidebarLinks} activePage={activePage} onNavigate={setActivePage} />
        <section className="content-area">{renderPage()}</section>
      </main>
      <Footer copyright="© 2026 MegaMart. Built with React and Vite." />
    </div>
  );
}

export default App;
