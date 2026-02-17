import Administrador from "../domain/Administrador";
import AdministradorRepository from "../domain/Administrador.repository";
import { error } from "console";
import { hash } from "../../context/security/encrypter"
 
export default class AdministradorUseCases{
    constructor(private administradorRepository: AdministradorRepository ) {}

    async registro(administrador: Administrador): Promise<Administrador>{
        if (!administrador.passwrd)throw new error("no passwrd")
            const pswCifrada = hash(administrador.passwrd);
        administrador.passwrd = pswCifrada;
        return this.administradorRepository.registro(administrador);

    }

}