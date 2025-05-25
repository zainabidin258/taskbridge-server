import mongoose from 'mongoose';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  board: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
