import UserDao from "../dao/user.dao.js";

export default class UserService {
    static findAll(filter = {}) {
        return UserDao.getAll(filter)
    }

    static findById(uid) {
        console.log('User', uid);
        return UserDao.getById(uid);
    }

    static async create(data) {
        console.log('Creando un nuevo usuario.');
        const user = await UserDao.create(data);
        console.log('se ha creado el usuario exitosamente.');
        return user;
    }

    static updateById(uid, data) {
        return UserDao.updateById(uid, data);
    }

    static deleteById(uid) {
        return UserDao.deleteById(uid);
    }
}