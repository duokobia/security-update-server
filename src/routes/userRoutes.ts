import express from 'express';
import { handleCreateUser, handleGetUserById, handleGetUsers } from '../controllers/userController';

const router = express.Router();

router.post('/user', handleCreateUser);
router.get('/user', handleGetUsers);
router.get('/user/:id', handleGetUserById);

export default router;
