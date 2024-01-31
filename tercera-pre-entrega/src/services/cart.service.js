import { cartRepository } from "../repositories/index.js";

export default class CartService {
    static findAll(filter = {}) {
        return cartRepository.get(filter)
    }

    static create(payload) {
        return cart = cartRepository.create(payload);
        
    }

    static findById(cartid){
        console.log('cartRepository', cartRepository);
        return cartRepository.getById(cartid);
    }

    static updateById(cartid, payload) {
        return cartRepository.updateById(cartid, payload);
    }

    static deleteById(cartid) {
        return cartRepository.deleteById(cartid);
    }

    static async addProductToCart(cid, pid) {
        return cartRepository.addProduct(cid, pid);
      }
}