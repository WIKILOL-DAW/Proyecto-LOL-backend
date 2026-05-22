import Jugador from "../../domain/Jugador";
import JugadorRepository from "../../domain/Jugador.repository";
import executeQuery from "../../../context/postgres.connector";

export default class JugadorPostgresSQL implements JugadorRepository {
async insertarJugador(jugador: Jugador): Promise<Jugador> {

    const insert = `
        INSERT INTO jugador (alias, nacionalidad, posicion, id_equipo, imagen)
        VALUES ('${jugador.alias}', '${jugador.nacionalidad}', '${jugador.posicion}', ${jugador.idEquipo}, '${jugador.imagen}')
        RETURNING *;
    `;

    const rows: any[] = await executeQuery(insert);

    if (!rows || rows.length === 0) {
        throw new Error("No se pudo insertar el jugador");
    }

    const jugadorDB = {
        id: rows[0].id,
        alias: rows[0].alias,
        nacionalidad: rows[0].nacionalidad,
        posicion: rows[0].posicion,
        idEquipo: rows[0].id_equipo,
        imagen: rows[0].imagen
    };

    return jugadorDB;
}


    async verJugadores(): Promise<Jugador[]> {
        const select = `select * from jugador`;
        const resultado: any[] = await executeQuery(select);
        return resultado;
    }

    async borrarJugadorSegunNombre(jugador: Jugador): Promise<Jugador> {

        const borrado = `delete from jugador where alias = $1 returning *`;
        const rows: any[] = await executeQuery(borrado, [jugador.alias]);

        if (rows.length === 0) {
            return jugador;
        }

        return {
            id: rows[0].id,
            alias: rows[0].alias,
            nacionalidad: rows[0].nacionalidad,
            posicion: rows[0].posicion,
            nombreEquipo: rows[0].nombre_equipo,
            imagen: rows[0].imagen
        };
    }

    async modificarJugador(jugador: Jugador): Promise<Jugador> {

        const update = `update jugador set alias = $1, posicion = $2, nombre_equipo = $3, imagen = $4 
        where id = $5 RETURNING *`

        const parametros = [
            jugador.alias,
            jugador.posicion,
            jugador.nombreEquipo,
            jugador.imagen,
            jugador.id
        ]

        const rows: any[] = await executeQuery(update, parametros);

        return {
            id: rows[0].id,
            alias: rows[0].alias,
            nacionalidad: rows[0].nacionalidad,
            posicion: rows[0].posicion,
            nombreEquipo: rows[0].nombre_equipo,
            imagen: rows[0].imagen
        };
    }
}
