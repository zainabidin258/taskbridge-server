// routes/boardRoutes.ts
import express from 'express';
import { createBoard, getBoards, updateBoard, deleteBoard } from '../controllers/boardController';
import { protect } from '../middlewares/authMiddleware';
import { getBoardWithTasks } from '../controllers/getBoardWithTasks';
import { isBoardOwnerOrAdmin } from '../middlewares/role';

const router = express.Router();

router.post('/', protect, createBoard);
router.get('/', protect, getBoards);
router.get("/:id/details", protect, getBoardWithTasks);
router.patch('/:id', protect, updateBoard);
router.delete('/:id', protect, isBoardOwnerOrAdmin, deleteBoard);


export default router;
