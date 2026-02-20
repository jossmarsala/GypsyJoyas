import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const BASE_URL = isLocal ? 'http://localhost:3001' : '';
const API_URL = isLocal ? 'http://localhost:3001/api' : '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const createProduct = async (formData) => {
    const response = await api.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await api.put(`/products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const bulkUpdatePrice = async (data) => {
    const response = await api.post('/products/bulk-price', data);
    return response.data;
};

export const getMaintenanceMode = async () => {
    const response = await api.get('/settings/maintenance');
    return response.data;
};

export const toggleMaintenanceMode = async () => {
    const response = await api.post('/settings/maintenance');
    return response.data;
};

export default api;
