import axios from 'axios';

const apiBaseUrl = (import.meta.env?.VITE_API_URL || '').trim() || '/api';

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

export const getProducts = (params = {}) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (payload) => api.post('/products', payload);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
