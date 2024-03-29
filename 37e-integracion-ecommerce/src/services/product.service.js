import ProductDao from "../dao/product.dao.js";
import { loggerDev } from "../config/logger.js";

export default class ProductService {
    static findAll(filter = {}) {
        return ProductDao.get(filter);
      }
    
      static async create(payload) {
        loggerDev.info('Creando un nuevo producto.');
        const isPremiumUser = user.role === 'premium';
        const owner = isPremiumUser ? user.email : 'admin';
        const productData = { ...payload, owner };
        const product = await ProductDao.create(productData);
        loggerDev.info(`Producto creado correctamente (${product._id}).`);
        return product;
      }
    
      static findById(uid) {
        return ProductDao.getById(uid);
      }
    
      static updateById(uid, payload) {
        return ProductDao.updateById(uid, payload);
      }
    
      static deleteById(uid) {
        return ProductDao.deleteById(uid);
      }
}