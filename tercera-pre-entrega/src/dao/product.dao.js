import ProductModel from "../models/product.model.js";

export default class ProductDao {
    get(filter = {}) {
        const criteria = {};
        if (filter.id) {
            criteria._id = id;
        }
        return ProductModel.find(criteria);
    }

    create(data) {
        return ProductModel.create(data);
    }

    getById(pid) {
        return ProductModel.findById(pid);
    }

    updateById(pid, data) {
        return ProductModel.updateOne({ _id: pid }, { $set: data });
    }

    deleteById(pid) {
        return ProductModel.deleteOne({ _id: pid });
    }
}