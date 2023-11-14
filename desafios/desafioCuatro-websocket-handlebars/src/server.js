import http from 'http';
import { Server } from 'socket.io';

import app from './app.js';

const serverHttp = http.createServer(app);
const serverSocket = new Server(serverHttp);

const PORT = 8080;

serverHttp.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});

serverSocket.on('connection', (socketClient) => {
    console.log(`Se ha conectado un nuevo cliente (${socketClient.id})`);

});
