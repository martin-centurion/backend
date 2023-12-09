import UserModel from "../models/user.model.js";

export default class UserController {
    static async get(query = {}) {
        const users = await UserModel.find(query);
        return users;
    }

    static async create(data) {
        console.log('Creando nuevo usuario');
        const user = await UserModel.create(data);
        console.log('Usuario creado correctamente');
        return user;
    }

    static async getById(uid) {
        const user = await UserModel.findById(uid);
        return user;
    }

    static async updateById(uid, data) {
        console.log('Actualizando el usuario.');
        await UserModel.updateOne({ _id: uid }, { $set: data });
        console.log('Usuario actualizado correctamente');
    }

    static async deleteById(uid) {
        console.log('Eliminando usuario.');
        await UserModel.deleteOne({ _id: uid });
        console.log('Usuario eliminado correctamente');
    }
}