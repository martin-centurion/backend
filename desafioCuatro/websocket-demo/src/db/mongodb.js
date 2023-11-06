import mongoose from "mongoose";

export const init = async () => {
    try {
        const URI = 'mongodb+srv://developer:kuppyr-Nospuc-dubre8@cluster0.qnxcwcg.mongodb.net/ecommerce';
        await mongoose.connect(URI);
        console.log('Database conected');
    } catch (error) {
        console.error('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
};