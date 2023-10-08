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
import { Type } from 'class-transformer';

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
    @Type(() => IAddress)
    @IsOptional()
    addresses?: IAddress[];
}
