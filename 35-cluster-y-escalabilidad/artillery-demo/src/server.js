import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';

import app from './app.js';

console.log(`PID ${process.pid} cluster.isPrimary: ${cluster.isPrimary}`);

if (cluster.isPrimary) {
    const cpusNumber = cpus().length;
    console.log(`Soy el proceso principal con PID ${process.pid}. Y dispongo de ${cpusNumber} procesadores.`);
    for (let index = 0; index < cpusNumber; index++) {
        cluster.fork();
    }
} else {
    console.log(`Soy el proceso worker con PID ${process.pid}`);
    const server = http.createServer(app);
    const PORT = 8080;

    server.listen(PORT, () => {
        console.log(`Server running in http://localhost:${PORT} 🚀`);
});
}

