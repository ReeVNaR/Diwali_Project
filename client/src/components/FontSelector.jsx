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
    <div className="space-y-2">
      <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider flex items-center gap-1.5">
        <Type className="w-3.5 h-3.5 text-festive-gold" />
        Font Family
      </label>

      <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
        {FONTS.map((f) => {
          const isSelected = value?.toLowerCase() === f.name.toLowerCase();
          return (
            <button
              key={f.name}
              onClick={() => onChange(f.name)}
              className={`
                w-full px-3 py-2 rounded-liquid-sm text-left flex items-center justify-between transition-all duration-150
                ${isSelected
                  ? 'bg-festive-gold/20 border border-festive-gold/40 text-festive-gold'
                  : 'bg-white/[0.03] border border-white/5 text-white/80 hover:bg-white/[0.07] hover:text-white'
                }
              `}
            >
              <div>
                <p className="text-sm" style={f.style}>{f.name}</p>
                <p className="text-[10px] text-festive-textSecondary">{f.category}</p>
              </div>
              <span className="text-xs text-white/50" style={f.style}>Aa</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
