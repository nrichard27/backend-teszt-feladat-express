import { Router, Request, Response, NextFunction } from 'express';
import { token } from '../middlewares/token.guard';
import { TokenType } from '../interfaces/token-type.enum';
import * as addressService from '../services/address.service';
import { role } from '../middlewares/role.guard';
import { Role } from '../interfaces/role.enum';
import { dto } from '../middlewares/dto.handler';
import { AddressCreateDto } from '../dto/address-create.dto';
import { AddressUpdateDto } from '../dto/address-update.dto';

const router = Router();

router.post(
    '/:user_id',
    dto(AddressCreateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .create(req.params.user_id, req.body)
                .catch((err) => next(err)),
        );
    },
);

router.get(
    '/:user_id',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .get_all_by_user_id(req.params.user_id)
                .catch((err) => next(err)),
        );
    },
);

router.get(
    '/:user_id/:address_id',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .get_by_user_id(req.params.user_id, req.params.address_id)
                .catch((err) => next(err)),
        );
    },
);

router.patch(
    '/:user_id/:address_id',
    dto(AddressUpdateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .update_by_user_id(
                    req.params.user_id,
                    req.params.address_id,
                    req.body,
                )
                .catch((err) => next(err)),
        );
    },
);

router.delete(
    '/:user_id/:address_id',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .delete_by_user_id(req.params.user_id, req.params.address_id)
                .catch((err) => next(err)),
        );
    },
);

router.post(
    '/@me',
    dto(AddressCreateDto),
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .create(req.user!.id, req.body)
                .catch((err) => next(err)),
        );
    },
);

router.get(
    '/@me',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .get_all_by_user_id(req.user!.id)
                .catch((err) => next(err)),
        );
    },
);

router.get(
    '/@me/:address_id',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .get_by_user_id(req.user!.id, req.params.address_id)
                .catch((err) => next(err)),
        );
    },
);

router.patch(
    '/@me/:address_id',
    dto(AddressUpdateDto),
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .update_by_user_id(
                    req.user!.id,
                    req.params.address_id,
                    req.body,
                )
                .catch((err) => next(err)),
        );
    },
);

router.delete(
    '/@me/:address_id',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .delete_by_user_id(req.user!.id, req.params.address_id)
                .catch((err) => next(err)),
        );
    },
);

export default router;
