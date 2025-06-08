import { IUserDocument } from './User';


declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: IUserDocument | null;
    }
  }
}


export {};