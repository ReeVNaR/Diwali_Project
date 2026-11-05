import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search 100+ Diwali templates (e.g. Jewellery, Sweets, 50% Off)...',
  className = ''
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-4.5 text-festive-textSecondary pointer-events-none flex items-center">
        <Search className="w-5 h-5 text-festive-gold/70" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3.5 rounded-liquid-sm bg-white/[0.05] border border-white/10 text-white placeholder-festive-textSecondary/60 text-sm focus:outline-none focus:border-festive-gold/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-festive-gold/20 backdrop-blur-md transition-all duration-300"
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 p-1 rounded-full text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
