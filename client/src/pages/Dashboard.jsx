import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  Palette,
  FolderHeart,
  LayoutGrid,
  Clock,
  ArrowRight,
  Flame,
  Trash2,
  ExternalLink
} from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import TemplateCard from '../components/TemplateCard.jsx';
import PreviewModal from '../components/PreviewModal.jsx';
import { useTemplates } from '../hooks/useTemplates.js';
import { projectService } from '../services/projectService.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const { templates, categories, activePreviewTemplate, setActivePreview } = useTemplates();
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await projectService.getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, []);

  const popularTemplates = templates.filter(t => t.isPopular).slice(0, 4);

  const handleDeleteProject = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this saved project?')) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. WELCOME BANNER (LIQUID GLASS) */}
      <div className="relative rounded-liquid-lg border border-white/90 bg-white/75 backdrop-blur-glass shadow-glass-elevated p-6 sm:p-10 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Festive Ad Studio • Liquid Glass Workspace</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0F172A]">
            Shubh Deepawali Creative Studio
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Customize 100+ high-converting Diwali advertisements, upload your branding, and download print-ready promotional creatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/editor"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-liquid text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Create New Design</span>
          </Link>

          <Link
            to="/templates"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-liquid text-sm font-bold text-[#0F172A] bg-white/80 border border-white/90 hover:bg-white shadow-sm transition-all"
          >
            <LayoutGrid className="w-4 h-4 text-amber-600" />
            <span>Browse Templates</span>
          </Link>
        </div>
      </div>

      {/* 2. RECENTLY CREATED DESIGNS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-amber-600" />
            <h2 className="font-serif font-black text-xl text-[#0F172A]">Your Saved Projects</h2>
            <span className="text-xs text-[#64748B] font-mono font-bold">({projects.length})</span>
          </div>
          <Link
            to="/my-designs"
            className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            View all projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loadingProjects ? (
          <div className="p-8 text-center text-xs text-[#64748B]">Loading projects...</div>
        ) : projects.length === 0 ? (
          <GlassCard className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center text-amber-600 shadow-sm">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-[#0F172A]">No saved designs yet</h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Start by picking a Diwali template or opening a blank canvas in the design studio.
            </p>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-amber-600 px-4 py-2 rounded-liquid-sm shadow-sm"
            >
              Start Your First Design
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.slice(0, 4).map((p) => (
              <GlassCard
                key={p.id}
                onClick={() => navigate(`/editor?projectId=${p.id}`)}
                className="p-4 flex flex-col justify-between group cursor-pointer"
              >
                <div className="aspect-square rounded-liquid-sm bg-[#080d1e] border border-black/10 p-3 flex flex-col items-center justify-center text-center overflow-hidden mb-3">
                  <Palette className="w-8 h-8 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-serif font-bold text-xs text-white line-clamp-2">{p.name}</p>
                  <span className="text-[10px] text-amber-400 mt-1 font-mono">{p.format}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5">
                  <span className="text-[10px] text-[#64748B] flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" />
                    {new Date(p.updatedAt || p.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDeleteProject(p.id, e)}
                      className="p-1 text-[#64748B] hover:text-red-500 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-1 text-amber-700">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* 3. POPULAR TEMPLATES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="font-serif font-black text-xl text-[#0F172A]">Popular Diwali Templates</h2>
          </div>
          <Link
            to="/templates"
            className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            Explore 100+ templates <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {popularTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={(tpl) => setActivePreview(tpl)}
            />
          ))}
        </div>
      </div>

      {/* 4. TEMPLATE CATEGORIES QUICK SHORTCUTS */}
      <div className="space-y-4">
        <h2 className="font-serif font-black text-xl text-[#0F172A]">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.filter(c => c !== 'All').map((cat) => (
            <GlassCard
              key={cat}
              onClick={() => navigate(`/templates?category=${encodeURIComponent(cat)}`)}
              className="p-4 text-center cursor-pointer group"
            >
              <p className="text-xs font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors">
                {cat}
              </p>
              <p className="text-[10px] text-[#64748B] mt-0.5">Explore collection →</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        template={activePreviewTemplate}
        isOpen={!!activePreviewTemplate}
        onClose={() => setActivePreview(null)}
      />
    </div>
  );
}
