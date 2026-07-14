import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const customers = [
  { id: 1, fullName: 'Asha Reddy', email: 'asha@example.com', product: 'Laptop', cost: '₹45,000', views: '1.2k' },
  { id: 2, fullName: 'Kiran Rao', email: 'kiran@example.com', product: 'Smartphone', cost: '₹22,000', views: '980' },
  { id: 3, fullName: 'Nikhil Verma', email: 'nikhil@example.com', product: 'Headphones', cost: '₹3,500', views: '2.4k' },
];

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((item) => item.id === Number(id));

  if (!customer) {
    return (
      <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
        <h2 style={{ marginTop: 0, color: '#d62828' }}>Customer not found</h2>
        <p>No record exists for this customer ID.</p>
      </section>
    );
  }

  return (
    <section style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
      <h2 style={{ marginTop: 0, color: '#d62828' }}>Customer Details</h2>
      <p><strong>Name:</strong> {customer.fullName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Product:</strong> {customer.product}</p>
      <p><strong>Cost:</strong> {customer.cost}</p>
      <p><strong>Views:</strong> {customer.views}</p>
      <button onClick={() => navigate('/dashboard')} style={{ border: 'none', background: '#d62828', color: '#fff', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Back to dashboard</button>
    </section>
  );
}

export default Details;
