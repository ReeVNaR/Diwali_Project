import React from 'react';
import { Pipette } from 'lucide-react';

const PALETTES = [
  { name: 'Royal Gold', hex: '#F5B942' },
  { name: 'Pure Gold', hex: '#FFD700' },
  { name: 'Champagne Light', hex: '#FDE68A' },
  { name: 'Deep Amber', hex: '#D97706' },
  { name: 'Marigold Orange', hex: '#FF7043' },
  { name: 'Crimson Flame', hex: '#E11D48' },
  { name: 'Velvet Rose', hex: '#9F1239' },
  { name: 'Plum Purple', hex: '#86198F' },
  { name: 'Imperial Emerald', hex: '#10B981' },
  { name: 'Deep Forest', hex: '#047857' },
  { name: 'Sky Sparkle', hex: '#38BDF8' },
  { name: 'Midnight Navy', hex: '#080D1E' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Silver Gray', hex: '#D1D5DB' },
  { name: 'Dark Charcoal', hex: '#1F2937' },
  { name: 'Pitch Black', hex: '#080A12' }
];

export default function ColorPicker({
  label = 'Color',
  value = '#FFFFFF',
  onChange
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-white/70 uppercase">
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
                w-6 h-6 rounded-md transition-all duration-150 relative border
                ${isSelected
                  ? 'scale-110 border-white ring-2 ring-festive-gold shadow-md'
                  : 'border-white/10 hover:scale-105'
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
          className="w-7 h-7 rounded-md border border-white/20 shrink-0"
          style={{ backgroundColor: value }}
        />
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-3 pr-8 py-1.5 rounded-liquid-sm bg-white/[0.05] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-festive-gold/50"
            placeholder="#FFFFFF"
          />
          <input
            type="color"
            value={value.startsWith('#') && value.length === 7 ? value : '#FFFFFF'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute right-1 top-1 w-5 h-5 opacity-0 cursor-pointer"
            title="Custom Color"
          />
          <Pipette className="absolute right-2 top-2 w-3.5 h-3.5 text-festive-textSecondary pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
