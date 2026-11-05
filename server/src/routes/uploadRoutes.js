import { Router } from 'express';
import { uploadController } from '../controllers/uploadController.js';
import { uploadLogoMiddleware, uploadProductMiddleware } from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/logo', uploadLogoMiddleware, uploadController.uploadLogo);
router.post('/product', uploadProductMiddleware, uploadController.uploadProduct);
router.delete('/:filename', uploadController.deleteUpload);

export default router;
