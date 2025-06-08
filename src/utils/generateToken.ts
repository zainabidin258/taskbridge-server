import jwt from 'jsonwebtoken';
import { UserRole } from '../types/User';

export const generateToken = (id: string, role: UserRole = 'user') => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};
