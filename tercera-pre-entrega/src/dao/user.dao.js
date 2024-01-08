import UserModel from '../models/user.model.js';
import { Exception } from '../utils.js';

export default class UserDao {
    static async get(query = {}) {
        try {
          const users = await UserModel.find(query);
          return users;
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
      }
    
      static async getById(uid) {
        try {
          const user = await UserModel.findById(uid);
          return user
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
      };

      static async createUser(userData) {
        try {
          const user = await UserModel.create(userData);
          console.log("Usuario creado");
          return { message: "Usuario creado" };
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
      };

      static async updateById(uid, data) {
        try {
          await UserModel.updateOne(uid, data);
          return { message: "Usuario actualizado" };
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
      };

      // Falta agregar la busqueda de usuarios por email

      static async deleteOne(uid) {
        try {
          await UserModel.deleteOne(uid);
          return { message: "Usuario eliminado" };
        } catch (error) {
          throw new Exception(error.message, error.status);
        }
      }
    
}