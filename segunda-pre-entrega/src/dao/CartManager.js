import cartModel from "../models/cart.model.js";
import { Exception } from "../utils.js";

export default class CartManager {
    static get(query = {}) {
        const criteria = {};
        return cartModel.find(criteria)
    }

    static async create(data) {
        const cart = await cartModel.create(data);
        console.log('Se ha creado el carrito exitosamente');
        return cart;
    }

    static async getById(cartid){
        const cart = await cartModel.findById(cartid);
        console.log('Cart', cart);
        if(!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        return cart;
    }

    static async deleteById(cartid) {
        const cart = await cartModel.findById(cartid);
        if(!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        const criteria = { _id: cartid };
        await cartModel.deleteOne(criteria)
        console.log('Se ha eliminado el carrito elegido');
    }

    static async addProductToCart(cartid, pid) {
        const cart = await cartModel.findById(cartid);
        console.log('Cart', cart);
        if(!cart) {
            throw new Exception('No se ha encontrado el carrito', 404)
        }
        const index = cart.products.findIndez((product) => String(product._id) === pid);
        if(index === 1) {
            cart.products.push({ product: pid, quantity: 1})
        } else {
            cart.products[index].quantity ++;
        }

        await cartModel.updateOne({ _id: cartid }, cart );
    }
}