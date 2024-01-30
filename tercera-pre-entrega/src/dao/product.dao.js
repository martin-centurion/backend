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

    /* static async productExists(pid) {
        console.log(await ProductModel.findOne({ _id: pid }));
        try {
          return await ProductModel.findOne({ _id: pid });
        } catch (error) {
          return false;
        }
      } */

    getById(pid) {
        return ProductModel.findById(pid);
    }

    updateById(pid, data) {
        return ProductModel.updateOne({ id: pid }, { $set: data });
    }

    deleteById(pid) {
        return ProductModel.deleteOne({ id: pid });
    }
}