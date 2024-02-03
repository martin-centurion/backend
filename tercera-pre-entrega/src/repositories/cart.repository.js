import CartDTO from "../dto/cart.dto.js";

export default class Cart {
    constructor(dao) {
        this.dao = dao;
    }
    
    async get(filter = {}) {
        const carts = await this.dao.get(filter);
        return carts.map(cart => new CartDTO(cart));
    }

    getById(cid) {
        return this.dao.getById(cid);
    }

    create(data) {
    }

    updateById(id, data) {
    }

    deleteById(id) {
        return this.dao.deleteById(id)
    }
}