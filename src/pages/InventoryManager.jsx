import { useEffect, useMemo, useState } from 'react';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/api';

const defaultRecord = {
  title: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  status: 'In Stock'
};

function InventoryManager() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(defaultRecord);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getProducts({ search: searchTerm });
      setRecords(response.data.products || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load inventory from the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const filteredRecords = useMemo(() => records, [records]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(defaultRecord);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim() || !formData.price || !formData.stock) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      if (editingId) {
        await updateProduct(editingId, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          status: formData.status
        });
        setMessage('Record updated successfully.');
      } else {
        await createProduct({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          status: formData.status
        });
        setMessage('Record added successfully.');
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Unable to save the record.');
    }
  };

  const handleEdit = (record) => {
    setEditingId(record._id || record.id);
    setFormData({
      title: record.title,
      description: record.description,
      category: record.category,
      price: record.price,
      stock: record.stock,
      status: record.status
    });
    setMessage('');
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteTarget);
      setDeleteTarget(null);
      setMessage('Record deleted successfully.');
      await loadProducts();
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Unable to delete the record.');
    }
  };

  return (
    <section className="inventory-manager">
      <h3>Inventory Manager</h3>
      <p>Manage products through the Express + MongoDB backend.</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Product Name
            <input name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Category
            <input name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>
            Price
            <input name="price" type="number" value={formData.price} onChange={handleChange} />
          </label>
          <label>
            Stock
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} />
          </label>
          <label>
            Description
            <input name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </label>
        </div>
        <div className="actions">
          <button type="submit">{editingId ? 'Save Changes' : 'Add Record'}</button>
          <button type="button" className="secondary" onClick={resetForm}>Reset</button>
        </div>
      </form>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error">{error}</div>}

      <input
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name, category, or status"
      />

      {isLoading ? (
        <div className="loading-state">Loading inventory...</div>
      ) : filteredRecords.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="records-table">
          {filteredRecords.map((record) => (
            <article key={record._id || record.id} className="record-card">
              <div>
                <strong>{record.title}</strong>
                <p>{record.category}</p>
              </div>
              <div>
                <p>Price: ₹{record.price.toFixed ? record.price.toFixed(2) : record.price}</p>
                <p>Stock: {record.stock}</p>
                <p>Status: {record.status}</p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(record)}>Edit</button>
                <button className="secondary" onClick={() => setDeleteTarget(record._id || record.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="modal">
          <div className="modal-box">
            <h4>Delete this record?</h4>
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

export default InventoryManager;
