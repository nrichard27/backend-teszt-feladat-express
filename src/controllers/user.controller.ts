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

/**
 * @openapi
 * /api/v1/users/@me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Bejelentkezett felhasználó lekérése
 *     description: Lekéri a bejelentkezett felhasználót
 *     operationId: userGetMe
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UserSuccess'
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
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel.
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
        res.json(await userService.get_me(req.user!).catch((err) => next(err)));
    },
);

/**
 * @openapi
 * /api/v1/users/@me:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Bejelentkezett felhasználó frissítése
 *     description: Frissíti a bejelentkezett felhasználót
 *     operationId: userUpdateMe
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateDto'
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
 *                 $ref: '#/components/examples/UserSuccess'
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
 *         description: Tiltott. A request IP címe nem egyezik a tokenben tárolt IP címmel.
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

/**
 * @openapi
 * /api/v1/users/@me:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Bejelentkezett felhasználó törlése
 *     description: Törli a bejelentkezett felhasználót.
 *     operationId: userDeleteMe
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

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Felhasználó létrehozása
 *     description: Létrehoz egy felhasználót. Csak admin szereppel elérhető.
 *     operationId: userCreate
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateDto'
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
 *                 $ref: '#/components/examples/UserSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/EmailInUseError'
 *               2:
 *                 $ref: '#/components/examples/UsernameInUseError'
 *               3:
 *                 $ref: '#/components/examples/UnauthorizedError'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
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
    '/',
    dto(UserCreateDto),
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(await userService.create(req.body).catch((err) => next(err)));
    },
);

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Összes felhasználó lekérése
 *     description: Lekéri az összes felhasználót. Csak admin szereppel elérhető.
 *     operationId: userGetAll
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UsersSuccess'
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
    '/',
    token(TokenType.Access),
    role(Role.ADMIN),
    async (req: Request, res: Response, next: NextFunction) => {
        res.json(await userService.get_all().catch((err) => next(err)));
    },
);

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Adott felhasználó lekérése
 *     description: Lekéri az adott felhasználót. Csak admin szereppel elérhető.
 *     operationId: userGet
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
 *                 $ref: '#/components/examples/UserSuccess'
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

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Adott felhasználó frissítése
 *     description: Frissít egy adott felhasználót. Csak admin szereppel elérhető.
 *     operationId: userUpdate
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
 *             $ref: '#/components/schemas/UserUpdateDto'
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
 *                 $ref: '#/components/examples/UserSuccess'
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

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Adott felhasználó törlése
 *     description: Törli az adott felhasználót. Csak admin szereppel elérhető.
 *     operationId: userDelete
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

export default router;
