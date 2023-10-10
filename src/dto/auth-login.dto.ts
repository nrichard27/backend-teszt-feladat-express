import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthLoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           example: secretpassword
 */
export class AuthLoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
