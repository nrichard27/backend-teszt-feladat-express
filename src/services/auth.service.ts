import { AuthLoginDto } from '../dto/auth-login.dto';
import {
    EmailInUseException,
    UsernameInUseException,
    WrongCredentialsException,
} from '../exceptions/auth.exception';
import * as bcrypt from 'bcrypt';
import * as userService from '../services/user.service';
import * as tokenService from '../services/token.service';
import { success } from '../utils';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { IUser } from '../schemas/user.schema';

export async function login(dto: AuthLoginDto, ip: string) {
    const user = await userService.find_one_by_email(dto.email);

    if (!user) {
        throw new WrongCredentialsException();
    }

    if (!bcrypt.compareSync(dto.password, user.password)) {
        throw new WrongCredentialsException();
    }

    const refresh_token = await tokenService.find_refresh_token_by_user(user);

    if (refresh_token) {
        return success({
            refresh_token: refresh_token.token,
            access_token: tokenService.generate_access_token({
                user_id: user.id,
                ip_address: ip,
            }),
        });
    } else {
        return success(
            await tokenService.generate_login_tokens(
                {
                    user_id: user.id,
                    ip_address: ip,
                },
                user,
            ),
        );
    }
}

export async function register(dto: AuthRegisterDto, ip: string) {
    if (await userService.find_one_by_username(dto.username))
        throw new UsernameInUseException();

    if (await userService.find_one_by_email(dto.email))
        throw new EmailInUseException();

    const user = await userService.create_and_return(dto);

    return success(
        await tokenService.generate_login_tokens(
            {
                user_id: user.id,
                ip_address: ip,
            },
            user,
        ),
    );
}

export async function refresh_token(user: IUser, ip: string, token: string) {
    return success({
        access_token: tokenService.generate_access_token({
            user_id: user.id,
            ip_address: ip,
        }),
        refresh_token: token,
    });
}

export async function logout(token: string) {
    await tokenService.logout_refresh_token(token);

    return success();
}
