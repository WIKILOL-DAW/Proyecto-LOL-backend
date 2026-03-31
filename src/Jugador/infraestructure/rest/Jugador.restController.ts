import express, { request, Request, Response } from "express";
import JugadorRepository from '../../domain/Jugador.repository'
import JugadorUsesCases from '../../aplication/Jugador.useCases'
import JugadorPostgresSQL from '../db/Juador.repository.postgres'
import Jugador from "../../domain/Jugador";


const jugadorRepository : JugadorRepository = new JugadorPostgresSQL();
const jugadorUsesCases : JugadorUsesCases = new JugadorUsesCases(
    jugadorRepository
);

const router = express.Router();


router.post(`/insertarJugador`, async (request: Request, response: Response) => {

    try {

        const {alias, nacionalidad, posicion, nombreEquipo} = request.body;

        const jugadorPost = {
            alias,
            nacionalidad,
            posicion,
            nombreEquipo
        }
        
        const jugador: Jugador = await jugadorUsesCases.insertarJugador(jugadorPost);

        response.status(200).send({
            jugador
        });

    } catch (error) {
        console.log("ERROR: " , error);
        response.status(500).send({
            message: "Error al crear un nuevo jugador"
        });
    }
});


export default router