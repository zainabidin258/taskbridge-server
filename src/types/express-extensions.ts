import { IUserDocument, UserRole } from './User';


declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: IUserDocument | null;
      role?: UserRole;
    }
  }
}


export {};