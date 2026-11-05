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
      
      {/* 1. WELCOME BANNER & ACTION HEADER */}
      <div className="relative rounded-liquid-lg border border-white/10 bg-gradient-to-r from-[#101424] via-[#1A1226] to-[#0D101C] p-6 sm:p-10 shadow-glass overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-festive-gold/15 text-festive-gold text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>Welcome to Festive Ad Studio Workspace</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-white">
            Shubh Deepawali Creative Suite
          </h1>
          <p className="text-sm text-festive-textSecondary">
            Customize 100+ high-converting Diwali advertisements, upload your shop branding, and download print-ready promotional creatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/editor"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-liquid text-sm font-bold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-[#080A12]" />
            <span>Create New Design</span>
          </Link>

          <Link
            to="/templates"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-liquid text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
          >
            <LayoutGrid className="w-4 h-4 text-festive-gold" />
            <span>Browse Templates</span>
          </Link>
        </div>
      </div>

      {/* 2. RECENTLY CREATED DESIGNS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-festive-gold" />
            <h2 className="font-serif font-bold text-xl text-white">Your Saved Projects</h2>
            <span className="text-xs text-festive-textSecondary font-mono">({projects.length})</span>
          </div>
          <Link
            to="/my-designs"
            className="text-xs font-medium text-festive-gold hover:underline flex items-center gap-1"
          >
            View all projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loadingProjects ? (
          <div className="p-8 text-center text-xs text-festive-textSecondary">Loading projects...</div>
        ) : projects.length === 0 ? (
          <GlassCard className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-festive-gold">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-sm text-white">No saved designs yet</h3>
            <p className="text-xs text-festive-textSecondary max-w-sm mx-auto">
              Start by picking a Diwali template or opening a blank canvas in the design studio.
            </p>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#080A12] bg-festive-gold px-4 py-2 rounded-liquid-sm shadow-sm"
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
                <div className="aspect-square rounded-liquid-sm bg-[#080d1e] border border-white/10 p-3 flex flex-col items-center justify-center text-center overflow-hidden mb-3">
                  <Palette className="w-8 h-8 text-festive-gold mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-serif font-bold text-xs text-white line-clamp-2">{p.name}</p>
                  <span className="text-[10px] text-festive-gold mt-1 font-mono">{p.format}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <span className="text-[10px] text-festive-textSecondary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(p.updatedAt || p.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDeleteProject(p.id, e)}
                      className="p-1 text-festive-textSecondary hover:text-red-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-1 text-festive-gold">
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
            <Sparkles className="w-5 h-5 text-festive-gold" />
            <h2 className="font-serif font-bold text-xl text-white">Popular Diwali Templates</h2>
          </div>
          <Link
            to="/templates"
            className="text-xs font-medium text-festive-gold hover:underline flex items-center gap-1"
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
        <h2 className="font-serif font-bold text-xl text-white">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.filter(c => c !== 'All').map((cat) => (
            <GlassCard
              key={cat}
              onClick={() => navigate(`/templates?category=${encodeURIComponent(cat)}`)}
              className="p-4 text-center cursor-pointer group"
            >
              <p className="text-xs font-semibold text-white group-hover:text-festive-gold transition-colors">
                {cat}
              </p>
              <p className="text-[10px] text-festive-textSecondary mt-0.5">Explore collection →</p>
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
