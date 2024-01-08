import UserDao from "../dao/user.dao.js";
import { Exception } from "../utils.js";
import userDto from '../dto/user.dto.js';

export default class UserService {
    static async getUsers(query = {}) {
        try {
          const users = await UserDao.get(query);
          return users.map(user => new userDto(user))
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
      }

    static async getUserById(uid) {
        try {
        const user = await UserDao.getById(uid);
        if (!user) {
            throw new Exception("No existe el usuario", 404);
        }
        return user;
        } catch (error) {
        throw new Exception(error.message, error.status);
        }
    }

    static async createUser(userData) {
        try {
          return await UserDao.createUser(userData);
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
    }

    static async updateById(uid, data) {
        try {
          const user = await UserDao.getById(uid);
          if (!user) throw new Exception('El usuario no existe', 404);
    
          const criterio = { _id: uid };
          const operation = { $set: data };
    
          await UserDao.updateById(criterio, operation);
          console.log('Usuario actualizado');
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
    }

    static async updatePassword(uid, data) {
        try {
          const user = await UserDao.getById(uid);
          if (!user) throw new Exception("El usuario no existe", 404);
          const criterio = { _id: uid };
          const operation = { $set: {'password': data} };
          
          await UserDao.updateById(criterio, operation);
          console.log("Usuario actualizado");
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
    }

    static async deleteById(uid) {
    try {
      const user = await UserDao.getById(uid);
      if (!user) throw new Exception("El usuario no existe", 404);

      const criterio = { _id: uid };
      await UserDao.deleteOne(criterio);

      console.log("Usuario eliminado");
    } catch (error) {
      throw new Exception(error.message, error.status);
    }
  }
}