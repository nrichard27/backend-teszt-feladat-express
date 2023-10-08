import { IUser } from './schemas/user.schema';

export function success(obj: object = {}): {
    code: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
} {
    return { code: 900, message: 'Success', ...obj };
}

export function strip_password(user: IUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
}
