import React from 'react';
import { Flame } from 'lucide-react';

export default function LoadingScreen({ message = 'Loading Festive Ad Studio...' }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-festive-gold/30 blur-xl animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-[#111522] border border-festive-gold/40 flex items-center justify-center shadow-gold-glow">
          <Flame className="w-8 h-8 text-festive-gold animate-bounce" />
        </div>
      </div>
      <p className="text-sm font-medium text-festive-textSecondary tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}
