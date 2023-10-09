import { IUser } from '../../schemas/user.schema';

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser;
        token?: string;
    }
}
