import { Router, Request, Response } from 'express';
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
    (req: Request, res: Response) => {
        res.json(userService.create(req.body));
    },
);

router.get(
    '/',
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(userService.get_all());
    },
);

router.get(
    '/:id',
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(userService.get_by_id(req.params.id));
    },
);

router.patch(
    '/:id',
    dto(UserUpdateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(userService.update_by_id(req.params.id, req.body));
    },
);

router.delete(
    '/:id',
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(userService.delete_by_id(req.params.id));
    },
);

router.get('/@me', token(TokenType.Access), (req: Request, res: Response) => {
    res.json(userService.get_me(req.user!));
});

router.patch(
    '/@me',
    dto(UserUpdateDto),
    token(TokenType.Access),
    (req: Request, res: Response) => {
        res.json(userService.update_by_id(req.user!.id, req.body));
    },
);

router.delete(
    '/@me',
    token(TokenType.Access),
    (req: Request, res: Response) => {
        res.json(userService.delete_by_id(req.user!.id));
    },
);

export default router;
