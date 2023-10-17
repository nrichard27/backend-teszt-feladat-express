import { Schema, model } from 'mongoose';
import { IUser } from './user.schema';

export interface IRefreshToken {
    _id: string;
    token: string;
    user: IUser;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     RefreshToken:
 *       type: object
 *       required:
 *         - token
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           example: 11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000
 *           description: This property is automatically generated
 *         token:
 *           type: string
 *           example: jwt
 *         user:
 *           $ref: '#/components/schemas/User'
 */
export const RefreshTokenSchema = new Schema<IRefreshToken>({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const RefreshToken = model<IRefreshToken>(
    'RefreshToken',
    RefreshTokenSchema,
);
