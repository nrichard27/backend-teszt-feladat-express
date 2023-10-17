import { Schema, model } from 'mongoose';
import { IUser, User } from './user.schema';

export class IAddress {
    _id: string;
    country: string;
    city: string;
    postal_code: string;
    street: string;
    user: IUser;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - country
 *         - city
 *         - postal_code
 *         - street
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           example: 11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000
 *           description: This property is automatically generated
 *         country:
 *           type: string
 *           example: Hungary
 *         city:
 *           type: string
 *           example: Debrecen
 *         postal_code:
 *           type: string
 *           example: 4025
 *         street:
 *           type: string
 *           example: Széchenyi utca 57/A
 *         user:
 *           $ref: '#/components/schemas/User'
 */
export const AddressSchema = new Schema<IAddress>({
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
        required: true,
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
