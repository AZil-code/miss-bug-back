import express from 'express';
import { createBug, getBugById, getBugs, removeBug, updateBug } from './bug.controller.js';
import { requireAuth } from '../../middlewares/require-auth.middleware.js';

const router = express.Router();

router.get('/', getBugs);

router.post('/', requireAuth, createBug);

router.get('/:bugId', getBugById);

router.put('/:bugId', requireAuth, updateBug);

router.delete('/:bugId', requireAuth, removeBug);

export const bugRoutes = router;
