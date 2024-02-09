import CartDao from "../dao/cart.dao.js";

export default class CartService {
    static get(filter = {}) {
        return CartDao.get(filter)
    }

    static async create(payload) {
        console.log('Creando un nuevo carrito.');
        const cart = await CartDao.create(payload);
        console.log('Se ha creado el carrito exitosamente');
        return cart;
    }

    static findById(cartid){
        console.log('CartDao', CartDao);
        return CartDao.getById(cartid);
    }

    static updateById(cartid, payload) {
        return CartDao.updateById(cartid, payload);
    }

    static deleteById(cartid) {
        return CartDao.deleteById(cartid);
    }

    static async addProductToCart(cid, pid) {
        return CartDao.addProduct(cid, pid);
      }
}