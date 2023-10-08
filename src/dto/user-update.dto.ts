import {
    IsEmail,
    IsStrongPassword,
    IsEnum,
    IsOptional,
    IsString,
    IsArray,
} from 'class-validator';
import { Role } from '../interfaces/role.enum';
import { IAddress } from '../schemas/address.schema';
import { Type } from 'class-transformer';

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
    @Type(() => IAddress)
    @IsOptional()
    addresses?: IAddress[];
}
