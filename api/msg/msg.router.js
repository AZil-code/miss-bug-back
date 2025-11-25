import express from 'express';
import { addMsg, removeMsg, updateMsg } from './msg.controller.js';
import { requireAuth } from '../../middlewares/require-auth.middleware.js';

const router = express.Router();

// router.get('/');

router.post('/', requireAuth, addMsg);

router.put('/', requireAuth, updateMsg);

router.delete('/:msgId', requireAuth, removeMsg);

export const msgRoutes = router;
