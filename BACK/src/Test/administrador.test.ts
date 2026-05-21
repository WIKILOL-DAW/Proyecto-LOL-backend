// administrador.test.ts

import request from 'supertest';
import express from 'express';
import router from '../Administrador/infrastructure/rest/Administrador.restController';

const app = express();

app.use(express.json());
app.use('/admin', router);

describe('Endpoints de Administrador', () => {

    test('POST /registro -> debe registrar un administrador', async () => {

        const nuevoAdmin = {
            alias: 'admin1',
            correo: 'admin@test.com',
            passwrd: '123456'
        };

        const response = await request(app)
            .post('/admin/registro')
            .send(nuevoAdmin);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('token');
    });

    test('POST /login -> debe iniciar sesión correctamente', async () => {

        const loginAdmin = {
            correo: 'admin@test.com',
            passwrd: '123456'
        };

        const response = await request(app)
            .post('/admin/login')
            .send(loginAdmin);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('token');
    });

    test('POST /login -> debe devolver error si el admin no existe', async () => {

        const loginIncorrecto = {
            correo: 'noexiste@test.com',
            passwrd: '123456'
        };

        const response = await request(app)
            .post('/admin/login')
            .send(loginIncorrecto);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Admin no encontrado');
    });

});