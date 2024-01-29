import http from 'http';
import { init } from './db/mongodb.js';
import app from './app.js';
import config from './config.js';

await init();

const server = http.createServer(app);
const PORT = config.port;
console.log('PORT: ', config.port);

export const serverHttp = server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT} (${config.env})`);
});
