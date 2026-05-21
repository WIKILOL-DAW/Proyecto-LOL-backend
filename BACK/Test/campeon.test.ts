import request from "supertest";
import express from 'express';

const app = express();

app.use(express.json());

app.post('/campeones', (req, res) => {
    const campeon = req.body;

    if (
        !campeon.nombre ||
        !campeon.posicion ||
        !campeon.descripcion ||
        !campeon.imagen
    ) {
        return res.status(400).json({
            message: 'Campeon no puede tener espacios en blanco'
        });
    }

    return res.status(201).json(campeon);
});

app.get('/campeones', (_req, res) => {
    return res.status(200).json([
        {
            nombre: 'Ahri',
            posicion: 'Mid',
            descripcion: 'Zorra de nueve colas',
            imagen: 'ahri.jpg'
        }
    ]);
});

app.put('/campeones', (req, res) => {
    return res.status(200).json(req.body);
});



