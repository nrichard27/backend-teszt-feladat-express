import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { ILoginTokens } from '../interfaces/login-tokens.interface';
import { TokenType } from '../interfaces/token-type.enum';
import { IRefreshToken, RefreshToken } from '../schemas/refresh-token.schema';
import { IUser } from '../schemas/user.schema';

export function generate_access_token(payload: ITokenPayload): string {
    return jwt.sign(
        { ...payload, time: Date.now() },
        process.env.API_ACCESS_TOKEN_SECRET || 'asd1',
        {
            expiresIn: '15m',
        },
    );
}

async function generate_refresh_token(
    payload: ITokenPayload,
    user: IUser,
): Promise<string> {
    const token = jwt.sign(
        { ...payload, time: Date.now() },
        process.env.API_REFRESH_TOKEN_SECRET || 'asd2',
        {
            expiresIn: '7d',
        },
    );

    const refresht_token = await RefreshToken.create({
        token,
        user,
    });

    await refresht_token.save();

    return token;
}

export async function generate_login_tokens(
    payload: ITokenPayload,
    user: IUser,
): Promise<ILoginTokens> {
    const access_token = generate_access_token(payload);
    const refresh_token = await generate_refresh_token(payload, user);

    return { access_token, refresh_token };
}

function decrypt_access_token(token: string): ITokenPayload | null {
    try {
        return jwt.verify(
            token,
            process.env.API_ACCESS_TOKEN_SECRET || 'asd1',
        ) as ITokenPayload;
    } catch {
        return null;
    }
}

async function decrypt_refresh_token(
    token: string,
): Promise<ITokenPayload | null> {
    try {
        const decoded = jwt.verify(
            token,
            process.env.API_REFRESH_TOKEN_SECRET || 'asd2',
        ) as ITokenPayload;

        const t = await RefreshToken.findOne({ token });

        if (!t) return null;

        return decoded;
    } catch {
        logout_refresh_token(token);
        return null;
    }
}

export async function decrypt_token(
    type: TokenType,
    token: string,
): Promise<ITokenPayload | null> {
    switch (type) {
        case TokenType.Access:
            return decrypt_access_token(token);
        case TokenType.Refresh:
            return await decrypt_refresh_token(token);
    }
}

export async function logout_refresh_token(token: string) {
    await RefreshToken.deleteOne({ token });
}

export async function find_refresh_token(
    token: string,
): Promise<IRefreshToken | null> {
    const refresht_token = await RefreshToken.findOne({
        token,
    });

    return refresht_token;
}

export async function find_refresh_token_by_user(user: IUser) {
    return await RefreshToken.findOne({ user });
}
