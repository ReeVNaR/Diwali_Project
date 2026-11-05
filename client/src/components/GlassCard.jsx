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
        relative rounded-liquid border border-white/85 bg-white/70
        backdrop-blur-glass shadow-glass transition-all duration-300
        ${hoverEffect ? 'hover:border-festive-gold/60 hover:bg-white/85 hover:shadow-glass-hover hover:-translate-y-0.5' : ''}
        ${glow ? 'shadow-gold-glow border-festive-gold/50 bg-white/85' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Specular glass reflection along top edge */}
      <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
