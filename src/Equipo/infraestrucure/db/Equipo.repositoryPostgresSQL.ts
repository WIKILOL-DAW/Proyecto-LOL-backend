import Equipo from "../../domain/Equipo";
import EquipoRepository from "../../domain/Equipo.repository";
import executeQuery from "../../../context/postgres.connector";

export default class EquipoPostgresSQL implements EquipoRepository {

    async insertarEquipo(equipo: Equipo): Promise<Equipo> {

        const insert = `insert into equipo (nombre) values ('${equipo.nombre}')`;

        const rows: any[] = await executeQuery(insert);

        const equipoDB = {
            nombre: rows[0].nombre
        }

        return equipoDB;
    }
}