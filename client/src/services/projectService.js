import { apiClient } from './api.js';

export const projectService = {
  async getProjects() {
    const res = await apiClient.get('/api/projects');
    return res.data;
  },

  async getProjectById(id) {
    const res = await apiClient.get(`/api/projects/${id}`);
    return res.data;
  },

  async createProject(projectData) {
    const res = await apiClient.post('/api/projects', projectData);
    return res.data;
  },

  async updateProject(id, projectData) {
    const res = await apiClient.put(`/api/projects/${id}`, projectData);
    return res.data;
  },

  async deleteProject(id) {
    const res = await apiClient.delete(`/api/projects/${id}`);
    return res;
  }
};
