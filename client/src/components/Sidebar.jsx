import React, { useState } from 'react';
import {
  LayoutGrid,
  Type,
  UploadCloud,
  Sparkles,
  Paintbrush,
  Layers,
  Search,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore.js';
import { useTemplateStore } from '../store/templateStore.js';
import { canvasUtils } from '../utils/canvasUtils.js';
import UploadZone from './UploadZone.jsx';

export default function Sidebar({ onSelectTemplate }) {
  const {
    canvas,
    activeTab,
    setActiveTab,
    pushHistory
  } = useEditorStore();

  const { templates } = useTemplateStore();
  const [templateSearch, setTemplateSearch] = useState('');

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(templateSearch.toLowerCase())
  ).slice(0, 30);

  const navItems = [
    { id: 'templates', label: 'Templates', icon: LayoutGrid },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'uploads', label: 'Uploads', icon: UploadCloud },
    { id: 'elements', label: 'Festive', icon: Sparkles },
    { id: 'background', label: 'Background', icon: Paintbrush },
    { id: 'layers', label: 'Layers', icon: Layers }
  ];

  const handleAddText = (type) => {
    if (!canvas) return;
    if (type === 'heading') {
      canvasUtils.addText(canvas, 'GRAND DIWALI SALE', {
        fontFamily: 'Playfair Display',
        fontSize: 48,
        fontWeight: '800',
        fill: '#D97706'
      });
    } else if (type === 'subheading') {
      canvasUtils.addText(canvas, 'Exclusive Festive Collection 2026', {
        fontFamily: 'Outfit',
        fontSize: 26,
        fontWeight: '500',
        fill: '#1E293B'
      });
    } else if (type === 'body') {
      canvasUtils.addText(canvas, 'Visit our store today or call +91 98765 43210', {
        fontFamily: 'Outfit',
        fontSize: 18,
        fontWeight: '400',
        fill: '#64748B'
      });
    } else if (type === 'badge') {
      canvasUtils.addText(canvas, 'FLAT 50% OFF', {
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: '800',
        fill: '#FFFFFF'
      });
    }
    pushHistory();
  };

  const handleAddElement = (elementType) => {
    if (!canvas) return;
    canvasUtils.addFestiveElement(canvas, elementType);
    pushHistory();
  };

  const handleSetBackground = (color) => {
    if (!canvas) return;
    const bgRect = canvas.getObjects().find(o => o.id === 'bg-rect');
    if (bgRect) {
      bgRect.set({ fill: color });
    } else {
      canvas.setBackgroundColor(color, () => {});
    }
    canvas.renderAll();
    pushHistory();
  };

  const canvasObjects = canvas ? canvas.getObjects().filter(o => o.id !== 'bg-rect') : [];

  return (
    <div className="flex h-full border-r border-white/80 bg-white/60 backdrop-blur-glass z-10 shrink-0 shadow-sm">
      {/* 1. Left Icon Navigation Column (Liquid Glass) */}
      <div className="w-18 flex flex-col items-center py-3 border-r border-black/5 bg-white/40 space-y-2 z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex flex-col items-center justify-center w-14 h-14 rounded-liquid-sm text-[10px] font-bold transition-all duration-200
                ${isActive
                  ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30 shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-black/[0.04]'
                }
              `}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Secondary Drawer Panel (Liquid Glass) */}
      <div className="w-72 sm:w-80 h-full overflow-y-auto p-4 space-y-5 bg-white/70 backdrop-blur-md">
        
        {/* TAB: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-black text-sm text-[#0F172A]">Choose Template</h3>
              <span className="text-[11px] text-amber-700 font-mono font-bold">{filteredTemplates.length} designs</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search Diwali templates..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-liquid-sm bg-white/90 border border-black/10 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-amber-500/50 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTemplate && onSelectTemplate(t)}
                  className="group relative rounded-liquid-sm border border-black/10 overflow-hidden cursor-pointer p-2.5 flex flex-col justify-between aspect-square hover:border-amber-500 hover:shadow-md transition-all"
                  style={{ backgroundColor: t.colors?.bgStart || '#080d1e' }}
                >
                  <p className="text-[9px] font-bold text-amber-300 uppercase tracking-wider truncate">
                    {t.category}
                  </p>
                  <p className="font-serif text-[11px] font-bold text-white line-clamp-2 leading-tight">
                    {t.name}
                  </p>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-black/50 text-white/90 self-start font-mono">
                    {t.width}×{t.height}
                  </span>
                  <div className="absolute inset-0 bg-amber-500/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs">
                    <span className="text-[10px] font-bold text-[#0F172A] bg-white px-2.5 py-1 rounded-full shadow-md">
                      Load Design
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TEXT */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">Add Festive Typography</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Click any style to add to your creative.</p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleAddText('heading')}
                className="w-full p-4 rounded-liquid-sm border border-black/5 bg-white/80 hover:bg-white hover:border-amber-500/40 text-left transition-all shadow-sm group"
              >
                <p className="font-serif font-black text-xl text-amber-700 group-hover:scale-105 transition-transform origin-left">
                  Grand Royal Headline
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Playfair Display Serif</p>
              </button>

              <button
                onClick={() => handleAddText('subheading')}
                className="w-full p-3.5 rounded-liquid-sm border border-black/5 bg-white/80 hover:bg-white hover:border-amber-500/40 text-left transition-all shadow-sm"
              >
                <p className="font-sans font-bold text-base text-[#0F172A]">
                  Festive Subheading
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Outfit Medium</p>
              </button>

              <button
                onClick={() => handleAddText('body')}
                className="w-full p-3 rounded-liquid-sm border border-black/5 bg-white/80 hover:bg-white hover:border-amber-500/40 text-left transition-all shadow-sm"
              >
                <p className="font-sans text-xs text-[#334155] font-medium">
                  Contact, Address or Offer Terms
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Regular Sans Body</p>
              </button>

              <button
                onClick={() => handleAddText('badge')}
                className="w-full p-3 rounded-liquid-sm border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-left transition-all"
              >
                <p className="font-mono font-bold text-xs uppercase text-amber-800">
                  + Add 50% Off Offer Badge
                </p>
              </button>
            </div>
          </div>
        )}

        {/* TAB: UPLOADS */}
        {activeTab === 'uploads' && (
          <div className="space-y-5">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">Brand Assets</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Upload your shop logo & product photos
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
                  1. Business Logo
                </span>
                <UploadZone type="logo" />
              </div>

              <div className="pt-2 border-t border-black/5">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
                  2. Product Images
                </span>
                <UploadZone type="product" />
              </div>
            </div>
          </div>
        )}

        {/* TAB: FESTIVE ELEMENTS */}
        {activeTab === 'elements' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">Diwali Festive Elements</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Click to insert decorations onto canvas</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'diya', name: 'Golden Diya', icon: '🪔', desc: 'Auspicious flame' },
                { id: 'mandala', name: 'Rangoli Art', icon: '🌸', desc: 'Sacred geometry' },
                { id: 'sparkler', name: 'Sparkler Star', icon: '✨', desc: 'Festival light' },
                { id: 'lantern', name: 'Kandil Lantern', icon: '🏮', desc: 'Hanging decor' },
                { id: 'badge', name: 'Offer Ribbon', icon: '🏷️', desc: 'Discount banner' },
                { id: 'golden-frame', name: 'Ornate Border', icon: '🖼️', desc: 'Festive frame' },
                { id: 'circle', name: 'Golden Ring', icon: '⭕', desc: 'Halo ornament' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddElement(item.id)}
                  className="p-3 rounded-liquid-sm border border-black/5 bg-white/80 hover:bg-white hover:border-amber-500/50 flex flex-col items-center justify-center text-center transition-all group shadow-sm"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-xs font-bold text-[#0F172A]">{item.name}</span>
                  <span className="text-[10px] text-[#64748B] font-medium">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BACKGROUNDS */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">Canvas Color</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Choose from luxury festive palettes</p>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Royal Navy Blue', color: '#080d1e' },
                { name: 'Crimson Velvet', color: '#2A080C' },
                { name: 'Imperial Emerald', color: '#041F17' },
                { name: 'Obsidian Night', color: '#0A0C14' },
                { name: 'Mystic Plum', color: '#260B2B' },
                { name: 'Festive Terracotta', color: '#301205' },
                { name: 'Champagne Warm Ivory', color: '#FFF8F0' },
                { name: 'Golden Bronze', color: '#1A1405' }
              ].map((bg) => (
                <button
                  key={bg.color}
                  onClick={() => handleSetBackground(bg.color)}
                  className="w-full p-2.5 rounded-liquid-sm border border-black/10 bg-white/80 flex items-center gap-3 hover:border-amber-500/50 shadow-sm transition-all"
                >
                  <div className="w-5 h-5 rounded-full border border-black/20" style={{ backgroundColor: bg.color }} />
                  <span className="text-xs font-semibold text-[#0F172A]">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LAYERS */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">Canvas Layers</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Manage z-index and order of objects</p>
            </div>

            <div className="space-y-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
              {canvasObjects.length === 0 ? (
                <p className="text-xs text-[#64748B] py-4 text-center">No objects on canvas</p>
              ) : (
                canvasObjects.slice().reverse().map((obj, i) => {
                  const isSelected = canvas?.getActiveObject() === obj;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        canvas.setActiveObject(obj);
                        canvas.renderAll();
                      }}
                      className={`
                        p-2.5 rounded-liquid-sm border flex items-center justify-between text-xs cursor-pointer transition-colors shadow-sm
                        ${isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-900 font-bold'
                          : 'bg-white/80 border-black/5 text-[#334155] hover:bg-white'
                        }
                      `}
                    >
                      <div className="truncate max-w-[150px]">
                        <span className="font-medium">
                          {obj.text ? `"${obj.text.substring(0, 18)}..."` : obj.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            canvas.bringForward(obj);
                            pushHistory();
                          }}
                          className="p-1 hover:text-amber-600"
                          title="Bring Forward"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            canvas.sendBackwards(obj);
                            pushHistory();
                          }}
                          className="p-1 hover:text-amber-600"
                          title="Send Backward"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            canvas.remove(obj);
                            pushHistory();
                          }}
                          className="p-1 hover:text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
