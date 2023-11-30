import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from '../utils.js';

function cookieExtractor(req) {
    let token = null;
    if (req && req.signedCookies) {
        return token = req.signedCookies['access_token'];
    }
}

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:JWT_SECRET
}

export const init = () => {
    passport.use('jwt', new JwtStrategy( opts, (payload, done) => {
        return done(null, payload);
    }));
};
