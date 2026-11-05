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
      <div className="absolute left-4 text-amber-600 pointer-events-none flex items-center">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-11 py-3.5 rounded-liquid bg-white/80 border border-white/90 text-[#0F172A] placeholder-[#94A3B8] text-sm font-medium focus:outline-none focus:border-amber-500/60 focus:bg-white focus:ring-4 focus:ring-amber-500/15 backdrop-blur-md shadow-glass transition-all duration-300"
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 p-1 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-black/5 transition-colors"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
