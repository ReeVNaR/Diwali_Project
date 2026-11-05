import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  maxUploadSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  paths: {
    root: rootDir,
    data: path.join(rootDir, 'src', 'data'),
    uploads: path.join(rootDir, 'uploads'),
    logos: path.join(rootDir, 'uploads', 'logos'),
    products: path.join(rootDir, 'uploads', 'products'),
    exports: path.join(rootDir, 'uploads', 'exports'),
  }
};
