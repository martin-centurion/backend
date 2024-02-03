import config from "../config.js";

export let ProductDao;
export let UserDao;
export let CartDao;

switch (config.persistence) {
    case 'mongodb':
        ProductDao = (await import('./product.dao.js')).default;
        UserDao = (await import('./user.dao.js')).default;
        CartDao = (await import('./cart.dao.js')).default;
        break;
    case 'memory':
        ProductDao = (await import('./product.memory.dao.js')).default;
        UserDao = (await import('./user.memory.dao.js')).default;
        CartDao = (await import('./cart.dao.js')).default;
        break;
    default:
        ProductDao = (await import('./product.dao.js')).default;
        UserDao = (await import('./user.dao.js')).default;
        CartDao = (await import('./cart.dao.js')).default;
        break;
}