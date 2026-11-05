import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export const imageService = {
  /**
   * Process and optimize uploaded image
   */
  async processUploadedImage(filePath, options = {}) {
    const { maxWidth = 2000, maxHeight = 2000, quality = 85 } = options;
    const ext = path.extname(filePath).toLowerCase();
    const tempOutput = `${filePath}.optimized`;

    let pipeline = sharp(filePath).rotate(); // auto-rotate based on EXIF

    const metadata = await pipeline.metadata();

    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (ext === '.png') {
      await pipeline.png({ quality, compressionLevel: 8 }).toFile(tempOutput);
    } else if (ext === '.webp') {
      await pipeline.webp({ quality }).toFile(tempOutput);
    } else {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(tempOutput);
    }

    // Replace original with optimized version
    await fs.rename(tempOutput, filePath);

    const updatedMetadata = await sharp(filePath).metadata();
    return {
      width: updatedMetadata.width,
      height: updatedMetadata.height,
      format: updatedMetadata.format,
      size: updatedMetadata.size
    };
  },

  /**
   * Safely delete an uploaded file, preventing path traversal
   */
  async deleteFile(targetDir, filename) {
    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const fullPath = path.join(targetDir, safeFilename);

    try {
      await fs.unlink(fullPath);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      }
      throw err;
    }
  }
};
