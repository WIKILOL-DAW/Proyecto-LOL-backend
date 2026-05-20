import NoticiaRepository from "../domain/Noticia.repository";
import Noticia from "../domain/Noticia";

export default class NoticiaUseCase{
    constructor(private noticiaRepository:NoticiaRepository){}
    
    async cargarNoticias():Promise<Noticia[]>{
        return this.noticiaRepository.cargarNoticias();
    }
}