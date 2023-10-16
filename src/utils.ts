export function success(obj: object = {}): {
    code: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
} {
    return { code: 900, message: 'Success', ...obj };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function strip_unused(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, _id, __v, ...result } = user.toObject();

    return result;
}
