import Equipo from "../../domain/Equipo";
import EquipoRepository from "../../domain/Equipo.repository";
import executeQuery from "../../../context/postgres.connector";

export default class EquipoPostgresSQL implements EquipoRepository {

    async insertarEquipo(equipo: Equipo): Promise<Equipo> {

        const insert = `insert into equipo (nombre , nombre_liga, descripcion, imagen) values ('${equipo.nombre}', '${equipo.nombreLiga}' , '${equipo.descripcion}' , '${equipo.imagen}') returning *`;

        const rows: any[] = await executeQuery(insert);

        const equipoDB = {
            nombre: rows[0].nombre,
            nombreLiga: rows[0].nombreLiga,
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
        const borrar = `delete from equipo where nombre = '${equipo.nombre}'`;
        await executeQuery(borrar);
        return equipo;
    }

    async cambiarNombreEquipo(equipo: Equipo): Promise<Equipo> {

        const actualizar = `update equipo set nombre = ? where nombre = '${equipo.nombre}'`;
        const equipoActualizado: any = await executeQuery(actualizar);
        return equipoActualizado;
    }

    async verTodosLosEquipos(): Promise<Equipo[]> {
        const select = `select * from equipo`;
        const resultado: any[] = await executeQuery(select);
        return resultado;
    }
}