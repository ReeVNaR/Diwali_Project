import React, { useState } from 'react';
import { Download, Sparkles, Check, Loader2, Image as ImageIcon, X } from 'lucide-react';
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
      // Generate high-res base64 data URL with multiplier
      const dataUrl = canvasUtils.exportToDataURL(canvas, format, scale);
      const targetWidth = canvasWidth * scale;
      const targetHeight = canvasHeight * scale;

      let downloadUrl = dataUrl;
      let filename = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${targetWidth}x${targetHeight}.${format === 'jpeg' ? 'jpg' : 'png'}`;

      try {
        // Send to backend Sharp processing API
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

        if (serverRes?.data?.url) {
          downloadUrl = serverRes.data.url;
          filename = serverRes.data.filename;
        }
      } catch (backendErr) {
        console.warn('Backend export failed, falling back to direct browser canvas download:', backendErr);
      }

      // Download file to user computer
      imageUtils.downloadDataUrl(dataUrl, filename);

      // Festive confetti celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5B942', '#FF7043', '#E11D48', '#FFD700']
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-liquid border border-white/15 bg-[#111522] shadow-2xl p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-liquid-sm bg-festive-gold/15 text-festive-gold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">Export High-Res Creative</h3>
              <p className="text-xs text-festive-textSecondary">
                Ready for Instagram, WhatsApp & Print
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-liquid-sm text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-festive-textSecondary">
            File Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'png', name: 'PNG (Lossless)', desc: 'Best clarity & sharp text' },
              { id: 'jpeg', name: 'JPEG (Optimized)', desc: 'Compact size for WhatsApp' }
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setFormat(fmt.id)}
                className={`p-3 rounded-liquid-sm border text-left transition-all ${
                  format === fmt.id
                    ? 'border-festive-gold bg-festive-gold/10 ring-1 ring-festive-gold'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <p className="text-xs font-bold text-white">{fmt.name}</p>
                <p className="text-[11px] text-festive-textSecondary mt-0.5">{fmt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution Scale Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-festive-textSecondary">
            Resolution & Scale
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 1, label: '1x Standard', dims: `${canvasWidth} × ${canvasHeight} px` },
              { val: 2, label: '2x Ultra HD (2K)', dims: `${canvasWidth * 2} × ${canvasHeight * 2} px` }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setScale(opt.val)}
                className={`p-3 rounded-liquid-sm border text-left transition-all ${
                  scale === opt.val
                    ? 'border-festive-gold bg-festive-gold/10 ring-1 ring-festive-gold'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <p className="text-xs font-bold text-white">{opt.label}</p>
                <p className="text-[11px] font-mono text-festive-gold mt-0.5">{opt.dims}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Quality slider (if JPEG) */}
        {format === 'jpeg' && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-semibold text-festive-textSecondary uppercase tracking-wider">
                Image Quality
              </label>
              <span className="font-mono text-festive-gold">{quality}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value, 10))}
              className="w-full accent-festive-gold cursor-pointer"
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
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-gradient-to-r from-festive-gold via-[#FDE68A] to-festive-orange text-[#080A12] shadow-gold-glow hover:shadow-gold-glow-lg hover:scale-[1.02] active:scale-95'
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
