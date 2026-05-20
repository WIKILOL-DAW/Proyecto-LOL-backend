import express, { request, Request, Response } from "express";
import CampeonRepository from "../../domain/Campeon.repository";
import CampeonUsesCases from "../../application/Campeon.usesCases";
import CampeonPostgresSQL from '../db/Campeon.repositoryPostgresSQL';
import Campeon from "../../domain/Campeon";


const campeonRepository: CampeonRepository = new CampeonPostgresSQL();
const campeonUsesCases: CampeonUsesCases = new CampeonUsesCases(
    campeonRepository
);

const router = express.Router();


router.post(`/insertarCampeon`, async (request: Request, response: Response) => {

    try {

        const { nombre, posicion, descripcion, imagen } = request.body;

        const campeonPost = {
            nombre,
            posicion,
            descripcion,
            imagen
        }

        const campeon: Campeon = await campeonUsesCases.insertarCampeon(campeonPost);

        response.status(200).send({
            campeon
        });

    } catch (error) {
        console.error("ERROR:", error);
        response.status(500).json({

            message: "Error al crar un nuevo campeon"
        });
    }
});


router.get(`/verCampeones`, async (request: Request, response: Response) => {

    try {
        const campeon = await campeonUsesCases.verCampeones();
        response.status(200).json({
            campeon
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al mostrrar los campeones"
        });
    }
});


router.patch(`/modificarCampeon`, async (request: Request, response: Response) => {

    try {

        const { id, nombre, descripcion, imagen } = request.body;
        const campeon: Campeon = {
            id,
            nombre,
            descripcion,
            imagen
        }

        const actualizarCampeon = await campeonUsesCases.modificarCampeon(campeon);
        response.status(200).json({
            actualizarCampeon
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al actualizar campeon"
        });
    }
});

export default router;