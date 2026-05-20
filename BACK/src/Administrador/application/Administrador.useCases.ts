import Administrador from "../domain/Administrador";
import AdministradorRepository from "../domain/Administrador.repository";
import { hash } from "../../context/security/encrypter"
import bcrypt from "bcrypt";

export default class AdministradorUseCases {
    constructor(private administradorRepository: AdministradorRepository) { }

    async registro(administrador: Administrador): Promise<Administrador> {
        console.log(administrador);

        if (!administrador.passwrd) {
            throw new Error("no password");
        }

        const pswCifrada = hash(administrador.passwrd);
        administrador.passwrd = pswCifrada;

        return this.administradorRepository.registro(administrador);
    }

    async login(administrador: Administrador): Promise<Administrador | false> {

        const administradorDB = await this.administradorRepository.login(administrador);

        if (
            !administrador.passwrd ||
            !administradorDB.passwrd
        ) {
            return false;
        }

        const coincide = await bcrypt.compare(
            administrador.passwrd.toString(),
            administradorDB.passwrd.toString()
        );

        if (!coincide) {
            administradorDB.passwrd = undefined;
            return false;
        }

        return administradorDB;
    }
}