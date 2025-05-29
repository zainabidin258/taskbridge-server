import express from 'express';
import { createTask, getTasksByBoard } from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/board/:boardId', protect, getTasksByBoard);

export default router;
