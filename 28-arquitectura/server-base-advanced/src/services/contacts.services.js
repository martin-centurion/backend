import ContactDao from "../dao/contact.mongodb.dao.js";

const dao = new ContactDao();

export default class ContactService {
    static findAll(filter = {}) {
        return dao.get(filter)
    }
    static create(data) {
        return dao.create(data)
    }
    static updateById(id, data) {
        return dao.updateById(id, data)
    }
    static deleteById(id) {
        return dao.deleteById(id);
    }
}