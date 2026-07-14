import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { readStoredItems, syncStoredList } from '../storage';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(() => readStoredItems('favorites', []));
  const [recentlyViewed, setRecentlyViewed] = useState(() => readStoredItems('recentlyViewed', []));

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        if (!response.ok) {
          throw new Error('Unable to load products.');
        }

        const data = await response.json();
        if (active) {
          setProducts(data);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = `${product.title} ${product.category}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
  }, [products, query]);

  const toggleFavorite = (product) => {
    const nextFavorites = favorites.some((item) => item.id === product.id)
      ? favorites.filter((item) => item.id !== product.id)
      : [...favorites, product];

    setFavorites(nextFavorites);
    window.localStorage.setItem('favorites', JSON.stringify(nextFavorites));
  };

  const handleView = (product) => {
    const nextRecentlyViewed = syncStoredList('recentlyViewed', product, 4);
    setRecentlyViewed(nextRecentlyViewed);
  };

  return (
    <section style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <h2 style={{ marginTop: 0, color: '#d62828' }}>Welcome to the Customer Portal</h2>
        <p style={{ lineHeight: 1.7 }}>This React app now loads live product data, supports dynamic details pages, and preserves your favorites and recent views.</p>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <Link to="/about" style={{ color: '#d62828', fontWeight: '700' }}>Learn more</Link>
          <Link to="/dashboard" style={{ color: '#d62828', fontWeight: '700' }}>Open dashboard</Link>
        </div>
      </div>

      <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, color: '#d62828' }}>Featured Products</h3>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or category"
            style={{ padding: '0.7rem 0.85rem', borderRadius: '10px', border: '1px solid #ffd6e0', minWidth: '220px' }}
          />
        </div>

        {loading && <p style={{ color: '#7a1e1e', fontWeight: '700' }}>Loading products...</p>}
        {error && <p style={{ color: '#dc2626', fontWeight: '700' }}>{error}</p>}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem', marginTop: '0.8rem' }}>
            {filteredProducts.map((product) => (
              <article key={product.id} style={{ background: '#fff', borderRadius: '14px', padding: '0.9rem', border: '1px solid #ffd6e0', display: 'grid', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: '#ffe4ea', color: '#d62828', padding: '0.3rem 0.55rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '700' }}>{product.category}</span>
                  <button onClick={() => toggleFavorite(product)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.1rem' }}>
                    {favorites.some((item) => item.id === product.id) ? '♥' : '♡'}
                  </button>
                </div>
                <h4 style={{ margin: 0, color: '#d62828' }}>{product.title}</h4>
                <p style={{ margin: 0, color: '#6b1f2b', fontSize: '0.95rem' }}>{product.description.slice(0, 90)}...</p>
                <div style={{ fontWeight: '700', color: '#d62828' }}>${product.price}</div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <Link to={`/details/${product.id}`} onClick={() => handleView(product)} style={{ color: '#d62828', fontWeight: '700' }}>View details</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <h3 style={{ marginTop: 0, color: '#d62828' }}>Recently Viewed</h3>
        {recentlyViewed.length === 0 ? <p>No recent views yet.</p> : (
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {recentlyViewed.map((item) => (
              <span key={item.id} style={{ background: '#fff', border: '1px solid #ffd6e0', padding: '0.45rem 0.7rem', borderRadius: '999px', color: '#7a1e1e' }}>{item.title}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
