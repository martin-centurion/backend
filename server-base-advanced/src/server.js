import http from 'http';
import { init as initMongoDB } from './db/mongodb.js';
import app from './app.js';

await initMongoDB();

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});