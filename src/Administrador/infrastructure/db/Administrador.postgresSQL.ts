import Administrador from "../../domain/Administrador";
import administradorRepository from "../../domain/Administrador.repository";
import executeQuery from "../../../context/postgres.connector";

export default class AdministradorPostgresSQL implements administradorRepository {

    async registro(administrador: Administrador): Promise<Administrador> {

        const { alias, correo, passwrd } = administrador;

        const query = `insert into administrador (alias,correo,passwrd) values ('${alias}','${correo}','${passwrd}') returning *`;

        const rows: any[] = await executeQuery(query);

        const administradorDB = {
            alias: rows[0].alias,
            correo: rows[0].correo,
            passwrd: rows[0].passwrd
        };
        return administradorDB;
    }


    async login(administrador: Administrador): Promise<Administrador> {

        
        const select = `select * from administrador where correo = '${administrador.correo}'`;

        const rows: any[] = await executeQuery(select);

        if (rows.length === 0) {
            
            throw new Error("Usuario no encontrado");

        } else {
            const administradorDB: Administrador = {
                correo: rows[0].correo,
                passwrd: rows[0].passwrd
            }
            return administradorDB;
        }
    }
}