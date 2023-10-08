import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { IAddress } from '../schemas/address.schema';
import { Type } from 'class-transformer';

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
    @Type(() => IAddress)
    @IsOptional()
    addresses?: IAddress[];
}
