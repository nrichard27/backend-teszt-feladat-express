export class DtoException extends Error {
    constructor(
        readonly status: number,
        readonly code: number,
        readonly message: string,
        readonly errors: string[],
    ) {
        super();
    }
}

export class DtoValidationException extends DtoException {
    constructor(errors: string[]) {
        super(400, 810, 'Malformed body', errors);
    }
}
