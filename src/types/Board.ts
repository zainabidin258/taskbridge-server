import { Document } from 'mongoose';

export interface IBoard {
  title: string;
  description?: string;
  owner: string; // user id
  members?: string[]; // array of user ids
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBoardDocument extends IBoard, Document {}
