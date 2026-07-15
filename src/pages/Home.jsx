import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import StatBox from '../components/StatBox';
import { catalogItems, stats } from '../data/catalog';
import './Home.css';

function Home({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? catalogItems
    : catalogItems.filter((item) => item.badge === selectedCategory);

  return (
    <section className="home-page">
      <div className="hero">
        <div>
          <p className="eyebrow">React Vite Project</p>
          <h1>Build your dream shopping experience.</h1>
          <p>Welcome to a component-based frontend designed to showcase React fundamentals and reusability.</p>
          <div className="hero-actions">
            <Button label="Explore Products" onClick={() => onNavigate('products')} />
            <Button label="Learn More" variant="secondary" onClick={() => onNavigate('about')} />
          </div>
        </div>
      </div>

      <div className="filters">
        <Button label="All" variant={selectedCategory === 'All' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('All')} />
        <Button label="Trending" variant={selectedCategory === 'Trending' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('Trending')} />
        <Button label="Bestseller" variant={selectedCategory === 'Bestseller' ? 'primary' : 'secondary'} onClick={() => setSelectedCategory('Bestseller')} />
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatBox key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="cards-grid">
        {filteredItems.map((item) => (
          <Card key={item.id} title={item.title} description={item.description} price={item.price} badge={item.badge} />
        ))}
      </div>
    </section>
  );
}

export default Home;
