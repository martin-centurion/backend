import ProductRepository from './product.repository.js';
import UserRepository from './user.repository.js';
import { ProductDao, UserDao } from '../dao/factory.js';

export const productRepository = new ProductRepository(new ProductDao());

export const userRepository = new UserRepository(new UserDao());