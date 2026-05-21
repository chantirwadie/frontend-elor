import axiosClient from './axiosClient';

export const getCart = () => axiosClient.get('/cart');
export const addToCart = (data) => axiosClient.post('/cart', data);
export const updateCartItem = (itemId, data) => axiosClient.put(`/cart/${itemId}`, data);
export const removeCartItem = (itemId) => axiosClient.delete(`/cart/${itemId}`);
