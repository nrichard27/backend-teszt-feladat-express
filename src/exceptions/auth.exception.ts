export class AuthException extends Error {
    constructor(
        readonly status: number,
        readonly message: string,
        readonly code: number,
    ) {
        super();
    }
}

export class UnauthorizedException extends AuthException {
    constructor() {
        super(401, 'Unauthorized', 800);
    }
}

export class WrongCredentialsException extends AuthException {
    constructor() {
        super(401, 'Wrong credentials', 801);
    }
}

export class UsernameInUseException extends AuthException {
    constructor() {
        super(401, 'Username is already in use', 807);
    }
}

export class EmailInUseException extends AuthException {
    constructor() {
        super(401, 'Email is already in use', 808);
    }
}

export class ForbiddenException extends AuthException {
    constructor() {
        super(403, 'Forbidden', 813);
    }
}

export class NotFoundException extends AuthException {
    constructor() {
        super(404, 'Not found', 0);
    }
}
