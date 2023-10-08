import { Schema, model } from 'mongoose';
import * as uuid from 'uuid';
import { IUser } from './user.schema';

export interface IRefreshToken {
    id: string;
    token: string;
    user: IUser;
}

export const RefreshTokenSchema = new Schema<IRefreshToken>({
    id: {
        type: String,
        default: uuid.v4,
        unique: true,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const RefreshToken = model<IRefreshToken>(
    'RefreshToken',
    RefreshTokenSchema,
);
