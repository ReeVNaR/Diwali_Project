import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';
import ColorPicker from './ColorPicker.jsx';
import FontSelector from './FontSelector.jsx';
import { useEditorStore } from '../store/editorStore.js';

export default function TextEditor() {
  const { selectedObject, updateSelectedProps } = useEditorStore();

  if (!selectedObject) return null;

  return (
    <div className="space-y-5 text-sm">
      {/* Text Content Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
          Edit Text
        </label>
        <textarea
          rows={3}
          value={selectedObject.text || ''}
          onChange={(e) => updateSelectedProps({ text: e.target.value })}
          className="w-full p-2.5 rounded-liquid-sm bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-festive-gold/50 resize-none"
          placeholder="Enter text..."
        />
      </div>

      {/* Font Family Selection */}
      <FontSelector
        value={selectedObject.fontFamily}
        onChange={(font) => updateSelectedProps({ fontFamily: font })}
      />

      {/* Font Size & Weight */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
            Font Size ({selectedObject.fontSize}px)
          </label>
          <input
            type="range"
            min="12"
            max="120"
            value={selectedObject.fontSize || 32}
            onChange={(e) => updateSelectedProps({ fontSize: parseInt(e.target.value, 10) })}
            className="w-full accent-festive-gold cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
            Weight
          </label>
          <select
            value={selectedObject.fontWeight || 'normal'}
            onChange={(e) => updateSelectedProps({ fontWeight: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-liquid-sm bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-festive-gold/50 cursor-pointer"
          >
            <option value="300" className="bg-[#111522] text-white">Light (300)</option>
            <option value="normal" className="bg-[#111522] text-white">Regular (400)</option>
            <option value="600" className="bg-[#111522] text-white">SemiBold (600)</option>
            <option value="bold" className="bg-[#111522] text-white">Bold (700)</option>
            <option value="800" className="bg-[#111522] text-white">Extra Bold (800)</option>
          </select>
        </div>
      </div>

      {/* Styling Controls (Bold, Italic, Alignment) */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
          Style & Alignment
        </label>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => updateSelectedProps({
              fontWeight: selectedObject.fontWeight === 'bold' || selectedObject.fontWeight === '700' ? 'normal' : 'bold'
            })}
            className={`p-2 rounded-liquid-sm border transition-colors ${
              selectedObject.fontWeight === 'bold' || selectedObject.fontWeight === '700'
                ? 'bg-festive-gold/20 border-festive-gold/40 text-festive-gold'
                : 'bg-white/[0.05] border-white/10 text-white/70 hover:text-white'
            }`}
            title="Toggle Bold"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            onClick={() => updateSelectedProps({
              fontStyle: selectedObject.fontStyle === 'italic' ? 'normal' : 'italic'
            })}
            className={`p-2 rounded-liquid-sm border transition-colors ${
              selectedObject.fontStyle === 'italic'
                ? 'bg-festive-gold/20 border-festive-gold/40 text-festive-gold'
                : 'bg-white/[0.05] border-white/10 text-white/70 hover:text-white'
            }`}
            title="Toggle Italic"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="h-5 w-[1px] bg-white/10 mx-1" />

          {['left', 'center', 'right'].map((align) => {
            const isSelected = selectedObject.textAlign === align;
            const Icon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : AlignRight;
            return (
              <button
                key={align}
                onClick={() => updateSelectedProps({ textAlign: align })}
                className={`p-2 rounded-liquid-sm border transition-colors ${
                  isSelected
                    ? 'bg-festive-gold/20 border-festive-gold/40 text-festive-gold'
                    : 'bg-white/[0.05] border-white/10 text-white/70 hover:text-white'
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
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
            Letter Spacing ({selectedObject.charSpacing || 0})
          </label>
          <input
            type="range"
            min="-50"
            max="400"
            step="10"
            value={selectedObject.charSpacing || 0}
            onChange={(e) => updateSelectedProps({ charSpacing: parseInt(e.target.value, 10) })}
            className="w-full accent-festive-gold cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider">
            Line Height ({selectedObject.lineHeight || 1.2})
          </label>
          <input
            type="range"
            min="0.8"
            max="2.5"
            step="0.1"
            value={selectedObject.lineHeight || 1.2}
            onChange={(e) => updateSelectedProps({ lineHeight: parseFloat(e.target.value) })}
            className="w-full accent-festive-gold cursor-pointer"
          />
        </div>
      </div>

      {/* Color Selection */}
      <ColorPicker
        label="Text Color"
        value={typeof selectedObject.fill === 'string' ? selectedObject.fill : '#FFFFFF'}
        onChange={(color) => updateSelectedProps({ fill: color })}
      />
    </div>
  );
}
