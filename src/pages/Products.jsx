import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { deleteProduct, getProducts } from '../services/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getProducts({ search: searchTerm });
      setProducts(response.data.products || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load products from the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return products.filter((product) => {
      const values = [product.title, product.description, product.category];
      return values.some((value) => value?.toLowerCase().includes(query));
    });
  }, [products, searchTerm]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setError('');
    try {
      await deleteProduct(deleteTarget);
      setSuccessMessage('Product deleted successfully.');
      setDeleteTarget(null);
      await fetchProducts();
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to delete the product.');
    } finally {
      setIsDeleting(false);
    }
  };

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

      {successMessage && <div className="success-box">{successMessage}</div>}
      {isLoading && <div className="loading-state">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <div className="cards-grid">
          {filteredProducts.map((item) => (
            <Card
              key={item._id || item.id}
              id={item._id || item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              badge={item.category}
              onDelete={() => setDeleteTarget(item._id || item.id)}
              isDeleting={isDeleting && deleteTarget === (item._id || item.id)}
            />
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="modal">
          <div className="modal-box">
            <h4>Delete this product?</h4>
            <p>This action cannot be undone.</p>
            <div className="actions">
              <button onClick={handleDelete}>Confirm</button>
              <button className="secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
