import CartService from "../services/cart.service.js";
import { Exception } from "../utils.js";

export default class CartController {

    static create(data) {
        return cart = CartService.create(data);
    }

    static async getCarts(query = {}) {
        const cart = await CartService.findAll(query);
        return cart;
    }

    static async findById(cartid){
        const cart = await CartService.findById(cartid);
        if(!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        return cart;
    }

    static async updateById(cartid, data) {
        await CartController.getById(cartid);
        if(!cart) {
            throw new Exception('No existe el carrito.', 404);
        }
        await CartService.updateById(cartid, data);
        console.log('Carrito actualizado correctamente.');
    }

    static async deleteById(cartid) {
        await CartController.getById(cartid);
        if(!cart) {
            throw new Exception('No existe el carrito', 404)
        }
        console.log('Eliminando el carrito.');
        await CartService.deleteById(cartid);
        console.log('Carrito eliminado correctamente.');
    }

    static async deleteProductFromCart(){};

    static async addProductToCart(cid, pid) {
        await CartService.addProductToCart(cid, pid);
        console.log("El producto fue agregado correctamente");
    }
}