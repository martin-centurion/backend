import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import EmailService from "../services/email.service.js";
import UserModel from "../models/user.model.js";
import { 
    isValidPassword, 
    tokenGenerator, 
    createHash
} from "../utils.js";
import { CustomError } from "../utils/CustomError.js"
import EnumsError from '../utils/EnumsError.js'
import { generatorUserError, validatorUserError} from "../utils/CauseMessageError.js";
import userModel from "../models/user.model.js";

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
          let registeredUser = await AuthService.create({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          });
          const emailService = EmailService.getInstance();
          await emailService.sendWelcomeEmail(registeredUser);
          return user;
    }

    static async login(data) {
      const { 
          email, 
          password 
      } = data;
        /* if (email === Admin.email && password === Admin.password) {
         
          const token = tokenGenerator({
              first_name: 'admin',
              last_name: 'admin',
              email: 'admin@gmail.com',
              role: 'admin'
          });
  
          return token;
        } */
      if (!email || !password) {
        CustomError.createError({
          name: 'Error accediendo al usuario',
          cause: validatorUserError({
            email,
            password,
          }),
          message: 'Contraseña o email invalidos.',
          code: EnumsError.INVALID_PARAMS_ERROR,
        })
      }
      const user = await AuthService.getEmail({ email });
      const isValidPass = isValidPassword(password, user);
      if (!isValidPass) {
        CustomError.createError({
          name: 'Error accediendo al usuario ',
          cause: validatorUserError({
            email,
            password,
          }),
          message: 'Contraseña o email invalidos.',
          code: EnumsError.INVALID_PARAMS_ERROR,
        })
      }
      const token = tokenGenerator(user);
      return token;
  }

  // Corregir no funciona
    static async recovery(data) {
      const { email, newPassword } = data;
      const user = await UserService.get({ email });
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
      await UserModel.updateOne({ email }, { $set: { password: createHash(newPassword) }});
      return user;
    }

    static async restorePassword(data) {
      const { email } = data;
      const user = await UserService.get({ email });
        if (!user) {
          CustomError.createError({
            name: 'Error accediendo al usuario ',
            cause: validatorUserError({
              email,
              password,
            }),
            message: 'No hay ningun ususario registrado con ese email 😨.',
            code: EnumsError.INVALID_PARAMS_ERROR,
          })
        };
      const emailService = EmailService.getInstance();
      await emailService.sendRecoveryPasswordEmail(user);
  
      return user
    };

    static async changeUserRole(uid){
      const userToUpdate = await UserService.findById(uid);
      if (!userToUpdate) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const userRole =  userToUpdate.role
      const userUpdate = userRole === 'user' ? 'premium' : 'user';
      const userToUp = {
          ...userToUpdate,
           role: userUpdate
          };
      await AuthService.updateById(uid, userToUp);
      return userUpdate
  }}


