import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

export default function CategoryFilter({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  selectedFormat = 'All',
  onSelectFormat,
  sortBy = 'popular',
  onSelectSort
}) {
  const formats = [
    'All',
    'Instagram Square',
    'Instagram Portrait',
    'Instagram Story',
    'WhatsApp Square',
    'WhatsApp Portrait'
  ];

  return (
    <div className="space-y-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-liquid-sm text-xs font-medium transition-all duration-200 flex items-center gap-1.5
                ${isSelected
                  ? 'bg-festive-gold text-[#080A12] font-semibold shadow-gold-glow scale-105'
                  : 'bg-white/[0.05] border border-white/10 text-festive-textSecondary hover:text-white hover:bg-white/[0.08]'
                }
              `}
            >
              {isSelected && <Sparkles className="w-3.5 h-3.5" />}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Format & Sort Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-festive-textSecondary flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5 text-festive-gold" />
            Format:
          </span>
          {formats.map((fmt) => {
            const isSelected = selectedFormat === fmt;
            return (
              <button
                key={fmt}
                onClick={() => onSelectFormat(fmt)}
                className={`
                  text-xs px-3 py-1.5 rounded-liquid-sm transition-all duration-200
                  ${isSelected
                    ? 'bg-white/15 text-festive-gold border border-festive-gold/40 font-medium'
                    : 'text-festive-textSecondary hover:text-white bg-white/[0.02]'
                  }
                `}
              >
                {fmt}
              </button>
            );
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-festive-textSecondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="text-xs bg-white/[0.05] border border-white/10 text-white rounded-liquid-sm px-2.5 py-1.5 focus:outline-none focus:border-festive-gold/40 cursor-pointer"
          >
            <option value="popular" className="bg-[#111522] text-white">Most Popular</option>
            <option value="newest" className="bg-[#111522] text-white">Newest Additions</option>
          </select>
        </div>
      </div>
    </div>
  );
}
