import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, LayoutGrid, Filter, Flame } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import TemplateCard from '../components/TemplateCard.jsx';
import PreviewModal from '../components/PreviewModal.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';
import { useTemplates } from '../hooks/useTemplates.js';

export default function TemplateGallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    templates,
    categories,
    selectedCategory,
    selectedFormat,
    searchQuery,
    sortBy,
    isLoading,
    activePreviewTemplate,
    setCategory,
    setFormat,
    setSearchQuery,
    setSortBy,
    setActivePreview
  } = useTemplates();

  // Sync category from URL param if present on load
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && catParam !== selectedCategory) {
      setCategory(catParam);
    }
  }, [searchParams]);

  // Page limit for fluid browsing
  const [displayCount, setDisplayCount] = useState(24);

  const visibleTemplates = templates.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-festive-gold/15 text-festive-gold text-xs font-semibold">
          <Flame className="w-3.5 h-3.5" />
          <span>Professional Diwali Templates ({templates.length} Ready Designs)</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-white">
          Diwali Creative Template Library
        </h1>
        <p className="text-sm text-festive-textSecondary max-w-2xl">
          Browse through our curated collection of 100+ Diwali advertisements tailored for clothing, jewellery, sweets, electronics, restaurants, real estate and more.
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="rounded-liquid-lg border border-white/10 bg-[#0F1322]/80 backdrop-blur-md p-6 space-y-5 shadow-glass">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setCategory(cat);
            setSearchParams(cat === 'All' ? {} : { category: cat });
          }}
          selectedFormat={selectedFormat}
          onSelectFormat={setFormat}
          sortBy={sortBy}
          onSelectSort={setSortBy}
        />
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <LoadingScreen message="Filtering Diwali templates..." />
      ) : templates.length === 0 ? (
        <div className="p-16 text-center space-y-3 rounded-liquid border border-white/10 bg-white/[0.02]">
          <LayoutGrid className="w-10 h-10 text-festive-gold/50 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-white">No matching templates found</h3>
          <p className="text-xs text-festive-textSecondary max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setCategory('All');
              setFormat('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-festive-gold hover:underline pt-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between text-xs text-festive-textSecondary px-1">
            <span>Showing {visibleTemplates.length} of {templates.length} templates</span>
            {selectedCategory !== 'All' && (
              <span className="text-festive-gold font-medium">Category: {selectedCategory}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={(tpl) => setActivePreview(tpl)}
              />
            ))}
          </div>

          {/* Load More Button if more templates exist */}
          {displayCount < templates.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayCount((prev) => prev + 24)}
                className="px-6 py-3 rounded-liquid text-xs font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:border-festive-gold/40 transition-all shadow-glass"
              >
                Load More Templates ({templates.length - displayCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Preview Modal */}
      <PreviewModal
        template={activePreviewTemplate}
        isOpen={!!activePreviewTemplate}
        onClose={() => setActivePreview(null)}
      />
    </div>
  );
}
