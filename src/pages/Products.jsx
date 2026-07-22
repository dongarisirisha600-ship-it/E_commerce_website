import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { deleteProduct, getProducts } from '../services/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getProducts({ search: searchTerm, page, limit, sort: sortField, order: sortOrder });
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load products from the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, page, sortField, sortOrder]);

  const filteredProducts = useMemo(() => products, [products]);

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

      <div className="toolbar">
        <input
          className="search-input"
          value={searchTerm}
          onChange={(event) => {
            setPage(1);
            setSearchTerm(event.target.value);
          }}
          placeholder="Search by title, description, or category"
        />
        <select value={sortField} onChange={(event) => { setPage(1); setSortField(event.target.value); }}>
          <option value="createdAt">Newest</option>
          <option value="title">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
          <option value="category">Category</option>
        </select>
        <select value={sortOrder} onChange={(event) => { setPage(1); setSortOrder(event.target.value); }}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {successMessage && <div className="success-box">{successMessage}</div>}
      {isLoading && <div className="loading-state">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="empty-state">No products found for the current search or filters.</div>
          ) : (
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
          <div className="pagination">
            <button disabled={page === 1 || isLoading} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages || isLoading} onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </>
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
