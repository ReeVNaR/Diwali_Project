import { create } from 'zustand';

export const useEditorStore = create((set, get) => ({
  canvas: null,
  projectName: 'My Festive Creative',
  projectId: null,
  templateId: null,
  canvasFormat: 'Instagram Square',
  canvasWidth: 1080,
  canvasHeight: 1080,
  zoom: 0.5,
  selectedObject: null,
  activeTab: 'templates',
  
  // History for Undo / Redo
  history: [],
  historyIndex: -1,
  isPerformingHistory: false,

  // Async states
  isSaving: false,
  isExporting: false,
  isDirty: false,

  // Asset lists
  uploadedLogos: [],
  uploadedProducts: [],

  // Setters
  setCanvas: (canvas) => set({ canvas }),
  setProjectName: (name) => set({ projectName: name, isDirty: true }),
  setProjectId: (id) => set({ projectId: id }),
  setTemplateId: (id) => set({ templateId: id }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedObject: (selectedObject) => set({ selectedObject }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setIsExporting: (isExporting) => set({ isExporting }),
  setIsDirty: (isDirty) => set({ isDirty }),

  addUploadedLogo: (logo) => set((state) => ({ uploadedLogos: [logo, ...state.uploadedLogos] })),
  addUploadedProduct: (prod) => set((state) => ({ uploadedProducts: [prod, ...state.uploadedProducts] })),

  setCanvasDimensions: (format, width, height) => {
    const { canvas } = get();
    set({ canvasFormat: format, canvasWidth: width, canvasHeight: height, isDirty: true });
    if (canvas) {
      canvas.setWidth(width);
      canvas.setHeight(height);
      canvas.renderAll();
      get().pushHistory();
    }
  },

  // Save state snapshot to undo/redo history
  pushHistory: () => {
    const { canvas, history, historyIndex, isPerformingHistory } = get();
    if (!canvas || isPerformingHistory) return;

    try {
      const json = JSON.stringify(canvas.toJSON(['id', 'editableKey', 'selectable', 'evented', 'name']));
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(json);

      // Limit history to last 30 states to maintain lightweight memory
      if (newHistory.length > 30) {
        newHistory.shift();
      }

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1,
        isDirty: true
      });
    } catch (err) {
      console.error('Failed to capture canvas history:', err);
    }
  },

  undo: () => {
    const { canvas, history, historyIndex } = get();
    if (!canvas || historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    const jsonState = history[newIndex];

    set({ isPerformingHistory: true });
    canvas.loadFromJSON(jsonState, () => {
      canvas.renderAll();
      set({
        historyIndex: newIndex,
        isPerformingHistory: false,
        selectedObject: null
      });
    });
  },

  redo: () => {
    const { canvas, history, historyIndex } = get();
    if (!canvas || historyIndex >= history.length - 1) return;

    const newIndex = historyIndex + 1;
    const jsonState = history[newIndex];

    set({ isPerformingHistory: true });
    canvas.loadFromJSON(jsonState, () => {
      canvas.renderAll();
      set({
        historyIndex: newIndex,
        isPerformingHistory: false,
        selectedObject: null
      });
    });
  },

  // Update attributes of currently selected object
  updateSelectedProps: (props) => {
    const { canvas } = get();
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    active.set(props);
    canvas.requestRenderAll();
    
    // Refresh selected object state in store
    set({
      selectedObject: {
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
      }
    });

    get().pushHistory();
  }
}));
