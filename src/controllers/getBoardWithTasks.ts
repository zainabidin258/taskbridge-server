import { Request, Response } from 'express';
import Board from '../models/Board';
import { verifyBoardAccess } from '../utils/permissionUtils';
import Task from '../models/Task';
import expressAsyncHandler from 'express-async-handler';


export const getBoardWithTasks = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  const { id: boardId } = req.params;

  const board = await Board.findById(boardId);

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  // Permission check
  await verifyBoardAccess(boardId, userId ?? '');

  // Fetch tasks
  const tasks = await Task.find({ board: boardId });

  res.json({
    ...board.toObject(),
    tasks,
  });
});
