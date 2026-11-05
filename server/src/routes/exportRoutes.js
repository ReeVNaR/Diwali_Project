import { Router } from 'express';
import { exportController } from '../controllers/exportController.js';

const router = Router();

router.post('/png', exportController.exportPng);
router.post('/jpeg', exportController.exportJpeg);

export default router;
