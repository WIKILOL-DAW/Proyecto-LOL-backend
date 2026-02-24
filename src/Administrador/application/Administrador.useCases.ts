import Administrador from "../domain/Administrador";
import AdministradorRepository from "../domain/Administrador.repository";
import { error } from "console";
import { hash } from "../../context/security/encrypter"

export default class AdministradorUseCases {
    constructor(private administradorRepository: AdministradorRepository) { }

    async registro(administrador: Administrador): Promise<Administrador> {
        console.log(administrador);
        if (!administrador.passwrd) throw new error("no passwrd")

        const pswCifrada = hash(administrador.passwrd);
        administrador.passwrd = pswCifrada;

        return this.administradorRepository.registro(administrador);
    }

    async login(administrador: Administrador): Promise<Administrador> {
        const passwrdCifrada = hash(administrador.passwrd);
        const administradorDB = this.administradorRepository.login(administrador)
        if (!administrador.correo || !administrador.passwrd) {
            throw new Error("Correo o contraseña no encontrados")
        }else if(passwrdCifrada === (await administradorDB).passwrd){

        }
        

        return ;
    }
}