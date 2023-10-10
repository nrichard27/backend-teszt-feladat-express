import { IsOptional, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     AddressUpdateDto:
 *       type: object
 *       properties:
 *         country:
 *           type: string
 *           example: Hungary
 *         city:
 *           type: string
 *           example: Debrecen
 *         postal_code:
 *           type: string
 *           example: 4025
 *         street:
 *           type: string
 *           example: Széchenyi utca 57/A
 */
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
