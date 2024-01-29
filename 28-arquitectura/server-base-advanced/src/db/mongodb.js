import mongoose from 'mongoose';

export const init = async () => {
    try {
        const URI = 'mongodb+srv://developer:kuppyr-Nospuc-dubre8@cluster0.qnxcwcg.mongodb.net/';
        await mongoose.connect(URI);
        console.log('Database connected.');
    } catch (error) {
        console.error('Error to connect to database', error.message);
    }
};