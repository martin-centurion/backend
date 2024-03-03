import { expect } from 'chai';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import config from '../src/config.js';
import { getNewId } from '../src/utils.js';

const requester = supertest(`http://localhost:${config.port}`);

describe('Test del modulo de carts', function () {

    this.timeout(8000);
    let cookie;
    let pid;
    let cid;
    const userMock = {
        first_name: 'Nombre',
        last_name: 'Apellido',
        email: 'na@hotmail.com',
        age: 50,
        password: '1234',
        role: 'premium'
    };
    const productMock = {
        title: faker.commerce.productName(),
        description: `${faker.commerce.productName()} = ${faker.lorem.word(5)}`,
        code: getNewId(),
        price: faker.number.float({ min: 1, max: 1000000, precision: 0.01 }),
        stock: faker.number.int({ min: 0, max: 10000 }),
        category: faker.commerce.department()
    };

    before(async function () {
        await mongoose.connect(config.db.mongodbUri);
        const {
            statusCode: userStatusCode,
            ok: userOK,
            _body: userBody
        } = await requester.post('/auth/register').send(userMock);


        const {
            headers,

        } = await requester.post('/auth/login').send(userMock);
        const [key, value] = headers['set-cookie'][0].split('=');
        cookie = { key, value };


        const {
            statusCode: statusCodeCurrent,
            ok: okCurrent,
            _body: bodyCurrent
        } = await requester.get('/products')
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);


    console.log("bodyCurrent", bodyCurrent)

        cid = bodyCurrent.userCart;
        pid = bodyCurrent.payload[0]._id
        console.log('cid', cid);
        console.log('pid', pid);

        const {
            statusCode,
            ok,
            _body,
        } = await requester.post('/products').send(productMock)
            .set('Cookie', [`${cookie.key}=${cookie.value}`]);;
        console.log('body b', _body);
        

    })

    after(async function () {
        await mongoose.connection.close();
    })

    it('Obtiene todos los carritos', async function () {
        const {
            statusCode,
            ok,
            _body,
        } = await requester.get('/carts').set('Cookie', [`${cookie.key}=${cookie.value}`]);;;

         console.log("_body", _body)
        expect(statusCode).to.be.equals(201);
        expect(ok).to.be.ok;
        expect(Array.isArray(_body)).to.be.true;

    });

});