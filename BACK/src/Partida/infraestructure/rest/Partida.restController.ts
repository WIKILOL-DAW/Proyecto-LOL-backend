import express, { Request, Response } from "express";
import PartidaRepository from "../../domain/Partida.repository";
import PartidaPostgresSQL from "../db/Partida.repositoryPostgresSQL";
import PartidaUseCases from "../../application/Partida.usesCases";
import Partida from "../../domain/Partida";

const partidaRepository: PartidaRepository = new PartidaPostgresSQL();
const partidaUseCases: PartidaUseCases = new PartidaUseCases(
    partidaRepository
);

const router = express.Router();

router.post(`/nuevaPartida`, async (request: Request, response: Response) => {

    try {
        const {
            fechaPartida,
            equipoRojo,
            equipoAzul,
            equipoGanador,
            killsEquipoAzul,
            killsEquipoRojo,
            torneo,
            split,
            año,
            fase
        } = request.body;

        const partidaPost: Partida = {
            id: 0,
            fechaPartida: new Date(fechaPartida),
            equipoRojo,
            equipoAzul,
            equipoGanador,
            killsEquipoAzul,
            killsEquipoRojo,
            torneo,
            split,
            año,
            fase
        };

        const partida: Partida = await partidaUseCases.nuevaPartida(partidaPost);

        response.status(200).send({
            partida
        });

    } catch (error) {
        console.log("ERROR TRY: ", error);

        response.status(500).send({
            message: "Error al insertar la partida"
        });
    }
});

router.put(`/actualizarPartida/:id`, async (request: Request, response: Response) => {

    try {
        const { id } = request.params;

        const {
            fechaPartida,
            equipoRojo,
            equipoAzul,
            equipoGanador,
            killsEquipoAzul,
            killsEquipoRojo,
            torneo,
            split,
            año,
            fase
        } = request.body;

        const partidaNueva: Partida = {
            id: Number(id),
            fechaPartida: new Date(fechaPartida),
            equipoRojo,
            equipoAzul,
            equipoGanador,
            killsEquipoAzul,
            killsEquipoRojo,
            torneo,
            split,
            año,
            fase
        };

        const partida: Partida = await partidaUseCases.actualizarPartida(id, partidaNueva);

        response.status(200).send({
            partida
        });

    } catch (error) {

        response.status(500).send({
            message: "Error al actualizar la partida"
        });
    }
});

router.get(`/obtenerPartidas`, async (request: Request, response: Response) => {

    try {

        const partidas: Partida[] = await partidaUseCases.obtenerPartidas();

        response.status(200).send({
            partidas
        });

    } catch (error) {
            console.log("error")
        response.status(500).send({
            message: "Error al obtener las partidas"
        });
    }
});

export default router;