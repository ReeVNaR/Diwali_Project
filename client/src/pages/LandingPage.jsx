import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Flame,
  LayoutGrid,
  Palette,
  Download,
  Store,
  Gem,
  UtensilsCrossed,
  Laptop,
  Building,
  Cake,
  Sliders,
  Type,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import { useTemplates } from '../hooks/useTemplates.js';
import TemplateCard from '../components/TemplateCard.jsx';
import PreviewModal from '../components/PreviewModal.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { templates, activePreviewTemplate, setActivePreview } = useTemplates();
  const featuredTemplates = templates.slice(0, 6);

  // Interactive Live Hero Studio State
  const [activeFormat, setActiveFormat] = useState('square'); // 'square' | 'portrait' | 'story'
  const [activePreset, setActivePreset] = useState(0);

  const heroPresets = [
    {
      brand: 'ROYAL JEWELLERS',
      tag: 'SHUBH DEEPAWALI COLLECTION',
      headline: 'DHANTERAS & DIWALI FEST',
      sub: 'Flat 50% Off on Gold & Diamond Making Charges',
      discount: 'UP TO 50% OFF',
      offer: '✦ FREE GOLD COIN WITH PURCHASES OVER ₹50,000 ✦',
      cta: 'EXPLORE JEWELLERY',
      contact: '📞 +91 98765 43210  •  📍 MG Road, Bengaluru',
      accentColor: '#F5B942',
      bgGrad: 'from-[#170E03] via-[#0E0A08] to-[#050406]'
    },
    {
      brand: 'VIVA LUXURY ETHNICS',
      tag: 'FESTIVE DESIGNER WEAR',
      headline: 'DIWALI DHAMAKA SAREE SALE',
      sub: 'Exclusive Pure Silk Sarees, Lehengas & Kurtas',
      discount: 'BUY 1 GET 1 FREE',
      offer: '✦ HANDCRAFTED BANARASI & KANJIVARAM SILKS ✦',
      cta: 'SHOP FESTIVE LOOKS',
      contact: '📞 +91 91234 56789  •  🌐 www.vivaluxury.in',
      accentColor: '#FB923C',
      bgGrad: 'from-[#1A0B10] via-[#0F080C] to-[#060408]'
    },
    {
      brand: 'ANAND SWEETS & DRY FRUITS',
      tag: 'PURE DESI GHEE DELICACIES',
      headline: 'PREMIUM DIWALI GIFT HAMPERS',
      sub: 'Kaju Katli, Motichoor Laddoos & Royal Dry Fruit Boxes',
      discount: 'FLAT 25% OFF',
      offer: '✦ CORPORATE & BULK GIFTING PRE-ORDERS OPEN ✦',
      cta: 'ORDER FRESH SWEETS',
      contact: '📞 +91 99887 66554  •  🛵 Express City Delivery',
      accentColor: '#EAB308',
      bgGrad: 'from-[#1A1303] via-[#0D0B05] to-[#040404]'
    }
  ];

  const currentPreset = heroPresets[activePreset];

  const businessCategories = [
    { name: 'Jewellery', count: '11+ Designs', icon: Gem, color: '#D97706' },
    { name: 'Clothing & Fashion', count: '11+ Designs', icon: Store, color: '#EA580C' },
    { name: 'Sweets & Bakery', count: '10+ Designs', icon: Cake, color: '#E11D48' },
    { name: 'Electronics', count: '10+ Designs', icon: Laptop, color: '#0284C7' },
    { name: 'Restaurants & Food', count: '10+ Designs', icon: UtensilsCrossed, color: '#059669' },
    { name: 'Real Estate', count: '10+ Designs', icon: Building, color: '#D97706' },
  ];

  return (
    <div className="space-y-24 pb-20 relative overflow-hidden">
      
      {/* Dynamic Animated Ambient Background Orbs */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-70"
      />
      <motion.div
        animate={{
          x: [15, -15, 15],
          y: [20, -20, 20],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full ambient-glow-orange pointer-events-none -z-10 blur-3xl opacity-50"
      />
      <motion.div
        animate={{
          x: [-15, 15, -15],
          y: [10, -10, 10],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-10 w-[450px] h-[450px] rounded-full ambient-glow-rose pointer-events-none -z-10 blur-3xl opacity-40"
      />

      {/* 1. SEAMLESS HERO SECTION (LUMINOUS APPLE LIQUID GLASS) */}
      <section className="relative pt-8 md:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Clean, Spacious Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Minimalist Top Frosted Glass Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-amber-500/30 text-amber-800 text-xs font-bold tracking-wide shadow-xs backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Apple Liquid Glass UI • 100+ Diwali Ad Templates</span>
            </div>

            {/* Main Headline with generous line-height */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] tracking-tight leading-[1.12]">
              Make Every Celebration a{' '}
              <span className="festive-gradient-text drop-shadow-xs">Brand Moment.</span>
            </h1>

            {/* Refined Subheading */}
            <p className="text-base sm:text-lg text-[#475569] max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              Create stunning Diwali advertisements for your business in minutes. Customize typography, upload your brand logo, and download ultra-HD creatives for Instagram and WhatsApp effortlessly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                to="/editor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-liquid text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Start Creating Free</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                to="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-liquid text-sm font-bold text-[#0F172A] bg-white/80 border border-white/95 hover:bg-white hover:border-amber-500/40 shadow-glass transition-all duration-200 backdrop-blur-md"
              >
                <LayoutGrid className="w-4 h-4 text-amber-600" />
                <span>Explore 100+ Templates</span>
              </Link>
            </div>

            {/* Seamless Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#64748B] font-medium border-t border-black/5">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                100+ Commercial Designs
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                2K Ultra-HD Export
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Zero Design Skills Needed
              </span>
            </div>
          </motion.div>

          {/* Right Column: Seamless Floating Liquid Glass Studio Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
          >
            {/* The Seamless Studio Device / Canvas Frame */}
            <div className="w-full max-w-[480px] rounded-liquid-lg border border-white/95 bg-white/80 backdrop-blur-glass shadow-glass-elevated overflow-hidden transition-all duration-500">
              
              {/* Studio Window Header Bar */}
              <div className="px-4 py-3 bg-white/90 border-b border-black/5 flex items-center justify-between">
                {/* macOS traffic light controls */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                {/* Interactive Format Switcher Segmented Pills */}
                <div className="flex items-center gap-1 p-0.5 rounded-full bg-black/5 border border-black/5">
                  <button
                    onClick={() => setActiveFormat('square')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      activeFormat === 'square'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    1:1 Square
                  </button>
                  <button
                    onClick={() => setActiveFormat('portrait')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      activeFormat === 'portrait'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    4:5 Portrait
                  </button>
                  <button
                    onClick={() => setActiveFormat('story')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      activeFormat === 'story'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    9:16 Story
                  </button>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live Studio</span>
                </div>
              </div>

              {/* Dynamic Preset Picker Pills */}
              <div className="px-3.5 py-2 bg-white/50 border-b border-black/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider pl-1">
                  Preset:
                </span>
                {heroPresets.map((preset, idx) => (
                  <button
                    key={preset.brand}
                    onClick={() => setActivePreset(idx)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
                      activePreset === idx
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white/70 text-[#64748B] hover:text-[#0F172A] border border-black/5'
                    }`}
                  >
                    {preset.brand.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Seamless Creative Canvas Viewport */}
              <div className="p-4 bg-gradient-to-b from-[#0F172A] to-[#080D1A] flex items-center justify-center min-h-[360px] relative overflow-hidden">
                
                {/* Ambient backlight */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${currentPreset.accentColor} 0%, transparent 65%)`
                  }}
                />

                {/* The Responsive Creative Canvas */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeFormat}-${activePreset}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      relative rounded-liquid-sm border-2 border-amber-500/40 p-5 shadow-2xl flex flex-col justify-between text-center select-none bg-gradient-to-b ${currentPreset.bgGrad}
                      ${activeFormat === 'story' ? 'w-[220px] h-[340px]' : activeFormat === 'portrait' ? 'w-[270px] h-[340px]' : 'w-[290px] h-[290px]'}
                    `}
                  >
                    {/* Inner gold border */}
                    <div className="absolute inset-1.5 border border-dashed border-amber-400/30 rounded-xs pointer-events-none" />

                    {/* Top Ornament & Brand */}
                    <div className="space-y-1 relative z-10">
                      <p className="text-amber-400 text-sm">✨ 🪔 ✨</p>
                      <p className="text-[10px] font-mono font-bold tracking-widest text-amber-300 uppercase">
                        {currentPreset.brand}
                      </p>
                      <p className="text-[9px] font-bold text-amber-200/80 tracking-wider">
                        {currentPreset.tag}
                      </p>
                    </div>

                    {/* Center Headline & Discount Badge */}
                    <div className="space-y-2 py-1 relative z-10">
                      <h3 className="font-serif font-black text-white text-base sm:text-lg leading-tight drop-shadow-sm">
                        {currentPreset.headline}
                      </h3>
                      <p className="text-[10px] text-zinc-300 leading-snug">
                        {currentPreset.sub}
                      </p>
                      <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black shadow-md tracking-wider">
                        {currentPreset.discount}
                      </div>
                    </div>

                    {/* Offer box & CTA */}
                    <div className="space-y-1.5 relative z-10">
                      <div className="py-1 px-2 rounded bg-white/5 border border-amber-500/30 text-[9px] font-mono text-amber-300">
                        {currentPreset.offer}
                      </div>
                      <div className="py-1.5 rounded-liquid-sm bg-amber-500 text-black font-bold text-[10px] tracking-wider shadow">
                        {currentPreset.cta}
                      </div>
                      <p className="text-[8px] text-zinc-400 font-medium">
                        {currentPreset.contact}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Seamless Studio Quick Tools Dock */}
              <div className="px-4 py-3 bg-white/80 border-t border-black/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-[#475569] font-medium text-[11px]">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> Logo
                  </span>
                  <span className="flex items-center gap-1">
                    <Type className="w-3.5 h-3.5 text-amber-600" /> Fonts
                  </span>
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-amber-600" /> Colors
                  </span>
                </div>

                <Link
                  to="/editor"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-liquid-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[11px] shadow-xs hover:scale-105 transition-all"
                >
                  <Palette className="w-3 h-3" />
                  <span>Open Studio</span>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. FEATURED TEMPLATES SECTION (PERFECTLY SIZED CARDS, ZERO RANDOM SPACING) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Trending Festive Creatives
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#0F172A]">
              Handpicked Diwali Templates
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Optimized for high engagement on Instagram Feed, Stories, and WhatsApp status broadcasts.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors group"
          >
            <span>View All 100+ Templates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Uniform Grid - Cards Have Equal Height With Zero Irregular Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={(tpl) => setActivePreview(tpl)}
            />
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Effortless Workflow
          </span>
          <h2 className="font-serif font-black text-3xl text-[#0F172A]">
            From Idea to Ad Creative in 3 Steps
          </h2>
          <p className="text-sm text-[#64748B]">
            Launch your high-impact festive marketing campaign in less than three minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Pick a Diwali Template',
              desc: 'Select from 100+ curated templates across 10 business categories like Jewellery, Fashion, Sweets, and Electronics.',
              icon: LayoutGrid,
              color: '#D97706'
            },
            {
              step: '02',
              title: 'Personalize Brand & Offer',
              desc: 'Upload your shop logo, insert product photos, and customize headlines, discount percentages, and contact info in real time.',
              icon: Palette,
              color: '#EA580C'
            },
            {
              step: '03',
              title: 'Download & Publish',
              desc: 'Export crystal clear ultra-high-resolution PNG or JPEG creatives tailored for Instagram posts, stories, and WhatsApp status.',
              icon: Download,
              color: '#059669'
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.step} className="p-8 relative space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-liquid-sm flex items-center justify-center border border-black/5 shadow-xs"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono font-black text-2xl text-black/15">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif font-black text-lg text-[#0F172A]">{item.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. BUSINESS CATEGORIES SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Tailored for Every Industry
          </span>
          <h2 className="font-serif font-black text-3xl text-[#0F172A]">
            Diwali Marketing for Your Business
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {businessCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <GlassCard
                key={cat.name}
                onClick={() => navigate(`/templates?category=${encodeURIComponent(cat.name)}`)}
                className="p-5 text-center flex flex-col items-center justify-center space-y-3 cursor-pointer group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A] group-hover:text-amber-700 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-[#64748B] mt-0.5 font-medium">{cat.count}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-liquid-lg border border-white/90 bg-gradient-to-r from-white/90 via-[#FFF8F0]/90 to-white/90 p-8 sm:p-14 overflow-hidden text-center space-y-6 shadow-glass-elevated">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full ambient-glow-gold pointer-events-none blur-3xl opacity-60" />

          <div className="inline-flex items-center gap-2 p-2 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>Ready for the Festive Boom?</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] max-w-3xl mx-auto leading-tight">
            Light Up Your Business Sales This Deepawali.
          </h2>

          <p className="text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
            Join thousands of shop owners, creators, and brands creating viral festive promotions with Festive Ad Studio.
          </p>

          <div className="pt-2">
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-liquid text-base font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>Launch Design Studio Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-600" />
          <span className="font-serif font-black text-[#0F172A]">Festive Ad Studio</span>
          <span>• © 2026 Liquid Glass Diwali Creative Suite.</span>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <Link to="/templates" className="hover:text-[#0F172A] transition-colors">100+ Templates</Link>
          <Link to="/editor" className="hover:text-[#0F172A] transition-colors">Canva Editor</Link>
          <Link to="/my-designs" className="hover:text-[#0F172A] transition-colors">My Projects</Link>
        </div>
      </footer>

      {/* Preview Modal */}
      <PreviewModal
        template={activePreviewTemplate}
        isOpen={!!activePreviewTemplate}
        onClose={() => setActivePreview(null)}
      />
    </div>
  );
}
