import config from "../config/config.js";

export let ContactDao;

switch (config.persistence) {
    case 'mongodb':
        ContactDao = (await import('./contact.mongodb.dao.js')).default;
        break;
    case 'file':
        ContactDao = (await import('./contact.memory.dao.js')).default;
        break;
    default:
        break;
}