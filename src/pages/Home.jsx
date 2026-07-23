import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import StatBox from '../components/StatBox';
import { catalogItems, stats } from '../data/catalog';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? catalogItems
    : catalogItems.filter((item) => item.badge === selectedCategory);

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MegaMart Storefront</p>
          <h1>Shop the products customers love most.</h1>
          <p>
            Browse a clean and customer-friendly ecommerce homepage designed to help shoppers quickly find
            trending products, featured deals, and trusted categories.
          </p>
          <div className="hero-actions">
            <Button label="Explore Products" onClick={() => navigate('/products')} />
            <Button label="Register Now" variant="secondary" onClick={() => navigate('/register')} />
          </div>
        </div>

        <div className="hero-highlight">
          <h3>Today’s Best Picks</h3>
          <ul>
            <li>Fast delivery on top-selling items</li>
            <li>Easy navigation for customer browsing</li>
            <li>Clean and reusable React UI design</li>
          </ul>
        </div>
      </div>

      <div className="filters">
        <Button label="All" variant={selectedCategory === 'All' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('All')} />
        <Button label="Trending" variant={selectedCategory === 'Trending' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('Trending')} />
        <Button label="Bestseller" variant={selectedCategory === 'Bestseller' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('Bestseller')} />
        <Button label="New" variant={selectedCategory === 'New' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('New')} />
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatBox key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="actions" style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard/overview">Open Dashboard</Link>
      </div>

      <div className="section-heading">
        <h2>Featured Products</h2>
        <p>Multiple products are displayed on the homepage to make the catalog easy to browse.</p>
      </div>

      <div className="cards-grid">
        {filteredItems.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} description={item.description} price={item.price} badge={item.badge} image={item.image} />
        ))}
      </div>
    </section>
  );
}

export default Home;
