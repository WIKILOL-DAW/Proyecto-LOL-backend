import Jugador from "../../domain/Jugador";
import JugadorRepository from "../../domain/Jugador.repository";
import executeQuery from "../../../context/postgres.connector";

export default class JugadorPostgresSQL implements JugadorRepository{

    async insertarJugador(jugador: Jugador): Promise<Jugador> {
        
         const insert = `insert into jugador (alias, nacionalidad, posicion, nombre_equipo) 
         values ('${jugador.alias}' , '${jugador.nacionalidad}', '${jugador.posicion}', '${jugador.nombreEquipo}') returning *`;  

        const rows: any[] = await executeQuery(insert);

        const jugadorDB = {
            alias: rows[0].alias,
            nacionalidad: rows[0].nacionalidad,
            posicion: rows[0].posicion,
            nombreEquipo: rows[0].nombrEquipo
        }
        return jugadorDB;
    }
}