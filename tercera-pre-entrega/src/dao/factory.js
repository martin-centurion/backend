import config from "../config.js";

export let ProductDao;
export let UserDao;

switch (config.persistence) {
    case 'mongodb':
        ProductDao = (await import('./product.dao.js')).default;
        UserDao = (await import('./user.dao.js')).default;
        break;
    case 'memory':
        ProductDao = (await import('./product.memory.dao.js')).default;
        UserDao = (await import('./user.memory.dao.js')).default;
        break;
    default:
        break;
}