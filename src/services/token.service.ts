import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { ILoginTokens } from '../interfaces/login-tokens.interface';
import { TokenType } from '../interfaces/token-type.enum';
import { IRefreshToken, RefreshToken } from '../schemas/refresh-token.schema';

export function generate_access_token(payload: ITokenPayload): string {
    return jwt.sign(
        { ...payload, time: Date.now() },
        process.env.API_ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: '15m',
        },
    );
}

export async function generate_refresh_token(
    payload: ITokenPayload,
): Promise<string> {
    const token = jwt.sign(
        { ...payload, time: Date.now() },
        process.env.API_REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: '7d',
        },
    );

    const refreshToken = await RefreshToken.create({
        token,
    });

    await refreshToken.save();

    return token;
}

export async function generate_login_tokens(
    payload: ITokenPayload,
): Promise<ILoginTokens> {
    const access_token = generate_access_token(payload);
    const refresh_token = await generate_refresh_token(payload);

    return { access_token, refresh_token };
}

export function decrypt_access_token(token: string): ITokenPayload | null {
    try {
        return jwt.verify(
            token,
            process.env.API_ACCESS_TOKEN_SECRET as string,
        ) as ITokenPayload;
    } catch {
        return null;
    }
}

export function decrypt_refresh_token(token: string): ITokenPayload | null {
    try {
        return jwt.verify(
            token,
            process.env.API_REFRESH_TOKEN_SECRET as string,
        ) as ITokenPayload;
    } catch {
        logout_refresh_token(token);
        return null;
    }
}

export function decrypt_token(
    type: TokenType,
    token: string,
): ITokenPayload | null {
    switch (type) {
        case TokenType.Access:
            return decrypt_access_token(token);
        case TokenType.Refresh:
            return decrypt_refresh_token(token);
    }
}

export async function logout_refresh_token(token: string) {
    RefreshToken.deleteOne({ token });
}

export async function find_refresh_token(
    token: string,
): Promise<IRefreshToken | null> {
    const refreshToken = await RefreshToken.findOne({
        token,
    });

    return refreshToken;
}
