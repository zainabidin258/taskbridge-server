import Board from '../models/Board';
import { Types } from 'mongoose';

export async function verifyBoardOwnership(boardId: string | Types.ObjectId, userId: string | Types.ObjectId) {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new Error('Board not found');
  }

  // Assuming board.owner or board.ownerId is the field storing owner
  // Adjust if your field name differs
  if (board.owner.toString() !== userId.toString()) {
    throw new Error('User not authorized to access this board');
  }

  return board;
}
