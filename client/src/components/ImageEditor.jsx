import React from 'react';
import { Layers, ArrowUp, ArrowDown, Lock, Unlock, Copy, Trash2, RotateCw } from 'lucide-react';
import { useEditorStore } from '../store/editorStore.js';
import { canvasUtils } from '../utils/canvasUtils.js';
import ColorPicker from './ColorPicker.jsx';

export default function ImageEditor() {
  const { canvas, selectedObject, updateSelectedProps, pushHistory } = useEditorStore();

  if (!selectedObject) return null;

  const isShape = ['rect', 'circle', 'path'].includes(selectedObject.type);
  const isImage = selectedObject.type === 'image';

  return (
    <div className="space-y-5 text-sm">
      {/* Element Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-festive-gold">
            {isImage ? 'Image Asset' : isShape ? 'Festive Shape / Frame' : 'Object'}
          </span>
          <p className="text-[11px] text-festive-textSecondary">
            {selectedObject.type} • {selectedObject.left}px, {selectedObject.top}px
          </p>
        </div>

        <button
          onClick={() => {
            if (canvas) {
              const isLocked = canvasUtils.toggleLock(canvas);
              updateSelectedProps({ isLocked });
            }
          }}
          className={`p-2 rounded-liquid-sm border transition-colors ${
            selectedObject.isLocked
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              : 'bg-white/[0.05] border-white/10 text-white/70 hover:text-white'
          }`}
          title={selectedObject.isLocked ? 'Unlock Object' : 'Lock Object'}
        >
          {selectedObject.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>

      {/* Shape Color (if applicable) */}
      {isShape && (
        <ColorPicker
          label="Fill Color"
          value={typeof selectedObject.fill === 'string' ? selectedObject.fill : '#F5B942'}
          onChange={(color) => updateSelectedProps({ fill: color })}
        />
      )}

      {/* Opacity Control */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <label className="font-semibold text-festive-textSecondary uppercase tracking-wider">
            Opacity
          </label>
          <span className="font-mono text-white/70">
            {Math.round((selectedObject.opacity || 1) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          value={selectedObject.opacity !== undefined ? selectedObject.opacity : 1}
          onChange={(e) => updateSelectedProps({ opacity: parseFloat(e.target.value) })}
          className="w-full accent-festive-gold cursor-pointer"
        />
      </div>

      {/* Rotation Control */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <label className="font-semibold text-festive-textSecondary uppercase tracking-wider flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" />
            Rotation ({selectedObject.angle || 0}°)
          </label>
          {selectedObject.angle !== 0 && (
            <button
              onClick={() => updateSelectedProps({ angle: 0 })}
              className="text-[10px] text-festive-gold hover:underline"
            >
              Reset 0°
            </button>
          )}
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={selectedObject.angle || 0}
          onChange={(e) => updateSelectedProps({ angle: parseInt(e.target.value, 10) })}
          className="w-full accent-festive-gold cursor-pointer"
        />
      </div>

      {/* Layer Order Controls */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-festive-textSecondary uppercase tracking-wider flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-festive-gold" />
          Layer Ordering
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (canvas) {
                canvasUtils.bringForward(canvas);
                pushHistory();
              }
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-liquid-sm bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Bring Forward
          </button>

          <button
            onClick={() => {
              if (canvas) {
                canvasUtils.sendBackward(canvas);
                pushHistory();
              }
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-liquid-sm bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            Send Backward
          </button>
        </div>
      </div>

      {/* Action Buttons: Duplicate & Delete */}
      <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            if (canvas) {
              canvasUtils.duplicateActiveObject(canvas);
              pushHistory();
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-liquid-sm bg-white/[0.05] border border-white/10 hover:border-festive-gold/40 hover:bg-white/10 text-white text-xs font-medium transition-colors"
        >
          <Copy className="w-3.5 h-3.5 text-festive-gold" />
          Duplicate
        </button>

        <button
          onClick={() => {
            if (canvas) {
              canvasUtils.deleteActiveObject(canvas);
              pushHistory();
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-liquid-sm bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
