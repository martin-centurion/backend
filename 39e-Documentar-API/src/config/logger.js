import winston from "winston";
import config from "../config.js";

const customLevelsOptions = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http:4,
      debug: 5,
    },
    colors: {
      fatal:'red',
      error:'yellow',
      warning:'cyan',
      info: 'blue',
      http: 'white',
      debug: 'black',
    }
  };
  export const loggerProd = winston.createLogger({
    levels:customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple(),
        ),
      }),
      new winston.transports.File({ filename: './errorProd.log', level: 'info' })
    ],
  });
  export const loggerDev = winston.createLogger({
  levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple(),
        ),
       }),
       new winston.transports.File({ filename: './errorDev.log', level: 'debug' })
    ],
  });

  
  export const addLogger = (req, res, next) => {
    req.logger = config.env === 'prod' ? loggerProd : loggerDev;
    next();
  };