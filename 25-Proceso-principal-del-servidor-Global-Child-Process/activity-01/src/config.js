import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('--mode <mode>', 'mode environmet', 'dev')
    .parse();

let pathEnvFile = null;

if (program.opts().mode !== 'prod') {
    pathEnvFile = './.env.dev'
} else {
    pathEnvFile = './.env.prod'
}
dotenv.config({ path: pathEnvFile });

export default {
    port: process.env.PORT,
    env: process.env.ENV,
    db: {
        mongodbUri: process.env.MONGODB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
}