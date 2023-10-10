import { NextFunction, Request, Response } from 'express';
import {
    ForbiddenException,
    UnauthorizedException,
} from '../exceptions/auth.exception';
import * as tokenService from '../services/token.service';
import * as userService from '../services/user.service';
import { TokenType } from '../interfaces/token-type.enum';

export function token(type: TokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const [ty, to] = req.headers.authorization?.split(' ') ?? [];
        const token = ty === 'Bearer' ? to : undefined;

        if (!token) {
            return next(new UnauthorizedException());
        }

        const decoded = tokenService.decrypt_token(type, token);

        if (!decoded) {
            return next(new UnauthorizedException());
        }

        if (decoded.ip_address != req.ip) {
            return next(new ForbiddenException());
        }

        const user = await userService.find_one_by_id(decoded.user_id);

        if (!user) {
            return next(new UnauthorizedException());
        }

        req.token = token;
        req.user = user;

        next();
    };
}
