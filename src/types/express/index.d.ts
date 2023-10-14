import { IUser } from '../../schemas/user.schema';

export {}

declare global {
  namespace Express {
    export interface Request {
        user?: IUser;
        token?: string;
    }
  }
}
