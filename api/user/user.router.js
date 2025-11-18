import express from 'express';
import { createUser, getUser, getUsers, removeUser, updateUser } from './user.controller.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:username', getUser);

router.put('/:userId', updateUser);

router.delete('/:userId', removeUser);

export const userRoutes = router;
