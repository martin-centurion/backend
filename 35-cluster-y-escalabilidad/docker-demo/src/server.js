import http from 'http';

import app from './app.js';
import config from '../config.js';

const server = http.createServer(app);
const PORT = config.port || 8080;

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT} 🚀`);
});

