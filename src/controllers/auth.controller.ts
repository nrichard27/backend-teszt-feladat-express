import { Router, Request, Response, NextFunction } from 'express';
import { dto } from '../middlewares/dto.handler';
import { token } from '../middlewares/token.guard';
import * as authService from '../services/auth.service';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { TokenType } from '../interfaces/token-type.enum';

const router = Router();

router.post(
    '/login',
    dto(AuthLoginDto),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await authService.login(req.body, req.ip).catch((err) => next(err)),
        );
    },
);

router.post(
    '/register',
    dto(AuthRegisterDto),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await authService
                .register(req.body, req.ip)
                .catch((err) => next(err)),
        );
    },
);

router.get(
    '/refresh',
    token(TokenType.Refresh),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await authService
                .refresh_token(req.user!, req.ip, req.token!)
                .catch((err) => next(err)),
        );
    },
);

router.post(
    '/logout',
    token(TokenType.Refresh),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await authService.logout(req.token!).catch((err) => next(err)),
        );
    },
);

export default router;
