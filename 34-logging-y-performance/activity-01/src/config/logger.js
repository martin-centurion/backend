import winston from 'winston';
import config from './config.js';

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
    }
}

const loggerProd = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ 
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            ), 
        }),
        //new winston.transports.File({ filename: './error.log', level: 'warn' }),
    ],
});

const loggerDev = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'verbose' }),
    ],
});

export const addLogger = (req, res, next) => {
    req.logger = config.ENV === 'prod' ? loggerProd : loggerDev;
    //req.logger.http(`${req.method} en ${req.url} - ${ (new Date()).toLocaleTimeString()}`);
    next();
}