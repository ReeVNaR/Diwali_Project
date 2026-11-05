import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Palette, Smartphone, Camera, MessageCircle, Heart, Share2, Bookmark } from 'lucide-react';

export default function PreviewModal({ template, isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('instagram'); // 'instagram' | 'story' | 'whatsapp'

  if (!isOpen || !template) return null;

  const w = template.width || 1080;
  const h = template.height || 1080;
  const isStory = h === 1920;
  const isPortrait = h === 1350;

  const colors = template.colors || {
    primary: '#F5B942',
    bgStart: '#080d1e',
    text: '#FFFFFF',
    border: 'rgba(245, 185, 66, 0.45)',
    badgeBg: '#D97706',
    tag: '#FDE68A'
  };

  const fields = template.editableFields || {};

  const handleOpenStudio = () => {
    onClose();
    navigate(`/editor?templateId=${template.id}`);
  };

  // Reusable SVG renderer that guarantees 100% proper fitting without going outside bounds
  const renderCreativeSvg = (targetW = w, targetH = h) => {
    const pad = 36;
    const isTargetStory = targetH === 1920;
    const isTargetPortrait = targetH === 1350;
    const frameTop = isTargetStory ? 140 : pad;
    const frameHeight = isTargetStory ? (targetH - 280) : (targetH - pad * 2);

    let ornamentY, brandY, headlineY, headlineSize, subY, subSize, badgeY, boxY, boxH, ctaY, footerY;

    if (isTargetStory) {
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
    } else if (isTargetPortrait) {
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
      // Square
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
      <svg
        viewBox={`0 0 ${targetW} ${targetH}`}
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={targetW} height={targetH} fill={colors.bgStart} />

        {/* Ambient Glow */}
        <circle
          cx={targetW * 0.5}
          cy={isTargetStory ? 600 : isTargetPortrait ? 480 : 380}
          r={targetW * 0.4}
          fill={colors.primary}
          opacity="0.12"
        />

        {/* Outer Frame */}
        <rect
          x={pad}
          y={frameTop}
          width={targetW - pad * 2}
          height={frameHeight}
          fill="none"
          stroke={colors.border}
          strokeWidth="3"
          rx="18"
        />
        <rect
          x={pad + 12}
          y={frameTop + 12}
          width={targetW - (pad * 2) - 24}
          height={frameHeight - 24}
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity="0.35"
          rx="14"
        />

        {/* Top Ornament */}
        <text x={targetW * 0.5} y={ornamentY} textAnchor="middle" fontSize="28" fill={colors.primary}>
          ✨  🪔  ✨
        </text>

        {/* Brand Name */}
        <text
          x={targetW * 0.5}
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

        {/* Headline */}
        <text
          x={targetW * 0.5}
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
          x={targetW * 0.5}
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
              x={targetW * 0.5 - 165}
              y={badgeY - 29}
              width="330"
              height="58"
              rx="29"
              fill={colors.badgeBg || '#D97706'}
              stroke={colors.primary}
              strokeWidth="2"
            />
            <text
              x={targetW * 0.5}
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

        {/* Center Box */}
        <rect
          x={130}
          y={boxY}
          width={targetW - 260}
          height={boxH}
          rx="18"
          fill="rgba(255, 255, 255, 0.04)"
          stroke="rgba(245, 185, 66, 0.4)"
          strokeWidth="1.5"
        />
        <text
          x={targetW * 0.5}
          y={boxY + boxH * 0.46}
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize={isTargetStory ? 34 : 28}
          fontWeight="700"
          fill={colors.primary}
        >
          {fields.price || 'Special Diwali Offer'}
        </text>
        <text
          x={targetW * 0.5}
          y={boxY + boxH * 0.72}
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontSize={isTargetStory ? 17 : 14}
          letterSpacing="2"
          fill="rgba(255, 255, 255, 0.45)"
        >
          ✦ CLICK TO INSERT PRODUCT PHOTO ✦
        </text>

        {/* CTA Button */}
        <rect
          x={targetW * 0.5 - 145}
          y={ctaY - 26}
          width="290"
          height="52"
          rx="26"
          fill={colors.primary}
        />
        <text
          x={targetW * 0.5}
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

        {/* Footer Contact */}
        <text
          x={targetW * 0.5}
          y={footerY}
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontSize="17"
          fill="#9CA3AF"
        >
          {fields.contact || '📞 +91 98765 43210  •  🌐 www.yourbrand.com'}
        </text>
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-liquid border border-white/15 bg-[#080A12] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">{template.name}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-festive-gold/20 text-festive-gold border border-festive-gold/30">
              {template.category}
            </span>
          </div>

          {/* Social Platform Toggle Tabs */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-liquid-sm bg-white/[0.06] border border-white/10">
            {[
              { id: 'instagram', label: 'Instagram Post', icon: Camera },
              { id: 'story', label: 'Story Mockup', icon: Smartphone },
              { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-liquid-sm text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-festive-gold text-[#080A12] font-semibold'
                      : 'text-festive-textSecondary hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenStudio}
              className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-liquid-sm text-xs font-bold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange hover:scale-105 transition-all"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Use This Template</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-liquid-sm text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mockup Preview Body */}
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-[#05060A]">
          
          {/* Instagram Post Mockup */}
          {activeTab === 'instagram' && (
            <div className="w-full max-w-[420px] rounded-xl border border-white/10 bg-[#121624] overflow-hidden shadow-2xl">
              {/* Instagram Profile Header */}
              <div className="p-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-festive-gold to-festive-orange p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-[#121624] flex items-center justify-center text-[11px] font-bold text-festive-gold">
                      YA
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">your_brand_official</p>
                    <p className="text-[10px] text-festive-textSecondary">Sponsored • Diwali Offer</p>
                  </div>
                </div>
                <span className="text-white/40 text-xs font-bold">•••</span>
              </div>

              {/* Creative Artwork Container (Scaled perfectly) */}
              <div className={`relative w-full ${isPortrait ? 'aspect-[4/5]' : 'aspect-square'} overflow-hidden`}>
                {renderCreativeSvg(w, isPortrait ? 1350 : 1080)}
              </div>

              {/* Instagram Engagement Bar */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500 cursor-pointer" />
                    <MessageCircle className="w-5 h-5 cursor-pointer text-white/80" />
                    <Share2 className="w-5 h-5 cursor-pointer text-white/80" />
                  </div>
                  <Bookmark className="w-5 h-5 text-white/80 cursor-pointer" />
                </div>
                <p className="text-xs font-semibold text-white">1,420 likes</p>
                <p className="text-xs text-white/90">
                  <span className="font-bold mr-1">your_brand_official</span>
                  Celebrate this Diwali in grand royal style! 🪔✨ Flat festival discounts valid till Diwali night.
                </p>
              </div>
            </div>
          )}

          {/* Smartphone Story Mockup */}
          {activeTab === 'story' && (
            <div className="w-[300px] h-[550px] rounded-[36px] border-[6px] border-[#2A2E3D] bg-black p-3 relative flex flex-col justify-between shadow-2xl overflow-hidden">
              {/* Top phone camera pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#2A2E3D] rounded-full z-20" />

              {/* Story Progress Bar */}
              <div className="relative z-10 pt-3 flex items-center gap-1">
                <div className="h-1 flex-1 bg-white rounded-full" />
                <div className="h-1 flex-1 bg-white/30 rounded-full" />
              </div>

              {/* Story User Header */}
              <div className="relative z-10 flex items-center gap-2 pt-2">
                <div className="w-7 h-7 rounded-full bg-festive-gold flex items-center justify-center text-[10px] font-bold text-black">
                  YB
                </div>
                <span className="text-xs font-bold text-white">your_brand</span>
                <span className="text-[10px] text-white/50">2h</span>
              </div>

              {/* Story Content Frame (Scaled perfectly to 1080x1920) */}
              <div className="my-auto w-full aspect-[9/16] max-h-[420px] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                {renderCreativeSvg(1080, 1920)}
              </div>

              {/* Story Reply Pill */}
              <div className="relative z-10 pb-1">
                <div className="w-full py-2 px-3 rounded-full border border-white/20 bg-white/10 text-white/60 text-xs">
                  Send message...
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Chat Post Mockup */}
          {activeTab === 'whatsapp' && (
            <div className="w-full max-w-[420px] rounded-xl border border-white/10 bg-[#0B141A] p-4 shadow-2xl space-y-3 font-sans">
              <div className="flex items-center gap-2 text-white/80 pb-2 border-b border-white/5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">
                  WA
                </div>
                <div>
                  <p className="text-xs font-bold text-white">VIP Customers Broadcast</p>
                  <p className="text-[10px] text-emerald-400">Online</p>
                </div>
              </div>

              <div className="ml-auto max-w-[340px] rounded-xl bg-[#005C4B] p-2 text-white shadow-md space-y-2">
                <div className="rounded-lg aspect-square w-full overflow-hidden border border-white/10 shadow">
                  {renderCreativeSvg(1080, 1080)}
                </div>
                <p className="text-xs text-white/90 px-1">
                  Dear Patron, wishing you a Shubh Deepawali! Click below to claim your festive voucher.
                </p>
                <div className="text-[10px] text-white/50 text-right pr-1">
                  11:45 AM • ✓✓
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
