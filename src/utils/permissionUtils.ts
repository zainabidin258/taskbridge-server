import Board from '../models/Board';
import User from '../models/User';
import { Types } from 'mongoose';

export async function verifyBoardOwnership(boardId: string | Types.ObjectId, userId: string | Types.ObjectId) {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new Error('Board not found');
  }

  if (board.owner.toString() !== userId.toString()) {
    throw new Error('User not authorized to access this board');
  }

  return board;
}

export async function verifyBoardAccess(
  boardId: string | Types.ObjectId,
  userId: string
) {
  const board = await Board.findById(boardId);
  if (!board) throw new Error("Board not found");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Admin / Mod have access to everything
  if (user.role === "admin" || user.role === "moderator") return board;

  // Board owner is allowed
  if (board.owner.toString() === userId.toString()) return board;

  // Member is allowed
  if (board.members && board.members.includes(userId.toString())) {
    return board;
  }

  throw new Error("User not authorized to access this board");
}