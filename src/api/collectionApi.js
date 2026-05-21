import axiosClient from './axiosClient';

export const getCollections = () => axiosClient.get('/collections');
export const getCollectionBySlug = (slug) => axiosClient.get(`/collections/${slug}`);
export const createCollection = (data) => axiosClient.post('/collections', data);
export const updateCollection = (id, data) => axiosClient.put(`/collections/${id}`, data);
export const deleteCollection = (id) => axiosClient.delete(`/collections/${id}`);
