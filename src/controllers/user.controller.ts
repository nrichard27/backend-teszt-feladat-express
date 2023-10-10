import { Router, Request, Response, NextFunction } from 'express';
import { token } from '../middlewares/token.guard';
import { TokenType } from '../interfaces/token-type.enum';
import * as userService from '../services/user.service';
import { role } from '../middlewares/role.guard';
import { Role } from '../interfaces/role.enum';
import { UserUpdateDto } from '../dto/user-update.dto';
import { dto } from '../middlewares/dto.handler';
import { UserCreateDto } from '../dto/user-create.dto';

const router = Router();

router.post(
    '/',
    dto(UserCreateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(await userService.create(req.body).catch((err) => next(err)));
    },
);

router.get(
    '/',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(await userService.get_all().catch((err) => next(err)));
    },
);

router.get(
    '/:id',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await userService
                .get_by_id(req.params.id)
                .catch((err) => next(err)),
        );
    },
);

router.patch(
    '/:id',
    dto(UserUpdateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await userService
                .update_by_id(req.params.id, req.body)
                .catch((err) => next(err)),
        );
    },
);

router.delete(
    '/:id',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await userService
                .delete_by_id(req.params.id)
                .catch((err) => next(err)),
        );
    },
);

router.get(
    '/@me',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(await userService.get_me(req.user!).catch((err) => next(err)));
    },
);

router.patch(
    '/@me',
    dto(UserUpdateDto),
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await userService
                .update_by_id(req.user!.id, req.body)
                .catch((err) => next(err)),
        );
    },
);

router.delete(
    '/@me',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await userService
                .delete_by_id(req.user!.id)
                .catch((err) => next(err)),
        );
    },
);

export default router;
