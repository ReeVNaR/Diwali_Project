import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Flame } from 'lucide-react';
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

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && catParam !== selectedCategory) {
      setCategory(catParam);
    }
  }, [searchParams]);

  const [displayCount, setDisplayCount] = useState(24);
  const visibleTemplates = templates.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative overflow-hidden">
      
      {/* Dynamic Animated Ambient Glow */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"
      />
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold shadow-xs">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Professional Diwali Templates ({templates.length} Ready Designs)</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#0F172A]">
          Diwali Creative Template Library
        </h1>
        <p className="text-sm text-[#475569] max-w-2xl leading-relaxed">
          Browse through our curated collection of 100+ Diwali advertisements tailored for clothing, jewellery, sweets, electronics, restaurants, real estate, and more.
        </p>
      </div>

      {/* Filter and Search Bar Section (Liquid Glass) */}
      <div className="rounded-liquid-lg border border-white/90 bg-white/75 backdrop-blur-glass p-6 space-y-5 shadow-glass-elevated">
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
        <div className="p-16 text-center space-y-3 rounded-liquid border border-white/90 bg-white/75 backdrop-blur-glass shadow-glass">
          <LayoutGrid className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-serif text-lg font-black text-[#0F172A]">No matching templates found</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            onClick={() => {
              setCategory('All');
              setFormat('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-amber-700 hover:underline pt-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-semibold">
            <span>Showing {visibleTemplates.length} of {templates.length} templates</span>
            {selectedCategory !== 'All' && (
              <span className="text-amber-700 font-bold">Category: {selectedCategory}</span>
            )}
          </div>

          {/* Symmetrical Uniform Grid - No Items-Start, Symmetrical Fixed Heights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {visibleTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={(tpl) => setActivePreview(tpl)}
              />
            ))}
          </motion.div>

          {/* Load More Button */}
          {displayCount < templates.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setDisplayCount((prev) => prev + 24)}
                className="px-7 py-3 rounded-liquid text-xs font-bold text-[#0F172A] bg-white/80 border border-white/90 hover:bg-white hover:border-amber-500/50 hover:scale-105 active:scale-95 transition-all shadow-glass"
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
