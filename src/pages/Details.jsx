import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToStoredList } from '../utils/storage';

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
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        if (isMounted) {
          setProduct(data);
          addToStoredList('recentlyViewed', {
            id: data.id,
            title: data.title,
            price: data.price
          });
        }
      } catch (err) {
        if (isMounted) setError('Something went wrong. Please try again later.');
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
      <p><strong>Rating:</strong> {product.rating?.rate} / 5</p>
      <p><strong>Status:</strong> In Stock</p>
      {product.image && <img src={product.image} alt={product.title} className="detail-image" />}
      <div className="actions">
        <button onClick={() => navigate('/products')}>Back</button>
      </div>
    </section>
  );
}

export default Details;
