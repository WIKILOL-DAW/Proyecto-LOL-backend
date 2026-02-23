import express, {Request, Response} from "express";
import AdministradorUseCases from "../../application/Administrador.useCases";
import AdministradorRepository from "../../domain/Administrador.repository";
import AdministradorPostgresSQL from "../DB/Administrador.postgresSQL";
import Administrador from "../../domain/Administrador";

const administradorRepository: AdministradorRepository = new AdministradorPostgresSQL();

const administradorUseCases: AdministradorUseCases = new AdministradorUseCases(
    administradorRepository
)

const router = express.Router();

router.post("/registro", async(req: Request, res: Response) => {
    const { alias ,correo , passwrd: passwrd} = req.body;
    const AdminPost = {
        alias,
        correo,
        passwrd
    }
    const administrador: Administrador = await administradorUseCases.registro(AdminPost);
    res.send(administrador)
})

export default router;