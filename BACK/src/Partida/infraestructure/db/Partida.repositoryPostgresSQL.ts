import Partida from '../../domain/Partida';
import PartidaRepository from './../../domain/Partida.repository';
import executeQuery from "../../../context/postgres.connector";

export default class PartidaPostgresSQL implements PartidaRepository {

    async nuevaPartida(partida: Partida): Promise<Partida> {

        const insert = `
            INSERT INTO partida 
            (fecha_partida, equipo_rojo, equipo_azul, equipo_ganador, kills_equipo_azul, kills_equipo_rojo, torneo, split, año, fase)
            VALUES (
                '${partida.fechaPartida.toISOString()}',
                '${partida.equipoRojo}',
                '${partida.equipoAzul}',
                '${partida.equipoGanador}',
                '${partida.killsEquipoAzul}',
                '${partida.killsEquipoRojo}',
                '${partida.torneo}',
                '${partida.split}',
                '${partida.año}',
                '${partida.fase}'
            )
            RETURNING *;
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
            torneo: rows[0].torneo,
            split: rows[0].split,
            año: rows[0].año,
            fase: rows[0].fase
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
                torneo = '${partidaNueva.torneo}',
                split = '${partidaNueva.split}',
                año = '${partidaNueva.año}',
                fase = '${partidaNueva.fase}'
            WHERE id = ${idPartida}
            RETURNING *;
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
            torneo: rows[0].torneo,
            split: rows[0].split,
            año: rows[0].año,
            fase: rows[0].fase
        };

        return partidaDB;
    }
    async obtenerPartidas(): Promise<Partida[]> {

    const query = `
        SELECT 
            id,
            fecha_partida,
            equipo_rojo,
            equipo_azul,
            equipo_ganador,
            kills_equipo_azul,
            kills_equipo_rojo,
            torneo,
            split,
            año,
            fase
        FROM partida;
    `;

    const rows: any[] = await executeQuery(query);

    const partidas: Partida[] = rows.map((row) => ({
        id: row.id,
        fechaPartida: new Date(row.fecha_partida),
        equipoRojo: row.equipo_rojo,
        equipoAzul: row.equipo_azul,
        equipoGanador: row.equipo_ganador,
        killsEquipoAzul: row.kills_equipo_azul,
        killsEquipoRojo: row.kills_equipo_rojo,
        torneo: row.torneo,
        split: row.split,
        año: row.año,
        fase: row.fase
    }));

    return partidas;
}
}
