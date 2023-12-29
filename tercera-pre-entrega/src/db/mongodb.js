import mongoose from "mongoose";
import config from '../config.js';

export const init = async () => {
    try {
        const URI = config.db.mongodbUri;
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.error('Ah ocurrido un error al intentar conectar a la BD.', error.message);
    }
}