import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: {
        id: string;
        // Add other user properties as needed
      };
    }
  }
}
