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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-festive-gold/15 text-festive-gold text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Workspace Project Library</span>
          </div>
          <h1 className="font-serif font-black text-3xl text-white">My Saved Designs</h1>
          <p className="text-sm text-festive-textSecondary mt-1">
            Reopen, edit, duplicate, and export all your custom Diwali creative campaigns.
          </p>
        </div>

        <Link
          to="/editor"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-liquid text-sm font-bold text-[#080A12] bg-gradient-to-r from-festive-gold to-festive-orange shadow-gold-glow hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#080A12]" />
          <span>New Creative</span>
        </Link>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <LoadingScreen message="Loading saved projects..." />
      ) : projects.length === 0 ? (
        <div className="p-16 text-center space-y-4 rounded-liquid border border-white/10 bg-white/[0.02]">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-festive-gold">
            <FolderHeart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">No saved projects yet</h3>
          <p className="text-xs text-festive-textSecondary max-w-sm mx-auto">
            Create your first Diwali advertisement creative from 100+ templates or build one from scratch in the studio.
          </p>
          <div className="pt-2">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#080A12] bg-festive-gold px-5 py-2.5 rounded-liquid shadow-gold-glow"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              onClick={() => navigate(`/editor?projectId=${project.id}`)}
              className="overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              {/* Preview container */}
              <div className="relative aspect-square w-full bg-[#080d1e] border-b border-white/10 flex items-center justify-center overflow-hidden">
                {project.previewThumbnail ? (
                  <img
                    src={project.previewThumbnail}
                    alt={project.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Palette className="w-10 h-10 text-festive-gold mx-auto mb-2 opacity-70 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-serif font-bold text-white line-clamp-1">{project.name}</p>
                  </div>
                )}

                {/* Format Tag */}
                <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-white/90 border border-white/10 backdrop-blur-sm">
                  {project.format || '1080×1080'}
                </span>
              </div>

              {/* Project Card Footer */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-sm text-white group-hover:text-festive-gold transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-[11px] text-festive-textSecondary flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Edited {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-festive-gold flex items-center gap-1 group-hover:underline">
                    Edit in Studio <ExternalLink className="w-3 h-3" />
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDuplicate(project, e)}
                      className="p-1.5 rounded-liquid-sm text-festive-textSecondary hover:text-white hover:bg-white/10 transition-colors"
                      title="Duplicate Project"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(project.id, e)}
                      className="p-1.5 rounded-liquid-sm text-festive-textSecondary hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
