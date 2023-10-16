import {
    IsEmail,
    IsStrongPassword,
    IsEnum,
    IsOptional,
    IsString,
    IsNotEmpty,
    IsArray,
} from 'class-validator';
import { Role } from '../interfaces/role.enum';
import { IAddress } from '../schemas/address.schema';

/**
 * @openapi
 * components:
 *   schemas:
 *     UserCreateDto:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
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
 *         role:
 *           type: integer
 *           format: int32
 *           example: 1
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 */
export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: number;

    @IsArray()
    @IsNotEmpty()
    addresses: IAddress[];
}
