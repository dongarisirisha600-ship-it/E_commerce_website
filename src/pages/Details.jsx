import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await getProductById(id);
        if (isMounted) {
          setProduct(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || 'Unable to load product details.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div className="loading-state">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <section>
        <h2>Product not found</h2>
        <p>The selected product could not be located.</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </section>
    );
  }

  return (
    <section className="detail-card">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Status:</strong> {product.status}</p>
      <div className="actions">
        <button onClick={() => navigate('/products')}>Back</button>
      </div>
    </section>
  );
}

export default Details;
