import React, { useState } from 'react';
import { Download, Sparkles, Check, Loader2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportService } from '../services/exportService.js';
import { useEditorStore } from '../store/editorStore.js';
import { canvasUtils } from '../utils/canvasUtils.js';
import { imageUtils } from '../utils/imageUtils.js';

export default function ExportPanel({ isOpen, onClose }) {
  const [format, setFormat] = useState('png');
  const [scale, setScale] = useState(1);
  const [quality, setQuality] = useState(95);
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { canvas, projectName, canvasWidth, canvasHeight } = useEditorStore();

  if (!isOpen) return null;

  const handleExport = async () => {
    if (!canvas) return;
    setIsExporting(true);
    setSuccess(false);

    try {
      const dataUrl = canvasUtils.exportToDataURL(canvas, format, scale);
      const targetWidth = canvasWidth * scale;
      const targetHeight = canvasHeight * scale;

      let filename = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${targetWidth}x${targetHeight}.${format === 'jpeg' ? 'jpg' : 'png'}`;

      try {
        let serverRes;
        if (format === 'png') {
          serverRes = await exportService.exportPng({
            image: dataUrl,
            width: targetWidth,
            height: targetHeight
          });
        } else {
          serverRes = await exportService.exportJpeg({
            image: dataUrl,
            width: targetWidth,
            height: targetHeight,
            quality
          });
        }

        if (serverRes?.data?.filename) {
          filename = serverRes.data.filename;
        }
      } catch (backendErr) {
        console.warn('Backend export failed, downloading directly:', backendErr);
      }

      imageUtils.downloadDataUrl(dataUrl, filename);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D97706', '#EA580C', '#E11D48', '#FFD700']
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1600);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-liquid border border-white/90 bg-white/85 backdrop-blur-glass shadow-2xl p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-liquid-sm bg-amber-500/15 text-amber-700 border border-amber-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-base text-[#0F172A]">Export Creative</h3>
              <p className="text-xs text-[#64748B]">Ready for Instagram, WhatsApp & Print</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-liquid-sm text-[#64748B] hover:text-[#0F172A] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            File Format
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'png', name: 'PNG (Lossless)', desc: 'Best clarity & sharp text' },
              { id: 'jpeg', name: 'JPEG (Optimized)', desc: 'Compact size for WhatsApp' }
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setFormat(fmt.id)}
                className={`p-3 rounded-liquid-sm border text-left transition-all ${
                  format === fmt.id
                    ? 'border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/30 shadow-sm'
                    : 'border-black/10 bg-white/70 hover:border-black/20 hover:bg-white'
                }`}
              >
                <p className="text-xs font-bold text-[#0F172A]">{fmt.name}</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">{fmt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution Scale Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Resolution Scale
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { val: 1, label: '1x Standard', dims: `${canvasWidth} × ${canvasHeight} px` },
              { val: 2, label: '2x Ultra HD (2K)', dims: `${canvasWidth * 2} × ${canvasHeight * 2} px` }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setScale(opt.val)}
                className={`p-3 rounded-liquid-sm border text-left transition-all ${
                  scale === opt.val
                    ? 'border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/30 shadow-sm'
                    : 'border-black/10 bg-white/70 hover:border-black/20 hover:bg-white'
                }`}
              >
                <p className="text-xs font-bold text-[#0F172A]">{opt.label}</p>
                <p className="text-[11px] font-mono text-amber-700 font-bold mt-0.5">{opt.dims}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Quality slider (if JPEG) */}
        {format === 'jpeg' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-[#64748B] uppercase tracking-wider">
                JPEG Quality
              </label>
              <span className="font-mono text-amber-700 font-bold">{quality}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        )}

        {/* Download Action Button */}
        <button
          onClick={handleExport}
          disabled={isExporting || success}
          className={`
            w-full py-3.5 px-4 rounded-liquid text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300
            ${success
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-[1.01] active:scale-95'
            }
          `}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Rendering Design...</span>
            </>
          ) : success ? (
            <>
              <Check className="w-5 h-5" />
              <span>Downloaded Successfully!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Download High-Res Creative</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
