import UserService from '../services/user.service.js';
import { Exception } from '../utils.js';

export default class UserController {
    static async create (data) {
        console.log('Creando un nuevo usuario');
        const user = await UserService.create(data);
        console.log('Se ha creado el carrito exitosamente.');
        return user;
    };

    static async getAll (query = {}) {
        const user = await UserService.findAll(query);
        return user;
    }

    static async getById (uid) {
        const user = await UserService.findById(uid);
        /* if(!user) {
            throw new Exception('No existe el usuario', 404)
        } */
        return user;
    }

    static async updateById(uid, data) {
        await UserController.getById(uid);
        /* if(!user) {
            throw new Exception('No existe el usuario', 404);
        } */
        await UserService.updateById(uid, data);
        console.log('Usuario actualizado correctamente');
    }

    static async deleteById(uid) {
        await UserController.getById(uid);/* 
        if(!user) {
            throw new Exception('No existe el usuario', 404);
        } */
        console.log('Eliminando el usuario.');
        await UserService.deleteById(uid);
        console.log('Usuario eliminado correctamente');
    }

  }