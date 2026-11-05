import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderHeart,
  Plus,
  Palette,
  Clock,
  Trash2,
  Copy,
  ExternalLink,
  Flame,
  ArrowRight
} from 'lucide-react';
import GlassCard from '../components/GlassCard.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';
import { projectService } from '../services/projectService.js';

export default function MyDesigns() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectService.getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  const handleDuplicate = async (project, e) => {
    e.stopPropagation();
    try {
      const copyPayload = {
        name: `${project.name} (Copy)`,
        templateId: project.templateId,
        format: project.format,
        width: project.width,
        height: project.height,
        canvasData: project.canvasData,
        previewThumbnail: project.previewThumbnail
      };
      await projectService.createProject(copyPayload);
      fetchProjects();
    } catch (err) {
      alert('Failed to duplicate project');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold mb-2 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Workspace Project Library</span>
          </div>
          <h1 className="font-serif font-black text-3xl text-[#0F172A]">My Saved Designs</h1>
          <p className="text-sm text-[#475569] mt-1">
            Reopen, edit, duplicate, and export all your custom Diwali creative campaigns.
          </p>
        </div>

        <Link
          to="/editor"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-liquid text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-gold-glow hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>New Creative</span>
        </Link>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <LoadingScreen message="Loading saved projects..." />
      ) : projects.length === 0 ? (
        <div className="p-16 text-center space-y-4 rounded-liquid border border-white/90 bg-white/75 backdrop-blur-glass shadow-glass">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-600 shadow-sm">
            <FolderHeart className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-black text-lg text-[#0F172A]">No saved projects yet</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Create your first Diwali advertisement creative from 100+ templates or build one from scratch in the studio.
          </p>
          <div className="pt-2">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 rounded-liquid shadow-gold-glow"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              onClick={() => navigate(`/editor?projectId=${project.id}`)}
              className="overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              {/* Preview container */}
              <div className="relative aspect-square w-full bg-[#080d1e] border-b border-black/5 flex items-center justify-center overflow-hidden rounded-t-liquid">
                {project.previewThumbnail ? (
                  <img
                    src={project.previewThumbnail}
                    alt={project.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Palette className="w-10 h-10 text-amber-400 mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-serif font-bold text-white line-clamp-1">{project.name}</p>
                  </div>
                )}

                {/* Format Tag */}
                <span className="absolute top-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/70 text-white/95 border border-white/20 backdrop-blur-sm">
                  {project.format || '1080×1080'}
                </span>
              </div>

              {/* Project Card Footer */}
              <div className="p-4 space-y-3 bg-white/70">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#0F172A] group-hover:text-amber-700 transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Edited {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:underline">
                    Edit in Studio <ExternalLink className="w-3 h-3" />
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDuplicate(project, e)}
                      className="p-1.5 rounded-liquid-sm text-[#64748B] hover:text-[#0F172A] hover:bg-black/5 transition-colors"
                      title="Duplicate Project"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(project.id, e)}
                      className="p-1.5 rounded-liquid-sm text-[#64748B] hover:text-red-600 hover:bg-red-500/10 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

    </div>
  );
}
