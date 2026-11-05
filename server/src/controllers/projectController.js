import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JsonStorageRepository } from '../services/storageService.js';
import { config } from '../config/config.js';

const projectsRepo = new JsonStorageRepository(
  path.join(config.paths.data, 'projects.json'),
  []
);

export const projectController = {
  async getProjects(req, res, next) {
    try {
      const projects = await projectsRepo.getAll();
      return res.json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (err) {
      next(err);
    }
  },

  async getProjectById(req, res, next) {
    try {
      const { id } = req.params;
      const project = await projectsRepo.getById(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          error: `Project with ID '${id}' not found`
        });
      }
      return res.json({
        success: true,
        data: project
      });
    } catch (err) {
      next(err);
    }
  },

  async createProject(req, res, next) {
    try {
      const { name, templateId, canvasData, previewThumbnail, format, width, height } = req.body;

      const newProject = {
        id: uuidv4(),
        name: name || 'Untitled Festive Creative',
        templateId: templateId || null,
        format: format || 'Instagram Square',
        width: width || 1080,
        height: height || 1080,
        canvasData: canvasData || {},
        previewThumbnail: previewThumbnail || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const saved = await projectsRepo.insert(newProject);

      return res.status(201).json({
        success: true,
        message: 'Project saved successfully',
        data: saved
      });
    } catch (err) {
      next(err);
    }
  },

  async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const { name, canvasData, previewThumbnail, format, width, height } = req.body;

      const updates = {};
      if (name !== undefined) updates.name = name;
      if (canvasData !== undefined) updates.canvasData = canvasData;
      if (previewThumbnail !== undefined) updates.previewThumbnail = previewThumbnail;
      if (format !== undefined) updates.format = format;
      if (width !== undefined) updates.width = width;
      if (height !== undefined) updates.height = height;

      const updated = await projectsRepo.update(id, updates);
      if (!updated) {
        return res.status(404).json({
          success: false,
          error: `Project with ID '${id}' not found`
        });
      }

      return res.json({
        success: true,
        message: 'Project updated successfully',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await projectsRepo.delete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: `Project with ID '${id}' not found`
        });
      }

      return res.json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
};
