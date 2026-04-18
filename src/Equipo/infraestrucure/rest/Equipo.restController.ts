import express, { json, request, Request, Response } from "express";
import EquipoRepository from "../../domain/Equipo.repository";
import EquipoPostgresSQL from "../db/Equipo.repositoryPostgresSQL";
import EquipoUsesCases from "../../application/Equipo.usesCases";
import Equipo from "../../domain/Equipo";

const equipoRepository: EquipoRepository = new EquipoPostgresSQL();
const equipoUsesCases: EquipoUsesCases = new EquipoUsesCases(
    equipoRepository
);

const router = express.Router();

router.post(`/insertarEquipo`, async (request: Request, response: Response) => {

    try {
        const { nombre, nombreLiga, descripcion, imagen } = request.body;

        const equipoPost = {
            nombre,
            nombreLiga,
            descripcion,
            imagen
        }

        const equipo: Equipo = await equipoUsesCases.insertarEquipo(equipoPost);

        response.status(200).send({
            equipo
        })

    } catch (error) {
        console.log("ERROR TRY: ", error);

        response.status(500).send({
            message: "Error al insertar el equipo"
        })
    }
});


router.get(`/verEquipos/:liga`, async (request: Request, response: Response) => {
    try {
        const { liga } = request.params;

        const verEquipos = await equipoUsesCases.verEquiposSegunLiga(liga);

        response.status(200).json({
            verEquipos
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al ver los equipos"
        });
    }
});

router.delete(`/borrarEquipo/:nombre`, async (request: Request, response: Response) => {

    try {

        const { nombre } = request.params;

        const equipo: Equipo = {
            nombre
        }
        const borrarEquipo = await equipoUsesCases.borrarEquipoSegunNombre(equipo);
        response.status(200).json({
            borrarEquipo
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al borrar el equipo"
        });
    }
});

export default router