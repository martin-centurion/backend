import ProductModel from "../models/product.model.js";

export default class ProductDao {
    static create(data) {
        return ProductModel.create(data);
    }

    static get( criteria = {} ) {
        return ProductModel.find(criteria);
    }

    static async getById(pid) {
        return ProductModel.findById(pid);
    }

    static async updateById(pid, data) {
        return ProductModel.findById({ id: pid }, { $set: data });
    }

    static async deleteById(pid) {
        return ProductModel.deleteOne({ id: pid });
    }
}