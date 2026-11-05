import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  LayoutGrid,
  Palette,
  Download,
  CheckCircle2,
  Store,
  Gem,
  UtensilsCrossed,
  Laptop,
  Building,
  Cake
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
    { name: 'Jewellery', count: '11+ Designs', icon: Gem, color: '#D97706' },
    { name: 'Clothing & Fashion', count: '11+ Designs', icon: Store, color: '#EA580C' },
    { name: 'Sweets & Bakery', count: '10+ Designs', icon: Cake, color: '#E11D48' },
    { name: 'Electronics', count: '10+ Designs', icon: Laptop, color: '#0284C7' },
    { name: 'Restaurants & Food', count: '10+ Designs', icon: UtensilsCrossed, color: '#059669' },
    { name: 'Real Estate', count: '10+ Designs', icon: Building, color: '#D97706' },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION (LUMINOUS APPLE LIQUID GLASS) */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Radiant Ambient Luminous Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-75" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full ambient-glow-orange pointer-events-none -z-10 blur-2xl opacity-50" />
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full ambient-glow-rose pointer-events-none -z-10 blur-3xl opacity-40" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold tracking-wide shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Apple Liquid Glass UI • 100+ Diwali Templates</span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] tracking-tight leading-[1.12]">
              Make Every Celebration a{' '}
              <span className="festive-gradient-text drop-shadow-sm">Brand Moment.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] max-w-2xl font-normal leading-relaxed">
              Create stunning Diwali advertisements for your business in minutes. Customize, personalize, and download professional creatives effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/editor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-liquid text-base font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-liquid text-base font-bold text-[#0F172A] bg-white/80 border border-white/90 hover:bg-white hover:border-amber-500/40 shadow-glass transition-all duration-200 backdrop-blur-md"
              >
                <LayoutGrid className="w-4 h-4 text-amber-600" />
                <span>Explore Templates</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#475569] font-medium border-t border-black/5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100+ Handcrafted Diwali Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ultra HD 2K Export for Print & Social</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Graphic Design Skills Required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Liquid Glass Creative Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Primary Hero Advertisement Card (Liquid Glass Pane) */}
            <div className="relative w-full max-w-[380px] rounded-liquid-lg border border-white/95 bg-white/75 backdrop-blur-glass p-6 shadow-glass-elevated animate-float">
              
              {/* Glass Top Edge Reflection */}
              <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              <div className="flex items-center justify-between pb-4 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase">
                    ROYAL JEWELLERS
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30">
                  DIWALI SPECIAL
                </span>
              </div>

              <div className="py-7 text-center space-y-3">
                <div className="inline-block p-3 rounded-full bg-amber-500/15 border border-amber-500/30 shadow-xs">
                  <Sparkles className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-serif font-black text-2xl text-[#0F172A] leading-tight">
                  SHUBH DEEPAWALI MEGA FEST
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  Flat 50% Off on Making Charges of Gold & Diamond Ornaments
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black shadow-md">
                    LIMITED FESTIVE SLOTS
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-liquid-sm bg-white/80 border border-white flex items-center justify-between text-xs shadow-xs">
                <span className="text-[#64748B] font-medium">📞 +91 98765 43210</span>
                <span className="text-amber-700 font-bold">SHOP NOW</span>
              </div>
            </div>

            {/* Overlapping Floating Glass Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-liquid-sm border border-white/90 bg-white/85 backdrop-blur-glass p-3.5 shadow-glass-hover flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-500/15 text-emerald-700">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">One-Click Export</p>
                <p className="text-[11px] text-[#64748B]">1080×1080 PNG & JPEG Ready</p>
              </div>
            </div>

            {/* Overlapping Floating Tag */}
            <div className="absolute -top-4 -right-4 rounded-liquid-sm border border-amber-500/30 bg-white/90 backdrop-blur-glass p-3 shadow-glass flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-[#0F172A]">100+ Diwali Themes</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED TEMPLATES SECTION */}
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
              Designed for high engagement on Instagram Feed, Stories, and WhatsApp broadcasts.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
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
            Launch your festive marketing campaign in less than three minutes.
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
              desc: 'Export crystal clear high-resolution PNG or JPEG creatives tailored for Instagram posts, stories, and WhatsApp status.',
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
