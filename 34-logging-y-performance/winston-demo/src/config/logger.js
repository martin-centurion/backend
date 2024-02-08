import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'http' }),
        new winston.transports.File({ filename: './error.log', level: 'warn' }),
    ],
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${ (new Date()).toLocaleTimeString()}`);
    req.logger.error('Esta es una prueba de log error.');
    req.logger.warn('Este es una prueba de log warn.')
    next();
}