import React from 'react';
import { Type } from 'lucide-react';

const FONTS = [
  { name: 'Outfit', category: 'Modern Geometric Sans', style: { fontFamily: 'Outfit' } },
  { name: 'Playfair Display', category: 'Royal Luxury Serif', style: { fontFamily: 'Playfair Display' } },
  { name: 'Cinzel', category: 'Classical Festive Roman', style: { fontFamily: 'Cinzel' } },
  { name: 'Poppins', category: 'Bold Commercial Sans', style: { fontFamily: 'Poppins' } },
  { name: 'Montserrat', category: 'Clean Brand Sans', style: { fontFamily: 'Montserrat' } },
  { name: 'Rozha One', category: 'Authentic Indian Bold Display', style: { fontFamily: 'Rozha One' } },
  { name: 'Great Vibes', category: 'Celebratory Calligraphy', style: { fontFamily: 'Great Vibes' } }
];

export default function FontSelector({
  value = 'Outfit',
  onChange
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
        <Type className="w-3.5 h-3.5 text-amber-600" />
        Font Family
      </label>

      <div className="grid grid-cols-1 gap-1 max-h-44 overflow-y-auto pr-1">
        {FONTS.map((f) => {
          const isSelected = value?.toLowerCase() === f.name.toLowerCase();
          return (
            <button
              key={f.name}
              onClick={() => onChange(f.name)}
              className={`
                w-full px-3 py-2 rounded-liquid-sm text-left flex items-center justify-between transition-all duration-150 shadow-xs
                ${isSelected
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-900 font-bold'
                  : 'bg-white/80 border border-black/5 text-[#334155] hover:bg-white hover:text-[#0F172A]'
                }
              `}
            >
              <div>
                <p className="text-xs" style={f.style}>{f.name}</p>
                <p className="text-[10px] text-[#64748B]">{f.category}</p>
              </div>
              <span className="text-xs text-[#94A3B8]" style={f.style}>Aa</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
