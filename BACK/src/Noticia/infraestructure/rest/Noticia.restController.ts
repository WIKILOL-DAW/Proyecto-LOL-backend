import { Router } from "express";
import express, { request, Request, Response } from "express";
import NoticiaRepository from "../../domain/Noticia.repository";
import NoticiaPostgresSQL from '../db/Noticia.repositoryPostgresSQL';
import NoticiaUseCases from "../../application/Noticia.useCase";


const noticiaRepository: NoticiaRepository = new NoticiaPostgresSQL();
const noticiaUseCases: NoticiaUseCases = new NoticiaUseCases(noticiaRepository)
const router = express.Router();

router.get(`/verNoticias`,async (request: Request,response:Response)=>{
    try{
        const noticias = await noticiaUseCases.cargarNoticias();

         response.status(200).json({
            noticias
        });
    }catch(error){
          console.log("ERROR: ", error);
        response.status(500).json({
            message: "Error al mostrar las Noticias"
        });
    }
})
export default router;