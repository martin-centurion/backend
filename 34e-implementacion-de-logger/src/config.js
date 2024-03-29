import dotenv from 'dotenv';

let pathEnvFile = null;

if (process.env.ENV !== 'production') {
    pathEnvFile = './.env.dev'
} else {
    pathEnvFile = './.env.prod'
}

dotenv.config({ path: pathEnvFile });

export default {
    port: process.env.PORT,
    env: process.env.ENV,
    persistence: process.env.PERSISTENCE || 'memory',
    db: {
        mongodbUri: process.env.MONGODB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    user_email: process.env.GMAIL_USER,
    user_pass: process.env.GMAIL_PASS,
    twilio: {
        accountSID: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER
    }
}