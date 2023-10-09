import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../exceptions/auth.exception';

import { Role } from '../interfaces/role.enum';

export function role(role: Role) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new Error(
                'You can not use a role guard before/without a token guard!',
            );
        }

        if (req.user!.role > role) {
            throw new ForbiddenException();
        }

        next();
    };
}
