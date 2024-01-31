import ProductDTO from "../dto/product.dto.js";

export default class Product {
    constructor(dao) {
        this.dao = dao;
    }

    async get(filter = {}) {
        const products = await this.dao.get(filter);
        return products.map(product => new ProductDTO(product));
    }

    getById(pid) {
        return this.dao.getById(pid);
    }

    async create(data) {
        const newData = {
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
            thumbnails: data.thumbnails,
            code: data.code,
            category: data.category
        }
        const product = await this.dao.create(newData);
        return new ProductDTO(product);
    }

    updateById(id, data) {
        const newData = {
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
            thumbnails: data.thumbnails,
            code: data.code,
            category: data.category
        }
        return this.dao.updateById(id, newData)
    }

    deleteById(id) {
        return this.dao.deleteById(id)
    }
}