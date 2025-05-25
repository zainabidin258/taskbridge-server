// routes/boardRoutes.ts
import express from 'express';
import { createBoard, getBoards, updateBoard } from '../controllers/boardController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createBoard);
router.get('/', protect, getBoards);
router.patch('/:id', protect, updateBoard);

export default router;
