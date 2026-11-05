import path from 'path';
import { imageService } from '../services/imageService.js';
import { config } from '../config/config.js';

export const uploadController = {
  async uploadLogo(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No logo file uploaded'
        });
      }

      // Optimize image via Sharp
      const processed = await imageService.processUploadedImage(req.file.path, {
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 90
      });

      const assetUrl = `/uploads/logos/${req.file.filename}`;

      return res.status(201).json({
        success: true,
        message: 'Logo uploaded and optimized successfully',
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          url: assetUrl,
          mimetype: req.file.mimetype,
          size: processed.size || req.file.size,
          width: processed.width,
          height: processed.height
        }
      });
    } catch (err) {
      next(err);
    }
  },

  async uploadProduct(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No product image uploaded'
        });
      }

      // Optimize image via Sharp
      const processed = await imageService.processUploadedImage(req.file.path, {
        maxWidth: 2000,
        maxHeight: 2000,
        quality: 85
      });

      const assetUrl = `/uploads/products/${req.file.filename}`;

      return res.status(201).json({
        success: true,
        message: 'Product image uploaded and optimized successfully',
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          url: assetUrl,
          mimetype: req.file.mimetype,
          size: processed.size || req.file.size,
          width: processed.width,
          height: processed.height
        }
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteUpload(req, res, next) {
    try {
      const { filename } = req.params;
      const type = req.query.type === 'logo' ? 'logos' : 'products';
      const targetDir = path.join(config.paths.uploads, type);

      const deleted = await imageService.deleteFile(targetDir, filename);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'File not found or already deleted'
        });
      }

      return res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
};
