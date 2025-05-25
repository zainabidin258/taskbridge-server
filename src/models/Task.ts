import mongoose, { Schema, Model } from 'mongoose';
import { ITask } from '../types/Task';

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Task: Model<ITask> = mongoose.model('Task', TaskSchema);

export default Task;
