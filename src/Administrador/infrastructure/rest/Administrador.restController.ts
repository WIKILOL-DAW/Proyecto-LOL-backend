import express, { request, Request, Response } from "express";
import AdministradorUseCases from "../../application/Administrador.useCases";
import AdministradorRepository from "../../domain/Administrador.repository";
import AdministradorPostgresSQL from "../db/Administrador.postgresSQL";
import Administrador from "../../domain/Administrador";
import { createToken } from "../../../Context/security/auth";

const administradorRepository: AdministradorRepository = new AdministradorPostgresSQL();

const administradorUseCases: AdministradorUseCases = new AdministradorUseCases(
    administradorRepository
)

const router = express.Router();

router.post("/registro", async (req: Request, res: Response) => {

    const { alias, correo, passwrd: passwrd } = req.body;
    const AdminPost = {
        alias,
        correo,
        passwrd
    }
    const administrador: Administrador = await administradorUseCases.registro(AdminPost);
    res.send(administrador)
})

router.post("/login", async (request: Request, response: Response) => {


    const { correo, passwrd } = request.body;

    const loginAdmin = {
        correo,
        passwrd
    }
    const administrador: Administrador = await administradorUseCases.login(loginAdmin);
    const token = createToken(administrador);
    response.json(token);
})

export default router;