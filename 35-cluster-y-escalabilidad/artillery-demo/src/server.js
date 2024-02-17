import http from 'http';
import cluster from 'cluster';

console.log(`PID ${process.pid} : cluster.isPrimary: ${cluster.isPrimary}`);

import app from './app.js';
import { log } from 'console';

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});