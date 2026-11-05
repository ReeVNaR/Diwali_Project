import { create } from 'zustand';
import { templateService } from '../services/templateService.js';

export const useTemplateStore = create((set, get) => ({
  templates: [],
  categories: [],
  selectedCategory: 'All',
  selectedFormat: 'All',
  searchQuery: '',
  sortBy: 'popular',
  isLoading: false,
  error: null,
  activePreviewTemplate: null,

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchTemplates();
  },

  setFormat: (format) => {
    set({ selectedFormat: format });
    get().fetchTemplates();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchTemplates();
  },

  setSortBy: (sort) => {
    set({ sortBy: sort });
    get().fetchTemplates();
  },

  setActivePreview: (template) => set({ activePreviewTemplate: template }),

  fetchCategories: async () => {
    try {
      const categories = await templateService.getCategories();
      set({ categories: ['All', ...categories] });
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  },

  fetchTemplates: async () => {
    const { selectedCategory, selectedFormat, searchQuery, sortBy } = get();
    set({ isLoading: true, error: null });
    try {
      const templates = await templateService.getTemplates({
        category: selectedCategory === 'All' ? '' : selectedCategory,
        format: selectedFormat === 'All' ? '' : selectedFormat,
        search: searchQuery,
        sort: sortBy
      });
      set({ templates, isLoading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch templates', isLoading: false });
    }
  }
}));
