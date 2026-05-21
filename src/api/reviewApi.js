import axiosClient from './axiosClient';

export const addReview = (data) => axiosClient.post('/reviews', data);
export const getProductReviews = (productId) => axiosClient.get(`/reviews/product/${productId}`);
export const getAllReviews = () => axiosClient.get('/reviews/admin/all');
export const approveReview = (id) => axiosClient.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => axiosClient.delete(`/reviews/${id}`);
