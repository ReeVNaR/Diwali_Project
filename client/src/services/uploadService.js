import { apiClient } from './api.js';

export const uploadService = {
  async uploadLogo(file) {
    const formData = new FormData();
    formData.append('logo', file);
    const res = await apiClient.post('/api/upload/logo', formData);
    return res.data;
  },

  async uploadProduct(file) {
    const formData = new FormData();
    formData.append('product', file);
    const res = await apiClient.post('/api/upload/product', formData);
    return res.data;
  },

  async deleteUpload(filename, type = 'product') {
    const res = await apiClient.delete(`/api/upload/${encodeURIComponent(filename)}`, { type });
    return res;
  }
};
