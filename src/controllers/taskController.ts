import { Request, Response } from 'express';
import Task from '../models/Task';
import Board from '../models/Board';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
// import "../types/express";
interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}
// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, board, assignedTo } = req.body;

  if (!title || !board) {
    res.status(400);
    throw new Error('Title and board are required');
  }

  const task = await Task.create({
    title,
    description,
    status,
    board,
    assignedTo,
  });

  res.status(201).json(task);
});

// @desc    Get all tasks for a specific board
// @route   GET /api/tasks/board/:boardId
// @access  Private
export const getTasksByBoard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { boardId } = req.params;
  const userId = req.userId;

  if (!userId) {
    res.status(401);
    throw new Error('Unauthorized: User ID is required');
  }

  if (!boardId) {
    res.status(400);
    throw new Error('Board ID is required');
  }

  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    res.status(400);
    throw new Error('Invalid Board ID format');
  }

  const board = await Board.findById(boardId);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  if (board.owner.toString() !== userId && !board.members?.includes(userId)) {
    res.status(403);
    throw new Error('Not authorized to access tasks of this board');
  }

  const tasks = await Task.find({ board: boardId });

  res.status(200).json(tasks);
});

