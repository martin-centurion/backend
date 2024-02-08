import UserDTO from "../dto/user.dto.js";

export default class User {
    constructor(dao) {
        this.dao = dao;
    }

    async getEmail(email) {
        return this.dao.getEmail(email)
        /* const user = new UserDTO(await this.dao.getEmail(email));
        return user   */
    }
    async get(filter = {}) {
        const users = await this.dao.get(filter);
        return users.map(user => new UserDTO(user));
    }

    getById(uid) {
        return this.dao.getById(uid);
    }

    async create(data) {
        const newData = {
            first_name: data.first_name,
            last_name: data.last_name,
            age: data.age,
            email: data.email,
            password: data.password,
            cart: data.cart
        }
        const user = await this.dao.create(newData);
        return new UserDTO(user);
    }

    updatePassById(id, userUpdated) {
        return this.dao.updateById(id, userUpdated);
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