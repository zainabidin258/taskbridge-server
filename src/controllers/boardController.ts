import { Request, Response } from 'express';
import Board from '../models/Board';

// Import the extended type
interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const createBoard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, members } = req.body;
    const owner = req.userId;

    if (!owner) {
      res.status(401).json({ message: 'User ID not found on request' });
      return;
    }

    const newBoard = await Board.create({
      title,
      description,
      owner,
      members,
    });

    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({
      message: 'Failed to create board',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const getBoards = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Find boards where user is owner or a member
    const boards = await Board.find({
      $or: [{ owner: userId }, { members: userId }],
    });

    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch boards', error });
  }
};

export const updateBoard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const boardId = req.params.id;
    const { title, description } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Find the board to update
    const board = await Board.findById(boardId);
    if (!board) {
      res.status(404).json({ message: 'Board not found' });
      return;
    }

    // Only owner can update the board
    if (board.owner.toString() !== userId) {
      res.status(403).json({ message: 'Forbidden: Not the owner' });
      return;
    }

    // Update fields if provided
    if (title !== undefined) board.title = title;
    if (description !== undefined) board.description = description;

    await board.save();

    res.json(board);
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ message: 'Failed to update board', error });
  }
};

export const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params.id;
  const userId = req.userId;

  const board = await Board.findById(boardId);

  if (!board) {
    res.status(404).json({ message: 'Board not found' });
  }

  if (board?.owner.toString() !== userId) {
    res.status(403).json({ message: 'Not authorized to delete this board' });
  }

  await board?.deleteOne();
  res.status(200).json({ message: 'Board deleted successfully' });
};
