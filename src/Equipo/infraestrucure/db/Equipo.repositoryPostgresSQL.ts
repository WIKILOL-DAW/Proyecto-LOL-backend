import Equipo from "../../domain/Equipo";
import EquipoRepository from "../../domain/Equipo.repository";
import executeQuery from "../../../context/postgres.connector";

export default class EquipoPostgresSQL implements EquipoRepository {

    async insertarEquipo(equipo: Equipo): Promise<Equipo> {

        const insert = `insert into equipo (nombre , nombre_liga) values ('${equipo.nombre}', '${equipo.nombreLiga}') returning *`;

        const rows: any[] = await executeQuery(insert);

        const equipoDB = {
            nombre: rows[0].nombre,
            nombreLiga: rows[0].nombreLiga
        }
        return equipoDB;
    }

    async verEquiposSegunLiga(nombreLiga: string): Promise<Equipo[]> {

        const select = `select * from equipo where nombre_liga = '${nombreLiga}'`;
        const resultado: any[] = await executeQuery(select);
        return resultado;
    }
}