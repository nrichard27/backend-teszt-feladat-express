import mongoose from 'mongoose';

export async function connect_to_database() {
    await mongoose
        .connect(
            process.env.API_MONGODB_CONNECTION_STRING ||
                'mongodb://localhost:27017',
        )
        .catch((err) => console.log('Can not connect to database!', err));
}
