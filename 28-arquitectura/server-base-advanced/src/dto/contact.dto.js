export default class ContactDTO {
    constructor(contact) {
        this.fullname = `${contact.first_name} ${contact.last_name}`;
        this.id = contact._id || contact.id;
        this.phone = contact.phone;
        this.email = contact.email;
        this.phones = [contact.phone];
        this.emails = [contact.email]
    }
}