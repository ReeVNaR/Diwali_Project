import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { uploadService } from '../services/uploadService.js';
import { useEditorStore } from '../store/editorStore.js';
import { canvasUtils } from '../utils/canvasUtils.js';

export default function UploadZone({ type = 'product', onInsertImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const {
    canvas,
    uploadedLogos,
    uploadedProducts,
    addUploadedLogo,
    addUploadedProduct,
    pushHistory
  } = useEditorStore();

  const assetList = type === 'logo' ? uploadedLogos : uploadedProducts;

  const handleFileChange = async (file) => {
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.');
      return;
    }

    // Check extension
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PNG, JPG, or WebP image.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      let result;
      if (type === 'logo') {
        result = await uploadService.uploadLogo(file);
        addUploadedLogo(result.data.url);
      } else {
        result = await uploadService.uploadProduct(file);
        addUploadedProduct(result.data.url);
      }

      // Automatically place on canvas or notify
      if (canvas) {
        canvasUtils.addImage(canvas, result.data.url);
        pushHistory();
      }
      if (onInsertImage) onInsertImage(result.data.url);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      {/* Upload Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-liquid-sm p-6 text-center cursor-pointer transition-all duration-200
          ${isDragging
            ? 'border-festive-gold bg-festive-gold/10'
            : 'border-white/15 bg-white/[0.03] hover:border-festive-gold/50 hover:bg-white/[0.06]'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-8 h-8 text-festive-gold animate-spin" />
              <p className="text-xs text-festive-gold font-medium">Uploading & optimizing...</p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-full bg-festive-gold/10 text-festive-gold border border-festive-gold/20">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Click or drag {type === 'logo' ? 'brand logo' : 'product photo'}
                </p>
                <p className="text-[11px] text-festive-textSecondary mt-0.5">
                  PNG, JPG, or WebP up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 rounded-liquid-sm bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Uploaded Assets List */}
      {assetList.length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-festive-textSecondary">
            Uploaded {type === 'logo' ? 'Logos' : 'Products'} ({assetList.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {assetList.map((url, index) => (
              <div
                key={index}
                onClick={() => {
                  if (canvas) {
                    canvasUtils.addImage(canvas, url);
                    pushHistory();
                  }
                  if (onInsertImage) onInsertImage(url);
                }}
                className="group relative aspect-square rounded-liquid-sm border border-white/10 bg-white/[0.04] p-2 flex items-center justify-center cursor-pointer hover:border-festive-gold/50 transition-all overflow-hidden"
                title="Click to insert on canvas"
              >
                <img
                  src={url}
                  alt={`Uploaded ${type}`}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-[10px] font-semibold text-festive-gold px-2 py-1 rounded bg-black/70">
                    + Insert
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
