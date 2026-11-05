import path from 'path';
import { JsonStorageRepository } from './storageService.js';
import { config } from '../config/config.js';

const templatesRepo = new JsonStorageRepository(
  path.join(config.paths.data, 'templates.json'),
  []
);

export const templateService = {
  async getAllTemplates(filters = {}) {
    const { category, format, search, sort } = filters;
    let templates = await templatesRepo.getAll();

    if (category && category !== 'All') {
      templates = templates.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    if (format && format !== 'All') {
      templates = templates.filter(t => t.format.toLowerCase() === format.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      templates = templates.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q))) ||
        (t.editableFields && Object.values(t.editableFields).some(val => String(val).toLowerCase().includes(q)))
      );
    }

    if (sort === 'popular') {
      templates.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    } else if (sort === 'newest') {
      templates.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return templates;
  },

  async getTemplateById(id) {
    return await templatesRepo.getById(id);
  },

  async getTemplatesByCategory(category) {
    return await templatesRepo.find(
      t => t.category.toLowerCase() === category.toLowerCase()
    );
  },

  async getCategories() {
    const templates = await templatesRepo.getAll();
    const categoriesSet = new Set(templates.map(t => t.category));
    return Array.from(categoriesSet);
  }
};
