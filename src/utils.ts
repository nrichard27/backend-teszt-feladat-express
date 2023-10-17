export function success(obj: object = {}): {
    code: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
} {
    return { code: 900, message: 'Success', ...obj };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function strip_unused(obj: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, __v, user, ...result } = obj.toObject();

    return result;
}
