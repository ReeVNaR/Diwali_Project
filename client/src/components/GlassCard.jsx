import React from 'react';

export default function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-liquid border border-white/10 bg-white/[0.05]
        backdrop-blur-glass shadow-glass transition-all duration-300
        ${hoverEffect ? 'hover:border-festive-gold/40 hover:bg-white/[0.08] hover:shadow-glass-hover hover:-translate-y-0.5' : ''}
        ${glow ? 'shadow-gold-glow border-festive-gold/30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Subtle top edge specular highlight for Apple Liquid Glass realism */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
