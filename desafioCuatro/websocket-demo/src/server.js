import http from 'http';
import { Server } from 'socket.io';
import { allProducts } from './routers/products.router.js';
import ProductManager from './classes/productManager.js';
import app from './app.js';

const productManager = new ProductManager();
const serverHttp = http.createServer(app);
const serverSocket = new Server(serverHttp);

const PORT = 8080;

serverHttp.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});

serverSocket.on('connection', (socketClient) => {
    console.log(`Cliente conectado desde el servidor. Id: ${socketClient.id}`);

    socketClient.emit('allProducts', allProducts);

    socketClient.on('addProduct', async (newProduct) => {
            await productManager.addProduct(newProduct)
            let products = await allProducts()
            io.emit('listProducts', products)
    })

})

export default serverSocket;