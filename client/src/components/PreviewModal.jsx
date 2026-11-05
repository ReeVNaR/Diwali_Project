import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Palette, Smartphone, Camera, MessageCircle, Heart, Share2, Bookmark } from 'lucide-react';

export default function PreviewModal({ template, isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('instagram'); // 'instagram' | 'story' | 'whatsapp'

  if (!isOpen || !template) return null;

  const colors = template.colors || {
    primary: '#F5B942',
    bgStart: '#080d1e',
    text: '#FFFFFF',
    border: 'rgba(245, 185, 66, 0.4)',
    badgeBg: '#D97706'
  };

  const fields = template.editableFields || {};

  const handleOpenStudio = () => {
    onClose();
    navigate(`/editor?templateId=${template.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
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

              {/* Creative Artwork Container */}
              <div
                className="relative aspect-square w-full p-6 flex flex-col justify-between overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${colors.primary}20 0%, ${colors.bgStart} 80%)`,
                  backgroundColor: colors.bgStart
                }}
              >
                <div className="absolute inset-4 rounded-xl border pointer-events-none" style={{ borderColor: colors.border }} />

                <div className="relative z-10 text-center space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-festive-gold">
                    {fields.brandName || 'YOUR BRAND'}
                  </p>
                  <h3 className="font-serif font-black text-xl text-white">
                    {fields.headline || template.name}
                  </h3>
                  <p className="text-xs text-white/70">
                    {fields.subheadline}
                  </p>
                </div>

                <div className="relative z-10 text-center my-auto py-4">
                  {fields.discount && (
                    <span
                      className="inline-block text-xs font-black px-4 py-1.5 rounded-full text-white shadow-lg"
                      style={{ backgroundColor: colors.badgeBg }}
                    >
                      {fields.discount}
                    </span>
                  )}
                  <p className="text-sm font-bold text-festive-gold mt-2">
                    {fields.price}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] text-white/60 border-t border-white/10 pt-2">
                  <span>{fields.contact || 'Main Market Road'}</span>
                  <span className="font-bold text-festive-gold">{fields.cta || 'VISIT TODAY'}</span>
                </div>
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

              {/* Story Content Frame */}
              <div
                className="my-auto p-4 text-center rounded-2xl flex flex-col justify-center items-center h-[380px]"
                style={{
                  background: `linear-gradient(180deg, ${colors.primary}25 0%, ${colors.bgStart} 100%)`,
                  backgroundColor: colors.bgStart
                }}
              >
                <span className="text-xs uppercase font-bold text-festive-gold tracking-widest">
                  {fields.brandName || 'DIWALI SPECIAL'}
                </span>
                <h4 className="font-serif font-black text-lg text-white mt-2 leading-tight">
                  {fields.headline}
                </h4>
                <div className="my-4">
                  <span
                    className="text-[11px] font-black px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: colors.badgeBg }}
                  >
                    {fields.discount}
                  </span>
                </div>
                <p className="text-xs font-bold text-festive-gold">{fields.price}</p>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                  {fields.cta || 'SWIPE UP TO SHOP'}
                </div>
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
                <div
                  className="rounded-lg p-4 aspect-square flex flex-col justify-between text-center overflow-hidden"
                  style={{ backgroundColor: colors.bgStart }}
                >
                  <p className="text-[10px] font-bold text-festive-gold uppercase tracking-wider">
                    {fields.brandName}
                  </p>
                  <h4 className="font-serif font-bold text-sm text-white">
                    {fields.headline}
                  </h4>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                      {fields.discount}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/80">{fields.cta}</p>
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
