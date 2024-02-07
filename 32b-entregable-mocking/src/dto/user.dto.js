export default class UserDTO {
    constructor(user) {
        this.fullname = `${user.first_name} ${user.last_name}`;
        this.id = user.id || user._id;
        this.age = user.age;
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
    }
}