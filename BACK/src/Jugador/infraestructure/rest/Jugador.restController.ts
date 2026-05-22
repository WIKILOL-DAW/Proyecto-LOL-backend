import express, { request, Request, Response } from "express";
import JugadorRepository from '../../domain/Jugador.repository'
import JugadorUsesCases from '../../aplication/Jugador.useCases'
import JugadorPostgresSQL from '../db/Juador.repository.postgres'
import Jugador from "../../domain/Jugador";


const jugadorRepository: JugadorRepository = new JugadorPostgresSQL();
const jugadorUsesCases: JugadorUsesCases = new JugadorUsesCases(
    jugadorRepository
);

const router = express.Router();
router.post(`/insertarJugador`, async (request: Request, response: Response) => {
    try {
        const { alias, nacionalidad, posicion, imagen, idEquipo } = request.body;

        const jugadorPost = {
            alias,
            nacionalidad,
            posicion,
            imagen,
            idEquipo
        };

        const jugador: Jugador = await jugadorUsesCases.insertarJugador(jugadorPost);

        response.status(200).send({ jugador });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).send({
            message: "Error al crear un nuevo jugador"
        });
    }
});

router.get(`/verJugadores`, async (request: Request, response: Response) => {

    try {


        const jugadores = await jugadorUsesCases.verJugadores();

        response.status(200).send({
            jugadores
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).send({
            message: "Error al ver los jugadores"
        });
    }

});

router.delete(`/borrarJugador/:alias`, async (request: Request, response: Response) => {

    try {

        const { alias } = request.params;

        const jugador: Jugador = {
            alias
        }
        const borrarEquipo = await jugadorUsesCases.borrarJugadorSegunNombre(jugador);
        response.status(200).json({
            borrarEquipo
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al borrar el jugador"
        });
    }
});


router.patch(`/modificarJugador`, async (request: Request, response: Response) => {

    try {

        const { id, alias, posicion, nombreEquipo, imagen } = request.body;
        const jugador: Jugador = {
            id,
            alias,
            posicion,
            nombreEquipo,
            imagen
        }

        const actualizarJugador = await jugadorUsesCases.modificarJugador(jugador);
        response.status(200).json({
            actualizarJugador
        });

    } catch (error) {
        console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al actualizar jugador"
        });
    }
});
export default router
