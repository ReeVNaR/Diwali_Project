import { exportService } from '../services/exportService.js';

export const exportController = {
  async exportPng(req, res, next) {
    try {
      const { image, width, height } = req.body;
      if (!image) {
        return res.status(400).json({
          success: false,
          error: 'Image data (base64 string) is required for PNG export'
        });
      }

      const result = await exportService.exportDesign(image, 'png', { width, height });

      return res.json({
        success: true,
        message: 'PNG creative generated successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  },

  async exportJpeg(req, res, next) {
    try {
      const { image, width, height, quality = 95 } = req.body;
      if (!image) {
        return res.status(400).json({
          success: false,
          error: 'Image data (base64 string) is required for JPEG export'
        });
      }

      const result = await exportService.exportDesign(image, 'jpeg', { width, height, quality });

      return res.json({
        success: true,
        message: 'JPEG creative generated successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
};
