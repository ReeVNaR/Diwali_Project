import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  LayoutGrid,
  Palette,
  Download,
  UploadCloud,
  CheckCircle2,
  Store,
  Gem,
  UtensilsCrossed,
  Laptop,
  Building,
  Cake,
  HeartHandshake
} from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import { useTemplates } from '../hooks/useTemplates.js';
import TemplateCard from '../components/TemplateCard.jsx';
import PreviewModal from '../components/PreviewModal.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { templates, activePreviewTemplate, setActivePreview } = useTemplates();
  const featuredTemplates = templates.slice(0, 6);

  const businessCategories = [
    { name: 'Jewellery', count: '11+ Designs', icon: Gem, color: '#F5B942' },
    { name: 'Clothing & Fashion', count: '11+ Designs', icon: Store, color: '#FF7043' },
    { name: 'Sweets & Bakery', count: '10+ Designs', icon: Cake, color: '#E11D48' },
    { name: 'Electronics', count: '10+ Designs', icon: Laptop, color: '#38BDF8' },
    { name: 'Restaurants & Food', count: '10+ Designs', icon: UtensilsCrossed, color: '#10B981' },
    { name: 'Real Estate', count: '10+ Designs', icon: Building, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full ambient-glow-orange pointer-events-none -z-10 blur-2xl opacity-40" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-gold text-xs font-semibold tracking-wide">
              <Flame className="w-3.5 h-3.5 text-festive-gold animate-pulse" />
              <span>Diwali 2026 Marketing Suite • 100+ Pro Templates</span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Make Every Celebration a{' '}
              <span className="festive-gradient-text drop-shadow-sm">Brand Moment.</span>
            </h1>

            <p className="text-base sm:text-lg text-festive-textSecondary max-w-2xl font-light leading-relaxed">
              Create stunning Diwali advertisements for your business in minutes. Customize, personalize, and download professional creatives effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/editor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-liquid text-base font-bold text-[#080A12] bg-gradient-to-r from-festive-gold via-[#FDE68A] to-festive-orange shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-[#080A12]" />
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-liquid text-base font-semibold text-white bg-white/[0.06] border border-white/15 hover:bg-white/10 hover:border-festive-gold/40 transition-all duration-200 backdrop-blur-md"
              >
                <LayoutGrid className="w-4 h-4 text-festive-gold" />
                <span>Explore Templates</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-festive-textSecondary border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-festive-gold" />
                <span>100+ Handcrafted Diwali Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-festive-gold" />
                <span>Ultra HD 2K Export for Print & Social</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-festive-gold" />
                <span>No Graphic Design Skills Required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Liquid Glass Creative Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Primary Hero Advertisement Card */}
            <div className="relative w-full max-w-[380px] rounded-liquid-lg border border-festive-gold/40 bg-gradient-to-br from-[#1A0B2E] via-[#0D1124] to-[#05060A] p-6 shadow-2xl backdrop-blur-2xl animate-float">
              
              {/* Glass Specular Shine */}
              <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-festive-gold to-transparent" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-festive-gold" />
                  <span className="text-xs font-mono font-bold tracking-widest text-festive-gold uppercase">
                    ROYAL JEWELLERS
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-festive-gold/20 text-festive-gold border border-festive-gold/30">
                  DIWALI SPECIAL
                </span>
              </div>

              <div className="py-8 text-center space-y-3">
                <div className="inline-block p-3 rounded-full bg-festive-gold/10 border border-festive-gold/30 shadow-gold-glow">
                  <Sparkles className="w-8 h-8 text-festive-gold" />
                </div>
                <h3 className="font-serif font-black text-2xl text-white">
                  SHUBH DEEPAWALI MEGA FEST
                </h3>
                <p className="text-xs text-white/70">
                  Flat 50% Off on Making Charges of Gold & Diamond Ornaments
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-festive-orange text-white text-xs font-black shadow-lg">
                    LIMITED FESTIVE SLOTS
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-liquid-sm bg-white/[0.05] border border-white/10 flex items-center justify-between text-xs">
                <span className="text-festive-textSecondary">📞 +91 98765 43210</span>
                <span className="text-festive-gold font-bold">SHOP NOW</span>
              </div>
            </div>

            {/* Overlapping Floating Glass Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-liquid-sm border border-white/15 bg-[#111522]/90 backdrop-blur-xl p-3.5 shadow-glass flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">One-Click Export</p>
                <p className="text-[11px] text-festive-textSecondary">1080×1080 PNG & JPEG Ready</p>
              </div>
            </div>

            {/* Overlapping Floating Tag */}
            <div className="absolute -top-4 -right-4 rounded-liquid-sm border border-festive-gold/30 bg-black/80 backdrop-blur-xl p-3 shadow-glass flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-festive-gold" />
              <span className="text-xs font-semibold text-white">100+ Diwali Themes</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED TEMPLATES CAROUSEL/GRID */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-festive-gold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Trending Festive Creatives
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Handpicked Diwali Templates
            </h2>
            <p className="text-sm text-festive-textSecondary mt-1">
              Designed for high engagement on Instagram Feed, Stories, and WhatsApp broadcasts.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-festive-gold hover:text-white transition-colors group"
          >
            <span>View All 100+ Templates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

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
          <span className="text-xs font-semibold uppercase tracking-wider text-festive-gold">
            Effortless Workflow
          </span>
          <h2 className="font-serif font-bold text-3xl text-white">
            From Idea to Ad Creative in 3 Steps
          </h2>
          <p className="text-sm text-festive-textSecondary">
            Launch your festive advertising campaign in less than three minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Pick a Diwali Template',
              desc: 'Select from 100+ curated templates across 10 business categories like Jewellery, Fashion, Sweets, and Electronics.',
              icon: LayoutGrid,
              color: '#F5B942'
            },
            {
              step: '02',
              title: 'Personalize Brand & Offer',
              desc: 'Upload your shop logo, insert product photos, and customize headlines, discount percentages, and contact info in real time.',
              icon: Palette,
              color: '#FF7043'
            },
            {
              step: '03',
              title: 'Download & Publish',
              desc: 'Export crystal clear high-resolution PNG or JPEG creatives tailored for Instagram posts, stories, and WhatsApp status.',
              icon: Download,
              color: '#10B981'
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.step} className="p-8 relative space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-liquid-sm flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono font-black text-2xl text-white/15">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white">{item.title}</h3>
                <p className="text-sm text-festive-textSecondary leading-relaxed">{item.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. BUSINESS CATEGORIES SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-festive-gold">
            Tailored for Every Industry
          </span>
          <h2 className="font-serif font-bold text-3xl text-white">
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
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-xs text-white group-hover:text-festive-gold transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-festive-textSecondary mt-0.5">{cat.count}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-liquid-lg border border-festive-gold/30 bg-gradient-to-r from-[#121626] via-[#1B1424] to-[#0C0F1D] p-8 sm:p-14 overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full ambient-glow-gold pointer-events-none blur-3xl opacity-50" />

          <div className="inline-flex items-center gap-2 p-2 rounded-full bg-festive-gold/10 text-festive-gold text-xs font-semibold">
            <Flame className="w-4 h-4 text-festive-gold animate-bounce" />
            <span>Ready for the Festive Boom?</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-white max-w-3xl mx-auto leading-tight">
            Light Up Your Business Sales This Deepawali.
          </h2>

          <p className="text-sm sm:text-base text-festive-textSecondary max-w-xl mx-auto">
            Join thousands of shop owners, creators, and brands creating viral festive promotions with Festive Ad Studio.
          </p>

          <div className="pt-2">
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-liquid text-base font-bold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 text-[#080A12]" />
              <span>Launch Design Studio Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-festive-textSecondary">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-festive-gold" />
          <span className="font-serif font-bold text-white">Festive Ad Studio</span>
          <span>• © 2026 Festive Marketing Creative Suite. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/templates" className="hover:text-white transition-colors">100+ Templates</Link>
          <Link to="/editor" className="hover:text-white transition-colors">Canva Editor</Link>
          <Link to="/my-designs" className="hover:text-white transition-colors">My Projects</Link>
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
