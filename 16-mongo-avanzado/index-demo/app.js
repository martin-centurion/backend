import mongoose from "mongoose";

import UserModel from "./user.model.js";

const test = async () => {
    const URI = 'mongodb+srv://developer:kuppyr-Nospuc-dubre8@cluster0.qnxcwcg.mongodb.net/ecommerce';
    await mongoose.connect(URI);
    const result = await UserModel.find({ first_name: 'Celia' }).explain('executionStats');
    console.log('result', result);
}

test();