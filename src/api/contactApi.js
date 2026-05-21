import axiosClient from './axiosClient';

export const submitContact = (data) => axiosClient.post('/contact', data);
export const getMessages = () => axiosClient.get('/contact');
export const markAsRead = (id) => axiosClient.put(`/contact/${id}/read`);
export const deleteMessage = (id) => axiosClient.delete(`/contact/${id}`);

export const subscribeNewsletter = (data) => axiosClient.post('/newsletter/subscribe', data);
export const getSubscribers = () => axiosClient.get('/newsletter');
