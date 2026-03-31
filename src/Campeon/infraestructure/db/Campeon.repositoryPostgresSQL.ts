import Campeon from "../../domain/Campeon";
import CampeonRepository from "../../domain/Campeon.repository";
import executeQuery from "../../../context/postgres.connector";

export default class CampeonPostgresSQL implements CampeonRepository {

    async insertarCampeon(campeon: Campeon): Promise<Campeon> {

        const insert = `insert into campeon (nombre, posicion) values ('${campeon.nombre}' , '${campeon.posicion}') returning *`;

        const rows: any[] = await executeQuery(insert);

        const campeonDB = {
            nombre: rows[0].nombre,
            posicion: rows[0].posicion
        }
        return campeonDB;
    }
}