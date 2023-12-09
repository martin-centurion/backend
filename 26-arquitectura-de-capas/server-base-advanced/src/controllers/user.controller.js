import UsersService from "../services/user.services.js";

export default class UserController {
    static async get(query = {}) {
        const users = await UsersService.findAll(query);
        return users;
    }

    static async create(data) {
        console.log('Creando nuevo usuario');
        const user = await UsersService.create(data);
        console.log('Usuario creado correctamente');
        return user;
    }

    static async getById(uid) {
        const user = await UsersService.findById(uid);
        if (!user) {
            throw new Error(`Id de usuario no encontrado: ${uid}`)
        }
        return user;
    }

    static async updateById(uid, data) {
        await UserController.getById(uid);
        console.log('Actualizando el usuario.');
        await UsersService.updateById(uid,data);
        console.log('Usuario actualizado correctamente');
    }

    static async deleteById(uid) {
        await UserController.getById(uid);
        console.log('Eliminando usuario.');
        await UsersService.deleteById(uid );
        console.log('Usuario eliminado correctamente');
    }
}