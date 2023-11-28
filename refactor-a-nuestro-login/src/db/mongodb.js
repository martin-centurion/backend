import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

export const URI = process.env.MONGODB_URI;
console.log('URI: ', URI);

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.error('Ah ocurrido un error al intentar conectar a la BD.', error.message);
    }
}