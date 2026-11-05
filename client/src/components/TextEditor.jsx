import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';
import ColorPicker from './ColorPicker.jsx';
import FontSelector from './FontSelector.jsx';
import { useEditorStore } from '../store/editorStore.js';

export default function TextEditor() {
  const { selectedObject, updateSelectedProps } = useEditorStore();

  if (!selectedObject) return null;

  return (
    <div className="space-y-4 text-xs">
      {/* Text Content Input */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
          Edit Text Content
        </label>
        <textarea
          rows={3}
          value={selectedObject.text || ''}
          onChange={(e) => updateSelectedProps({ text: e.target.value })}
          className="w-full p-2.5 rounded-liquid-sm bg-white/90 border border-black/10 text-[#0F172A] font-medium text-xs focus:outline-none focus:border-amber-500/50 resize-none shadow-sm"
          placeholder="Enter text..."
        />
      </div>

      {/* Font Family Selection */}
      <FontSelector
        value={selectedObject.fontFamily}
        onChange={(font) => updateSelectedProps({ fontFamily: font })}
      />

      {/* Font Size & Weight */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Size ({selectedObject.fontSize}px)
          </label>
          <input
            type="range"
            min="12"
            max="120"
            value={selectedObject.fontSize || 32}
            onChange={(e) => updateSelectedProps({ fontSize: parseInt(e.target.value, 10) })}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Weight
          </label>
          <select
            value={selectedObject.fontWeight || 'normal'}
            onChange={(e) => updateSelectedProps({ fontWeight: e.target.value })}
            className="w-full px-2 py-1.5 rounded-liquid-sm bg-white/90 border border-black/10 text-[#0F172A] font-semibold text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer shadow-sm"
          >
            <option value="300">Light (300)</option>
            <option value="normal">Regular (400)</option>
            <option value="600">SemiBold (600)</option>
            <option value="bold">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
          </select>
        </div>
      </div>

      {/* Styling Controls (Bold, Italic, Alignment) */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
          Style & Alignment
        </label>
        <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-liquid-sm border border-black/5 shadow-sm">
          <button
            onClick={() => updateSelectedProps({
              fontWeight: selectedObject.fontWeight === 'bold' || selectedObject.fontWeight === '700' ? 'normal' : 'bold'
            })}
            className={`p-1.5 rounded-md border transition-colors ${
              selectedObject.fontWeight === 'bold' || selectedObject.fontWeight === '700'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-900 font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Toggle Bold"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            onClick={() => updateSelectedProps({
              fontStyle: selectedObject.fontStyle === 'italic' ? 'normal' : 'italic'
            })}
            className={`p-1.5 rounded-md border transition-colors ${
              selectedObject.fontStyle === 'italic'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-900 font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Toggle Italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-black/10 mx-1" />

          {['left', 'center', 'right'].map((align) => {
            const isSelected = selectedObject.textAlign === align;
            const Icon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
            return (
              <button
                key={align}
                onClick={() => updateSelectedProps({ textAlign: align })}
                className={`p-1.5 rounded-md border transition-colors ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-900 font-bold'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                }`}
                title={`Align ${align}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacing (Letter Spacing & Line Height) */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Spacing ({selectedObject.charSpacing || 0})
          </label>
          <input
            type="range"
            min="-50"
            max="400"
            step="10"
            value={selectedObject.charSpacing || 0}
            onChange={(e) => updateSelectedProps({ charSpacing: parseInt(e.target.value, 10) })}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Line ({selectedObject.lineHeight || 1.2})
          </label>
          <input
            type="range"
            min="0.8"
            max="2.5"
            step="0.1"
            value={selectedObject.lineHeight || 1.2}
            onChange={(e) => updateSelectedProps({ lineHeight: parseFloat(e.target.value) })}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Color Selection */}
      <ColorPicker
        label="Text Color"
        value={typeof selectedObject.fill === 'string' ? selectedObject.fill : '#0F172A'}
        onChange={(color) => updateSelectedProps({ fill: color })}
      />
    </div>
  );
}
