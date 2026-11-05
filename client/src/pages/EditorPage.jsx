import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Undo2,
  Redo2,
  Save,
  Download,
  Eye,
  Sparkles,
  Sliders,
  Check,
  Loader2,
  ChevronLeft,
  LayoutGrid,
  Type,
  UploadCloud,
  Paintbrush,
  Layers,
  X
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
    activeTab,
    setActiveTab,
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

  // Mobile Bottom Sheet State
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileSheetTab, setMobileSheetTab] = useState('templates'); // 'templates' | 'text' | 'uploads' | 'elements' | 'background' | 'layers' | 'properties'

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

  // Automatically open mobile properties sheet when an element is tapped on mobile
  useEffect(() => {
    if (selectedObject && window.innerWidth < 1024) {
      setMobileSheetTab('properties');
      setMobileSheetOpen(true);
    }
  }, [selectedObject]);

  // Load a template chosen from the sidebar / mobile sheet
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

  const openMobileTab = (tabId) => {
    setMobileSheetTab(tabId);
    if (tabId !== 'properties') {
      setActiveTab(tabId);
    }
    setMobileSheetOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#FFF8F0] to-[#F1F5F9] relative">
      
      {/* 1. LIQUID GLASS TOP TOOLBAR (RESPONSIVE) */}
      <div className="h-14 border-b border-white/80 bg-white/75 backdrop-blur-glass shadow-glass px-2.5 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 z-20 shrink-0">
        
        {/* Left: Return, Title & Format Selector */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <Link
            to="/templates"
            className="p-1.5 rounded-liquid-sm text-[#475569] hover:text-[#0F172A] hover:bg-black/5 transition-colors flex items-center gap-1 text-xs font-semibold shrink-0"
            title="Return to Templates Gallery"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden md:inline">Templates</span>
          </Link>

          <div className="h-4 w-[1px] bg-black/10 mx-0.5 sm:mx-1 shrink-0" />

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="font-bold text-xs sm:text-sm text-[#0F172A] bg-transparent hover:bg-black/[0.04] focus:bg-white px-1.5 py-1 rounded-liquid-sm border border-transparent focus:border-amber-500/40 focus:outline-none transition-colors max-w-[110px] sm:max-w-[220px] md:max-w-[260px] truncate"
            title="Click to rename creative"
          />

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-black/10 shrink-0">
            <span className="text-xs text-[#64748B] font-medium">Format:</span>
            <select
              value={canvasFormat}
              onChange={(e) => handleFormatChange(e.target.value)}
              className="text-xs bg-white/80 border border-white/90 text-[#0F172A] rounded-liquid-sm px-2.5 py-1 focus:outline-none focus:border-amber-500/50 cursor-pointer shadow-sm font-semibold"
            >
              {formatOptions.map((f) => (
                <option key={f.name} value={f.name} className="bg-white text-[#0F172A]">
                  {f.name} ({f.width}×{f.height})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white/60 p-0.5 sm:p-1 rounded-liquid-sm border border-white/80 shadow-sm shrink-0">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className={`p-1.5 rounded-liquid-sm transition-colors ${
              historyIndex > 0
                ? 'text-[#0F172A] hover:bg-black/5'
                : 'text-black/20 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-liquid-sm transition-colors ${
              historyIndex < history.length - 1
                ? 'text-[#0F172A] hover:bg-black/5'
                : 'text-black/20 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Preview, Save & Export */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-liquid-sm text-xs font-semibold text-[#0F172A] bg-white/80 border border-white/90 hover:bg-white shadow-sm transition-colors"
            title="Preview on Instagram / WhatsApp"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Preview</span>
          </button>

          <button
            onClick={handleSaveProject}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-liquid-sm text-xs font-bold text-[#0F172A] bg-white/90 border border-white hover:bg-white shadow-sm transition-all"
            title="Save Project (Ctrl+S)"
          >
            {saveStatus === 'saving' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
            ) : saveStatus === 'saved' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Save className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="hidden sm:inline">{saveStatus === 'saved' ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-liquid-sm text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
            title="Download PNG / JPEG (Ctrl+E)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE (RESPONSIVE: CANVAS FILLS SCREEN ON MOBILE, SIDEBARS ON DESKTOP) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar (Desktop Only) */}
        <Sidebar onSelectTemplate={handleSelectTemplate} />

        {/* Center Fabric Canvas (Calculated to 100% fit without overflow) */}
        <div className="flex-1 h-full w-full overflow-hidden pb-16 lg:pb-0">
          <CanvasEditor />
        </div>

        {/* Right Inspector Sidebar (Desktop Only) */}
        <div className="hidden lg:block w-72 sm:w-80 h-full border-l border-white/80 bg-white/70 backdrop-blur-glass p-4 overflow-y-auto space-y-4 shrink-0 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-black/5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif font-black text-xs uppercase tracking-wider text-[#0F172A]">
                Properties
              </h3>
            </div>
            {selectedObject && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 font-bold border border-amber-500/30">
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
            <div className="space-y-4 text-center py-10">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center text-amber-600 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#0F172A]">No element selected</p>
                <p className="text-[11px] text-[#64748B] max-w-[200px] mx-auto leading-relaxed">
                  Click on any text, shape, or photo on the canvas to inspect and customize it.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 text-left space-y-2 text-xs">
                <p className="font-bold text-amber-700 uppercase tracking-wider text-[10px]">
                  Canvas Specifications
                </p>
                <div className="flex justify-between text-[#64748B]">
                  <span>Format</span>
                  <span className="text-[#0F172A] font-semibold">{canvasFormat}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Native Size</span>
                  <span className="font-mono text-[#0F172A] font-bold">{canvasWidth} × {canvasHeight} px</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Layers</span>
                  <span className="font-mono text-[#0F172A] font-bold">{canvas?.getObjects().length || 0}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. MOBILE STUDIO BOTTOM ACTION BAR (Touch-Friendly Native Canva Experience) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-white/95 backdrop-blur-2xl border-t border-black/10 z-30 px-2 flex items-center justify-around shadow-lg">
        {[
          { id: 'templates', label: 'Templates', icon: LayoutGrid },
          { id: 'text', label: 'Text', icon: Type },
          { id: 'uploads', label: 'Uploads', icon: UploadCloud },
          { id: 'elements', label: 'Festive', icon: Sparkles },
          { id: 'background', label: 'Colors', icon: Paintbrush },
          { id: 'layers', label: 'Layers', icon: Layers },
          { id: 'properties', label: 'Edit', icon: Sliders, badge: !!selectedObject }
        ].map((tab) => {
          const Icon = tab.icon;
          const isCurrent = mobileSheetOpen && mobileSheetTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => openMobileTab(tab.id)}
              className={`
                relative flex flex-col items-center justify-center py-1.5 px-2 rounded-liquid-sm text-[10px] font-bold transition-all
                ${isCurrent
                  ? 'text-amber-800 bg-amber-500/15'
                  : 'text-[#64748B] hover:text-[#0F172A]'
                }
              `}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 mb-0.5 ${isCurrent ? 'text-amber-600' : 'text-[#64748B]'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </div>
              <span className="truncate max-w-[50px]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. MOBILE SLIDE-UP BOTTOM SHEET DRAWER */}
      <AnimatePresence>
        {mobileSheetOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSheetOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            />

            {/* Slide-Up Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 inset-x-0 max-h-[75vh] min-h-[360px] bg-white/95 backdrop-blur-2xl rounded-t-[26px] border-t border-white shadow-2xl z-50 p-4 pb-8 flex flex-col overflow-hidden"
            >
              {/* Drag Pill Handle */}
              <div className="w-12 h-1.5 rounded-full bg-black/20 mx-auto mb-3 shrink-0" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-3 border-b border-black/5 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    {mobileSheetTab === 'properties' ? 'Element Properties' : `Studio: ${mobileSheetTab}`}
                  </span>
                </div>
                <button
                  onClick={() => setMobileSheetOpen(false)}
                  className="p-1 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-black/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sheet Body Content */}
              <div className="flex-1 overflow-y-auto pt-3">
                {mobileSheetTab === 'properties' ? (
                  selectedObject ? (
                    ['text', 'textbox', 'i-text'].includes(selectedObject.type) ? (
                      <TextEditor />
                    ) : (
                      <ImageEditor />
                    )
                  ) : (
                    <div className="text-center py-10 space-y-3">
                      <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                      <p className="text-xs font-bold text-[#0F172A]">No Element Selected</p>
                      <p className="text-[11px] text-[#64748B] max-w-xs mx-auto">
                        Tap any text, logo, or festive shape on the canvas above to customize its colors, fonts, and properties.
                      </p>
                      <button
                        onClick={() => openMobileTab('text')}
                        className="px-4 py-2 rounded-liquid text-xs font-bold text-white bg-amber-500 shadow-sm"
                      >
                        + Add New Text
                      </button>
                    </div>
                  )
                ) : (
                  <Sidebar
                    isMobileDrawer={true}
                    onCloseDrawer={() => setMobileSheetOpen(false)}
                    onSelectTemplate={handleSelectTemplate}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
