import { Request, Response } from 'express';
import Task from '../models/Task';
import asyncHandler from 'express-async-handler';

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
