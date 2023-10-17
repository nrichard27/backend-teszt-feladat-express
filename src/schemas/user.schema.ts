import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/role.enum';
import { Address, IAddress } from './address.schema';
import { RefreshToken } from './refresh-token.schema';

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    addresses: IAddress[];
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *         - addresses
 *       properties:
 *         id:
 *           type: string
 *           example: 11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000
 *           description: This property is automatically generated
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: secretpassword
 *         role:
 *           type: integer
 *           format: int32
 *           example: 1
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: This property is automatically generated
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: This property is automatically generated
 */
export const UserSchema = new Schema<IUser>(
    {
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
        addresses: [
            { type: Schema.Types.ObjectId, ref: 'Address', required: true },
        ],
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
