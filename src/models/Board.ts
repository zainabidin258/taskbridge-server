import mongoose, { Schema } from 'mongoose';
import { IBoardDocument } from '../types/Board';

const boardSchema = new Schema<IBoardDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: String, ref: 'User', required: true },
    members: [{ type: String, ref: 'User' }],
  },
  { timestamps: true }
);

const Board = mongoose.model<IBoardDocument>('Board', boardSchema);

export default Board;