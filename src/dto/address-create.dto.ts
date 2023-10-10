import { IsNotEmpty, IsString } from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     AddressCreateDto:
 *       type: object
 *       required:
 *         - country
 *         - city
 *         - postal_code
 *         - street
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
export class AddressCreateDto {
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postal_code: string;

    @IsString()
    @IsNotEmpty()
    street: string;
}
