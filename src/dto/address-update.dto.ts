import { IsOptional, IsString } from 'class-validator';

export class AddressUpdateDto {
    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    postal_code?: string;

    @IsString()
    @IsOptional()
    street?: string;
}
