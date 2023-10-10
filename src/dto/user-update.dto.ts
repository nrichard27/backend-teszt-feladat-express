import {
    IsEmail,
    IsStrongPassword,
    IsEnum,
    IsOptional,
    IsString,
    IsArray,
    IsObject,
} from 'class-validator';
import { Role } from '../interfaces/role.enum';
import { IAddress } from '../schemas/address.schema';

/**
 * @openapi
 * components:
 *   schemas:
 *     UserUpdateDto:
 *       type: object
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
export class UserUpdateDto {
    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsStrongPassword()
    @IsOptional()
    password?: string;

    @IsEnum(Role)
    @IsOptional()
    role?: number;

    @IsArray()
    @IsObject()
    @IsOptional()
    addresses?: IAddress[];
}
