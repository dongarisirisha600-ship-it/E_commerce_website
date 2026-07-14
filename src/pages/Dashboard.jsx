import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const customers = [
  { id: 1, fullName: 'Asha Reddy', email: 'asha@example.com', product: 'Laptop', cost: '₹45,000', views: '1.2k' },
  { id: 2, fullName: 'Kiran Rao', email: 'kiran@example.com', product: 'Smartphone', cost: '₹22,000', views: '980' },
  { id: 3, fullName: 'Nikhil Verma', email: 'nikhil@example.com', product: 'Headphones', cost: '₹3,500', views: '2.4k' },
];

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
          <p style={{ margin: 0, lineHeight: 1.7 }}>You viewed 12 products, added 5 items to the cart, and completed 3 successful orders this week.</p>
        </div>
      </section>

      <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <h3 style={{ marginTop: 0, color: '#d62828' }}>Customer Records</h3>
        <div style={{ display: 'grid', gap: '0.7rem' }}>
          {customers.map((customer) => (
            <div key={customer.id} style={{ background: '#fff', borderRadius: '12px', padding: '0.8rem', border: '1px solid #ffd6e0' }}>
              <div style={{ fontWeight: '700', color: '#d62828' }}>{customer.fullName}</div>
              <div style={{ marginTop: '0.2rem' }}>{customer.product} • {customer.cost}</div>
              <Link to={`/details/${customer.id}`} style={{ display: 'inline-block', marginTop: '0.45rem', color: '#d62828', fontWeight: '700' }}>View details</Link>
            </div>
          ))}
        </div>
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
