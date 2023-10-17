import { AddressCreateDto } from '../dto/address-create.dto';
import { AddressUpdateDto } from '../dto/address-update.dto';
import {
    NotFoundException,
    WrongCredentialsException,
} from '../exceptions/auth.exception';
import { Address } from '../schemas/address.schema';
import { User } from '../schemas/user.schema';
import { success } from '../utils';

export async function create(_id: string, dto: AddressCreateDto) {
    const user = await User.findOne({ _id }).populate('addresses');

    if (!user) {
        throw new WrongCredentialsException();
    }

    const address = await Address.create({ user, ...dto });
    await address.save();

    user.addresses.push(address);
    await user.save();

    return success({ address });
}

export async function get_by_user_id(user_id: string, address_id: string) {
    const user = await User.findOne({ _id: user_id });

    if (!user) {
        throw new WrongCredentialsException();
    }

    const address = user.addresses.filter((a) => a._id == address_id);

    if (!address) {
        throw new NotFoundException();
    }

    return success({
        address,
    });
}

export async function get_all_by_user_id(_id: string) {
    const user = await User.findOne({ _id });

    if (!user) {
        throw new WrongCredentialsException();
    }

    return success({ addresses: user.addresses });
}

export async function update_by_user_id(
    user_id: string,
    address_id: string,
    dto: AddressUpdateDto,
) {
    const user = await User.findOne({ _id: user_id });

    if (!user) {
        throw new WrongCredentialsException();
    }

    const address = user.addresses.filter((a) => a._id == address_id);

    if (!address) {
        throw new NotFoundException();
    }

    const db_address = await Address.findOne({ _id: address_id });

    if (!db_address) {
        console.error(
            `ERROR: Address database out of sync with the user's address list! user: ${user_id} address: ${address_id}`,
        );
        throw new NotFoundException();
    }

    await db_address.updateOne(dto);

    return success({ address: db_address });
}

export async function delete_by_user_id(user_id: string, address_id: string) {
    const user = await User.findOne({ _id: user_id });

    if (!user) {
        throw new WrongCredentialsException();
    }

    const address = user.addresses.filter((a) => a._id == address_id);

    if (!address) {
        throw new NotFoundException();
    }

    await Address.deleteOne({ _id: address_id });

    return success();
}
