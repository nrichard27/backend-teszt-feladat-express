import mongoose from 'mongoose';

export async function connect_to_database() {
    await mongoose
        .connect(process.env.API_MONGODB_CONNECTION_STRING as string)
        .catch((err) => console.log('Can not connect to database!', err));
}
