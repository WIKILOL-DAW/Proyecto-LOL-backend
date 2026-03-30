import express, { request, Request, Response } from "express";
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
        const { nombre , nombreLiga} = request.body;

        const equipoPost = {
            nombre,
            nombreLiga
        }

        const equipo: Equipo = await equipoUsesCases.insertarEquipo(equipoPost);

        response.status(200).send({
            equipo
        })

    } catch (error) {
        console.log("ERROR TRY: " , error);
        
        response.status(500).send({
            message: "Error al insertar el equipo"
        })
    }
});

export default router