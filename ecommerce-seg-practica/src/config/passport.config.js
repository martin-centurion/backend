import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { JWT_SECRET } from '../utils.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/user.model.js';

function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        return token = req.cookies.access_token;
    }
};

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET
};

export const init = () => {
    passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
        return done (null, payload);
    }));
};
