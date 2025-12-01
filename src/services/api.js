import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://agrismart-hido.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dashboard service
export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },
};

// Auth service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Products service
export const productsService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
};

// Cart service
export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  addToCart: async (itemData) => {
    const response = await api.post('/cart/add', itemData);
    return response.data;
  },
};

// Orders service
export const ordersService = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
};

export default api;

