import React, { useEffect, useMemo, useState } from 'react';
import { readSessionValue, writeSessionValue, readStoredItems, writeStoredItems } from '../storage';

const defaultRecords = [
  { id: 'PRD-001', name: 'Wireless Mouse', category: 'Electronics', price: 899, stock: 24, status: 'Active' },
  { id: 'PRD-002', name: 'Bluetooth Speaker', category: 'Audio', price: 1299, stock: 14, status: 'Active' },
  { id: 'PRD-003', name: 'Travel Backpack', category: 'Accessories', price: 1799, stock: 8, status: 'Active' },
];

const blankRecord = { name: '', category: '', price: '', stock: '', status: 'Active' };

function Settings() {
  const [records, setRecords] = useState(() => readStoredItems('appRecords', defaultRecords));
  const [formValues, setFormValues] = useState(() => readSessionValue('recordDraft', blankRecord));
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState(() => readSessionValue('recordsSearch', ''));
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    writeStoredItems('appRecords', records);
  }, [records]);

  useEffect(() => {
    writeSessionValue('recordsSearch', search);
  }, [search]);

  useEffect(() => {
    writeSessionValue('recordDraft', formValues);
  }, [formValues]);

  useEffect(() => {
    writeSessionValue('lastVisitedPage', '/dashboard/settings');
  }, []);

  const filteredRecords = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return records;
    }

    return records.filter((record) => {
      const text = `${record.name} ${record.category} ${record.status}`.toLowerCase();
      return text.includes(term);
    });
  }, [records, search]);

  const resetForm = () => {
    setFormValues(blankRecord);
    setEditingId(null);
    setErrorMessage('');
    setStatusMessage('');
    writeSessionValue('recordDraft', blankRecord);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!formValues.name.trim() || !formValues.category.trim() || !formValues.price.toString().trim() || !formValues.stock.toString().trim()) {
      setErrorMessage('Please complete all fields before saving.');
      return;
    }

    const nextRecord = {
      id: editingId || `PRD-${Math.floor(Math.random() * 100000)}`,
      name: formValues.name.trim(),
      category: formValues.category.trim(),
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      status: formValues.status,
    };

    if (editingId) {
      setRecords((current) => current.map((record) => (record.id === editingId ? nextRecord : record)));
      setStatusMessage('Record updated successfully.');
    } else {
      setRecords((current) => [nextRecord, ...current]);
      setStatusMessage('Record added successfully.');
    }

    resetForm();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormValues({
      name: record.name,
      category: record.category,
      price: record.price,
      stock: record.stock,
      status: record.status,
    });
    setErrorMessage('');
    setStatusMessage('Editing record. Save to apply changes.');
  };

  const handleDelete = (record) => {
    const confirmed = typeof window !== 'undefined' && window.confirm(`Delete ${record.name}? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setRecords((current) => current.filter((item) => item.id !== record.id));
    setStatusMessage(`Deleted ${record.name}.`);
    if (editingId === record.id) {
      resetForm();
    }
  };

  const lastVisited = readSessionValue('lastVisitedPage', '/dashboard/settings');

  return (
    <section style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ background: 'var(--panel)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border)' }}>
        <h2 style={{ marginTop: 0, color: 'var(--accent)' }}>Product Records</h2>
        <p style={{ margin: 0, lineHeight: 1.7 }}>Manage application data in local storage. Add, edit, delete records and keep them saved after refresh.</p>
        <p style={{ margin: '0.75rem 0 0', color: 'var(--muted)' }}>Session-only info: last visited path is <strong>{lastVisited}</strong>, and your search filter is preserved while the browser remains open.</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 320px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.9rem', background: 'var(--panel)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: 0, color: 'var(--accent)' }}>{editingId ? 'Edit Record' : 'Add New Record'}</h3>
          <label style={labelStyle}>
            Name
            <input name="name" value={formValues.name} onChange={handleChange} style={inputStyle} placeholder="Product name" />
          </label>
          <label style={labelStyle}>
            Category
            <input name="category" value={formValues.category} onChange={handleChange} style={inputStyle} placeholder="e.g. Electronics" />
          </label>
          <label style={labelStyle}>
            Price
            <input name="price" type="number" value={formValues.price} onChange={handleChange} style={inputStyle} placeholder="In rupees" />
          </label>
          <label style={labelStyle}>
            Stock
            <input name="stock" type="number" value={formValues.stock} onChange={handleChange} style={inputStyle} placeholder="Quantity available" />
          </label>
          <label style={labelStyle}>
            Status
            <select name="status" value={formValues.status} onChange={handleChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="submit" style={buttonStyle}>{editingId ? 'Save changes' : 'Add record'}</button>
            <button type="button" onClick={resetForm} style={{ ...buttonStyle, background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border)' }}>Clear</button>
          </div>
          {errorMessage && <div style={{ color: '#dc2626', fontWeight: 600 }}>{errorMessage}</div>}
          {statusMessage && <div style={{ color: '#166534', fontWeight: 600 }}>{statusMessage}</div>}
        </form>

        <div style={{ background: 'var(--panel)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Search Records</h3>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, category, status"
            style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
          />
          <p style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>Search terms are stored in session storage and cleared when the browser closes.</p>
        </div>
      </div>

      <div style={{ background: 'var(--panel)', borderRadius: '16px', padding: '1rem', border: '1px solid var(--border)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Records</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Stock</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '1rem', color: 'var(--muted)' }}>No records found. Try a different search or add a record.</td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={tableCellStyle}>{record.id}</td>
                    <td style={tableCellStyle}>{record.name}</td>
                    <td style={tableCellStyle}>{record.category}</td>
                    <td style={tableCellStyle}>₹{record.price}</td>
                    <td style={tableCellStyle}>{record.stock}</td>
                    <td style={tableCellStyle}><strong>{record.status}</strong></td>
                    <td style={{ ...tableCellStyle, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => handleEdit(record)} style={actionButtonStyle}>Edit</button>
                      <button type="button" onClick={() => handleDelete(record)} style={{ ...actionButtonStyle, background: '#fde8e8', color: '#9b1c1c' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  display: 'grid',
  gap: '0.35rem',
  color: 'var(--text)',
  fontWeight: 600,
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  background: 'var(--surface)',
  color: 'var(--text)',
};

const buttonStyle = {
  border: 'none',
  background: 'var(--accent)',
  color: '#fff',
  padding: '0.85rem 1rem',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: 700,
};

const tableHeaderStyle = {
  textAlign: 'left',
  padding: '0.85rem',
  color: 'var(--muted)',
  fontSize: '0.92rem',
};

const tableCellStyle = {
  padding: '0.85rem',
  color: 'var(--text)',
  verticalAlign: 'top',
};

const actionButtonStyle = {
  border: 'none',
  background: '#ffd6dc',
  color: '#9b1c1c',
  borderRadius: '10px',
  padding: '0.55rem 0.75rem',
  cursor: 'pointer',
};

export default Settings;
