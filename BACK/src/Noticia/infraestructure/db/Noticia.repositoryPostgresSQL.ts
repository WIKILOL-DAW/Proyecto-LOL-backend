import Noticia from "../../domain/Noticia";
import NoticiaRepository from "../../domain/Noticia.repository";
import executeQuery from "../../../context/postgres.connector";

export default class NoticiaRepositoryPostgres implements NoticiaRepository{
    async cargarNoticias(): Promise<Noticia[]> {
        const query = `select * from noticia`
        const resultado: any[] = await executeQuery(query);
        return resultado;
    
    }
}