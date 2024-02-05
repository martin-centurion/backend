import http from 'http';
import { init as initMongoDB } from './db/mongodb.js';
import app from './app.js';
import config from './config/config.js';

await initMongoDB();

const server = http.createServer(app);
const PORT = config.port;

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});