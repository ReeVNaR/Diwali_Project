import React, { useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
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
    setZoom,
    pushHistory
  } = useEditorStore();

  // Initialize Fabric canvas once on mount
  useEffect(() => {
    if (!canvasElRef.current) return;

    const fabricInstance = canvasUtils.initCanvas(canvasElRef.current, {
      width: canvasWidth,
      height: canvasHeight
    });

    setCanvas(fabricInstance);

    // Initial history push
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
    }, 100);

    return () => {
      fabricInstance.dispose();
      setCanvas(null);
    };
  }, []);

  // Sync canvas dimensions with store
  useEffect(() => {
    if (canvas) {
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.renderAll();
    }
  }, [canvas, canvasWidth, canvasHeight]);

  // Handle Fit to Screen auto-zoom calculation
  const handleFitToScreen = () => {
    if (!containerRef.current) return;
    const contW = containerRef.current.clientWidth - 80;
    const contH = containerRef.current.clientHeight - 80;

    const scaleX = contW / canvasWidth;
    const scaleY = contH / canvasHeight;
    const newZoom = Math.min(scaleX, scaleY, 1.2);
    setZoom(parseFloat(newZoom.toFixed(2)));
  };

  useEffect(() => {
    // Initial auto-fit
    const timer = setTimeout(() => {
      handleFitToScreen();
    }, 200);
    return () => clearTimeout(timer);
  }, [canvasWidth, canvasHeight]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full overflow-auto flex items-center justify-center p-8 bg-[#070910] canvas-checkerboard select-none"
    >
      {/* Scaled Canvas Frame */}
      <div
        className="transition-transform duration-150 origin-center rounded-lg shadow-2xl overflow-hidden border border-white/20"
        style={{
          transform: `scale(${zoom})`,
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`
        }}
      >
        <canvas ref={canvasElRef} />
      </div>

      {/* Floating Bottom Zoom Controls Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-liquid bg-[#0F1424]/90 backdrop-blur-md border border-white/15 shadow-glass flex items-center gap-3 z-30">
        <button
          onClick={() => setZoom(Math.max(0.15, parseFloat((zoom - 0.1).toFixed(2))))}
          className="p-1 rounded text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-medium text-white min-w-[45px] text-center">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={() => setZoom(Math.min(2.5, parseFloat((zoom + 0.1).toFixed(2))))}
          className="p-1 rounded text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-white/20 mx-1" />

        <button
          onClick={handleFitToScreen}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fit</span>
        </button>

        <button
          onClick={() => setZoom(1)}
          className="px-2 py-1 rounded text-xs text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          title="100% Actual Size"
        >
          100%
        </button>
      </div>
    </div>
  );
}
