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
    adminName:process.env.ADMIN_NAME,
    adminLastname: process.env.ADMIN_LASTNAME,
    adminEmail: process.env.ADMIN_LASTNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminRole: process.env.ADMIN_ROLE,
    db: {
        mongodbUri: process.env.MONGODB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    mail: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        port: process.env.EMAIL_PORT || 587,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
    },
    twilio: {
        accountSID: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER
    }
}