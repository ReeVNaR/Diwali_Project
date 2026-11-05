import React, { useState } from 'react';
import {
  LayoutGrid,
  Type,
  UploadCloud,
  Sparkles,
  Paintbrush,
  Layers,
  Flame,
  Search,
  Plus,
  Eye,
  Trash2,
  Lock,
  Unlock,
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
    pushHistory,
    selectedObject,
    setSelectedObject
  } = useEditorStore();

  const { templates, fetchTemplates } = useTemplateStore();
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
        fill: '#F5B942'
      });
    } else if (type === 'subheading') {
      canvasUtils.addText(canvas, 'Exclusive Festive Collection 2026', {
        fontFamily: 'Outfit',
        fontSize: 26,
        fontWeight: '500',
        fill: '#E5E7EB'
      });
    } else if (type === 'body') {
      canvasUtils.addText(canvas, 'Visit our store today or call +91 98765 43210', {
        fontFamily: 'Outfit',
        fontSize: 18,
        fontWeight: '400',
        fill: '#9CA3AF'
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

  // Get current canvas objects for the Layers panel
  const canvasObjects = canvas ? canvas.getObjects().filter(o => o.id !== 'bg-rect') : [];

  return (
    <div className="flex h-full border-r border-white/10 bg-[#0A0D18]">
      {/* 1. Left Icon Navigation Column */}
      <div className="w-18 flex flex-col items-center py-4 border-r border-white/5 bg-[#080A12] space-y-3 z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex flex-col items-center justify-center w-14 h-14 rounded-liquid-sm text-[10px] font-medium transition-all duration-200
                ${isActive
                  ? 'bg-festive-gold/20 text-festive-gold border border-festive-gold/40 shadow-sm'
                  : 'text-festive-textSecondary hover:text-white hover:bg-white/[0.04]'
                }
              `}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Secondary Drawer Panel */}
      <div className="w-72 sm:w-80 h-full overflow-y-auto p-4 space-y-5 bg-[#0D111F]/90 backdrop-blur-md">
        
        {/* TAB: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm text-white">Choose Template</h3>
              <span className="text-[11px] text-festive-gold font-mono">{filteredTemplates.length} designs</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-festive-textSecondary" />
              <input
                type="text"
                placeholder="Search Diwali templates..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-liquid-sm bg-white/[0.05] border border-white/10 text-xs text-white focus:outline-none focus:border-festive-gold/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTemplate && onSelectTemplate(t)}
                  className="group relative rounded-liquid-sm border border-white/10 overflow-hidden cursor-pointer p-2.5 flex flex-col justify-between aspect-square hover:border-festive-gold/60 transition-all"
                  style={{ backgroundColor: t.colors?.bgStart || '#080d1e' }}
                >
                  <p className="text-[9px] font-bold text-festive-gold uppercase tracking-wider truncate">
                    {t.category}
                  </p>
                  <p className="font-serif text-[11px] font-bold text-white line-clamp-2 leading-tight">
                    {t.name}
                  </p>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-black/40 text-white/70 self-start font-mono">
                    {t.width}×{t.height}
                  </span>
                  <div className="absolute inset-0 bg-festive-gold/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[10px] font-bold text-[#080A12] bg-festive-gold px-2 py-1 rounded">
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
            <h3 className="font-serif font-bold text-sm text-white">Add Festive Text</h3>
            <p className="text-xs text-festive-textSecondary">
              Click any style to add editable text to your creative.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleAddText('heading')}
                className="w-full p-4 rounded-liquid-sm border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-festive-gold/40 text-left transition-all group"
              >
                <p className="font-serif font-black text-xl text-festive-gold group-hover:scale-105 transition-transform origin-left">
                  Add a Grand Headline
                </p>
                <p className="text-[11px] text-festive-textSecondary mt-0.5">Playfair Display Serif</p>
              </button>

              <button
                onClick={() => handleAddText('subheading')}
                className="w-full p-3.5 rounded-liquid-sm border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-festive-gold/40 text-left transition-all"
              >
                <p className="font-sans font-semibold text-base text-white">
                  Add a Subheading
                </p>
                <p className="text-[11px] text-festive-textSecondary mt-0.5">Outfit Medium</p>
              </button>

              <button
                onClick={() => handleAddText('body')}
                className="w-full p-3 rounded-liquid-sm border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-festive-gold/40 text-left transition-all"
              >
                <p className="font-sans text-xs text-white/80">
                  Add Contact or Address details
                </p>
                <p className="text-[11px] text-festive-textSecondary mt-0.5">Regular Sans Body</p>
              </button>

              <button
                onClick={() => handleAddText('badge')}
                className="w-full p-3 rounded-liquid-sm border border-festive-gold/30 bg-festive-gold/10 hover:bg-festive-gold/20 text-left transition-all"
              >
                <p className="font-mono font-bold text-xs uppercase text-festive-gold">
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
              <h3 className="font-serif font-bold text-sm text-white">Upload Brand Assets</h3>
              <p className="text-xs text-festive-textSecondary mt-0.5">
                Add your logo and high-res product photos
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-festive-gold uppercase tracking-wider block mb-2">
                  1. Business Logo
                </span>
                <UploadZone type="logo" />
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-xs font-semibold text-festive-gold uppercase tracking-wider block mb-2">
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
            <h3 className="font-serif font-bold text-sm text-white">Diwali Festive Elements</h3>
            <p className="text-xs text-festive-textSecondary">
              Click to insert authentic Diwali decorations & shapes
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'diya', name: 'Golden Diya Lamp', icon: '🪔', desc: 'Auspicious flame' },
                { id: 'mandala', name: 'Rangoli Mandala', icon: '🌸', desc: 'Sacred geometry' },
                { id: 'sparkler', name: 'Sparkler Flare', icon: '✨', desc: 'Festival light' },
                { id: 'lantern', name: 'Kandil Lantern', icon: '🏮', desc: 'Traditional decor' },
                { id: 'badge', name: 'Offer Ribbon', icon: '🏷️', desc: 'Discount banner' },
                { id: 'golden-frame', name: 'Ornate Frame', icon: '🖼️', desc: 'Festive border' },
                { id: 'circle', name: 'Golden Ring', icon: '⭕', desc: 'Halo ornament' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddElement(item.id)}
                  className="p-3 rounded-liquid-sm border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-festive-gold/50 flex flex-col items-center justify-center text-center transition-all group"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-xs font-semibold text-white">{item.name}</span>
                  <span className="text-[10px] text-festive-textSecondary">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BACKGROUNDS */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-sm text-white">Canvas Background</h3>
            <p className="text-xs text-festive-textSecondary">
              Choose from luxury festive palettes
            </p>

            <div className="space-y-2">
              {[
                { name: 'Royal Navy Blue', color: '#080d1e' },
                { name: 'Crimson Velvet', color: '#2A080C' },
                { name: 'Imperial Emerald', color: '#041F17' },
                { name: 'Obsidian Night', color: '#0A0C14' },
                { name: 'Mystic Plum', color: '#260B2B' },
                { name: 'Festive Terracotta', color: '#301205' },
                { name: 'Dark Slate Glass', color: '#0F172A' },
                { name: 'Golden Bronze', color: '#1A1405' }
              ].map((bg) => (
                <button
                  key={bg.color}
                  onClick={() => handleSetBackground(bg.color)}
                  className="w-full p-2.5 rounded-liquid-sm border border-white/10 flex items-center gap-3 hover:border-festive-gold/50 transition-all"
                  style={{ backgroundColor: bg.color }}
                >
                  <div className="w-5 h-5 rounded-full border border-white/30" style={{ backgroundColor: bg.color }} />
                  <span className="text-xs font-medium text-white">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LAYERS */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-white">Canvas Layers</h3>
            <p className="text-xs text-festive-textSecondary">
              Manage z-order, lock, and visibility of objects
            </p>

            <div className="space-y-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
              {canvasObjects.length === 0 ? (
                <p className="text-xs text-white/50 py-4 text-center">No objects on canvas</p>
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
                        p-2.5 rounded-liquid-sm border flex items-center justify-between text-xs cursor-pointer transition-colors
                        ${isSelected
                          ? 'bg-festive-gold/20 border-festive-gold text-festive-gold'
                          : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.06]'
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
                          className="p-1 hover:text-festive-gold"
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
                          className="p-1 hover:text-festive-gold"
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
                          className="p-1 hover:text-red-400"
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
