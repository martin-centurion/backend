import { productRepository } from "../repositories/index.js";

export default class ProductService {
    static findAll(filter = {}) {
      return productRepository.get(filter);
    }
    
    static async create(data) {
      return productRepository.create(data);
    }
    
    static findById(pid) {
      return productRepository.getById(pid);
    }
    
    static updateById(pid, data) {
      return productRepository.updateById(pid, data);
    }
    
    static deleteById(pid) {
      return productRepository.deleteById(pid);
    }
}