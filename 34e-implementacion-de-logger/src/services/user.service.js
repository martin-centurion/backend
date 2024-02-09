import { userRepository } from "../repositories/index.js";

export default class UserService {
    static findAll(filter = {}) {
        return userRepository.get(filter)
    }

    static get(criteria = {}) {
        return userRepository.getEmail(criteria);
    }

    static findById(uid) {
        console.log('User', uid);
        return userRepository.getById(uid);
    }

    /* static async create(data) {
        console.log('Creando un nuevo usuario.');
        const user = await userRepository.create(data);
        console.log('se ha creado el usuario exitosamente.');
        return user;
    } */

    static updatePassById(uid, data) {
        return userRepository.updatePassById({ _id: uid }, { $set: data });
    }

    static updateById(uid, data) {
        return userRepository.updateById({ _id: uid }, { $set: data });
    }

    static deleteById(uid) {
        return userRepository.deleteById(uid);
    }
}