import { NextFunction, Request, Response } from 'express';

export function error_handler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err.stack);
    res.status(500).json({
        code: '0',
        message: 'Something went wrong!',
    });
    next();
}
