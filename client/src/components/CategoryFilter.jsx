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
      {/* Category Pills (Liquid Glass Pills) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-liquid text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xs
                ${isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-gold-glow scale-105'
                  : 'bg-white/70 border border-white/90 text-[#475569] hover:text-[#0F172A] hover:bg-white hover:border-amber-500/30'
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
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            Format:
          </span>
          {formats.map((fmt) => {
            const isSelected = selectedFormat === fmt;
            return (
              <button
                key={fmt}
                onClick={() => onSelectFormat(fmt)}
                className={`
                  text-xs px-3 py-1.5 rounded-liquid-sm font-semibold transition-all duration-200 shadow-xs
                  ${isSelected
                    ? 'bg-amber-500/20 text-amber-900 border border-amber-500/40'
                    : 'text-[#64748B] hover:text-[#0F172A] bg-white/60 border border-white/80 hover:bg-white'
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
          <span className="text-xs text-[#64748B] font-semibold">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="text-xs bg-white/80 border border-white/90 text-[#0F172A] font-bold rounded-liquid-sm px-2.5 py-1.5 focus:outline-none focus:border-amber-500/50 cursor-pointer shadow-xs"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest Additions</option>
          </select>
        </div>
      </div>
    </div>
  );
}
