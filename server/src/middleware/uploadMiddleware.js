import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';

// Configure Multer storage engine
const createStorage = (destinationDir) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueName = `${Date.now()}-${uuidv4().substring(0, 8)}${ext}`;
      cb(null, uniqueName);
    }
  });
};

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!config.allowedExtensions.includes(ext) || !config.allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and WebP images are allowed.'), false);
  }
  cb(null, true);
};

export const uploadLogoMiddleware = multer({
  storage: createStorage(config.paths.logos),
  limits: { fileSize: config.maxUploadSize },
  fileFilter
}).single('logo');

export const uploadProductMiddleware = multer({
  storage: createStorage(config.paths.products),
  limits: { fileSize: config.maxUploadSize },
  fileFilter
}).single('product');
