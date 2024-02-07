import UserService from "../services/user.service.js";
import { 
    isValidPassword, 
    tokenGenerator, 
    createHash
} from "../utils.js";

export default class AuthController {
    static async register(data) {
        const {
            first_name,
            last_name,
            age,
            email,
            password,
          } = data;
          if (
            !first_name ||
            !last_name ||
            !age ||
            !email ||
            !password
          ) {
            throw new Error('Todos los campos son requeridos 😨');
          }
          let user = await UserService.findAll({ email });
          console.log('user', user);
          if (!user) {
            throw new Error('Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.');
          }
          user = await UserService.create({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          });
          return user;
    }

    static async login() {}
}