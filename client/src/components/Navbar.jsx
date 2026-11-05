import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutGrid, Palette, FolderHeart, Menu, X, Flame } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Templates', path: '/templates', icon: LayoutGrid },
    { name: 'Studio Editor', path: '/editor', icon: Palette },
    { name: 'My Designs', path: '/my-designs', icon: FolderHeart },
  ];

  const isActive = (path) => {
    if (path === '/templates' && location.pathname.startsWith('/templates')) return true;
    if (path === '/editor' && location.pathname.startsWith('/editor')) return true;
    if (path === '/my-designs' && location.pathname === '/my-designs') return true;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
      <div className="rounded-liquid-lg border border-white/10 bg-[#080A12]/80 backdrop-blur-glass shadow-glass px-5 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-liquid-sm bg-gradient-to-br from-festive-gold via-festive-orange to-festive-crimson p-[1px] shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full bg-[#080A12] rounded-liquid-sm flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <Flame className="w-5 h-5 text-festive-gold group-hover:text-[#080A12] transition-colors duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg tracking-wide text-white group-hover:text-festive-gold transition-colors">
                Festive Ad Studio
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-festive-gold/20 text-festive-gold border border-festive-gold/30">
                Diwali
              </span>
            </div>
            <p className="text-[11px] text-festive-textSecondary tracking-wider">MARKETING CREATIVE SUITE</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-liquid-sm text-sm font-medium transition-all duration-200
                  ${active 
                    ? 'bg-white/10 text-festive-gold shadow-sm border border-festive-gold/30' 
                    : 'text-festive-textSecondary hover:text-white hover:bg-white/[0.05]'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-festive-gold' : 'text-festive-textSecondary'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/editor"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-liquid text-sm font-semibold text-[#080A12] bg-gradient-to-r from-festive-gold via-[#FDE68A] to-festive-orange shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Design</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-liquid-sm text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-liquid-lg border border-white/10 bg-[#080A12]/95 backdrop-blur-glass shadow-glass flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-liquid-sm text-sm font-medium
                  ${active ? 'bg-white/10 text-festive-gold' : 'text-festive-textSecondary hover:text-white hover:bg-white/[0.05]'}
                `}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10 mt-1">
            <Link
              to="/editor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-liquid text-sm font-semibold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange shadow-gold-glow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Creating</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
