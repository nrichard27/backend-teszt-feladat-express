import { Schema, model } from 'mongoose';
import uuid from 'uuid';
import { IUser, User } from './user.schema';

export class IAddress {
    id: string;
    country: string;
    city: string;
    postal_code: string;
    street: string;
    user: IUser;
}

export const AddressSchema = new Schema<IAddress>({
    id: {
        type: String,
        default: uuid.v4,
        unique: true,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

AddressSchema.pre(
    'deleteOne',
    { document: false, query: true },
    async function () {
        const doc = await this.model.findOne(this.getFilter());
        const user = await User.findOne({ _id: doc.user }).populate(
            'addresses',
        );
        user!.addresses = user!.addresses.filter((x) => x != doc);
        user!.save();
    },
);

export const Address = model<IAddress>('Address', AddressSchema);
