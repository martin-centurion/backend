import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { JWT_SECRET } from '../utils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import UserModel from '../models/user.model.js';

const opts = {
    usernameField: 'email',
    passReqToCallback: true,
};

const githubOpts = {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/sessions/github/callback"
};

function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.access_token;
    }
    return token;
};

export const init = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
    }, (payload, done) => {
        return done(null, payload);
    }));
    passport.use('register', new LocalStrategy (opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error('User already register.'));
            }
            const newUser = await UserModel.create({ 
                ...req.body, 
                password: createHash(password),
            });
            done(null, newUser);
        } catch (error) {
            done(new Error(`Ocurrio un error durante a autenticacion ${error.message}.`));
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(new Error('Email o contraseña invalidos.'));
            }
            const isPassValid = isValidPassword(password, user);
            if (!isPassValid) {
                return done(new Error('Email o contraseña invalidos.'));
            };
            done(null, user);
        } catch (error) {
            done(new Error(`Ocurrio un error durante a autenticacion ${error.message}.`));
        }
    }));

    passport.use('github', new GitHubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        const email = profile._json.email;
        let user = await UserModel.findOne({ email });
        if (user) {
            return done(null, user)
        };
        user = {
            first_name: profile._json.name,
            last_name: '',
            email,
            age: 18,
            password: '',
            provider: 'Github',
        };
        
        const newUser = await UserModel.create(user);
        done(null, newUser);
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user)
    })
};