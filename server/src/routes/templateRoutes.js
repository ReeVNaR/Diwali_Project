import { Router } from 'express';
import { templateController } from '../controllers/templateController.js';

const router = Router();

router.get('/', templateController.getTemplates);
router.get('/categories', templateController.getCategories);
router.get('/category/:category', templateController.getTemplatesByCategory);
router.get('/:id', templateController.getTemplateById);

export default router;
