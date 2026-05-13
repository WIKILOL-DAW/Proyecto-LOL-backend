import Jugador from "../../domain/Jugador";
import JugadorRepository from "../../domain/Jugador.repository";
import executeQuery from "../../../context/postgres.connector";

export default class JugadorPostgresSQL implements JugadorRepository {

    async insertarJugador(jugador: Jugador): Promise<Jugador> {

        const insert = `insert into jugador (alias, nacionalidad, posicion, nombre_equipo) 
         values ('${jugador.alias}' , '${jugador.nacionalidad}', '${jugador.posicion}', '${jugador.nombreEquipo}', '${jugador.imagen}') returning *`;

        const rows: any[] = await executeQuery(insert);

        const jugadorDB = {
            alias: rows[0].alias,
            nacionalidad: rows[0].nacionalidad,
            posicion: rows[0].posicion,
            nombreEquipo: rows[0].nombrEquipo,
            imagen: rows[0].imagen
        }
        return jugadorDB;
    }

    async verJugadores(): Promise<Jugador[]> {
        const select = `select * from jugador`;
        const resultado: any[] = await executeQuery(select);
        return resultado;
    }
}