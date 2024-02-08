import winston from 'winston';
import config from './config.js';

const loggerProd = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'http' }),
        new winston.transports.File({ filename: './error.log', level: 'warn' }),
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