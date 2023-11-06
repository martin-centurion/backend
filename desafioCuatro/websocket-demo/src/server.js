import http from 'http';
import { init } from './db/mongodb.js';
import { inits } from './socket.js';
//import { allProducts } from './routers/products.router.js';
//import ProductManager from './classes/productManager.js';
import app from './app.js';

await init();

//const productManager = new ProductManager();
const server = http.createServer(app);
//const serverSocket = new Server(serverHttp);
const PORT = 8080;

const serverHttp = server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});

// serverSocket.on('connection', (socketClient) => {
//     console.log(`Cliente conectado desde el servidor. Id: ${socketClient.id}`);

//     socketClient.emit('allProducts', allProducts);

//     socketClient.on('addProduct', async (newProduct) => {
//             await productManager.addProduct(newProduct);
//             let products = await allProducts();
//             socketClient.emit('listProducts', products);
//     })

// })

inits(serverHttp);