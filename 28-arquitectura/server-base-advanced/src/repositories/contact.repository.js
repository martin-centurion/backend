import ContactDTO from "../dto/contact.dto.js";

export default class Contact {
    constructor(dao) {
        this.dao = dao;
    }

    async get(filter = {}) {
        const contacts = await this.dao.get(filter);
        return contacts.map(contact => new ContactDTO(contact));
    }

    async create(data) {
        const [first_name, last_name] = data.fullname.split(' ');
        const newData = {
            first_name,
            last_name,
            email: data.email,
            phone: data.phone
        }
        const contact = await this.dao.create(newData);
        return new ContactDTO(contact);
    }

    updateById(id, data) {
        const [first_name, last_name] = data.fullname.split(' ');
        const newData = {
            first_name,
            last_name,
            email: data.email[0],
            phone: data.phone[0]
        }
        return this.dao.updateById(id, newData)
    }

    deleteById(id) {
        return this.dao.deleteById(id)
    }
}