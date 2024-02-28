import { expect } from 'chai';
import supertest from 'supertest';
import { getNewId } from '../src/utils.js';
import mongoose from 'mongoose';
import config from '../src/config.js';

// const expect = chai.expect;
const requester = supertest('http://localhost:3000');

describe('Tests del modulo products', function () {
    this.timeout(8000);
    let cookie;

    const userMock = {
        first_name: 'Nombre',
        last_name: 'Apellido',
        email: 'na@hotmail.com',
        age: 50,
        password: '1234',
        role: 'admin'
    };
    before(async () => {
        await mongoose.connect(config.db.mongodbUriTest);
        await requester.post('/auth/register').send(userMock);

        const {
            headers,
            statusCode,
            ok,
            _body
        } = await requester.post('/auth/login').send(userMock);
        // console.log(headers)
        await requester.post('/auth/login').send(userMock);
        const [key, value] = headers['set-cookie'][0].split('=');
        cookie = { key, value };
    });


    after(async function () {
        await mongoose.connection.close();
    })
    it('Debe crear un producto correctamente', async function () {
        const productMock = {
            title: '',
            description: '',
            code: getNewId(),
            price: '',
            stock: '',
            category: ''
        };
        const {
            statusCode,
            ok,
            _body,
        } = await requester.post('/products')
            .send(productMock)
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);;

        // console.log("statusCode", statusCode)
        // console.log("ok", ok)
    
        expect(statusCode).to.be.equals(201);
        expect(ok).to.be.ok;
        expect(_body).to.have.property('message', 'Producto creado con éxito')
    });

    it('Obtiene la lista de productos', async function () {
        const {
            statusCode,
            ok,
            _body
        } = await requester.get('/products')
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);
         console.log("body", _body)
         console.log('ok',ok);
        expect(statusCode).to.be.equals(200);
        expect(ok).to.be.ok;
        expect(Array.isArray(_body.payload)).to.be.ok
        // expect(_body.docs).to.have.length(1)

    });

    it('Obtiene un producto por su id', async function () {
        let { _body: firstResponseBody } = await requester.get('/products')
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);
console.log('bodyd', firstResponseBody);
        const pid = firstResponseBody.payload[0]._id;
console.log('pid',pid);
        const {
            statusCode,
            ok,
            _body
        } = await requester.get(`/products/${pid}`)
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);

        expect(statusCode).to.be.equals(200);
    });

    it('Crea 5 productos Mocking', async function () {
        let { statusCode, ok, _body } = await requester.get('/mockingproducts')
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);

        expect(statusCode).to.be.equals(200);
        expect(ok).to.be.ok;
        expect(_body).to.have.property('message', 'Productos creados')

    })


});