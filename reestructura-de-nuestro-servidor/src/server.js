import http from 'http';
import { init } from './db/mongodb.js';
import app from './app.js';

await init();

const server = http.createServer(app);
const PORT = process.env.KEY_PORT;
console.log('PORT: ', PORT);

export const serverHttp = server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
