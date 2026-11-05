import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, Palette, Flame, ArrowUpRight } from 'lucide-react';
import GlassCard from './GlassCard.jsx';

export default function TemplateCard({
  template,
  onPreview
}) {
  const navigate = useNavigate();

  const handleUseTemplate = (e) => {
    e.stopPropagation();
    navigate(`/editor?templateId=${template.id}`);
  };

  // Compute aspect ratio CSS
  const getAspectRatioClass = () => {
    if (template.height === 1920) return 'aspect-[9/16] max-h-[460px]';
    if (template.height === 1350) return 'aspect-[4/5] max-h-[420px]';
    return 'aspect-square max-h-[380px]';
  };

  const colors = template.colors || {
    bgStart: '#080d1e',
    primary: '#F5B942',
    secondary: '#FF7043',
    border: 'rgba(245, 185, 66, 0.4)',
    badgeBg: '#D97706',
    text: '#FFFFFF'
  };

  const fields = template.editableFields || {};

  return (
    <GlassCard
      className="group overflow-hidden flex flex-col transition-all duration-300"
      hoverEffect={true}
    >
      {/* Visual Creative Canvas Preview */}
      <div
        className={`relative w-full ${getAspectRatioClass()} p-4 flex flex-col justify-between overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]`}
        style={{
          background: `radial-gradient(circle at 50% 30%, ${colors.primary}15 0%, ${colors.bgStart} 80%)`,
          backgroundColor: colors.bgStart
        }}
      >
        {/* Decorative Festive Border Inside */}
        <div
          className="absolute inset-3 rounded-xl pointer-events-none border"
          style={{ borderColor: colors.border }}
        />
        <div
          className="absolute inset-4 rounded-lg pointer-events-none border border-dashed opacity-40"
          style={{ borderColor: colors.primary }}
        />

        {/* Top Ornaments & Format Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white/80 border border-white/10">
            {template.width} × {template.height}
          </span>
          {template.isPopular && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-festive-gold/20 text-festive-gold border border-festive-gold/40 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Popular
            </span>
          )}
        </div>

        {/* Center Festive Art & Typography */}
        <div className="relative z-10 my-auto text-center px-3 space-y-2">
          {/* Diya / Sparkle Icon */}
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-black/30 border border-white/10 shadow-lg">
            <Flame className="w-5 h-5 text-festive-gold animate-pulse" />
          </div>

          {/* Brand Name Tag */}
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: colors.accent || colors.primary }}
          >
            {fields.brandName || 'YOUR BRAND NAME'}
          </p>

          {/* Headline */}
          <h4
            className="font-serif font-black text-sm sm:text-base leading-tight line-clamp-2 drop-shadow-md"
            style={{ color: colors.text }}
          >
            {fields.headline || template.name}
          </h4>

          {/* Subtitle */}
          <p className="text-[10px] text-white/70 line-clamp-1">
            {fields.subheadline || 'Festive Special Collection'}
          </p>

          {/* Discount Badge */}
          {fields.discount && (
            <div className="pt-1">
              <span
                className="inline-block text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-white/20"
                style={{
                  backgroundColor: colors.badgeBg,
                  color: '#FFFFFF'
                }}
              >
                {fields.discount}
              </span>
            </div>
          )}
        </div>

        {/* Footer Offer & CTA bar inside creative */}
        <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] border-t border-white/10">
          <span className="font-semibold" style={{ color: colors.primary }}>
            {fields.price || 'Special Offer'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/90 font-medium">
            {fields.cta || 'SHOP NOW'}
          </span>
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={handleUseTemplate}
            className="w-full max-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-liquid text-xs font-semibold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Palette className="w-4 h-4" />
            <span>Customize in Studio</span>
          </button>

          {onPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="w-full max-w-[200px] flex items-center justify-center gap-2 py-2 px-4 rounded-liquid text-xs font-medium text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
              <span>Full Preview</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 flex items-center justify-between bg-white/[0.02] border-t border-white/5">
        <div className="min-w-0 pr-2">
          <h3 className="font-medium text-sm text-white truncate group-hover:text-festive-gold transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-festive-textSecondary">{template.category}</span>
            <span className="text-white/20">•</span>
            <span className="text-[11px] text-festive-textSecondary">{template.format}</span>
          </div>
        </div>

        <button
          onClick={handleUseTemplate}
          className="p-2 rounded-liquid-sm text-festive-gold bg-festive-gold/10 hover:bg-festive-gold hover:text-[#080A12] transition-colors shrink-0"
          title="Use Template"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </GlassCard>
  );
}
