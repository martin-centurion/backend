import ProductService from "../services/product.service.js";
import { Exception } from "../utils.js";

export default class ProductController {
    static findAll(filter = {}) {
        return ProductService.findAll(filter);
    }

    static async create(data) {
        return ProductService.create(data);
    }
    
    static async findById(pid) {
        const product = await ProductService.findById(pid);
        if (!product) {
            throw new Exception('No existe el producto', 404);
        }
        return product;
    }
    
    static async updateById(pid, data) {
        return ProductService.updateById(pid, data);
     }
    
    static async deleteById(pid) {
        return ProductService.deleteById(pid);
    }
}