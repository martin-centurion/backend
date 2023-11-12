import http from 'http';
import { Server } from 'socket.io';

import app from './app.js';

const serverHttp = http.createServer(app);
const serverSocket = new Server(serverHttp);

const PORT = 8080;

const messages = [
    {
        socketId: 1234,
        body: 'Hola!'
    }
]

serverHttp.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});

serverSocket.on('connection', (socketClient) => {
    console.log(`Se ha conectado un nuevo cliente > Id: ${socketClient.id}`);

    socketClient.emit('start', messages);

    socketClient.on('new-message', (body) => {
        console.log(`El cliente ${socketClient.id} ha enviado este mensaje: ${body}`);
        const msg = {
            socketId: socketClient.id,
            body,
        }
        messages.push(msg);
        socketClient.broadcast.emit('notification', msg)
    });

    socketClient.on('disconnect', () => {
        console.log(`Se ha desconectado el cliente > Id: ${socketClient.id}`);
    });

});