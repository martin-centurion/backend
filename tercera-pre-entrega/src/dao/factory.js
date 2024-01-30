import config from "../config.js";

export let ProductDao;

switch (config.persistence) {
    case 'mongodb':
        ProductDao = (await import('./product.dao.js')).default;
        break;
    case 'mongodb':
        ProductDao = (await import('./product.memory.dao.js')).default;
        break;
    default:
        break;
}