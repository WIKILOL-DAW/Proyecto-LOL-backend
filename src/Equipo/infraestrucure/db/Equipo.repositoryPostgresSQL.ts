import Equipo from "../../domain/Equipo";
import EquipoRepository from "../../domain/Equipo.repository";
import executeQuery from "../../../context/postgres.connector";

export default class EquipoPostgresSQL implements EquipoRepository {

    async insertarEquipo(equipo: Equipo): Promise<Equipo> {

        const insert = `insert into equipo (nombre , nombre_liga, descripcion, imagen) values ('${equipo.nombre}', '${equipo.nombreLiga}' , '${equipo.descripcion}' , '${equipo.imagen}') returning *`;

        const rows: any[] = await executeQuery(insert);

        const equipoDB = {
            id: rows[0].id,
            nombre: rows[0].nombre,
            nombreLiga: rows[0].nombre_liga,
            descripcion: rows[0].descripcion,
            imagen: rows[0].imagen
        }
        return equipoDB;
    }

    async verEquiposSegunLiga(nombreLiga: string): Promise<Equipo[]> {
        const select = `select * from equipo where nombre_liga = '${nombreLiga}'`;
        const resultado: any[] = await executeQuery(select);
        return resultado;
    }

    async borrarEquipoSegunNombre(equipo: Equipo): Promise<Equipo> {
        const borrar = `delete from equipo where nombre = $1 returning *`;
        const rows: any[] = await executeQuery(borrar, [equipo.nombre]);

        if (rows.length === 0) {
            return equipo;
        }

        return {
            id: rows[0].id,
            nombre: rows[0].nombre,
            nombreLiga: rows[0].nombre_liga,
            descripcion: rows[0].descripcion,
            imagen: rows[0].imagen
        };
    }

    async verTodosLosEquipos(): Promise<Equipo[]> {
        const select = `select * from equipo`;
        const resultado: any[] = await executeQuery(select);
        return resultado;
    }

    async modificarEquipo(equipo: Equipo): Promise<Equipo> {

        const update = ` update equipo set nombre = $1, descripcion = $2, imagen = $3 
        where id = $4 RETURNING *`;
        const parametros = [
            equipo.nombre,
            equipo.descripcion,
            equipo.imagen,
            equipo.id
        ];

        const rows: any[] = await executeQuery(update, parametros);

        return {
            id: rows[0].id,
            nombre: rows[0].nombre,
            nombreLiga: rows[0].nombre_liga,
            descripcion: rows[0].descripcion,
            imagen: rows[0].imagen
        };
    }
}
