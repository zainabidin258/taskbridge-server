import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
  userId?: string; // Optional userId to be set by the middleware
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      req.userId = decoded.id; // Set userId for further use in the request

      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }
      return next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  res.status(401).json({ message: 'Not authorized, no token' });
};
