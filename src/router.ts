import { Router } from 'express';
import auth from './controllers/auth.controller';
import users from './controllers/user.controller';
import addresses from './controllers/address.controller';

const router = Router();

/**
 * @openapi
 * components:
 *   responses:
 *     Error:
 *       description: Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - message
 *             properties:
 *               code:
 *                 type: integer
 *                 format: int32
 *               message:
 *                 type: string
 *               errors:
 *                 type: array
 *                 items:
 *                   type: string
 *     Success:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - message
 *             properties:
 *               code:
 *                 type: string
 *               message:
 *                 type: string
 *               access_token:
 *                 type: string
 *               refresh_token:
 *                 type: string
 *               user:
 *                 $ref: '#/components/schemas/User'
 *               users:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *               address:
 *                 $ref: '#/components/schemas/Address'
 *               addresses:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Address'
 *   examples:
 *     UnauthorizedError:
 *       summary: Unauthorized
 *       value:
 *         code: 800
 *         message: Unauthorized
 *     WrongCredentialsError:
 *       summary: WrongCredentials
 *       value:
 *         code: 801
 *         message: Wrong Credentials
 *     UsernameInUseError:
 *       summary: UsernameInUse
 *       value:
 *         code: 807
 *         message: Username is already in use
 *     EmailInUseError:
 *       summary: EmailInUse
 *       value:
 *         code: 808
 *         message: Email is already in use
 *     ForbiddenError:
 *       summary: Forbidden
 *       value:
 *         code: 813
 *         message: Forbidden
 *     NotFoundError:
 *       summary: NotFound
 *       value:
 *         code: 0
 *         message: Not found
 *     DtoValidationError:
 *       summary: MalformedBody
 *       value:
 *         code: 810
 *         message: Malformed body
 *         errors:
 *           - some error
 *           - some error
 *     EmptySuccess:
 *       summary: Success
 *       value:
 *         code: 900
 *         message: Success
 *     TokensSuccess:
 *       summary: Success
 *       value:
 *         code: 900
 *         message: Success
 *         access_token: string
 *         resfresh_token: string
 *     UserSuccess:
 *       summary: Success
 *       value:
 *         code: 900
 *         message: Success
 *         user:
 *           $ref: '#/components/schemas/User'
 *     UsersSuccess:
 *       summary: Success
 *       value:
 *         code: 900
 *         message: Success
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *     AddressSuccess:
 *       summary: Success
 *       value:
 *         code: 900
 *         message: Success
 *         address:
 *           $ref: '#/components/schemas/Address'
 *     AddressesSuccess:
 *       summary: Success
 *       value:
 *         code: 900
 *         message: Success
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.use('/auth', auth);
router.use('/users', users);
router.use('/addresses', addresses);

export default router;
