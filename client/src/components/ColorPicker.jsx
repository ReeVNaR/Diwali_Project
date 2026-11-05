import React from 'react';
import { Pipette } from 'lucide-react';

const PALETTES = [
  { name: 'Royal Gold', hex: '#D97706' },
  { name: 'Amber Glow', hex: '#F59E0B' },
  { name: 'Bright Gold', hex: '#FFD700' },
  { name: 'Champagne Light', hex: '#FDE68A' },
  { name: 'Marigold Orange', hex: '#EA580C' },
  { name: 'Crimson Flame', hex: '#E11D48' },
  { name: 'Velvet Rose', hex: '#9F1239' },
  { name: 'Plum Purple', hex: '#86198F' },
  { name: 'Imperial Emerald', hex: '#047857' },
  { name: 'Deep Forest', hex: '#064E3B' },
  { name: 'Sky Sparkle', hex: '#0284C7' },
  { name: 'Midnight Navy', hex: '#0F172A' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Silver Gray', hex: '#94A3B8' },
  { name: 'Dark Slate', hex: '#1E293B' },
  { name: 'Pitch Black', hex: '#080A12' }
];

export default function ColorPicker({
  label = 'Color',
  value = '#D97706',
  onChange
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-[#0F172A] font-bold uppercase">
          {value}
        </span>
      </div>

      {/* Swatches Grid */}
      <div className="grid grid-cols-8 gap-1.5">
        {PALETTES.map((c) => {
          const isSelected = value?.toLowerCase() === c.hex.toLowerCase();
          return (
            <button
              key={c.hex}
              onClick={() => onChange(c.hex)}
              title={c.name}
              className={`
                w-6 h-6 rounded-md transition-all duration-150 relative border shadow-xs
                ${isSelected
                  ? 'scale-110 border-white ring-2 ring-amber-500 shadow-md'
                  : 'border-black/10 hover:scale-105'
                }
              `}
              style={{ backgroundColor: c.hex }}
            />
          );
        })}
      </div>

      {/* Custom HEX input */}
      <div className="flex items-center gap-2 pt-1">
        <div
          className="w-7 h-7 rounded-md border border-black/15 shadow-sm shrink-0"
          style={{ backgroundColor: value }}
        />
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-3 pr-8 py-1 rounded-liquid-sm bg-white/90 border border-black/10 text-[#0F172A] font-mono text-xs focus:outline-none focus:border-amber-500/50 shadow-sm"
            placeholder="#D97706"
          />
          <input
            type="color"
            value={value.startsWith('#') && value.length === 7 ? value : '#D97706'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute right-1 top-1 w-5 h-5 opacity-0 cursor-pointer"
            title="Custom Color"
          />
          <Pipette className="absolute right-2 top-2 w-3.5 h-3.5 text-[#64748B] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
