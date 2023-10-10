import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsObject,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { IAddress } from '../schemas/address.schema';

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthRegisterDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *         - addresses
 *       properties:
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: secretpassword
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 */
export class AuthRegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsArray()
    @IsObject()
    @IsNotEmpty()
    addresses: IAddress[];
}
