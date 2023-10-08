import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/role.enum';
import * as uuid from 'uuid';
import { Address, IAddress } from './address.schema';
import { RefreshToken } from './refresh-token.shema';

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    addresses: IAddress[];
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new Schema<IUser>(
    {
        id: {
            type: String,
            default: uuid.v4,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            enum: Role,
            default: Role.USER,
            required: true,
        },
        addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    },
    { timestamps: true },
);

UserSchema.pre(
    'deleteOne',
    { document: false, query: true },
    async function () {
        const doc = await this.model.findOne(this.getFilter());
        await Address.deleteMany({ user: doc._id });
        await RefreshToken.deleteMany({ user: doc._id });
    },
);

export const User = model<IUser>('User', UserSchema);
