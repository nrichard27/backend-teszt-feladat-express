import { Schema, model } from 'mongoose';
import uuid from 'uuid';
import { IUser } from './user.schema';

export interface IAddress {
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

export const Address = model<IAddress>('Address', AddressSchema);
