import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Palette, FolderHeart } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();

  // Don't show public bottom nav on editor page (editor has its own studio toolbar)
  if (location.pathname.startsWith('/editor')) {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Templates', path: '/templates', icon: LayoutGrid },
    { name: 'Studio', path: '/editor', icon: Palette, isHighlight: true },
    { name: 'My Designs', path: '/my-designs', icon: FolderHeart },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/templates' && location.pathname.startsWith('/templates')) return true;
    if (path === '/my-designs' && location.pathname === '/my-designs') return true;
    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-3 inset-x-4 z-40">
      <div className="rounded-liquid-lg border border-white/90 bg-white/85 backdrop-blur-2xl shadow-glass-elevated p-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          if (item.isHighlight) {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center px-3 py-1.5 rounded-liquid text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 shadow-gold-glow active:scale-95 transition-all"
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.name}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex flex-col items-center justify-center py-1.5 px-3 rounded-liquid-sm text-[10px] font-bold transition-all
                ${active
                  ? 'text-amber-700 bg-amber-500/15'
                  : 'text-[#64748B] hover:text-[#0F172A]'
                }
              `}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${active ? 'text-amber-600' : 'text-[#64748B]'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
