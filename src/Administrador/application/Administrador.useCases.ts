import Administrador from "../domain/Administrador";
import AdministradorRepository from "../domain/Administrador.repository";
import { error } from "console";
import { hash } from "../../context/security/encrypter"
import bcrypt from "bcrypt";

export default class AdministradorUseCases {
    constructor(private administradorRepository: AdministradorRepository) { }

    async registro(administrador: Administrador): Promise<Administrador> {
        console.log(administrador);
        if (!administrador.passwrd) throw new error("no passwrd")

        const pswCifrada = hash(administrador.passwrd);
        administrador.passwrd = pswCifrada;

        return this.administradorRepository.registro(administrador);
    }

    async login(administrador: Administrador): Promise<Administrador | false > {
        const administradorDB = await this.administradorRepository.login(administrador)

        const coincide = await bcrypt.compare(
        administrador.passwrd.toString(),   
        administradorDB.passwrd.toString()  
    );

        if (!administrador.correo) {
            return false;

        }else if(!coincide){
           administradorDB.passwrd  = null
        }
        return administradorDB;
    }
}