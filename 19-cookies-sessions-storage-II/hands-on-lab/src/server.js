import http from 'http';
import { init } from './db/mongodb.js';

import app from './app.js';

await init();

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});