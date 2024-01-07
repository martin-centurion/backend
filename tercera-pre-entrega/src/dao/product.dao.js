import ProductModel from "../models/product.model.js";
import { Exception } from "../utils.js";

export default class ProductDao {

    static async get( filter, options ) {
        try {
            const response = await ProductModel.paginate(filter, options);
            return response;
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async getById(pid) {
        try {
            const product = await ProductModel.findById(pid);
            return product;
        } catch (error) {
            throw new Exception(error.message, error.status)
        }
    }

    static async createProduct(product) {
        try {
            const newProduct = await ProductModel.create(product);
            console.log('Producto creado.');
            return newProduct;
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }

    static async updateOne(pid, data) {
        try {
            const response = await ProductModel.updateOne(pid, data);
            console.log('Producto Actualizado');
            return { message: 'Producto actualizado.'}
        } catch (error) {
            throw new Exception(error.message, error.status)
        }
    }

    static async deleteById(pid) {
        try {
            const response = await ProductModel.deleteOne({ _id: pid });
            console.log('Producto eliminado');
            return { message: 'Producto eliminado' };
        } catch (error) {
            throw new Exception(error.message, error.status);
        }
    }
}