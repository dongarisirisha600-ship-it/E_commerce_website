import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/api';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    status: 'In Stock'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const response = await getProductById(id);
        setFormData({
          title: response.data.title || '',
          description: response.data.description || '',
          category: response.data.category || '',
          price: response.data.price || '',
          stock: response.data.stock || '',
          status: response.data.status || 'In Stock'
        });
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load record for editing.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      await updateProduct(id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
      setSuccessMessage('Product updated successfully.');
      navigate('/products');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to update the product.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="loading-state">Loading product data...</div>;
  }

  return (
    <section className="detail-card">
      <h2>Edit Product</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Title
            <input name="title" value={formData.title} onChange={handleChange} required />
          </label>
          <label>
            Category
            <input name="category" value={formData.category} onChange={handleChange} required />
          </label>
          <label>
            Price
            <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          </label>
          <label>
            Stock
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
          </label>
          <label>
            Description
            <input name="description" value={formData.description} onChange={handleChange} required />
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
          <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</button>
          <button type="button" className="secondary" onClick={() => navigate('/products')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}

export default EditProduct;
