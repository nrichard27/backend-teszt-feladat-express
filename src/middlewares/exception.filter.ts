import { NextFunction, Request, Response } from 'express';
import { AuthException } from '../exceptions/auth.exception';
import { DtoException } from '../exceptions/dto.exception';

export function exception_filter(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof AuthException) {
        res.status(err.status).json({
            code: err.code,
            message: err.message,
        });
        next();
    } else if (err instanceof DtoException) {
        res.status(err.status).json({
            code: err.code,
            message: err.message,
            errors: err.errors,
        });
        next();
    } else {
        next(err);
    }
}
