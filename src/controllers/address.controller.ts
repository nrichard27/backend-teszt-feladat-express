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

/**
 * @openapi
 * /api/v1/addresses/@me:
 *   post:
 *     tags:
 *       - Addresses
 *     summary: Új cím hozzáadása a bejelentkezett felhasználóhoz
 *     description: Hozzáad egy új címet a bejelentkezett felhasználóhoz
 *     operationId: addressCreateMe
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressCreateDto'
 *       required: true
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressSuccess'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
router.post(
    '/@me',
    dto(AddressCreateDto),
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .create(req.user!._id, req.body)
                .catch((err) => next(err)),
        );
    },
);

/**
 * @openapi
 * /api/v1/addresses/@me/{addressId}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Bejelentkezett felhasználó összes címének lekérése
 *     description: Lekéri a bejelentkezett felhasználó összes címét.
 *     operationId: addressGetAllMe
 *     parameters:
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressesSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/@me',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .get_all_by_user_id(req.user!._id)
                .catch((err) => next(err)),
        );
    },
);

/**
 * @openapi
 * /api/v1/addresses/@me/{addressId}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Bejelentkezett felhasználó adott címének lekérése
 *     description: Lekéri a bejelentkezett felhasználó adott címét.
 *     operationId: addressGetMe
 *     parameters:
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/@me/:address_id',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .get_by_user_id(req.user!._id, req.params.address_id)
                .catch((err) => next(err)),
        );
    },
);

/**
 * @openapi
 * /api/v1/addresses/@me/{addressId}:
 *   patch:
 *     tags:
 *       - Addresses
 *     summary: Bejelentkezett felhasználó adott címének frissítése
 *     description: Frissíti a bejelentkezett felhasználó adott címét.
 *     operationId: addressUpdateMe
 *     parameters:
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressUpdateDto'
 *       required: true
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressSuccess'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
router.patch(
    '/@me/:address_id',
    dto(AddressUpdateDto),
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .update_by_user_id(
                    req.user!._id,
                    req.params.address_id,
                    req.body,
                )
                .catch((err) => next(err)),
        );
    },
);

/**
 * @openapi
 * /api/v1/addresses/@me/{addressId}:
 *   delete:
 *     tags:
 *       - Addresses
 *     summary: Bejelentkezett felhasználó adott címének törlése
 *     description: Törli a bejelentkezett felhasználó adott címét.
 *     operationId: addressDeleteMe
 *     parameters:
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/EmptySuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    '/@me/:address_id',
    token(TokenType.Access),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(
            await addressService
                .delete_by_user_id(req.user!._id, req.params.address_id)
                .catch((err) => next(err)),
        );
    },
);

/**
 * @openapi
 * /api/v1/addresses/{userId}:
 *   post:
 *     tags:
 *       - Addresses
 *     summary: Új cím hozzáadása adott felhasználóhoz
 *     description: Hozzáad egy új címet az adott felhasználóhoz. Csak admin szereppel elérhető.
 *     operationId: addressCreate
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressCreateDto'
 *       required: true
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressSuccess'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel vagy a felhasználónak nincs elegendő jogosultsága.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @openapi
 * /api/v1/addresses/{userId}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Adott felhasználó összes címének lekérése
 *     description: Lekéri az adott felhasználó összes címét. Csak admin szereppel elérhető.
 *     operationId: addressGetAll
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressesSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel vagy a felhasználónak nincs elegendő jogosultsága.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @openapi
 * /api/v1/addresses/{userId}/{addressId}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Adott felhasználó adott címének lekérése
 *     description: Lekéri az adott felhasználó adott címét. Csak admin szereppel elérhető.
 *     operationId: addressGet
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel vagy a felhasználónak nincs elegendő jogosultsága.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @openapi
 * /api/v1/addresses/{userId}/{addressId}:
 *   patch:
 *     tags:
 *       - Addresses
 *     summary: Adott felhasználó adott címének frissítése
 *     description: Frissíti az adott felhasználó adott címét. Csak admin szereppel elérhető.
 *     operationId: addressUpdate
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressUpdateDto'
 *       required: true
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/AddressSuccess'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel vagy a felhasználónak nincs elegendő jogosultsága.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @openapi
 * /api/v1/addresses/{userId}/{addressId}:
 *   delete:
 *     tags:
 *       - Addresses
 *     summary: Adott felhasználó adott címének törlése
 *     description: Törli az adott felhasználó adott címét.
 *     operationId: addressDelete
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: addressId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/EmptySuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '403':
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel vagy a felhasználónak nincs elegendő jogosultsága.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/ForbiddenError'
 *     security:
 *       - bearerAuth: []
 */
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

export default router;
