import { apiClient, resolveAssetUrl } from './api.js';

export const uploadService = {
  async uploadLogo(file) {
    const formData = new FormData();
    formData.append('logo', file);
    const res = await apiClient.post('/api/upload/logo', formData);
    if (res?.data?.url) {
      res.data.url = resolveAssetUrl(res.data.url);
    }
    return res;
  },

  async uploadProduct(file) {
    const formData = new FormData();
    formData.append('product', file);
    const res = await apiClient.post('/api/upload/product', formData);
    if (res?.data?.url) {
      res.data.url = resolveAssetUrl(res.data.url);
    }
    return res;
  },

  async deleteUpload(filename, type = 'product') {
    const res = await apiClient.delete(`/api/upload/${encodeURIComponent(filename)}`, { type });
    return res;
  }
};
