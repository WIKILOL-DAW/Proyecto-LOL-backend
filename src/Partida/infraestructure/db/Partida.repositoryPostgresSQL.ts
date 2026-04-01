import Partida from '../../domain/Partida';
import PartidaRepository from './../../domain/Partida.repository';
import executeQuery from "../../../context/postgres.connector";

export default class PartidaPostgresSQL implements PartidaRepository {

    async nuevaPartida(partida: Partida): Promise<Partida> {

        const insert = `
            INSERT INTO partida 
            (fecha_partida, equipo_rojo, equipo_azul, equipo_ganador, kills_equipo_azul, kills_equipo_rojo, liga)
            VALUES (
                '${partida.fechaPartida.toISOString()}',
                '${partida.equipoRojo}',
                '${partida.equipoAzul}',
                '${partida.equipoGanador}',
                ${partida.killsEquipoAzul},
                ${partida.killsEquipoRojo},
                '${partida.liga}'
            );
        `;

        const rows: any[] = await executeQuery(insert);

        const partidaDB: Partida = {
            id: rows[0].id,
            fechaPartida: new Date(rows[0].fecha_partida),
            equipoRojo: rows[0].equipo_rojo,
            equipoAzul: rows[0].equipo_azul,
            equipoGanador: rows[0].equipo_ganador,
            killsEquipoAzul: rows[0].kills_equipo_azul,
            killsEquipoRojo: rows[0].kills_equipo_rojo,
            liga: rows[0].liga
        };

        return partidaDB;
    }

    async actualizarPartida(idPartida: string, partidaNueva: Partida): Promise<Partida> {

        const update = `
            UPDATE partida SET
                fecha_partida = '${partidaNueva.fechaPartida.toISOString()}',
                equipo_rojo = '${partidaNueva.equipoRojo}',
                equipo_azul = '${partidaNueva.equipoAzul}',
                equipo_ganador = '${partidaNueva.equipoGanador}',
                kills_equipo_azul = ${partidaNueva.killsEquipoAzul},
                kills_equipo_rojo = ${partidaNueva.killsEquipoRojo},
                liga = '${partidaNueva.liga}'
            WHERE id = ${idPartida};
        `;

        const rows: any[] = await executeQuery(update);

        const partidaDB: Partida = {
            id: rows[0].id,
            fechaPartida: new Date(rows[0].fecha_partida),
            equipoRojo: rows[0].equipo_rojo,
            equipoAzul: rows[0].equipo_azul,
            equipoGanador: rows[0].equipo_ganador,
            killsEquipoAzul: rows[0].kills_equipo_azul,
            killsEquipoRojo: rows[0].kills_equipo_rojo,
            liga: rows[0].liga
        };

        return partidaDB;
    }
}