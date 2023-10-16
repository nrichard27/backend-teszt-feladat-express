import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import {
    EmailInUseException,
    UsernameInUseException,
    WrongCredentialsException,
} from '../exceptions/auth.exception';
import { Address } from '../schemas/address.schema';
import { IUser, User } from '../schemas/user.schema';
import { strip_password, success } from '../utils';
import * as bcrypt from 'bcrypt';

export async function find_one_by_id(id: string) {
    return await User.findOne({ id });
}

export async function find_one_by_username(username: string) {
    return await User.findOne({ username });
}

export async function find_one_by_email(email: string) {
    return await User.findOne({ email });
}

export async function create_and_return(dto: UserCreateDto) {
    dto.password = await bcrypt.hash(dto.password, 10);

    const user = await User.create({ ...dto, addresses: [] });
    await user.save();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const new_addresses: any[] = [];

    for (const a of dto.addresses) {
        const addr = await Address.create({ ...a, user });
        new_addresses.push(addr);
        await addr.save();
    }

    user.addresses = new_addresses;

    await user.save();

    return user;
}

export async function create(dto: UserCreateDto) {
    if (await find_one_by_username(dto.username))
        throw new UsernameInUseException();

    if (await find_one_by_email(dto.email)) throw new EmailInUseException();

    const user = await create_and_return(dto);

    return success({ user: strip_password(user) });
}

export async function get_all() {
    const users = await User.find();

    const result = users.forEach((u) => {
        return strip_password(u);
    });

    return success({ users: result });
}

export async function get_by_id(id: string) {
    const user = await User.findOne({ id }).populate('addresses');

    if (!user) {
        throw new WrongCredentialsException();
    }

    return success({ user: strip_password(user) });
}

export async function update_by_id(id: string, dto: UserUpdateDto) {
    const user = await User.findOne({ id }).populate('addresses');

    if (!user) {
        throw new WrongCredentialsException();
    }

    if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.addresses) {
        const removals = user.addresses.filter(
            (a) => !dto.addresses!.includes(a),
        );
        const additions = dto.addresses.filter(
            (a) => !user.addresses.includes(a),
        );

        removals.forEach(async ({ id }) => {
            await Address.deleteOne({ id });
        });

        dto.addresses = [];

        for (const a of additions) {
            const addr = await Address.create({ ...a, user });
            dto.addresses?.push(addr);
            await addr.save();
        }
    }

    await user.updateOne(dto);

    return success({ user: strip_password(user) });
}

export async function delete_by_id(id: string) {
    const user = await User.findOne({ id });

    if (!user) {
        throw new WrongCredentialsException();
    }

    await user.deleteOne();

    return success();
}

export function get_me(user: IUser) {
    return success({ user: strip_password(user) });
}
