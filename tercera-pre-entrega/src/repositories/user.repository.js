import UserDTO from "../dto/user.dto.js";

export default class User {
    constructor(dao) {
        this.dao = dao;
    }

    async get(filter = {}) {
        const users = await this.dao.get(filter);
        return users.map(user => new UserDTO(user));
    }

    async create(data) {
        const [first_name, last_name] = data.fullname.split(' ');
        const newData = {
            first_name,
            last_name,
            age: data.age,
            email: data.email,
            cart: data.cart
        }
        const user = await this.dao.create(newData);
        return new UserDTO(user);
    }

    updateById(id, data) {
        const [first_name, last_name] = data.fullname.split(' ');
        const newData = {
            first_name,
            last_name,
            age: data.age,
            email: data.email,
            cart: data.cart
        }
        return this.dao.updateById(id, newData)
    }

    deleteById(id) {
        return this.dao.deleteById(id)
    }
}