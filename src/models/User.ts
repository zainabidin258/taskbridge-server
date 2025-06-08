import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types/User';

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserModel>('User', userSchema);
export default User;
