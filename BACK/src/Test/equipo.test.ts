
import request from 'supertest';
import express from 'express';
import router from '../Equipo/infraestrucure/rest/Equipo.restController';

const app = express();

app.use(express.json());
app.use('/equipos', router);

describe('Endpoints de Equipos', () => {

    test('POST /insertarEquipo -> debe insertar un equipo', async () => {

        const nuevoEquipo = {
            nombre: 'Real Madrid',
            nombreLiga: 'LaLiga',
            descripcion: 'Equipo español',
            imagen: 'realmadrid.png'
        };

        const response = await request(app)
            .post('/equipos/insertarEquipo')
            .send(nuevoEquipo);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('equipo');
    });

    test('GET /verEquipos/:liga -> debe devolver equipos por liga', async () => {

        const response = await request(app)
            .get('/equipos/verEquipos/LaLiga');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('verEquipos');
    });

    test('GET /verEquipos -> debe devolver todos los equipos', async () => {

        const response = await request(app)
            .get('/equipos/verEquipos');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('verEquipos');
    });

    test('DELETE /borrarEquipo/:nombre -> debe borrar un equipo', async () => {

        const response = await request(app)
            .delete('/equipos/borrarEquipo/Real Madrid');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('borrarEquipo');
    });

    test('PATCH /modificarEquipo -> debe modificar un equipo', async () => {

        const equipoActualizado = {
            id: 1,
            nombre: 'Barcelona',
            descripcion: 'Equipo actualizado',
            imagen: 'barcelona.png'
        };

        const response = await request(app)
            .patch('/equipos/modificarEquipo')
            .send(equipoActualizado);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('actualizarEquipo');
    });

});