import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getProducts } from '../services/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await getProducts({ search: searchTerm });
        if (isMounted) {
          setProducts(response.data.products || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || 'Unable to load products from the backend.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

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
      <p>Browse products loaded directly from the Express + MongoDB backend.</p>
      <div className="actions" style={{ marginBottom: '1rem' }}>
        <Link to="/dashboard/overview">Open Dashboard</Link>
      </div>

      <input
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by title, description, or category"
      />

      {isLoading && <div className="loading-state">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <div className="cards-grid">
          {filteredProducts.map((item) => (
            <Card key={item._id || item.id} id={item._id || item.id} title={item.title} description={item.description} price={item.price} badge={item.category} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
