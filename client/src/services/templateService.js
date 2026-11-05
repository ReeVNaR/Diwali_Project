import { apiClient } from './api.js';

export const templateService = {
  async getTemplates(params = {}) {
    const res = await apiClient.get('/api/templates', params);
    return res.data;
  },

  async getTemplateById(id) {
    const res = await apiClient.get(`/api/templates/${id}`);
    return res.data;
  },

  async getCategories() {
    const res = await apiClient.get('/api/templates/categories');
    return res.data;
  },

  async getTemplatesByCategory(category) {
    const res = await apiClient.get(`/api/templates/category/${encodeURIComponent(category)}`);
    return res.data;
  }
};
