import { Router, Request, Response } from 'express';
import { dto } from '../middlewares/dto.handler';
import { token } from '../middlewares/token.guard';
import * as authService from '../services/auth.service';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { TokenType } from '../interfaces/token-type.enum';

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Felhasználó bejelentkeztetése
 *     description: Bejelentkeztet egy felhasználót. A README.md-ben megtalálod a teszt admin user adatait.
 *     operationId: authLogin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginDto'
 *       required: true
 *     responses:
 *       '200':
 *         description: Sikeres bejelentkezés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/TokensSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/WrongCredentialsError'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
 */
router.post(
    '/login',
    dto(AuthLoginDto),
    async (req: Request, res: Response) => {
        res.json(await authService.login(req.body, req.ip));
    },
);

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Új felhasználó regisztrálása
 *     description: Regisztrál egy új felhasználót. A README.md-ben megtalálod a teszt admin user adatait.
 *     operationId: authRegister
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegisterDto'
 *       required: true
 *     responses:
 *       '200':
 *         description: Sikeres regisztráció
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               asd:
 *                 $ref: '#/components/examples/TokensSuccess'
 *       '401':
 *         description: Hiba történt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/UsernameInUseError'
 *               2:
 *                 $ref: '#/components/examples/EmailInUseError'
 *       '400':
 *         description: Hibás body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             examples:
 *               1:
 *                 $ref: '#/components/examples/DtoValidationError'
 */
router.post(
    '/register',
    dto(AuthRegisterDto),
    async (req: Request, res: Response) => {
        res.json(await authService.register(req.body, req.ip));
    },
);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Új access token kérése
 *     description: Készít egy új access tokent. Refresh token szükséges.
 *     operationId: authRefresh
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               asd:
 *                 $ref: '#/components/examples/TokensSuccess'
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
    '/refresh',
    token(TokenType.Refresh),
    async (req: Request, res: Response) => {
        res.json(
            await authService.refresh_token(req.user!, req.ip, req.token!),
        );
    },
);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Kijelentkezés
 *     description: Deaktiválja az adott refresh tokent.
 *     operationId: authLogout
 *     responses:
 *       '200':
 *         description: Siker
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Success'
 *             examples:
 *               asd:
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
router.post(
    '/logout',
    token(TokenType.Refresh),
    async (req: Request, res: Response) => {
        res.json(await authService.logout(req.token!));
    },
);

export default router;
