/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize } from 'class-sanitizer';
import { DtoValidationException } from '../exceptions/dto.exception';

export function dto(type: any, skip_missing = false) {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoObj = plainToInstance(type, req.body);

        validate(dtoObj, { skipMissingProperties: skip_missing }).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const dtoErrors = errors.map((error: ValidationError) =>
                        (Object as any).values(error.constraints),
                    );
                    next(new DtoValidationException(dtoErrors));
                } else {
                    sanitize(dtoObj);
                    req.body = dtoObj;
                    next();
                }
            },
        );
    };
}
