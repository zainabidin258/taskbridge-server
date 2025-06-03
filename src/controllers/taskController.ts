import { Request, Response } from 'express';
import Task from '../models/Task';
import Board from '../models/Board';
import { IBoard, IBoardDocument } from '../types/Board';
import { verifyBoardOwnership } from '../utils/permissionUtils';
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
export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, description, status, board, assignedTo } = req.body;
  if (!title || !board) {
    res.status(400);
    throw new Error('Title and board are required');
  }
  
  await verifyBoardOwnership(board, req.userId ?? '');

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

  await verifyBoardOwnership(boardId, userId);

  const tasks = await Task.find({ board: boardId });

  res.status(200).json(tasks);
});

export const updateTask = asyncHandler(async (req: AuthRequest, res: Response): Promise <void> => {
  const userId = req.userId;
  const { taskId } = req.params;

  if (!req.body) {
  res.status(400);
  throw new Error("Request body is missing");
}
  const { title, description, status, assignedTo } = req.body;

  const task = await Task.findById(taskId).populate<{ board: IBoard }>('board');
  if (!task){
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  await verifyBoardOwnership(task.board.owner, userId ?? '');
  
  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;
  task.assignedTo = assignedTo ?? task.assignedTo;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

export const deleteTask = asyncHandler (async (req: AuthRequest, res: Response): Promise <void> =>{
  const {taskId} = req.params;

  const task = await Task.findById(taskId).populate('board');
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }
    // @ts-ignore: populated board has owner field
  await verifyBoardOwnership(req.board.owner, userId);

  await task.deleteOne();
  res.status(200).json({ message: 'Task deleted' });
});
