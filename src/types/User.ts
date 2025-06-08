import { Document, Types } from "mongoose";

export type UserRole = 'user' | 'admin' | 'moderator';
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
