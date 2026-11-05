import { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore.js';
import { canvasUtils } from '../utils/canvasUtils.js';

export function useEditor(onSaveTrigger, onExportTrigger) {
  const {
    canvas,
    selectedObject,
    setSelectedObject,
    pushHistory,
    undo,
    redo
  } = useEditorStore();

  // Bind Fabric selection and modification events
  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (e) => {
      const active = e.selected ? e.selected[0] : canvas.getActiveObject();
      if (!active) {
        setSelectedObject(null);
        return;
      }

      setSelectedObject({
        type: active.type,
        text: active.text || '',
        fontFamily: active.fontFamily || 'Outfit',
        fontSize: active.fontSize || 24,
        fontWeight: active.fontWeight || 'normal',
        fontStyle: active.fontStyle || 'normal',
        fill: active.fill || '#ffffff',
        stroke: active.stroke || '',
        strokeWidth: active.strokeWidth || 0,
        opacity: active.opacity !== undefined ? active.opacity : 1,
        textAlign: active.textAlign || 'left',
        charSpacing: active.charSpacing || 0,
        lineHeight: active.lineHeight || 1.2,
        left: Math.round(active.left || 0),
        top: Math.round(active.top || 0),
        angle: Math.round(active.angle || 0),
        isLocked: active.lockMovementX || false
      });
    };

    const handleSelectionCleared = () => {
      setSelectedObject(null);
    };

    const handleObjectModified = () => {
      handleSelection({});
      pushHistory();
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleSelectionCleared);
    canvas.on('object:modified', handleObjectModified);

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', handleSelectionCleared);
      canvas.off('object:modified', handleObjectModified);
    };
  }, [canvas, setSelectedObject, pushHistory]);

  // Bind keyboard shortcuts: Ctrl+Z, Ctrl+Shift+Z, Ctrl+D, Delete, Ctrl+S, Ctrl+E
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input, textarea or contenteditable element
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Ctrl + Z
      if (cmdOrCtrl && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl + Shift + Z or Ctrl + Y
      if ((cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'z') || (cmdOrCtrl && e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        redo();
        return;
      }

      // Duplicate: Ctrl + D
      if (cmdOrCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (canvas) {
          canvasUtils.duplicateActiveObject(canvas);
          pushHistory();
        }
        return;
      }

      // Save: Ctrl + S
      if (cmdOrCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (onSaveTrigger) onSaveTrigger();
        return;
      }

      // Export: Ctrl + E
      if (cmdOrCtrl && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        if (onExportTrigger) onExportTrigger();
        return;
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (canvas && canvas.getActiveObject()) {
          e.preventDefault();
          canvasUtils.deleteActiveObject(canvas);
          pushHistory();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canvas, undo, redo, pushHistory, onSaveTrigger, onExportTrigger]);

  return { canvas, selectedObject };
}
