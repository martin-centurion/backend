import mongoose from "mongoose";
import config from '../config.js';


export default class Mongodb {
    static #instance = null;
    constructor(connection) {
        this.connection = this.connection;
    }
    static async getInstance() {
        if (!Mongodb.#instance) {
        try {
            const connection = await mongoose.connect(config.db.mongodbUri);
            console.log('Database connected.');
            Mongodb.#instance = new Mongodb(connection);
        } catch (error) {
            console.error('Error to connect to database', error.message);
        }
        }
        return Mongodb.#instance;
    }
}