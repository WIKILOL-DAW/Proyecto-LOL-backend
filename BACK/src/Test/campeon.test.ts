
import request from 'supertest';
import express from 'express';
import router from '../Campeon/infraestructure/rest/Campeon.restController';

const app = express();

app.use(express.json());
app.use('/campeones', router);

describe('Endpoints de Campeones', () => {

    test('POST /insertarCampeon -> debe insertar un campeón', async () => {

        const nuevoCampeon = {
            nombre: 'Ahri',
            posicion: 'Mid',
            descripcion: 'Zorra de nueve colas',
            imagen: 'ahri.png'
        };

        const response = await request(app)
            .post('/campeones/insertarCampeon')
            .send(nuevoCampeon);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('campeon');
    });

    test('GET /verCampeones -> debe devolver todos los campeones', async () => {

        const response = await request(app)
            .get('/campeones/verCampeones');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('campeon');
    });

    test('PATCH /modificarCampeon -> debe modificar un campeón', async () => {

        const campeonActualizado = {
            id: 1,
            nombre: 'Lux',
            descripcion: 'La dama luminosa actualizada',
            imagen: 'lux.png'
        };

        const response = await request(app)
            .patch('/campeones/modificarCampeon')
            .send(campeonActualizado);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('actualizarCampeon');
    });

});