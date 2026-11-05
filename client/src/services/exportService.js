import { apiClient } from './api.js';

export const exportService = {
  async exportPng({ image, width, height }) {
    const res = await apiClient.post('/api/export/png', { image, width, height });
    return res.data;
  },

  async exportJpeg({ image, width, height, quality = 95 }) {
    const res = await apiClient.post('/api/export/jpeg', { image, width, height, quality });
    return res.data;
  }
};
