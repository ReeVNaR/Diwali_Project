import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';

export const exportService = {
  /**
   * Process and save high-resolution canvas export
   * @param {string} imageBase64 - Base64 encoded image string from canvas
   * @param {string} format - 'png' | 'jpeg'
   * @param {object} options - width, height, quality
   */
  async exportDesign(imageBase64, format = 'png', options = {}) {
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      throw new Error('Invalid image data provided for export');
    }

    // Strip prefix if present (e.g. data:image/png;base64,)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `festive_creative_${Date.now()}_${uuidv4().substring(0, 8)}.${format === 'jpeg' ? 'jpg' : 'png'}`;
    const outputPath = path.join(config.paths.exports, filename);

    let pipeline = sharp(buffer);

    const targetWidth = parseInt(options.width, 10);
    const targetHeight = parseInt(options.height, 10);

    if (targetWidth && targetHeight && targetWidth > 0 && targetHeight > 0) {
      pipeline = pipeline.resize(targetWidth, targetHeight, {
        fit: 'contain',
        background: { r: 8, g: 10, b: 18, alpha: 1 }
      });
    }

    if (format === 'jpeg') {
      await pipeline
        .jpeg({
          quality: options.quality ? Math.min(100, Math.max(50, parseInt(options.quality, 10))) : 95,
          chromaSubsampling: '4:4:4'
        })
        .toFile(outputPath);
    } else {
      await pipeline
        .png({
          compressionLevel: 7,
          palette: false
        })
        .toFile(outputPath);
    }

    const metadata = await sharp(outputPath).metadata();

    return {
      filename,
      url: `/uploads/exports/${filename}`,
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      size: metadata.size,
      createdAt: new Date().toISOString()
    };
  }
};
