import express, { request, Request, Response } from "express";
import AdministradorUseCases from "../../application/Administrador.useCases";
import AdministradorRepository from "../../domain/Administrador.repository";
import AdministradorPostgresSQL from "../db/Administrador.postgresSQL";
import Administrador from "../../domain/Administrador";
import { createToken } from "../../../context/security/auth";

const administradorRepository: AdministradorRepository = new AdministradorPostgresSQL();

const administradorUseCases: AdministradorUseCases = new AdministradorUseCases(
    administradorRepository
)

const router = express.Router();

router.post("/registro", async (request: Request, response: Response) => {

    const { alias, correo, passwrd } = request.body;

    const AdminPost = {
        alias,
        correo,
        passwrd
    }
    const administrador: Administrador = await administradorUseCases.registro(AdminPost);
    const token = createToken(administrador);
    response.status(200).send({
        message: "Registro correcto",
        token: token
    })
})

router.post("/login", async (request: Request, response: Response) => {

    const { correo, passwrd } = request.body;

    const loginAdmin = {
        correo,
        passwrd
    }

    const administrador: Administrador | false = await administradorUseCases.login(loginAdmin);
    console.log(administrador, "Controller");
    if (!administrador) {
        response.status(400).send({
            message: "Admin no encontrado",
            token: null
        })
    } else if (administrador.passwrd === null) {
        response.status(400).send({
            message: "Contraseña incorrecte",
            token: null
        })
    } else {
        const token = createToken(administrador);
        response.status(200).send({
            message: "Credenciales correctas",
            token: token
        })
    }
})

export default router;