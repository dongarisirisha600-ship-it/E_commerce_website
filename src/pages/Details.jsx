import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { syncStoredList } from '../storage';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Unable to load this product.');
        }

        const data = await response.json();
        setProduct(data);
        setError('');
        syncStoredList('recentlyViewed', data, 4);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <section style={panelStyle}><h2 style={headingStyle}>Loading details...</h2></section>;
  }

  if (error || !product) {
    return (
      <section style={panelStyle}>
        <h2 style={headingStyle}>Product not found</h2>
        <p>{error || 'No record exists for this product ID.'}</p>
        <button onClick={() => navigate('/dashboard')} style={buttonStyle}>Back to dashboard</button>
      </section>
    );
  }

  return (
    <section style={panelStyle}>
      <h2 style={headingStyle}>Product Details</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '220px', borderRadius: '14px', justifySelf: 'center' }} />
        <div>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Status:</strong> In Stock</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating?.rate}/5</p>
          <button onClick={() => navigate('/dashboard')} style={buttonStyle}>Back to dashboard</button>
        </div>
      </div>
    </section>
  );
}

const panelStyle = {
  background: '#fff5f8',
  borderRadius: '16px',
  padding: '1rem',
  border: '1px solid #ffd6e0',
};

const headingStyle = {
  marginTop: 0,
  color: '#d62828',
};

const buttonStyle = {
  border: 'none',
  background: '#d62828',
  color: '#fff',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '700',
};

export default Details;
