import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { readStoredValue } from '../utils/storage';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Unable to fetch products');
        const data = await response.json();
        if (isMounted) setProducts(data);
      } catch (err) {
        if (isMounted) setError('Something went wrong. Please try again later.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();
    setRecentlyViewed(readStoredValue('recentlyViewed', []));

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return products.filter((product) => {
      const values = [product.title, product.description, product.category];
      return values.some((value) => value?.toLowerCase().includes(query));
    });
  }, [products, searchTerm]);

  return (
    <section className="products-page">
      <h2>Products Page</h2>
      <p>Browse real products from the Fake Store API with live loading and error handling.</p>
      <div className="actions" style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard/overview">Open Dashboard</Link>
      </div>

      <input
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by title, description, or category"
      />

      {recentlyViewed.length > 0 && (
        <div className="recent-box">
          <h3>Recently Viewed</h3>
          <ul>
            {recentlyViewed.map((item) => (
              <li key={item.id}>
                <Link to={`/products/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && <div className="loading-state">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <div className="cards-grid">
          {filteredProducts.map((item) => (
            <Card key={item.id} id={item.id} title={item.title} description={item.description} price={item.price} badge={item.category} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
