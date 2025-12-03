// routes/boardRoutes.ts
import express from 'express';
import { createBoard, getBoards, updateBoard, deleteBoard } from '../controllers/boardController';
import { protect } from '../middlewares/authMiddleware';
import { isBoardOwnerOrAdmin } from '../middlewares/role';
import { getBoardById } from '../controllers/boardController';

const router = express.Router();

router.post('/', protect, createBoard);
router.get('/', protect, getBoards);
router.get('/:boardId', protect, getBoardById);
router.patch('/:id', protect, updateBoard);
router.delete('/:id', protect, isBoardOwnerOrAdmin, deleteBoard);


export default router;
