import { templateService } from '../services/templateService.js';

export const templateController = {
  async getTemplates(req, res, next) {
    try {
      const { category, format, search, sort } = req.query;
      const templates = await templateService.getAllTemplates({ category, format, search, sort });
      return res.json({
        success: true,
        count: templates.length,
        data: templates
      });
    } catch (err) {
      next(err);
    }
  },

  async getTemplateById(req, res, next) {
    try {
      const { id } = req.params;
      const template = await templateService.getTemplateById(id);
      if (!template) {
        return res.status(404).json({
          success: false,
          error: `Template with ID '${id}' not found`
        });
      }
      return res.json({
        success: true,
        data: template
      });
    } catch (err) {
      next(err);
    }
  },

  async getTemplatesByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const templates = await templateService.getTemplatesByCategory(category);
      return res.json({
        success: true,
        count: templates.length,
        category,
        data: templates
      });
    } catch (err) {
      next(err);
    }
  },

  async getCategories(req, res, next) {
    try {
      const categories = await templateService.getCategories();
      return res.json({
        success: true,
        data: categories
      });
    } catch (err) {
      next(err);
    }
  }
};
