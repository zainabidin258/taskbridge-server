import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Board from '../models/Board';

export const isBoardOwnerOrAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = req.params.boardId || req.params.id || req.body.board;

    if (!boardId) {
      res.status(400);
      throw new Error('Board ID is required');
    }

    const board = await Board.findById(boardId);
    if (!board) {
      res.status(404);
      throw new Error('Board not found');
    }

    const isOwner = board.owner.toString() === req.userId;
    const isAdmin = req.role === 'admin';

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error('Not authorized');
    }

    next();
  }
);