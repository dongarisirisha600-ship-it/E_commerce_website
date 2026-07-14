import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { readSessionValue, writeSessionValue, readStoredItems } from '../storage';

const summaryStats = [
  { label: 'User Info', value: 'Asha Reddy', detail: 'Premium Customer' },
  { label: 'Cart Items Count', value: '5', detail: '2 ready to checkout' },
  { label: 'Total Price', value: '₹78,500', detail: 'Includes shipping' },
];

const orders = [
  { id: 'ORD102', item: 'Laptop', status: 'Delivered' },
  { id: 'ORD103', item: 'Smartphone', status: 'In Transit' },
  { id: 'ORD104', item: 'Headphones', status: 'Pending' },
];

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => readStoredItems('favorites', []));
  const [recentlyViewed] = useState(() => readStoredItems('recentlyViewed', []));

  useEffect(() => {
    writeSessionValue('lastVisitedPage', '/dashboard');
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        if (!response.ok) {
          throw new Error('Unable to load dashboard products.');
        }

        const data = await response.json();
        setProducts(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const favoriteCount = favorites.length;
  const recentlyViewedCount = recentlyViewed.length;

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <h2 style={{ marginTop: 0, color: '#d62828' }}>Dashboard</h2>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
          <NavLink to="/dashboard/overview" style={({ isActive }) => navLinkStyle(isActive)}>Overview</NavLink>
          <NavLink to="/dashboard/profile" style={({ isActive }) => navLinkStyle(isActive)}>Profile</NavLink>
          <NavLink to="/dashboard/settings" style={({ isActive }) => navLinkStyle(isActive)}>Settings</NavLink>
        </div>
        <Outlet />
      </section>

      <section style={{ display: 'grid', gap: '0.8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {summaryStats.map((stat) => (
            <div key={stat.label} style={{ background: '#fff', borderRadius: '14px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <div style={{ color: '#7a1e1e', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#d62828', marginTop: '0.25rem' }}>{stat.value}</div>
              <div style={{ color: '#6b1f2b', marginTop: '0.3rem' }}>{stat.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
          <h3 style={{ marginTop: 0, color: '#d62828' }}>Orders List</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {orders.map((order) => (
              <div key={order.id} style={{ background: '#fff', borderRadius: '12px', padding: '0.8rem', border: '1px solid #ffd6e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: '700', color: '#d62828' }}>{order.id}</div>
                  <div style={{ color: '#6b1f2b' }}>{order.item}</div>
                </div>
                <span style={{ background: '#ffe4ea', color: '#d62828', padding: '0.35rem 0.7rem', borderRadius: '999px', fontWeight: '700' }}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
          <h3 style={{ marginTop: 0, color: '#d62828' }}>Activity Summary</h3>
          <p style={{ margin: 0, lineHeight: 1.7 }}>You viewed {recentlyViewedCount} items, saved {favoriteCount} favorites, and completed 3 successful orders this week.</p>
        </div>
      </section>

      <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <h3 style={{ marginTop: 0, color: '#d62828' }}>Featured Products</h3>
        {loading && <p style={{ color: '#7a1e1e', fontWeight: '700' }}>Loading products...</p>}
        {error && <p style={{ color: '#dc2626', fontWeight: '700' }}>{error}</p>}
        {!loading && !error && (
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {featuredProducts.map((product) => (
              <div key={product.id} style={{ background: '#fff', borderRadius: '12px', padding: '0.8rem', border: '1px solid #ffd6e0' }}>
                <div style={{ fontWeight: '700', color: '#d62828' }}>{product.title}</div>
                <div style={{ marginTop: '0.2rem' }}>{product.category} • ${product.price}</div>
                <Link to={`/details/${product.id}`} style={{ display: 'inline-block', marginTop: '0.45rem', color: '#d62828', fontWeight: '700' }}>View details</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function navLinkStyle(isActive) {
  return {
    color: isActive ? '#d62828' : '#7a1e1e',
    fontWeight: 700,
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid #d62828' : '2px solid transparent',
    paddingBottom: '0.2rem',
  };
}

export default Dashboard;
