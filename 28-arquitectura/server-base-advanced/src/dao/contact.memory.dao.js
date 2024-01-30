export default class Contact {
    constructor() {
        this.contacts = [
            {
                id: 1,
                first_name: 'Juan',
                last_name: 'Lopez',
                phone: '23232232',
                email: 'jl@gmail.com'
            }
        ];
    }

    get(filter = {}) {
        return this.contacts;
    }

    create(data) {
        const newContact = {
            ...data,
            id: this.contacts.length + 1,
        };
        this.contacts.push(newContact);
        return newContact;
    }

    updateById(id, data) {
        const index = this.contacts.findIndex(c => c.id === parseInt(id));
        this.contacts[index] = {
            ...this.contacts[index],
            ...data, 
            id: parseInt(id) 
        };
        return this.contacts[index];
    }

    deleteById(id) {
        const index = this.contacts.findIndex(c => c.id === parseInt(id));
        const result = this.contacts.splice(index, 1);
        return result;
    }
}