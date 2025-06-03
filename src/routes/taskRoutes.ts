import express from 'express';
import { createTask, getTasksByBoard, updateTask, deleteTask } from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/board/:boardId', protect, getTasksByBoard);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask)

export default router;
