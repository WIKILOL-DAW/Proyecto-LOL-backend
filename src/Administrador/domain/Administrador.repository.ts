import Administrador from "./Administrador";

export default interface AdministradorRepository{

    registro(administrador: Administrador ): Promise<Administrador>;
    login(administrador: Administrador ): Promise<Administrador | false>;

}
