import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import { 
    isValidPassword, 
    tokenGenerator, 
    createHash
} from "../utils.js";
import { CustomError } from "../utils/CustomError.js"
import EnumsError from '../utils/enumError.js'
import { generatorUserError, validatorUserError} from "../utils/CauseMessageError.js"

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
            CustomError.createError({
              name: 'Error creando el usuario',
              cause: generatorUserError({
                first_name,
                last_name,
                email,
                age,
                password,
              }),
              message: 'Ocurrio un error mientras intentamos crear un usuario.',
              code: EnumsError.BAD_REQUEST_ERROR,
            });
          }
          let user = await AuthService.findAll({ email });
          if (!user) {
            throw new Error('Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.');
          }
          user = await AuthService.create({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          });
          return user;
    }

    static async login(data) {
        const { email, password } = data;
        const user = await AuthService.getEmail({ email });
        if (!user) {
          CustomError.createError({
            name: 'Error accediendo al usuario ',
            cause: validatorUserError({
              email,
              password,
            }),
            message: 'Contraseña o email invalidos😨.',
            code: EnumsError.INVALID_PARAMS_ERROR,
          })
        }
        const isValidPass = isValidPassword(password, user);
        if (!isValidPass) {
          CustomError.createError({
            name: 'Error accediendo al usuario ',
            cause: validatorUserError({
              email,
              password,
            }),
            message: 'Contraseña o email invalidos😨.',
            code: EnumsError.INVALID_PARAMS_ERROR,
          })
        }
        const token = tokenGenerator(user);
        return token;
    }

    static async recovery(data) {
      const { email, newPassword } = data;
      console.log('data', data);
      const user = await UserService.get({ email });
      console.log('user', user);
      if (!user) {
        CustomError.createError({
          name: 'Error accediendo al usuario ',
          cause: validatorUserError({
            email,
            password,
          }),
          message: 'Contraseña o email invalidos😨.',
          code: EnumsError.INVALID_PARAMS_ERROR,
        })
      }
      const userId = user._id;
      await UserService.updatePassById({ email }, { $set: { password: createHash(newPassword) }});
      return user;
    }
}

