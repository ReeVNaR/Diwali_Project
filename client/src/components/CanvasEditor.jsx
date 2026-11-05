import React, { useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore.js';
import { canvasUtils } from '../utils/canvasUtils.js';

export default function CanvasEditor() {
  const canvasElRef = useRef(null);
  const containerRef = useRef(null);

  const {
    canvas,
    setCanvas,
    canvasWidth,
    canvasHeight,
    zoom,
    setZoom
  } = useEditorStore();

  // Function to calculate ideal zoom that fits the canvas 100% inside available studio space
  const calculateFitZoom = useCallback(() => {
    if (!containerRef.current) return 0.5;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const padding = isMobile ? 16 : 60;
    const contW = Math.max(160, containerRef.current.clientWidth - padding);
    const contH = Math.max(160, containerRef.current.clientHeight - (isMobile ? 32 : padding));

    const scaleX = contW / canvasWidth;
    const scaleY = contH / canvasHeight;
    const fitScale = Math.min(scaleX, scaleY, 0.95);
    return Math.max(0.1, parseFloat(fitScale.toFixed(2)));
  }, [canvasWidth, canvasHeight]);

  // Initialize Fabric canvas once on mount
  useEffect(() => {
    if (!canvasElRef.current) return;

    const initialZoom = calculateFitZoom();

    const fabricInstance = canvasUtils.initCanvas(canvasElRef.current, {
      width: Math.round(canvasWidth * initialZoom),
      height: Math.round(canvasHeight * initialZoom)
    });

    fabricInstance.setZoom(initialZoom);
    setZoom(initialZoom);
    setCanvas(fabricInstance);

    // Initial history snapshot
    setTimeout(() => {
      try {
        const json = JSON.stringify(fabricInstance.toJSON(['id', 'editableKey', 'selectable', 'evented', 'name']));
        useEditorStore.setState({
          history: [json],
          historyIndex: 0
        });
      } catch (e) {
        console.error('Failed to init history', e);
      }
    }, 150);

    return () => {
      fabricInstance.dispose();
      setCanvas(null);
    };
  }, []);

  // Update canvas display dimensions and zoom whenever zoom or canvas format changes
  useEffect(() => {
    if (!canvas) return;

    const displayW = Math.round(canvasWidth * zoom);
    const displayH = Math.round(canvasHeight * zoom);

    canvas.setDimensions({ width: displayW, height: displayH });
    canvas.setZoom(zoom);
    canvas.requestRenderAll();
  }, [canvas, canvasWidth, canvasHeight, zoom]);

  // Handle auto-fit on window resize or format change
  const handleFitToScreen = useCallback(() => {
    const fitZoom = calculateFitZoom();
    setZoom(fitZoom);
  }, [calculateFitZoom, setZoom]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      handleFitToScreen();
    });
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [handleFitToScreen]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full overflow-hidden flex items-center justify-center p-4 canvas-checkerboard select-none"
    >
      {/* Sized Canvas Wrapper (Matches visual dimensions perfectly so no overflow can occur) */}
      <div
        className="rounded-2xl shadow-glass-elevated overflow-hidden border border-white/80 bg-white/95 transition-all duration-150"
        style={{
          width: `${Math.round(canvasWidth * zoom)}px`,
          height: `${Math.round(canvasHeight * zoom)}px`
        }}
      >
        <canvas ref={canvasElRef} />
      </div>

      {/* Floating Bottom Zoom Controls Bar (Liquid Glass Pill) */}
      <div className="absolute bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-liquid liquid-glass shadow-glass flex items-center gap-2 sm:gap-3 z-30 scale-90 sm:scale-100">
        <button
          onClick={() => setZoom(Math.max(0.15, parseFloat((zoom - 0.08).toFixed(2))))}
          className="p-1 rounded-full text-festive-textSecondary hover:text-[#0F172A] hover:bg-black/5 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-bold text-[#0F172A] min-w-[45px] text-center">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={() => setZoom(Math.min(2.0, parseFloat((zoom + 0.08).toFixed(2))))}
          className="p-1 rounded-full text-festive-textSecondary hover:text-[#0F172A] hover:bg-black/5 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-black/10 mx-1" />

        <button
          onClick={handleFitToScreen}
          className="flex items-center gap-1 px-2.5 py-1 rounded-liquid-sm text-xs font-semibold text-festive-gold hover:bg-festive-gold/10 transition-colors"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fit</span>
        </button>

        <button
          onClick={() => setZoom(1)}
          className="px-2 py-1 rounded-liquid-sm text-xs text-festive-textSecondary hover:text-[#0F172A] hover:bg-black/5 transition-colors"
          title="100% Actual Scale"
        >
          100%
        </button>
      </div>
    </div>
  );
}
