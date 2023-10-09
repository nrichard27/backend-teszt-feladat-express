import { Router, Request, Response } from 'express';
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
    (req: Request, res: Response) => {
        res.json(addressService.create(req.params.user_id, req.body));
    },
);

router.get(
    '/:user_id',
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(addressService.get_all_by_user_id(req.params.user_id));
    },
);

router.get(
    '/:user_id/:address_id',
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(
            addressService.get_by_user_id(
                req.params.user_id,
                req.params.address_id,
            ),
        );
    },
);

router.patch(
    '/:user_id/:address_id',
    dto(AddressUpdateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(
            addressService.update_by_user_id(
                req.params.user_id,
                req.params.address_id,
                req.body,
            ),
        );
    },
);

router.delete(
    '/:user_id/:address_id',
    token(TokenType.Access),
    role(Role.ADMIN),
    (req: Request, res: Response) => {
        res.json(
            addressService.delete_by_user_id(
                req.params.user_id,
                req.params.address_id,
            ),
        );
    },
);

router.post(
    '/@me',
    dto(AddressCreateDto),
    token(TokenType.Access),
    (req: Request, res: Response) => {
        res.json(addressService.create(req.user!.id, req.body));
    },
);

router.get('/@me', token(TokenType.Access), (req: Request, res: Response) => {
    res.json(addressService.get_all_by_user_id(req.user!.id));
});

router.get(
    '/@me/:address_id',
    token(TokenType.Access),
    (req: Request, res: Response) => {
        res.json(
            addressService.get_by_user_id(req.user!.id, req.params.address_id),
        );
    },
);

router.patch(
    '/@me/:address_id',
    dto(AddressUpdateDto),
    token(TokenType.Access),
    (req: Request, res: Response) => {
        res.json(
            addressService.update_by_user_id(
                req.user!.id,
                req.params.address_id,
                req.body,
            ),
        );
    },
);

router.delete(
    '/@me/:address_id',
    token(TokenType.Access),
    (req: Request, res: Response) => {
        res.json(
            addressService.delete_by_user_id(
                req.user!.id,
                req.params.address_id,
            ),
        );
    },
);

export default router;
