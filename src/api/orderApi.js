import axiosClient from './axiosClient';

export const createOrder = (data) => axiosClient.post('/orders', data);
export const getMyOrders = () => axiosClient.get('/orders/my-orders');
export const getOrderById = (id) => axiosClient.get(`/orders/${id}`);
export const getAllOrders = (params) => axiosClient.get('/orders/admin/all', { params });
export const updateOrderStatus = (id, data) => axiosClient.put(`/orders/${id}/status`, data);
