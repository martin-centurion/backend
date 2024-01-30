import ContactService from '../services/contacts.services.js';

export default class ContactController {
    static findAll(filter = {}) {
        return ContactService.findAll(filter);
    }
    static async findById(id) {
        const result = await ContactService.findAll({ id });
        return result[0];
    }
    static create(data) {
        return ContactService.create(data)
    }
    static updateById(id, data) {
        return ContactService.updateById(id, data)
    }
    static deleteById(id) {
        return ContactService.deleteById(id);
    }
}