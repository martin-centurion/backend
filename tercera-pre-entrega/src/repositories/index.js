import ProductRepository from './product.repository.js';
import UserRepository from './user.repository.js';
import CartRepository from './cart.repository.js';
import { ProductDao, UserDao, CartDao } from '../dao/factory.js';

export const productRepository = new ProductRepository(new ProductDao());
export const userRepository = new UserRepository(new UserDao());
export const cartRepository = new CartRepository(new CartDao());