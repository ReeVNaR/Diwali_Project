import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, LayoutGrid } from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <GlassCard className="max-w-md w-full p-8 text-center space-y-6">
        <div className="text-6xl font-serif font-black festive-gradient-text">
          404
        </div>
        <div className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-white">Creative Not Found</h2>
          <p className="text-xs text-festive-textSecondary">
            The festive creative or page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-liquid text-xs font-semibold text-[#080A12] bg-festive-gold shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-liquid text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-festive-gold" />
            <span>Templates</span>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
