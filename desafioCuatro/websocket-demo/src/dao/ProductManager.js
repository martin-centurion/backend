import ProductModel from '../models/product.model.js';
import { Exception } from '../utils.js';

export default class ProductManager {
    static get(query = {}) {
        const criteria = {};
        if(query.title) {
            criteria.title = query.title;
        };
        return ProductModel.find(criteria);
    }

    static async getById(pid) {
        const product = await ProductModel.findById(pid);
        if(!product) {
            throw new Exception('No existe el producto.',  404);
        };
        return product;
    }

    static async create(data) {
        const product = await ProductModel.create(data);
        console.log('Producto creado correctamente.');
        return product;
    }

    static async updateById(sid, data) {
        const product = await ProductModel.findById(sid);
        if(!student) {
        throw new Exception('No existe el producto.', 404);
        };
        const criteria = { _id: sid };
        const operation = { $set: data };
        await ProductModel.updateOne(criteria, operation);
        console.log('Producto actualizado correctamente.');
    }

    static async deleteById(sid) {
        const product = await ProductModel.findById(sid);
        if(!product) {
        throw new Exception('No existe el producto.', 404);
        };
        const criteria = { _id: sid };
        await ProductModel.deleteOne(criteria);
        console.log('Producto eliminado correctamente.');
    }
};