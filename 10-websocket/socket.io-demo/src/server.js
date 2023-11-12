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
    console.log(`Se ha conectado un nuevo cliente > Id: ${socketClient.id}`);

    socketClient.on('new-message', (message) => {
        console.log(`El cliente ${socketClient.id} ha enviado este mensaje: ${message}`);
    });

    socketClient.on('disconnect', () => {
        console.log(`Se ha desconectado el cliente > Id: ${socketClient.id}`);
    });

    socketClient.emit('mensaje_directo', 'Este es un mensaje directo al cliente actual.');

    socketClient.broadcast.emit('mensaje_a_todos', 'Este es un mensaje a todos los cliente, excepto el cliente actual.');

    serverSocket.emit('mensaje_a_todoss', 'Este mensaje este para todos los clientes sin excepción.')
});