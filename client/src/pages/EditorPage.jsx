import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Undo2,
  Redo2,
  Save,
  Download,
  Eye,
  Layers,
  Sparkles,
  Sliders,
  Check,
  Loader2,
  ChevronDown
} from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';
import CanvasEditor from '../components/CanvasEditor.jsx';
import TextEditor from '../components/TextEditor.jsx';
import ImageEditor from '../components/ImageEditor.jsx';
import ExportPanel from '../components/ExportPanel.jsx';
import PreviewModal from '../components/PreviewModal.jsx';
import { useEditorStore } from '../store/editorStore.js';
import { useEditor } from '../hooks/useEditor.js';
import { templateService } from '../services/templateService.js';
import { projectService } from '../services/projectService.js';
import { canvasUtils } from '../utils/canvasUtils.js';

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    canvas,
    projectName,
    setProjectName,
    projectId,
    setProjectId,
    templateId,
    setTemplateId,
    canvasFormat,
    canvasWidth,
    canvasHeight,
    setCanvasDimensions,
    selectedObject,
    undo,
    redo,
    historyIndex,
    history,
    pushHistory
  } = useEditorStore();

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const [activeTemplateMeta, setActiveTemplateMeta] = useState(null);

  // Format options
  const formatOptions = [
    { name: 'Instagram Square', width: 1080, height: 1080, label: '1080 × 1080 (1:1)' },
    { name: 'Instagram Portrait', width: 1080, height: 1350, label: '1080 × 1350 (4:5)' },
    { name: 'Instagram Story', width: 1080, height: 1920, label: '1080 × 1920 (9:16)' },
    { name: 'WhatsApp Square', width: 1080, height: 1080, label: '1080 × 1080 (1:1)' },
    { name: 'WhatsApp Portrait', width: 1080, height: 1350, label: '1080 × 1350 (4:5)' }
  ];

  // Save Project to backend
  const handleSaveProject = useCallback(async () => {
    if (!canvas) return;
    setSaveStatus('saving');

    try {
      const canvasJson = canvas.toJSON(['id', 'editableKey', 'selectable', 'evented', 'name']);
      const previewThumb = canvasUtils.exportToDataURL(canvas, 'png', 0.25);

      const projectPayload = {
        name: projectName,
        templateId,
        format: canvasFormat,
        width: canvasWidth,
        height: canvasHeight,
        canvasData: canvasJson,
        previewThumbnail: previewThumb
      };

      if (projectId) {
        await projectService.updateProject(projectId, projectPayload);
      } else {
        const created = await projectService.createProject(projectPayload);
        setProjectId(created.id);
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err) {
      console.error('Failed to save project:', err);
      setSaveStatus('idle');
      alert('Failed to save project. Please check backend connection.');
    }
  }, [canvas, projectName, projectId, templateId, canvasFormat, canvasWidth, canvasHeight, setProjectId]);

  // Hook for keyboard shortcuts & fabric events
  useEditor(handleSaveProject, () => setIsExportOpen(true));

  // Load template or project from URL query params
  useEffect(() => {
    const tId = searchParams.get('templateId');
    const pId = searchParams.get('projectId');

    if (tId && canvas) {
      templateService.getTemplateById(tId).then((tpl) => {
        if (tpl) {
          setTemplateId(tpl.id);
          setProjectName(`${tpl.name} Creative`);
          setActiveTemplateMeta(tpl);
          setCanvasDimensions(tpl.format, tpl.width, tpl.height);
          canvasUtils.loadTemplateData(canvas, tpl, () => {
            pushHistory();
          });
        }
      }).catch(console.error);
    } else if (pId && canvas) {
      projectService.getProjectById(pId).then((proj) => {
        if (proj) {
          setProjectId(proj.id);
          setProjectName(proj.name);
          setCanvasDimensions(proj.format || 'Instagram Square', proj.width || 1080, proj.height || 1080);
          if (proj.canvasData) {
            canvas.loadFromJSON(proj.canvasData, () => {
              canvas.renderAll();
              pushHistory();
            });
          }
        }
      }).catch(console.error);
    }
  }, [searchParams, canvas]);

  // Load a template chosen from the left sidebar
  const handleSelectTemplate = (tpl) => {
    if (!canvas) return;
    setTemplateId(tpl.id);
    setProjectName(`${tpl.name} Creative`);
    setActiveTemplateMeta(tpl);
    setCanvasDimensions(tpl.format, tpl.width, tpl.height);
    canvasUtils.loadTemplateData(canvas, tpl, () => {
      pushHistory();
    });
  };

  const handleFormatChange = (fmtName) => {
    const fmt = formatOptions.find(f => f.name === fmtName);
    if (fmt) {
      setCanvasDimensions(fmt.name, fmt.width, fmt.height);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full overflow-hidden bg-[#080A12]">
      
      {/* 1. TOP TOOLBAR */}
      <div className="h-14 border-b border-white/10 bg-[#0F1424]/90 backdrop-blur-md px-4 flex items-center justify-between gap-4 z-20 shrink-0">
        
        {/* Left: Project Title & Format Selector */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="font-medium text-xs sm:text-sm text-white bg-transparent hover:bg-white/[0.05] focus:bg-white/10 px-2 py-1 rounded border border-transparent focus:border-white/20 focus:outline-none transition-colors max-w-[200px] sm:max-w-[280px] truncate"
            title="Click to rename project"
          />

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="text-xs text-festive-textSecondary">Format:</span>
            <select
              value={canvasFormat}
              onChange={(e) => handleFormatChange(e.target.value)}
              className="text-xs bg-white/[0.05] border border-white/10 text-white rounded-liquid-sm px-2.5 py-1 focus:outline-none focus:border-festive-gold/40 cursor-pointer"
            >
              {formatOptions.map((f) => (
                <option key={f.name} value={f.name} className="bg-[#111522] text-white">
                  {f.name} ({f.width}×{f.height})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className={`p-2 rounded-liquid-sm transition-colors ${
              historyIndex > 0
                ? 'text-white hover:bg-white/10'
                : 'text-white/20 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className={`p-2 rounded-liquid-sm transition-colors ${
              historyIndex < history.length - 1
                ? 'text-white hover:bg-white/10'
                : 'text-white/20 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Preview, Save & Export */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-liquid-sm text-xs font-medium text-white bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
            title="Preview on Instagram / WhatsApp"
          >
            <Eye className="w-3.5 h-3.5 text-festive-gold" />
            <span>Preview</span>
          </button>

          <button
            onClick={handleSaveProject}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-liquid-sm text-xs font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/20 transition-all"
            title="Save Project (Ctrl+S)"
          >
            {saveStatus === 'saving' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-festive-gold" />
            ) : saveStatus === 'saved' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Save className="w-3.5 h-3.5 text-festive-gold" />
            )}
            <span>{saveStatus === 'saved' ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-liquid-sm text-xs font-bold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
            title="Download PNG / JPEG (Ctrl+E)"
          >
            <Download className="w-3.5 h-3.5 text-[#080A12]" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE (LEFT SIDEBAR, CANVAS, RIGHT INSPECTOR) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar onSelectTemplate={handleSelectTemplate} />

        {/* Center Fabric Canvas */}
        <CanvasEditor />

        {/* Right Inspector Sidebar */}
        <div className="w-72 sm:w-80 h-full border-l border-white/10 bg-[#0D111F]/90 backdrop-blur-md p-4 overflow-y-auto space-y-4 shrink-0">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-festive-gold" />
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-white">
                Properties
              </h3>
            </div>
            {selectedObject && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-festive-gold/15 text-festive-gold border border-festive-gold/30">
                {selectedObject.type}
              </span>
            )}
          </div>

          {selectedObject ? (
            ['text', 'textbox', 'i-text'].includes(selectedObject.type) ? (
              <TextEditor />
            ) : (
              <ImageEditor />
            )
          ) : (
            <div className="space-y-4 text-center py-8">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-festive-textSecondary">
                <Sparkles className="w-6 h-6 text-festive-gold/40" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white">No element selected</p>
                <p className="text-[11px] text-festive-textSecondary max-w-[200px] mx-auto">
                  Click on any text, shape, or image on the canvas to edit its properties.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-left space-y-2 text-xs">
                <p className="font-semibold text-festive-gold uppercase tracking-wider text-[10px]">
                  Canvas Details
                </p>
                <div className="flex justify-between text-festive-textSecondary">
                  <span>Format</span>
                  <span className="text-white">{canvasFormat}</span>
                </div>
                <div className="flex justify-between text-festive-textSecondary">
                  <span>Dimensions</span>
                  <span className="font-mono text-white">{canvasWidth} × {canvasHeight} px</span>
                </div>
                <div className="flex justify-between text-festive-textSecondary">
                  <span>Layers</span>
                  <span className="font-mono text-white">{canvas?.getObjects().length || 0}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Export Modal */}
      <ExportPanel
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Preview Modal */}
      <PreviewModal
        template={activeTemplateMeta || {
          name: projectName,
          category: 'Diwali Creative',
          width: canvasWidth,
          height: canvasHeight,
          editableFields: {
            headline: projectName,
            brandName: 'YOUR BRAND NAME',
            subheadline: 'Exclusive Diwali Special 2026',
            discount: 'FESTIVE SPECIAL',
            price: 'Limited Offer',
            cta: 'VISIT STORE'
          }
        }}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

    </div>
  );
}
