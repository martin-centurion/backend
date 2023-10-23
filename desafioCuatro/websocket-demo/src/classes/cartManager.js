import fs from 'fs';
import { getNewId } from '../utils.js';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const findedCart = carts.find((c) => c.id === id);
        return findedCart;
        
    }

    async addProductToCart(cartId, prodId) {
        let cart = await this.getCarts();
        const cartIndex = cart.findIndex((c) => c.id === cartId);
        if (cartIndex === -1) {
            throw new Error('No existe un carrito con ese Id');
        }
        const existingProduct = cart[cartIndex].products.find(p => p.prodId === prodId.id);
        if(existingProduct) {
            existingProduct.quantity++;
        } else {
            cart[cartIndex].products.push({
                prodId: prodId.id,
                quantity: 1
            });
        }

        await this.saveCarts(cart)
    }

    async addCart() {
        try {
            const cart = await this.getCarts();
            console.log('Carrito', cart.lenght);
            let newCart = {
                id: getNewId(),
                products: []
            }
            cart.push(newCart);
            await this.saveCarts(cart);
            return newCart;
        } catch (error) {
            throw new Error(error)
        }
    }

    async saveCarts(data) {
        const content = JSON.stringify(data, null, `\t`);
        try {
            await fs.promises.writeFile(this.path, content, 'utf-8');
        } catch (error) {
            throw new Error(`El archivo ${this.path} no pudo ser escrito`);
        }
    }
}

export default CartManager;

