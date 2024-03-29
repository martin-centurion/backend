import path from 'path';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import config from './config.js';
import { v4 as uuidv4 } from 'uuid';

export const getNewId = () => uuidv4();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

export const tokenGenerator = (user) => {
    const { _id, first_name, last_name, email, role, cart } = user;
    const payload = {
        id: _id,
        first_name,
        last_name,
        email,
        role,
        cart
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1m' });
};

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (error, payload) => {
            if (error) {
                return reject(error)
            }
            resolve(payload);
        })
    })
};

export const authenticationMiddleware = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function(error, user, info) {
        if(error) {
            return next(error);
        }
        if (!user) {
            return res.status(401).json({ message: info.message ? info.message : info.toString() })
        }
        req.user = user;
        next();
    })(req, res, next);
};

export const authorizationMiddleware = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized'});
    };

    const { role: userRole } = req.user;
    if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'No permissions'});
    }
    next();
}

export class Exception extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundException extends Exception {
    constructor(message) {
        super(message, 404);
    }
}

export class InvalidDataException extends Exception {
    constructor(message) {
        super(message, 400);
    }
}

export class UnauthorizedException extends Exception {
    constructor(message) {
        super(message, 401);
    }
}
