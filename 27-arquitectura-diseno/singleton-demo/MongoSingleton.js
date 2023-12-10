import mongoose from "mongoose";

export default class MongoSingleton {
    static #inctance;
    constructor(){
        mongoose.connect(process.env.MONGODB_URI, {})
            .then(() => console.log('Connected to MongoDB.'))
            .catch((error) =>  console.error(error.message));
    };
    static getIntance() {
        if (MongoSingleton.#inctance) {
            console.log('MongoSingleton instance already exists.');
        } else {
            MongoSingleton.#inctance = new MongoSingleton();
            console.log('Created a new MongoSingleton instance.');
        }
        return MongoSingleton.#inctance;
    }
}