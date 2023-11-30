import path from 'path';
import passport from 'passport';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const verifyPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const JWT_SECRET = '1234';

export const tokenGenerator = (user) => {
    const {
        _id: id,
        first_name,
        last_name,
        dni,
        email,
        role
    } = user;
    const payload = { 
        id,
        first_name,
        last_name,
        dni,
        email,
        role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' })
};

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (error, payload) => {
            if(error) {
                return reject(error);
            }
                resolve(payload);
        })
    })
}

export const authPolicies = (roles) => (req, res, next) => {
    if (roles.includes('student')) {
        return next();
    }
    const { role } = req.user;
    if (!roles.includes(role)) {
        return res.status(403).json({ message: 'No tienes permiso para estar aqui.' })
    }
    return next()
}
