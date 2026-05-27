import Noticia from "./Noticia";

export default interface NoticiaRepository{
    cargarNoticias():Promise<Noticia[]>;

}