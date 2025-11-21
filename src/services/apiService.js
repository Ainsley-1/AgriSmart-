// frontend/src/services/apiService.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// PRODUCT service
export const productService = {
  getAll: () => axios.get(`${API_BASE}/products`),
  getById: (id) => axios.get(`${API_BASE}/products/${id}`),
  create: (data) => axios.post(`${API_BASE}/products`, data),
  update: (id, data) => axios.put(`${API_BASE}/products/${id}`, data),
  remove: (id) => axios.delete(`${API_BASE}/products/${id}`)
};

// ORDER service
export const orderService = {
  getAll: () => axios.get(`${API_BASE}/orders`),
  getById: (id) => axios.get(`${API_BASE}/orders/${id}`),
  create: (data) => axios.post(`${API_BASE}/orders`, data),
  updateStatus: (id, status) => axios.patch(`${API_BASE}/orders/${id}/status`, { status })
};

// CART service
export const cartService = {
  get: () => axios.get(`${API_BASE}/cart`),
  add: (item) => axios.post(`${API_BASE}/cart`, item),
  remove: (itemId) => axios.delete(`${API_BASE}/cart/${itemId}`),
  clear: () => axios.delete(`${API_BASE}/cart`)
};

// ANALYTICS service
export const analyticsService = {
  getBuyerStats: () => axios.get(`${API_BASE}/analytics/buyer`),
  getSellerStats: () => axios.get(`${API_BASE}/analytics/seller`),
  getSummary: () => axios.get(`${API_BASE}/analytics/summary`)
};

// AUTH service
export const authService = {
  login: (credentials) => axios.post(`${API_BASE}/auth/login`, credentials),
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  me: () => axios.get(`${API_BASE}/auth/me`)
};
