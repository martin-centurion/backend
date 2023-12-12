import CartService from "../services/cart.service.js";
import { Exception } from "../utils.js";

export default class CartController {

    static async create(data) {
        console.log('Creando el nuevo carrito.');
        const cart = await CartService.create(data);
        console.log('Se ha creado el carrito exitosamente');
        return cart;
    }

    static async get(query = {}) {
        const cart = await CartService.findAll(query);
        return cart;
    }

    static async getById(cartid){
        const cart = await CartService.findById(cartid);
        //const cart = await CartService.findById(cartid).populate('products.product');
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
        await CartService.deleteById(cartid, cart);
        console.log('Carrito eliminado correctamente.');
    }

    // CART.CONTROLLER
    static async addProductToCart(req, res) {
        try {
          const { cid, pid } = req.params;
          await CartService.addProductToCart(cid, pid);
          console.log('Producto agregado correctamente');
        } catch (error) {
          console.log(`No se pudo agregar el producto al carrito`);
        }

      }
}