// jugador.test.ts

import request from 'supertest';
import express from 'express';
import router from '../';

const app = express();

app.use(express.json());
app.use('/jugadores', router);

describe('Endpoints de Jugadores', () => {

    test('POST /insertarJugador -> debe insertar un jugador', async () => {

        const nuevoJugador = {
            alias: 'Faker',
            nacionalidad: 'Coreano',
            posicion: 'Mid',
            nombreEquipo: 'T1',
            imagen: 'faker.png'
        };

        const response = await request(app)
            .post('/jugadores/insertarJugador')
            .send(nuevoJugador);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('jugador');
    });

    test('GET /verJugadores -> debe devolver todos los jugadores', async () => {

        const response = await request(app)
            .get('/jugadores/verJugadores');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('jugadores');
    });

    test('DELETE /borrarJugador/:alias -> debe borrar un jugador', async () => {

        const response = await request(app)
            .delete('/jugadores/borrarJugador/Faker');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('borrarEquipo');
    });

    test('PATCH /modificarJugador -> debe modificar un jugador', async () => {

        const jugadorActualizado = {
            id: 1,
            alias: 'Faker',
            posicion: 'Top',
            imagen: 'faker-new.png'
        };

        const response = await request(app)
            .patch('/jugadores/modificarJugador')
            .send(jugadorActualizado);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('actualizarJugador');
    });

});