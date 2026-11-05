import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, Palette, ArrowUpRight } from 'lucide-react';
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

  const w = template.width || 1080;
  const h = template.height || 1080;
  const isStory = h === 1920;
  const isPortrait = h === 1350;

  // Exact aspect ratio class based on format
  const getAspectRatioClass = () => {
    if (isStory) return 'aspect-[9/16]';
    if (isPortrait) return 'aspect-[4/5]';
    return 'aspect-square';
  };

  const colors = template.colors || {
    bgStart: '#080d1e',
    primary: '#F5B942',
    secondary: '#FF7043',
    accent: '#FFF176',
    border: 'rgba(245, 185, 66, 0.45)',
    badgeBg: '#D97706',
    text: '#FFFFFF',
    tag: '#FDE68A'
  };

  const fields = template.editableFields || {};

  // Precise coordinate mapping for SVG preview
  let ornamentY, brandY, headlineY, headlineSize, subY, subSize, badgeY, boxY, boxH, ctaY, footerY;
  const pad = 36;
  const frameTop = isStory ? 140 : pad;
  const frameHeight = isStory ? (h - 280) : (h - pad * 2);

  if (isStory) {
    ornamentY = 240;
    brandY = 330;
    headlineY = 480;
    headlineSize = 52;
    subY = 610;
    subSize = 26;
    badgeY = 740;
    boxY = 1050;
    boxH = 430;
    ctaY = 1450;
    footerY = 1620;
  } else if (isPortrait) {
    ornamentY = 110;
    brandY = 175;
    headlineY = 300;
    headlineSize = 46;
    subY = 410;
    subSize = 23;
    badgeY = 510;
    boxY = 730;
    boxH = 280;
    ctaY = 1010;
    footerY = 1180;
  } else {
    // 1080 x 1080 Square
    ornamentY = 95;
    brandY = 150;
    headlineY = 250;
    headlineSize = 42;
    subY = 345;
    subSize = 21;
    badgeY = 430;
    boxY = 605;
    boxH = 210;
    ctaY = 825;
    footerY = 940;
  }

  return (
    <GlassCard
      className="group overflow-hidden flex flex-col transition-all duration-300"
      hoverEffect={true}
    >
      {/* Visual Creative Canvas Preview (Vector SVG Scaled to Exact Image Bounds) */}
      <div className={`relative w-full ${getAspectRatioClass()} overflow-hidden bg-[#080d1e] select-none rounded-t-liquid`}>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id={`glow-${template.id}`} cx="50%" cy="35%" r="45%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.18" />
              <stop offset="100%" stopColor={colors.bgStart} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background rect */}
          <rect width={w} height={h} fill={colors.bgStart} />

          {/* Ambient Glow */}
          <circle cx={w * 0.5} cy={isStory ? 600 : isPortrait ? 480 : 380} r={w * 0.4} fill={`url(#glow-${template.id})`} />

          {/* Double Ornate Festive Border */}
          <rect
            x={pad}
            y={frameTop}
            width={w - pad * 2}
            height={frameHeight}
            fill="none"
            stroke={colors.border}
            strokeWidth="3"
            rx="18"
          />
          <rect
            x={pad + 12}
            y={frameTop + 12}
            width={w - (pad * 2) - 24}
            height={frameHeight - 24}
            fill="none"
            stroke={colors.primary}
            strokeWidth="1.5"
            strokeDasharray="8 6"
            opacity="0.35"
            rx="14"
          />

          {/* Top Diya / Flame Icon */}
          <text
            x={w * 0.5}
            y={ornamentY}
            textAnchor="middle"
            fontSize="28"
            fill={colors.primary}
          >
            ✨  🪔  ✨
          </text>

          {/* Brand Name */}
          <text
            x={w * 0.5}
            y={brandY}
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
            fontSize="20"
            fontWeight="700"
            letterSpacing="5"
            fill={colors.tag || '#FDE68A'}
          >
            {fields.brandName || 'YOUR BRAND NAME'}
          </text>

          {/* Main Headline */}
          <text
            x={w * 0.5}
            y={headlineY}
            textAnchor="middle"
            fontFamily="Playfair Display, serif"
            fontSize={headlineSize}
            fontWeight="800"
            fill={colors.text || '#FFFFFF'}
          >
            {(fields.headline || template.name).toUpperCase()}
          </text>

          {/* Subtitle */}
          <text
            x={w * 0.5}
            y={subY}
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontSize={subSize}
            fill="#D1D5DB"
          >
            {fields.subheadline || 'Festive Special Collection'}
          </text>

          {/* Discount Badge */}
          {fields.discount && (
            <g>
              <rect
                x={w * 0.5 - 165}
                y={badgeY - 29}
                width="330"
                height="58"
                rx="29"
                fill={colors.badgeBg || '#D97706'}
                stroke={colors.primary}
                strokeWidth="2"
              />
              <text
                x={w * 0.5}
                y={badgeY + 8}
                textAnchor="middle"
                fontFamily="Montserrat, sans-serif"
                fontSize="24"
                fontWeight="800"
                letterSpacing="1.5"
                fill="#FFFFFF"
              >
                {fields.discount}
              </text>
            </g>
          )}

          {/* Product Placeholder Box */}
          <rect
            x={130}
            y={boxY}
            width={w - 260}
            height={boxH}
            rx="18"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(245, 185, 66, 0.4)"
            strokeWidth="1.5"
          />
          <text
            x={w * 0.5}
            y={boxY + boxH * 0.46}
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontSize={isStory ? 34 : 28}
            fontWeight="700"
            fill={colors.primary}
          >
            {fields.price || 'Special Diwali Offer'}
          </text>
          <text
            x={w * 0.5}
            y={boxY + boxH * 0.72}
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontSize={isStory ? 17 : 14}
            letterSpacing="2"
            fill="rgba(255, 255, 255, 0.45)"
          >
            ✦ CLICK TO INSERT PRODUCT PHOTO ✦
          </text>

          {/* CTA Button */}
          <rect
            x={w * 0.5 - 145}
            y={ctaY - 26}
            width="290"
            height="52"
            rx="26"
            fill={colors.primary}
          />
          <text
            x={w * 0.5}
            y={ctaY + 8}
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="2.5"
            fill="#080A12"
          >
            {fields.cta || 'SHOP NOW'}
          </text>

          {/* Footer Contact Info */}
          <text
            x={w * 0.5}
            y={footerY}
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontSize="17"
            fill="#9CA3AF"
          >
            {fields.contact || '📞 +91 98765 43210  •  🌐 www.yourbrand.com'}
          </text>
        </svg>

        {/* Top Badges (Overlay) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-bold border border-white/20 shadow">
            {w} × {h}
          </span>
          {template.isPopular && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow">
              <Sparkles className="w-2.5 h-2.5" /> Popular
            </span>
          )}
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={handleUseTemplate}
            className="w-full max-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-liquid text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-200"
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
              className="w-full max-w-[200px] flex items-center justify-center gap-2 py-2 px-4 rounded-liquid text-xs font-semibold text-[#0F172A] bg-white/95 border border-white hover:bg-white shadow-md transition-all duration-200"
            >
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Full Preview</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Info Footer (Liquid Glass) */}
      <div className="p-3.5 flex items-center justify-between bg-white/70 border-t border-black/5">
        <div className="min-w-0 pr-2">
          <h3 className="font-bold text-sm text-[#0F172A] truncate group-hover:text-amber-600 transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-medium text-[#64748B]">{template.category}</span>
            <span className="text-black/20">•</span>
            <span className="text-[11px] font-semibold text-amber-700">{template.format}</span>
          </div>
        </div>

        <button
          onClick={handleUseTemplate}
          className="p-2 rounded-liquid-sm text-amber-700 bg-amber-500/15 hover:bg-amber-500 hover:text-white transition-colors shrink-0 shadow-xs"
          title="Use Template"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </GlassCard>
  );
}
