import mongoose from "mongoose";

export const URI = 'mongodb+srv://developer:kuppyr-Nospuc-dubre8@cluster0.qnxcwcg.mongodb.net/ecommerce';

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.error('Ah ocurrido un error al intentar conectar a la BD.', error.message);
    }
}