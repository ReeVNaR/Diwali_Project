import { useEffect } from 'react';
import { useTemplateStore } from '../store/templateStore.js';

export function useTemplates() {
  const {
    templates,
    categories,
    selectedCategory,
    selectedFormat,
    searchQuery,
    sortBy,
    isLoading,
    error,
    activePreviewTemplate,
    setCategory,
    setFormat,
    setSearchQuery,
    setSortBy,
    setActivePreview,
    fetchCategories,
    fetchTemplates
  } = useTemplateStore();

  useEffect(() => {
    fetchCategories();
    fetchTemplates();
  }, [fetchCategories, fetchTemplates]);

  return {
    templates,
    categories,
    selectedCategory,
    selectedFormat,
    searchQuery,
    sortBy,
    isLoading,
    error,
    activePreviewTemplate,
    setCategory,
    setFormat,
    setSearchQuery,
    setSortBy,
    setActivePreview,
    refetch: fetchTemplates
  };
}
