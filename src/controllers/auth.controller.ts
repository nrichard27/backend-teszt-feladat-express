import { Router, Request, Response } from 'express';
import { dto } from '../middlewares/dto.handler';
import { token } from '../middlewares/token.guard';
import * as authService from '../services/auth.service';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { TokenType } from '../interfaces/token-type.enum';

const router = Router();

router.post('/login', dto(AuthLoginDto), (req: Request, res: Response) => {
    res.json(authService.login(req.body, req.ip));
});

router.post(
    '/register',
    dto(AuthRegisterDto),
    (req: Request, res: Response) => {
        res.json(authService.register(req.body, req.ip));
    },
);

router.get(
    '/refresh',
    token(TokenType.Refresh),
    (req: Request, res: Response) => {
        res.json(authService.refresh_token(req.user!, req.ip, req.token!));
    },
);

router.post(
    '/logout',
    token(TokenType.Refresh),
    (req: Request, res: Response) => {
        res.json(authService.logout(req.token!));
    },
);

export default router;
