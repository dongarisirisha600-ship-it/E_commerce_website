import { useEffect, useMemo, useState } from 'react';
import { readStoredValue, writeStoredValue } from '../utils/storage';

const defaultRecord = {
  id: '',
  name: '',
  category: '',
  price: '',
  stock: '',
  status: 'In Stock'
};

function InventoryManager() {
  const [records, setRecords] = useState(() => readStoredValue('inventoryRecords', []));
  const [formData, setFormData] = useState(defaultRecord);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    writeStoredValue('inventoryRecords', records);
    writeStoredValue('lastVisitedPage', '/dashboard/overview');
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return records.filter((record) => {
      return [record.name, record.category, record.status].some((value) => value?.toLowerCase().includes(query));
    });
  }, [records, searchTerm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(defaultRecord);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.category.trim() || !formData.price || !formData.stock) {
      setMessage('Please fill in all required fields.');
      return;
    }

    if (editingId) {
      setRecords((prev) => prev.map((record) => record.id === editingId ? { ...record, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : record));
      setMessage('Record updated successfully.');
    } else {
      const newRecord = {
        id: Date.now().toString(),
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };
      setRecords((prev) => [newRecord, ...prev]);
      setMessage('Record added successfully.');
    }

    resetForm();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData({
      id: record.id,
      name: record.name,
      category: record.category,
      price: record.price,
      stock: record.stock,
      status: record.status
    });
    setMessage('');
  };

  const handleDelete = () => {
    setRecords((prev) => prev.filter((record) => record.id !== deleteTarget));
    setDeleteTarget(null);
    setMessage('Record deleted successfully.');
  };

  return (
    <section className="inventory-manager">
      <h3>Inventory Manager</h3>
      <p>Manage products locally with full CRUD support and persistence.</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Product Name
            <input name="name" value={formData.name} onChange={handleChange} />
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

      <input
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name, category, or status"
      />

      <div className="records-table">
        {filteredRecords.map((record) => (
          <article key={record.id} className="record-card">
            <div>
              <strong>{record.name}</strong>
              <p>{record.category}</p>
            </div>
            <div>
              <p>Price: ${record.price}</p>
              <p>Stock: {record.stock}</p>
              <p>Status: {record.status}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(record)}>Edit</button>
              <button className="secondary" onClick={() => setDeleteTarget(record.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>

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
