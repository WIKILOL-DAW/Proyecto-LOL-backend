import Campeon from "../../domain/Campeon";
import CampeonRepository from "../../domain/Campeon.repository";
import executeQuery from "../../../context/postgres.connector";

export default class CampeonPostgresSQL implements CampeonRepository {

    async insertarCampeon(campeon: Campeon): Promise<Campeon> {

        const insert = `insert into campeon (nombre, posicion, descripcion, imagen) values ('${campeon.nombre}' , '${campeon.posicion}' , '${campeon.descripcion}', '${campeon.imagen}') returning *`;
        const rows: any[] = await executeQuery(insert);

        const campeonDB = {
            nombre: rows[0].nombre,
            posicion: rows[0].posicion,
            descripcion: rows[0].descripcion,
            imagen: rows[0].imagen
        }
        return campeonDB;
    }

    async verCampeones(): Promise<Campeon[]> {

        const select = `select * from campeon order by nombre asc`;
        const resultado: any[] = await executeQuery(select);
        console.log(resultado)
        return resultado;
    }
}